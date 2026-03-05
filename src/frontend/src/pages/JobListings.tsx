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
    apply_url: "https://careers.google.com",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j2",
    title: "Frontend Developer",
    company: "Flipkart",
    location: "Remote",
    description:
      "Build beautiful, high-performance web experiences for India's largest e-commerce platform. React, TypeScript, and CSS expertise needed. Collaborate with design teams on cutting-edge UIs.",
    apply_url: "https://www.flipkartcareers.com",
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
    job_type: JobType.part_time,
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

  const jobs = backendJobs.length > 0 ? backendJobs : FALLBACK_JOBS;

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
        <div className="flex gap-2" data-ocid="jobs.filter.tab">
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
            label: job.job_type,
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
                  <Button
                    size="sm"
                    className="w-full gap-1.5 mt-auto"
                    asChild
                    data-ocid={`jobs.apply.button.${i + 1}`}
                  >
                    <a
                      href={job.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                      <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
