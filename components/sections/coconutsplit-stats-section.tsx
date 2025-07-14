"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  DollarSign, 
  CreditCard, 
  Banknote, 
  Coins,
  Plane, 
  Globe, 
  MapPin, 
  Luggage,
  TrendingUp,
  Building2,
  Map,
  Backpack,
  Wallet,
  Receipt,
  Navigation
} from "lucide-react"
import { COCONUTSPLIT_SECTION } from "@/lib/constants"

interface StaticNumberProps {
  value: number
  prefix?: string
  suffix?: string
}

function StaticNumber({ value, prefix = "", suffix = "" }: StaticNumberProps) {
  return (
    <span className="font-black text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}

function FloatingIcon({ children, delay = 0, duration = 8, className = "" }: { 
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={`absolute text-primary/20 ${className}`}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function CoconutSplitStatsSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to opacity values for each section (no fade out)
  // More aggressive transitions on mobile
  const openingOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1])
  const usersOpacity = useTransform(scrollYProgress, [0.15, 0.27], [0, 1])
  const transactionsOpacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1])
  const valueOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1])

  // Transform for Y position (slide up effect)
  const openingY = useTransform(scrollYProgress, [0, 0.12], [50, 0])
  const usersY = useTransform(scrollYProgress, [0.15, 0.27], [50, 0])
  const transactionsY = useTransform(scrollYProgress, [0.3, 0.42], [50, 0])
  const valueY = useTransform(scrollYProgress, [0.45, 0.6], [50, 0])



  return (
    <section ref={containerRef} className="min-h-[300vh] md:min-h-[550vh] bg-background relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Essential Money Icons */}
          <FloatingIcon delay={0} duration={10} className="top-20 left-10 text-2xl md:text-4xl">
            <DollarSign size={24} className="md:w-8 md:h-8" />
          </FloatingIcon>
          <FloatingIcon delay={2} duration={12} className="top-32 right-16 text-xl md:text-3xl">
            <CreditCard size={20} className="md:w-6 md:h-6" />
          </FloatingIcon>
          <FloatingIcon delay={4} duration={9} className="bottom-40 left-20 text-3xl md:text-5xl">
            <Banknote size={28} className="md:w-10 md:h-10" />
          </FloatingIcon>
          <FloatingIcon delay={1} duration={11} className="bottom-20 right-20 text-2xl md:text-4xl">
            <Coins size={24} className="md:w-8 md:h-8" />
          </FloatingIcon>
          
          {/* Essential Travel Icons */}
          <FloatingIcon delay={3} duration={13} className="top-40 left-1/4 text-xl md:text-3xl">
            <Plane size={20} className="md:w-6 md:h-6" />
          </FloatingIcon>
          <FloatingIcon delay={5} duration={8} className="top-60 right-1/4 text-2xl md:text-4xl">
            <Globe size={24} className="md:w-8 md:h-8" />
          </FloatingIcon>
          <FloatingIcon delay={2.5} duration={10} className="bottom-60 left-1/3 text-xl md:text-3xl">
            <MapPin size={20} className="md:w-6 md:h-6" />
          </FloatingIcon>
          <FloatingIcon delay={4.5} duration={9} className="bottom-32 right-1/3 text-2xl md:text-4xl">
            <Luggage size={24} className="md:w-8 md:h-8" />
          </FloatingIcon>
          
          {/* Additional Icons - Hidden on mobile */}
          <FloatingIcon delay={1.5} duration={14} className="hidden md:block top-1/4 left-12 text-3xl">
            <TrendingUp size={24} />
          </FloatingIcon>
          <FloatingIcon delay={3.5} duration={7} className="hidden md:block top-3/4 right-12 text-3xl">
            <Building2 size={24} />
          </FloatingIcon>
          
          <FloatingIcon delay={0.5} duration={11} className="hidden md:block top-1/2 left-8 text-4xl">
            <Map size={32} />
          </FloatingIcon>
          <FloatingIcon delay={2.8} duration={12} className="hidden md:block top-1/2 right-8 text-3xl">
            <Backpack size={24} />
          </FloatingIcon>
          
          {/* Extra Icons - Desktop only */}
          <FloatingIcon delay={6} duration={15} className="hidden md:block top-16 right-1/3 text-3xl">
            <Wallet size={24} />
          </FloatingIcon>
          <FloatingIcon delay={7} duration={9} className="hidden md:block bottom-16 left-1/2 text-4xl">
            <Receipt size={32} />
          </FloatingIcon>
          <FloatingIcon delay={1.8} duration={13} className="hidden md:block top-2/3 left-1/4 text-3xl">
            <Navigation size={24} />
          </FloatingIcon>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Opening line */}
            <motion.div
              style={{ opacity: openingOpacity, y: openingY }}
              className="mb-8 md:mb-16"
            >
              <p className="text-sm md:text-md lg:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {COCONUTSPLIT_SECTION.stats.openingText}
              </p>
            </motion.div>

            {/* Users stat */}
            <motion.div
              style={{ opacity: usersOpacity, y: usersY }}
              className="mb-8 md:mb-16"
            >
              <div className="flex items-baseline justify-center gap-2 md:gap-3">
                <StaticNumber 
                  value={COCONUTSPLIT_SECTION.stats.users.value} 
                />
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  {COCONUTSPLIT_SECTION.stats.users.label}
                </p>
              </div>
            </motion.div>

            {/* Transactions stat */}
            <motion.div
              style={{ opacity: transactionsOpacity, y: transactionsY }}
              className="mb-8 md:mb-16"
            >
              <div className="flex items-baseline justify-center gap-2 md:gap-3">
                <StaticNumber 
                  value={COCONUTSPLIT_SECTION.stats.transactions.value} 
                />
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  {COCONUTSPLIT_SECTION.stats.transactions.label}
                </p>
              </div>
            </motion.div>

            {/* Value stat */}
            <motion.div
              style={{ opacity: valueOpacity, y: valueY }}
              className="mb-8 md:mb-16"
            >
              <div className="flex items-baseline justify-center gap-2 md:gap-3">
                <StaticNumber 
                  value={COCONUTSPLIT_SECTION.stats.value.value}
                  prefix={COCONUTSPLIT_SECTION.stats.value.prefix}
                  suffix={COCONUTSPLIT_SECTION.stats.value.suffix}
                />
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  {COCONUTSPLIT_SECTION.stats.value.label}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
