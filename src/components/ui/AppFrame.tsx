import Image from "next/image";
import type { Ref } from "react";
import { appFrameStyles } from "@/constants/colors";

type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type ScreenshotLayer = {
  screenshot: Screenshot;
  layerRef?: Ref<HTMLDivElement>;
  layerIndex?: number;
  opacity?: number;
};

type AppFrameProps = {
  eyebrow?: string;
  title?: string;
  children?: React.ReactNode;
  contentBackground?: string;
  screenshot?: Screenshot;
  screenshotLayers?: ScreenshotLayer[];
};

const FRAME_WIDTH = 320;

export function AppFrame({
  eyebrow,
  title,
  children,
  contentBackground = "#FFFFFF",
  screenshot,
  screenshotLayers,
}: AppFrameProps) {
  const primaryScreenshot = screenshot ?? screenshotLayers?.[0]?.screenshot;
  const frameHeight = primaryScreenshot
    ? Math.round(FRAME_WIDTH * (primaryScreenshot.height / primaryScreenshot.width))
    : 690;

  return (
    <div style={{ ...appFrameStyles.frame, height: frameHeight }} aria-hidden={primaryScreenshot ? undefined : "true"}>
      <div style={appFrameStyles.notch} />
      {screenshotLayers ? (
        <div style={{ position: "relative", flex: 1, width: "100%", height: "100%" }}>
          {screenshotLayers.map(({ screenshot: layerScreenshot, layerRef, layerIndex, opacity }, index) => (
            <div
              key={layerScreenshot.src}
              ref={layerRef}
              className={`showcase-screenshot-layer${index === 0 ? " showcase-screenshot-layer--first" : ""}`}
              data-layer-index={layerIndex ?? index}
              style={{
                position: index === 0 ? "relative" : "absolute",
                inset: index === 0 ? undefined : 0,
                top: index === 0 ? undefined : 0,
                left: index === 0 ? undefined : 0,
                width: "100%",
                height: "100%",
                ...(opacity !== undefined ? { opacity } : {}),
              }}
            >
              <Image
                src={layerScreenshot.src}
                alt={layerScreenshot.alt}
                width={layerScreenshot.width}
                height={layerScreenshot.height}
                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      ) : screenshot ? (
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
      ) : (
        <>
          <div
            style={{
              padding: "48px 24px 24px",
              background: "#FFFFFF",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                color: "#0055FF",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {eyebrow}
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#0F172A",
                marginTop: "4px",
                lineHeight: 1.2,
              }}
            >
              {title}
            </h3>
          </div>
          <div
            style={{
              flex: 1,
              padding: "24px",
              background: contentBackground,
              overflowY: "auto",
            }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
