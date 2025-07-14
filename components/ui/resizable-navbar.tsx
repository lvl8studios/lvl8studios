"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface NavItem {
  name: string;
  link: string;
}

interface ProductItem {
  label: string;
  href: string;
}

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[9999] px-4">
      {children}
    </div>
  );
};

export const NavBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-background/80 border border-border rounded-full px-4 py-2 backdrop-blur-md shadow-lg">
      {children}
    </div>
  );
};

export const NavbarLogo = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // On home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // On other pages, navigate to home page
      window.location.href = '/';
    }
  };

  return (
    <a
      href="/"
      onClick={handleLogoClick}
      className="flex items-center space-x-3 text-foreground font-medium"
    >
      <Image
        src={COMPANY.logo}
        alt={`${COMPANY.name} logo`}
        width={48}
        height={48}
        className="w-12 h-12 object-contain"
      />
      <span className="text-xl font-bold">{COMPANY.name}</span>
    </a>
  );
};

export const NavItems = ({ 
  items, 
  products,
  aboutItems 
}: { 
  items: NavItem[];
  products: ProductItem[];
  aboutItems: ProductItem[];
}) => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (link: string) => {
    if (link.startsWith('/')) {
      // External page navigation
      window.location.href = link;
      return;
    }
    
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // On home page, scroll to section
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other pages, navigate to home page with hash
      window.location.href = `/${link}`;
    }
  };

  const handleDropdownClick = (href: string) => {
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // On home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other pages, navigate to home page with hash
      window.location.href = `/${href}`;
    }
  };

  return (
    <div className="flex flex-row space-x-6 items-center">
      {/* Products Dropdown */}
      <div className="relative" ref={productsDropdownRef}>
        <button
          onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          Products
          <ChevronDown 
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isProductsDropdownOpen && "rotate-180"
            )}
          />
        </button>
        
        <AnimatePresence>
          {isProductsDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-48 bg-background/90 backdrop-blur-md border border-border rounded-lg shadow-lg py-2 z-50"
            >
              {products.map((product, idx) => (
                <button
                  key={`product-${idx}`}
                  onClick={() => {
                    handleDropdownClick(product.href);
                    setIsProductsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {product.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Dropdown */}
      <div className="relative" ref={aboutDropdownRef}>
        <button
          onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          About
          <ChevronDown 
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isAboutDropdownOpen && "rotate-180"
            )}
          />
        </button>
        
        <AnimatePresence>
          {isAboutDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-48 bg-background/90 backdrop-blur-md border border-border rounded-lg shadow-lg py-2 z-50"
            >
              {aboutItems.map((item, idx) => (
                <button
                  key={`about-${idx}`}
                  onClick={() => {
                    handleDropdownClick(item.href);
                    setIsAboutDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Regular Nav Items */}
      {items.map((item, idx) => (
        <button
          key={`link-${idx}`}
          onClick={() => handleNavClick(item.link)}
          className="relative text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <span className="block">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export const NavbarButton = ({
  children,
  onClick,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-full transition-colors",
        variant === "primary"
          ? "bg-neutral-100 text-black hover:bg-neutral-200"
          : "bg-transparent text-neutral-300 hover:bg-neutral-800 border border-neutral-600",
        className
      )}
    >
      {children}
    </button>
  );
};

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
  return <div className="block md:hidden">{children}</div>;
};

export const MobileNavHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row justify-between items-center bg-background/80 border border-border rounded-full px-4 py-2 backdrop-blur-md shadow-lg">
      {children}
    </div>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

export const MobileNavMenu = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 bg-background/80 border border-border rounded-2xl p-6 backdrop-blur-md shadow-lg overflow-hidden"
        >
          <div className="flex flex-col space-y-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileProductAccordion = ({
  title,
  items,
  onClose,
}: {
  title: string;
  items: ProductItem[];
  onClose: () => void;
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleItemClick = (href: string) => {
    if (href.startsWith('/')) {
      // External page navigation
      window.location.href = href;
      onClose();
      return;
    }
    
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // On home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other pages, navigate to home page with hash
      window.location.href = `/${href}`;
    }
    onClose();
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="w-full flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="block">{title}</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isAccordionOpen && "rotate-180"
          )}
        />
      </button>
      
      <AnimatePresence>
        {isAccordionOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 ml-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {items.map((item, idx) => (
                <button
                  key={`mobile-item-${idx}`}
                  onClick={() => handleItemClick(item.href)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
