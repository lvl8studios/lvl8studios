import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "lvl8studios",
  description:
    "lvl8studios is a software collective from Singapore. We build CoconutSplit, GyatWord and GyatSound.",
};

const DESIGN_CONTRACT = `<!--
THESIS: lvl8studios as a design studio's index of work. A giant wordmark, then the work as a typographic index where each row is a shipped product. Refuses the centred hero, two buttons and a bento of cards on black.
OWN-WORLD: neutral studio-grey paper, near-black ink, hairline rules, one brand blue (and the logo's turquoise) spent only on the infinity-turned-8, links, and the drenched contact field. Schibsted Grotesk throughout, tight and large; tabular numerals for data.
STORY: a recruiter sees a real team that ships products real people use (10,000 on CoconutSplit), meets the three founders, and emails them.
FIRST VIEWPORT: full-width lowercase wordmark under a thin header, the logo's infinity rotating into the 8; a statement and facts row below; the work index rows starting at the fold.
FORM: Studio Index, pick card (ranked 1 of 7); seed 36e506fd.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DESIGN_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
