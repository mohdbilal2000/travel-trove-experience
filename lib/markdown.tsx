import type { ReactNode } from "react";
import Link from "next/link";

export const slugifyHeading = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

const INLINE_TOKEN = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function renderInline(text: string): ReactNode[] {
    const parts = text.split(INLINE_TOKEN).filter((p) => p !== "");
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
            return <code key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-gray-800">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
            return <em key={i}>{part.slice(1, -1)}</em>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
            const [, label, href] = link;
            const external = /^https?:\/\//.test(href);
            return external ? (
                <a key={i} href={href} rel="noopener noreferrer" target="_blank" className="text-maroon-600 underline underline-offset-2 hover:text-maroon-700">{label}</a>
            ) : (
                <Link key={i} href={href} className="text-maroon-600 underline underline-offset-2 hover:text-maroon-700">{label}</Link>
            );
        }
        return part;
    });
}

const isBullet = (line: string) => /^\s*[-*]\s+/.test(line);
const isNumbered = (line: string) => /^\s*\d+[.)]\s+/.test(line);

function renderList(lines: string[], ordered: boolean, key: string) {
    const items = lines.map((l) => l.replace(ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*]\s+/, ""));
    if (ordered) {
        return (
            <ol key={key} className="my-6 space-y-3 list-none">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                        <span className="mt-0.5 w-7 h-7 rounded-full bg-maroon-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed">{renderInline(item)}</span>
                    </li>
                ))}
            </ol>
        );
    }
    return (
        <ul key={key} className="my-6 space-y-3 list-none">
            {items.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                    <span aria-hidden="true" className="mt-2.5 w-2 h-2 rotate-45 bg-gold-500 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{renderInline(item)}</span>
                </li>
            ))}
        </ul>
    );
}

/**
 * Renders the lightweight markdown used in data/blogPosts.ts: ##/### headings,
 * paragraphs, bullet and numbered lists (including lists that follow a lead-in
 * line inside the same block), blockquotes, bold/italic/code and links.
 */
export function renderMarkdown(content: string): ReactNode {
    if (!content) return null;
    const blocks = content.replace(/\r\n/g, "\n").split(/\n{2,}/);
    const out: ReactNode[] = [];

    blocks.forEach((block, bi) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        if (trimmed.startsWith("## ")) {
            const text = trimmed.replace(/^##\s+/, "");
            out.push(<h2 key={bi} id={slugifyHeading(text)} className="scroll-mt-32 text-2xl md:text-3xl font-display font-bold mt-12 mb-5 text-gray-900">{renderInline(text)}</h2>);
            return;
        }
        if (trimmed.startsWith("### ")) {
            const text = trimmed.replace(/^###\s+/, "");
            out.push(<h3 key={bi} className="text-xl font-bold mt-8 mb-3 text-gray-900">{renderInline(text)}</h3>);
            return;
        }
        if (trimmed.startsWith("> ")) {
            out.push(
                <blockquote key={bi} className="my-8 border-l-4 border-gold-500 bg-ivory-100 px-6 py-4 text-gray-700 italic rounded-r-2xl">
                    {renderInline(trimmed.split("\n").map((l) => l.replace(/^>\s?/, "")).join(" "))}
                </blockquote>
            );
            return;
        }

        const lines = trimmed.split("\n");
        let run: string[] = [];
        let runType: "bullet" | "numbered" | "text" | null = null;
        const flush = (idx: number) => {
            if (run.length === 0) return;
            const key = `${bi}-${idx}`;
            if (runType === "bullet") out.push(renderList(run, false, key));
            else if (runType === "numbered") out.push(renderList(run, true, key));
            else out.push(<p key={key} className="leading-[1.8] text-gray-600 font-light text-lg">{renderInline(run.join(" "))}</p>);
            run = [];
            runType = null;
        };

        lines.forEach((line, li) => {
            const type: "bullet" | "numbered" | "text" = isBullet(line) ? "bullet" : isNumbered(line) ? "numbered" : "text";
            if (runType !== null && type !== runType) flush(li);
            runType = type;
            run.push(line);
        });
        flush(lines.length);
    });

    return <div className="space-y-6">{out}</div>;
}

export function extractHeadings(content: string): Array<{ id: string; text: string }> {
    return content
        .split("\n")
        .filter((l) => l.startsWith("## "))
        .map((l) => {
            const text = l.replace(/^##\s+/, "").replace(/\*\*/g, "");
            return { id: slugifyHeading(text), text };
        });
}
