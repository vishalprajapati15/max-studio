"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled
        ? "bg-[#0e0c0b]/75 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        : "bg-transparent backdrop-blur-0 border-b border-transparent"
        }`}
    >
      <nav className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f2b35c]/40 bg-[#f2b35c]/10 transition-all duration-300 group-hover:border-[#f2b35c]/70 group-hover:bg-[#f2b35c]/15">
            <span className="text-sm font-bold tracking-tight text-[#f4e8d6]">
              M
            </span>
          </div>

          <span className="text-[19px] font-semibold tracking-[-0.02em] text-[#f4e8d6]">
            MAX <span className="text-[#f2b35c]">Studio</span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/" label="Home" />

          {/* Portfolio Dropdown */}
          <div className="group relative">
            <Link
              href="/portfolio"
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#f4e8d6]/75 transition-all duration-300 hover:bg-white/[0.06] hover:text-[#f4e8d6]"
            >
              Portfolio
              <svg
                className="h-4 w-4 font-bold text-white transition-transform duration-300 group-hover:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 011.08 1.04l-4.25-4.5a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* Dropdown */}
            <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 translate-y-2 rounded-xl border border-white/[0.08] bg-[#15110f]/95 p-2 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <DropdownItem
                href="/services/weddings"
                label="Weddings"
              />
              <DropdownItem
                href="/services/couples"
                label="Couples"
              />

              <DropdownItem
                href="/services/celebrations"
                label="Celebrations"
              />

              <DropdownItem
                href="/services/family"
                label="Family"
              />

              <DropdownItem
                href="/services/corporate"
                label="Corporate Events"
              />

              <DropdownItem
                href="/services/films"
                label="Films"
              />
            </div>
          </div>

          <NavLink href="/services" label="Service" />

          <NavLink href="/about" label="About us" />

          <NavLink href="/contact" label="Contact" />
        </div>



        {/* Right CTA */}
        <Link
          href="/contact"
          className="hidden rounded-full border border-[#f2b35c]/30 bg-[#f2b35c]/10 px-5 py-2.5 text-[13px] font-medium text-[#f4e8d6] transition-all duration-300 hover:border-[#f2b35c]/60 hover:bg-[#f2b35c]/15 md:block"
        >
          Request a Bid
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[#f4e8d6] md:hidden"
          aria-label="Open menu"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

/* Navigation Link */
function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#f4e8d6]/75 transition-all duration-300 hover:bg-white/[0.06] hover:text-[#f4e8d6]"
    >
      {label}
    </Link>
  );
}

/* Portfolio Dropdown Item */
function DropdownItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3.5 py-2.5 text-sm text-[#f4e8d6]/65 transition-all duration-200 hover:bg-[#f2b35c]/10 hover:text-[#f2b35c]"
    >
      {label}
    </Link>
  );
}