export const personal = {
  name: "Raiyaan Khan",
  role: "Software Development Engineer",
  location: "Mumbai, India",
  email: "raiyaankhan.work@gmail.com",
  tagline: "Java SDE · Distributed Systems · 2 years building at scale",
  links: {
    linkedin: "https://www.linkedin.com/in/raiyaankhan",
    github: "https://github.com/raiyaankhan",
    leetcode: "https://leetcode.com/raiyaankhan",
    codeforces: "https://codeforces.com/profile/raiyaankhan",
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

export const resumePdf = "/resume.pdf";

export const skills = [
  "Java · Spring Boot · Kafka",
  "REST APIs · Microservices",
  "AWS · Docker · CI/CD · GitLab",
  "React Native · Flutter",
  "PostgreSQL · Query Optimization",
  "PAM · IAM · Active Directory",
];

export type SlideType =
  | "hero"
  | "project"
  | "philosophy"
  | "work"
  | "contact";

export interface Slide {
  id: string;
  type: SlideType;
  label?: string;
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
    id: "connector-automation",
    type: "project",
    label: "ARCON Techsolutions",
    title: "Connector Automation Tool",
    tag: "Java · Spring Boot · GitLab CI/CD",
    body: "Eliminated manual connector builds. 12 days → 3 days. 75% fewer dev hours.",
    image: "/images/connector.svg",
    imageAlt: "Connector automation diagram",
    accent: "right",
  },
  {
    id: "broscience",
    type: "project",
    label: "App Store",
    title: "BroScience",
    tag: "React Native · Firebase · Gen AI",
    body: "Solo-shipped a full-stack fitness app with progressive overload AI. 100+ workout templates.",
    image: "/images/broscience.svg",
    imageAlt: "BroScience app branding",
    accent: "right",
  },
  {
    id: "nirog",
    type: "project",
    label: "Smart India Hackathon Finalist",
    title: "Nirog",
    tag: "Flutter · Firebase · REST APIs",
    body: "Unified health records via Aarogya number. 60% faster emergency data retrieval.",
    image: "/images/nirog.svg",
    imageAlt: "Nirog health platform",
    accent: "right",
  },
  {
    id: "arcon",
    type: "project",
    label: "Production Systems",
    title: "ARCON Connectors",
    tag: "Java · Spring Boot · Kafka",
    body: "30+ connectors. 50,000+ daily requests. Zero SLA breaches.",
    image: "/images/arcon.svg",
    imageAlt: "ARCON connector network",
    accent: "right",
  },
  {
    id: "philosophy",
    type: "philosophy",
    label: "Philosophy",
    items: mantras,
    accent: "right",
  },
  {
    id: "work",
    type: "work",
    label: "Experience",
    title: "ARCON Techsolutions",
    items: [
      "SDE · Jul 2024 – Present — 30+ connectors, 50K+ daily requests",
      "API Automation: 12 days → 3 days delivery",
      "35% throughput via query optimization",
      "Kafka logging → 40% fewer incidents",
      "SDE Intern · Jan – Jul 2024 — City Union Bank",
      "5 CI apps for 1,000+ enterprise users",
    ],
    image: "/images/work.svg",
    imageAlt: "Work experience timeline",
    accent: "right",
  },
  {
    id: "contact",
    type: "contact",
    label: "Connect",
    title: "Connect",
    accent: "right",
  },
];

export const projects = slides.filter((s) => s.type === "project");

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

