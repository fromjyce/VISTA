"use client"

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Audiowide } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { usePathname } from "next/navigation"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
export const audiowide = Audiowide({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  return (
    <html lang="en" className={audiowide.variable}>
      <head>
        <title>ComplianceGuard AI - VISTA</title>
        <meta name="description" content="Continuous, explainable compliance monitoring for Visa networks" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`font-sans antialiased`}>
        <div className="flex min-h-screen">
          {!isLandingPage && <Sidebar />}
          <main className="flex-1">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
