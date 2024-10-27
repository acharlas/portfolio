import React from 'react'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import './globals.css'

export const metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my professional portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-pretendard flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="shadow-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-20 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">MyPortfolio</Link>
            <nav className="hidden md:flex items-center space-x-20">
              {[ 'Accueil','Projects', 'Skills', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 px-1"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" aria-label="Language">
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
