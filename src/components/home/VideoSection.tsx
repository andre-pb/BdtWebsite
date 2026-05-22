import { cta, video } from "@/content/site";
import { colors } from "@/constants/colors";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PageContainer } from "@/components/ui/PageContainer";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

export function VideoSection() {
  return (
    <section
      id="youtube"
      aria-labelledby="video-heading"
      style={{ padding: "120px 0", background: colors.bgPure }}
    >
      <PageContainer>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.brandBlue,
              marginBottom: "1rem",
            }}
          >
            {video.eyebrow}
          </span>
          <h2
            id="video-heading"
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: colors.textMain,
              marginBottom: "1rem",
            }}
          >
            {video.title}
          </h2>
          <p style={{ color: colors.textMuted, fontSize: "1.125rem" }}>
            {video.description}
          </p>
        </div>

        <div
          style={{
            background: colors.bgOff,
            borderRadius: "32px",
            overflow: "hidden",
            border: `1px solid ${colors.borderLight}`,
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ padding: "32px 32px 0" }}>
            <YouTubeEmbed videoId={video.featuredVideoId} title={video.featuredTitle} />
          </div>

          <div style={{ padding: "32px" }}>
            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    marginBottom: "8px",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: colors.textMain,
                    lineHeight: 1.1,
                  }}
                >
                  {video.featuredTitle}
                </h3>
                <p style={{ margin: 0, color: colors.textMuted, fontSize: "1rem" }}>
                  {video.featuredDescription}
                </p>
                <p style={{ margin: "8px 0 0", color: colors.textMuted, fontSize: "0.95rem" }}>
                  {video.channelName} · {video.channelHandle}
                </p>
              </div>
              <PrimaryButton href={video.youtubeUrl}>{cta.subscribeYoutube}</PrimaryButton>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
