import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Nav = ({ isScrolled, activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const linkClass = (page) =>
    `transition-colors text-sm font-sans tracking-widest uppercase ${
      activePage === page ? "text-white" : "text-[#FEECD3]/60 hover:text-white"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[70] flex justify-between items-center transition-all duration-500 px-6 md:px-10 ${
          isScrolled ? "py-4 bg-white/5 backdrop-blur-xl shadow-2xl" : "py-6 md:py-10"
        }`}
      >
        <Logo className={`h-4 md:h-6 transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 md:gap-12">
          <Link to="/about" className={linkClass("about")}>About</Link>
          <Link to="/inquire" className={linkClass("inquire")}>Get Started</Link>
          <a
            href="https://admin.sixseeds.org"
            className="text-xs font-sans tracking-widest uppercase text-[#FEECD3]/50 border border-[#FEECD3]/20 rounded-full px-4 py-2 hover:text-[#FEECD3] hover:border-[#FEECD3]/40 transition-all duration-300"
          >
            Log in
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className="md:hidden text-[#FEECD3]/60 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile drawer — slides in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-[#062d25]/95 backdrop-blur-2xl border-l border-white/5 flex flex-col pt-24 pb-10 px-8 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1 flex-1">
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#FEECD3]/60 hover:text-white transition-colors text-sm font-sans tracking-widest uppercase py-4 border-b border-white/5"
          >
            About
          </Link>
          <Link
            to="/inquire"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#FEECD3]/60 hover:text-white transition-colors text-sm font-sans tracking-widest uppercase py-4 border-b border-white/5"
          >
            Get Started
          </Link>
        </div>

        {/* Log in pill at the bottom */}
        <a
          href="https://admin.sixseeds.org"
          onClick={() => setIsMenuOpen(false)}
          className="self-start text-xs font-sans tracking-widest uppercase text-[#FEECD3]/50 border border-[#FEECD3]/20 rounded-full px-4 py-2 hover:text-[#FEECD3] hover:border-[#FEECD3]/40 transition-all duration-300"
        >
          Log in
        </a>
      </div>
    </>
  );
};

export default Nav;
