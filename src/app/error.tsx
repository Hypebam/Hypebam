"use client";

import { useEffect } from "react";

// Branded error boundary for the page. Catches any client/render error so the
// user sees an on-brand recovery screen instead of a blank/white page.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(180deg, #FF7A18 0%, #E8460F 100%)",
        color: "#fff",
        fontFamily: "var(--font-secondary), system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.05, margin: 0 }}>
        Something went sideways.
      </h1>
      <p style={{ fontSize: "clamp(1rem, 2.4vw, 1.2rem)", opacity: 0.95, maxWidth: "34ch", margin: 0 }}>
        Our bad — give it another shot. The rebellion continues.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: "0.5rem",
          padding: "0.9rem 2rem",
          fontSize: "1rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#E8460F",
          background: "#fff",
          border: "none",
          borderRadius: "999px",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        Try again
      </button>
    </div>
  );
}
