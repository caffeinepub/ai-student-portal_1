import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  ClipboardList,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DifficultyLevel, JobType } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import {
  useCreateCourse,
  useCreateJobListing,
  useCreateTestTopic,
  useDeleteCourse,
  useDeleteJobListing,
  useDeleteTestTopic,
  useGetAllCourses,
  useGetAllJobListings,
  useGetAllTestTopics,
} from "../hooks/useQueries";

// Course Form
function AddCourseDialog() {
  const { mutate: createCourse, isPending } = useCreateCourse();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    DifficultyLevel.beginner,
  );

  function handleSubmit() {
    if (!title || !youtubeUrl) {
      toast.error("Title and YouTube URL are required.");
      return;
    }
    createCourse(
      {
        title,
        description,
        category,
        youtube_url: youtubeUrl,
        thumbnail_url: "",
        difficulty,
      },
      {
        onSuccess: () => {
          toast.success("Course created!");
          setOpen(false);
          setTitle("");
          setDescription("");
          setCategory("");
          setYoutubeUrl("");
        },
        onError: () => toast.error("Failed to create course."),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" data-ocid="admin.courses.open_modal_button">
          <Plus className="w-4 h-4 mr-1" /> Add Course
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="admin.courses.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Add New Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="c-title" className="text-xs text-muted-foreground">
              Title *
            </Label>
            <Input
              id="c-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Java Programming"
              data-ocid="admin.course.title.input"
            />
          </div>
          <div>
            <Label htmlFor="c-desc" className="text-xs text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="c-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course description..."
              data-ocid="admin.course.description.textarea"
            />
          </div>
          <div>
            <Label htmlFor="c-cat" className="text-xs text-muted-foreground">
              Category
            </Label>
            <Input
              id="c-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Programming"
              data-ocid="admin.course.category.input"
            />
          </div>
          <div>
            <Label htmlFor="c-url" className="text-xs text-muted-foreground">
              YouTube URL *
            </Label>
            <Input
              id="c-url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              data-ocid="admin.course.url.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Difficulty</Label>
            <Select
              value={difficulty}
              onValueChange={(v) => setDifficulty(v as DifficultyLevel)}
            >
              <SelectTrigger data-ocid="admin.course.difficulty.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DifficultyLevel.beginner}>
                  Beginner
                </SelectItem>
                <SelectItem value={DifficultyLevel.intermediate}>
                  Intermediate
                </SelectItem>
                <SelectItem value={DifficultyLevel.advanced}>
                  Advanced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            data-ocid="admin.courses.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            data-ocid="admin.courses.submit_button"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Create Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Job Form
function AddJobDialog() {
  const { mutate: createJob, isPending } = useCreateJobListing();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [applyUrl, setApplyUrl] = useState("");
  const [jobType, setJobType] = useState<JobType>(JobType.full_time);

  function handleSubmit() {
    if (!title || !company) {
      toast.error("Title and Company are required.");
      return;
    }
    createJob(
      {
        title,
        company,
        location,
        description,
        apply_url: applyUrl,
        job_type: jobType,
      },
      {
        onSuccess: () => {
          toast.success("Job listing created!");
          setOpen(false);
          setTitle("");
          setCompany("");
          setLocation("");
          setDescription("");
          setApplyUrl("");
        },
        onError: () => toast.error("Failed to create job listing."),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" data-ocid="admin.jobs.open_modal_button">
          <Plus className="w-4 h-4 mr-1" /> Add Job
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="admin.jobs.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Add Job Listing</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label
                htmlFor="j-title"
                className="text-xs text-muted-foreground"
              >
                Job Title *
              </Label>
              <Input
                id="j-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Frontend Developer"
                data-ocid="admin.job.title.input"
              />
            </div>
            <div>
              <Label
                htmlFor="j-company"
                className="text-xs text-muted-foreground"
              >
                Company *
              </Label>
              <Input
                id="j-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google"
                data-ocid="admin.job.company.input"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="j-loc" className="text-xs text-muted-foreground">
              Location
            </Label>
            <Input
              id="j-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bangalore / Remote"
              data-ocid="admin.job.location.input"
            />
          </div>
          <div>
            <Label htmlFor="j-desc" className="text-xs text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="j-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job description..."
              data-ocid="admin.job.description.textarea"
            />
          </div>
          <div>
            <Label htmlFor="j-url" className="text-xs text-muted-foreground">
              Apply URL
            </Label>
            <Input
              id="j-url"
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder="https://..."
              data-ocid="admin.job.url.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Job Type</Label>
            <Select
              value={jobType}
              onValueChange={(v) => setJobType(v as JobType)}
            >
              <SelectTrigger data-ocid="admin.job.type.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={JobType.full_time}>Full-time</SelectItem>
                <SelectItem value={JobType.internship}>Internship</SelectItem>
                <SelectItem value={JobType.part_time}>Part-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            data-ocid="admin.jobs.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            data-ocid="admin.jobs.submit_button"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Create Listing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Topic Form
function AddTopicDialog() {
  const { mutate: createTopic, isPending } = useCreateTestTopic();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {
    if (!title) {
      toast.error("Title is required.");
      return;
    }
    createTopic(
      { title, description },
      {
        onSuccess: () => {
          toast.success("Topic created!");
          setOpen(false);
          setTitle("");
          setDescription("");
        },
        onError: () => toast.error("Failed to create topic."),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" data-ocid="admin.topics.open_modal_button">
          <Plus className="w-4 h-4 mr-1" /> Add Topic
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="admin.topics.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Add MCQ Topic</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="t-title" className="text-xs text-muted-foreground">
              Title *
            </Label>
            <Input
              id="t-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Java Basics"
              data-ocid="admin.topic.title.input"
            />
          </div>
          <div>
            <Label htmlFor="t-desc" className="text-xs text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="t-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Topic description..."
              data-ocid="admin.topic.description.textarea"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            data-ocid="admin.topics.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            data-ocid="admin.topics.submit_button"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Create Topic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPanel() {
  const { isAdmin, user } = useAuth();
  const { data: courses = [], isLoading: loadingCourses } = useGetAllCourses();
  const { data: jobs = [], isLoading: loadingJobs } = useGetAllJobListings();
  const { data: topics = [], isLoading: loadingTopics } = useGetAllTestTopics();
  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: deleteJob } = useDeleteJobListing();
  const { mutate: deleteTopic } = useDeleteTestTopic();

  // Not admin
  if (!isAdmin) {
    return (
      <div className="p-4 lg:p-8 max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm">
            This page is only accessible to the administrator account.
          </p>
          {user && (
            <p className="text-xs text-muted-foreground mt-1">
              Logged in as: {user.email}
            </p>
          )}
        </div>
        <Badge
          variant="destructive"
          className="text-xs"
          data-ocid="admin.error_state"
        >
          Not an Admin
        </Badge>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage courses, job listings, and MCQ topics
          </p>
        </div>
        <Badge className="ml-auto" data-ocid="admin.success_state">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      </motion.div>

      <Tabs defaultValue="courses">
        <TabsList data-ocid="admin.tabs">
          <TabsTrigger
            value="courses"
            className="gap-1.5"
            data-ocid="admin.courses.tab"
          >
            <BookOpen className="w-4 h-4" />
            Courses ({courses.length})
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="gap-1.5"
            data-ocid="admin.jobs.tab"
          >
            <Briefcase className="w-4 h-4" />
            Jobs ({jobs.length})
          </TabsTrigger>
          <TabsTrigger
            value="topics"
            className="gap-1.5"
            data-ocid="admin.topics.tab"
          >
            <ClipboardList className="w-4 h-4" />
            MCQ Topics ({topics.length})
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">
                  Courses
                </CardTitle>
                <AddCourseDialog />
              </div>
            </CardHeader>
            <CardContent>
              {loadingCourses ? (
                <div
                  className="flex items-center gap-2 text-muted-foreground py-4"
                  data-ocid="admin.courses.loading_state"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : courses.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.courses.empty_state"
                >
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">
                    No courses yet. Add your first course!
                  </p>
                </div>
              ) : (
                <Table data-ocid="admin.courses.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course, i) => (
                      <TableRow
                        key={course.id}
                        data-ocid={`admin.courses.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {course.title}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {course.category}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {course.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive h-8 w-8"
                                data-ocid={`admin.courses.delete_button.${i + 1}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent data-ocid="admin.delete.dialog">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Course?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete &quot;
                                  {course.title}&quot;. This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="admin.delete.cancel_button">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteCourse(course.id, {
                                      onSuccess: () =>
                                        toast.success("Course deleted"),
                                      onError: () =>
                                        toast.error("Failed to delete"),
                                    });
                                  }}
                                  data-ocid="admin.delete.confirm_button"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">
                  Job Listings
                </CardTitle>
                <AddJobDialog />
              </div>
            </CardHeader>
            <CardContent>
              {loadingJobs ? (
                <div
                  className="flex items-center gap-2 text-muted-foreground py-4"
                  data-ocid="admin.jobs.loading_state"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : jobs.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.jobs.empty_state"
                >
                  <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">
                    No job listings yet. Add your first listing!
                  </p>
                </div>
              ) : (
                <Table data-ocid="admin.jobs.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job, i) => (
                      <TableRow
                        key={job.id}
                        data-ocid={`admin.jobs.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {job.title}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {job.company}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {job.location}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {job.job_type.replace("_", "-")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive h-8 w-8"
                                data-ocid={`admin.jobs.delete_button.${i + 1}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent data-ocid="admin.job-delete.dialog">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Job Listing?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete &quot;{job.title}
                                  &quot; at {job.company}. This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="admin.job-delete.cancel_button">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteJob(job.id, {
                                      onSuccess: () =>
                                        toast.success("Job listing deleted"),
                                      onError: () =>
                                        toast.error("Failed to delete"),
                                    });
                                  }}
                                  data-ocid="admin.job-delete.confirm_button"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">
                  MCQ Topics
                </CardTitle>
                <AddTopicDialog />
              </div>
            </CardHeader>
            <CardContent>
              {loadingTopics ? (
                <div
                  className="flex items-center gap-2 text-muted-foreground py-4"
                  data-ocid="admin.topics.loading_state"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : topics.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.topics.empty_state"
                >
                  <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">
                    No topics yet. Add your first MCQ topic!
                  </p>
                </div>
              ) : (
                <Table data-ocid="admin.topics.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topics.map((topic, i) => (
                      <TableRow
                        key={topic.id}
                        data-ocid={`admin.topics.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {topic.title}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                          {topic.description}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive h-8 w-8"
                                data-ocid={`admin.topics.delete_button.${i + 1}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent data-ocid="admin.topic-delete.dialog">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Topic?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the topic &quot;
                                  {topic.title}&quot; and all its questions.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="admin.topic-delete.cancel_button">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteTopic(topic.id, {
                                      onSuccess: () =>
                                        toast.success("Topic deleted"),
                                      onError: () =>
                                        toast.error("Failed to delete"),
                                    });
                                  }}
                                  data-ocid="admin.topic-delete.confirm_button"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
