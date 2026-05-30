import { appStores } from "@/content/site";

type BadgeVariant = "default" | "compact";

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
};

const storeLinkProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

function getBadgeStyle(variant: BadgeVariant) {
  if (variant === "compact") {
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      padding: 0,
      background: "rgba(0, 0, 0, 0.85)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "9999px",
      textDecoration: "none",
      transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
    };
  }

  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 28px",
    background: "#000",
    color: "white",
    border: "1px solid #000",
    borderRadius: "9999px",
    textDecoration: "none",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  };
}

function badgeClassName(variant: BadgeVariant, className?: string) {
  const base = variant === "compact" ? "app-store-badge app-store-badge--compact" : "app-store-badge";
  return className ? `${base} ${className}` : base;
}

export function AppStoreBadge({ variant = "default", className }: BadgeProps) {
  const compact = variant === "compact";

  return (
    <a
      href={appStores.appStoreUrl}
      aria-label="Download Busy Dad Training on the App Store"
      className={badgeClassName(variant, className)}
      style={getBadgeStyle(variant)}
      {...storeLinkProps}
    >
      <svg
        className="app-store-badge__icon"
        viewBox="0 0 24 24"
        width={compact ? 16 : 20}
        height={compact ? 16 : 20}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      {!compact && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
          <span className="app-store-badge__eyebrow" style={{ fontSize: "0.65rem", opacity: 0.8, fontWeight: 400 }}>
            Download on the
          </span>
          <span className="app-store-badge__title" style={{ fontSize: "1rem", fontWeight: 600 }}>
            App Store
          </span>
        </div>
      )}
    </a>
  );
}

export function GooglePlayBadge({ variant = "default", className }: BadgeProps) {
  const compact = variant === "compact";

  return (
    <a
      href={appStores.googlePlayUrl}
      aria-label="Get Busy Dad Training on Google Play"
      className={badgeClassName(variant, className)}
      style={getBadgeStyle(variant)}
      {...storeLinkProps}
    >
      <svg
        className="app-store-badge__icon"
        viewBox="0 0 24 24"
        width={compact ? 16 : 20}
        height={compact ? 16 : 20}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
      </svg>
      {!compact && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
          <span className="app-store-badge__eyebrow" style={{ fontSize: "0.65rem", opacity: 0.8, fontWeight: 400 }}>
            GET IT ON
          </span>
          <span className="app-store-badge__title" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Google Play
          </span>
        </div>
      )}
    </a>
  );
}
