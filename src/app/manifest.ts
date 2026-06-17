import type { MetadataRoute } from "next";

// Web app manifest → /manifest.webmanifest. Enables add-to-home-screen with the
// brand colours. (PNG 192/512 icons would be ideal for full PWA install UI; the
// SVG logo covers modern browsers.)
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hype Bam — Sri Lankanized Energy Drink",
    short_name: "Hype Bam",
    description:
      "The Sri Lankanized energy drink. 80mg caffeine, 200mg electrolytes, 5g sugar, 5 bold natural flavours.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8EF",
    theme_color: "#E8460F",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/img/hypebam-logo-final-vector-02-orange.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
