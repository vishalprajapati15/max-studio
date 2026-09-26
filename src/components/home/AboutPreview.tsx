"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
const videoUrl = "https://res.cloudinary.com/dt5fwssmf/video/upload/v1790337956/aboutVid.mp4";

const AboutPreview = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(videoRef, {
    amount: 0.4,
  });

  React.useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isInView) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <section className="relative overflow-hidden py-10 md:py-28">
      <div className="flex justify-center text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#b18a4a]"
        >
          About MAX Studio
        </motion.p>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl text-white/60 font-semibold leading-tight md:text-7xl"
            >
              Welcome to{" "}
              <span className="text-[#b18a4a]">
                MAX Studio
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 text-xl text-white/ font-semibold md:text-2xl"
            >
              Capturing <span className="text-[#b18a4a]">Moments</span>, Crafting <span className="text-[#b18a4a]">Memories.</span> 
            </motion.h3>

            {/* Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 space-y-4 text-base leading-8 text-neutral-600 md:text-lg"
            >
              <p className="text-left text-white/60 text-lg">
                At <strong className="text-[#b18a4a]">MAX Studio</strong>, we capture the moments that make your story unique. From beautiful <strong className="font-extrabold text-[#b18a4a]">weddings</strong> and <strong className="font-extrabold text-[#b18a4a]">pre-wedding</strong> sessions to special celebrations and portraits, every frame is crafted with creativity and care.
                We believe <strong className="font-extrabold text-[#b18a4a]">photography is more than just taking pictures</strong> — it’s about preserving emotions, connections, and memories that you can cherish for a lifetime.
                With a passion for <strong className="font-extrabold text-[#b18a4a]">photography and cinematic storytelling</strong>, our team focuses on capturing genuine moments with an artistic touch, turning them into <strong className="font-extrabold text-[#b18a4a]">timeless visuals</strong>  you’ll love to revisit for years to come.
              </p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 border border-neutral-900 bg-[#b18a4a] px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-all hover:text-[#b18a4a] duration-300 hover:bg-transparent hover:border-[#b18a4a]"
              >
                Read More

                <span className="text transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>
            </motion.div>
          </motion.div>


          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="relative"
          >

            {/* Decorative Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -right-3 -top-3 h-full w-full border rounded-4xl border-[#b18a4a]/40"
            />

            {/* Video Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 md:aspect-[4/5] rounded-4xl">

              <video
                ref={videoRef}
                src={videoUrl}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
              </video>

              {/* Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

              {/* Studio Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute bottom-6 left-6"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/80">
                  MAX STUDIO
                </p>

                <p className="mt-1 text-lg font-medium text-white">
                  Capturing Moments
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;