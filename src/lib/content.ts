export const profile = {
  name: "Faiz Hashim",
  email: "faizhashim61@gmail.com",
  location: "Kuala Lumpur, Malaysia",
  linkedin: "https://www.linkedin.com/in/faiz-hashim-814055216/",
  portrait: "",
};

export const projects = [
  {
    id: "barbershop",
    number: "01",
    title: "Barbershop Commission System",
    heading: "barbershop",
    category: "money + staff",
    theme: "light",
    description: "Commission, salary and profit — in one place.",
    features: [
      "Secure staff log-ins",
      "PDF + Excel reports",
      "Editable shop branding",
    ],
    tools: "Next.js · React · TypeScript · Cloudflare",
    href: "https://barbershop-system.faizhashim61.workers.dev/login",
    action: "open project",
    image: "/images/barbershop-system.webp",
  },
  {
    id: "fzl-kitchen",
    number: "02",
    title: "FZL Kitchen",
    heading: "FZL Kitchen",
    category: "food + ordering",
    theme: "dark",
    description: "A food website that is easy for customers and staff.",
    features: [
      "WhatsApp + delivery links",
      "Menu updates without code",
      "Made for mobile",
    ],
    tools: "Next.js · React · Cloudflare",
    href: "https://fzlkitchen.pages.dev/",
    action: "visit site",
    image: "/images/fzl-kitchen.webp",
  },
  {
    id: "norisah-selera",
    number: "03",
    title: "Norisah Selera Desa",
    heading: "Norisah Selera Desa",
    category: "catering + menus",
    theme: "light",
    description: "A catering site with an easy-to-update menu.",
    features: [
      "Quick WhatsApp orders",
      "Delivery + location links",
      "Simple content updates",
    ],
    tools: "Next.js · React · Cloudflare",
    href: "https://norisahseleradesa.pages.dev/",
    action: "visit site",
    image: "/images/norisah-selera-desa.webp",
  },
] as const;

export const toolGroups = [
  { label: "build", tools: "Next.js · React · TypeScript" },
  { label: "manage", tools: "CMS · Cloudflare · GitHub" },
  { label: "AI", tools: "Codex · ChatGPT · Gemini · Playwright" },
  { label: "track", tools: "GA4 · Tag Manager · Stripe" },
];
