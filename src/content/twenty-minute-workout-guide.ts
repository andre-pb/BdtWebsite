import { assetPath } from "@/lib/base-path";
import { appPricing } from "@/content/site";

export const twentyMinuteWorkoutGuidePage = {
  path: "/20-minute-home-workout-for-busy-dads/",
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  seo: {
    title: "The 20-Minute Home Workout for Busy Dads (2026 Guide)",
    description:
      "A complete guide to the 20-minute home workout for busy dads: why short sessions work, the exact two-movement AMRAP workout, a weekly plan, and how to progress. No gym or equipment needed.",
    keywords: [
      "20 minute home workout for busy dads",
      "20 minute workout for men",
      "short home workout for dads",
      "burpee workout plan",
      "bodyweight workout at home",
      "no equipment workout for men",
      "quick workout for busy dads",
      "home workout without a gym",
    ],
  },
  hero: {
    eyebrow: "Training Guide",
    title: "The 20-Minute Home Workout for Busy Dads",
    intro:
      "You don't need an hour in the gym. You need 20 minutes, a bit of floor space, and a plan you can stick to. This guide gives you all three: the exact workout, a weekly schedule, and a clear way to progress.",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  sections: [
    {
      id: "why-20-minutes",
      title: "Why 20 minutes is enough",
      paragraphs: [
        "Most workout plans fail for one reason: they ask for too much time. An hour-long session plus a drive to the gym is two hours out of your day. With kids, work, and a home to run, that plan breaks within weeks.",
        "A 20-minute home workout removes every excuse. No commute. No kit to pack. No childcare to arrange. You can train before the kids wake up, in your lunch break, or after bedtime. When a workout costs 20 minutes, you stop skipping it.",
        "The maths also works. Four 20-minute sessions a week gives you 80 minutes of hard training. The World Health Organization recommends 75 to 150 minutes of vigorous activity per week for adults. Train four times a week at high effort and you're inside that range without ever leaving the house.",
        "The catch? Those 20 minutes have to count. That means simple movements, high effort, and no wasted time deciding what to do. That's exactly what the workout below delivers.",
      ],
    },
    {
      id: "the-workout",
      title: "The workout: a 20-minute AMRAP",
      paragraphs: [
        "AMRAP stands for 'as many rounds as possible'. You set a timer for 20 minutes and repeat a small set of movements until it beeps. Your score is the total number of reps. Next session, you try to beat it.",
        "The Busy Dad workout uses just two movements: the 6-count burpee and the bodyweight squat. The burpee works your whole body: legs, chest, arms, core, and lungs. The squat builds your legs and gives you an active rest between burpee sets. Together they hit everything that matters.",
        "That's it. No machines, no dumbbells, no pull-up bar. Just you and the floor.",
      ],
    },
    {
      id: "progression",
      title: "How to progress week to week",
      paragraphs: [
        "Random workouts give random results. Progress comes from doing the same simple test and beating your old score. With a 20-minute AMRAP, progress is one number: total reps.",
        "The Busy Dad Training app structures this into four levels. Each level sets your daily rep targets. When you pass a benchmark, a Landmark Workout, you move up. Level 1 is built for complete beginners; Level 4 is a serious engine test. You always know where you stand and what to do next.",
        "If you're training without the app, keep a simple log. Write down your total reps after each session. Aim to add a few reps each week. When your pace stops climbing, hold steady for a week and let your body catch up.",
      ],
    },
    {
      id: "form",
      title: "Get the form right first",
      paragraphs: [
        "High reps only work if your form holds. Before you chase a score, learn the 6-count burpee properly: each of the six counts is a distinct position, and rushing them turns the movement sloppy fast.",
        "Keep your squats honest too: hips below parallel, heels down, chest up. Slow, full reps beat fast, half reps every time.",
        "Our movements guide breaks down both exercises step by step, with video demos of the 6-count burpee and the Navy Seal burpee.",
      ],
    },
    {
      id: "results",
      title: "What results to expect",
      paragraphs: [
        "In the first two weeks, expect the workouts to feel brutal and your scores to climb fast. That early jump is your body learning the movements.",
        "By week four to six, most dads notice better recovery, easier stairs, and looser-fitting clothes. Burpees at volume burn a lot of energy and work nearly every muscle you have.",
        "From there, it compounds. The dads in our community have logged millions of burpees between them, and the pattern is the same: the ones who show up four times a week, every week, get results. Consistency is the whole game, and 20 minutes is short enough to stay consistent.",
      ],
    },
  ],
  workoutSteps: [
    {
      name: "Warm up (2–3 minutes)",
      text: "March on the spot, do arm circles, and perform 10 slow bodyweight squats to warm your hips, knees, and shoulders.",
    },
    {
      name: "Set a 20-minute timer",
      text: "Use the app's built-in AMRAP timer or any countdown timer. Once it starts, the session has one rule: keep moving.",
    },
    {
      name: "Do a set of 6-count burpees",
      text: "Perform a set of 6-count burpees at a steady pace, for example 5 to 10 reps. Move with control through all six counts of the movement.",
    },
    {
      name: "Do a set of bodyweight squats",
      text: "Switch to bodyweight squats for a set of 10 to 20 reps. Squats keep you moving while your upper body recovers.",
    },
    {
      name: "Repeat until the timer ends",
      text: "Alternate burpee sets and squat sets for the full 20 minutes. Count your total reps as you go.",
    },
    {
      name: "Log your score",
      text: "Record your total reps. That number is your benchmark. Aim to beat it next session.",
    },
  ],
  weeklyPlan: {
    title: "Your week at a glance",
    intro:
      "Four sessions a week is the sweet spot: enough volume to drive progress, enough rest to recover. Here's a simple template; shift the days to fit your life.",
    days: [
      { day: "Monday", session: "20-minute AMRAP" },
      { day: "Tuesday", session: "Rest or a walk" },
      { day: "Wednesday", session: "20-minute AMRAP" },
      { day: "Thursday", session: "Rest or a walk" },
      { day: "Friday", session: "20-minute AMRAP" },
      { day: "Saturday", session: "20-minute AMRAP" },
      { day: "Sunday", session: "Full rest" },
    ],
    outro:
      "Miss a day? Don't stack sessions to catch up. Just do the next one on the plan. The week resets; the habit is what counts.",
  },
  mistakes: {
    title: "Five mistakes that stall progress",
    items: [
      {
        label: "Going too hard on day one",
        description:
          "If you blow up in your first session, you'll dread the second. Start at a pace you can hold for the full 20 minutes.",
      },
      {
        label: "Sloppy burpee form",
        description:
          "Half push-ups and shallow squats inflate your score and cheat your body. Full range, every rep.",
      },
      {
        label: "Skipping the log",
        description:
          "If you don't track your reps, you can't see progress, and seeing progress is what keeps you going.",
      },
      {
        label: "Training only when motivated",
        description:
          "Motivation fades by week three. Schedule your four sessions like meetings and keep them.",
      },
      {
        label: "Adding complexity too soon",
        description:
          "You don't need new exercises after two weeks. You need more reps of the same two movements.",
      },
    ],
  },
  faqs: [
    {
      question: "Is a 20-minute home workout really enough to get fit?",
      answer:
        "Yes, if the effort is high. Four 20-minute high-effort sessions give you 80 minutes of vigorous exercise a week, which sits within the World Health Organization's guideline of 75 to 150 minutes of vigorous activity. Consistency at 20 minutes beats an hour-long plan you quit after a month.",
    },
    {
      question: "Do I need any equipment for this workout?",
      answer:
        "No. The workout uses only two bodyweight movements: the 6-count burpee and the bodyweight squat. You need a timer and enough floor space to lie down. No gym, no weights, no bar.",
    },
    {
      question: "I'm a complete beginner. Where do I start?",
      answer:
        "Start slow and short. Do fewer burpees per set, rest as needed, and treat your first week as practice rather than a test. The Busy Dad Training app starts complete beginners at Level 1A with rep targets matched to your current fitness.",
    },
    {
      question: "How many days a week should I do the 20-minute workout?",
      answer:
        "Four sessions a week is the standard Busy Dad Training prescription: 80 minutes of training in total. Spread them across the week with rest days in between, and take at least one full rest day.",
    },
    {
      question: "Will burpees alone build muscle?",
      answer:
        "Burpees at volume build real strength endurance, conditioning, and visible muscle in your chest, shoulders, arms, and legs, especially if you're new or returning to training. They won't make you a bodybuilder, but they will make you strong, lean, and hard to tire out.",
    },
    {
      question: "How is this different from just doing random home workouts?",
      answer:
        `Structure and progression. The Busy Dad Training app gives you daily rep targets, a four-level progression system with benchmark workouts, and a community of dads doing the same programme. It costs ${appPricing.summary}, with a 14-day free trial.`,
    },
  ],
} as const;

export type TwentyMinuteGuideFaq = (typeof twentyMinuteWorkoutGuidePage.faqs)[number];
