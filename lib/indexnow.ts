// IndexNow client. Call pingIndexNow([...urls]) from your publish/update flow
// to instantly notify Bing, Yandex, and other IndexNow-enabled engines.
// Register the key once in Bing Webmaster Tools -> IndexNow.

const KEY = '13d55e723b723e2403e2f01c7afde086';
const HOST = 'www.guideindiatours.com';

export async function pingIndexNow(urls: string[]): Promise<void> {
    if (urls.length === 0) return;

    try {
        await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: `https://${HOST}/${KEY}.txt`,
                urlList: urls,
            }),
        });
    } catch (err) {
        // Non-fatal: search engines re-crawl via the sitemap regardless.
        console.error('IndexNow ping failed:', err);
    }
}
