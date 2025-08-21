import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Leul",
  lastName: "Tadesse",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Junior Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "leulteferi273@gmail.com",
  location: "Addis Ababa, Ethiopia",
  languages: ["English", "Amharic"],
};

const newsletter = {
  display: false,
  title: <>Subscribe</>,
  description: (<>I don't currently send a newsletter.</>),
};

const social = [
  { name: "GitHub", icon: "github", link: "https://github.com/cooleo273" },
  { name: "LinkedIn", icon: "linkedin", link: "https://linkedin.com/in/leul-tadesse-386bb3225" },
  { name: "Website", icon: "link", link: "https://leul-portfolio-273.vercel.app" },
  { name: "Email", icon: "email", link: `mailto:${person.email}` },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – ${person.role}`,
  description: `Portfolio of ${person.name}, ${person.role} from ${person.location}`,
  headline: <>Building full‑stack web applications and tools</>,
  featured: {
    display: false,
    title: <>Recent project</>,
    href: "/",
  },
  subline: (
    <>
      I'm {person.name}, a Junior Software Engineer focused on building full‑stack applications
      <br /> using TypeScript, Next.js, and PostgreSQL.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
    intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.name} is a results-driven Junior Software Engineer with a background in Electrical
        Engineering. Skilled in the MERN stack, TypeScript, PostgreSQL, and building end-to-end
        applications from concept to deployment.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Shega Media and Technologies",
        timeframe: "Nov 2024 – Present",
        role: "Software Developer",
        achievements: [
          <>
            Built an in-house survey collection platform with Next.js and Supabase that reduced
            feedback analysis time by ~40%.
          </>,
          <>
            Architected an internal profitability dashboard that improved forecast accuracy by
            over 15%.
          </>,
          <>
            Implemented an HR automation system using Microsoft Power Apps saving ~10 hours/week
            in manual entry.
          </>,
        ],
        images: [],
      },
      {
        company: "Nexus Replay",
        timeframe: "Jun 2024 – Sep 2024",
        role: "Lead Developer & Architect",
        achievements: [
          <>
            Architected and built the Nexus backtesting platform end-to-end, handling UI/UX,
            front-end and back-end engineering.
          </>,
        ],
        images: [],
      },
      {
        company: "Schimerol",
        timeframe: "Feb 2024 – May 2024",
        role: "Software Developer",
        achievements: [
          <>
            Led full product development and engineered a highly available backend with
            robust API endpoints.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Hawassa University",
        description: <>B.Sc. in Electrical Engineering (2020–2023). Transferred from Mekelle University (2018–2020).</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
    { title: "React", description: <>Building interactive UIs with React.</> },
    { title: "Next.js", description: <>Server-side rendering and full-stack apps with Next.js.</> },
    { title: "TypeScript", description: <>Type-safe JavaScript for scalable apps.</> },
    { title: "Node.js", description: <>Backend services and APIs.</> },
    { title: "PostgreSQL", description: <>Relational data modeling and queries.</> },
    { title: "MongoDB", description: <>NoSQL databases for flexible schemas.</> },
    { title: "Supabase", description: <>Realtime database and auth for Next.js apps.</> },
    { title: "Prisma", description: <>Type-safe ORM for Node.js.</> },
    { title: "MS Power Apps", description: <>Business automation tools.</> },
  ],
  },
};

// Replace technical skills with resume skills
const technical = {
  display: true,
  title: "Technical skills",
  skills: [
    { title: "React", description: <>Building interactive UIs with React.</> },
    { title: "Next.js", description: <>Server-side rendering and full-stack apps with Next.js.</> },
    { title: "TypeScript", description: <>Type-safe JavaScript for scalable apps.</> },
    { title: "Node.js", description: <>Backend services and APIs.</> },
    { title: "PostgreSQL", description: <>Relational data modeling and queries.</> },
    { title: "MongoDB", description: <>NoSQL databases for flexible schemas.</> },
    { title: "Supabase", description: <>Realtime database and auth for Next.js apps.</> },
    { title: "Prisma", description: <>Type-safe ORM for Node.js.</> },
    { title: "MS Power Apps", description: <>Business automation tools.</> },
  ],
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing",
  description: `Notes and tutorials by ${person.name}`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Software projects and case studies by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

// Personal projects from resume
const projects = [
  {
    slug: "full-stack-ecommerce",
    title: "Full-Stack E-Commerce Platform",
    description:
      "Developed a complete e-commerce application (MERN) with product catalogs, auth, shopping cart, and payment integration.",
    images: [],
    href: "/work/full-stack-ecommerce",
  },
];

export { person, social, newsletter, home, about, blog, work, gallery, projects, technical };
