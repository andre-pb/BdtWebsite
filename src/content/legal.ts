export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const legalContact = {
  email: "hello@busydadtraining.com",
  company: "Busy Dad Training",
} as const;

export const accountDeletionPage = {
  path: "/deleting-your-busy-dad-training-app-account/",
  seo: {
    title: "Deleting Your Busy Dad Training App Account",
    description:
      "How to delete your Busy Dad Training app account, what data is removed, and how to contact us about account deletion requests.",
  },
  heading: "Deleting Your Account",
  intro:
    "You can delete your Busy Dad Training app account at any time. This page explains how to do it in the app and what happens to your data.",
  sections: [
    {
      id: "in-app",
      title: "Delete your account in the app",
      paragraphs: [
        "The fastest way to delete your account is directly within the Busy Dad Training app:",
      ],
      list: [
        "Open the Busy Dad Training app on your device.",
        "Go to Settings (usually found in your profile or menu).",
        "Select Account or Privacy settings.",
        "Tap Delete Account and confirm when prompted.",
      ],
    },
    {
      id: "email-request",
      title: "Request deletion by email",
      paragraphs: [
        "If you cannot access the app or prefer to request deletion by email, contact us at hello@busydadtraining.com with the subject line \"Account Deletion Request\". Include the email address associated with your account so we can verify your identity.",
        "We aim to process verified deletion requests within 30 days.",
      ],
    },
    {
      id: "data-removed",
      title: "What data is deleted",
      paragraphs: [
        "When you delete your account, we remove personal data associated with your profile, including your account credentials, workout history stored in our systems, and any preferences linked to your account.",
        "Some information may be retained where required by law, for fraud prevention, or to resolve disputes. Anonymised or aggregated data that cannot identify you may also be kept for analytics and service improvement.",
      ],
    },
    {
      id: "subscriptions",
      title: "App store subscriptions",
      paragraphs: [
        "Deleting your Busy Dad Training account does not automatically cancel any subscription managed through the Apple App Store or Google Play Store. You must cancel subscriptions separately through your device's subscription settings.",
      ],
    },
    {
      id: "questions",
      title: "Questions",
      paragraphs: [
        "If you have questions about account deletion or your personal data, email hello@busydadtraining.com and we will help.",
      ],
    },
  ] satisfies LegalSection[],
} as const;

export const termsPage = {
  path: "/busy-dad-training-terms-and-conditions-2/",
  seo: {
    title: "Terms and Conditions",
    description:
      "Terms and conditions for using the Busy Dad Training website and mobile app, including health disclaimers and acceptable use.",
  },
  heading: "Terms and Conditions",
  intro:
    "These terms govern your use of the Busy Dad Training website and mobile application. By accessing or using our services, you agree to these terms.",
  lastUpdated: "May 2026",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of terms",
      paragraphs: [
        "By downloading, accessing, or using Busy Dad Training, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, do not use our services.",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility and account use",
      paragraphs: [
        "You must be at least 16 years old to create an account and use the app. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
        "You agree to provide accurate information and to use the service only for lawful, personal fitness purposes.",
      ],
    },
    {
      id: "health",
      title: "Health and fitness disclaimer",
      paragraphs: [
        "Busy Dad Training provides fitness guidance and training content for informational purposes. It is not medical advice. Consult a qualified healthcare professional before starting any exercise programme, especially if you have a medical condition, injury, or concerns about your health.",
        "You participate in workouts at your own risk. Busy Dad Training is not liable for injury, illness, or loss arising from your use of the programme.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: [
        "You agree not to misuse the service, including by attempting to reverse engineer the app, interfere with its operation, scrape content without permission, or use the service in any way that violates applicable law.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "All content, branding, training methodology, app design, and materials provided by Busy Dad Training are owned by Busy Dad Training or its licensors. You may not copy, reproduce, or distribute our content without written permission.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Busy Dad Training shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or app.",
        "Our total liability for any claim relating to the service shall not exceed the amount you paid us in the twelve months preceding the claim, or zero if you use the free tier.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time. When we do, we will revise the \"Last updated\" date on this page. Continued use of the service after changes take effect constitutes acceptance of the updated terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "For questions about these terms, contact hello@busydadtraining.com.",
      ],
    },
  ] satisfies LegalSection[],
} as const;

export const legalFooterLinks = [
  { label: "Terms", href: termsPage.path },
  { label: "Account Deletion", href: accountDeletionPage.path },
] as const;
