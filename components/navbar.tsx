"use client"

import * as React from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { NAV_ITEMS, COMPANY, SCROLL_OPTIONS } from "@/lib/constants"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    // Handle scroll effect for navbar
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        setIsOpen(false)
        // Smooth scroll to section
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView(SCROLL_OPTIONS)
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
                ? "border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
                : "border-border/40 bg-background/95 backdrop-blur"
                } supports-[backdrop-filter]:bg-background/60`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <motion.a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                window.scrollTo({ top: 0, ...SCROLL_OPTIONS })
                            }}
                            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src={COMPANY.logo}
                                    alt={`${COMPANY.name} logo`}
                                    width={40}
                                    height={40}
                                    className="w-16 h-16 object-contain"
                                />
                            </motion.div>
                            <span className="text-2xl font-bold text-foreground">
                                {COMPANY.name}
                            </span>
                        </motion.a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="mr-[140px] flex items-baseline space-x-8">
                            {NAV_ITEMS.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleNavClick(item.href)
                                    }}
                                    className="text-foreground/80 hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium relative"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Desktop Mode Toggle */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <ModeToggle />
                    </motion.div>

                    {/* Mobile menu button */}
                    <motion.div
                        className="md:hidden flex items-center space-x-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <ModeToggle />
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9"
                                        aria-label="Open navigation menu"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={isOpen ? "close" : "menu"}
                                                initial={{ rotate: 0, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {isOpen ? (
                                                    <X className="h-5 w-5" />
                                                ) : (
                                                    <Menu className="h-5 w-5" />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </Button>
                                </motion.div>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={COMPANY.logo}
                                                alt={`${COMPANY.name} logo`}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 object-contain"
                                            />
                                            <span className="text-2xl font-bold text-white">
                                                {COMPANY.name}
                                            </span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-8 flex flex-col space-y-4">
                                    {NAV_ITEMS.map((item, index) => (
                                        <motion.a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleNavClick(item.href)
                                            }}
                                            className="text-foreground hover:text-primary transition-colors duration-200 px-4 py-3 text-lg font-medium border-l-2 border-transparent hover:border-primary"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ x: 8 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {item.label}
                                        </motion.a>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    )
}
