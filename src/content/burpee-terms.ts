import { assetPath } from "@/lib/base-path";
import { levelsPage } from "@/content/levels";

/**
 * Definitional pages for the two Sacred Movements.
 *
 * These exist so that "what is a Navy Seal burpee" / "6-count burpee" have a
 * canonical, extractable answer on busydadtraining.com. Structure matters
 * more than length: a one-sentence definition first, then facts, steps,
 * benchmarks and FAQs, each under its own heading.
 */

export interface TermFact {
  label: string;
  value: string;
}

export interface TermStep {
  counts: string;
  name: string;
  text: string;
}

export interface TermBenchmark {
  level: string;
  target: string;
}

export interface TermPageData {
  id: "navy-seal" | "six-count";
  path: string;
  datePublished: string;
  dateModified: string;
  term: string;
  alternateNames: readonly string[];
  seo: { title: string; description: string; keywords: readonly string[] };
  hero: { eyebrow: string; title: string; backgroundImage: string };
  /** The one-sentence answer. Rendered first and marked data-speakable. */
  definition: string;
  /** Two or three sentences of context under the definition. */
  intro: readonly string[];
  facts: readonly TermFact[];
  howTo: { title: string; totalTimePerRep: string; steps: readonly TermStep[] };
  video: { youtubeId: string; url: string; title: string };
  builds: { title: string; paragraphs: readonly string[] };
  comparison: {
    title: string;
    intro: string;
    columns: readonly string[];
    rows: readonly { label: string; cells: readonly string[] }[];
  };
  benchmarks: { title: string; intro: string; items: readonly TermBenchmark[]; outro: string };
  mistakes: { title: string; items: readonly { label: string; description: string }[] };
  faqs: readonly { question: string; answer: string }[];
  related: readonly { label: string; href: string }[];
}

const allLevels = [
  ...levelsPage.level1.sublevels,
  ...levelsPage.level2.sublevels,
  ...levelsPage.level3.sublevels,
  ...levelsPage.level4.sublevels,
] as const;

function benchmarksFor(movement: "6-Count" | "Navy Seal"): TermBenchmark[] {
  const items: TermBenchmark[] = allLevels.map((level) => ({
    level: level.title,
    target: level.landmarks.find((l) => l.movement === movement)?.target ?? "",
  }));
  items.push({
    level: "Graduation",
    target: levelsPage.graduation.landmarks.find((l) => l.movement === movement)?.target ?? "",
  });
  return items;
}

const burpeeComparison = {
  title: "Navy Seal burpee vs 6-count burpee vs CrossFit burpee",
  intro:
    "Three movements share the name \"burpee\" and have very little else in common. The table shows what actually happens in each rep.",
  columns: ["Movement", "Counts", "Push-ups per rep", "Jump / clap", "Main training effect"],
  rows: [
    { label: "6-count military burpee", cells: ["6", "1", "No", "Legs, posterior chain, cardiovascular capacity"] },
    { label: "Navy Seal burpee", cells: ["10", "3 (with knee drives between)", "No", "Upper-body strength and mass, plus conditioning"] },
    { label: "CrossFit / gym-class burpee", cells: ["Not counted", "Chest-to-floor, often no full push-up", "Yes, with overhead clap", "Metabolic conditioning; form varies widely"] },
    { label: "Original Royal Burpee (1939)", cells: ["4", "0", "No", "A fitness test, not a training movement"] },
  ],
} as const;

export const navySealBurpeePage: TermPageData = {
  id: "navy-seal",
  path: "/navy-seal-burpee/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  term: "Navy Seal burpee",
  alternateNames: ["Navy SEAL burpee", "10-count burpee", "Navy Seal", "SEAL burpee", "10-count military burpee"],
  seo: {
    title: "What Is a Navy Seal Burpee? Definition, Counts, Muscles Worked and Benchmarks",
    description:
      "The Navy Seal burpee is a 10-count military burpee with three push-ups and two knee drives in the plank. Here is exactly how to do it, what it builds, how it differs from a 6-count and a CrossFit burpee, and how many you should be able to do in 20 minutes.",
    keywords: [
      "navy seal burpee",
      "navy seal burpees",
      "what is a navy seal burpee",
      "how to do a navy seal burpee",
      "navy seal burpee muscles worked",
      "10 count burpee",
      "navy seal burpee workout",
      "navy seal burpee vs burpee",
      "military burpee",
    ],
  },
  hero: {
    eyebrow: "Movement Guide",
    title: "What Is a Navy Seal Burpee?",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  definition:
    "A Navy Seal burpee is a 10-count variation of the American military burpee in which, after dropping to a plank, you perform three push-ups with a knee-to-elbow drive between each one, then jump your feet in and stand. It contains no jump and no clap.",
  intro: [
    "It is the more advanced of the two Sacred Movements in the Busy Dad Program, where it is trained for 40 minutes a week, and the one responsible for the programme's reputation for building upper-body strength without a single piece of equipment.",
    "Until recently the movement was almost unknown outside US military and prison training culture. It reached a wider audience through Max Edwards' follow-along Navy Seal burpee workouts on YouTube, which Men's Health and Yahoo have both covered.",
  ],
  facts: [
    { label: "Counts per rep", value: "10" },
    { label: "Push-ups per rep", value: "3, with a knee drive after the first and second" },
    { label: "Equipment", value: "None" },
    { label: "Primary muscles", value: "Chest, shoulders, triceps, lats, traps, scapular stabilisers, core" },
    { label: "Secondary", value: "Quads, glutes, hamstrings, calves; cardiovascular system" },
    { label: "Time per rep", value: "Roughly 8 seconds at a steady pace" },
    { label: "Difficulty", value: "Intermediate to advanced; 1 rep is Level 1A, 150 in 20 minutes is Graduation" },
    { label: "Weekly volume in BDP", value: "40 minutes (two 20-minute sessions)" },
  ],
  howTo: {
    title: "How to do a Navy Seal burpee, count by count",
    totalTimePerRep: "PT8S",
    steps: [
      {
        counts: "Counts 1–2",
        name: "Drop and kick back",
        text: "From standing, squat and place your hands flat on the floor about shoulder-width apart. Kick both feet back into a strong plank: straight line from head to heels, core braced.",
      },
      {
        counts: "Counts 3–8",
        name: "Three push-ups with knee drives",
        text: "Lower your chest to the floor and press back up to plank (push-up one). Drive your right knee to your right elbow and return it. Push-up two. Drive your left knee to your left elbow and return it. Push-up three. Call out every count; the calling out keeps the rhythm and the breathing honest.",
      },
      {
        counts: "Counts 9–10",
        name: "Jump in and stand",
        text: "Jump your feet back to your hands, then stand up tall. That is one repetition. There is no jump and no clap at the top; the next rep starts as soon as you are standing.",
      },
    ],
  },
  video: {
    youtubeId: "BqWQkblauo8",
    url: "https://www.youtube.com/watch?v=BqWQkblauo8",
    title: "Navy Seal burpee tutorial by Max Edwards",
  },
  builds: {
    title: "What the Navy Seal burpee builds",
    paragraphs: [
      "The Navy Seal burpee is unusual among bodyweight movements because it builds muscle. Three full push-ups per rep, performed under a raised heart rate and without rest between them, put a large amount of quality volume through the chest, shoulders and triceps. The knee drives load the core and hip flexors while the upper body holds a plank, which is what makes the lats, traps and scapular stabilisers work as hard as the pressing muscles.",
      "It is also a conditioning movement. A practitioner at Level 2A completes 80 Navy Seal burpees in 20 minutes, which is 240 push-ups and 160 knee drives at a sustained pace. In the Busy Dad Program the 6-count is described as the movement that builds the engine; the Navy Seal is the one that builds the frame.",
      "It does not condition the legs the way a 6-count does. That is why the programme pairs the two and never trains one alone.",
    ],
  },
  comparison: burpeeComparison,
  benchmarks: {
    title: "How many Navy Seal burpees should you be able to do in 20 minutes?",
    intro:
      "In the Busy Dad Program every level is unlocked by a Landmark Workout: as many Navy Seal burpees as you can complete in a strict 20-minute window, every count called out. These are the targets.",
    items: benchmarksFor("Navy Seal"),
    outro:
      "For context, 20 in 20 minutes (Level 1B) is a realistic first goal for most men who can already do a few push-ups. 100 in 20 minutes (Level 3A) is elite conditioning. Graduation, 150 in 20 minutes in the same week as 325 6-counts, has been reached by only a small number of practitioners.",
  },
  mistakes: {
    title: "Common mistakes",
    items: [
      { label: "Skipping the third push-up", description: "Under fatigue the last push-up quietly disappears. A rep is three push-ups; anything less is a different movement." },
      { label: "Half-depth push-ups", description: "Chest to the floor every time. Shortening the range to keep the count up is how people reach Level 2 numbers with Level 1 strength." },
      { label: "Sagging hips on the knee drive", description: "The drive is a plank movement. If the hips drop or pike, the core is no longer doing its job." },
      { label: "Adding a jump", description: "There is no jump. The movement is already long enough; a jump adds fatigue without adding training effect." },
      { label: "Not calling the counts", description: "Calling out all ten counts sets the tempo, forces you to breathe, and is the standard the programme's benchmarks are measured against." },
    ],
  },
  faqs: [
    {
      question: "What is a Navy Seal burpee?",
      answer:
        "A Navy Seal burpee is a 10-count military burpee: squat and kick back to a plank (counts 1–2), perform three push-ups with a knee-to-elbow drive after the first and second (counts 3–8), then jump your feet in and stand (counts 9–10). There is no jump or clap. It is one of the two movements in the Busy Dad Program.",
    },
    {
      question: "How many push-ups are in a Navy Seal burpee?",
      answer: "Three. Each is a full push-up, chest to the floor, and a knee drive separates the first from the second and the second from the third.",
    },
    {
      question: "What muscles does a Navy Seal burpee work?",
      answer:
        "Chest, shoulders and triceps from the three push-ups; lats, traps and the scapular stabilisers from holding and moving in the plank; the core and hip flexors from the knee drives; and the quads, glutes and hamstrings from the squat and stand. It also places a substantial demand on the cardiovascular system.",
    },
    {
      question: "Is a Navy Seal burpee harder than a regular burpee?",
      answer:
        "Yes. A gym-class burpee has one chest-to-floor movement and a jump; a Navy Seal burpee has three full push-ups and two knee drives per rep. It takes roughly twice as long per rep as a 6-count military burpee and is far more demanding on the upper body.",
    },
    {
      question: "How many Navy Seal burpees should I be able to do?",
      answer:
        "Measured in a 20-minute window, the Busy Dad Program's levels are: 1 (Level 1A), 20 (1B), 40 (1C), 60 (1D), 80 (2A), 90 (2B), 100 (3A), 110 (3B), 120 (4A), 135 (4B) and 150 for Graduation. Twenty in 20 minutes is a good first target.",
    },
    {
      question: "Why is it called a Navy Seal burpee?",
      answer:
        "The name comes from the movement's association with US military conditioning, where multi-push-up burpee variations are used because they need no equipment and train the whole body. It is a variation of the American military burpee, a lineage that runs back to the four-count exercise Royal H. Burpee devised in 1939 as a fitness test.",
    },
    {
      question: "Can I build muscle with Navy Seal burpees?",
      answer:
        "Yes. The movement delivers a high volume of full push-ups under fatigue, plus plank and knee-drive work for the back and core. Practitioners in the Busy Dad Program typically report the most visible changes in chest, shoulders and arms from Navy Seal training. Progression comes from increasing your 20-minute rep count over time, not from adding load.",
    },
    {
      question: "How often should I do Navy Seal burpees?",
      answer:
        "The Busy Dad Program trains the Navy Seal burpee for 40 minutes a week, usually two 20-minute sessions, alongside 40 minutes of 6-count burpees. That 80-minute weekly budget is fixed, and the intensity inside it is what produces results.",
    },
  ],
  related: [
    { label: "The 6-count burpee", href: "/6-count-burpee/" },
    { label: "The two Sacred Movements", href: "/movements/" },
    { label: "The four levels and Landmark Workouts", href: "/levels/" },
    { label: "Best burpee workout apps (2026)", href: "/best-burpee-workout-apps-2026/" },
  ],
};

export const sixCountBurpeePage: TermPageData = {
  id: "six-count",
  path: "/6-count-burpee/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  term: "6-count burpee",
  alternateNames: ["6-count military burpee", "six-count burpee", "6 count burpee", "military burpee", "six count"],
  seo: {
    title: "What Is a 6-Count Burpee? The Military Burpee Explained, Count by Count",
    description:
      "The 6-count burpee is the American military burpee: squat, kick back to plank, push-up down, push-up up, jump in, stand. No jump, no clap. How to do it, what it builds, how it compares to a CrossFit burpee, and the 20-minute benchmarks from 50 to 325 reps.",
    keywords: [
      "6 count burpee",
      "6-count burpee",
      "six count burpee",
      "military burpee",
      "6 count military burpee",
      "what is a 6 count burpee",
      "how to do a 6 count burpee",
      "6 count burpee muscles worked",
      "6 count burpee workout",
      "burpee without jump",
    ],
  },
  hero: {
    eyebrow: "Movement Guide",
    title: "What Is a 6-Count Burpee?",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  definition:
    "A 6-count burpee is the American military burpee counted in six parts: squat and place your hands down (1), kick your feet back to a plank (2), lower your chest to the floor (3), press back up (4), jump your feet in (5), and stand (6). There is no jump and no clap.",
  intro: [
    "It is the foundational movement of the Busy Dad Program, trained for 40 minutes every week at every level from 1A to Graduation, and the movement most practitioners use to build the conditioning that everything else rests on.",
    "Stripped of the jump, the clap and the flailing, the 6-count is a controlled full-body movement you can repeat hundreds of times with the same form. That repeatability is exactly what makes it useful as a training standard.",
  ],
  facts: [
    { label: "Counts per rep", value: "6" },
    { label: "Push-ups per rep", value: "1, chest to floor" },
    { label: "Equipment", value: "None" },
    { label: "Primary muscles", value: "Quads, glutes, hamstrings, calves, core" },
    { label: "Secondary", value: "Chest, shoulders, triceps; cardiovascular system" },
    { label: "Time per rep", value: "Roughly 4–5 seconds at a steady pace" },
    { label: "Difficulty", value: "Beginner-accessible; 50 in 20 minutes is Level 1B, 325 in 20 minutes is Graduation" },
    { label: "Weekly volume in BDP", value: "40 minutes (two 20-minute sessions)" },
  ],
  howTo: {
    title: "How to do a 6-count burpee, count by count",
    totalTimePerRep: "PT5S",
    steps: [
      {
        counts: "Counts 1–2",
        name: "Drop and kick back",
        text: "From standing, squat and place your hands flat on the floor (one). Kick both feet back into a plank, body in a straight line, core braced (two). The legs and posterior chain do the work here.",
      },
      {
        counts: "Counts 3–4",
        name: "The push-up",
        text: "Lower your chest to the floor (three) and press back up to a full plank (four). This is the upper body's turn: chest, shoulders and triceps.",
      },
      {
        counts: "Counts 5–6",
        name: "Jump in and stand",
        text: "Jump your feet back to your hands (five) and stand up tall (six). That is one rep. Call out the count; no jump, no clap, straight into the next rep.",
      },
    ],
  },
  video: {
    youtubeId: "eroWyZxZNlA",
    url: "https://www.youtube.com/watch?v=eroWyZxZNlA",
    title: "6-count burpee tutorial by Max Edwards",
  },
  builds: {
    title: "What the 6-count burpee builds",
    paragraphs: [
      "The 6-count's distinction is lower-body endurance and cardiovascular capacity. Two of its three phases are leg-driven, and at the volumes the programme asks for (200 reps in 20 minutes at Level 2A is 400 squats-to-plank-and-back plus 200 push-ups) it produces the kind of engine that most people associate with running or rowing, without leaving a two-metre patch of floor.",
      "It also builds full-body strength and a great deal of work capacity: the ability to keep producing quality reps when tired. Max Edwards reports his resting heart rate falling from about 70 to 45 beats per minute over 18 months of 6-count training. In the language of the programme, 6-counts build engines.",
      "What it does not do as well as its partner movement is build upper-body muscle. One push-up per rep is not enough pressing volume; that is what the Navy Seal burpee, with three, is for.",
    ],
  },
  comparison: burpeeComparison,
  benchmarks: {
    title: "How many 6-count burpees should you be able to do in 20 minutes?",
    intro:
      "Every level of the Busy Dad Program is unlocked by a Landmark Workout: as many 6-count burpees as you can complete in a strict 20-minute window, every count called out. These are the targets.",
    items: benchmarksFor("6-Count"),
    outro:
      "Fifty in 20 minutes (Level 1B) is a realistic first goal for a sedentary beginner within a few weeks. Two hundred in 20 minutes (Level 2A) is a line many professional athletes could not cross on their first attempt. Graduation is 325, in the same week as 150 Navy Seal burpees.",
  },
  mistakes: {
    title: "Common mistakes",
    items: [
      { label: "Adding a jump at the top", description: "The military burpee has no jump. It spends energy that should go into the next rep and it makes the count sloppy." },
      { label: "Worming the push-up", description: "Hips down first, then chest, is not a push-up. Chest to the floor and back up in a straight line, every rep." },
      { label: "Feet landing wide or short on count 5", description: "Jump the feet all the way back to the hands so you can stand cleanly. Landing short turns count 6 into a good-morning." },
      { label: "Going out too fast", description: "A 20-minute Landmark Workout is paced. Start at a rate you can hold for 20 minutes and let the count climb over months." },
      { label: "Silent reps", description: "Call out all six counts. It sets the rhythm, regulates breathing, and is the standard the benchmarks assume." },
    ],
  },
  faqs: [
    {
      question: "What is a 6-count burpee?",
      answer:
        "A 6-count burpee is the American military burpee counted in six parts: squat and hands down, kick back to plank, chest to the floor, press up, jump the feet in, stand. There is no jump or clap. It is one of the two Sacred Movements of the Busy Dad Program.",
    },
    {
      question: "What is the difference between a 6-count burpee and a regular burpee?",
      answer:
        "The gym-class or CrossFit burpee ends with a jump and an overhead clap and often skips the full push-up. The 6-count has a full chest-to-floor push-up, no jump, and a fixed count, which makes it repeatable for hundreds of reps with the same form. It is a training movement rather than a metabolic finisher.",
    },
    {
      question: "What muscles does a 6-count burpee work?",
      answer:
        "Quads, glutes, hamstrings and calves from the squat, kick-back, jump-in and stand; core throughout the plank phases; chest, shoulders and triceps from the push-up. Its main training effects are leg endurance and cardiovascular capacity.",
    },
    {
      question: "How many 6-count burpees should I be able to do in 20 minutes?",
      answer:
        "The Busy Dad Program's 20-minute benchmarks are: 1 (Level 1A), 50 (1B), 100 (1C), 150 (1D), 200 (2A), 225 (2B), 250 (3A), 260 (3B), 275 (4A), 300 (4B) and 325 for Graduation.",
    },
    {
      question: "Are 6-count burpees good for weight loss?",
      answer:
        "They are one of the most time-efficient conditioning movements available: whole-body, high heart rate, no equipment, and easy to sustain for 20 minutes. Combined with a sensible diet, four 20-minute sessions a week is enough vigorous activity to sit inside the WHO's recommended range.",
    },
    {
      question: "Who invented the 6-count burpee?",
      answer:
        "The original four-count burpee was devised by American physiologist Royal H. Burpee in 1939 as a fitness test. The US military added the push-up (counts 3 and 4) to turn it into a conditioning exercise, producing the 6-count. Max Edwards built the Busy Dad Program around the 6-count and the 10-count Navy Seal burpee.",
    },
    {
      question: "Is the 6-count burpee suitable for beginners?",
      answer:
        "Yes. It is the entry point of the Busy Dad Program: a single rep in 20 minutes qualifies you for Level 1A, and the first real milestone is 50 in 20 minutes. Because there is no jump, it is also easier on the knees and lower back than a gym-class burpee.",
    },
    {
      question: "What is a 4-count burpee?",
      answer:
        "The 4-count burpee is Royal Burpee's original: squat and hands down, kick back, jump in, stand, with no push-up. It is a 6-count minus counts 3 and 4. The Busy Dad Program treats it as an accessory movement, not a Sacred Movement.",
    },
  ],
  related: [
    { label: "The Navy Seal burpee", href: "/navy-seal-burpee/" },
    { label: "The two Sacred Movements", href: "/movements/" },
    { label: "The four levels and Landmark Workouts", href: "/levels/" },
    { label: "The 20-minute home workout for busy dads", href: "/20-minute-home-workout-for-busy-dads/" },
  ],
};

export const termPages = [navySealBurpeePage, sixCountBurpeePage] as const;
