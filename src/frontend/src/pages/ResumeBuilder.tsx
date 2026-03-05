import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Plus,
  Printer,
  Save,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
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

export default function ResumeBuilder() {
  const { data: savedProfile, isLoading } = useGetResumeProfile();
  const { mutate: saveResume, isPending } = useSaveResumeProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState<EducationRow[]>([]);
  const [experience, setExperience] = useState<ExperienceRow[]>([]);
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
      setExperience(
        savedProfile.experience.map((e) => ({
          id: uid(),
          ...e,
        })),
      );
    }
  }, [savedProfile]);

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

  function handlePrint() {
    window.print();
  }

  function addSkill() {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
      setNewSkill("");
    }
  }

  function removeSkill(s: string) {
    setSkills((prev) => prev.filter((x) => x !== s));
  }

  function updateEdu(
    id: string,
    field: keyof Omit<EducationRow, "id">,
    val: string,
  ) {
    setEducation((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    );
  }

  function updateExp(
    id: string,
    field: keyof Omit<ExperienceRow, "id">,
    val: string,
  ) {
    setExperience((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
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
              Build your professional resume with live preview
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-1.5"
            data-ocid="resume.print.button"
          >
            <Printer className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isPending || isLoading}
            className="gap-1.5"
            data-ocid="resume.save.button"
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
        <div
          className="flex items-center gap-2 text-muted-foreground"
          data-ocid="resume.loading_state"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading your resume...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div>
          <Tabs defaultValue="personal" data-ocid="resume.tabs">
            <TabsList className="w-full">
              <TabsTrigger
                value="personal"
                className="flex-1"
                data-ocid="resume.personal.tab"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="flex-1"
                data-ocid="resume.skills.tab"
              >
                Skills & Education
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="flex-1"
                data-ocid="resume.experience.tab"
              >
                Experience
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Personal */}
            <TabsContent value="personal" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-ocid="resume.name.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-ocid="resume.email.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      data-ocid="resume.phone.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="summary"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                    >
                      Professional Summary
                    </Label>
                    <Textarea
                      id="summary"
                      rows={4}
                      placeholder="A passionate software developer with experience in..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      data-ocid="resume.summary.textarea"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Skills & Education */}
            <TabsContent value="skills" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g. Java, React)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      data-ocid="resume.skill.input"
                    />
                    <Button
                      size="sm"
                      onClick={addSkill}
                      data-ocid="resume.add-skill.button"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-1.5 pr-1.5 cursor-default"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-destructive transition-colors ml-0.5"
                          aria-label={`Remove ${skill}`}
                          data-ocid="resume.remove-skill.button"
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-display">
                      Education
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEducation((p) => [...p, blankEdu()])}
                      data-ocid="resume.add-education.button"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.length === 0 && (
                    <p
                      className="text-xs text-muted-foreground"
                      data-ocid="resume.education.empty_state"
                    >
                      No education entries. Click Add to get started.
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
                        aria-label="Remove education"
                        data-ocid="resume.education.delete_button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Institution (e.g. IIT Bombay)"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEdu(edu.id, "institution", e.target.value)
                        }
                        data-ocid="resume.education.institution.input"
                      />
                      <Input
                        placeholder="Degree (e.g. B.Tech Computer Science)"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEdu(edu.id, "degree", e.target.value)
                        }
                        data-ocid="resume.education.degree.input"
                      />
                      <Input
                        type="number"
                        placeholder="Year of Graduation (e.g. 2025)"
                        value={edu.year}
                        onChange={(e) =>
                          updateEdu(edu.id, "year", e.target.value)
                        }
                        data-ocid="resume.education.year.input"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: Experience */}
            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-display">
                      Work Experience
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setExperience((p) => [...p, blankExp()])}
                      data-ocid="resume.add-experience.button"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.length === 0 && (
                    <p
                      className="text-xs text-muted-foreground"
                      data-ocid="resume.experience.empty_state"
                    >
                      No experience entries. Click Add to get started.
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
                        aria-label="Remove experience"
                        data-ocid="resume.experience.delete_button"
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
                          data-ocid="resume.experience.company.input"
                        />
                        <Input
                          placeholder="Role / Title"
                          value={exp.role}
                          onChange={(e) =>
                            updateExp(exp.id, "role", e.target.value)
                          }
                          data-ocid="resume.experience.role.input"
                        />
                      </div>
                      <Input
                        placeholder="Duration (e.g. Jan 2024 – Present)"
                        value={exp.duration}
                        onChange={(e) =>
                          updateExp(exp.id, "duration", e.target.value)
                        }
                        data-ocid="resume.experience.duration.input"
                      />
                      <Textarea
                        rows={2}
                        placeholder="Brief description of responsibilities and achievements..."
                        value={exp.description}
                        onChange={(e) =>
                          updateExp(exp.id, "description", e.target.value)
                        }
                        data-ocid="resume.experience.description.textarea"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-4"
        >
          <div
            className="bg-white dark:bg-card border border-border rounded-xl p-6 print:shadow-none print:border-none"
            id="resume-preview"
          >
            {/* Resume Header */}
            <div className="border-b border-border pb-4 mb-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {name || "Your Name"}
              </h2>
              <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
                {email && <span>{email}</span>}
                {phone && <span>{phone}</span>}
              </div>
              {summary && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {summary}
                </p>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-2">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-2">
                  Education
                </h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-semibold text-sm text-foreground">
                        {edu.degree || "Degree"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {edu.institution || "Institution"}
                        {edu.year ? ` · ${edu.year}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-2">
                  Experience
                </h3>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-start justify-between">
                        <p className="font-semibold text-sm text-foreground">
                          {exp.role || "Role"}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs text-primary font-medium">
                        {exp.company || "Company"}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!name && !email && skills.length === 0 && (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="resume.preview.empty_state"
              >
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">
                  Fill in your details to see your resume
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
