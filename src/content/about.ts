import { assetPath } from "@/lib/base-path";
import { burpeeStat } from "@/content/site";

export const aboutPage = {
  seo: {
    title: "About Max | Busy Dad Training",
    description:
      "Meet Max Edwards, creator of Busy Dad Training, the short home workout app for men built on 80 minutes a week and two compound burpee movements.",
  },
  hero: {
    eyebrow: "The Creator",
    title: "Meet Max.",
    intro:
      "Years of trying to make training stick, until fatherhood forced one simple rule.",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  bio: {
    name: "Max Edwards",
    subtitle: "Creator of the Busy Dad Program",
    image: assetPath("/images/Busy_Dad%20Large.webp"),
    imageAlt: "Max Edwards, creator of the Busy Dad Program",
    paragraphs: [
      "I'm not an athlete, and I didn't come into this with any special background, just years of trying and failing to make training stick. Like so many of us, I bounced between programs, always starting strong and eventually dropping off when life got busy.",
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
        body: "Max began filming simple, follow-along burpee workouts. No gym, no equipment, no fluff. Just the work. People could press play, hit the floor, and train alongside him.",
      },
      {
        id: "community",
        step: "02",
        title: "A community formed",
        body: `Practitioners kept showing up. The Busy Dad Army grew: ${burpeeStat.value.toLocaleString()}${burpeeStat.valueSuffix} burpees logged on the app and counting. Dads around the world proving that 80 minutes a week is enough when the system is honest.`,
      },
      {
        id: "app",
        step: "03",
        title: "So the app was built",
        body: "The videos showed people what to do. The app helps them actually do it: every day, with a timer, a level system, and benchmarks that tell you exactly where you stand. Structure for people who don't have time to waste.",
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
  // Rendered as a visible FAQ and as FAQPage JSON-LD. Answers stay within
  // what the page already says about Max: no invented credentials.
  faqs: [
    {
      question: "Who created Busy Dad Training?",
      answer:
        "Busy Dad Training was created by Max Edwards. It started as free follow-along burpee workouts on his YouTube channel, grew into a community of dads training 80 minutes a week, and became the Busy Dad Training app: the same method with a timer, a level system and benchmarks.",
    },
    {
      question: "What is Max Edwards' fitness background?",
      answer:
        "Max is not a professional athlete and does not claim a special background. His method came from years of starting programmes and dropping off when life got busy. When he became a father he set one rule, no more than 80 minutes of training a week, and built everything around two burpee movements that fit inside it. The programme is the result of that constraint, tested on himself first and then on the dads he coached.",
    },
    {
      question: "How did the Busy Dad Program start?",
      answer:
        "On YouTube. Max filmed simple, follow-along burpee sessions with no gym and no equipment, and people trained alongside him. As the community grew, the videos showed people what to do, but not how to stay consistent, so the app was built to add structure: a strict 20-minute timer, four levels unlocked by Landmark Workouts, and a record of exactly where you stand.",
    },
    {
      question: "Is Max still involved in the programme?",
      answer:
        "Yes. Max still publishes tutorials and follow-along workouts on the Busy Dad Training YouTube channel, coaches members of the community, and the programme in the app is his method, unchanged: 80 minutes a week, two movements, level by level.",
    },
    {
      question: "What does the 80-minute rule mean?",
      answer:
        "You train for 80 minutes a week and no more, ideally as four 20-minute sessions. The cap is the point: it is small enough to keep every week, even with kids and a job, and the intensity inside those 20 minutes is what drives progress. Every level of the programme, up to Graduation, is built on the same weekly budget.",
    },
  ],
} as const;
