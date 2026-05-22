"use client";

import { useState } from "react";
import { colors } from "@/constants/colors";

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export function PrimaryButton({ children, onClick, href }: PrimaryButtonProps) {
  const [hovered, setHovered] = useState(false);

  const style = {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: "14px 28px",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "9999px",
    background: hovered ? colors.brandBlueHover : colors.brandBlue,
    color: "white",
    border: "none",
    cursor: "pointer" as const,
    boxShadow: "0 4px 14px 0 rgba(0,85,255,0.39)",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.2s ease",
    textDecoration: "none" as const,
  };

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
