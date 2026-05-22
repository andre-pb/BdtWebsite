import { assetPath } from "@/lib/base-path";

export const movementsPage = {
  seo: {
    title: "The Two Sacred Movements",
    description:
      "Meet the 6-count military burpee and the Navy Seal burpee — the two Sacred Movements at the heart of BDP. Plus accessory movements for targeted plateau-breaking.",
  },
  hero: {
    eyebrow: "The Program",
    title: "The Two Sacred Movements",
    backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  },
  intro: {
    paragraphs: [
      "The two Sacred Movements of BDP are both variations of the American military burpee. Please note, the American military burpee has very little in common with the more familiar 'burpee' movement propounded by the CrossFit brand. Until very recently, the American military burpee was a niche movement largely confined to the military and to US prison culture. Role models such as Iron Wolf have brought these movements to a wider audience, and the world is a better place for it.",
      "Because, my friends, these movements are unbelievably effective. Effective enough to oil the wheels of the most formidable fighting force in human history. Effective enough to bring sanity and salvation to the convicts on death row. And I believe that BDP has discovered the two most effective variations.",
      "These are the Sacred Movements. Each is unbelievably powerful in isolation; combined, they inspire awe. I built BDP out of the conviction that these two movements yield all a person could need to build elite fitness and strength, and I have never looked back. Let's meet them.",
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
      title: "The 6-Count Military Burpee",
      shortName: "6-Count",
      paragraphs: [
        "The 6-count military burpee, or 6-count for short, is a six-part compound movement that recruits every major muscle group. The core is engaged throughout the movement (counts 1-6). The legs and posterior chain are working hard at the start and end of the movement (counts 1-2, 5-6). And in between the leg work, at the center of the movement (counts 3-4), the upper body is in the limelight. You'll get a better idea of what I'm talking about if you watch the brief tutorial video below.",
        "Your 6-count training will condition and strengthen your entire body, but where the 6-count really excels is in building leg strength and cardiovascular fitness. After 18 months of training 6-counts, my resting heart rate had dropped from 70 bpm to 45 bpm.",
      ],
      summary: "6-counts will get you strong and fit.",
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
      title: "The Navy Seal Burpee",
      shortName: "Navy Seal",
      paragraphs: [
        "The Navy Seal burpee, or Navy Seal for short, is the stuff of legend. There is dispute about where and how exactly it originated; but whoever invented this movement deserves a Nobel prize. No calisthenics movement builds upper body strength like this movement. None. It has genius, power, and magic in it.",
        "With 10 component parts, the Navy Seal is a more complex movement than the 6-count. As with the 6-count, the navy seal starts and finishes (counts 1-2, 9-10) with leg work. The upper-body magic happens between those counts. As you move through counts 3-8, your core, chest, shoulders, triceps, scapula, traps, and lats synergize with one another in a way that will shock your body and stimulate muscle growth. This brief tutorial video takes you through all ten counts of the movement:",
        "The Navy Seal is an effective device for building cardiovascular fitness, especially if you call out all ten counts of the movement, as we do in BDP. It doesn't condition the legs like the 6-count. But for building upper body strength and mass, no bodyweight movement on earth comes even remotely close.",
      ],
      summary: "Navy Seals will get you ripped.",
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
