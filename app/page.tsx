"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Toaster, toast } from "react-hot-toast"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Animated gradient background
  const [gradientCenter, setGradientCenter] = useState({ x: 50, y: 50 })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGradientCenter({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    toast.success(isDark ? "🌞 Light mode activated" : "🌙 Dark mode activated", {
      style: {
        borderRadius: "10px",
        background: isDark ? "#fff" : "#1a1a1a",
        color: isDark ? "#000" : "#fff",
      },
    })
  }

  const handleEmailClick = () => {
    navigator.clipboard.writeText("halil.kamaci@icloud.com")
    toast.success("📧 Email copied to clipboard!", {
      style: {
        borderRadius: "10px",
        background: isDark ? "#1a1a1a" : "#fff",
        color: isDark ? "#fff" : "#000",
      },
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Animated gradient background */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${gradientCenter.x}% ${gradientCenter.y}%, rgba(99, 102, 241, 0.15), transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Side navigation */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <motion.button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              whileHover={{ scale: 1.5, width: 12 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Hero Section */}
        <motion.header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-screen flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <motion.div
                className="space-y-3 sm:space-y-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Halil İbrahim
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-muted-foreground bg-gradient-to-r from-blue-500 to-purple-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Kamacı
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div
                className="space-y-6 max-w-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Software Developer building scalable web and mobile applications with
                  <span className="text-foreground font-semibold"> React</span>,
                  <span className="text-foreground font-semibold"> React Native</span>, and
                  <span className="text-foreground font-semibold"> AI integration</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <motion.div
                    className="flex items-center gap-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Available</span>
                  </motion.div>
                  <div>Ankara, Turkey</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="space-y-4 p-6 rounded-2xl border border-border/50 backdrop-blur-sm bg-background/50">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Software Developer</div>
                  <div className="text-muted-foreground">@ Byterise</div>
                  <div className="text-xs text-muted-foreground">May 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-muted-foreground font-mono">TECH STACK</div>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "TypeScript", "React", "React Native", "Node.js", "Supabase", "AWS", "AI/MCP"].map(
                    (skill, index) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Work Section */}
        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="min-h-screen py-20 sm:py-32"
        >
          <motion.div
            className="space-y-12 sm:space-y-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <motion.h2
                className="text-3xl sm:text-4xl font-light"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                Selected Work
              </motion.h2>
              <div className="text-sm text-muted-foreground font-mono">2021 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Software Developer",
                  company: "Byterise",
                  description:
                    "Building scalable mobile applications with React Native and modern mobile development practices.",
                  tech: ["React Native", "TypeScript", "Mobile"],
                },
                {
                  year: "2024-2025",
                  role: "Software Developer",
                  company: "Freelance",
                  description:
                    "Delivered enterprise SaaS applications for CoDeriApp and Kam Software. Built drag-and-drop calendar scheduling, SEO-optimized landing pages, and real-time booking systems. Increased deployment speed by 30%.",
                  tech: ["Next.js", "React Native", "Tailwind CSS"],
                },
                {
                  year: "2023-2024",
                  role: "Software Developer",
                  company: "Arma Group Holding",
                  description:
                    "Designed and launched bul.com.tr mail & cloud storage platform with web and mobile integration. Increased customer retention by 25% with responsive, pixel-perfect UI.",
                  tech: ["Next.js", "React Native", "Tailwind CSS"],
                },
                {
                  year: "2022-2023",
                  role: "Software Developer",
                  company: "Ekip.co",
                  description:
                    "Developed real-time fintech trading dashboard with 98% uptime. Optimized data visualization improving processing speed by 50%.",
                  tech: ["Next.js", "Chart.js", "React Native"],
                },
                {
                  year: "2021-2022",
                  role: "Software Developer",
                  company: "Appcent",
                  description:
                    "Built scalable e-commerce platforms for Fortune 500 clients including Beymen, Allianz, and Unilever. Reduced page load times by 40%.",
                  tech: ["React", "Next.js", "Tailwind CSS"],
                },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500 rounded-lg hover:bg-background/50 px-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="lg:col-span-2">
                    <motion.div
                      className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      {job.year}
                    </motion.div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Thoughts Section */}
        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="min-h-screen py-20 sm:py-32"
        >
          <motion.div
            className="space-y-12 sm:space-y-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-light"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Recent Thoughts
            </motion.h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "AI Integration in Mobile Apps",
                  excerpt:
                    "Exploring LLM APIs and Model Context Protocol to build intelligent, context-aware applications.",
                  date: "Jan 2025",
                  readTime: "6 min",
                },
                {
                  title: "React Native Performance Optimization",
                  excerpt:
                    "Techniques for building pixel-perfect, high-performance mobile applications with React Native.",
                  date: "Dec 2024",
                  readTime: "7 min",
                },
                {
                  title: "Autonomous Systems & Embedded Tech",
                  excerpt:
                    "Journey into C++, computer vision, and autonomous UAV navigation from competition experience.",
                  date: "Nov 2024",
                  readTime: "8 min",
                },
                {
                  title: "Building Scalable Enterprise Apps",
                  excerpt: "Lessons from delivering Fortune 500 solutions with React and Next.js architecture.",
                  date: "Oct 2024",
                  readTime: "5 min",
                },
              ].map((post, index) => (
                <motion.article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-2xl hover:border-muted-foreground/50 transition-all duration-500 cursor-pointer backdrop-blur-sm bg-background/30 relative overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glassmorphism effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <motion.div
                      className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span>Read more</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Connect Section */}
        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="py-20 sm:py-32"
        >
          <motion.div
            className="grid lg:grid-cols-2 gap-12 sm:gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.h2
                className="text-3xl sm:text-4xl font-light"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                Let's Connect
              </motion.h2>

              <motion.div className="space-y-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new collaborations, and conversations about technology, AI, and autonomous
                  systems.
                </p>

                <div className="space-y-4">
                  <motion.button
                    onClick={handleEmailClick}
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base sm:text-lg">halil.kamaci@icloud.com</span>
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@halilxibrahim", url: "https://github.com/halilxibrahim" },
                  { name: "LinkedIn", handle: "halilxibrahim", url: "https://www.linkedin.com/in/halilxibrahim" },
                  { name: "Portfolio", handle: "bento.me/halilibrahim", url: "https://bento.me/halilibrahim" },
                  {
                    name: "React Docs Contributor",
                    handle: "Open Source",
                    url: "https://github.com/reactjs/tr.react.dev",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={social.url}
                      className="group block p-4 border border-border rounded-2xl hover:border-muted-foreground/50 transition-all duration-300 backdrop-blur-sm bg-background/30 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                      <div className="space-y-2 relative z-10">
                        <div className="text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="py-12 sm:py-16 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Halil İbrahim Kamacı. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 backdrop-blur-sm bg-background/50"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>

              <motion.button
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 backdrop-blur-sm bg-background/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  toast("💬 Chat feature coming soon!", {
                    style: {
                      borderRadius: "10px",
                      background: isDark ? "#1a1a1a" : "#fff",
                      color: isDark ? "#fff" : "#000",
                    },
                  })
                }
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </main>

      {/* Gradient overlay at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  )
}
