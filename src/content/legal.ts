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

export const privacyPage = {
  path: "/privacy-policy/",
  seo: {
    title: "Privacy Policy",
    description:
      "How Busy Dad Training collects, uses, and protects your personal data when you use our website and mobile app.",
  },
  heading: "Privacy Policy",
  intro:
    "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
  lastUpdated: "January 09, 2024",
  sections: [
    {
      id: "interpretation",
      title: "Interpretation",
      paragraphs: [
        "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      paragraphs: ["For the purposes of this Privacy Policy:"],
      list: [
        "Account means a unique account created for You to access our Service or parts of our Service.",
        "Affiliate means an entity that controls, is controlled by or is under common control with a party, where \"control\" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.",
        "Application refers to Busy Dad Training, the software program provided by the Company.",
        "Company (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to Busy Dad Training.",
        "Country refers to: United Kingdom",
        "Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.",
        "Personal Data is any information that relates to an identified or identifiable individual.",
        "Service refers to the Application.",
        "Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.",
        "Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).",
        "You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
      ],
    },
    {
      id: "personal-data",
      title: "Personal Data",
      paragraphs: [
        "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:",
      ],
      list: ["Email address", "First name and last name", "Usage Data"],
    },
    {
      id: "usage-data",
      title: "Usage Data",
      paragraphs: [
        "Usage Data is collected automatically when using the Service.",
        "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
        "When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.",
        "We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.",
      ],
    },
    {
      id: "use-of-data",
      title: "Use of Your Personal Data",
      paragraphs: ["The Company may use Personal Data for the following purposes:"],
      list: [
        "To provide and maintain our Service, including to monitor the usage of our Service.",
        "To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
        "For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.",
        "To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.",
        "To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.",
        "To manage Your requests: To attend and manage Your requests to Us.",
        "For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.",
        "For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.",
      ],
    },
    {
      id: "sharing-data",
      title: "Sharing Your Personal Data",
      paragraphs: ["We may share Your personal information in the following situations:"],
      list: [
        "With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.",
        "For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.",
        "With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.",
        "With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.",
        "With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.",
        "With Your consent: We may disclose Your personal information for any other purpose with Your consent.",
      ],
    },
    {
      id: "retention",
      title: "Retention of Your Personal Data",
      paragraphs: [
        "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.",
        "The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.",
      ],
    },
    {
      id: "transfer",
      title: "Transfer of Your Personal Data",
      paragraphs: [
        "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.",
        "Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.",
        "The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.",
      ],
    },
    {
      id: "delete-data",
      title: "Delete Your Personal Data",
      paragraphs: [
        "You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.",
        "Our Service may give You the ability to delete certain information about You from within the Service.",
        "You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.",
        "Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.",
      ],
    },
    {
      id: "disclosure-business",
      title: "Business Transactions",
      paragraphs: [
        "If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.",
      ],
    },
    {
      id: "disclosure-law-enforcement",
      title: "Law enforcement",
      paragraphs: [
        "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).",
      ],
    },
    {
      id: "disclosure-other",
      title: "Other legal requirements",
      paragraphs: [
        "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:",
      ],
      list: [
        "Comply with a legal obligation",
        "Protect and defend the rights or property of the Company",
        "Prevent or investigate possible wrongdoing in connection with the Service",
        "Protect the personal safety of Users of the Service or the public",
        "Protect against legal liability",
      ],
    },
    {
      id: "security",
      title: "Security of Your Personal Data",
      paragraphs: [
        "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      paragraphs: [
        "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.",
        "If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.",
      ],
    },
    {
      id: "links",
      title: "Links to Other Websites",
      paragraphs: [
        "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.",
        "We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this Privacy Policy",
      paragraphs: [
        "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.",
        "We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the \"Last updated\" date at the top of this Privacy Policy.",
        "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      paragraphs: [
        `If you have any questions about this Privacy Policy, You can contact us by email: ${legalContact.email}`,
      ],
    },
  ] satisfies LegalSection[],
} as const;

export const legalFooterLinks = [
  { label: "Terms", href: termsPage.path },
  { label: "Privacy", href: privacyPage.path },
  { label: "Account Deletion", href: accountDeletionPage.path },
] as const;
