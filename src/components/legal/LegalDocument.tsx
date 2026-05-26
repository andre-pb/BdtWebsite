import { PageContainer } from "@/components/ui/PageContainer";
import type { LegalSection } from "@/content/legal";

type LegalDocumentProps = {
  heading: string;
  intro: string;
  sections: readonly LegalSection[];
  lastUpdated?: string;
  eyebrow?: string;
};

export function LegalDocument({
  heading,
  intro,
  sections,
  lastUpdated,
  eyebrow = "Legal",
}: LegalDocumentProps) {
  return (
    <>
      <section className="legal-hero" aria-labelledby="legal-page-heading">
        <PageContainer>
          <span className="legal-hero__eyebrow">{eyebrow}</span>
          <h1 id="legal-page-heading" className="legal-hero__title">
            {heading}
          </h1>
          {lastUpdated ? (
            <p className="legal-hero__updated">Last updated: {lastUpdated}</p>
          ) : null}
          <p className="legal-hero__intro">{intro}</p>
        </PageContainer>
      </section>

      <section className="legal-content" aria-label="Page sections">
        <PageContainer>
          <div className="legal-content__body">
            {sections.map((section) => (
              <article key={section.id} className="legal-section">
                <h2 className="legal-section__title">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="legal-section__paragraph">
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="legal-section__list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
