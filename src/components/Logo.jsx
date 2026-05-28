import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className = "h-6" }) => {
  return (
    <Link
      to="/"
      className={`flex items-center hover:opacity-80 transition-opacity ${className}`}
    >
      <img src="/logo-full.svg" alt="Six Seeds" className="h-full w-auto" />
    </Link>
  );
};

export default Logo;
