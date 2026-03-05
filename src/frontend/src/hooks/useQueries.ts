import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Course,
  JobListing,
  MCQQuestion,
  ResumeProfile,
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
    }: { topicId: string; score: bigint }) => {
      if (!actor) throw new Error("No actor");
      await actor.recordQuizAttempt(topicId, score);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userXP"] });
    },
  });
}

export function useSaveResumeProfile() {
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

// Admin mutations
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
