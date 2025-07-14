"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  MobileProductAccordion,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { NAV_ITEMS, PRODUCTS, ABOUT } from "@/lib/constants";

export function NavbarDemo() {
  const navItems = NAV_ITEMS.map(item => ({
    name: item.label,
    link: item.href,
  }));

  const products = PRODUCTS.map(product => ({
    label: product.label,
    href: product.href,
  }));

  const aboutItems = ABOUT.map(item => ({
    label: item.label,
    href: item.href,
  }));

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} products={products} aboutItems={aboutItems} />
          </NavBody>
        </div>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <MobileProductAccordion 
              title="Products"
              items={products}
              onClose={() => setIsMobileMenuOpen(false)}
            />
            <MobileProductAccordion 
              title="About"
              items={aboutItems}
              onClose={() => setIsMobileMenuOpen(false)}
            />
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  if (item.link.startsWith('/')) {
                    // External page navigation
                    setIsMobileMenuOpen(false);
                    return;
                  }
                  
                  e.preventDefault();
                  const isHomePage = window.location.pathname === '/';
                  
                  if (isHomePage) {
                    // On home page, scroll to section
                    const element = document.querySelector(item.link);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  } else {
                    // On other pages, navigate to home page with hash
                    window.location.href = `/${item.link}`;
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
