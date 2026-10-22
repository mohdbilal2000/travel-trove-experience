import type { Metadata } from "next";
import QuoteTool from "./QuoteTool";

// Hidden staff tool: not linked anywhere, not in the sitemap, excluded from search.
export const metadata: Metadata = {
    title: "Quote Maker",
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function Page() {
    return <QuoteTool />;
}
