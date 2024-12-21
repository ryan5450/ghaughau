"use client"
import { useEffect } from "react";

const TalkToWidget = () => {
  useEffect(() => {
    // Initialize the Tawk.to script
    const Tawk_API = "b8e3728da95f62d17768dc08baa162f5af43feda" || {};
    const Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6764073449e2fd8dfefa404f/1iffboa2v";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      // Cleanup script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TalkToWidget;
