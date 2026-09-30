"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { testimonials } from "@/data/testimonials";



const cld = (url: string, w: number) =>
  url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`)
    : url;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduce ? 0 : 0.7,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function Stars({
  rating,
  size,
}: {
  rating: number;
  size: number;
}) {
  return (
    <div
      className="flex"
      aria-label={`${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill =
          Math.max(0, Math.min(1, rating - i)) * 100;

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient
                id={`s-${size}-${i}-${rating}`}
              >
                <stop
                  offset={`${fill}%`}
                  stopColor="#b18a4a"
                />
                <stop
                  offset={`${fill}%`}
                  stopColor="#e5e7eb"
                />
              </linearGradient>
            </defs>

            <path
              fill={`url(#s-${size}-${i}-${rating})`}
              d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z"
            />
          </svg>
        );
      })}
    </div>
  );
}

function getOffset(
  i: number,
  active: number,
  n: number
) {
  let o = i - active;

  if (o > n / 2) o -= n;
  if (o < -n / 2) o += n;

  return o;
}

const Testimonials = () => {
  const n = testimonials.length;

  const [active, setActive] = useState(1);

  const reduce = useReducedMotion();

  const next = () => {
    setActive((a) => (a + 1) % n);
  };

  const prev = () => {
    setActive((a) => (a - 1 + n) % n);
  };

  return (
    <section className="min-h-screen w-full overflow-hidden px-4 py-20">
      <div className="flex justify-center text-center my-15">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="mb-4 text-lg font-medium uppercase tracking-[0.3em] text-[#b18a4a]"
        >
          What Our Customers Say
        </motion.p>
      </div>

      {/* Carousel */}
      <Reveal
        delay={0.2}
        className="w-full"
      >
        <div
          className="relative mx-auto h-[440px] w-full max-w-5xl"
          style={{
            perspective: 1200,
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {testimonials.map((t, i) => {
            const offset = getOffset(
              i,
              active,
              n
            );

            const isActive = offset === 0;
            const visible =
              Math.abs(offset) <= 1;

            return (
              <motion.article
                key={t.id}
                onClick={() =>
                  !isActive &&
                  visible &&
                  setActive(i)
                }
                drag={isActive ? "x" : false}
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.5}
                onDragEnd={(_, { offset: o, velocity: v }) => {
                  if (
                    o.x < -80 ||
                    v.x < -500
                  ) {
                    next();
                  } else if (
                    o.x > 80 ||
                    v.x > 500
                  ) {
                    prev();
                  }
                }}
                animate={{
                  x: `${offset * 92}%`,
                  scale: isActive ? 1 : 0.8,
                  rotateY: offset * -22,
                  opacity: visible
                    ? isActive
                      ? 1
                      : 0.9
                    : 0,
                  zIndex: isActive
                    ? 10
                    : 5 - Math.abs(offset),
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 220,
                        damping: 26,
                      }
                }
                style={{
                  pointerEvents: visible
                    ? "auto"
                    : "none",
                }}
                className={`absolute left-1/2 top-1/2 -ml-[150px] -mt-[190px] flex h-[380px] w-[300px] flex-col items-center rounded-[32px] bg-white px-8 pt-9 text-center shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:-ml-[180px] sm:w-[360px] ${
                  isActive
                    ? "cursor-grab"
                    : "cursor-pointer"
                }`}
                aria-hidden={!isActive}
              >
                {/* Avatar */}
                <img
                  src={cld(t.avatar, 200)}
                  alt={t.name}
                  draggable={false}
                  className={`rounded-full border-[3px] border-[#b18a4a] object-cover ${
                    isActive
                      ? "h-24 w-24"
                      : "h-20 w-20"
                  }`}
                />

                {/* Name */}
                <h3
                  className={`mt-5 font-extrabold text-neutral-900 ${
                    isActive
                      ? "text-2xl"
                      : "text-xl"
                  }`}
                >
                  {t.name}
                </h3>

                {/* Rating */}
                <div className="mt-5 flex items-center gap-3">
                  <Stars
                    rating={t.rating}
                    size={
                      isActive ? 22 : 18
                    }
                  />

                  <span className="font-bold text-neutral-900">
                    {t.rating.toFixed(1)}
                  </span>
                </div>

                {/* Testimonial */}
                <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
                  {t.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Reveal>

      {/* Dots */}
      <Reveal
        delay={0.3}
        className="mt-6"
      >
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Choose testimonial"
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setActive(i)}
              animate={{
                width:
                  i === active ? 22 : 8,
                backgroundColor:
                  i === active
                    ? "#b18a4a"
                    : "#e6d8bd",
              }}
              transition={{
                duration: 0.3,
              }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </Reveal>

      {/* Arrows */}
      <Reveal
        delay={0.4}
        className="mt-8"
      >
        <div className="flex justify-center gap-4">
          {/* Previous */}
          <motion.button
            aria-label="Previous testimonial"
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="grid h-12 w-12 place-items-center rounded-full bg-[#b18a4a] cursor-pointer text-white shadow-lg shadow-[#b18a4a]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b18a4a]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5m6-6l-6 6 6 6" />
            </svg>
          </motion.button>

          {/* Next */}
          <motion.button
            aria-label="Next testimonial"
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="grid h-12 w-12 place-items-center rounded-full bg-[#b18a4a] cursor-pointer text-white shadow-lg shadow-[#b18a4a]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b18a4a]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </motion.button>
        </div>
      </Reveal>
    </section>
  );
};

export default Testimonials;