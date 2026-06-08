import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
}

const BASE_TITLE = "Vansh Aggarwal";
const BASE_URL = "https://vanshaggarwal.dev";
const DEFAULT_DESCRIPTION =
  "Vansh Aggarwal is a Front-End Web Developer and B.Tech CSE student at Manipal University Jaipur. Specializing in React, JavaScript, HTML/CSS, and building scalable, user-centric web applications.";
const DEFAULT_IMAGE = `${BASE_URL}/assets/preview.png`;

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function useSEO({ title, description, path = "/", type = "website" }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${BASE_TITLE} | Front-End Web Developer`
      : `${BASE_TITLE} | Front-End Web Developer Portfolio`;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${BASE_URL}${path}`;

    // Title
    document.title = fullTitle;

    // Standard meta
    setMeta("name", "title", fullTitle);
    setMeta("name", "description", desc);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", DEFAULT_IMAGE);

    // Twitter
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:image", DEFAULT_IMAGE);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, type]);
}
