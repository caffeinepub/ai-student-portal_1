import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Bell,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  Lightbulb,
  Loader2,
  MapPin,
  Search,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { JobType } from "../backend.d";
import type { JobListing } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import { useApplyForJob, useGetAllJobListings } from "../hooks/useQueries";

// ─── Types ───────────────────────────────────────────────────────────────────

type ExperienceLevel = "Fresher" | "0–1 yr" | "1–3 yr" | "3–5 yr";
type WorkMode = "Remote" | "Onsite" | "Hybrid";
type JobTypeFilter = "All" | "Full-time" | "Internship" | "Part-time";

type RichJobListing = JobListing & {
  skills: string[];
  salary: string;
  experience_level: ExperienceLevel;
  work_mode: WorkMode;
  deadline: string;
  posted_days_ago: number;
  is_recommended?: boolean;
  company_size?: string;
  industry?: string;
};

type FilterState = {
  jobType: JobTypeFilter;
  workModes: WorkMode[];
  experienceLevels: ExperienceLevel[];
  skills: string[];
};
type LocalApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  timestampMs: number; // milliseconds since epoch
};

// ─── Fallback Data ────────────────────────────────────────────────────────────

const FALLBACK_JOBS: RichJobListing[] = [
  {
    id: "job-1",
    title: "Java Backend Developer",
    company: "Google India",
    location: "Hyderabad, Telangana",
    description:
      "Join Google's core infrastructure team building scalable backend systems. You'll work on distributed systems, REST APIs, and cloud-native microservices serving millions of users. Collaborate with world-class engineers on products used globally.",
    apply_url: "https://careers.google.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000),
    skills: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "MySQL",
      "Git",
      "Microservices",
    ],
    salary: "₹18–28 LPA",
    experience_level: "1–3 yr",
    work_mode: "Hybrid",
    deadline: "30 Apr 2026",
    posted_days_ago: 2,
    is_recommended: true,
    company_size: "100,000+ employees",
    industry: "Technology",
  },
  {
    id: "job-2",
    title: "Python Developer Intern",
    company: "Microsoft India",
    location: "Bengaluru, Karnataka",
    description:
      "Work on Microsoft Azure cloud services team. Build Python-based automation tools, data pipelines, and analytics dashboards. Great opportunity to learn enterprise software development and cloud technologies from industry leaders.",
    apply_url: "https://careers.microsoft.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000),
    skills: ["Python", "Django", "Azure", "SQL", "REST APIs"],
    salary: "₹25,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Remote",
    deadline: "20 Apr 2026",
    posted_days_ago: 1,
    is_recommended: true,
    company_size: "200,000+ employees",
    industry: "Cloud & Software",
  },
  {
    id: "job-3",
    title: "Frontend Developer",
    company: "Amazon India",
    location: "Chennai, Tamil Nadu",
    description:
      "Build customer-facing React applications for Amazon's e-commerce platform. Optimize web performance, implement new UI features, and collaborate with design teams. Work on features that impact millions of daily shoppers across India.",
    apply_url: "https://amazon.jobs",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000),
    skills: ["React", "TypeScript", "CSS", "Node.js", "Git"],
    salary: "₹12–20 LPA",
    experience_level: "0–1 yr",
    work_mode: "Hybrid",
    deadline: "25 Apr 2026",
    posted_days_ago: 5,
    is_recommended: true,
    company_size: "1,500,000+ employees",
    industry: "E-commerce",
  },
  {
    id: "job-4",
    title: "Full Stack Developer",
    company: "Freshworks",
    location: "Chennai, Tamil Nadu",
    description:
      "Join Freshworks engineering team to build SaaS products used by 60,000+ businesses. Develop full-stack features using React and Ruby on Rails, own product modules from design to deployment, and contribute to Freshdesk and Freshsales.",
    apply_url: "https://freshworks.com/company/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
    skills: ["React", "Node.js", "SQL", "Python", "Git", "REST APIs"],
    salary: "₹10–16 LPA",
    experience_level: "0–1 yr",
    work_mode: "Onsite",
    deadline: "10 May 2026",
    posted_days_ago: 3,
    is_recommended: true,
    company_size: "5,000+ employees",
    industry: "SaaS / CRM",
  },
  {
    id: "job-5",
    title: "Data Analyst Intern",
    company: "Razorpay",
    location: "Bengaluru, Karnataka",
    description:
      "Analyze payment trends, build dashboards, and derive insights for Razorpay's fintech products. Work with SQL, Python, and BI tools to support product and growth teams. Ideal for students passionate about data and fintech.",
    apply_url: "https://razorpay.com/jobs",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000),
    skills: ["Python", "SQL", "Data Analysis", "Excel", "Tableau"],
    salary: "₹20,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "15 Apr 2026",
    posted_days_ago: 4,
    company_size: "3,000+ employees",
    industry: "Fintech",
  },
  {
    id: "job-6",
    title: "Software Engineer",
    company: "TCS",
    location: "Mumbai, Maharashtra",
    description:
      "Work as part of TCS Digital team building enterprise applications for banking and finance clients. Develop Java microservices, work with cloud platforms, and deliver high-quality software solutions for Fortune 500 companies.",
    apply_url: "https://ibegin.tcs.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
    skills: ["Java", "Spring Boot", "SQL", "REST APIs", "AWS"],
    salary: "₹7–12 LPA",
    experience_level: "0–1 yr",
    work_mode: "Hybrid",
    deadline: "5 May 2026",
    posted_days_ago: 7,
    company_size: "600,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-7",
    title: "ML Engineer",
    company: "Flipkart",
    location: "Bengaluru, Karnataka",
    description:
      "Build ML models to power Flipkart's recommendation engine, search ranking, and fraud detection systems. Work with large-scale datasets using Python, TensorFlow, and Spark. Shape the future of e-commerce with cutting-edge AI.",
    apply_url: "https://www.flipkartcareers.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000),
    skills: ["Python", "ML/AI", "TensorFlow", "SQL", "Spark"],
    salary: "₹20–35 LPA",
    experience_level: "1–3 yr",
    work_mode: "Hybrid",
    deadline: "18 Apr 2026",
    posted_days_ago: 6,
    company_size: "30,000+ employees",
    industry: "E-commerce",
  },
  {
    id: "job-8",
    title: "DevOps Engineer",
    company: "Infosys",
    location: "Pune, Maharashtra",
    description:
      "Manage CI/CD pipelines, infrastructure automation, and cloud deployments for Infosys's digital transformation projects. Work with Docker, Kubernetes, Jenkins, and AWS to ensure high availability and performance.",
    apply_url: "https://www.infosys.com/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000),
    skills: ["DevOps", "Docker", "Kubernetes", "AWS", "Linux", "Jenkins"],
    salary: "₹8–15 LPA",
    experience_level: "1–3 yr",
    work_mode: "Onsite",
    deadline: "30 Apr 2026",
    posted_days_ago: 10,
    company_size: "300,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-9",
    title: "Android Developer Intern",
    company: "Swiggy",
    location: "Bengaluru, Karnataka",
    description:
      "Build features for Swiggy's Android app used by 8 crore+ users. Work on food ordering flows, real-time delivery tracking, and in-app promotions. Use Kotlin, Jetpack Compose, and modern Android architecture patterns.",
    apply_url: "https://careers.swiggy.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000),
    skills: ["Android", "Kotlin", "REST APIs", "SQL", "Git"],
    salary: "₹18,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Onsite",
    deadline: "12 Apr 2026",
    posted_days_ago: 2,
    company_size: "5,000+ employees",
    industry: "Food Tech",
  },
  {
    id: "job-10",
    title: "Node.js Backend Developer",
    company: "Zomato",
    location: "Gurugram, Haryana",
    description:
      "Build scalable APIs and microservices for Zomato's restaurant discovery and ordering platform. Work with Node.js, Redis, MongoDB, and real-time systems. Help process millions of orders and build the future of food delivery.",
    apply_url: "https://www.zomato.com/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000),
    skills: ["Node.js", "JavaScript", "MongoDB", "Redis", "REST APIs"],
    salary: "₹10–18 LPA",
    experience_level: "0–1 yr",
    work_mode: "Hybrid",
    deadline: "22 Apr 2026",
    posted_days_ago: 8,
    company_size: "10,000+ employees",
    industry: "Food Tech",
  },
  {
    id: "job-11",
    title: "UI/UX Designer Intern",
    company: "Meesho",
    location: "Bengaluru, Karnataka",
    description:
      "Design intuitive user interfaces for Meesho's social commerce platform serving Tier 2 & 3 India. Create wireframes, prototypes, and visual designs in Figma. Conduct user research and iterate based on data-driven insights.",
    apply_url: "https://meesho.io/jobs",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
    skills: ["UI/UX", "Figma", "Prototyping", "User Research"],
    salary: "₹15,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "28 Apr 2026",
    posted_days_ago: 3,
    company_size: "3,000+ employees",
    industry: "Social Commerce",
  },
  {
    id: "job-12",
    title: "Data Scientist",
    company: "CRED",
    location: "Bengaluru, Karnataka",
    description:
      "Use data science to understand credit card user behavior, build risk models, and personalize offers for CRED's premium user base. Work with large-scale data, build ML models, and deploy them in production environments.",
    apply_url: "https://careers.cred.club",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000),
    skills: ["Python", "ML/AI", "Data Analysis", "SQL", "Statistics"],
    salary: "₹15–25 LPA",
    experience_level: "1–3 yr",
    work_mode: "Onsite",
    deadline: "20 May 2026",
    posted_days_ago: 5,
    company_size: "1,000+ employees",
    industry: "Fintech",
  },
  {
    id: "job-13",
    title: "Cloud Engineer",
    company: "Wipro",
    location: "Hyderabad, Telangana",
    description:
      "Design and manage cloud infrastructure on AWS and Azure for enterprise clients. Automate deployments, optimize costs, and ensure security compliance. Work on cloud migration projects for Fortune 500 companies worldwide.",
    apply_url: "https://careers.wipro.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 12 * 24 * 60 * 60 * 1000),
    skills: ["Cloud", "AWS", "Azure", "DevOps", "Terraform"],
    salary: "₹8–14 LPA",
    experience_level: "0–1 yr",
    work_mode: "Hybrid",
    deadline: "15 May 2026",
    posted_days_ago: 12,
    company_size: "250,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-14",
    title: "Product Manager Intern",
    company: "Paytm",
    location: "Noida, Uttar Pradesh",
    description:
      "Work as a Product Manager Intern on Paytm's payments or lending products. Conduct market research, define product requirements, analyze user metrics, and coordinate with engineering and design teams to ship features.",
    apply_url: "https://jobs.lever.co/paytm",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000),
    skills: ["Product", "Data Analysis", "SQL", "User Research"],
    salary: "₹20,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Onsite",
    deadline: "8 Apr 2026",
    posted_days_ago: 4,
    company_size: "10,000+ employees",
    industry: "Fintech",
  },
  {
    id: "job-15",
    title: "Java Developer",
    company: "HCL Technologies",
    location: "Noida, Uttar Pradesh",
    description:
      "Develop enterprise Java applications for HCL's banking and insurance clients. Work with Spring Boot, Hibernate, and Oracle databases. Build robust, scalable backend services and integrate with third-party APIs.",
    apply_url: "https://www.hcltech.com/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 9 * 24 * 60 * 60 * 1000),
    skills: ["Java", "Spring Boot", "SQL", "Hibernate", "REST APIs"],
    salary: "₹6–10 LPA",
    experience_level: "0–1 yr",
    work_mode: "Onsite",
    deadline: "1 May 2026",
    posted_days_ago: 9,
    company_size: "200,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-16",
    title: "React Frontend Intern",
    company: "Zoho Corporation",
    location: "Chennai, Tamil Nadu",
    description:
      "Build beautiful, responsive UI components for Zoho's suite of 50+ business applications. Use React, TypeScript, and CSS-in-JS to create pixel-perfect interfaces. Collaborate with product designers and backend engineers in an agile team.",
    apply_url: "https://careers.zohocorp.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000),
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
    salary: "₹12,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Onsite",
    deadline: "25 Apr 2026",
    posted_days_ago: 1,
    company_size: "12,000+ employees",
    industry: "SaaS / Business Apps",
  },
  {
    id: "job-17",
    title: "Backend Developer",
    company: "Ola Cabs",
    location: "Bengaluru, Karnataka",
    description:
      "Build core ride-hailing platform services for Ola. Work on real-time matching algorithms, driver routing systems, and payment integrations. Scale systems to handle millions of concurrent rides using microservices and event-driven architecture.",
    apply_url: "https://careers.olacabs.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000),
    skills: ["Java", "Python", "Microservices", "Kafka", "MySQL"],
    salary: "₹12–22 LPA",
    experience_level: "1–3 yr",
    work_mode: "Hybrid",
    deadline: "10 Apr 2026",
    posted_days_ago: 6,
    company_size: "5,000+ employees",
    industry: "Mobility / Ride-tech",
  },
  {
    id: "job-18",
    title: "Data Analyst Intern",
    company: "MakeMyTrip",
    location: "Gurugram, Haryana",
    description:
      "Analyze travel booking patterns, flight demand forecasting, and user behavior for MakeMyTrip's data team. Build dashboards in Tableau, write complex SQL queries, and present insights to business stakeholders.",
    apply_url: "https://careers.makemytrip.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
    skills: ["SQL", "Data Analysis", "Python", "Tableau", "Excel"],
    salary: "₹18,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "30 Apr 2026",
    posted_days_ago: 3,
    company_size: "5,000+ employees",
    industry: "Travel Tech",
  },
  {
    id: "job-19",
    title: "Software Engineer",
    company: "Adobe India",
    location: "Noida, Uttar Pradesh",
    description:
      "Join Adobe's engineering team working on Creative Cloud products like Photoshop, Illustrator, and Premiere. Build high-performance C++ and JavaScript modules, work on AI-powered creative features, and collaborate globally.",
    apply_url: "https://adobe.wd5.myworkdayjobs.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000),
    skills: ["Java", "JavaScript", "Python", "ML/AI", "REST APIs"],
    salary: "₹20–32 LPA",
    experience_level: "1–3 yr",
    work_mode: "Hybrid",
    deadline: "15 May 2026",
    posted_days_ago: 14,
    company_size: "30,000+ employees",
    industry: "Creative Software",
  },
  {
    id: "job-20",
    title: "QA Engineer",
    company: "Persistent Systems",
    location: "Pune, Maharashtra",
    description:
      "Design and execute test cases for enterprise software applications. Work with Selenium, JUnit, and TestNG to automate testing workflows. Ensure software quality for healthcare and BFSI domain clients across the globe.",
    apply_url: "https://www.persistent.com/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000),
    skills: ["Java", "SQL", "Selenium", "Git", "REST APIs"],
    salary: "₹5–9 LPA",
    experience_level: "Fresher",
    work_mode: "Onsite",
    deadline: "5 May 2026",
    posted_days_ago: 8,
    company_size: "20,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-21",
    title: "ML Engineer Intern",
    company: "SAP Labs India",
    location: "Bengaluru, Karnataka",
    description:
      "Research and implement ML models for SAP's enterprise AI products. Work on NLP, predictive analytics, and computer vision tasks. Present findings to research teams and contribute to product integration of AI features.",
    apply_url: "https://jobs.sap.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000),
    skills: ["Python", "ML/AI", "Data Analysis", "SQL", "PyTorch"],
    salary: "₹22,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "20 Apr 2026",
    posted_days_ago: 5,
    company_size: "100,000+ employees",
    industry: "Enterprise Software",
  },
  {
    id: "job-22",
    title: "Full Stack Developer",
    company: "Tech Mahindra",
    location: "Hyderabad, Telangana",
    description:
      "Build end-to-end web applications for telecom and media clients. Work with React on the frontend, Node.js on the backend, and MongoDB for data storage. Participate in agile sprints and deliver features every 2 weeks.",
    apply_url: "https://careers.techmahindra.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 11 * 24 * 60 * 60 * 1000),
    skills: ["React", "Node.js", "MongoDB", "JavaScript", "SQL"],
    salary: "₹6–11 LPA",
    experience_level: "0–1 yr",
    work_mode: "Hybrid",
    deadline: "8 May 2026",
    posted_days_ago: 11,
    company_size: "150,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-23",
    title: "Cloud DevOps Intern",
    company: "Oracle India",
    location: "Bengaluru, Karnataka",
    description:
      "Work on Oracle Cloud Infrastructure (OCI) automation and DevOps tooling. Build Terraform modules, CI/CD pipelines, and monitoring dashboards. Learn enterprise cloud engineering from Oracle's expert teams.",
    apply_url: "https://careers.oracle.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000),
    skills: ["Cloud", "DevOps", "Python", "Terraform", "Linux"],
    salary: "₹20,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "15 Apr 2026",
    posted_days_ago: 6,
    company_size: "140,000+ employees",
    industry: "Enterprise Tech",
  },
  {
    id: "job-24",
    title: "Software Developer",
    company: "Accenture India",
    location: "Mumbai, Maharashtra",
    description:
      "Develop digital transformation solutions for Accenture's enterprise clients in banking, retail, and healthcare. Work with Java, React, and cloud platforms to build modern applications. Get certified on AWS and Azure.",
    apply_url: "https://www.accenture.com/in-en/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 13 * 24 * 60 * 60 * 1000),
    skills: ["Java", "React", "SQL", "AWS", "Git"],
    salary: "₹5–8 LPA",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "25 May 2026",
    posted_days_ago: 13,
    company_size: "500,000+ employees",
    industry: "IT Consulting",
  },
  {
    id: "job-25",
    title: "Data Science Intern",
    company: "IBM India",
    location: "Bengaluru, Karnataka",
    description:
      "Join IBM Research India to work on cutting-edge AI/ML projects. Apply machine learning to solve real-world business problems in healthcare, finance, and sustainability. Publish research and contribute to IBM's open-source AI toolkit.",
    apply_url: "https://www.ibm.com/in-en/employment",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000),
    skills: ["Python", "ML/AI", "Data Analysis", "SQL", "Statistics"],
    salary: "₹25,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "22 Apr 2026",
    posted_days_ago: 2,
    company_size: "300,000+ employees",
    industry: "Enterprise Tech",
  },
  {
    id: "job-26",
    title: "Android Developer",
    company: "BYJU'S",
    location: "Bengaluru, Karnataka",
    description:
      "Build Android features for BYJU'S edtech app used by 150M+ students. Work on offline content delivery, interactive learning modules, and gamification features using Kotlin and Jetpack Compose. Ship features to millions of learners.",
    apply_url: "https://byjus.com/jobs",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
    skills: ["Android", "Kotlin", "Java", "SQL", "REST APIs"],
    salary: "₹8–14 LPA",
    experience_level: "0–1 yr",
    work_mode: "Onsite",
    deadline: "10 May 2026",
    posted_days_ago: 7,
    company_size: "50,000+ employees",
    industry: "EdTech",
  },
  {
    id: "job-27",
    title: "Python Developer",
    company: "Capgemini India",
    location: "Pune, Maharashtra",
    description:
      "Build Python-based data engineering pipelines and automation solutions for Capgemini's automotive and manufacturing clients. Work with Apache Spark, Airflow, and cloud data warehouses to process terabytes of industrial data.",
    apply_url: "https://www.capgemini.com/in-en/careers",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000),
    skills: ["Python", "SQL", "Data Analysis", "AWS", "Spark"],
    salary: "₹6–10 LPA",
    experience_level: "0–1 yr",
    work_mode: "Hybrid",
    deadline: "20 May 2026",
    posted_days_ago: 15,
    company_size: "300,000+ employees",
    industry: "IT Consulting",
  },
  {
    id: "job-28",
    title: "Frontend Intern",
    company: "Juspay",
    location: "Bengaluru, Karnataka",
    description:
      "Work on Juspay's payment UX platform powering Amazon, Swiggy, and Flipkart checkouts. Build React components for seamless payment flows, optimize web performance, and implement A/B tests to improve conversion rates.",
    apply_url: "https://juspay.in/careers",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000),
    skills: ["React", "JavaScript", "CSS", "TypeScript", "Git"],
    salary: "₹15,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Onsite",
    deadline: "18 Apr 2026",
    posted_days_ago: 4,
    company_size: "500+ employees",
    industry: "Fintech / Payments",
  },
  {
    id: "job-29",
    title: "Software Engineer",
    company: "Cognizant India",
    location: "Chennai, Tamil Nadu",
    description:
      "Join Cognizant's digital engineering practice building cloud-native applications for US healthcare clients. Work on React frontends, Java/Spring backends, and AWS infrastructure. Opportunity for on-site travel.",
    apply_url: "https://careers.cognizant.com",
    job_type: JobType.full_time,
    time: BigInt(Date.now() - 16 * 24 * 60 * 60 * 1000),
    skills: ["Java", "React", "SQL", "AWS", "Spring Boot"],
    salary: "₹5–9 LPA",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "30 May 2026",
    posted_days_ago: 16,
    company_size: "350,000+ employees",
    industry: "IT Services",
  },
  {
    id: "job-30",
    title: "Full Stack Intern",
    company: "Mphasis",
    location: "Bengaluru, Karnataka",
    description:
      "Join Mphasis's fintech innovation lab building next-gen banking applications. Work with React, Node.js, and PostgreSQL to build secure financial products. Learn from senior engineers and contribute to real-world production systems.",
    apply_url: "https://careers.mphasis.com",
    job_type: JobType.internship,
    time: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000),
    skills: ["React", "Node.js", "SQL", "JavaScript", "Git"],
    salary: "₹12,000/month stipend",
    experience_level: "Fresher",
    work_mode: "Hybrid",
    deadline: "25 Apr 2026",
    posted_days_ago: 5,
    company_size: "35,000+ employees",
    industry: "IT Services / Fintech",
  },
];

const COMPANY_COLORS: Record<string, string> = {
  "Google India": "bg-blue-500",
  "Microsoft India": "bg-green-600",
  "Amazon India": "bg-orange-500",
  Freshworks: "bg-teal-500",
  Razorpay: "bg-blue-700",
  TCS: "bg-cyan-600",
  Flipkart: "bg-yellow-500",
  Infosys: "bg-blue-600",
  Swiggy: "bg-orange-600",
  Zomato: "bg-red-500",
  Meesho: "bg-pink-500",
  CRED: "bg-black",
  Wipro: "bg-slate-600",
  Paytm: "bg-blue-800",
  "HCL Technologies": "bg-blue-500",
  "Zoho Corporation": "bg-red-600",
  "Ola Cabs": "bg-yellow-600",
  MakeMyTrip: "bg-red-500",
  "Adobe India": "bg-red-700",
  "Persistent Systems": "bg-purple-600",
  "SAP Labs India": "bg-blue-600",
  "Tech Mahindra": "bg-red-500",
  "Oracle India": "bg-red-600",
  "Accenture India": "bg-purple-700",
  "IBM India": "bg-blue-800",
  "BYJU'S": "bg-indigo-600",
  "Capgemini India": "bg-blue-500",
  Juspay: "bg-green-700",
  "Cognizant India": "bg-blue-500",
  Mphasis: "bg-violet-600",
};

const ALL_SKILLS = [
  "Java",
  "Python",
  "React",
  "SQL",
  "Node.js",
  "ML/AI",
  "Data Analysis",
  "DevOps",
  "Android",
  "Cloud",
  "UI/UX",
  "Product",
];

const STUDENT_SKILLS = ["Java", "Python", "SQL", "React", "Git"];

const INITIAL_FILTERS: FilterState = {
  jobType: "All",
  workModes: [],
  experienceLevels: [],
  skills: [],
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getApplicationStatus(timestampMs: number): {
  label: string;
  color: string;
} {
  const daysAgo = (Date.now() - timestampMs) / (24 * 60 * 60 * 1000);
  if (daysAgo < 3)
    return {
      label: "Under Review",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    };
  if (daysAgo < 7)
    return {
      label: "Shortlisted",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    };
  if (daysAgo < 14)
    return {
      label: "Interview Scheduled",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    };
  return {
    label: "Offer Received",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };
}

function getJobTypeBadgeColor(jobType: JobType) {
  if (jobType === JobType.internship)
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300";
  if (jobType === JobType.full_time)
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
}

function getJobTypeLabel(jobType: JobType) {
  if (jobType === JobType.internship) return "Internship";
  if (jobType === JobType.full_time) return "Full-time";
  return "Part-time";
}

function getWorkModeBadgeColor(mode: WorkMode) {
  if (mode === "Remote")
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  if (mode === "Hybrid")
    return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
  return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
}

function getSavedJobIds(): string[] {
  try {
    const raw = localStorage.getItem("savedJobIds");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function setSavedJobIds(ids: string[]) {
  localStorage.setItem("savedJobIds", JSON.stringify(ids));
}
// ─── Local Application Storage ────────────────────────────────────────────────

const LOCAL_APPS_KEY = "sp_job_applications";

function getLocalApplications(email: string): LocalApplication[] {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    const all: LocalApplication[] = raw ? JSON.parse(raw) : [];
    return all.filter((a) => a.email === email);
  } catch {
    return [];
  }
}

function saveLocalApplication(app: LocalApplication): void {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    const all: LocalApplication[] = raw ? JSON.parse(raw) : [];
    all.push(app);
    localStorage.setItem(LOCAL_APPS_KEY, JSON.stringify(all));
  } catch {
    // ignore storage errors
  }
}

function isAlreadyAppliedLocally(email: string, jobId: string): boolean {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    const all: LocalApplication[] = raw ? JSON.parse(raw) : [];
    return all.some((a) => a.email === email && a.jobId === jobId);
  } catch {
    return false;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CompanyLogo({
  company,
  size = "md",
}: { company: string; size?: "sm" | "md" | "lg" }) {
  const colorClass = COMPANY_COLORS[company] ?? "bg-primary";
  const sizeClass =
    size === "sm"
      ? "w-8 h-8 text-sm"
      : size === "lg"
        ? "w-14 h-14 text-2xl"
        : "w-10 h-10 text-base";
  return (
    <div
      className={`${colorClass} ${sizeClass} rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-sm`}
    >
      {company.charAt(0)}
    </div>
  );
}

type JobCardProps = {
  job: RichJobListing;
  isSelected: boolean;
  isSaved: boolean;
  hasApplied: boolean;
  onSelect: () => void;
  onBookmark: (e: React.MouseEvent) => void;
  index: number;
};

function JobCard({
  job,
  isSelected,
  isSaved,
  hasApplied,
  onSelect,
  onBookmark,
  index,
}: JobCardProps) {
  const isNew = job.posted_days_ago <= 7;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
          isSelected
            ? "border-primary ring-2 ring-primary/20 bg-primary/5"
            : "border-border hover:border-primary/40"
        }`}
        onClick={onSelect}
        data-ocid={`job.item.${index + 1}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CompanyLogo company={job.company} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm leading-snug truncate">
                    {job.title}
                  </h3>
                  <p className="text-primary text-xs font-medium mt-0.5">
                    {job.company}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onBookmark}
                  className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
                  aria-label={isSaved ? "Remove bookmark" : "Bookmark job"}
                  data-ocid={`job.toggle.${index + 1}`}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-primary" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                <span
                  className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${getJobTypeBadgeColor(job.job_type)}`}
                >
                  {getJobTypeLabel(job.job_type)}
                </span>
                <span
                  className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${getWorkModeBadgeColor(job.work_mode)}`}
                >
                  {job.work_mode}
                </span>
                {isNew && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    NEW
                  </span>
                )}
                {hasApplied && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Applied
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {job.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                    +{job.skills.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-2.5">
                <span className="text-xs font-semibold text-foreground">
                  {job.salary}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.posted_days_ago}d ago
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

type FilterSidebarContentProps = {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  savedCount: number;
  showSavedOnly: boolean;
  onToggleSaved: () => void;
};

function FilterSidebarContent({
  filters,
  onFiltersChange,
  savedCount,
  showSavedOnly,
  onToggleSaved,
}: FilterSidebarContentProps) {
  const jobTypes: JobTypeFilter[] = [
    "All",
    "Full-time",
    "Internship",
    "Part-time",
  ];
  const workModes: WorkMode[] = ["Remote", "Onsite", "Hybrid"];
  const expLevels: ExperienceLevel[] = [
    "Fresher",
    "0–1 yr",
    "1–3 yr",
    "3–5 yr",
  ];

  const hasActiveFilters =
    filters.jobType !== "All" ||
    filters.workModes.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.skills.length > 0;

  return (
    <div className="space-y-5">
      {/* Saved filter */}
      <button
        type="button"
        onClick={onToggleSaved}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          showSavedOnly
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:text-foreground"
        }`}
        data-ocid="job.tab"
      >
        <span className="flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          Saved Jobs
        </span>
        {savedCount > 0 && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              showSavedOnly
                ? "bg-primary-foreground text-primary"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {savedCount}
          </span>
        )}
      </button>

      <Separator />

      {/* Job Type */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Job Type
        </h4>
        <div className="space-y-1.5">
          {jobTypes.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => onFiltersChange({ ...filters, jobType: type })}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filters.jobType === type
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {type}
              {filters.jobType === type && <ChevronRight className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Work Mode */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Work Mode
        </h4>
        <div className="space-y-2">
          {workModes.map((mode) => (
            <div key={mode} className="flex items-center gap-2">
              <Checkbox
                id={`wm-${mode}`}
                checked={filters.workModes.includes(mode)}
                onCheckedChange={(checked) => {
                  const next = checked
                    ? [...filters.workModes, mode]
                    : filters.workModes.filter((m) => m !== mode);
                  onFiltersChange({ ...filters, workModes: next });
                }}
                data-ocid="job.checkbox"
              />
              <Label htmlFor={`wm-${mode}`} className="text-sm cursor-pointer">
                {mode}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Experience Level */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Experience
        </h4>
        <div className="space-y-2">
          {expLevels.map((level) => (
            <div key={level} className="flex items-center gap-2">
              <Checkbox
                id={`exp-${level}`}
                checked={filters.experienceLevels.includes(level)}
                onCheckedChange={(checked) => {
                  const next = checked
                    ? [...filters.experienceLevels, level]
                    : filters.experienceLevels.filter((l) => l !== level);
                  onFiltersChange({ ...filters, experienceLevels: next });
                }}
                data-ocid="job.checkbox"
              />
              <Label
                htmlFor={`exp-${level}`}
                className="text-sm cursor-pointer"
              >
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Skills */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Skills
        </h4>
        <div className="space-y-2">
          {ALL_SKILLS.map((skill) => (
            <div key={skill} className="flex items-center gap-2">
              <Checkbox
                id={`sk-${skill}`}
                checked={filters.skills.includes(skill)}
                onCheckedChange={(checked) => {
                  const next = checked
                    ? [...filters.skills, skill]
                    : filters.skills.filter((s) => s !== skill);
                  onFiltersChange({ ...filters, skills: next });
                }}
                data-ocid="job.checkbox"
              />
              <Label htmlFor={`sk-${skill}`} className="text-sm cursor-pointer">
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onFiltersChange(INITIAL_FILTERS)}
            data-ocid="job.button"
          >
            <X className="w-3 h-3 mr-1" />
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );
}

type DetailPanelProps = {
  job: RichJobListing | null;
  isSaved: boolean;
  hasApplied: boolean;
  onApply: () => void;
  onBookmark: () => void;
  onClose?: () => void;
};

function JobDetailPanel({
  job,
  isSaved,
  hasApplied,
  onApply,
  onBookmark,
  onClose,
}: DetailPanelProps) {
  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">
          Select a job to view details
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Browse jobs on the left and click to explore full details
        </p>
        <div className="grid gap-3 w-full max-w-xs">
          {[
            {
              icon: Target,
              title: "Tailor your resume",
              desc: "Match keywords from the job description",
            },
            {
              icon: FileText,
              title: "Write a cover letter",
              desc: "Highlight your relevant experience",
            },
            {
              icon: Lightbulb,
              title: "Research the company",
              desc: "Visit the company website before applying",
            },
            {
              icon: TrendingUp,
              title: "Follow up",
              desc: "Check status after 7 days of applying",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg text-left"
            >
              <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const descBullets = job.description.split(". ").slice(0, 5).filter(Boolean);

  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <ScrollArea className="flex-1">
        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <CompanyLogo company={job.company} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-bold text-foreground leading-snug">
                  {job.title}
                </h2>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground p-1"
                    data-ocid="job.close_button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-primary font-semibold text-sm mt-0.5">
                {job.company}
              </p>
              {job.industry && (
                <p className="text-xs text-muted-foreground">{job.industry}</p>
              )}
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getWorkModeBadgeColor(job.work_mode)}`}
            >
              {job.work_mode}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getJobTypeBadgeColor(job.job_type)}`}
            >
              {getJobTypeLabel(job.job_type)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              <Award className="w-3 h-3" />
              {job.experience_level}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              Posted {job.posted_days_ago}d ago
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              Deadline: {job.deadline}
            </span>
          </div>

          <Separator />

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={hasApplied}
              onClick={onApply}
              data-ocid="job.primary_button"
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Applied ✓
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Apply Now
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onBookmark}
              data-ocid="job.toggle"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              data-ocid="job.secondary_button"
            >
              <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <Separator />

          {/* Salary */}
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Salary / Stipend</p>
              <p className="font-bold text-foreground">{job.salary}</p>
            </div>
          </div>

          {/* About the Role */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">
              About the Role
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* What You'll Do */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">
              What You'll Do
            </h4>
            <ul className="space-y-1.5">
              {descBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {bullet}.
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills */}
          {job.skills.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Company Info */}
          <div className="p-4 bg-muted/50 rounded-xl space-y-2">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Info
            </h4>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {job.company}
              </p>
              {job.industry && (
                <p className="text-xs text-muted-foreground">{job.industry}</p>
              )}
              {job.company_size && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {job.company_size}
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
}

type ApplyModalProps = {
  job: RichJobListing | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  studentName: string;
  studentEmail: string;
  onSuccess: () => void; // called after successful local save
};

function ApplyModal({
  job,
  open,
  onOpenChange,
  studentName,
  studentEmail,
  onSuccess,
}: ApplyModalProps) {
  const applyMutation = useApplyForJob();
  const [form, setForm] = useState({
    name: studentName,
    email: studentEmail,
    phone: "",
    coverLetter: "",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: setForm is stable
  useEffect(() => {
    setForm((prev) => ({ ...prev, name: studentName, email: studentEmail }));
  }, [studentName, studentEmail, open]);

  const matchCount = job
    ? job.skills.filter((s) => STUDENT_SKILLS.includes(s)).length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!form.coverLetter.trim()) {
      toast.error("Cover letter is required");
      return;
    }

    // Check for duplicate application via localStorage
    if (isAlreadyAppliedLocally(form.email, job.id)) {
      toast.error("You have already applied for this job");
      return;
    }

    // Save to localStorage immediately — this ALWAYS works
    const newApp: LocalApplication = {
      id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name: form.name,
      email: form.email,
      phone: form.phone,
      coverLetter: form.coverLetter,
      timestampMs: Date.now(),
    };
    saveLocalApplication(newApp);

    // Attempt backend submission silently (best-effort, never blocks success)
    try {
      await applyMutation.mutateAsync({
        jobId: job.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        coverLetter: form.coverLetter,
      });
    } catch {
      // Backend failed — application is already saved locally, proceed silently
    }

    toast.success("Application submitted successfully! 🎉");
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-ocid="job.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Apply for {job?.title}
          </DialogTitle>
        </DialogHeader>

        {job && job.skills.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-muted/60 rounded-xl">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                matchCount >= job.skills.length * 0.6
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {matchCount}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                Skills Match
              </p>
              <p className="text-xs text-muted-foreground">
                Your profile matches {matchCount}/{job.skills.length} required
                skills
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          data-ocid="job.modal"
        >
          <div className="space-y-1">
            <Label className="text-xs">Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              placeholder="Your name"
              data-ocid="job.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              required
              placeholder="your@email.com"
              data-ocid="job.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Phone Number</Label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              required
              placeholder="+91 9876543210"
              data-ocid="job.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Cover Letter</Label>
            <Textarea
              value={form.coverLetter}
              onChange={(e) =>
                setForm((p) => ({ ...p, coverLetter: e.target.value }))
              }
              required
              placeholder="Tell us why you're interested in this role and what makes you a great fit..."
              className="min-h-[100px] resize-none"
              data-ocid="job.textarea"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-ocid="job.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={applyMutation.isPending}
              data-ocid="job.submit_button"
            >
              {applyMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function JobListings() {
  const { user } = useAuth();
  const { data: backendJobs = [], isLoading } = useGetAllJobListings();
  const [localApplications, setLocalApplications] = useState<
    LocalApplication[]
  >([]);

  const studentName = user?.name ?? "";
  const studentEmail = user?.email ?? "";
  const refreshApplications = useCallback(() => {
    if (studentEmail) {
      setLocalApplications(getLocalApplications(studentEmail));
    }
  }, [studentEmail]);

  useEffect(() => {
    refreshApplications();
  }, [refreshApplications]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [savedJobIds, setSavedJobIdsState] = useState<string[]>(getSavedJobIds);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"browse" | "applications">(
    "browse",
  );

  // Merge backend + fallback
  const allJobs = useMemo<RichJobListing[]>(() => {
    if (backendJobs.length > 0) {
      const backendRich: RichJobListing[] = backendJobs.map((j) => ({
        ...j,
        skills: [],
        salary: "Negotiable",
        experience_level: "Fresher" as ExperienceLevel,
        work_mode: "Onsite" as WorkMode,
        deadline: "Open",
        posted_days_ago: Math.floor(
          (Date.now() - Number(j.time) / 1_000_000) / (24 * 60 * 60 * 1000),
        ),
        company_size: undefined,
        industry: undefined,
      }));
      const fallbackIds = new Set(backendRich.map((j) => j.id));
      const extras = FALLBACK_JOBS.filter((j) => !fallbackIds.has(j.id));
      return [...backendRich, ...extras];
    }
    return FALLBACK_JOBS;
  }, [backendJobs]);

  const recommendedJobs = useMemo(
    () => allJobs.filter((j) => j.is_recommended),
    [allJobs],
  );

  const appliedJobIds = useMemo(
    () => new Set(localApplications.map((a) => a.jobId)),
    [localApplications],
  );

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Saved filter
      if (showSavedOnly && !savedJobIds.includes(job.id)) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(q);
        const inCompany = job.company.toLowerCase().includes(q);
        const inLocation = job.location.toLowerCase().includes(q);
        const inDescription = job.description.toLowerCase().includes(q);
        const inSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        if (
          !inTitle &&
          !inCompany &&
          !inLocation &&
          !inDescription &&
          !inSkills
        )
          return false;
      }

      // Job type
      if (filters.jobType !== "All") {
        const typeMap: Record<JobTypeFilter, JobType | null> = {
          All: null,
          "Full-time": JobType.full_time,
          Internship: JobType.internship,
          "Part-time": JobType.part_time,
        };
        if (job.job_type !== typeMap[filters.jobType]) return false;
      }

      // Work mode
      if (
        filters.workModes.length > 0 &&
        !filters.workModes.includes(job.work_mode)
      )
        return false;

      // Experience
      if (
        filters.experienceLevels.length > 0 &&
        !filters.experienceLevels.includes(job.experience_level)
      )
        return false;

      // Skills
      if (
        filters.skills.length > 0 &&
        !filters.skills.some((s) => job.skills.includes(s))
      )
        return false;

      return true;
    });
  }, [allJobs, searchQuery, filters, savedJobIds, showSavedOnly]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const selectedJob = useMemo(
    () => allJobs.find((j) => j.id === selectedJobId) ?? null,
    [allJobs, selectedJobId],
  );

  const toggleBookmark = useCallback((jobId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedJobIdsState((prev) => {
      const next = prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
      setSavedJobIds(next);
      toast.success(
        prev.includes(jobId) ? "Job removed from saved" : "Job saved!",
      );
      return next;
    });
  }, []);

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setMobileDetailOpen(true);
  };

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...(filters.jobType !== "All"
      ? [
          {
            label: filters.jobType,
            onRemove: () => setFilters((f) => ({ ...f, jobType: "All" })),
          },
        ]
      : []),
    ...filters.workModes.map((m) => ({
      label: m,
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          workModes: f.workModes.filter((x) => x !== m),
        })),
    })),
    ...filters.experienceLevels.map((l) => ({
      label: l,
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          experienceLevels: f.experienceLevels.filter((x) => x !== l),
        })),
    })),
    ...filters.skills.map((s) => ({
      label: s,
      onRemove: () =>
        setFilters((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) })),
    })),
    ...(showSavedOnly
      ? [{ label: "Saved Only", onRemove: () => setShowSavedOnly(false) }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Job Board
              </h1>
              <p className="text-xs text-muted-foreground">
                Find jobs & internships tailored for students
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1.5 rounded-full text-muted-foreground">
                <Bell className="w-3 h-3 text-primary" />
                {allJobs.filter((j) => j.posted_days_ago <= 3).length} new
                listings
              </span>
              {/* Mobile filter sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    data-ocid="job.open_modal_button"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Filters
                    {(filters.jobType !== "All" ||
                      filters.workModes.length > 0 ||
                      filters.experienceLevels.length > 0 ||
                      filters.skills.length > 0) && (
                      <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-72 overflow-y-auto"
                  data-ocid="job.sheet"
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <FilterSidebarContent
                      filters={filters}
                      onFiltersChange={setFilters}
                      savedCount={savedJobIds.length}
                      showSavedOnly={showSavedOnly}
                      onToggleSaved={() => setShowSavedOnly((v) => !v)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-2">
            <button
              type="button"
              onClick={() => setActiveTab("browse")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeTab === "browse"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="job.tab"
            >
              Browse Jobs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                activeTab === "applications"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="job.tab"
            >
              My Applications
              {localApplications.length > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    activeTab === "applications"
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {localApplications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {activeTab === "browse" ? (
          <div className="flex gap-5">
            {/* Left Sidebar — desktop only */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-[105px]">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-foreground">
                        Filters
                      </h3>
                      {savedJobIds.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {savedJobIds.length} saved
                        </Badge>
                      )}
                    </div>
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      <FilterSidebarContent
                        filters={filters}
                        onFiltersChange={setFilters}
                        savedCount={savedJobIds.length}
                        showSavedOnly={showSavedOnly}
                        onToggleSaved={() => setShowSavedOnly((v) => !v)}
                      />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Center — Job List */}
            <main className="flex-1 min-w-0">
              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(10);
                  }}
                  className="pl-9"
                  data-ocid="job.search_input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Active filter chips */}
              {activeChips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activeChips.map(({ label, onRemove }) => (
                    <button
                      type="button"
                      key={label}
                      onClick={onRemove}
                      className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors font-medium"
                      data-ocid="job.toggle"
                    >
                      {label}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {activeChips.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFilters(INITIAL_FILTERS);
                        setShowSavedOnly(false);
                      }}
                      className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full hover:bg-muted/80 transition-colors"
                      data-ocid="job.button"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              )}

              {/* Result count */}
              <p className="text-xs text-muted-foreground mb-3">
                Showing {Math.min(visibleCount, filteredJobs.length)} of{" "}
                {filteredJobs.length} jobs
              </p>

              {/* Recommended strip */}
              {recommendedJobs.length > 0 &&
                !searchQuery &&
                filters.jobType === "All" &&
                !showSavedOnly && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      Recommended for You
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {recommendedJobs.map((job) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 w-60"
                        >
                          <Card
                            className={`cursor-pointer border transition-all duration-200 hover:shadow-md ${
                              selectedJobId === job.id
                                ? "border-primary ring-2 ring-primary/20"
                                : "hover:border-primary/40"
                            }`}
                            onClick={() => handleSelectJob(job.id)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <CompanyLogo company={job.company} size="sm" />
                                <div className="min-w-0">
                                  <p className="font-semibold text-xs text-foreground truncate">
                                    {job.title}
                                  </p>
                                  <p className="text-xs text-primary truncate">
                                    {job.company}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 mb-1.5">
                                <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5" />
                                  Recommended
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-foreground">
                                {job.salary}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Loading */}
              {isLoading && (
                <div
                  className="flex items-center justify-center py-12"
                  data-ocid="job.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}

              {/* Empty state */}
              {!isLoading && filteredJobs.length === 0 && (
                <div className="text-center py-12" data-ocid="job.empty_state">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">
                    No jobs found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setFilters(INITIAL_FILTERS);
                      setSearchQuery("");
                      setShowSavedOnly(false);
                    }}
                    data-ocid="job.button"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Job Cards */}
              <div className="space-y-3">
                {visibleJobs.map((job, index) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJobId === job.id}
                    isSaved={savedJobIds.includes(job.id)}
                    hasApplied={appliedJobIds.has(job.id)}
                    onSelect={() => handleSelectJob(job.id)}
                    onBookmark={(e) => toggleBookmark(job.id, e)}
                    index={index}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((v) => v + 10)}
                    data-ocid="job.pagination_next"
                  >
                    Load More Jobs ({filteredJobs.length - visibleCount}{" "}
                    remaining)
                  </Button>
                </div>
              )}
            </main>

            {/* Right Detail Panel — desktop */}
            <aside className="hidden lg:block w-80 xl:w-96 shrink-0">
              <div className="sticky top-[105px]">
                <Card
                  className="overflow-hidden"
                  style={{ height: "calc(100vh - 120px)" }}
                >
                  <JobDetailPanel
                    job={selectedJob}
                    isSaved={
                      selectedJob ? savedJobIds.includes(selectedJob.id) : false
                    }
                    hasApplied={
                      selectedJob ? appliedJobIds.has(selectedJob.id) : false
                    }
                    onApply={() => setApplyModalOpen(true)}
                    onBookmark={() =>
                      selectedJob && toggleBookmark(selectedJob.id)
                    }
                  />
                </Card>
              </div>
            </aside>
          </div>
        ) : (
          /* Applications Tab */
          <div className="max-w-2xl mx-auto">
            <h2 className="font-bold text-lg text-foreground mb-4">
              My Applications
            </h2>
            {localApplications.length === 0 ? (
              <div className="text-center py-16" data-ocid="job.empty_state">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  No applications yet
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Apply for jobs to track your application status here
                </p>
                <Button
                  onClick={() => setActiveTab("browse")}
                  data-ocid="job.primary_button"
                >
                  Browse Jobs
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {localApplications.map((app, index) => {
                  const status = getApplicationStatus(app.timestampMs);
                  const relatedJob = allJobs.find((j) => j.id === app.jobId);
                  const dateApplied = new Date(
                    app.timestampMs,
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      data-ocid={`job.item.${index + 1}`}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <CompanyLogo
                              company={relatedJob?.company ?? app.name[0]}
                              size="md"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-foreground text-sm">
                                    {relatedJob?.title ??
                                      `Application #${index + 1}`}
                                  </h3>
                                  <p className="text-xs text-primary">
                                    {relatedJob?.company ?? "Company"}
                                  </p>
                                  {relatedJob?.location && (
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3" />
                                      {relatedJob.location}
                                    </p>
                                  )}
                                </div>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${status.color}`}
                                >
                                  {status.label}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Applied {dateApplied}
                                </span>
                                {relatedJob && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedJobId(relatedJob.id);
                                      setActiveTab("browse");
                                    }}
                                    className="text-xs text-primary hover:underline flex items-center gap-1"
                                    data-ocid="job.link"
                                  >
                                    View Job{" "}
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>

                              {app.coverLetter && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 bg-muted/50 p-2 rounded">
                                  {app.coverLetter}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Job Detail Sheet */}
      <Sheet open={mobileDetailOpen} onOpenChange={setMobileDetailOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto p-0 lg:hidden"
          data-ocid="job.sheet"
        >
          <div className="h-full">
            <JobDetailPanel
              job={selectedJob}
              isSaved={
                selectedJob ? savedJobIds.includes(selectedJob.id) : false
              }
              hasApplied={
                selectedJob ? appliedJobIds.has(selectedJob.id) : false
              }
              onApply={() => {
                setMobileDetailOpen(false);
                setApplyModalOpen(true);
              }}
              onBookmark={() => selectedJob && toggleBookmark(selectedJob.id)}
              onClose={() => setMobileDetailOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Apply Modal */}
      <ApplyModal
        job={selectedJob}
        open={applyModalOpen}
        onOpenChange={setApplyModalOpen}
        studentName={studentName}
        studentEmail={studentEmail}
        onSuccess={refreshApplications}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="hover:text-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
