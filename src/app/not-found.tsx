import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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
      <p style={{ fontSize: "clamp(3.5rem, 14vw, 7rem)", fontWeight: 800, lineHeight: 0.9, margin: 0, letterSpacing: "-0.02em" }}>
        404
      </p>
      <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", margin: 0 }}>
        This page took a different sip.
      </h1>
      <Link
        href="/"
        style={{
          marginTop: "0.5rem",
          padding: "0.9rem 2rem",
          fontSize: "1rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#E8460F",
          background: "#fff",
          borderRadius: "999px",
          textDecoration: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        Back to Hype Bam
      </Link>
    </div>
  );
}
