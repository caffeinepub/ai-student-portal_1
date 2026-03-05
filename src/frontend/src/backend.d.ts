import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface MCQQuestion {
    id: string;
    question_text: string;
    topic_id: string;
    correct_option_index: bigint;
    options: Array<string>;
}
export interface QuizAttempt {
    score: bigint;
    timestamp: Time;
    topicId: string;
}
export interface TestTopic {
    id: string;
    title: string;
    description: string;
}
export interface ResumeProfile {
    name: string;
    education: Array<{
        institution: string;
        year: bigint;
        degree: string;
    }>;
    email: string;
    experience: Array<{
        duration: string;
        role: string;
        description: string;
        company: string;
    }>;
    summary: string;
    phone: string;
    skills: Array<string>;
}
export interface JobListing {
    id: string;
    title: string;
    apply_url: string;
    time: Time;
    description: string;
    company: string;
    location: string;
    job_type: JobType;
}
export interface CourseProgress {
    completedAt: Time;
    courseId: string;
}
export interface UserProfile {
    name: string;
}
export interface Course {
    id: string;
    title: string;
    youtube_url: string;
    difficulty: DifficultyLevel;
    description: string;
    thumbnail_url: string;
    category: string;
}
export enum DifficultyLevel {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced"
}
export enum JobType {
    internship = "internship",
    part_time = "part_time",
    full_time = "full_time"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCourse(title: string, description: string, category: string, youtube_url: string, thumbnail_url: string, difficulty: DifficultyLevel): Promise<string>;
    createJobListing(title: string, company: string, location: string, description: string, apply_url: string, job_type: JobType): Promise<string>;
    createQuestion(topicId: string, question_text: string, options: Array<string>, correct_option_index: bigint): Promise<string>;
    createTestTopic(title: string, description: string): Promise<string>;
    deleteCourse(id: string): Promise<void>;
    deleteJobListing(id: string): Promise<void>;
    deleteQuestion(id: string): Promise<void>;
    deleteTestTopic(id: string): Promise<void>;
    getAllCourses(): Promise<Array<Course>>;
    getAllJobListings(): Promise<Array<JobListing>>;
    getAllQuestions(): Promise<Array<MCQQuestion>>;
    getAllTestTopics(): Promise<Array<TestTopic>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourse(id: string): Promise<Course | null>;
    getJobListing(id: string): Promise<JobListing | null>;
    getQuestion(id: string): Promise<MCQQuestion | null>;
    getQuestionsByTopic(topicId: string): Promise<Array<MCQQuestion>>;
    getTestTopic(id: string): Promise<TestTopic | null>;
    getUserCourseProgress(user: Principal): Promise<Array<CourseProgress>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserQuizAttempts(user: Principal): Promise<Array<QuizAttempt>>;
    getUserXP(user: Principal): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    recordCourseCompletion(courseId: string): Promise<void>;
    recordQuizAttempt(topicId: string, score: bigint): Promise<void>;
    resumeProfile(user: Principal): Promise<ResumeProfile | null>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveResumeProfile(profile: ResumeProfile): Promise<void>;
    updateCourse(id: string, title: string, description: string, category: string, youtube_url: string, thumbnail_url: string, difficulty: DifficultyLevel): Promise<void>;
    updateJobListing(id: string, title: string, company: string, location: string, description: string, apply_url: string, job_type: JobType): Promise<void>;
    updateQuestion(id: string, topicId: string, question_text: string, options: Array<string>, correct_option_index: bigint): Promise<void>;
    updateTestTopic(id: string, title: string, description: string): Promise<void>;
    updateXP(xp: bigint): Promise<void>;
}
