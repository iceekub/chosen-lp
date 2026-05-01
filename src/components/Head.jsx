import { useEffect } from "react";

const Head = ({ title, description, canonical }) => {
  useEffect(() => {
    if (title) document.title = title;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.name = "description";
      document.head.appendChild(descEl);
    }
    descEl.content = description;

    return () => {
      const el = document.querySelector('link[rel="canonical"]');
      if (el) el.remove();
    };
  }, [title, description, canonical]);

  return null;
};

export default Head;
