export const levelsPage = {
  seo: {
    title: "The Four Levels of the Busy Dad Program",
    description:
      "Understand the BDP four-tiered level system: Landmark Workouts for 6-counts and Navy Seals that unlock each level, from Level 1A through Graduation.",
  },
  hero: {
    eyebrow: "Progress",
    title: "The Four Levels of the Busy Dad Program",
    backgroundImage: "/photos/burpee-photo-1.jpg",
  },
  intro: {
    paragraphs: [
      "Remember we said that Intentionality is one of the three principles of BDP? Let's return to that topic.",
      "In BDP, every second of every workout is geared towards a training goal. But where do those goals come from? The answer: the four-tiered Level System that governs the Busy Dad Program.",
      "As a practitioner of BDP, you will be assigned a specific level within the program on the basis of your current degree of fitness in the two Sacred Movements. Your long-term goal is to complete the Busy Dad Program. That's like building the house. Your medium-term goal is to advance to the next level within the program. That's like building a room in the house. And your immediate term goal is to do something that helps you edge closer to the next training level. That's like laying a brick in the foundation.",
      "Every level of the system is unlocked by two Landmark Workouts: one 20-minute 6-count workout, and one 20-minute Navy Seal Workout. Let's break down those levels and the Landmark Workouts that unlock them.",
    ],
    goals: [
      {
        term: "Long-term",
        metaphor: "Building the house",
        description: "Complete the Busy Dad Program",
      },
      {
        term: "Medium-term",
        metaphor: "Building a room",
        description: "Advance to the next level within the program",
      },
      {
        term: "Immediate",
        metaphor: "Laying a brick",
        description: "Do something that edges you closer to the next training level",
      },
    ],
  },
  level1: {
    id: "level-1",
    number: 1,
    title: "Level 1",
    intro:
      "Level 1 is the most elementary level of the program, and it is further differentiated into four sublevels. There is an enormous difference between someone at the beginning of Level 1 and someone at the end of Level 1, and the sub-levels are in place to acknowledge those differences.",
    sublevels: [
      {
        id: "1a",
        title: "Level 1A",
        description:
          "This where the journey starts: the most elementary level of the program. If you can complete a single repetition of each of the two sacred movements of BDP, you have cemented your status as a level 1A practitioner of BDP. Now it is time to start chaining together the reps and working toward 1B.",
        landmarks: [
          { movement: "6-Count", target: "1 in 20 minutes" },
          { movement: "Navy Seal", target: "1 in 20 minutes" },
        ],
      },
      {
        id: "1b",
        title: "Level 1B",
        description:
          "The first level-change within the Busy Dad Program, 1B is a meaningful advance from Level 1A. You are building the muscular fitness and aerobic conditioning you will need to take your practice to the next level. Many elite practitioners begin their journey here.",
        landmarks: [
          { movement: "6-Count", target: "50 in 20 minutes" },
          { movement: "Navy Seal", target: "20 in 20 minutes" },
        ],
      },
      {
        id: "1c",
        title: "Level 1C",
        description:
          "At this level, you are already starting to pull away from the pack. It isn't everybody who can complete at least 100 high quality 6-counts within 20 minutes, or 120 push ups' worth of navy seal burpees. Whether you tested in here or sweated to earn this status, you can take pride as a 1C practitioner of BDP.",
        landmarks: [
          { movement: "6-Count", target: "100 in 20 minutes" },
          { movement: "Navy Seal", target: "40 in 20 minutes" },
        ],
      },
      {
        id: "1d",
        title: "Level 1D",
        description:
          "You are starting to breathe rarefied air in the upper climbs of Level 1. Level 1D is worlds apart from Level 1A, and for many of us, the journey to this level of the program is long and arduous. Level 2 is beckoning, and numbers that might once have seemed impossible are calling to you.",
        landmarks: [
          { movement: "6-Count", target: "150 in 20 minutes" },
          { movement: "Navy Seal", target: "60 in 20 minutes" },
        ],
      },
    ],
    outro: "Once you unlock Level 1D, your new training mission is to unlock Level 2.",
  },
  level2: {
    id: "level-2",
    number: 2,
    title: "Level 2",
    highlight: true,
    sublevels: [
      {
        id: "2a",
        title: "Level 2A",
        description:
          "This is the first major line in the sand. There are many professional athletes who could not complete 200 high quality 6-counts in 20 minutes, and if you have made it to this level, you will reliably be the fittest person in the room. But your work is just beginning.",
        landmarks: [
          { movement: "6-Count", target: "200 in 20 minutes" },
          { movement: "Navy Seal", target: "80 in 20 minutes" },
        ],
      },
      {
        id: "2b",
        title: "Level 2B",
        description:
          "There is a vast desert between level 2A and Level 3A; 2B is a pitstop on your journey. Take stock here, savor your achievements, and prepare for your campaign to unlock Level 3. You are closer than you think.",
        landmarks: [],
      },
    ],
  },
  level3: {
    id: "level-3",
    number: 3,
    title: "Level 3",
    sublevels: [
      {
        id: "3a",
        title: "Level 3A",
        description:
          "We are moving toward elite conditioning. As a 3A practitioner of the Busy Dad Program, you are in rare company. Many practitioners could spend a lifetime working toward this level. If you have unlocked it, you have greatness in you.",
        landmarks: [
          { movement: "6-Count", target: "250 in 20 minutes" },
          { movement: "Navy Seal", target: "100 in 20 minutes" },
        ],
      },
      {
        id: "3b",
        title: "Level 3B",
        description:
          "Only a practitioner can know how demanding the workouts are that unlock Level 3B. The kind of volume you are now packing into 20 minutes sets you apart from the many. You might feel a bit of vertigo at these dizzying heights of the program, but make no mistake: if you've made it this far, you can take it all the way.",
        landmarks: [],
      },
    ],
  },
  level4: {
    id: "level-4",
    number: 4,
    title: "Level 4",
    sublevels: [
      {
        id: "4a",
        title: "Level 4A",
        description:
          "Welcome. You are officially an elite burpee practitioner. The vast majority of us could train for a lifetime and never reach these heights. That is OK: you would never throw shade on a fellow practitioner. But you can take great pride in your status, which you will have to fight to maintain.",
        landmarks: [
          { movement: "6-Count", target: "275 in 20 minutes" },
          { movement: "Navy Seal", target: "120 in 20 minutes" },
        ],
      },
      {
        id: "4b",
        title: "Level 4B",
        description:
          "The final level of the Busy Dad Program, this is your last pitstop before you begin your campaign to graduate. It takes greatness to reach this level of BDP, but now is not the time to rest on your laurels. Thousands have tried, only a tiny handful have made it all the way. Could you be the next?",
        landmarks: [],
      },
    ],
  },
  transition: {
    prompt: "Where to next?",
    author: "Max Edwards",
  },
  graduation: {
    eyebrow: "The Final Stage",
    title: "Graduation",
    paragraphs: [
      "You are a graduate of the Busy Dad Program, one of the tiny elite of black belt practitioners. Your achievements make you nothing less than a world-class burpee practitioner. But you will have to fight to maintain your status: repeat these workouts in 30 days or you will slide back to Level 4B.",
    ],
    landmarks: [
      { movement: "6-Count", target: "325 in 20 minutes" },
      { movement: "Navy Seal", target: "150 in 20 minutes" },
    ],
    requirements: [
      "Both Graduation Workouts must be completed within the same week",
      "You must call out every count of both movements",
    ],
  },
  footerNote: {
    text: "All of the Landmark Workouts can be found on the Busy Dad Training YouTube channel.",
    author: "Max Edwards",
    youtubeUrl: "#",
  },
} as const;
