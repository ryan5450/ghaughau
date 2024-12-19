// components/TawkToWidget.js
"use client"
import { useEffect } from "react";

const TawkToWidget = ({ children }) => {
  useEffect(() => {
    // Initialize Tawk_API
    const Tawk_API = window.Tawk_API || {};
    const Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/6764073449e2fd8dfefa404f/1iffboa2v";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append the script to the document
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return <div>{children}</div>;
};

export default TawkToWidget;