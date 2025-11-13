// @ts-nocheck
"use client";
import * as React from "react";
import { useFluxLynx } from "@fluxlynx/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Mail, User, MessageSquare } from "lucide-react";

export type ContactFormProps = {
    componentId?: string;
    className?: string;
    onSubmitted?: (ok: boolean) => void;
};

export default function ContactForm({
    componentId,
    className,
    onSubmitted,
}: ContactFormProps) {
    const { trpc } = useFluxLynx();
    const [state, setState] = useState<{
        name: string;
        email: string;
        message: string;
    }>({
        name: "",
        email: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await trpc.feedback.submit.mutate({
                kind: "contact-1",
                componentId,
                data: {
                    name: state.name || state.email,
                    email: state.email,
                    message: state.message,
                },
            });
            onSubmitted?.(res.ok);
            setStatus(res.ok ? "success" : "error");
            if (res.ok) {
                setState({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch {
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className={cn("w-full max-w-xl", className)}>
            <div className="rounded-xl border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <form onSubmit={onSubmit} className="p-6 sm:p-8 grid gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    aria-label="Your name"
                                    className="pl-9"
                                    value={state.name}
                                    onChange={(e) =>
                                        setState((s) => ({ ...s, name: e.target.value }))
                                    }
                                    required
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    aria-label="Your email"
                                    className="pl-9"
                                    value={state.email}
                                    onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                                    required
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message (optional)</Label>
                        <div className="relative">
                            <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                                id="message"
                                aria-label="Your message"
                                className="pl-9 min-h-32"
                                value={state.message}
                                onChange={(e) =>
                                    setState((s) => ({ ...s, message: e.target.value }))
                                }
                                rows={5}
                                placeholder="Tell us a bit about your needs..."
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">We typically respond within 1–2 business days.</p>
                    </div>

                    {status !== "idle" && (
                        <div
                            className={cn(
                                "rounded-md border p-3 text-sm",
                                status === "success"
                                    ? "border-green-300/30 text-green-700 dark:text-green-400 bg-green-50/50 dark:bg-green-950/20"
                                    : "border-red-300/30 text-red-700 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20"
                            )}
                            role="status"
                        >
                            {status === "success"
                                ? "Thanks! Your message was sent successfully."
                                : "Sorry, something went wrong. Please try again."}
                        </div>
                    )}

                    <Button type="submit" disabled={submitting} className="justify-center">
                        {submitting ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Sending…
                            </span>
                        ) : (
                            "Send message"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}


