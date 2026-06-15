import { assetPath } from "@/lib/base-path";

export const principlesPage = {
  seo: {
    title: "Busy Dad Training Principles",
    description:
      "The three principles behind this short home workout app for men: 80 minutes a week, disciplined minimalism, and intentional 20-minute sessions — no gym required.",
  },
  hero: {
    eyebrow: "The Philosophy",
    title: "Busy Dad Training Principles",
    intro: "Minimalism. Efficiency. Intentional Execution.",
    backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  },
  pillars: [
    {
      id: "disciplined-minimalism",
      title: "Disciplined Minimalism",
      image: {
        src: assetPath("/levels-images/motivation%201.webp"),
        alt: "Busy Dad Training motivation image for disciplined minimalism",
      },
      blocks: [
        { emphasis: "The Busy Dad Program is built on disciplined minimalism." },
        "Most training programs bury progress beneath endless variation: isolation exercises, complicated splits, and unnecessary volume. The Busy Dad Program strips training down to what matters most.",
        "Our focus is compound movement — exercises that demand full-body coordination, recruit every major muscle group, and train the body as an integrated system.",
        "From this minimalist philosophy emerge the two Sacred Movements: the foundation of the entire program.",
        {
          emphasis:
            "As a practitioner of the Busy Dad Program, your task is simple: master these movements. Eliminate distraction. Pursue excellence.",
        },
      ],
      quote: null,
    },
    {
      id: "ruthless-efficiency",
      title: "Ruthless Efficiency",
      image: {
        src: assetPath("/levels-images/motivation%202.webp"),
        alt: "Busy Dad Training motivation image for ruthless efficiency",
      },
      blocks: [
        { emphasis: "Time is our most limited resource." },
        "Busy dads cannot afford to spend endless hours in the gym. Training must deliver maximum return with minimal time investment.",
        "The Busy Dad Program operates on a strict weekly training budget: 80 minutes.",
        { emphasis: "That's it." },
        "Eighty intentional minutes per week is enough to produce profound results. Over years of training within this exact constraint, I've seen my physique and fitness transform beyond recognition.",
        "The standard prescription is four 20-minute sessions each week.",
        { emphasis: "Not more. Not less." },
        "Because efficiency is not about doing everything. It's about doing exactly what works.",
      ],
      quote: "Just 80 minutes per week is enough to see profound training results.",
    },
    {
      id: "intentional-execution",
      title: "Intentional Execution",
      image: {
        src: assetPath("/levels-images/motivation%203.webp"),
        alt: "Busy Dad Training motivation image for intentional execution",
      },
      blocks: [
        { emphasis: "Constraint creates focus." },
        { emphasis: "With only 80 minutes each week, every second matters." },
        "In the Busy Dad Program, training is never casual or aimless. Every session is deliberate. Every effort serves a purpose. Every minute moves you forward.",
        { emphasis: "This is not exercise for the sake of exercise." },
        "It is structured, purposeful progression guided by the program's four-tiered level system — a framework designed to turn consistency into measurable advancement.",
        {
          emphasis:
            "Training is not a chore. It is a project. And every workout lays another brick.",
        },
      ],
      quote: "Every minute of every workout drives progress toward your next level.",
    },
  ],
} as const;
