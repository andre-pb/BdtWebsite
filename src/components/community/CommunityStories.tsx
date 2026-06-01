"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { communityPage, communityStories, type CommunityStory } from "@/content/community";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

const CIRCLE_FLAG_BASE = "https://hatscripts.github.io/circle-flags/flags";

function StoryAvatar({ story, size = 48 }: { story: CommunityStory; size?: number }) {
  const code = story.countryCode.toLowerCase();

  return (
    <div
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        flexShrink: 0,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        src={`${CIRCLE_FLAG_BASE}/${code}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

function StoryMeta({ story, size }: { story: CommunityStory; size?: number }) {
  return (
    <figcaption style={{ display: "flex", alignItems: "center", gap: "0.875rem", margin: 0 }}>
      <StoryAvatar story={story} size={size} />
      <div>
        <div style={{ fontWeight: 700, color: "white", fontSize: "1rem" }}>{story.name}</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", marginTop: "2px" }}>
          {story.location}
        </div>
      </div>
    </figcaption>
  );
}

function StoryCard({
  story,
  featured,
  onOpen,
}: {
  story: CommunityStory;
  featured?: boolean;
  onOpen: (story: CommunityStory) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(story)}
      className="story-card"
      aria-label={`Read ${story.name}'s full story`}
      style={{
        textAlign: "left",
        margin: 0,
        width: "100%",
        padding: featured ? "2rem" : "1.75rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        cursor: "pointer",
        height: "100%",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: "0 0 0.875rem",
            fontWeight: 700,
            fontSize: featured ? "clamp(1.25rem, 2vw, 1.5rem)" : "1.1rem",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            color: "white",
          }}
        >
          {story.headline}
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.7)",
            fontSize: "1rem",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: featured ? 4 : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {story.body}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <StoryMeta story={story} size={40} />
        <span
          className="story-card__cue"
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            color: colors.accentLight,
            fontWeight: 600,
            fontSize: "0.9rem",
            flexShrink: 0,
          }}
        >
          Read
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function StoryModal({
  story,
  onClose,
}: {
  story: CommunityStory;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const paragraphs = story.body.split("\n\n");

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="story-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(2, 6, 23, 0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={dialogRef}
        className="story-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          width: "min(640px, 100%)",
          maxHeight: "min(85vh, 760px)",
          overflowY: "auto",
          background: "#111a2e",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "1.25rem",
          padding: "2.5rem",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close story"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", paddingRight: "2.5rem" }}>
          <StoryAvatar story={story} size={56} />
          <div>
            <div style={{ fontWeight: 700, color: "white", fontSize: "1.15rem" }}>{story.name}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", marginTop: "2px" }}>
              {story.location}
            </div>
          </div>
        </div>

        <h3
          id="story-modal-title"
          style={{
            margin: "0 0 1.5rem",
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "white",
          }}
        >
          {story.headline}
        </h3>

        <blockquote style={{ margin: 0 }}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              style={{
                margin: index === paragraphs.length - 1 ? 0 : "0 0 1.1rem",
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              {paragraph}
            </p>
          ))}
        </blockquote>
      </div>
    </div>
  );
}

export function CommunityStories() {
  const { stories: copy } = communityPage;
  const featured = communityStories.filter((story) => story.featured);
  const rest = communityStories.filter((story) => !story.featured);
  const [activeStory, setActiveStory] = useState<CommunityStory | null>(null);

  const handleOpen = useCallback((story: CommunityStory) => setActiveStory(story), []);
  const handleClose = useCallback(() => setActiveStory(null), []);

  return (
    <section
      id="stories"
      aria-labelledby="community-stories-heading"
      style={{
        padding: "120px 0",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <PageContainer>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.accentLight,
              marginBottom: "1rem",
            }}
          >
            {copy.eyebrow}
          </span>
          <h2
            id="community-stories-heading"
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            {copy.title}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.125rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            {copy.description}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {featured.map((story) => (
            <StoryCard key={story.name} story={story} featured onOpen={handleOpen} />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {rest.map((story) => (
            <StoryCard key={story.name} story={story} onOpen={handleOpen} />
          ))}
        </div>
      </PageContainer>

      {activeStory ? <StoryModal story={activeStory} onClose={handleClose} /> : null}
    </section>
  );
}
