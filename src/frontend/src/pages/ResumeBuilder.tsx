import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Plus,
  Save,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { ResumeProfile } from "../backend.d";
import { useGetResumeProfile, useSaveResumeProfile } from "../hooks/useQueries";

interface EducationRow {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface ExperienceRow {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface CertificationRow {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  technologies: string;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}
function blankEdu(): EducationRow {
  return {
    id: uid(),
    institution: "",
    degree: "",
    year: String(new Date().getFullYear()),
  };
}
function blankExp(): ExperienceRow {
  return { id: uid(), company: "", role: "", duration: "", description: "" };
}
function blankCert(): CertificationRow {
  return {
    id: uid(),
    name: "",
    issuer: "",
    year: String(new Date().getFullYear()),
  };
}
function blankProject(): ProjectRow {
  return { id: uid(), title: "", description: "", technologies: "" };
}

// ── ATS Score calculation ──────────────────────────────────────────────────
interface ATSScore {
  total: number;
  breakdown: { label: string; earned: number; max: number; tip: string }[];
}

function calcATS(
  name: string,
  email: string,
  phone: string,
  location: string,
  linkedin: string,
  summary: string,
  skills: string[],
  education: EducationRow[],
  experience: ExperienceRow[],
  certifications: CertificationRow[],
  projects: ProjectRow[],
): ATSScore {
  const checks = [
    {
      label: "Full Name",
      earned: name.trim().split(" ").length >= 2 ? 10 : name.trim() ? 5 : 0,
      max: 10,
      tip: "Add your first and last name",
    },
    {
      label: "Email Address",
      earned: /^[^@]+@[^@]+\.[^@]+$/.test(email) ? 8 : 0,
      max: 8,
      tip: "Add a valid email address",
    },
    {
      label: "Phone Number",
      earned: phone.trim().length >= 7 ? 7 : 0,
      max: 7,
      tip: "Add your phone number",
    },
    {
      label: "Location / City",
      earned: location.trim().length > 0 ? 5 : 0,
      max: 5,
      tip: "Add your city or location",
    },
    {
      label: "LinkedIn URL",
      earned: linkedin.trim().length > 0 ? 5 : 0,
      max: 5,
      tip: "Add your LinkedIn profile URL",
    },
    {
      label: "Professional Summary",
      earned:
        summary.trim().length >= 100
          ? 15
          : summary.trim().length >= 50
            ? 10
            : summary.trim().length > 0
              ? 5
              : 0,
      max: 15,
      tip: "Write a summary of at least 100 characters with keywords",
    },
    {
      label: "Skills (min 8)",
      earned:
        skills.length >= 8
          ? 15
          : skills.length >= 5
            ? 10
            : skills.length >= 2
              ? 5
              : 0,
      max: 15,
      tip: "Add at least 8 relevant technical skills",
    },
    {
      label: "Education",
      earned:
        education.length > 0 &&
        education.some((e) => e.institution.trim() && e.degree.trim())
          ? 10
          : 0,
      max: 10,
      tip: "Add at least one education entry with institution and degree",
    },
    {
      label: "Work Experience",
      earned:
        experience.length > 0 &&
        experience.some(
          (e) =>
            e.company.trim() &&
            e.role.trim() &&
            e.description.trim().length >= 30,
        )
          ? 15
          : experience.length > 0
            ? 8
            : 0,
      max: 15,
      tip: "Add experience with detailed descriptions (30+ chars each)",
    },
    {
      label: "Certifications / Projects",
      earned:
        certifications.some((c) => c.name.trim()) ||
        projects.some((p) => p.title.trim())
          ? 10
          : 0,
      max: 10,
      tip: "Add at least one certification or project",
    },
  ];
  return {
    total: checks.reduce((s, c) => s + c.earned, 0),
    breakdown: checks,
  };
}

// ── PDF Download ───────────────────────────────────────────────────────────
function downloadResumePDF(
  name: string,
  email: string,
  phone: string,
  location: string,
  linkedin: string,
  summary: string,
  skills: string[],
  education: EducationRow[],
  experience: ExperienceRow[],
  certifications: CertificationRow[],
  projects: ProjectRow[],
) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${name || "Resume"}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 11pt; color: #111; background: #fff; padding: 36px 48px; }
  h1 { font-size: 20pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .contact { font-size: 9pt; color: #333; margin-bottom: 14px; display: flex; flex-wrap: wrap; gap: 8px; }
  .contact span::after { content: " | "; color: #999; } .contact span:last-child::after { content: ""; }
  hr { border: none; border-top: 2px solid #111; margin: 10px 0; }
  .thin-hr { border: none; border-top: 1px solid #ccc; margin: 6px 0; }
  h2 { font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1.5px solid #111; padding-bottom: 2px; margin-bottom: 8px; margin-top: 14px; }
  p { font-size: 10pt; line-height: 1.5; margin-bottom: 4px; }
  .entry { margin-bottom: 10px; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-title { font-weight: bold; font-size: 10.5pt; }
  .entry-sub { font-size: 9.5pt; color: #444; }
  .entry-date { font-size: 9pt; color: #555; white-space: nowrap; }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 5px; }
  .skill-chip { border: 1px solid #bbb; border-radius: 3px; padding: 1px 8px; font-size: 9.5pt; }
  ul { margin-left: 18px; }
  ul li { font-size: 10pt; line-height: 1.5; }
  @media print { body { padding: 20px 28px; } }
</style>
</head>
<body>
<h1>${name}</h1>
<div class="contact">
  ${email ? `<span>${email}</span>` : ""}
  ${phone ? `<span>${phone}</span>` : ""}
  ${location ? `<span>${location}</span>` : ""}
  ${linkedin ? `<span>${linkedin}</span>` : ""}
</div>
<hr />
${summary ? `<h2>Professional Summary</h2><p>${summary}</p>` : ""}
${skills.length > 0 ? `<h2>Technical Skills</h2><div class="skills-grid">${skills.map((s) => `<span class="skill-chip">${s}</span>`).join("")}</div>` : ""}
${education.length > 0 ? `<h2>Education</h2>${education.map((e) => `<div class="entry"><div class="entry-header"><span class="entry-title">${e.degree}</span><span class="entry-date">${e.year}</span></div><div class="entry-sub">${e.institution}</div></div>`).join("")}` : ""}
${experience.length > 0 ? `<h2>Work Experience</h2>${experience.map((e) => `<div class="entry"><div class="entry-header"><span class="entry-title">${e.role}</span><span class="entry-date">${e.duration}</span></div><div class="entry-sub">${e.company}</div>${e.description ? `<p style="margin-top:4px">${e.description}</p>` : ""}</div>`).join("")}` : ""}
${
  certifications.filter((c) => c.name.trim()).length > 0
    ? `<h2>Certifications</h2>${certifications
        .filter((c) => c.name.trim())
        .map(
          (c) =>
            `<div class="entry"><div class="entry-header"><span class="entry-title">${c.name}</span><span class="entry-date">${c.year}</span></div><div class="entry-sub">${c.issuer}</div></div>`,
        )
        .join("")}`
    : ""
}
${
  projects.filter((p) => p.title.trim()).length > 0
    ? `<h2>Projects</h2>${projects
        .filter((p) => p.title.trim())
        .map(
          (p) =>
            `<div class="entry"><span class="entry-title">${p.title}</span>${p.technologies ? `<div class="entry-sub">Technologies: ${p.technologies}</div>` : ""}${p.description ? `<p style="margin-top:3px">${p.description}</p>` : ""}</div>`,
        )
        .join("")}`
    : ""
}
</body></html>`;

  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
    }, 400);
  }
}

// ── Score Ring ─────────────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 90 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        role="img"
        aria-label="ATS Score"
      >
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill={color}
        >
          {score}
        </text>
        <text x="50" y="60" textAnchor="middle" fontSize="9" fill="#6b7280">
          ATS Score
        </text>
      </svg>
      <span className="text-xs font-semibold mt-1" style={{ color }}>
        {score === 100
          ? "Perfect!"
          : score >= 90
            ? "Excellent"
            : score >= 60
              ? "Good"
              : "Needs Work"}
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function ResumeBuilder() {
  const { data: savedProfile, isLoading } = useGetResumeProfile();
  const { mutate: saveResume, isPending } = useSaveResumeProfile();

  // Core fields (saved to backend)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState<EducationRow[]>([]);
  const [experience, setExperience] = useState<ExperienceRow[]>([]);

  // Extra ATS fields (local state)
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [certifications, setCertifications] = useState<CertificationRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (savedProfile) {
      setName(savedProfile.name);
      setEmail(savedProfile.email);
      setPhone(savedProfile.phone);
      setSummary(savedProfile.summary);
      setSkills(savedProfile.skills);
      setEducation(
        savedProfile.education.map((e) => ({
          id: uid(),
          institution: e.institution,
          degree: e.degree,
          year: String(e.year),
        })),
      );
      setExperience(savedProfile.experience.map((e) => ({ id: uid(), ...e })));
    }
  }, [savedProfile]);

  const atsScore = useMemo(
    () =>
      calcATS(
        name,
        email,
        phone,
        location,
        linkedin,
        summary,
        skills,
        education,
        experience,
        certifications,
        projects,
      ),
    [
      name,
      email,
      phone,
      location,
      linkedin,
      summary,
      skills,
      education,
      experience,
      certifications,
      projects,
    ],
  );

  function buildProfile(): ResumeProfile {
    return {
      name,
      email,
      phone,
      summary,
      skills,
      education: education.map((e) => ({
        institution: e.institution,
        degree: e.degree,
        year: BigInt(e.year || "0"),
      })),
      experience: experience.map((e) => ({
        company: e.company,
        role: e.role,
        duration: e.duration,
        description: e.description,
      })),
    };
  }

  function handleSave() {
    saveResume(buildProfile(), {
      onSuccess: () => {
        setSaved(true);
        toast.success("Resume saved successfully!");
        setTimeout(() => setSaved(false), 3000);
      },
      onError: () => toast.error("Failed to save. Please try again."),
    });
  }

  function handleDownload() {
    if (!name.trim()) {
      toast.error("Please fill in your name before downloading.");
      return;
    }
    downloadResumePDF(
      name,
      email,
      phone,
      location,
      linkedin,
      summary,
      skills,
      education,
      experience,
      certifications,
      projects,
    );
    toast.success("Resume opened — use Print > Save as PDF to download.");
  }

  function addSkill() {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) {
      setSkills((p) => [...p, s]);
      setNewSkill("");
    }
  }

  function updateEdu(
    id: string,
    field: keyof Omit<EducationRow, "id">,
    val: string,
  ) {
    setEducation((p) =>
      p.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    );
  }
  function updateExp(
    id: string,
    field: keyof Omit<ExperienceRow, "id">,
    val: string,
  ) {
    setExperience((p) =>
      p.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    );
  }
  function updateCert(
    id: string,
    field: keyof Omit<CertificationRow, "id">,
    val: string,
  ) {
    setCertifications((p) =>
      p.map((c) => (c.id === id ? { ...c, [field]: val } : c)),
    );
  }
  function updateProj(
    id: string,
    field: keyof Omit<ProjectRow, "id">,
    val: string,
  ) {
    setProjects((p) =>
      p.map((pr) => (pr.id === id ? { ...pr, [field]: val } : pr)),
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-pink-500/15 flex items-center justify-center">
            <FileText className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Resume Builder
            </h1>
            <p className="text-muted-foreground text-sm">
              ATS-optimised · Live preview · PDF download
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isPending || isLoading}
            className="gap-1.5"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isPending ? "Saving..." : saved ? "Saved!" : "Save Resume"}
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading your resume...</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* Left: Form + Preview */}
        <div className="space-y-6">
          <Tabs defaultValue="personal">
            <TabsList className="w-full">
              <TabsTrigger value="personal" className="flex-1">
                Personal
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex-1">
                Skills & Edu
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex-1">
                Experience
              </TabsTrigger>
              <TabsTrigger value="extra" className="flex-1">
                Certs & Projects
              </TabsTrigger>
            </TabsList>

            {/* Personal */}
            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                      Full Name *
                    </Label>
                    <Input
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      placeholder="rahul@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                      Phone *
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                      Location / City
                    </Label>
                    <Input
                      placeholder="e.g. Hyderabad, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                      LinkedIn URL
                    </Label>
                    <Input
                      placeholder="linkedin.com/in/yourname"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                      Professional Summary{" "}
                      <span className="text-pink-400">
                        (min 100 chars for full score)
                      </span>
                    </Label>
                    <Textarea
                      rows={4}
                      placeholder="A results-driven software engineer with 2+ years of experience in Java, Spring Boot, and React. Skilled at delivering scalable web applications and collaborating in agile teams..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {summary.length} characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills & Education */}
            <TabsContent value="skills" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Technical Skills{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      (add 8+ for full score)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g. Java, React, SQL)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button size="sm" onClick={addSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-1.5 pr-1.5"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() =>
                            setSkills((p) => p.filter((x) => x !== skill))
                          }
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No skills added yet
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {skills.length}/8 skills added
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Education</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEducation((p) => [...p, blankEdu()])}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No education entries. Click Add to start.
                    </p>
                  )}
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="space-y-2 p-3 bg-muted/40 rounded-lg relative"
                    >
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setEducation((p) => p.filter((e) => e.id !== edu.id))
                        }
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Institution (e.g. JNTUH)"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEdu(edu.id, "institution", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Degree (e.g. B.Tech Computer Science)"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEdu(edu.id, "degree", e.target.value)
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Year of Graduation"
                        value={edu.year}
                        onChange={(e) =>
                          updateEdu(edu.id, "year", e.target.value)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Work Experience</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setExperience((p) => [...p, blankExp()])}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No experience entries. Click Add to start.
                    </p>
                  )}
                  {experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="space-y-2 p-3 bg-muted/40 rounded-lg relative"
                    >
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setExperience((p) => p.filter((e) => e.id !== exp.id))
                        }
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            updateExp(exp.id, "company", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Role / Title"
                          value={exp.role}
                          onChange={(e) =>
                            updateExp(exp.id, "role", e.target.value)
                          }
                        />
                      </div>
                      <Input
                        placeholder="Duration (e.g. Jan 2024 – Present)"
                        value={exp.duration}
                        onChange={(e) =>
                          updateExp(exp.id, "duration", e.target.value)
                        }
                      />
                      <Textarea
                        rows={3}
                        placeholder="Describe your responsibilities and achievements using action verbs (e.g. Developed, Optimized, Led, Reduced...)."
                        value={exp.description}
                        onChange={(e) =>
                          updateExp(exp.id, "description", e.target.value)
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {exp.description.length} chars (30+ for full ATS credit)
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications & Projects */}
            <TabsContent value="extra" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Certifications</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setCertifications((p) => [...p, blankCert()])
                      }
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No certifications added yet.
                    </p>
                  )}
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="space-y-2 p-3 bg-muted/40 rounded-lg relative"
                    >
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setCertifications((p) =>
                            p.filter((c) => c.id !== cert.id),
                          )
                        }
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Certification Name (e.g. AWS Cloud Practitioner)"
                        value={cert.name}
                        onChange={(e) =>
                          updateCert(cert.id, "name", e.target.value)
                        }
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) =>
                            updateCert(cert.id, "issuer", e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Year"
                          value={cert.year}
                          onChange={(e) =>
                            updateCert(cert.id, "year", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Projects</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProjects((p) => [...p, blankProject()])}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No projects added yet.
                    </p>
                  )}
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="space-y-2 p-3 bg-muted/40 rounded-lg relative"
                    >
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setProjects((p) =>
                            p.filter((pr) => pr.id !== proj.id),
                          )
                        }
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) =>
                          updateProj(proj.id, "title", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Technologies used (e.g. React, Node.js, MongoDB)"
                        value={proj.technologies}
                        onChange={(e) =>
                          updateProj(proj.id, "technologies", e.target.value)
                        }
                      />
                      <Textarea
                        rows={2}
                        placeholder="Brief description of the project and your role..."
                        value={proj.description}
                        onChange={(e) =>
                          updateProj(proj.id, "description", e.target.value)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Live Preview
            </h2>
            <div className="bg-white dark:bg-white border border-border rounded-xl p-8 text-black">
              {/* Preview Header */}
              <div className="border-b-2 border-black pb-4 mb-4">
                <h2 className="text-2xl font-bold uppercase tracking-wide text-black">
                  {name || "Your Name"}
                </h2>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-600">
                  {email && <span>{email}</span>}
                  {phone && <span>· {phone}</span>}
                  {location && <span>· {location}</span>}
                  {linkedin && <span>· {linkedin}</span>}
                </div>
                {summary && (
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                    {summary}
                  </p>
                )}
              </div>

              {skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest border-b border-black pb-1 mb-2 text-black">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="border border-gray-400 rounded text-xs px-2 py-0.5 text-gray-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {education.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest border-b border-black pb-1 mb-2 text-black">
                    Education
                  </h3>
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="mb-2 flex justify-between items-baseline"
                    >
                      <div>
                        <p className="font-semibold text-sm text-black">
                          {edu.degree || "Degree"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {edu.institution || "Institution"}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{edu.year}</span>
                    </div>
                  ))}
                </div>
              )}

              {experience.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest border-b border-black pb-1 mb-2 text-black">
                    Work Experience
                  </h3>
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <p className="font-semibold text-sm text-black">
                          {exp.role || "Role"}
                        </p>
                        <span className="text-xs text-gray-500">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        {exp.company || "Company"}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {certifications.filter((c) => c.name.trim()).length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest border-b border-black pb-1 mb-2 text-black">
                    Certifications
                  </h3>
                  {certifications
                    .filter((c) => c.name.trim())
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="mb-2 flex justify-between items-baseline"
                      >
                        <div>
                          <p className="font-semibold text-sm text-black">
                            {cert.name}
                          </p>
                          {cert.issuer && (
                            <p className="text-xs text-gray-600">
                              {cert.issuer}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {cert.year}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              {projects.filter((p) => p.title.trim()).length > 0 && (
                <div className="mb-2">
                  <h3 className="font-bold text-xs uppercase tracking-widest border-b border-black pb-1 mb-2 text-black">
                    Projects
                  </h3>
                  {projects
                    .filter((p) => p.title.trim())
                    .map((proj) => (
                      <div key={proj.id} className="mb-3">
                        <p className="font-semibold text-sm text-black">
                          {proj.title}
                        </p>
                        {proj.technologies && (
                          <p className="text-xs text-gray-600">
                            Technologies: {proj.technologies}
                          </p>
                        )}
                        {proj.description && (
                          <p className="text-xs text-gray-600 mt-0.5">
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              )}

              {!name && !email && skills.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    Fill in your details to see your resume
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right: ATS Score Panel */}
        <div className="space-y-4">
          <Card className="sticky top-4">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <CardTitle className="text-base">ATS Score</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">
                Applicant Tracking System compatibility
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <ScoreRing score={atsScore.total} />
              </div>

              {atsScore.total < 100 && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    To reach 100:
                  </p>
                  {atsScore.breakdown
                    .filter((c) => c.earned < c.max)
                    .map((c) => (
                      <div
                        key={c.label}
                        className="flex items-start gap-2 text-xs"
                      >
                        <span className="mt-0.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                        <span className="text-muted-foreground">{c.tip}</span>
                      </div>
                    ))}
                </div>
              )}

              {atsScore.total === 100 && (
                <div className="flex items-center gap-2 bg-green-500/10 rounded-lg p-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Your resume is 100% ATS-optimised and ready to submit!
                  </p>
                </div>
              )}

              <div className="space-y-2 border-t pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Score breakdown:
                </p>
                {atsScore.breakdown.map((c) => (
                  <div key={c.label}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-muted-foreground truncate">
                        {c.label}
                      </span>
                      <span
                        className={
                          c.earned === c.max
                            ? "text-green-500 font-semibold"
                            : "text-orange-400"
                        }
                      >
                        {c.earned}/{c.max}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(c.earned / c.max) * 100}%`,
                          backgroundColor:
                            c.earned === c.max
                              ? "#22c55e"
                              : c.earned > 0
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full gap-2"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download Resume PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
