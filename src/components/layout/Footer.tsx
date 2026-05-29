"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { legalFooterLinks } from "@/content/legal";
import { navLinks, site } from "@/content/site";
import { colors } from "@/constants/colors";

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer
      style={{
        background: colors.heroDark,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "60px 0 80px",
      }}
    >
      <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto", padding: "0 var(--page-padding-x)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Image
              src={site.logo.src}
              alt={site.name}
              width={site.logo.width}
              height={site.logo.height}
              style={{ height: "40px", width: "auto" }}
            />
          </Link>

          <nav
            aria-label="Footer navigation"
            style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: hoveredLink === link.label ? "white" : "rgba(255,255,255,0.7)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label="Legal"
            style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}
          >
            {legalFooterLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: hoveredLink === link.label ? "white" : "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
              fontSize: "0.9rem",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} {site.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
