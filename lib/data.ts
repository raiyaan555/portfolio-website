export const siteUrl = "https://raiyaan555.github.io/portfolio-website";

export const personal = {
  name: "Raiyaan Khan",
  role: "Software Development Engineer",
  location: "Mumbai, India",
  email: "raiyaankhan.work@gmail.com",
  tagline: "Java SDE · Distributed Systems · 2 years building at scale",
  website: siteUrl,
  links: {
    linkedin: "https://www.linkedin.com/in/raiyaankhan",
    github: "https://github.com/raiyaan555",
    leetcode: "https://leetcode.com/u/raiyaanx/",
    codeforces: "https://codeforces.com/profile/raiyaanx",
  },
};

export const heroText =
  "Raiyaan Khan is a Mumbai based Software Development Engineer building scalable distributed systems, REST APIs, and identity management platforms.";

export const heroWords = heroText.split(" ");

export const mantras = [
  "Make it fast.",
  "Make it scalable.",
  "Make it observable.",
  "Deliver with ownership.",
  "Go deep on root causes.",
  "Ship fearlessly.",
  "Make it.",
];

export const achievements = [
  "LeetCode 1800+ · 700+ DSA problems solved",
  "Smart India Hackathon Finalist",
  "3rd Place, AGAM Hackathon",
  "International medalist, World Scholar's Cup (Public Speaking)",
  "Hacktoberfest contributor",
];

export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  school: "SRM Institute of Science and Technology",
  period: "2020–2024",
  cgpa: "9.14/10",
};

export const resumePdf = "/resume/Raiyaan_Khan_SDE_CV.pdf";

export const skills = [
  "Java · Spring Boot · Kafka",
  "REST APIs · Microservices",
  "AWS · Docker · CI/CD · GitLab",
  "React Native · Flutter",
  "PostgreSQL · Query Optimization",
  "PAM · IAM · Active Directory",
];

export interface Project {
  id: string;
  title: string;
  tag: string;
  body: string;
  highlights: string[];
  image?: string;
}

export const liveProjects: Project[] = [
  {
    id: "broscience",
    title: "BroScience",
    tag: "React Native · Expo · Firebase",
    body: "A fitness tracking application built around evidence-based strength training principles. The app helps users build structured workout programs, track every set, monitor progression, and stay consistent through intelligent training analytics.",
    highlights: [
      "Personalized workout planning and logging",
      "Progressive overload tracking with workout history",
      "Personal records and training analytics",
      "Firebase Authentication & Firestore backend",
      "Clean, responsive mobile experience built with React Native",
    ],
    image: "/images/broscience.svg",
  },
  {
    id: "pigcasso",
    title: "Pigcasso",
    tag: "React Native · Xcode · iOS",
    body: "A screen-time reduction app that helps users break phone addiction by making device usage more mindful, intentional, and rewarding. Instead of simply blocking apps, Pigcasso encourages healthier digital habits through focused interactions and positive reinforcement.",
    highlights: [
      "Mindful screen-time tracking",
      "Daily usage insights and progress monitoring",
      "Habit-building and focus-driven experience",
      "Native iOS optimization using Xcode",
      "Built with React Native for a smooth cross-platform experience",
    ],
  },
  {
    id: "connector-automation",
    title: "Connector Automation",
    tag: "Java · Spring Boot · GitLab CI/CD",
    body: "An internal developer platform that automates the creation of enterprise identity connectors from configuration, eliminating repetitive boilerplate code and significantly accelerating delivery.",
    highlights: [
      "Reduced connector delivery time from 12 days to 3 days",
      "Cut development effort by approximately 75%",
      "Automated connector generation and validation",
      "Standardized project templates",
      "Integrated with internal CI/CD workflows",
    ],
    image: "/images/connector.svg",
  },
  {
    id: "nirog",
    title: "Nirog",
    tag: "Flutter · Firebase · Smart India Hackathon Finalist",
    body: "A unified digital healthcare platform that enables secure storage and instant retrieval of patient medical records, improving accessibility during emergencies and routine healthcare visits.",
    highlights: [
      "Smart India Hackathon Finalist",
      "Centralized digital health records",
      "Emergency medical information access",
      "Appointment and prescription management",
      "Firebase-powered cloud synchronization",
    ],
    image: "/images/nirog.svg",
  },
  {
    id: "arcon",
    title: "ARCON Connectors",
    tag: "Java · Spring Boot · REST APIs · Oracle · Kafka",
    body: "Designed and developed enterprise provisioning connectors for identity and privileged access management, integrating enterprise applications with secure user lifecycle automation.",
    highlights: [
      "Built 30+ production-ready connectors",
      "Automated user provisioning and deprovisioning",
      "REST API and database integrations",
      "Supported 50K+ daily provisioning requests",
      "Maintained zero SLA breaches across production deployments",
    ],
    image: "/images/arcon.svg",
  },
  {
    id: "namazi-pro",
    title: "Namazi Pro",
    tag: "Flutter · Firebase",
    body: "A modern Islamic companion app that helps Muslims stay connected with their daily prayers through accurate prayer timings, Adhan reminders, and essential Islamic utilities in a clean, distraction-free interface.",
    highlights: [
      "Accurate prayer times based on location",
      "Customizable Adhan notifications",
      "Qibla direction support",
      "Daily duas and Islamic reminders",
      "Offline-friendly mobile experience",
    ],
  },
];

export type SlideType =
  | "hero"
  | "philosophy"
  | "contact"
  | "live-projects"
  | "resume"
  | "work";

export interface Slide {
  id: string;
  type: SlideType;
  label?: string;
  href?: string;
  title?: string;
  body?: string;
  tag?: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
  accent?: "left" | "right" | "center";
}

export const slides: Slide[] = [
  {
    id: "hero",
    type: "hero",
    body: heroText,
    accent: "right",
  },
  {
    id: "live-projects",
    type: "live-projects",
    label: "Live Projects",
    href: "/projects",
    accent: "right",
  },
  {
    id: "work",
    type: "work",
    label: "Work",
    href: "/work",
    title: "ARCON Techsolutions",
    accent: "right",
  },
  {
    id: "resume",
    type: "resume",
    label: "Resume",
    href: "/resume",
    accent: "right",
  },
  {
    id: "contact",
    type: "contact",
    label: "Connect",
    accent: "right",
  },
  {
    id: "philosophy",
    type: "philosophy",
    label: "Philosophy",
    items: mantras,
    accent: "right",
  },
];

export const projects = liveProjects;

export const experience = [
  {
    company: "ARCON Techsolutions",
    role: "SDE",
    period: "Jul 2024 – Present",
    highlights: [
      "30+ production connectors, 50K+ daily requests, zero SLA breaches",
      "API Automation Tool: 12 days → 3 days delivery",
      "35% throughput improvement via query optimization",
      "Kafka-based centralized logging → 40% fewer production incidents",
      "Containerized on AWS with CI/CD → 3× faster deployments",
    ],
  },
  {
    company: "ARCON Techsolutions",
    role: "SDE Intern",
    period: "Jan – Jul 2024",
    highlights: [
      "On-site at City Union Bank: 5 end-to-end CI apps for 1,000+ enterprise users",
      "8+ production REST APIs; PAM, IAM, Active Directory",
      "Contributed across 10+ Agile sprints",
    ],
  },
];
