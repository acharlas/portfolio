'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, MessageSquare, Github, Linkedin, Mail, Twitter } from 'lucide-react'

const PortfolioInterface: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainProject = {
    title: "AI-Powered Personal Assistant",
    category: "Machine Learning / NLP",
    image: "/placeholder.svg?height=200&width=800",
    description: "An advanced AI assistant capable of understanding context, managing tasks, and providing personalized recommendations. Utilizes cutting-edge NLP techniques and machine learning algorithms to deliver human-like interactions.",
    link: "#"
  }

  const portfolioItems = [
    { id: 1, title: "E-commerce Website", category: "Web Development", image: "/placeholder.svg?height=300&width=400", link: "#" },
    { id: 2, title: "Mobile Banking App", category: "Mobile App", image: "/placeholder.svg?height=300&width=400", link: "#" },
    { id: 3, title: "Blockchain Voting System", category: "Blockchain", image: "/placeholder.svg?height=300&width=400", link: "#" },
    { id: 4, title: "IoT Smart Home System", category: "Internet of Things", image: "/placeholder.svg?height=300&width=400", link: "#" },
  ]

  return (
    <div className="min-h-screen font-pretendard flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex-grow">
        {/* Header */}
        <header className="shadow-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">MyPortfolio</h1>
            <nav className="hidden md:flex items-center space-x-6">
              {['Projects', 'Skills', 'Curriculum vitae', 'Contact'].map((item) => (
                <button key={item} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 px-1">
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" aria-label="Language">
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Floating About Me */}
        <div className={`fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 z-50 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="container mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/placeholder.svg" alt="Profile picture" width={40} height={40} className="rounded-full object-cover" />
              <h3 className="text-lg font-semibold">John Doe</h3>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
              </Link>
              <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
              </Link>
              <Link href="mailto:your.email@example.com" aria-label="Email">
                <Mail className="h-5 w-5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
              </Link>
              <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="container mx-auto px-6 py-6 flex-grow">
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* About Me section */}
            <div className="lg:w-2/3 flex flex-col gap-8 order-1 lg:order-2">
              {/* About Me section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 order-1">
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <Image src="/placeholder.svg" alt="Profile picture" width={80} height={80} className="rounded-full object-cover" />
                  <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</p>
                  </div>
                </div>
                <p className="text-sm mb-4">
                  Hi! I'm John Doe, a junior developer with experience in <b>Python</b>, <b>Docker</b> and <b>C</b>. I enjoy solving problems and building efficient, creative solutions. Currently, I'm focused on [mention specific area like front-end, back-end, etc.], and I'm always eager to learn and grow in the tech world.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Top Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'C'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                  <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-6 w-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
                  </Link>
                  <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
                  </Link>
                  <Link href="mailto:your.email@example.com" aria-label="Email">
                    <Mail className="h-6 w-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
                  </Link>
                  <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-6 w-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
                  </Link>
                </div>
                <button 
                  className="w-full py-2 px-4 rounded-lg transition duration-300 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <MessageSquare className="h-4 w-4 inline-block mr-2" />
                  Contact Me
                </button>
              </div>

              {/* Main Project */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 order-2 lg:order-none lg:hidden">
                <h2 className="text-2xl font-semibold mb-4">Main Project</h2>
                <div className="relative h-48 mb-4">
                  <Image src={mainProject.image} alt={mainProject.title} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{mainProject.title}</h3>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">
                  {mainProject.category}
                </span>
                <p className="text-sm mb-4">{mainProject.description}</p>
                <Link 
                  href={mainProject.link}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  aria-label={`View ${mainProject.title} project`}
                >
                  View Project
                </Link>
              </div>

              {/* Portfolio grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 order-3">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative group overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800"
                  >
                    <Image src={item.image} alt={item.title} width={400} height={300} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link 
                        href={item.link}
                        className="text-white text-center font-semibold hover:underline"
                        aria-label={`View ${item.title} project`}
                      >
                        {item.title}
                      </Link>
                    </div>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Project (desktop view) */}
            <div className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 order-2 lg:order-1 hidden lg:block">
              <h2 className="text-2xl font-semibold mb-4">Main Project</h2>
              <div className="relative h-48 mb-4">
                <Image src={mainProject.image} alt={mainProject.title} layout="fill" objectFit="cover" className="rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{mainProject.title}</h3>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">
                {mainProject.category}
              </span>
              <p className="text-sm mb-4">{mainProject.description}</p>
              <Link 
                href={mainProject.link}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                aria-label={`View ${mainProject.title} project`}
              >
                View Project
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default PortfolioInterface