---
name: lvl8studios
description: A software collective's portfolio set as a design-studio index of shipped work.
colors:
  studio-paper: "hsl(60 7% 91%)"
  ink: "hsl(0 0% 7%)"
  graphite: "hsl(60 3% 33%)"
  plate-grey: "hsl(60 6% 86%)"
  studio-blue: "hsl(223 65% 47%)"
  on-blue: "hsl(0 0% 100%)"
  logo-turquoise: "hsl(176 64% 62%)"
  rule-soft: "hsl(0 0% 7% / 0.2)"
  rule-faint: "hsl(0 0% 7% / 0.15)"
typography:
  wordmark:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "calc((100vw - 2 * var(--gutter)) * 0.204)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  index:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.7vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  list-title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
    fontFeature: "\"ss01\", \"cv11\""
rounded:
  none: "0px"
  focus: "2px"
spacing:
  fact-row: "10px"
  rule-to-content: "20px"
  row: "20px"
  row-wide: "28px"
  gutter: "20px"
  column-gap: "24px"
  gutter-wide: "32px"
  section: "96px"
  section-wide: "144px"
components:
  site-header:
    backgroundColor: "{colors.studio-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "56px"
    padding: "0 32px"
  index-row:
    textColor: "{colors.ink}"
    typography: "{typography.index}"
    rounded: "{rounded.none}"
    padding: "28px 0"
  fact-row:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "10px 0"
  text-link:
    textColor: "{colors.studio-blue}"
    typography: "{typography.label}"
  contact-field:
    backgroundColor: "{colors.studio-blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.none}"
    padding: "96px 32px 32px"
  button-on-blue:
    backgroundColor: "{colors.on-blue}"
    textColor: "{colors.studio-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-on-blue-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-blue}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.on-blue}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  portrait:
    backgroundColor: "{colors.plate-grey}"
    rounded: "{rounded.none}"
---

# Design System: lvl8studios

## Overview

**Creative North Star: "The Studio Index"**

The site is a design studio's index of its own work. A full-width lowercase wordmark opens the page, with the logo's infinity sign turning upright to become the 8. Below it, the products are listed as a typographic index: one ruled row per product, set very large, with a "What it is" and a "Proof" column beside each name. Everything after that reads like a catalogue: ruled sections, a heading on the left, facts on the right, and a printed plate of the product underneath.

The material is plain studio paper. A warm, neutral light grey ground, near-black ink, 1px ink rules, square corners, and no cards, tints or gradients. One typeface, Schibsted Grotesk, carries every level; hierarchy comes from size, weight and tight negative tracking. Colour is held back until it means something. Studio blue marks links and actions, and at the end of the page it floods the whole contact section. The logo's turquoise appears only inside that blue field.

Density is low and rhythm is generous: sections sit 9rem apart on desktop, and every one opens on the same full-width ink rule. Motion is quiet and runs once. The wordmark letters rise from the baseline, the infinity turns into an 8, and the statement settles in. After that, movement happens only in response to the pointer.

**Key Characteristics:**
- Full-width lowercase wordmark sized to the viewport, with the logo mark standing in for the 8.
- Work shown as a ruled typographic index, not as cards.
- Studio-grey paper, ink, 1px ink rules, square corners throughout.
- One family (Schibsted Grotesk), very large and very tight at the top of the scale.
- Blue is reserved for links, actions and the full-bleed contact field.
- Product imagery sits on flat plates in each product's own colour.

## Colors

A near-monochrome paper-and-ink palette with one saturated blue and a turquoise that only appears on that blue.

### Primary
- **Studio Blue** (`studio-blue`): every text link ("Work with us", "Get in touch", "All posts", the first outbound link of each product), the arrow that appears on a hovered index row, text selection, the text cursor, the focus ring, and the full-bleed ground of the contact section and footer. On paper it reaches 5.4:1 contrast. White text on it reaches 6.5:1.

### Secondary
- **Logo Turquoise** (`logo-turquoise`): taken from the logo's gradient. It is used only inside the blue contact field, for the large email address (3.9:1 on blue, so it stays at 24px and above).

### Neutral
- **Studio Paper** (`studio-paper`): the page ground everywhere outside the contact field, including the fixed header and the mobile menu.
- **Ink** (`ink`): all text, every structural rule, the bordered "Want to build with us?" tile, and the hover state of the button on blue.
- **Graphite** (`graphite`): secondary text. Used for fact keys ("Users", "Built with"), column headings, kinds ("Telegram bot"), dates, read times, and the local clock's city name. 6:1 on paper.
- **Plate Grey** (`plate-grey`): the placeholder ground behind team portraits while they load.
- **Soft Rule** (`rule-soft`): ink at 20%, used for sub-rows inside a section (fact lists, stack group headings, post rows).
- **Faint Rule** (`rule-faint`): ink at 15%, used for the header's bottom edge once the page scrolls and for mobile-menu dividers.
- **On Blue** (`on-blue`): text on the contact field, and the ground of its button. Lower-emphasis text on blue is white at 80–85%. The contact footer rule is white at 40%.

Product plates use each product's own colour (CoconutSplit cream, GyatWord charcoal, GyatSound brown), stored with the project data. These are content, not palette tokens.

### Named Rules
**The Spent Blue Rule.** Studio blue appears only where something can be clicked, plus the contact field. It never fills a decorative shape, tints a section, or colours a heading.

**The Turquoise Lives On Blue Rule.** Turquoise appears only on the studio-blue field (and in the logo itself). It never sits on paper.

**The Ink Line Rule.** Structural lines are ink: full strength for section and row rules, 20% for sub-rows, 15% for the header edge. The grey `--border` token is not used for visible rules.

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** none; labels use the same family, with tabular numerals for dates, counts and years.

**Character:** One grotesque used at newspaper-masthead scale at the top and plain 15px at the bottom. The big sizes are bold and tracked tightly to -0.04em, so names read as solid blocks.

### Hierarchy
- **Wordmark** (700, viewport-fitted so "lvl8studios" spans the gutter-to-gutter width, line-height 0.82): the hero only, once per site.
- **Display** (700, clamp 3–6rem, 0.9): page and closing headings ("Let's build something.", the blog index "Writing").
- **Index** (700, clamp 2.75–6rem, 0.9): product names in the work index rows.
- **Headline** (700, clamp 2.5–4.5rem, 0.92): section and product-case headings ("People", "How we build", "CoconutSplit").
- **Title** (500, clamp 1.5–2.5rem, 1.12): the hero statement. The stack lists use a near-identical setting (clamp 1.5–2.25rem, 1.15).
- **Lead** (400, clamp 1.25–1.6rem, 1.3, max 34ch): product descriptions.
- **List title** (600, 1.25rem, 1.375): post titles in writing lists.
- **Body** (400, 1.125–1.25rem, 1.375, max 30–36ch): short intros and form field text.
- **Label** (400 or 600, 15px, 1.375): navigation, fact keys and values, column headings, captions, footer. Key in graphite, value in ink, emphasis by weight 600.

### Named Rules
**The One Family Rule.** Schibsted Grotesk is the only typeface. Hierarchy comes from size, weight (400/500/600/700) and tracking, never from a second family.

**The Tight Top Rule.** Tracking tightens as size grows: -0.04em at display sizes, -0.03em for the title, -0.015em to -0.02em for lead and list titles, and normal at 15px.

**The 15px Floor Rule.** Supporting text is 15px, not smaller. Graphite marks the key and ink marks the value. There is no 12–13px caption tier.

## Layout

The page uses a 12-column grid (`studio-grid`, 24px column gap) inside a fluid gutter (20px on mobile, 32px from 768px up). Nothing is centred in a narrow container. Content runs gutter to gutter, and line length is controlled with `ch` maximums on paragraphs.

Each section repeats one pattern. A full-width 1px ink rule, then 20px of space, then the heading in columns 1–4 and the content starting at column 5 or 6. Product cases split into heading (1–4), description (6–9) and facts (10–12), followed by a full-width plate. The work index uses its own columns: name (1–6), what it is (7–8), proof (9–11), arrow (12).

Vertical rhythm is 96px between sections on mobile and 144px from 768px up. Index rows have 20px of vertical padding (28px on desktop) and fact rows have 10px. The header is 56px tall and fixed, and anchor scrolling allows 4.5rem for it.

Breakpoints follow Tailwind's defaults (640, 768, 1024). Below 768px every column stacks to full width. Hero facts become a two-up grid. Index rows put the name on its own line with "what it is" and "proof" side by side underneath. The team grid goes from four columns to three to two. The cursor-following preview is turned off.

### Named Rules
**The Rule-Then-Head Rule.** Every section opens on a full-width 1px ink rule, with its heading under the rule on the left. There are no section backgrounds, cards or dividing bands. The only change of ground is the contact field.

## Elevation & Depth

The system is flat. Surfaces have no shadows, no tonal layers and no blur, and the fixed header is solid paper with a rule that fades in after 8px of scroll. Depth appears only under rasters, as if a print were lying on the page.

### Shadow Vocabulary
- **Print lift** (`box-shadow: 0 18px 40px -12px rgba(0,0,0,0.35)`): the floating product preview that follows the cursor over the work index.
- **Screen lift** (`box-shadow: 0 -8px 40px rgba(0,0,0,0.35)`): product screenshots standing on a coloured plate (GyatWord desktop and phone).

### Named Rules
**The Print-Only Shadow Rule.** Only images cast shadows. Text, rules, buttons, inputs and the header never do.

## Shapes

Every corner is square: plates, portraits, the hover preview, the team call-to-action tile, the contact button and the inputs. The only rounding is the 2px radius on the focus outline. Form comes from rules, not boxes. Lines separate things and outlines are rare (only the "Want to build with us?" tile has a full 1px ink border). Portraits are 4:5. Product plates are 21:9 on desktop and 4:3 on mobile. The hover preview is a 336 × 240 landscape that opens with a bottom-to-top clip reveal.

## Components

### Site Header
Thin, fixed and solid. 56px tall on studio paper. On the left is the logo mark (28 × 12) with the semibold lowercase name. In the centre are four 15px links (Work, People, Writing, Contact), underlined in ink on hover. On the right is the city name in graphite with a live local time in ink. The bottom rule is transparent at the top of the page and turns faint ink after scrolling. On mobile, a text button ("Menu"/"Close") opens a full-screen paper sheet with 3rem bold links divided by faint rules, and the clock sits at the bottom. Escape closes it.

### Wordmark
The hero heading is the lowercase name sized to the viewport. The logo's infinity image sits where the 8 should be and is rotated 90°. On first paint each letter rises from below the baseline (1.1s, 45ms stagger) and the infinity scales in and turns upright (1.6s). Below it, a full ink rule separates the title-size statement (columns 1–7) from a short facts list (columns 10–12) and a blue "Work with us" link.

### Work Index Row
The signature component. A ruled row with the product name at index size, its kind, its proof in semibold, and a 32px blue down-right arrow. On hover or focus, the row's name slides 12px right, the arrow fades in, the other rows dim to 30% opacity, and a square-cornered preview of the product on its own colour opens with a bottom-up clip reveal (500ms) and trails the cursor with an eased lag. Clicking jumps to the product case below.

### Fact List
Key/value rows separated by soft rules, with the key in graphite on the left and the value right-aligned in ink (semibold for numbers). Under it, outbound links each get a full ink rule, a semibold label and an up-right arrow that nudges out on hover. The first link in each list is studio blue and the rest are ink.

### Text Links
Studio blue, semibold, 15px, with a 40%-blue underline that becomes solid blue on hover. Ink links (nav, post titles, footer) start with a transparent underline and gain one on hover. The underline offset is 0.18em and its thickness is 1px.

### Team Portraits
4:5 square-cornered photos shown in greyscale. On hover a photo regains its colour and scales up 3% over 700ms. Name in 15px semibold ink, role in graphite. The grid ends with an ink-bordered tile of the same size that invites contact.

### Post List
A 12-column row with the date in graphite tabular numerals, the title at list-title size underlined on hover, and the read time right-aligned. Rows are separated by soft rules, and the list opens on a full ink rule. The homepage writing section and the blog index share this list.

### Contact Field
Full-bleed studio blue, holding the display-size heading, a short intro, the email address in large turquoise, and the form. Inside the field, selection inverts to white-on-blue and focus outlines turn white. The site footer lives at the bottom of this same field, above a 40%-white rule: the team colophon, social links, and the location and year in tabular numerals.

### Inputs / Fields
Underline-only fields on blue. No box and no background, just a 50%-white bottom rule that turns solid white on focus. Text is white at 1.125rem with a white caret. Labels sit above in 15px solid white, weight 500. Placeholders are white at 85%, so they read as hints, not as filled-in values.

### Buttons
There is one button, and it sits inside the contact field. It is a square white block with semibold blue text, 12 × 20px padding and a trailing arrow. On hover it inverts to an ink ground with white text, and the arrow nudges right. The site has no buttons on paper. Actions there are text links.

## Do's and Don'ts

### Do:
- **Do** open every new section with a full-width 1px ink rule, then the heading in columns 1–4 and content from column 5 or 6.
- **Do** list collections as ruled rows (index rows, fact rows, post rows) before reaching for any grid of boxes.
- **Do** set headings in Schibsted Grotesk 700 with -0.04em tracking and line-height of 0.9–0.92.
- **Do** keep supporting text at 15px, with the key in graphite and the value in ink.
- **Do** use tabular numerals for dates, counts and years.
- **Do** let only images cast shadows, using the print lift and screen lift values above.
- **Do** keep all motion on the `cubic-bezier(0.16, 1, 0.3, 1)` ease-out and respect reduced-motion, which collapses every animation and transition.

### Don't:
- **Don't** round corners. Plates, portraits, tiles, buttons and inputs are square (0px).
- **Don't** use studio blue for decoration, section tints or headings. It is for links, actions and the contact field.
- **Don't** put logo turquoise on studio paper.
- **Don't** add a second typeface or a caption size below 15px.
- **Don't** wrap work, people or posts in cards with backgrounds, borders and shadows. The index and the rules do that job.
- **Don't** switch the page to a dark ground. Paper is the ground, and studio blue is the only colour that ever floods a section.
