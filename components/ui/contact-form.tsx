"use client";
import * as React from "react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

export type ContactFormProps = {
    componentId?: string;
    className?: string;
    onSubmitted?: (ok: boolean) => void;
};

const fieldClass =
    "w-full border-0 border-b border-white/50 bg-transparent px-0 py-2.5 text-lg text-white placeholder:text-white/85 caret-white transition-colors focus:border-white focus:outline-none focus-visible:outline-none";

export default function ContactForm({
    componentId,
    className,
    onSubmitted,
}: ContactFormProps) {
    const [state, setState] = useState<{
        name: string;
        email: string;
        message: string;
    }>({
        name: "",
        email: "",
        message: "",
    });
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const subject = `Website enquiry from ${state.name}`;
        const body = [
            `Name: ${state.name}`,
            `Email: ${state.email}`,
            componentId ? `Page section: ${componentId}` : "",
            "",
            state.message,
        ].filter(Boolean).join("\n");

        onSubmitted?.(true);
        window.location.href = `mailto:${COMPANY.contact.email}?${new URLSearchParams({ subject, body })}`;
    }

    return (
        <form onSubmit={onSubmit} className={cn("grid gap-7 text-[15px]", className)}>
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
                <label className="grid gap-1">
                    <span className="font-medium text-white">Name</span>
                    <input
                        name="name"
                        autoComplete="name"
                        className={fieldClass}
                        value={state.name}
                        onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                        required
                        placeholder="Jane Doe"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="font-medium text-white">Email</span>
                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={fieldClass}
                        value={state.email}
                        onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                        required
                        placeholder="you@example.com"
                    />
                </label>
            </div>
            <label className="grid gap-1">
                <span className="font-medium text-white">Message (optional)</span>
                <textarea
                    name="message"
                    className={cn(fieldClass, "min-h-28 resize-y")}
                    value={state.message}
                    onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
                    rows={3}
                    placeholder="What would you like to talk about?"
                />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-white/80">Opens your email app. We usually reply within 1–2 business days.</p>
                <button
                    type="submit"
                    className="group inline-flex items-center gap-2 bg-white px-5 py-3 font-semibold text-primary transition-colors hover:bg-foreground hover:text-white focus-visible:outline-white"
                >
                    Compose email
                    <ArrowRight aria-hidden strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
            </div>
        </form>
    );
}
