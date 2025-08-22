export type Locale = 'en' | 'am';

type Translations = {
  home: {
    headline: string;
    subline: string;
    aboutCta: string;
    latestFromBlog: string;
  };
  nav: {
    home: string;
    about: string;
    work: string;
    blog: string;
    gallery: string;
  };
  blog: {
    backToPosts: string;
    onThisPage: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    sectionIntro: string;
    sectionWork: string;
    sectionStudies: string;
    sectionTechnical: string;
    role: string;
  introDescription: string;
  experiencesText: string[][]; // per experience, list items
  studiesDescription: string;
  };
  work: {
    metaTitle: string;
    metaDescription: string;
  backToProjects: string;
  readCaseStudy: string;
  viewProject: string;
  projectTranslations: Record<string, { title: string; summary: string }>;
  };
};

const en: Translations = {
  home: {
    headline: 'Building full‑stack web applications and tools',
    subline: "I'm {{name}}, a Software Engineer focused on Next.js, TypeScript, and PostgreSQL.",
    aboutCta: 'About – {{name}}',
    latestFromBlog: 'Latest from the blog',
  },
  nav: {
    home: 'Home',
    about: 'About',
    work: 'Work',
    blog: 'Blog',
    gallery: 'Gallery',
  },
  blog: {
    backToPosts: 'Posts',
    onThisPage: 'On this page',
  },
  about: {
    metaTitle: 'About – {{name}}',
    metaDescription: 'Meet {{name}}, Software Engineer from Addis Ababa, Ethiopia',
    sectionIntro: 'Introduction',
    sectionWork: 'Work Experience',
    sectionStudies: 'Studies',
    sectionTechnical: 'Technical skills',
    role: 'Software Engineer',
    introDescription:
      "{{name}} is a results-driven Junior Software Engineer with a background in Electrical Engineering. Skilled in the MERN stack, TypeScript, PostgreSQL, and building end-to-end applications from concept to deployment.",
    experiencesText: [
      [
        'Built an in-house survey collection platform with Next.js and Supabase that reduced feedback analysis time by ~40%.',
        'Architected an internal profitability dashboard that improved forecast accuracy by over 15%.',
        'Implemented an HR automation system using Microsoft Power Apps saving ~10 hours/week in manual entry.',
      ],
      [
        'Architected and built the Nexus backtesting platform end-to-end, handling UI/UX, front-end and back-end engineering.',
      ],
      [
        'Led full product development and engineered a highly available backend with robust API endpoints.',
      ],
    ],
    studiesDescription:
      'B.Sc. in Electrical Engineering (2020–2023) at Hawassa University. Transferred from Mekelle University (2018–2020).',
  },
  work: {
    metaTitle: 'Projects – {{name}}',
    metaDescription: 'Software projects and case studies by {{name}}',
    backToProjects: 'Projects',
  readCaseStudy: 'Read case study',
  viewProject: 'View project',
    projectTranslations: {
      'shega-insight': {
        title: 'Shega — Insight',
        summary:
          'A Next.js dashboard that surfaces insights about Ethiopian startups — funding deals, industries, investors, and trends.',
      },
      'shega-hr-automation': {
        title: 'Shega Media — HR Automation (Power Apps)',
        summary:
          'An HR automation system using Microsoft Power Apps to reduce manual entry and improve data consistency.',
      },
      'shega-profitability-dashboard': {
        title: 'Shega Media — Profitability Dashboard',
        summary:
          'An internal profitability dashboard centralizing financial data to improve forecasting and decision-making.',
      },
      'shega-survey-platform': {
        title: 'Shega Media — Survey Platform',
        summary:
          'A survey collection platform built with Next.js and Supabase to automate feedback collection and reporting.',
      },
      'nexus-backtesting-platform': {
        title: 'Nexus — Backtesting Platform',
        summary:
          'An end-to-end backtesting platform for traders with data ingestion, compute, and rich analytics.',
      },
      'schimerol-product': {
        title: 'Schimerol — Core Product',
        summary:
          "Led end-to-end development of Schimerol's primary software product, building a scalable backend and APIs.",
      },
      'full-stack-ecommerce': {
        title: 'Full-Stack E-Commerce Platform',
        summary:
          'A complete e-commerce platform (MERN) with product catalogs, auth, shopping cart, and payment integration.',
      },
    },
  },
};

const am: Translations = {
  home: {
    // Simple Amharic equivalents
    headline: 'ፉል ስታክ የድር መተግበሪያዎች እና መሳሪያዎችን እመርታለሁ',
    subline: 'እኔ {{name}} ነኝ፣ በ Next.js፣ TypeScript እና PostgreSQL ላይ የሚተኩር የሶፍትዌር ኢንጂነር ነኝ።',
    aboutCta: 'ስለ እኔ – {{name}}',
    latestFromBlog: 'ከብሎግ በቅርብ',
  },
  nav: {
    home: 'መነሻ',
    about: 'ስለ እኔ',
    work: 'ፕሮጀክቶች',
    blog: 'ብሎግ',
    gallery: 'ጋለሪ',
  },
  blog: {
    backToPosts: 'ፖስቶች',
    onThisPage: 'በዚህ ገጽ',
  },
  about: {
    metaTitle: 'ስለ እኔ – {{name}}',
    metaDescription: 'ከአዲስ አበባ ኢትዮጵያ የሶፍትዌር ኢንጂነር {{name}}ን ያግኙ',
    sectionIntro: 'መግቢያ',
    sectionWork: 'የስራ ልምድ',
    sectionStudies: 'ጥናት',
    sectionTechnical: 'ቴክኒካዊ ክህሎቶች',
    role: 'የሶፍትዌር ኢንጂነር',
    introDescription:
      '{{name}} የውጤት አተኩሮ ያለው የጂኒየር ሶፍትዌር ኢንጂነር ሲሆን የኤሌክትሪካል ኢንጂነሪንግ መደበኛ ትምህርት አለው። በ MERN ስታክ፣ TypeScript፣ PostgreSQL እና ከጀማሪ እስከ መተግበሪያ ድረስ ፕሮጀክቶችን ለመገንባት ችሎታ አለው።',
    experiencesText: [
      [
        'በ Next.js እና Supabase የተሠራ የምርመራ መድረክ ገነብቻለሁ ፣ የግብዓት ትንታኔን ጊዜ ~40% አሳንሶ።',
        'የትርፍ ትንታኔ ትክክለኝነትን በ15% በላይ ያሻሽለ የውስጥ የትርፍ ዳሽቦርድ አቀናብራለሁ።',
        'በ Microsoft Power Apps የ HR ሂደቶችን አውቶማቲክ አድርጌ በሳምንት ወደ 10 ሰዓት የሚገኙ የእጅ ስራዎችን ቀንሻለሁ።',
      ],
      [
        'Nexus የጀርባ ሙከራ መድረክን ከመሠረት ጀምሮ እስከ ጫፍ አቀናብረው አብጅቻለሁ፣ UI/UX እና ፊት/ጀርባ እንቅስቃሴን በሙሉ ተቆጣጣሪ ሆኜ።',
      ],
      [
        'ፕሮዳክቱን ከመጀመሪያ እስከ መጨረሻ መሪ ሆኜ አብጅቻለሁ እና ከፍተኛ የመገኘት አቅም ያለው ባክ-ኤንድ እና ጠንካራ የ API መግብዣዎች ገነብቻለሁ።',
      ],
    ],
    studiesDescription:
      'የኤሌክትሪካል ኢንጂነሪንግ B.Sc. (2020–2023) በሀዋሳ ዩኒቨርሲቲ። ከመቀሌ ዩኒቨርሲቲ (2018–2020) ተሸጋሪ ነበር።',
  },
  work: {
    metaTitle: 'ፕሮጀክቶች – {{name}}',
    metaDescription: 'በ {{name}} የተሰሩ የሶፍትዌር ፕሮጀክቶች እና ጉዳዮች',
    backToProjects: 'ፕሮጀክቶች',
  readCaseStudy: 'ጉዳዩን አንብብ',
  viewProject: 'ፕሮጀክቱን ተመልከት',
    projectTranslations: {
      'shega-insight': {
        title: 'Shega — ኢንሳይት',
        summary:
          'በኢትዮጵያ የስታርትአፕ ገቢ ፣ ምክንያቶች፣ ኢንዱስትሪዎች እና ኢንቬስተሮች ትስስር መረጃዎችን የሚያቀርብ የ Next.js ዳሽቦርድ።',
      },
      'shega-hr-automation': {
        title: 'Shega ሚድያ — HR አውቶማቲክ (Power Apps)',
        summary:
          'የ HR ስራዎችን ለማቀናበር እና የእጅ ግብዓትን ለመቀነስ በ Microsoft Power Apps የተዘጋጀ ስርዓት።',
      },
      'shega-profitability-dashboard': {
        title: 'Shega ሚድያ — የትርፍ ዳሽቦርድ',
        summary:
          'የፋይናንስ መረጃን ለማካተት እና የትንታኔ ትክክለኝነትን ለማሻሻል የውስጥ ዳሽቦርድ።',
      },
      'shega-survey-platform': {
        title: 'Shega ሚድያ — የምርመራ መድረክ',
        summary:
          'የግብዓት መሰብሰብ እና ሪፖርት ሂደትን ለማዳበር በ Next.js እና Supabase የተገነባ መድረክ።',
      },
      'nexus-backtesting-platform': {
        title: 'Nexus — የጀርባ ሙከራ መድረክ',
        summary:
          'ለነጋዴዎች ውስብስብ መረጃ ግብዓት እና ንቁ ትንታኔዎች የሚያቀርብ መጀመሪያ እስከ መጨረሻ መድረክ።',
      },
      'schimerol-product': {
        title: 'Schimerol — ዋና ምርት',
        summary:
          'ለ Schimerol ዋና ምርት የሚመች ከፍተኛ የመገኘት አቅም ያለው ባክ-ኤንድ እና API ገነባሁ።',
      },
      'full-stack-ecommerce': {
        title: 'ፉል-ስታክ የኢ-ኮሜርስ መድረክ',
        summary:
          'የምርት መዝገብ፣ መግቢያ/መውጫ፣ ሸማች ጋርት እና ክፍያ መቀበያ የያዘ ፕላትፎርም (MERN)።',
      },
    },
  },
};

export function loadTranslations(locale: Locale): Translations {
  return locale === 'am' ? am : en;
}
 
