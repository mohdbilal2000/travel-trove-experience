// IndexNow verification key file. Served at
// https://www.guideindiatours.com/13d55e723b723e2403e2f01c7afde086.txt
export const dynamic = 'force-static';

export function GET() {
    return new Response('13d55e723b723e2403e2f01c7afde086', {
        headers: { 'content-type': 'text/plain' },
    });
}
