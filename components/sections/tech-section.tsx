import Link from "next/link"
import { STACK } from "@/lib/constants"

export function TechSection() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="gutter pt-24 md:pt-36">
      <div className="studio-grid gap-y-8 border-t border-foreground pt-5">
        <div className="col-span-12 md:col-span-4">
          <h2 id="stack-heading" className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            How we build
          </h2>
          <Link
            href="/blog/tech-stack-choices"
            className="mt-4 inline-block text-[15px] font-semibold text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            Why we chose these tools
          </Link>
        </div>

        {STACK.map((group, index) => (
          <div key={group.title} className={index === 0 ? "col-span-12 sm:col-span-6 md:col-span-4 md:col-start-6" : "col-span-12 sm:col-span-6 md:col-span-3 md:col-start-10"}>
            <h3 className="border-b border-foreground/20 pb-2.5 text-[15px] text-muted-foreground">{group.title}</h3>
            <ul className="mt-3 text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em]">
              {group.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
