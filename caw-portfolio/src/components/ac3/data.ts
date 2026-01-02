
export type ProjectViewport = {
    title: string;
    specs: string[];
    linkHref?: string;
    imageSrc?: string;
    projectKey?: string;
};

export type ProjectData = {
    name: string;
    key: string;
    features: string[];
    viewport: ProjectViewport;
};

// Define all project data
export const PROJECT_DATA: ProjectData[] = [
    {
        name: "Affilixpress",
        key: "saas",
        features: ["Next.js/Vercel", "NextAuth (Authentication)", "Neon PostgreSQL", "AliExpressJs (Package)", "Telegram JS API", "Automated Message Sending"],
        viewport: {
            title: "REFERRAL BOT LOGIC FLOW",
            specs: ["Auth: Secure", "Referral Rate: High", "Infrastructure: Serverless"],
            linkHref: 'https://affilixpress.netlify.app'
        }
    },
    {
        name: "E-Learning Backend",
        key: "elearning",
        features: ["Expo (React Native)", "Cross-Platform (iOS/Android)", "Spring Framework (API)", "JWT Authentication", "Paginated Routes", "Docker/Heroku Hosting"],
        viewport: {
            title: "MOBILE APP UI/UX PREVIEW",
            specs: ["Deployment: Containerized", "API: RESTful", "Resource: Optimized"],
            imageSrc: "/e-learn-backend.jpg",
            projectKey: "e-learning"
        }
    },
    {
        name: "ProdigyKindergarten Digitization",
        key: "thesis",
        features: ["Next.js (Frontend)", "Spring Java Framework", "MySQL Database", "Spring Security", "Hibernate ORM", "Staff/Client Correlation"],
        viewport: {
            title: "FULL-STACK THESIS PROJECT",
            specs: ["Role: Full-Stack Dev", "Security: Implemented", "DB: Relational"],
            linkHref: 'https://prodigykindergarten.netlify.app'
        }
    },
    {
        name: "RL-DS Trades Bumper",
        key: "automation",
        features: ["Python Automation", "Playwright (Web Scraping)", "Tkinter/CustomTkinter (GUI)", "Discord Webhook API", "Automated Ad Posting", "Constant Refresh Mechanism"],
        viewport: {
            title: "PYTHON BOT/GUI FLOW",
            specs: ["Trades: Up-to-Date", "Data Fetch: Precise", "Interface: User-Friendly"],
            imageSrc: "/rl-ds-trades-bumper.jpg",
            projectKey: "rl-ds"
        }
    },
    {
        name: "Caw Labs",
        key: "caw-labs",
        features: [
            "HTML, CSS & JavaScript Fundamentals",
            "Advanced JavaScript Concepts",
            "React Framework Basics",
            "React Router & Single-Page Applications",
            "Web Development Tools Training",
            "React-Based Mini Project"
        ],
        viewport: {
            title: "COURSE & WORKSHOP REPOSITORY",
            specs: [
                "Course: Web Application Design (CAW)",
                "Instructor: Dr. CHEKATI A.",
                "Focus: Frontend & React Development"
            ],
            linkHref: "https://github.com/MounibCS/caw-labs/tree/main"
        }
    },
    {
        name: "Kanban Board",
        key: "kanban",
        features: ["React + Vite Implementation", "Drag & Drop (dnd-kit)", "Tailwind CSS Styling", "Column-based Organization", "Task Management System"],
        viewport: {
            title: "KANBAN TASK BOARD",
            specs: ["Stack: React/Vite", "State: Local/Dnd", "Deploy: Netlify"],
            linkHref: 'https://kanbanboardcaw.netlify.app/'
        }
    }
];
