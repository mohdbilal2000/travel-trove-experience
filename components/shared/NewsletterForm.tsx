"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(data.message);
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error);
            }
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white/80 font-medium text-center">{message}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto p-2 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-8 py-5 outline-none font-bold text-white placeholder:text-white/20"
                placeholder="Email Address"
                required
            />
            <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-black hover:bg-gold-500 py-5 px-10 rounded-2xl font-bold transition-all h-auto"
            >
                {status === "loading" ? "Sending..." : "Subscribe"}
            </Button>
            {status === "error" && (
                <p className="text-red-400 text-sm mt-2 text-center sm:hidden">{message}</p>
            )}
        </form>
    );
}
