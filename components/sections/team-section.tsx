import Image from "next/image"
import Link from "next/link"
import { TEAM_MEMBERS } from "@/lib/constants"

export function TeamSection() {
  return (
    <section id="people" aria-labelledby="people-heading" className="gutter pt-24 md:pt-36">
      <div className="studio-grid gap-y-8 border-t border-foreground pt-5">
        <div className="col-span-12 md:col-span-4">
          <h2 id="people-heading" className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            People
          </h2>
          <p className="mt-4 max-w-[28ch] text-[15px] leading-snug text-muted-foreground">
            Three founders based in Singapore.
          </p>
        </div>

        <ul className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:col-span-8 md:gap-x-6 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <li key={member.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={member.src}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 18vw"
                  priority={index < 4}
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <p className="mt-3 text-[15px] font-semibold leading-tight">{member.name}</p>
              <p className="text-[15px] leading-tight text-muted-foreground">{member.designation}</p>
            </li>
          ))}
          <li className="flex aspect-[4/5] flex-col justify-end border border-foreground p-4">
            <p className="text-[15px] leading-snug">Want to build with us?</p>
            <Link href="#contact" className="mt-1 text-[15px] font-semibold text-primary underline decoration-primary/40 hover:decoration-primary">
              Get in touch
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
