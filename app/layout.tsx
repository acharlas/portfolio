import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "John Doe | Portfolio",
  description: "Full-Stack Web Developer Portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen flex flex-col`}>
        <div className="container mx-auto px-4 flex-grow">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'