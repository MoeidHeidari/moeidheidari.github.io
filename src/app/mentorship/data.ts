import reviews from "./reviews/reviews.json";

export type MentorshipStat = {
  label: string;
  value: string;
};

export type MentorshipAward = {
  title: string;
  period: string;
  detail: string;
};

export type MentorshipSession = {
  title: string;
  start: string;
  timezone: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type MentorReview = {
  author: string;
  profileUrl: string;
  avatar: string;
  role: string;
  rating: number;
  date: string;
  text: string;
};

export const mentorshipProfile = {
  name: "Moeid Heidari",
  role: "Cloud & infrastructure engineer at Volvo Cars",
  location: "Sweden",
  status: "Active mentor on ADPList",
  source: "https://adplist.org/mentors/moeid-heidari",
  profile: {
    overview: "Reviews 45 • Achievements 21 • Group sessions 1",
    focus: ["Back-end", "Full stack", "Development Operations"],
    industries: ["Tech", "Automotive", "Consulting"],
    languages: ["English", "Persian"],
  },
  about:
    "With 16+ years of software engineering experience, I mentor in Back-end, Full Stack, and Development Operations with a focus on cloud-native architecture, distributed systems, and scalable infrastructure.",
  topTopics: [
    "General mentorship",
    "Resume and portfolio review",
    "Design career path",
    "Cloud architecture",
    "Distributed systems",
    "Autoscaling strategy",
  ],
  socialLinks: [
    { label: "Website", href: "https://moeidheidari.com" },
    { label: "ADPList", href: "https://adplist.org/mentors/moeid-heidari" },
    { label: "LinkedIn", href: "https://linkedin.com/in/moeidheidari" },
    { label: "GitHub", href: "https://github.com/moeidheidari" },
  ] as SocialLink[],
  stats: [
    { label: "Total mentoring time", value: "10,710 mins" },
    { label: "Sessions completed", value: "337" },
    { label: "Average attendance", value: "91.08%" },
    { label: "Karma points", value: "686" },
  ] as MentorshipStat[],
  awards: [
    {
      title: "Top 10 in Back-end",
      period: "Oct 2025 - Dec 2025",
      detail: "Recognized among top ADPList mentors in Back-end.",
    },
    {
      title: "Clear Communicator",
      period: "Profile insight",
      detail: "100% of connections agree communication is a key strength.",
    },
  ] as MentorshipAward[],
  availableSessions: [
    {
      title: "Discussion around software career path and trends",
      start: "Mar 01, 2:00pm",
      timezone: "GMT +01:00",
      ctaLabel: "Check availability",
      ctaHref: "https://adplist.org/mentors/moeid-heidari",
    },
  ] as MentorshipSession[],
  reviews: reviews as MentorReview[],
};
