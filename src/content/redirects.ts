export type LegacyRedirect = {
  from: string;
  to: string;
  title: string;
};

export const validRedirectDestinations = [
  "/",
  "/principles/",
  "/movements/",
  "/levels/",
] as const;

export const legacyRedirects: LegacyRedirect[] = [
  {
    from: "/the-two-sacred-movements/",
    to: "/movements/",
    title: "The Two Sacred Movements",
  },
  {
    from: "/the-two-movements/",
    to: "/movements/",
    title: "The Two Movements",
  },
  {
    from: "/principles-of-the-busy-dad-program/",
    to: "/principles/",
    title: "Principles of the Busy Dad Program",
  },
  {
    from: "/program-levels/",
    to: "/levels/",
    title: "Program Levels",
  },
  {
    from: "/home/",
    to: "/",
    title: "Home",
  },
  {
    from: "/coming-soon/",
    to: "/",
    title: "Coming Soon",
  },
];
