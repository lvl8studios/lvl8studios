"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote?: string;
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

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const getRotateY = (index: number) => {
    // Use deterministic rotation based on index to avoid hydration issues
    const rotations = [-8, -3, 2, -5, 7, -2, 4, -6, 1, -4];
    return rotations[index % rotations.length];
  };

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-4">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <div className="relative h-64 md:h-72 lg:h-80 w-full">
            <AnimatePresence>
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
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotateY(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
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
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="text-center mb-8"
          >
            <div className="text-lg font-medium text-muted-foreground mb-1">
              {testimonials[active].name}
            </div>
            <div className="text-sm text-primary/90">
              {testimonials[active].designation}
            </div>
          </motion.div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center group/button hover:bg-accent/10 transition-colors duration-300"
            >
              <IconArrowLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-primary group-hover/button:rotate-12 transition-all duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center group/button hover:bg-accent/10 transition-colors duration-300"
            >
              <IconArrowRight className="h-5 w-5 text-muted-foreground group-hover/button:text-primary group-hover/button:-rotate-12 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
