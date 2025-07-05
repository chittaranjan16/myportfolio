"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const certificates = [
  { image: "/certificates/c1.png", title: "Certificate 1" },
  { image: "/certificates/c2.png", title: "Certificate 2" },
  { image: "/certificates/c3.png", title: "Certificate 3" },
  { image: "/certificates/c4.png", title: "Certificate 4" },
  { image: "/certificates/c5.png", title: "Certificate 5" },
]

export default function Certificates() {
  const [selected, setSelected] = useState(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // Close modal on "Esc" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelected(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="certificates" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Certificates
        </motion.h2>
      </motion.div>

      <motion.div 
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            variants={item}
            className="min-w-[250px] flex-shrink-0 rounded-lg overflow-hidden border border-muted shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelected(cert)}
          >
            <Image
              src={cert.image}
              alt={`Certificate: ${cert.title}`}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
            >
              <Image
                src={selected.image}
                alt={`Certificate: ${selected.title}`}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}