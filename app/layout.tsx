import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personality Quiz Builder",
  description: "Create and share personality quizzes with your audience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold flex items-center space-x-2">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                  <span className="text-teal-700 font-bold text-sm">Q</span>
                </div>
                <span>Quiz Builder</span>
              </Link>
              <div className="space-x-4">
                <Link href="/" className="hover:text-gold-300 transition-colors duration-200">
                  Home
                </Link>
                <Link href="/admin" className="hover:text-gold-300 transition-colors duration-200">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gradient-to-br from-teal-50 to-gold-50">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
