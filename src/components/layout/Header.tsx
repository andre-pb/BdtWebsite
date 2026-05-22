"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { navLinks, site } from "@/content/site";

export function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className={className}
      style={{
        fontSize: "0.95rem",
        fontWeight: 600,
        color: hovered ? "white" : "rgba(255,255,255,0.8)",
        transition: "color 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function NavAppStoreButtons({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
      onClick={onClick}
    >
      <AppStoreBadge variant="compact" />
      <GooglePlayBadge variant="compact" />
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: "absolute",
          top: "24px",
          left: 0,
          width: "100%",
          zIndex: 100,
          padding: "0 var(--page-padding-x)",
        }}
      >
        <nav
          aria-label="Main navigation"
          className="header-nav"
          style={{
            maxWidth: "var(--page-max-width)",
            margin: "0 auto",
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9999px",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onClick={closeMenu}
          >
            <Image
              src={site.logo.src}
              alt={site.name}
              width={site.logo.width}
              height={site.logo.height}
              priority
              className="header-logo"
              style={{ height: "32px", width: "auto" }}
            />
          </Link>

          <div className="header-desktop-nav" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <NavAppStoreButtons className="header-desktop-cta" />

          <button
            type="button"
            className={`header-burger${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        id="mobile-nav-menu"
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        />
        <div className="mobile-nav-panel">
          <div className="mobile-nav-links">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                style={{ transitionDelay: `${index * 50 + 80}ms` }}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className="mobile-nav-link-label">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="mobile-nav-cta-wrap">
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              onClick={closeMenu}
            >
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
