import { burpeeStat } from "./site";

export const communityPage = {
  seo: {
    title: "Community — Busy Dad Training",
    description:
      "Join the Busy Dad Army — real stories from men using this home workout app, plus a live burpee leaderboard and accountability.",
  },
  hero: {
    eyebrow: "The Busy Dad Army",
    title: "You're not doing this alone.",
    description:
      "Dads around the world, same 80 minutes a week. Read their stories, then see who's putting in the work — live.",
  },
  stats: [
    {
      kind: "burpee" as const,
      label: burpeeStat.label,
    },
    {
      value: "80",
      suffix: " min",
      label: "per week. That's the whole commitment.",
    },
    {
      value: "4",
      suffix: "×",
      label: "20-minute sessions. Nothing more.",
    },
  ],
  stories: {
    eyebrow: "Real Stories",
    title: "In their own words.",
    description:
      "Long-form journeys from busy men and women who stopped overcomplicating fitness and started showing up.",
  },
  leaderboard: {
    eyebrow: "Live Rankings",
    title: "The Army Leaderboard",
    description: "Every rep counts. Here's who's putting in the work — updating live.",
  },
  cta: {
    eyebrow: "Join the Army",
    title: "Ready to put in the work?",
    description:
      "Download the app, log your first session, and join thousands of busy dads who get it.",
  },
} as const;

export type CommunityStory = {
  name: string;
  location: string;
  /** circle-flags code (ISO 3166-1 or subdivision, e.g. gb-eng). */
  countryCode: string;
  featured?: boolean;
  headline: string;
  body: string;
};

export const communityStories: CommunityStory[] = [
  {
    name: "Stephen",
    location: "Newcastle",
    countryCode: "gb-eng",
    featured: true,
    headline: "Fitness I never expected at this age.",
    body: `I started the BDP in September 2024 (still going strong) and it has revolutionized my relationship with training. I'm a male in early 40's, and while I've always maintained a certain degree of fitness, my problem was always consistency, but after being coached by Max for 18 months, and then continuing on my own with the BDP app, the program has given a level of fitness I could have never expected to have at this age.

I started at 84kg and now have a consistent weight of 76kg. My record for six counts is 220 and I'm pushing for level 3 by year end.

Is the program hard? Of course it is.. does it take mental strength? Of course it does… but ask yourself this simple question, "If something is easy, is it even worth doing??"`,
  },
  {
    name: "Mike",
    location: "Wales",
    countryCode: "gb-wls",
    featured: true,
    headline: "The program contributed to saving my life.",
    body: `I started the Busy Dad Program in September 2021. At the time, having never really had a commitment to exercise, I was 235 lbs and I tested in with 60 six counts and 32 navy seals with less than perfect form. Motivated by Max and watching his workouts, I improved my form and upped the numbers. Over the years, I have become leaner, lighter, fitter and more agile.

I had to have major surgery due to a chronic health condition in November 2023 and I feel I was able to bounce back quicker and with more vigor due to the 80-minute weekly commitment I had been following. BDP allowed me to stay fit and healthy over the years and through illness. I genuinely believe that the program contributed to saving my life and without it, I dread to think where I might be today.

Nearly 5 years later, I am 50 years old and with the help of Max, I am 160 lbs with PRs of 213 six counts and 105 navy seals with great form. I am the fittest I have been in my life.

I have so much more energy and continue to honor the 80 minute commitment, which offers so many rewards if you're willing to challenge yourself and join the busy dad army.`,
  },
  {
    name: "Conor",
    location: "Las Vegas",
    countryCode: "US",
    headline: "I've never looked forward to a workout so much — while being completely scared of it.",
    body: `I will be 47-years-old this coming summer. Last year, I decided to take a break from running to heal a foot injury that had been getting worse. I thought about all the activities I could do instead of running to get my heart pumping. And then I remembered burpees from my military days.

I started researching burpee training, and eventually I was blessed to find the Busy Dad program. For the first time, all of my questions were answered in one place. This program is a one-stop shop. I started the busy dad program then, and I've been doing it religiously ever since. I still can't believe you can get such a powerful workout by standing in one place. I am in awe at the end of every workout. And no matter how hard I push it, I feel great later in the day.

I've also never looked forward to a workout so much, while at the same time being completely scared of the workout. It is an amazing thing. And the best thing is, I can take it with me anywhere!

I can't recommend the busy dad program enough. It is truly amazing. And I plan to do this workout for many years to come.`,
  },
  {
    name: "Carsten",
    location: "Berlin",
    countryCode: "DE",
    headline: "I've never felt as fit in my life as I do now.",
    body: `I'm 54 years old and have been following Max Edwards' Busy Dad Program for 45 weeks. I was already in a good shape before, but the burpee training was a game-changer. I've never felt as fit in my life as I do now. My posture has improved, I'm more ripped than ever, my resting heart rate has gone down, and I feel like a powerhouse.

The training is tough, but also incredibly rewarding. And the fact that I occasionally get a respectful thumbs-up when I'm training in the park isn't too shabby either ;-)

The minor issues I had with my form at the beginning are now a thing of the past, thanks to Max's coaching. I'm really glad I found the Busy Dad Program. Thanks so much, Max!`,
  },
  {
    name: "Greg",
    location: "New Hampshire",
    countryCode: "US",
    headline: "My kids keep track of my workout progress with me.",
    body: `BDP has made a real and noticeable difference for me, both physically and mentally. Since starting the program, I've seen improvements in my physique, strength, energy, confidence, and overall health. My annual checkups with my doctor have also shown measurable progress in health markers that had previously been trending in the wrong direction.

My kids, who are six and nine, keep track of my workout progress and improvements with me, which has been really rewarding. That connection with my kids, and the feeling that I'm setting a good example for them, has been one of the more unexpected benefits of the program.

BDP meets you where you are. It's about showing up, trying to get a little better from one workout to the next, and letting those small wins build over time. In my experience, the strength, confidence, and discipline I've developed through the workouts have carried into other parts of my life. Show up, do the work, keep trying to improve, and you'll be surprised by how much momentum starts to build.`,
  },
  {
    name: "Scott",
    location: "England",
    countryCode: "gb-eng",
    headline: "More time to be a better dad.",
    body: `Busy Dad Training has greatly improved my life: I've got better focus, better routines and — most importantly — more time to be a better dad.

The advantage of this training program over others is its simplicity. It's designed for busy people, but what first drew me in was the focus on being a parent. Simply put, the practice has been life changing and I would recommend it to any busy parent struggling to balance work, home, and the gym.`,
  },
  {
    name: "Ollie",
    location: "New Hampshire",
    countryCode: "US",
    headline: "Try it for 2–3 weeks. Then reflect.",
    body: `The Busy Dad program has become the basis of my exercise routine and it is hard to imagine something else that could work better at keeping me fit than this. Busy Dad gets me to consistently do 4 pretty cardiovascularly-intensive workouts per week, without consuming much time or introducing significant barriers to entry.

If you are on the fence about committing to this burpee passion project, then I encourage you to try it for 2-3 weeks; you can probably find the time and the small space needed to fit this into your life for a few weeks and then, at the end of trial, just take some time to reflect on whether or not this produces intensive workouts for you and if it seems more or less sustainable than your other exercise plan(s).

If you find that a different effective exercise plan that works better for you then more power to you, but I bet most busy people will be mighty tempted to continue doing Busy Dad after such a trial.`,
  },
  {
    name: "Joe",
    location: "Glasgow",
    countryCode: "gb-sct",
    headline: "Years on end without missing a single session.",
    body: `For years, my training fell into a routine of being disciplined with gym session for one to two months, falling off the wagon and then getting back on in a seemingly never-ending cycle that didn't yield the results I wanted. Training burpees for 80 minutes a week, always 4 x 20 minute sessions, finally unlocked the ability for me to maintain my training discipline for years on end without missing a single session.

I worked with Max for 18 months to help me build and maintain my burpee practice and take it to levels I didn't think possible when starting out. Combine your sessions with a cold shower after and they will become the cornerstone of your disciplined life routine.`,
  },
  {
    name: "Alex",
    location: "South Africa",
    countryCode: "ZA",
    headline: "What appears simple opens doors you never knew existed.",
    body: `The Busy Dad Program has been my faithful companion for the past three years, and I can hardly begin to describe the ways in which it has changed my life. What appears to be a simple approach opens doors you never knew existed — whether physical, mental, or spiritual — and becomes a springboard from which every other aspect of your life can thrive. Give it a go!`,
  },
  {
    name: "Sam",
    location: "Norway",
    countryCode: "NO",
    headline: "One of the very few programmes I've followed for years.",
    body: `BDP changed my relationship with fitness. I discovered the programme while recovering from a hip injury and looking for a way to stay active without making it worse. What started as a simple workout became a sustainable system that I could stick to regardless of travel, work, or life circumstances.

The physical transformation was great, but the biggest benefits have been consistency, focus, and discipline. Through weekly coaching with Max, I've come to see fitness as part of a broader practice of living intentionally.

It's one of the very few programmes I've followed consistently for years, and I expect it will remain part of my life for many years to come.`,
  },
];
