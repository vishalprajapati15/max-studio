"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioPreviewSlides } from "@/data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

const cld = (url: string, width: number) =>
  url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;

function useSlider(length: number) {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);

  const go = useCallback(
    (direction: number) => {
      setState(([currentIndex]) => [
        (currentIndex + direction + length) % length,
        direction,
      ]);
    },
    [length]
  );

  return {
    index,
    dir,
    next: () => go(1),
    prev: () => go(-1),
  };
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};


function DesktopSlider() {
  const { index, next, prev } = useSlider(
    portfolioPreviewSlides.length
  );

  const active = portfolioPreviewSlides[index];

  const upcoming = Array.from(
    { length: portfolioPreviewSlides.length - 1 },
    (_, i) =>
      portfolioPreviewSlides[
      (index + 1 + i) % portfolioPreviewSlides.length
      ]
  );

  return (
    <section className="relative hidden h-screen w-full overflow-hidden bg-black text-white md:block">

      {/* Background */}
      <AnimatePresence>
        <motion.img
          key={active.id}
          src={cld(active.image, 1920)}
          alt={active.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Left Content */}
      <motion.div
        className="absolute left-12 top-1/2 max-w-xl -translate-y-1/2"
        initial={{
          opacity: 0,
          x: -60,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="mb-2 h-[3px] w-4 bg-white" />

            <p className="text-sm font-medium uppercase tracking-wide">
              {active.label}
            </p>

            <h1 className="mt-3 text-6xl font-extrabold leading-none lg:text-8xl">
              {active.title}
            </h1>

            <p className="mt-6 max-w-md text-sm text-white/85">
              {active.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                aria-label="Save portfolio"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#f2b35c] text-black transition hover:scale-105"
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="currentColor"
                >
                  <path d="M1 1h12v14l-6-4-6 4z" />
                </svg>
              </button>

              <button className="cursor-pointer rounded-full border border-white/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition hover:bg-white hover:text-black">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Portfolio Cards */}
      <motion.div
        className="absolute bottom-[22%] left-[42%] right-0 overflow-hidden"
        initial={{
          opacity: 0,
          x: 80,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <div className="flex gap-6">
          <AnimatePresence
            initial={false}
            mode="popLayout"
          >
            {upcoming.map((slide) => (
              <motion.button
                key={slide.id}
                layout
                onClick={() => {
                  const steps =
                    (portfolioPreviewSlides.findIndex(
                      (item) => item.id === slide.id
                    ) -
                      index +
                      portfolioPreviewSlides.length) %
                    portfolioPreviewSlides.length;

                  for (let i = 0; i < steps; i++) {
                    next();
                  }
                }}
                initial={{
                  opacity: 0,
                  x: 120,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -120,
                  scale: 0.9,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                }}
                className="relative h-64 w-52 shrink-0 cursor-pointer overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={cld(slide.image, 500)}
                  alt={slide.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <div className="mb-1 h-[2px] w-3 bg-white" />

                  <p className="text-[11px]">
                    {slide.label}
                  </p>

                  <p className="text-lg font-bold">
                    {slide.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="absolute bottom-[10%] left-[42%] right-12 flex items-center gap-4"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.7,
          delay: 0.4,
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous portfolio"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/60 transition hover:bg-white/20"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next portfolio"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white text-black transition hover:scale-105"
        >
          ›
        </button>

        {/* Progress */}
        <div className="relative mx-2 h-px flex-1 bg-white/30">
          <motion.div
            className="absolute left-0 top-0 h-px bg-[#f2b35c]"
            animate={{
              width: `${((index + 1) /
                portfolioPreviewSlides.length) *
                100
                }%`,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Counter */}
        <div className="relative h-10 w-14 overflow-hidden text-4xl font-bold">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={index}
              className="absolute right-0"
              initial={{
                y: 40,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -40,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              {pad(index + 1)}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}


function MobileSlider() {
  const { index, dir, next, prev } = useSlider(
    portfolioPreviewSlides.length
  );

  const active = portfolioPreviewSlides[index];

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2000);

    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="block w-full bg-transparent px-4 py-6 text-white md:hidden">

      {/* Image */}
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-transparent"
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={active.id}
            src={cld(active.image, 800)}
            alt={active.title}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.6}
            onDragEnd={(_, { offset, velocity }) => {
              if (
                offset.x < -80 ||
                velocity.x < -500
              ) {
                next();
              } else if (
                offset.x > 80 ||
                velocity.x > 500
              ) {
                prev();
              }
            }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>

      {/* Text */}
      <motion.div
        className="mt-5 min-h-[130px]"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <p className="text-sm text-white/60">
              {active.label}
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-white">
              {active.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dots */}
      <motion.div
        className="mt-4 flex justify-center gap-2"
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      >
        {portfolioPreviewSlides.map((slide, i) => (
          <motion.span
            key={slide.id}
            className="h-2 rounded-full bg-white"
            animate={{
              width: i === index ? 24 : 8,
              opacity: i === index ? 1 : 0.25,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default function ServicePreview() {
  return (
    <>
      <DesktopSlider />
      <MobileSlider />
    </>
  );
}