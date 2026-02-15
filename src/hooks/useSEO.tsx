import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const BASE_TITLE = "Gautam Vhavle";
const BASE_URL = "https://gautamvhavle.xyz";
const DEFAULT_DESCRIPTION =
  "Gautam Vhavle is a Full-Stack Developer and GenAI Engineer at Siemens, based in Bengaluru, India. Patent holder specializing in React, Python, LangChain, IoT, and cloud-native solutions.";

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function useSEO({ title, description, path = "/" }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | Full-Stack Developer, GenAI & IoT Engineer – Portfolio`;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${BASE_URL}${path}`;

    // Title
    document.title = fullTitle;

    // Standard meta
    setMeta("name", "description", desc);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);

    // Twitter
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:url", url);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path]);
}
