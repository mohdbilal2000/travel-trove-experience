/* eslint-disable @typescript-eslint/no-explicit-any -- validator inspects untyped JSON-LD output */
/**
 * Automatic structured-data (JSON-LD) validator.
 *
 * Runs the same schema generators the site renders and asserts the output is
 * valid schema.org for SEO/AEO/GEO — so broken structured data fails the build
 * instead of silently shipping. No external service, no Lighthouse: pure
 * field-relevant correctness checks on the exact objects we emit.
 *
 * Run: `bun scripts/validate-schema.ts`  (wired into CI + `npm run validate:schema`)
 */
import {
    generateConnectedGraphSchema,
    generateTourPackageSchema,
    generateProductSchema,
    generateFAQSchema,
} from '../lib/schemaGenerator';
import { allPlans, getPlanPath } from '../data/travelPlans';

const errors: string[] = [];
const fail = (ctx: string, msg: string) => errors.push(`✗ ${ctx}: ${msg}`);

/** A node is valid JSON-LD only if it serialises and declares @type. */
function assertSerialisable(ctx: string, node: unknown) {
    try {
        JSON.stringify(node);
    } catch (e) {
        fail(ctx, `not JSON-serialisable (${(e as Error).message})`);
    }
}

// 1) Site-wide @graph identity (TravelAgency + WebSite) ----------------------
const graph: any = generateConnectedGraphSchema();
assertSerialisable('graph', graph);
if (graph['@context'] !== 'https://schema.org') fail('graph', 'missing @context schema.org');
const nodes: any[] = Array.isArray(graph['@graph']) ? graph['@graph'] : [];
const agency = nodes.find((n) => n['@type'] === 'TravelAgency');
const website = nodes.find((n) => n['@type'] === 'WebSite');
if (!agency) fail('graph', 'no TravelAgency node');
if (!website) fail('graph', 'no WebSite node');
if (agency) {
    if (!agency.name) fail('graph.TravelAgency', 'missing name');
    if (!agency['@id']) fail('graph.TravelAgency', 'missing @id');
    const ar = agency.aggregateRating;
    if (!ar) fail('graph.TravelAgency', 'missing aggregateRating');
    else {
        const v = Number(ar.ratingValue);
        if (!(v >= 1 && v <= 5)) fail('graph.TravelAgency', `ratingValue out of range: ${ar.ratingValue}`);
        if (!Number(ar.reviewCount)) fail('graph.TravelAgency', 'aggregateRating.reviewCount not a positive number');
    }
    if (agency.address && agency.address['@type'] !== 'PostalAddress') fail('graph.TravelAgency', 'address is not a PostalAddress');
}

// 2) Per-plan schema, mirroring exactly what /plans/[id] renders -------------
// Programmes with a published from-price emit Product + Offer (EUR); bespoke
// plans emit TouristTrip with a price-less Offer (quote-only). Neither carries
// per-plan review counts — the only aggregateRating on the site is the
// agency's real Google rating in the @graph.
let productsChecked = 0;
let tripsChecked = 0;
for (const plan of allPlans) {
    const ctx = `plan ${plan.id} "${plan.title}"`;
    const url = `https://www.guideindiatours.com/plans/${getPlanPath(plan)}`;

    if (plan.fromPriceEUR && plan.pricing) {
        const product: any = generateProductSchema({
            name: plan.title,
            description: plan.description,
            url,
            image: plan.image,
            fromPriceEUR: plan.fromPriceEUR,
            sku: plan.slug,
        });
        assertSerialisable(ctx, product);
        if (product['@type'] !== 'Product') fail(ctx, 'not a Product');
        if (!product.name) fail(ctx, 'missing name');
        const offer = product.offers;
        if (!offer || offer['@type'] !== 'Offer') fail(ctx, 'missing Offer');
        else {
            if (!/^\d+(\.\d+)?$/.test(String(offer.price)) || Number(offer.price) <= 0)
                fail(ctx, `Offer.price invalid ("${offer.price}")`);
            if (offer.priceCurrency !== 'EUR') fail(ctx, `Offer.priceCurrency must be EUR, got "${offer.priceCurrency}"`);
            if (!offer.availability) fail(ctx, 'Offer missing availability');
        }
        if ('aggregateRating' in product) fail(ctx, 'Product must not carry an invented aggregateRating');
        productsChecked++;
        continue;
    }

    const schema: any = generateTourPackageSchema(
        {
            name: plan.title,
            description: plan.description,
            price: '', // bespoke tours are quote-only — generator omits the Offer price
            duration: plan.duration,
            itinerary: plan.itinerary,
            destinations: plan.destinations,
            url,
        },
        { name: 'Guide India Tours', url: 'https://www.guideindiatours.com' },
    );
    assertSerialisable(ctx, schema);
    if (schema['@type'] !== 'TouristTrip') fail(ctx, 'not a TouristTrip');
    if (!schema.name) fail(ctx, 'missing name');

    // Offer: quote-only tours legitimately omit price; but a present price
    // must be a bare number and must carry a currency. An empty/zero price or
    // a price without currency is an invalid-structured-data error.
    const offer = schema.offers;
    if (!offer || offer['@type'] !== 'Offer') fail(ctx, 'missing Offer');
    else if ('price' in offer) {
        if (!/^\d+(\.\d+)?$/.test(String(offer.price)) || Number(offer.price) <= 0)
            fail(ctx, `Offer.price invalid ("${offer.price}" from "${plan.price}")`);
        if (!offer.priceCurrency) fail(ctx, 'Offer has price but no priceCurrency');
    }
    if ('aggregateRating' in schema) fail(ctx, 'TouristTrip must not carry an invented aggregateRating');
    if ('review' in schema) fail(ctx, 'TouristTrip must not carry pool-matched per-trip reviews');
    tripsChecked++;
}

// 3) FAQ schema shape --------------------------------------------------------
const faq: any = generateFAQSchema([{ question: 'Q?', answer: 'A.' }]);
if (faq['@type'] !== 'FAQPage' || !Array.isArray(faq.mainEntity) || faq.mainEntity[0]?.['@type'] !== 'Question')
    fail('FAQ', 'FAQPage/Question shape invalid');

// Report ---------------------------------------------------------------------
if (errors.length) {
    console.error(`\nJSON-LD validation FAILED (${errors.length} issue${errors.length > 1 ? 's' : ''}):\n`);
    console.error(errors.join('\n'));
    process.exit(1);
}
console.log(`✓ JSON-LD valid: site @graph + ${productsChecked} programme Products + ${tripsChecked} bespoke TouristTrips + FAQ shape.`);
