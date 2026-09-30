"use client";

import { motion, useReducedMotion, type Variants, } from "framer-motion";

const CONTACT_HREF = "/contact";
const HEADING = "Ready to capture your story?";
const SUBTEXT =
  "Tell us what you need and let’s create something beautiful together.";
const BUTTON_LABEL = "Contact Us";

const container: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ContactCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-transparent px-4 py-20">
      <motion.div
        variants={container}
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.4,
        }}
        className="
          relative mx-auto flex max-w-5xl flex-col
          items-center overflow-hidden rounded-[32px]
          border border-[#b18a4a]/30
          bg-black/90 px-6 py-16 text-center
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          backdrop-blur-sm
          sm:px-12
        "
      >
        {/* Gold decorative glow */}
        <div
          className="
            pointer-events-none absolute
            -left-24 -top-24 h-64 w-64
            rounded-full bg-[#b18a4a]/15
            blur-3xl
          "
        />

        {/* Second subtle gold glow */}
        <div
          className="
            pointer-events-none absolute
            -bottom-24 -right-20 h-72 w-72
            rounded-full bg-[#b18a4a]/10
            blur-3xl
          "
        />

        {/* Decorative gold circle */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 top-0
            h-px w-32
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#b18a4a]
            to-transparent
          "
        />

        {/* Heading */}
        <motion.h2
          variants={item}
          className="
            relative max-w-2xl
            text-3xl font-extrabold
            tracking-tight text-white
            sm:text-5xl
          "
        >
          {HEADING}
        </motion.h2>

        {/* Gold accent */}
        <motion.div
          variants={item}
          className="relative mt-5 h-[2px] w-16 bg-[#b18a4a]"
        />

        {/* Description */}
        <motion.p
          variants={item}
          className="
            relative mt-5 max-w-lg
            text-sm leading-relaxed
            text-white/65
            sm:text-base
          "
        >
          {SUBTEXT}
        </motion.p>

        {/* Button */}
        <motion.div
          variants={item}
          className="relative mt-10"
        >
          <motion.a
            href={CONTACT_HREF}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            animate="rest"
            variants={{
              rest: {
                scale: 1,
              },
              hover: {
                scale: 1.05,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className="
              group relative inline-flex
              items-center gap-3
              overflow-hidden rounded-full
              border border-[#b18a4a]
              bg-[#b18a4a]
              px-8 py-4
              text-base font-bold
              text-black
              shadow-[0_8px_30px_rgba(177,138,74,0.25)]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#b18a4a]
            "
          >
            {/* Shine effect */}
            <motion.span
              aria-hidden
              className="
                pointer-events-none absolute
                inset-y-0 -left-1/2
                w-1/3 -skew-x-12
                bg-gradient-to-r
                from-transparent
                via-white/40
                to-transparent
              "
              variants={{
                rest: {
                  x: "0%",
                },
                hover: {
                  x: "500%",
                },
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
            />

            <span className="relative">
              {BUTTON_LABEL}
            </span>

            {/* Arrow */}
            <motion.span
              aria-hidden
              className="
                relative grid h-9 w-9
                place-items-center
                rounded-full
                bg-black
                text-[#b18a4a]
              "
              variants={{
                rest: {
                  x: 0,
                },
                hover: {
                  x: 4,
                },
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}