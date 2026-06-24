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
    generateFAQSchema,
} from '../lib/schemaGenerator';
import { allPlans } from '../data/travelPlans';
import { getReviewsForTour } from '../data/reviews';

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

// 2) Per-tour TouristTrip + Offer + Review (every plan page) -----------------
let tripsChecked = 0;
for (const plan of allPlans) {
    const ctx = `plan ${plan.id} "${plan.title}"`;
    const reviews = getReviewsForTour(plan.title, plan.destinations || []);
    const schema: any = generateTourPackageSchema(
        {
            name: plan.title,
            description: plan.description,
            price: plan.price,
            duration: plan.duration,
            itinerary: plan.itinerary,
            destinations: plan.destinations,
            url: `https://www.guideindiatours.com/plans/${plan.id}`,
            rating: plan.rating,
            reviewCount: plan.reviews,
            reviews: reviews.map((r) => ({
                author: r.name,
                rating: r.rating,
                reviewBody: r.reviewText,
                datePublished: r.date,
            })),
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

    // Reviews (when present) must be well-formed for rich results.
    if (Array.isArray(schema.review)) {
        schema.review.forEach((rv: any, i: number) => {
            if (!rv.author?.name) fail(ctx, `review[${i}] missing author.name`);
            const rr = Number(rv.reviewRating?.ratingValue);
            if (!(rr >= 1 && rr <= 5)) fail(ctx, `review[${i}] ratingValue invalid: ${rv.reviewRating?.ratingValue}`);
            if (!rv.reviewBody) fail(ctx, `review[${i}] missing reviewBody`);
        });
    }
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
console.log(`✓ JSON-LD valid: site @graph + ${tripsChecked} tour Offers/Reviews + FAQ shape.`);
