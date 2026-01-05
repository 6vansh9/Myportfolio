import { useEffect } from "react";

declare global {
  interface Window {
    L2Dwidget?: {
      init: (config: object) => void;
    };
  }
}

export default function Live2DCharacter() {
  useEffect(() => {
    // Wait for page to be fully loaded + idle time
    const loadCharacter = () => {
      if (document.querySelector('script[src*="L2Dwidget.min.js"]')) {
        initWidget();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    };

    function initWidget() {
      window.L2Dwidget?.init({
        model: {
          jsonPath:
            "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/gelina/model.json",
        },
        display: {
          position: "right",
          width: 250,
          height: 500,
          hOffset: 10,
          vOffset: 10,
        },
        mobile: { show: false, scale: 0.3, motion: true },
      });
    }

    // Use requestIdleCallback for lowest priority, fallback to setTimeout
    let idleId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(
        () => loadCharacter(),
        { timeout: 3000 }
      );
    } else {
      timeoutId = setTimeout(loadCharacter, 2000);
    }

    // Cleanup on unmount
    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
      document
        .querySelectorAll(
          '[id*="live2d"], [id*="L2d"], canvas[style*="fixed"]'
        )
        .forEach((el) => el.remove());
    };
  }, []);

  return null;
}