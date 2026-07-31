import React from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/six-seeds/id6780967595";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=org.sixseeds.SixSeedsApp";

const StoreBadges = ({ className = "", justify = "center" }) => {
  const justifyClass =
    justify === "start" ? "justify-center xl:justify-start" : "justify-center";

  return (
    <div
      className={`flex flex-wrap items-center gap-4 ${justifyClass} ${className}`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-90 hover:opacity-100 transition-opacity duration-300"
      >
        <img
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          className="h-12 w-auto"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-90 hover:opacity-100 transition-opacity duration-300"
      >
        <img
          src="/google-play-badge.png"
          alt="Get it on Google Play"
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
};

export default StoreBadges;
