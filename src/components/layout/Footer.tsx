"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Wedding Photography",
  "Pre-Wedding & Couples",
  "Family Photography",
  "Corporate Events",
  "Films & Cinematography",
  "Celebrations",
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
  },
  {
    label: "Facebook",
    href: "#",
  },
  {
    label: "YouTube",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-transparent px-4 pb-6 pt-16">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-black/75 backdrop-blur-xl shadow-[0_-10px_50px_rgba(0,0,0,0.18)]
        "
      >
        {/* Subtle gold glow - top left */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#b18a4a]/10 blur-3xl"
        />

        <div
          className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-[#b18a4a]/8 blur-3xl"
        />

        <div className="relative px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr_1fr]">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-block"
              >
                <h2
                  className="
                    text-3xl font-bold
                    tracking-[0.15em]
                    text-white
                  "
                >
                  MAX
                  <span className="text-[#b18a4a]">
                    {" "}
                    STUDIO
                  </span>
                </h2>
              </Link>

              <div className="mt-4 h-px w-14 bg-[#b18a4a]" />

              <p
                className="
                  mt-5 max-w-sm
                  text-sm leading-7
                  text-white/55
                "
              >
                Capturing authentic moments, beautiful
                stories, and unforgettable memories through
                photography and cinematic films.
              </p>

              {/* Social links */}
              <div className="mt-7 flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{
                      y: -3,
                      borderColor: "#b18a4a",
                      color: "#b18a4a",
                    }}
                    whileTap={{ scale: 0.94 }}
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      border border-white/15
                      text-xs font-medium
                      text-white/70
                      transition-colors
                    "
                  >
                    {social.label.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
            >
              <h3
                className="
                  text-sm font-semibold
                  uppercase tracking-[0.2em]
                  text-[#b18a4a]
                "
              >
                Explore
              </h3>

              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        group inline-flex
                        items-center
                        text-sm text-white/55
                        transition-colors
                        hover:text-white
                      "
                    >
                      <span
                        className="
                          mr-2 h-px w-0
                          bg-[#b18a4a]
                          transition-all
                          duration-300
                          group-hover:w-4
                        "
                      />

                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              <h3
                className="
                  text-sm font-semibold
                  uppercase tracking-[0.2em]
                  text-[#b18a4a]
                "
              >
                Services
              </h3>

              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li
                    key={service}
                    className="
                      text-sm leading-5
                      text-white/55
                    "
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b18a4a]"
              >
                Contact
              </h3>

              <div className="mt-5 space-y-5">

                {/* Location */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Delhi, India
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Email
                  </p>

                  <a
                    href="mailto:hello@maxstudio.com"
                    className="mt-1 block text-sm text-white/60 transition-colors hover:text-[#b18a4a]"
                  >
                    rahulmaxpoint@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Phone
                  </p>

                  <a
                    href="tel:+919354059422"
                    className="mt-1 block text-sm text-white/60 transition-colors hover:text-[#b18a4a]
                    "
                  >
                    +91 9354059422
                  </a>
                </div>

              </div>
            </motion.div>
          </div>

          <div
            className="my-10 h-px bg-gradient-to-r from-transparent via-[#b18a4a]/40 to-transparent"
          />

          <div
            className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
          >
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} MAX Studio.
              All rights reserved.
            </p>

            <div className="flex gap-5 text-xs">
              <Link
                href="/privacy"
                className="text-white/35 transition-colorshover:text-[#b18a4a]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className=" text-white/35 transition-colorshover:text-[#b18a4a]"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
