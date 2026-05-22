type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div
      style={{
        aspectRatio: "16/9",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
        background: "#0F172A",
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </div>
  );
}
