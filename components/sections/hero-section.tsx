import Link from "next/link"
import { COMPANY, PROJECTS, TEAM_MEMBERS } from "@/lib/constants"

const FOUNDERS = TEAM_MEMBERS.filter((member) => member.designation === "Co-Founder").map((member) => member.name)

function Letters({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {text.split("").map((letter, index) => (
        <span key={index} className="wordmark-letter" style={{ "--i": offset + index } as React.CSSProperties}>
          {letter}
        </span>
      ))}
    </>
  )
}

export function HeroSection() {
  return (
    <section id="top" className="gutter pt-20 md:pt-24">
      <h1
        aria-label={COMPANY.name}
        className="-ml-[0.04em] -mt-[0.12em] overflow-hidden whitespace-nowrap pb-[0.02em] pt-[0.12em] text-[length:calc((100vw_-_2*var(--gutter))*0.204)] font-bold leading-[0.82] tracking-[-0.04em]"
      >
        <span aria-hidden="true">
          <Letters text="lvl" offset={0} />
          <span className="relative mx-[0.02em] inline-block h-[0.74em] w-[0.42em] align-baseline">
            <span className="absolute inset-0 flex items-center justify-center">
              {/* The logo's infinity sign turns upright to become the 8 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="" className="infinity-eight w-[0.8em] max-w-none shrink-0" />
            </span>
          </span>
          <Letters text="studios" offset={4} />
        </span>
      </h1>

      <div className="studio-grid settle-in mt-8 gap-y-10 border-t border-foreground pt-6 md:mt-10">
        <p className="col-span-12 text-[clamp(1.5rem,2.5vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em] md:col-span-8 lg:col-span-7">
          {COMPANY.statement}
        </p>

        <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-5 text-[15px] leading-snug md:col-span-4 md:col-start-9 md:grid-cols-1 lg:col-span-3 lg:col-start-10">
          <div>
            <dt className="text-muted-foreground">Founded by</dt>
            <dd>{FOUNDERS.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Team</dt>
            <dd>{`${TEAM_MEMBERS.length} people, ${PROJECTS.length} products shipped`}</dd>
          </div>
          <div className="col-span-2 md:col-span-1">
            <dt className="sr-only">Contact</dt>
            <dd>
              <Link href="#contact" className="font-semibold text-primary underline decoration-primary/40 hover:decoration-primary">
                Work with us
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
