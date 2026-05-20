import Script from 'next/script';

/**
 * GA4 + Microsoft Clarity loader.
 * Activates only when the corresponding env vars are set, so it is safe to ship
 * before IDs exist. Set in Vercel project env:
 *   NEXT_PUBLIC_GA_ID      -> GA4 Measurement ID (e.g. G-XXXXXXXXXX)
 *   NEXT_PUBLIC_CLARITY_ID -> Microsoft Clarity Project ID
 */
export default function Analytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

    return (
        <>
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="ga4-init" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gaId}', { anonymize_ip: true });
                        `}
                    </Script>
                </>
            )}

            {clarityId && (
                <Script id="ms-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${clarityId}");
                    `}
                </Script>
            )}
        </>
    );
}
