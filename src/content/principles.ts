import { assetPath } from "@/lib/base-path";

export const principlesPage = {
  seo: {
    title: "Busy Dad Training Principles",
    description:
      "The three principles of Busy Dad Training — simplicity, efficiency, intentionality — and the philosophy behind two Sacred Movements.",
  },
  hero: {
    eyebrow: "The Philosophy",
    title: "Busy Dad Training Principles",
    intro:
      "The Busy Dad Program revolves around three principles: simplicity, efficiency, and intentionality. Let's break them down.",
    backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  },
  creator: {
    eyebrow: "Creator",
    name: "Max Edwards",
    subtitle: "Philosopher, warrior, tyrant",
    image: assetPath("/images/Busy_Dad%20Large.webp"),
    imageAlt: "Max Edwards, creator of the Busy Dad Program",
    quote: "Your aim is simple: cultivate excellence in the two Sacred Movements",
  },
  pillars: [
    {
      id: "simplicity",
      title: "Simplicity",
      paragraphs: [
        "The Busy Dad Program is a minimalist program. Some programs have you perform an endless library of isolation exercises, each targeted at a different muscle. Not here. We look for the best compound movements. Unlike isolation exercises, compound movements require the body to work as an integrated system, and they activate every major muscle group.",
        "BDP has discovered two dazzlingly effective compound movements, dubbed the Sacred Movements of the program. As a practitioner of BDP, you will train these movements and very little else. Your aim is simple: cultivate excellence in the two Sacred Movements.",
      ],
      quote: null,
    },
    {
      id: "efficiency",
      title: "Efficiency",
      paragraphs: [
        "We are busy dads and busy people. We simply do not have the time to spend endless hours in the gym. There are more pressing demands on our time, and we need our training to be maximally efficient so that it doesn't start to conflict with those demands.",
        "I have learned, to my great surprise, that just 80 minutes per week is enough to see profound training results. For years now, I have restricted myself to a weekly training budget of just 80 minutes, and my physique and fitness have morphed beyond recognition.",
        "Therefore, BDP requires you to train the two Sacred Movements for exactly 80 minutes per week. Not a minute more, and not a minute less. You are free to break down those 80 minutes as you choose, but the preferred breakdown is four 20-minute sessions per week.",
      ],
      quote: "Just 80 minutes per week is enough to see profound training results",
    },
    {
      id: "intentionality",
      title: "Intentionality",
      paragraphs: [
        "With such a restrictive training budget, we need every single one of our weekly 80 minutes to be of the highest possible quality. And there is no training quality without drive and purpose.",
        "In BDP, training is a project, not a chore. We're building a house, and every workout lays down a brick in the foundation. Not a second is idle or aimless: every minute of every workout is helping us progress towards our long-term, medium-term, and short-term goals.",
        "These goals are defined by the distinctive four-tiered level system that governs BDP.",
      ],
      quote:
        "Every minute of every workout is helping us progress towards our long-term, medium-term, and short-term goals.",
    },
  ],
} as const;
