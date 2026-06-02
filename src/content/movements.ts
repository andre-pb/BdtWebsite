import { assetPath } from "@/lib/base-path";

export const movementsPage = {
  seo: {
    title: "The Two Sacred Burpee Movements",
    description:
      "Master the two bodyweight burpee movements in the Busy Dad home workout app — 6-count and Navy Seal — for short, no-gym sessions.",
  },
  hero: {
    eyebrow: "The Program",
    title: "The Two Sacred Burpee Movements",
    backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  },
  intro: {
    paragraphs: [
      "The Sacred Movements sit outside mainstream fitness culture. They evolved in high-demand military training environments where conditioning had to be simple, repeatable, and effective without equipment or complexity. Over time, they became a quiet staple in places where performance was the only metric that mattered.",
      "These are not the burpees you'll recognise from modern gym classes or CrossFit workouts. These are burpees like you've never seen them: elegant, stripped of excess, and designed to build real capacity in minimal time. No noise. No flair. Just movements that deliver.",
    ],
    author: "Max Edwards",
  },
  trainingSplit: {
    text: "Recall our strict 80-minute training budget. On a standard week of BDP, you will allot 40 minutes to your 6-count training and 40 minutes to your Navy Seal training.",
  },
  sacredMovements: [
    {
      id: "six-count",
      tier: "sacred" as const,
      order: 1,
      eyebrow: "Sacred Movement",
      title: "The 6-Count Burpee",
      shortName: "6-Count",
      paragraphs: [
        "The 6-count is a six-part compound movement that trains the body as an integrated system. From first count to last, the core stays engaged. The legs and posterior chain drive the opening and close. Between them, the upper body takes its turn.",
        "Simple in structure. Demanding in practice.",
        "The 6-count builds full-body strength and conditioning, but its real distinction is lower-body endurance and cardiovascular capacity. Performed consistently, it develops work capacity quickly and efficiently.",
        "This is one of the most effective tools we know for building real-world fitness.",
      ],
      summary: "6-counts build engines.",
      video: {
        label: "YouTube 6-Count Tutorial Video",
        youtubeId: "eroWyZxZNlA",
        url: "https://www.youtube.com/watch?v=eroWyZxZNlA",
      },
    },
    {
      id: "navy-seal",
      tier: "sacred" as const,
      order: 2,
      eyebrow: "Sacred Movement",
      title: "The Navy SEAL Burpee",
      shortName: "Navy Seal",
      paragraphs: [
        "The Navy SEAL is the more advanced of the two Sacred Movements.",
        "Built across ten counts, it places greater technical and muscular demands on the body. Like the 6-count, it begins and ends with the legs. Between those points, the upper body does the work. Chest, shoulders, triceps, back, and core are forced to coordinate under sustained tension.",
        "The result is unusual for bodyweight training: serious upper-body strength and muscle development, paired with substantial conditioning demand.",
        "Where the 6-count excels at building the engine, the Navy Seal builds the frame.",
        "For upper-body development, few bodyweight movements come close.",
      ],
      summary: "Navy Seals build armour.",
      video: {
        label: "YouTube Navy Seal Tutorial Video",
        youtubeId: "BqWQkblauo8",
        url: "https://www.youtube.com/watch?v=BqWQkblauo8",
      },
    },
  ],
  // accessory: {
  //   title: "Accessory Movements",
  //   intro: [
  //     "The Busy Dad Program is a minimalist program. Simplicity is one of the three principles of our training philosophy. But we do allow ourselves to choose from a very limited menu of accessory movements. These movements are to be used sparingly, as a device for breaking plateaus. Sometimes we need to iron out a weakness within one of the two Sacred Movements, and these accessory movements help us make targeted interventions. The key point to remember is that these movements are designed to serve our training for the Sacred Movements, not to compete with that training.",
  //     "The following accessory movements are kosher within BDP:",
  //   ],
  //   primaryList: ["Squats", "Mountain Climbers", "Push Ups"],
  //   burpeeIntro:
  //     "You'll notice that there are two burpee variations on the menu. I assume familiarity with squats, mountain climbers, and push ups, but let me briefly explain the burpee movements.",
  //   secondaryMovements: [
  //     {
  //       id: "four-count",
  //       tier: "secondary" as const,
  //       title: "The 4-Count Military Burpee",
  //       shortName: "4-Count",
  //       paragraphs: [
  //         "The 4-count burpee is the original burpee developed by pioneering sports scientist Dr Royal Burpee in the 1930s. Quite simply, it is a 6-count minus counts 3 and 4. The 6-count tutorial video also demos the 4-count, so take a look in case the previous sentence didn't make sense to you:",
  //       ],
  //       video: {
  //         label: "4-Count Tutorial (included in 6-Count video)",
  //         youtubeId: "eroWyZxZNlA",
  //         url: "https://www.youtube.com/watch?v=eroWyZxZNlA",
  //       },
  //     },
  //     {
  //       id: "five-pump-navy-seal",
  //       tier: "secondary" as const,
  //       title: "5-Pump Navy Seal",
  //       shortName: "5-Pump Navy Seal",
  //       paragraphs: [
  //         "The 5-pump Navy Seal, meanwhile, is a beefed-up version of the Navy Seal. It is considerably harder than the standard Navy Seal, and I find it a fairly effective device for building strength in the standard version of the movement. Please take a look at the tutorial video here.",
  //         "If the 5-pump is harder than the Navy Seal, why, you might ask, isn't it a Sacred Movement? The answer is that harder doesn't always mean more effective. The movement is so taxing on the upper body that I need to take longer rest periods between reps to continue performing the movement with proper form. These extended rest periods seriously restrict the amount of high-quality training volume I can pack into a 20-minute session. Navy Seals are easier than their 5-pump older brothers, which means that our bodies can afford much shorter rest periods between reps. As a result, we can accumulate more high-quality training volume across a 20-minute session using the Navy Seal than we can with the 5-pump Navy Seal.",
  //       ],
  //       video: {
  //         label: "YouTube 5-Pump Navy Seal Tutorial Video",
  //         youtubeId: "zeCGO_AwsAM",
  //         url: "https://www.youtube.com/watch?v=zeCGO_AwsAM",
  //       },
  //     },
  //   ],
  // },
} as const;
