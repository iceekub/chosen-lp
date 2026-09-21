import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Nav = ({ isScrolled, activePage, theme = "dark" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLight = theme === "light";

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const linkClass = (page) =>
    `transition-colors text-sm font-sans tracking-widest uppercase ${
      isLight ? "font-bold" : ""
    } ${
      activePage === page
        ? isLight
          ? "text-[#2C4F37]"
          : "text-white"
        : isLight
        ? "text-[#2C4F37]/80 hover:text-[#2C4F37]"
        : "text-[#FEECD3]/60 hover:text-white"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[70] flex justify-between items-center transition-all duration-500 px-6 md:px-10 ${
          isLight
            ? isScrolled
              ? "py-4 bg-[#FBF1DE]/80 backdrop-blur-xl shadow-lg"
              : "py-6 md:py-10"
            : isScrolled
            ? "py-4 bg-white/5 backdrop-blur-xl shadow-2xl"
            : "py-6 md:py-10"
        }`}
      >
        <Logo
          theme={theme}
          className={`h-6 md:h-9 transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 md:gap-12">
          <Link to="/#how-it-works" className={linkClass("how-it-works")}>How It Works</Link>
          <Link to="/about" className={linkClass("about")}>About</Link>
          <Link to="/faq" className={linkClass("faq")}>FAQ</Link>
          <Link to="/inquire" className={linkClass("inquire")}>Get Started</Link>
          <a
            href="https://admin.sixseeds.org"
            className={
              isLight
                ? "text-xs font-sans font-bold tracking-widest uppercase text-[#2C4F37]/80 border border-[#2C4F37]/25 rounded-full px-4 py-2 hover:text-[#2C4F37] hover:border-[#2C4F37]/50 transition-all duration-300"
                : "text-xs font-sans tracking-widest uppercase text-[#FEECD3]/50 border border-[#FEECD3]/20 rounded-full px-4 py-2 hover:text-[#FEECD3] hover:border-[#FEECD3]/40 transition-all duration-300"
            }
          >
            Log in
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className={`md:hidden transition-colors p-1 ${
            isLight
              ? "text-[#2C4F37]/70 hover:text-[#2C4F37]"
              : "text-[#FEECD3]/60 hover:text-white"
          }`}
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
        className={`fixed top-0 right-0 h-full w-72 z-50 backdrop-blur-2xl flex flex-col pt-24 pb-10 px-8 transition-transform duration-300 ease-in-out md:hidden ${
          isLight
            ? "bg-[#FBF1DE]/95 border-l border-[#15231B]/10"
            : "bg-[#062d25]/95 border-l border-white/5"
        } ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-1 flex-1">
          {[
            { to: "/#how-it-works", label: "How It Works" },
            { to: "/about", label: "About" },
            { to: "/faq", label: "FAQ" },
            { to: "/inquire", label: "Get Started" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className={`transition-colors text-sm font-sans tracking-widest uppercase py-4 border-b ${
                isLight
                  ? "font-bold text-[#2C4F37]/80 hover:text-[#2C4F37] border-[#2C4F37]/10"
                  : "text-[#FEECD3]/60 hover:text-white border-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Log in pill at the bottom */}
        <a
          href="https://admin.sixseeds.org"
          onClick={() => setIsMenuOpen(false)}
          className={
            isLight
              ? "self-start text-xs font-sans font-bold tracking-widest uppercase text-[#2C4F37]/80 border border-[#2C4F37]/25 rounded-full px-4 py-2 hover:text-[#2C4F37] hover:border-[#2C4F37]/50 transition-all duration-300"
              : "self-start text-xs font-sans tracking-widest uppercase text-[#FEECD3]/50 border border-[#FEECD3]/20 rounded-full px-4 py-2 hover:text-[#FEECD3] hover:border-[#FEECD3]/40 transition-all duration-300"
          }
        >
          Log in
        </a>
      </div>
    </>
  );
};

export default Nav;
