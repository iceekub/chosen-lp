import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Nav = ({ isScrolled, activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (page) =>
    `transition-colors text-sm font-sans tracking-widest uppercase ${
      activePage === page ? "text-white" : "text-[#FEECD3]/60 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500 px-6 md:px-10 ${
        isScrolled ? "py-4 bg-white/5 backdrop-blur-xl shadow-2xl" : "py-6 md:py-10"
      }`}
    >
      <Logo className="h-4 md:h-6" />

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 md:gap-12">
        <Link to="/about" className={linkClass("about")}>About</Link>
        <Link to="/inquire" className={linkClass("inquire")}>Get Started</Link>
        <a
          href="https://app.sixseeds.org"
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

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#05241e]/70 backdrop-blur-xl border-b border-white/5 flex flex-col px-6 py-2 md:hidden">
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
          <div className="py-4 flex">
            <a
              href="https://app.sixseeds.org"
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-sans tracking-widest uppercase text-[#FEECD3]/50 border border-[#FEECD3]/20 rounded-full px-4 py-2 hover:text-[#FEECD3] hover:border-[#FEECD3]/40 transition-all duration-300"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
