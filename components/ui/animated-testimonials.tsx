"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const getRotateY = (index: number) => {
    // Use deterministic rotation based on index to avoid hydration issues
    const rotations = [-8, -3, 2, -5, 7, -2, 4, -6, 1, -4];
    return rotations[index % rotations.length];
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (autoplay && isMounted) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isMounted]);

  return (
    <div className="mx-auto max-w-sm px-4 py-16 font-sans antialiased md:max-w-5xl md:px-8 lg:px-12">
      {!isMounted ? (
        // Static fallback during hydration
        <div className="relative grid grid-cols-1 gap-16 md:gap-20 lg:grid-cols-2 min-h-[500px]">
          <div className="relative">
            <div className="relative h-96 w-full group">
              {/* Professional background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-xl opacity-60" />
              <div className="relative inset-0 origin-bottom">
                <img
                  src={testimonials[0].src}
                  alt={testimonials[0].name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-2xl object-cover object-center shadow-xl border border-border/20"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4 lg:py-8 min-h-[400px]">
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {testimonials[0].name}
                </h3>
                <p className="text-base text-primary font-medium">
                  {testimonials[0].designation}
                </p>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
              <div className="flex-1">
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {testimonials[0].quote}
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-8">
              <button className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-card/80 border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm">
                <IconArrowLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300" />
              </button>
              <button className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-card/80 border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm">
                <IconArrowRight className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Animated content after hydration
        <div className="relative grid grid-cols-1 gap-16 md:gap-20 lg:grid-cols-2 min-h-[400px]">
          <div className="relative">
            <div className="relative h-96 w-full group">
              {/* Enhanced professional background glow */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: getRotateY(index),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : getRotateY(index),
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -8, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: getRotateY(index),
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                    whileHover={{ scale: isActive(index) ? 1.02 : 0.95 }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-2xl object-cover object-center shadow-xl border border-border/20"
                    />
                    {/* Enhanced subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4 lg:py-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="space-y-6 flex-1"
              >
                <div className="space-y-2">
                  <motion.h3
                    className="text-3xl lg:text-4xl font-bold text-foreground"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    {testimonials[active].name}
                  </motion.h3>
                  <motion.p
                    className="text-base text-primary font-medium"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                  >
                    {testimonials[active].designation}
                  </motion.p>
                </div>
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
                <div className="flex-1">
                  <motion.p
                    className="text-lg lg:text-xl text-muted-foreground leading-relaxed"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    {testimonials[active].quote.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          filter: "blur(4px)",
                          opacity: 0,
                          y: 4,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.3 + 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
            <motion.div
              className="flex gap-3 pt-12 md:pt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.button
                onClick={handlePrev}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-card/80 border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconArrowLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-card/80 border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconArrowRight className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
