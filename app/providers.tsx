"use client";

import { FluxLynxProvider } from "@fluxlynx/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <FluxLynxProvider value={{
        apiBase: process.env.NEXT_PUBLIC_FLUXLYNX_API_BASE,
        apiKey: process.env.NEXT_PUBLIC_FLUXLYNX_API_KEY,
    }} >{children}</FluxLynxProvider>;
}
