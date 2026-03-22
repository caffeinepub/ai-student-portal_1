import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Course,
  JobApplication,
  JobListing,
  MCQQuestion,
  ResumeProfile,
  StudentAccount,
  TestTopic,
} from "../backend.d";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllCourses();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllJobListings() {
  const { actor, isFetching } = useActor();
  return useQuery<JobListing[]>({
    queryKey: ["jobListings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllJobListings();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60000,
  });
}

export function useGetAllTestTopics() {
  const { actor, isFetching } = useActor();
  return useQuery<TestTopic[]>({
    queryKey: ["testTopics"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllTestTopics();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetQuestionsByTopic(topicId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<MCQQuestion[]>({
    queryKey: ["questions", topicId],
    queryFn: async () => {
      if (!actor || !topicId) return [];
      try {
        return await actor.getQuestionsByTopic(topicId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!topicId,
  });
}

export function useGetUserXP() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<bigint>({
    queryKey: ["userXP", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return BigInt(0);
      try {
        return await actor.getUserXP(identity.getPrincipal());
      } catch {
        return BigInt(0);
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetResumeProfile() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<ResumeProfile | null>({
    queryKey: ["resumeProfile", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return null;
      try {
        return await actor.resumeProfile(identity.getPrincipal());
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<boolean>({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useRecordCourseCompletion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!actor) throw new Error("No actor");
      await actor.recordCourseCompletion(courseId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userXP"] });
    },
  });
}

export function useRecordQuizAttempt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      topicId,
      score,
    }: {
      topicId: string;
      score: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.recordQuizAttempt(topicId, score);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userXP"] });
    },
  });
}

export function useUpdateResumeProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: ResumeProfile) => {
      if (!actor) throw new Error("No actor");
      await actor.saveResumeProfile(profile);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["resumeProfile"] });
    },
  });
}

export function useSaveResumeProfile() {
  return useUpdateResumeProfile();
}

export function useCreateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
      youtube_url: string;
      thumbnail_url: string;
      difficulty: import("../backend.d").DifficultyLevel;
    }) => {
      if (!actor) throw new Error("No actor");
      return await actor.createCourse(
        data.title,
        data.description,
        data.category,
        data.youtube_url,
        data.thumbnail_url,
        data.difficulty,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteCourse(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useCreateJobListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      company: string;
      location: string;
      description: string;
      apply_url: string;
      job_type: import("../backend.d").JobType;
    }) => {
      if (!actor) throw new Error("No actor");
      return await actor.createJobListing(
        data.title,
        data.company,
        data.location,
        data.description,
        data.apply_url,
        data.job_type,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["jobListings"] });
    },
  });
}

export function useDeleteJobListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteJobListing(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["jobListings"] });
    },
  });
}

export function useCreateTestTopic() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      if (!actor) throw new Error("No actor");
      return await actor.createTestTopic(data.title, data.description);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["testTopics"] });
    },
  });
}

export function useDeleteTestTopic() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteTestTopic(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["testTopics"] });
    },
  });
}

// Student queries (admin)
export function useGetAllStudents() {
  const { actor, isFetching } = useActor();
  return useQuery<StudentAccount[]>({
    queryKey: ["students"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllStudents();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStudentCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["studentCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      try {
        return await actor.getStudentCount();
      } catch {
        return BigInt(0);
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteStudent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteStudent(email);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["students"] });
      void queryClient.invalidateQueries({ queryKey: ["studentCount"] });
    },
  });
}

// Job Application queries
export function useApplyForJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      jobId: string;
      name: string;
      email: string;
      phone: string;
      coverLetter: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return await actor.applyForJob(
        data.jobId,
        data.name,
        data.email,
        data.phone,
        data.coverLetter,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      void queryClient.invalidateQueries({ queryKey: ["allApplications"] });
    },
  });
}

export function useGetMyApplications() {
  const { actor, isFetching } = useActor();
  return useQuery<JobApplication[]>({
    queryKey: ["myApplications"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyApplications();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllApplications() {
  const { actor, isFetching } = useActor();
  return useQuery<JobApplication[]>({
    queryKey: ["allApplications"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllApplications();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetApplicationsByJob(jobId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<JobApplication[]>({
    queryKey: ["applicationsByJob", jobId],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      try {
        return await actor.getApplicationsByJob(jobId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!jobId,
  });
}
