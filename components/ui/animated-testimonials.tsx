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
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      {!isMounted ? (
        // Static fallback during hydration
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 origin-bottom">
                <img
                  src={testimonials[0].src}
                  alt={testimonials[0].name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-3xl object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {testimonials[0].name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {testimonials[0].designation}
              </p>
              <p className="mt-8 text-lg text-muted-foreground">
                {testimonials[0].quote}
              </p>
            </div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
                <IconArrowLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300 group-hover/button:rotate-12" />
              </button>
              <button className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
                <IconArrowRight className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Animated content after hydration
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative h-80 w-full">
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
                        ? 40
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
          <div className="flex flex-col justify-between py-4">
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
            >
              <h3 className="text-2xl font-bold text-foreground">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {testimonials[active].designation}
              </p>
              <motion.p className="mt-8 text-lg text-muted-foreground">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors"
              >
                <IconArrowLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300 group-hover/button:rotate-12" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors"
              >
                <IconArrowRight className="h-5 w-5 text-muted-foreground group-hover/button:text-primary transition-colors duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
