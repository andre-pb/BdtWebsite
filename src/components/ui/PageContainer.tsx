import type { CSSProperties, ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  style?: CSSProperties;
  as?: "div" | "section";
};

export function PageContainer({ children, style, as: Tag = "div" }: PageContainerProps) {
  return (
    <Tag
      style={{
        maxWidth: "var(--page-max-width)",
        margin: "0 auto",
        padding: "0 var(--page-padding-x)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
