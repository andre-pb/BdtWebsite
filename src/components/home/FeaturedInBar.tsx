import Image from "next/image";
import { featuredIn } from "@/content/site";

export function FeaturedInBar() {
  return (
    <div
      style={{
        marginTop: "64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {featuredIn.label}
      </span>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(28px, 6vw, 56px)",
        }}
      >
        {featuredIn.logos.map((logo) => (
          <li
            key={logo.name}
            style={{
              display: "flex",
              alignItems: "center",
              height: `${logo.maxHeight}px`,
            }}
          >
            <a
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read the Busy Dad Training feature in ${logo.name}`}
              className="featured-in-logo"
            >
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                style={{
                  width: "auto",
                  height: "100%",
                  maxWidth: "180px",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.75,
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
