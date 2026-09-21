import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className = "h-6", theme = "dark" }) => {
  return (
    <Link
      to="/"
      className={`flex items-center hover:opacity-80 transition-opacity ${className}`}
    >
      <img
        src={theme === "light" ? "/logo-full-dark.webp" : "/logo-full.svg"}
        alt="Six Seeds"
        className="h-full w-auto"
      />
    </Link>
  );
};

export default Logo;
