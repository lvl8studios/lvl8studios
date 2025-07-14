"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface AppIcon {
  src: string;
  title: string;
}

interface CyclingAppIconsProps {
  icons: AppIcon[];
  className?: string;
}

export function CyclingAppIcons({ icons, className = "" }: CyclingAppIconsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icons.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [icons.length]);

  const getStackPosition = (index: number, currentIndex: number, totalIcons: number) => {
    const position = (index - currentIndex + totalIcons) % totalIcons;
    return position;
  };

  return (
    <div className={`relative w-24 h-24 ${className}`}>
      {icons.map((icon, index) => {
        const position = getStackPosition(index, currentIndex, icons.length);
        const isActive = position === 0;
        const isSecond = position === 1;
        const isThird = position === 2;

        return (
          <motion.div
            key={`${icon.title}-${index}`}
            className="absolute inset-0"
            initial={false}
            animate={{
              scale: isActive ? 1 : isSecond ? 0.9 : 0.8,
              x: isActive ? 0 : isSecond ? 8 : 16,
              y: isActive ? 0 : isSecond ? 8 : 16,
              rotate: isActive ? 0 : isSecond ? 5 : 10,
              zIndex: icons.length - position,
              opacity: position < 3 ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={`/${icon.src}`}
                alt={icon.title}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
