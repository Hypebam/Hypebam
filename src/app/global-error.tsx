"use client";

// Last-resort boundary if the ROOT LAYOUT itself throws. It must render its own
// <html>/<body>. Kept dependency-free and inline-styled so it works even when
// everything else (fonts, CSS) failed to load.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV !== "production") console.error(error);
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "2rem",
            textAlign: "center",
            background: "#E8460F",
            color: "#fff",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05, margin: 0 }}>
            Something went sideways.
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.95, maxWidth: "34ch", margin: 0 }}>
            Please reload the page — the rebellion continues.
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
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
