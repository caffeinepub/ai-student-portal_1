import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Building2,
  ExternalLink,
  Loader2,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { JobType } from "../backend.d";
import { useGetAllJobListings } from "../hooks/useQueries";

type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  apply_url: string;
  linkedin_url?: string;
  job_type: JobType;
  time: bigint;
};

const FALLBACK_JOBS: JobListing[] = [
  {
    id: "j1",
    title: "Software Engineer Intern",
    company: "Google",
    location: "Bangalore, India",
    description:
      "Join Google's engineering team to build scalable software systems. Work on real products used by billions of people worldwide. Strong DSA and problem-solving skills required.",
    apply_url:
      "https://careers.google.com/jobs/results/?employment_type=INTERN",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Software+Engineer+Intern+Google&location=Bangalore%2C+India",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j2",
    title: "Frontend Developer Intern",
    company: "Flipkart",
    location: "Remote",
    description:
      "Build beautiful, high-performance web experiences for India's largest e-commerce platform. React, TypeScript, and CSS expertise needed. Collaborate with design teams on cutting-edge UIs.",
    apply_url: "https://www.flipkartcareers.com",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Frontend+Developer+Intern+Flipkart&location=India",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j3",
    title: "Data Analyst",
    company: "Infosys",
    location: "Hyderabad, India",
    description:
      "Analyze large datasets to derive actionable insights for enterprise clients. Proficiency in SQL, Python, and data visualization tools required. Drive data-driven decision making.",
    apply_url: "https://www.infosys.com/careers",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Data+Analyst+Infosys&location=Hyderabad%2C+India",
    job_type: JobType.full_time,
    time: BigInt(0),
  },
  {
    id: "j4",
    title: "Java Backend Developer",
    company: "TCS",
    location: "Mumbai, India",
    description:
      "Develop and maintain enterprise-grade Java backend services for global clients. Experience with Spring Boot, Microservices, and REST APIs preferred. Agile environment.",
    apply_url: "https://www.tcs.com/careers",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Java+Backend+Developer+TCS&location=Mumbai%2C+India",
    job_type: JobType.full_time,
    time: BigInt(0),
  },
  {
    id: "j5",
    title: "Python Developer",
    company: "Wipro",
    location: "Pune, India",
    description:
      "Build automation tools and data pipelines using Python. Knowledge of Django, Flask, or FastAPI is a plus. Work with cross-functional teams on digital transformation projects.",
    apply_url: "https://www.wipro.com/careers",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Python+Developer+Wipro&location=Pune%2C+India",
    job_type: JobType.part_time,
    time: BigInt(0),
  },
  {
    id: "j6",
    title: "Software Development Engineer Intern",
    company: "Amazon",
    location: "Hyderabad, India",
    description:
      "Work on Amazon's world-class engineering problems as an SDE intern. Contribute to AWS or consumer products. Strong CS fundamentals, coding skills, and curiosity to learn at scale required.",
    apply_url: "https://www.amazon.jobs/en/teams/internships-for-students",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=SDE+Intern+Amazon&location=Hyderabad%2C+India",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j7",
    title: "Product Management Intern",
    company: "Razorpay",
    location: "Bangalore, India",
    description:
      "Define product strategy for India's leading fintech unicorn. Work with engineering and design to ship features used by millions of merchants. Analytical mindset and user empathy required.",
    apply_url: "https://razorpay.com/jobs",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Product+Management+Intern+Razorpay&location=Bangalore%2C+India",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j8",
    title: "Data Science Intern",
    company: "Zomato",
    location: "Remote",
    description:
      "Solve real-world food-tech problems using machine learning and statistical modelling. Work with large-scale order and delivery datasets. Python, Pandas, and ML fundamentals required.",
    apply_url: "https://www.zomato.com/careers",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Data+Science+Intern+Zomato&location=India",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j9",
    title: "Full Stack Developer",
    company: "HCL Technologies",
    location: "Delhi, India",
    description:
      "Build end-to-end web applications for enterprise clients across the globe. Strong skills in React, Node.js, and SQL needed. Exposure to cloud platforms (AWS/Azure) is an advantage.",
    apply_url: "https://www.hcltech.com/careers",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Full+Stack+Developer+HCL&location=Delhi%2C+India",
    job_type: JobType.full_time,
    time: BigInt(0),
  },
  {
    id: "j10",
    title: "Machine Learning Engineer",
    company: "Microsoft",
    location: "Noida, India",
    description:
      "Design and deploy ML models powering Microsoft's AI products. Work on NLP, computer vision, or recommendation systems. Strong Python, PyTorch/TensorFlow, and research experience preferred.",
    apply_url: "https://careers.microsoft.com",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=Machine+Learning+Engineer+Microsoft&location=Noida%2C+India",
    job_type: JobType.full_time,
    time: BigInt(0),
  },
  {
    id: "j11",
    title: "UI/UX Design Intern",
    company: "Swiggy",
    location: "Bangalore, India",
    description:
      "Craft intuitive and delightful design experiences for Swiggy's mobile and web products. Proficiency in Figma and user research methods required. Portfolio showcasing strong visual craft preferred.",
    apply_url: "https://careers.swiggy.com",
    linkedin_url:
      "https://www.linkedin.com/jobs/search/?keywords=UI+UX+Design+Intern+Swiggy&location=Bangalore%2C+India",
    job_type: JobType.internship,
    time: BigInt(0),
  },
];

const JOB_TYPE_MAP: Record<string, { label: string; color: string }> = {
  full_time: {
    label: "Full-time",
    color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  internship: {
    label: "Internship",
    color: "bg-green-500/15 text-green-400 border-green-500/30",
  },
  part_time: {
    label: "Part-time",
    color: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  },
};

type FilterType = "all" | "full_time" | "internship" | "part_time";

export default function JobListings() {
  const { data: backendJobs = [], isLoading } = useGetAllJobListings();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const jobs: JobListing[] =
    backendJobs.length > 0 ? backendJobs : FALLBACK_JOBS;

  const internshipCount = jobs.filter(
    (j) => j.job_type === JobType.internship,
  ).length;

  const filtered = jobs.filter((job) => {
    const matchesFilter = filter === "all" || job.job_type === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-orange-400" />
          </div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Job Listings
          </h1>
        </div>
        <p className="text-muted-foreground ml-12">
          {jobs.length} opportunities at top companies. Find your perfect role.
        </p>
      </motion.div>

      {/* Internship Spotlight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/10 via-emerald-500/8 to-teal-500/10 p-4 sm:p-5"
        data-ocid="jobs.internship_spotlight.panel"
      >
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-8 -top-8 w-40 h-40 rounded-full bg-green-400/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-4 bottom-0 w-24 h-24 rounded-full bg-emerald-400/10 blur-xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-green-400 text-sm sm:text-base">
                  Internship Spotlight
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                  {internshipCount} available
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-snug">
                Explore internship opportunities from top companies — apply
                directly via the company portal.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setFilter("internship")}
            className="flex-shrink-0 bg-green-600 hover:bg-green-500 text-white border-0 gap-1.5 shadow-md shadow-green-900/30"
            data-ocid="jobs.internship_spotlight.button"
          >
            <Briefcase className="w-3.5 h-3.5" />
            View Internships
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="jobs.search_input"
          />
        </div>
        <div className="flex gap-2 flex-wrap" data-ocid="jobs.filter.tab">
          {(
            ["all", "full_time", "internship", "part_time"] as FilterType[]
          ).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              data-ocid={`jobs.filter-${f}.button`}
            >
              {f === "all" ? "All" : JOB_TYPE_MAP[f]?.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="flex items-center gap-2 text-muted-foreground"
          data-ocid="jobs.loading_state"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading listings...</span>
        </div>
      )}

      {/* Empty */}
      {!isLoading && filtered.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="jobs.empty_state"
        >
          <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No jobs found matching your search.</p>
          <p className="text-sm mt-1">Try adjusting your filters.</p>
        </div>
      )}

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        data-ocid="jobs.list"
      >
        {filtered.map((job, i) => {
          const typeInfo = JOB_TYPE_MAP[job.job_type] ?? {
            label: String(job.job_type),
            color: "bg-muted text-foreground border-border",
          };
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              data-ocid={`jobs.item.${i + 1}`}
            >
              <Card className="card-glow h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-display font-bold leading-tight">
                          {job.title}
                        </CardTitle>
                        <p className="text-xs text-primary font-semibold mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border flex-shrink-0 ${typeInfo.color}`}
                    >
                      {typeInfo.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </div>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {job.description}
                  </CardDescription>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-auto pt-1">
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5"
                      asChild
                      data-ocid={`jobs.apply.button.${i + 1}`}
                    >
                      <a
                        href={job.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
