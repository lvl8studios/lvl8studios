import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS } from "@/lib/constants"
import { cn } from "@/lib/utils"

type Project = (typeof PROJECTS)[number]

function ProjectPlate({ project }: { project: Project }) {
  if (project.id === "gyatword") {
    return (
      <div
        className="grid grid-cols-12 items-end gap-4 px-4 pt-6 md:gap-8 md:px-12 md:pt-14"
        style={{ backgroundColor: project.previewBackground }}
      >
        <div className="relative col-span-12 aspect-[2940/1670] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.35)] md:col-span-9">
          <Image
            src="/gyatword-detail.png"
            alt="GyatWord crossword in a desktop browser, with brainrot clues listed beside the grid"
            fill
            sizes="(max-width: 768px) 90vw, 70vw"
            className="object-cover object-top"
          />
        </div>
        <div className="relative col-span-3 hidden aspect-[646/1118] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.35)] md:block">
          <Image
            src="/gyatword-detail-mobile.png"
            alt="GyatWord on a phone"
            fill
            sizes="22vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]"
      style={{ backgroundColor: project.previewBackground }}
    >
      <Image
        src={project.preview}
        alt={`${project.title} logo`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={project.id === "coconutsplit" ? "object-contain py-8 md:py-14" : "object-contain px-[18%] py-[12%] md:px-[30%]"}
      />
    </div>
  )
}

function ProjectFacts({ project }: { project: Project }) {
  return (
    <div className="text-[15px] leading-snug">
      <dl>
        {project.stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-foreground/20 py-2.5">
            <dt className="text-muted-foreground">{stat.label}</dt>
            <dd className="text-right font-semibold">{stat.value}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-b border-foreground/20 py-2.5">
          <dt className="text-muted-foreground">Built with</dt>
          <dd className="text-right">{project.technologies.join(", ")}</dd>
        </div>
      </dl>

      <ul className="mt-6">
        {project.links.map((link, index) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center justify-between gap-4 border-b border-foreground py-2.5 font-semibold",
                index === 0 && "text-primary",
              )}
            >
              <span className="underline decoration-transparent transition-[text-decoration-color] duration-200 group-hover:decoration-current">
                {link.label}
              </span>
              <ArrowUpRight aria-hidden strokeWidth={1.75} className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectCase({ project }: { project: Project }) {
  return (
    <article id={project.id} aria-labelledby={`${project.id}-title`} className="gutter pt-24 md:pt-36">
      <div className="studio-grid gap-y-8 border-t border-foreground pt-5">
        <header className="col-span-12 md:col-span-4">
          <h2 id={`${project.id}-title`} className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            {project.title}
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">{project.kind}</p>
        </header>

        <p className="col-span-12 max-w-[34ch] text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.3] tracking-[-0.015em] md:col-span-4 md:col-start-6">
          {project.description}
        </p>

        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <ProjectFacts project={project} />
        </div>

        <figure className="col-span-12 md:mt-4">
          <ProjectPlate project={project} />
        </figure>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  return (
    <>
      {PROJECTS.map((project) => (
        <ProjectCase key={project.id} project={project} />
      ))}
    </>
  )
}
