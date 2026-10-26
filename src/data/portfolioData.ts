import type { ProjectItem, SkillCategory, EducationItem, CertificationItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "SOHAM",
  fullName: "SOHAM VIJAY GURAV",
  email: "guravsoham8855@gmail.com",
  phone: "(+91) 90606 05029",
  phoneRaw: "+919060605029",
  location: "Ashta / Sangli, Maharashtra, India",
  institution: "Annasaheb Dange College of Engineering & Technology, Ashta",
  status: "Final-year Computer Science Engineering Student",
  degree: "B-Tech in Computer Science (IoT, Cyber Security & Blockchain)",
  cgpa: "7.3 / 10.0",
  graduation: "May 2027",
  tagline: "Software Development · Artificial Intelligence & Machine Learning · Blockchain & RPA",
  professionalSummary: "Final-year Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. Demonstrates foundational proficiency in UI Path (RPA) design, Python, and web application development. Proven ability to contribute to full-stack systems and deliver functional solutions in collaborative, time-constrained environments such as academic projects and competitive hackathons.",
  stats: [
    { label: "Academic CGPA", value: "7.3 / 10" },
    { label: "Graduation Year", value: "May 2027" },
    { label: "Core Academic Projects", value: "2+" },
    { label: "Core Tech Domains", value: "5" }
  ]
};

export const AREAS_OF_INTEREST = [
  {
    title: "Web Development & UI Design",
    description: "Building responsive, modern, and human-centric user interfaces using modern web technologies.",
    icon: "Layout"
  },
  {
    title: "RPA & Process Automation (UiPath)",
    description: "Designing intelligent workflows, automating repetitive business operations, and building resilient bots.",
    icon: "Bot"
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    description: "Exploring algorithmic models, automated data intelligence, and smart decision systems.",
    icon: "Cpu"
  },
  {
    title: "IoT Solutions",
    description: "Interfacing physical sensor ecosystems with embedded networks, telemetry, and secure cloud pipelines.",
    icon: "Radio"
  },
  {
    title: "Blockchain & Decentralized Applications",
    description: "Engineering tamper-proof smart contracts, decentralized consensus models, and Web3 architectures.",
    icon: "Blocks"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "RPA & Automation",
    icon: "Bot",
    skills: [
      { name: "UiPath Studio", level: "Intermediate", description: "Design canvas, activity libraries, orchestrator basics" },
      { name: "Process Automation", level: "Intermediate", description: "End-to-end task automation and business logic execution" },
      { name: "Workflow Design", level: "Proficient", description: "State machine, flowchart, and sequence workflows" },
      { name: "Bot Development", level: "Intermediate", description: "Robotic process bot creation, error handling & logging" }
    ]
  },
  {
    title: "Programming Languages",
    icon: "Code",
    skills: [
      { name: "Python", level: "Fundamentals", description: "Data structures, automation scripts, database connectivity" },
      { name: "Java", level: "Fundamentals", description: "Object-oriented programming principles and algorithms" },
      { name: "JavaScript", level: "Basic", description: "DOM manipulation, asynchronous operations, interactive UI" }
    ]
  },
  {
    title: "Web Development",
    icon: "Globe",
    skills: [
      { name: "HTML5", level: "Proficient", description: "Semantic markup, accessibility, modern standards" },
      { name: "CSS3", level: "Proficient", description: "Flexbox, CSS Grid, animations, responsive design" },
      { name: "JavaScript", level: "Basic", description: "Client-side interactivity and event handling" },
      { name: "Responsive Design", level: "Proficient", description: "Mobile-first layouts across all screen resolutions" },
      { name: "Basic React.js", level: "Basic", description: "Component-driven architecture, state and props" }
    ]
  },
  {
    title: "Blockchain & Web3",
    icon: "ShieldCheck",
    skills: [
      { name: "Solidity", level: "Fundamentals", description: "Smart contract development, state variables, modifiers" },
      { name: "DApp Concepts", level: "Fundamentals", description: "Decentralized architecture, consensus, RPC nodes" },
      { name: "Ethereum", level: "Fundamentals", description: "EVM mechanics, gas estimation, testnets" },
      { name: "Smart Contracts", level: "Fundamentals", description: "Immutable business logic and cryptographic verification" },
      { name: "Hardhat & Web3.js", level: "Academic", description: "Smart contract deployment & frontend integration" }
    ]
  },
  {
    title: "Developer Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: "Proficient", description: "Version control, branching, repository management" },
      { name: "GitHub", level: "Proficient", description: "Remote repository collaboration and commits" },
      { name: "VS Code", level: "Proficient", description: "Primary IDE, extensions, debugging setup" },
      { name: "UiPath", level: "Intermediate", description: "RPA workspace, package management and testing" }
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "inventory-management",
    title: "Inventory Management System",
    category: "Automation & Database Systems",
    technologies: ["Python", "Database Management", "Automation", "Workflow Scripting"],
    shortDescription: "A comprehensive inventory tracking platform engineered to manage stock levels, product metadata, and order records with automated reorder alerting.",
    fullDescription: "Developed a comprehensive inventory tracking platform designed to eliminate stockout risks, track order history, and automate low-stock notifications. The solution incorporates reliable data entry pipelines and reporting workflows that drastically reduced manual human errors and accelerated warehouse decision making.",
    highlights: [
      "Developed a comprehensive inventory tracking platform to manage stock levels, product data, and order records.",
      "Automated low-stock and reorder alerts to minimize manual monitoring overhead and prevent critical supply shortages.",
      "Implemented data entry and reporting workflows that improved operational accuracy and reduced human error in record management.",
      "Streamlined day-to-day inventory operations with structured database queries and clear visual status indicators."
    ],
    architecture: {
      components: [
        "Product & Stock Catalog Store",
        "Threshold Monitoring Engine",
        "Automated Reorder Alert Dispatcher",
        "Operational Data Entry & Audit Reporting Layer"
      ],
      workflow: [
        "Record product entry and intake transactions into database",
        "Continuous evaluation of stock threshold vs minimum safe levels",
        "Instant trigger of low-stock and reorder notification when breached",
        "Generate daily and weekly operational reconciliations for auditability"
      ]
    },
    metrics: [
      { label: "Operation Overhead", value: "-65% Manual Effort" },
      { label: "Stockout Prevention", value: "Automated Alerts" },
      { label: "Data Accuracy", value: "High Precision" }
    ],
    featured: true,
    accentColor: "#0284c7"
  },
  {
    id: "swaraajya-voting",
    title: "Swaraajya — Blockchain-Based E-Voting System",
    category: "Blockchain & Decentralized Security",
    technologies: ["Solidity", "Hardhat", "React.js", "Ethereum", "Web3.js", "Smart Contracts"],
    shortDescription: "A decentralized, tamper-proof electronic voting platform (Swaraajya-Voting) where ballots are minted as immutable Ethereum blockchain transactions with cryptographic voter authentication.",
    fullDescription: "Architected and developed 'Swaraajya-Voting', a high-integrity decentralized voting platform engineered to eliminate election tampering, duplicate submissions, and central points of failure. Powered by Solidity smart contracts compiled and tested using Hardhat, and connected to a responsive React.js frontend through Web3.js, Swaraajya guarantees complete election auditability while cryptographically safeguarding voter anonymity.",
    highlights: [
      "Built 'Swaraajya-Voting', a tamper-proof decentralized voting platform where every vote is recorded as an immutable blockchain transaction.",
      "Eliminated unauthorized ballot manipulation and single points of failure by distributing ledger state across decentralized Ethereum nodes.",
      "Engineered cryptographic voter authentication with single-vote constraint enforcement to prevent duplicate submissions and double-voting.",
      "Preserved strict voter anonymity and cryptographic privacy while delivering transparent, real-time auditability of election tallies.",
      "Integrated React.js user interface with Web3.js / MetaMask RPC provider for seamless and secure ballot-casting."
    ],
    architecture: {
      components: [
        "Swaraajya Ballot & Candidate Registry Smart Contracts (Solidity)",
        "Cryptographic Voter Hash Verifier (Double-Voting Prevention)",
        "Web3.js RPC Bridge & Ethereum Provider",
        "React.js Sovereign Voter Portal & Real-Time Audit Dashboard"
      ],
      workflow: [
        "Voter verifies eligibility through cryptographic identity hash authorization",
        "Selected candidate ballot signed and broadcast as an EVM transaction",
        "Swaraajya smart contract validates constraints and writes immutable block receipt",
        "Decentralized ledger aggregates tallies with real-time zero-tampering public auditability"
      ]
    },
    metrics: [
      { label: "Data Immutability", value: "100% Tamper-Proof" },
      { label: "Consensus Model", value: "Decentralized (EVM)" },
      { label: "Voter Anonymity", value: "Cryptographically Sealed" }
    ],
    featured: true,
    githubUrl: "https://github.com/guravsoham8855/Swaraajya-Voting",
    accentColor: "#38bdf8"
  }
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    degree: "B-Tech – Computer Science (IoT, Cyber Security & Blockchain)",
    institution: "Annasaheb Dange College of Engineering & Technology, Ashta",
    field: "Specialization: IoT, Cyber Security & Blockchain Technology",
    period: "2023 – May 2027",
    score: "7.3 / 10.0",
    scoreType: "CGPA",
    isCurrent: true,
    details: [
      "Specialized in Internet of Things (IoT), Network Security, Cryptography, and Distributed Ledger Technology.",
      "Active participant in competitive hackathons, collaborative technical seminars, and university engineering symposiums.",
      "Hands-on lab work covering smart contract architecture, network security analysis, and RPA bot development."
    ]
  },
  {
    degree: "HSC (XII) – Science",
    institution: "Ligade Patil Jr College of Science",
    period: "2023",
    score: "68%",
    scoreType: "Percentage",
    details: [
      "Focused on Physics, Chemistry, Mathematics, and Computer Science fundamentals.",
      "Built solid quantitative analytical foundations and logical reasoning skills."
    ]
  },
  {
    degree: "SSC (X)",
    institution: "Yashwantrao Chavan Vidyalay Yashwanagar",
    period: "2021",
    score: "67%",
    scoreType: "Percentage",
    details: [
      "Secondary school education focusing on Mathematics, Science, and English language communication."
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "Software Technologies Certification",
    issuer: "ECS Software Technologies PVT LTD",
    year: "2025",
    description: "Professional industry training and technical certification covering software engineering foundations, systems workflow, and practical programming best practices.",
    skillsCovered: [
      "Software Development Fundamentals",
      "Industry Workflow Standards",
      "Process Architecture",
      "Collaborative Code Quality"
    ]
  }
];
