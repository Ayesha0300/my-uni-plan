'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
    { href: '/about', label: 'About Us' },
    { href: '/students', label: 'Students' },
    { href: '/teachers', label: 'Teachers' },
    { href: '/administration', label: 'Administration' },
    { href: '/attendance', label: 'Attendance' },
    { href: '/ai-assistant', label: 'AI Assistant' },
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">UniWeb</Link>
              <div className="hidden md:flex space-x-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block hover:underline">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-primary text-primary-foreground mt-8">
          <div className="container mx-auto px-4 py-6 text-center">
            © {new Date().getFullYear()} University Website. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}