"use client";

import { ChevronsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoUrl = "https://res.cloudinary.com/dt5fwssmf/video/upload/v1790766425/Hero.mp4"

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-40"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold md:text-7xl">
            MAX <span className="text-[#f2b35c]">Studio</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl font-bold">
            Capturing Moments. Creating Memories.
          </p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronsUp className="mb-2 h-7 w-7 text-white" />

        <span className="whitespace-nowrap text-center text-sm text-white/80">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;