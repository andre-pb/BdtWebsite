"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;

// Same origin-derivation as the other public API calls on this site.
const RECENT_VIDEOS_URL = HUB_URL
  ? new URL("/api/v1/PublicVideos/Recent?count=6", HUB_URL).toString()
  : undefined;

const CHANNEL_URL = "https://www.youtube.com/@busydadtraining";

type Video = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
};

function isVideo(value: unknown): value is Video {
  if (typeof value !== "object" || value === null) return false;

  const { videoId, title, thumbnailUrl } = value as Partial<Video>;

  return (
    typeof videoId === "string" &&
    videoId.length > 0 &&
    typeof title === "string" &&
    title.length > 0 &&
    typeof thumbnailUrl === "string" &&
    thumbnailUrl.startsWith("https://")
  );
}

function formatPublished(iso: string): string | null {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

/**
 * Latest uploads from the channel, in the same card style the app's
 * community page uses: thumbnail, title, date. The whole section is hidden
 * until the API responds with real videos.
 */
export function LatestVideos() {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    if (!RECENT_VIDEOS_URL) return;

    const controller = new AbortController();

    fetch(RECENT_VIDEOS_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json) => {
        const items = json?.data?.items;

        if (!Array.isArray(items)) return;

        const usable = items.filter(isVideo).slice(0, 6);

        if (usable.length > 0) setVideos(usable);
      })
      // Fail silently; the section simply doesn't render.
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (!videos) return null;

  return (
    <section
      aria-labelledby="latest-videos-heading"
      style={{
        padding: "120px 0",
        backgroundColor: colors.heroDark,
        color: "white",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <PageContainer>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            From the channel
          </span>
          <h2
            id="latest-videos-heading"
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Latest videos
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", margin: 0 }}>
            Follow-alongs, form breakdowns, and what the army is up to.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {videos.map((video) => {
            const published = formatPublished(video.publishedAt);

            return (
              <a
                key={video.videoId}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="latest-video-card"
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                  <h3
                    style={{
                      margin: "0 0 0.5rem",
                      fontSize: "1rem",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.title}
                  </h3>
                  {published ? (
                    <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>
                      {published}
                    </p>
                  ) : null}
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: colors.accentLight,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            See all videos on YouTube →
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
