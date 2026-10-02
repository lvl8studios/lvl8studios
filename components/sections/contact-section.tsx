import { COMPANY, SOCIAL_LINKS, TEAM_MEMBERS } from "@/lib/constants"
import ContactForm from "@/components/ui/contact-form"

function listNames(names: string[]) {
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
}

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="gutter mt-24 bg-primary pb-8 pt-16 text-primary-foreground selection:bg-white selection:text-primary md:mt-36 [&_:focus-visible]:outline-white md:pt-24"
    >
      <div className="studio-grid gap-y-14">
        <div className="col-span-12 md:col-span-6">
          <h2 id="contact-heading" className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            Let&apos;s build something.
          </h2>
          <p className="mt-6 max-w-[36ch] text-xl leading-snug">
            Hiring, collaborating, or just curious about what we&apos;re making? Write to us.
          </p>
          <a
            href={`mailto:${COMPANY.contact.email}`}
            className="mt-6 inline-block text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-[-0.03em] text-turquoise underline decoration-turquoise/50 underline-offset-[0.15em] hover:decoration-turquoise"
          >
            {COMPANY.contact.email}
          </a>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <ContactForm componentId="contact" />
        </div>
      </div>

      <footer className="studio-grid mt-24 gap-y-6 border-t border-white/40 pt-5 text-[15px] leading-snug md:mt-36">
        <p className="col-span-12 max-w-[60ch] text-white/85 md:col-span-6">
          {COMPANY.name} is {listNames(TEAM_MEMBERS.map((member) => member.name))}.
        </p>
        <ul className="col-span-6 md:col-span-3 md:col-start-8">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline decoration-transparent hover:decoration-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="tabular col-span-6 text-right text-white/85 md:col-span-2 md:col-start-11">
          <p>{COMPANY.contact.location}</p>
          <p>© {new Date().getFullYear()} {COMPANY.name}</p>
        </div>
      </footer>
    </section>
  )
}
