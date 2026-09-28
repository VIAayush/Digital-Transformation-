import { ImageResponse } from "next/og";

export const alt = "Viral Inbound — Transform the way your business works, operates and grows.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#fff",
          padding: 72,
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>VIRAL</span>
          <span style={{ fontSize: 40, fontWeight: 300, letterSpacing: 2 }}>INBOUND</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, color: "#ff4f1f", letterSpacing: 4, textTransform: "uppercase" }}>
            Digital Transformation Company
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02, marginTop: 20, maxWidth: 1000 }}>
            Transform the way your business works, operates and grows.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
