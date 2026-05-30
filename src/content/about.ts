import { assetPath } from "@/lib/base-path";
import { burpeeStat } from "@/content/site";

export const aboutPage = {
  seo: {
    title: "About Max — Busy Dad Training",
    description:
      "Max Edwards on building the Busy Dad Program — a stripped-back, time-efficient training system born from the constraint of 80 minutes a week and fatherhood.",
  },
  hero: {
    eyebrow: "The Creator",
    title: "Meet Max.",
    intro:
      "Years of trying to make training stick — until fatherhood forced one simple rule.",
    backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  },
  bio: {
    name: "Max Edwards",
    subtitle: "Creator of the Busy Dad Program",
    image: assetPath("/images/Busy_Dad%20Large.webp"),
    imageAlt: "Max Edwards, creator of the Busy Dad Program",
    paragraphs: [
      "I'm not an athlete, and I didn't come into this with any special background — just years of trying and failing to make training stick. Like so many of us, I bounced between programs, always starting strong and eventually dropping off when life got busy.",
      "When I became a father, I made a hard, simple rule: no more than 80 minutes a week of training, and no excuses. That constraint changed everything. It forced me to cut through the noise and focus on what actually works. I ended up building my entire approach around just two burpee movements. The result wasn't just consistency. It was the best shape of my life.",
      "The Busy Dad Program is what came out of that: a stripped-back, time-efficient system built for real life and real responsibility.",
    ],
  },
  timeline: {
    eyebrow: "How it started",
    title: "From YouTube to the app.",
    description:
      "The method didn't change. The delivery did. What began as videos for anyone with a floor and twenty minutes became a system built for people who actually show up.",
    steps: [
      {
        id: "youtube",
        step: "01",
        title: "It started on YouTube",
        body: "Max began filming simple, follow-along burpee workouts — no gym, no equipment, no fluff. Just the work. People could press play, hit the floor, and train alongside him.",
      },
      {
        id: "community",
        step: "02",
        title: "A community formed",
        body: `Practitioners kept showing up. The Busy Dad Army grew — ${burpeeStat.value.toLocaleString()}${burpeeStat.valueSuffix} burpees logged on the app and counting. Dads around the world proving that 80 minutes a week is enough when the system is honest.`,
      },
      {
        id: "app",
        step: "03",
        title: "So the app was built",
        body: "The videos showed people what to do. The app helps them actually do it — every day, with a timer, a level system, and benchmarks that tell you exactly where you stand. Structure for people who don't have time to waste.",
      },
    ],
  },
  youtube: {
    channelName: "BusyDad Training",
    channelHandle: "@BusyDadTraining",
    url: "https://www.youtube.com/@BusyDadTraining",
    linkLabel: "See the original videos",
    description: "Tutorials, follow-alongs, and the workouts that started it all.",
  },
  featuredVideo: {
    title: "20-Minute Full Body Workout",
    description:
      "Follow-along session • Burpee & Squat protocol • No equipment needed",
    videoId: "ftJ7kR04HvU",
    videoUrl: "https://www.youtube.com/watch?v=ftJ7kR04HvU",
    uploadDate: "2024-01-01",
  },
} as const;
