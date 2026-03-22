import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  Search,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { JobType } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import {
  useApplyForJob,
  useGetAllJobListings,
  useGetMyApplications,
} from "../hooks/useQueries";

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
    apply_url:
      "https://careers.google.com/jobs/results/?employment_type=INTERN",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j2",
    title: "Frontend Developer Intern",
    company: "Flipkart",
    location: "Remote",
    description:
      "Build beautiful, high-performance web experiences for India's largest e-commerce platform. React, TypeScript, and CSS expertise needed.",
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
      "Analyze large datasets to derive actionable insights for enterprise clients. Proficiency in SQL, Python, and data visualization tools required.",
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
      "Develop and maintain enterprise-grade Java backend services for global clients. Experience with Spring Boot, Microservices, and REST APIs preferred.",
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
      "Build automation tools and data pipelines using Python. Knowledge of Django, Flask, or FastAPI is a plus.",
    apply_url: "https://www.wipro.com/careers",
    job_type: JobType.part_time,
    time: BigInt(0),
  },
  {
    id: "j6",
    title: "Software Development Engineer Intern",
    company: "Amazon",
    location: "Hyderabad, India",
    description:
      "Work on Amazon's world-class engineering problems as an SDE intern. Contribute to AWS or consumer products. Strong CS fundamentals required.",
    apply_url: "https://www.amazon.jobs/en/teams/internships-for-students",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j7",
    title: "Product Management Intern",
    company: "Razorpay",
    location: "Bangalore, India",
    description:
      "Define product strategy for India's leading fintech unicorn. Work with engineering and design to ship features used by millions of merchants.",
    apply_url: "https://razorpay.com/jobs",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j8",
    title: "Data Science Intern",
    company: "Zomato",
    location: "Remote",
    description:
      "Solve real-world food-tech problems using machine learning and statistical modelling. Python, Pandas, and ML fundamentals required.",
    apply_url: "https://www.zomato.com/careers",
    job_type: JobType.internship,
    time: BigInt(0),
  },
  {
    id: "j9",
    title: "Full Stack Developer",
    company: "HCL Technologies",
    location: "Delhi, India",
    description:
      "Build end-to-end web applications for enterprise clients across the globe. Strong skills in React, Node.js, and SQL needed.",
    apply_url: "https://www.hcltech.com/careers",
    job_type: JobType.full_time,
    time: BigInt(0),
  },
  {
    id: "j10",
    title: "Machine Learning Engineer",
    company: "Microsoft",
    location: "Noida, India",
    description:
      "Design and deploy ML models powering Microsoft's AI products. Work on NLP, computer vision, or recommendation systems.",
    apply_url: "https://careers.microsoft.com",
    job_type: JobType.full_time,
    time: BigInt(0),
  },
  {
    id: "j11",
    title: "UI/UX Design Intern",
    company: "Swiggy",
    location: "Bangalore, India",
    description:
      "Craft intuitive and delightful design experiences for Swiggy's mobile and web products. Proficiency in Figma and user research methods required.",
    apply_url: "https://careers.swiggy.com",
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

function isNewJob(time: bigint): boolean {
  if (time === BigInt(0)) return false;
  const nowMs = Date.now();
  const jobMs = Number(time) / 1_000_000;
  return nowMs - jobMs < 7 * 24 * 60 * 60 * 1000;
}

function formatDate(nanos: bigint): string {
  const ms = Number(nanos) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type ApplyDialogProps = {
  job: JobListing;
  open: boolean;
  onClose: () => void;
  alreadyApplied: boolean;
};

function ApplyDialog({ job, open, onClose, alreadyApplied }: ApplyDialogProps) {
  const { user } = useAuth();
  const { mutate: applyForJob, isPending } = useApplyForJob();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  function handleSubmit() {
    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (coverLetter.length < 50) {
      toast.error("Cover letter must be at least 50 characters.");
      return;
    }
    applyForJob(
      { jobId: job.id, name, email, phone, coverLetter },
      {
        onSuccess: () => {
          toast.success("Application submitted successfully!");
          onClose();
        },
        onError: () => toast.error("Failed to submit application. Try again."),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="jobs.apply.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Apply for {job.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {job.company} &middot; {job.location}
          </p>
        </DialogHeader>

        {alreadyApplied ? (
          <div
            className="py-6 text-center space-y-2"
            data-ocid="jobs.apply.success_state"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="font-semibold text-foreground">Already Applied!</p>
            <p className="text-sm text-muted-foreground">
              You have already submitted an application for this position.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="apply-name"
                  className="text-xs text-muted-foreground"
                >
                  Full Name *
                </Label>
                <Input
                  id="apply-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  data-ocid="jobs.apply.name.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="apply-email"
                  className="text-xs text-muted-foreground"
                >
                  Email *
                </Label>
                <Input
                  id="apply-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  data-ocid="jobs.apply.email.input"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="apply-phone"
                className="text-xs text-muted-foreground"
              >
                Phone *
              </Label>
              <Input
                id="apply-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                data-ocid="jobs.apply.phone.input"
              />
            </div>
            <div>
              <Label
                htmlFor="apply-cover"
                className="text-xs text-muted-foreground"
              >
                Cover Letter * (min 50 chars)
              </Label>
              <Textarea
                id="apply-cover"
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the employer why you're a great fit for this role..."
                data-ocid="jobs.apply.cover_letter.textarea"
              />
              <p
                className={`text-xs mt-1 ${coverLetter.length < 50 ? "text-destructive" : "text-green-500"}`}
              >
                {coverLetter.length}/50 characters minimum
              </p>
            </div>
          </div>
        )}

        {!alreadyApplied && (
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              data-ocid="jobs.apply.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="gap-1.5 bg-orange-600 hover:bg-orange-500 text-white border-0"
              data-ocid="jobs.apply.submit_button"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function JobListings() {
  const { data: backendJobs = [], isLoading } = useGetAllJobListings();
  const { data: myApplications = [] } = useGetMyApplications();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [applyJobId, setApplyJobId] = useState<string | null>(null);

  const jobs: JobListing[] =
    backendJobs.length > 0 ? backendJobs : FALLBACK_JOBS;

  const appliedJobIds = new Set(myApplications.map((a) => a.jobId));

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

  const selectedJob = applyJobId
    ? (jobs.find((j) => j.id === applyJobId) ?? null)
    : null;

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
          <span className="inline-flex items-center gap-1 text-xs bg-green-500/15 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
            <Zap className="w-3 h-3" />
            Live
          </span>
        </div>
        <p className="text-muted-foreground ml-12">
          {jobs.length} opportunities · Apply directly from this portal
        </p>
      </motion.div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList data-ocid="jobs.tabs">
          <TabsTrigger value="browse" data-ocid="jobs.browse.tab">
            <Briefcase className="w-4 h-4 mr-1.5" />
            Browse Jobs
          </TabsTrigger>
          <TabsTrigger value="applications" data-ocid="jobs.applications.tab">
            <FileText className="w-4 h-4 mr-1.5" />
            My Applications
            {myApplications.length > 0 && (
              <span className="ml-1.5 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                {myApplications.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Browse Jobs Tab */}
        <TabsContent value="browse" className="mt-4 space-y-5">
          {/* Internship Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/10 via-emerald-500/8 to-teal-500/10 p-4 sm:p-5"
            data-ocid="jobs.internship_spotlight.panel"
          >
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
                    directly right here.
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

          {/* Search & Filter */}
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
            <AnimatePresence>
              {filtered.map((job, i) => {
                const typeInfo = JOB_TYPE_MAP[job.job_type] ?? {
                  label: String(job.job_type),
                  color: "bg-muted text-foreground border-border",
                };
                const isNew = isNewJob(job.time);
                const hasApplied = appliedJobIds.has(job.id);

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                    data-ocid={`jobs.item.${i + 1}`}
                  >
                    <Card className="h-full flex flex-col hover:border-primary/40 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <CardTitle className="text-sm font-display font-bold leading-tight">
                                  {job.title}
                                </CardTitle>
                                {isNew && (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-primary font-semibold mt-0.5">
                                {job.company}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${typeInfo.color}`}
                            >
                              {typeInfo.label}
                            </span>
                            {hasApplied && (
                              <Badge
                                variant="outline"
                                className="text-green-400 border-green-500/40 bg-green-500/10 text-xs gap-1"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Applied
                              </Badge>
                            )}
                          </div>
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
                        <div className="pt-1">
                          {hasApplied ? (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled
                              className="w-full gap-1.5 text-green-400 border-green-500/40"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Application Submitted
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="w-full gap-1.5 bg-orange-600 hover:bg-orange-500 text-white border-0"
                              onClick={() => setApplyJobId(job.id)}
                              data-ocid="jobs.apply.open_modal_button"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </TabsContent>

        {/* My Applications Tab */}
        <TabsContent value="applications" className="mt-4">
          {myApplications.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="jobs.applications.empty_state"
            >
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-base">
                You haven&apos;t applied to any jobs yet.
              </p>
              <p className="text-sm mt-1">
                Browse available jobs and submit your first application.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-ocid="jobs.applications.list"
            >
              {myApplications.map((app, i) => {
                const job = jobs.find((j) => j.id === app.jobId);
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                    data-ocid={`jobs.applications.item.${i + 1}`}
                  >
                    <Card className="h-full hover:border-primary/40 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-4 h-4 text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm font-display font-bold truncate">
                              {job?.title ?? app.jobId}
                            </CardTitle>
                            <p className="text-xs text-primary font-semibold mt-0.5">
                              {job?.company ?? "—"}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-green-400 border-green-500/40 bg-green-500/10 text-xs gap-1 flex-shrink-0"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            Applied
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="w-3.5 h-3.5" />
                          Applied on {formatDate(app.timestamp)}
                        </div>
                        {app.coverLetter && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
                            &ldquo;{app.coverLetter.slice(0, 100)}
                            {app.coverLetter.length > 100 ? "..." : ""}&rdquo;
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Apply Dialog */}
      {selectedJob && (
        <ApplyDialog
          job={selectedJob}
          open={!!applyJobId}
          onClose={() => setApplyJobId(null)}
          alreadyApplied={appliedJobIds.has(selectedJob.id)}
        />
      )}
    </div>
  );
}
