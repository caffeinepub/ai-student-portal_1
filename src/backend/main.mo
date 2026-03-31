import Set "mo:core/Set";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Course {
    public func compare(course1 : Course, course2 : Course) : Order.Order {
      Text.compare(course1.title, course2.title);
    };
  };

  module TestTopic {
    public func compare(topic1 : TestTopic, topic2 : TestTopic) : Order.Order {
      Text.compare(topic1.title, topic2.title);
    };
  };

  module JobListing {
    public func compare(job1 : JobListing, job2 : JobListing) : Order.Order {
      switch (Text.compare(job1.company, job2.company)) {
        case (#equal) { Int.compare(job1.time, job2.time) };
        case (order) { order };
      };
    };
  };

  module CourseProgress {
    public func compare(cp1 : CourseProgress, cp2 : CourseProgress) : Order.Order {
      switch (Int.compare(cp2.completedAt, cp1.completedAt)) {
        case (#equal) { Text.compare(cp2.courseId, cp1.courseId) };
        case (order) { order };
      };
    };
  };

  module StudentAccount {
    public func compare(a : StudentAccount, b : StudentAccount) : Order.Order {
      Int.compare(b.registeredAt, a.registeredAt);
    };
  };

  type DifficultyLevel = {
    #beginner;
    #intermediate;
    #advanced;
  };

  type Course = {
    id : Text;
    title : Text;
    description : Text;
    category : Text;
    youtube_url : Text;
    thumbnail_url : Text;
    difficulty : DifficultyLevel;
  };

  type TestTopic = {
    id : Text;
    title : Text;
    description : Text;
  };

  type MCQQuestion = {
    id : Text;
    topic_id : Text;
    question_text : Text;
    options : [Text];
    correct_option_index : Nat;
  };

  type JobType = {
    #full_time;
    #part_time;
    #internship;
  };

  type JobListing = {
    id : Text;
    title : Text;
    company : Text;
    location : Text;
    description : Text;
    apply_url : Text;
    job_type : JobType;
    time : Time.Time;
  };

  type ResumeProfile = {
    name : Text;
    email : Text;
    phone : Text;
    summary : Text;
    skills : [Text];
    education : [{
      institution : Text;
      degree : Text;
      year : Nat;
    }];
    experience : [{
      company : Text;
      role : Text;
      duration : Text;
      description : Text;
    }];
  };

  type UserProfile = {
    name : Text;
  };

  public type StudentAccount = {
    name : Text;
    email : Text;
    passwordHash : Text;
    registeredAt : Time.Time;
    securityQuestion : Text;
    securityAnswerHash : Text;
  };

  type CourseProgress = {
    courseId : Text;
    completedAt : Time.Time;
  };

  type JobApplication = {
    id : Text;
    jobId : Text;
    name : Text;
    email : Text;
    phone : Text;
    coverLetter : Text;
    principal : Principal;
    timestamp : Time.Time;
  };

  var totalCoursesCreated = 0;
  var totalTopicsCreated = 0;
  var totalQuestionsCreated = 0;
  var totalJobsCreated = 0;
  var totalApplications = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type QuizAttempt = {
    topicId : Text;
    score : Nat;
    timestamp : Time.Time;
  };

  let courses = Map.empty<Text, Course>();
  let testTopics = Map.empty<Text, TestTopic>();
  let mcqQuestions = Map.empty<Text, MCQQuestion>();
  let jobListings = Map.empty<Text, JobListing>();
  let resumes = Map.empty<Principal, ResumeProfile>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let applications = Map.empty<Text, JobApplication>();

  let studentAccounts = Map.empty<Text, StudentAccount>();

  let userXP = Map.empty<Principal, Nat>();
  let quizAttempts = Map.empty<Principal, List.List<QuizAttempt>>();
  let courseProgress = Map.empty<Principal, List.List<CourseProgress>>();

  // Rate limiting for password reset attempts
  type ResetAttempt = {
    email : Text;
    timestamp : Time.Time;
    failedAttempts : Nat;
  };
  let resetAttempts = Map.empty<Text, ResetAttempt>();

  // Helper function to generate application id
  func generateApplicationId() : Text {
    totalApplications += 1;
    "application_" # totalApplications.toText();
  };

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Student Account Management
  public shared ({ caller }) func registerStudent(name : Text, email : Text, passwordHash : Text, securityQuestion : Text, securityAnswerHash : Text) : async { #ok; #emailTaken; #invalidInput } {
    if (name.size() == 0 or email.size() == 0 or passwordHash.size() == 0 or securityQuestion.size() == 0 or securityAnswerHash.size() == 0) {
      return #invalidInput;
    };

    let emailLower = email.toLower();

    if (studentAccounts.containsKey(emailLower)) {
      return #emailTaken;
    };

    let account : StudentAccount = {
      name;
      email = emailLower;
      passwordHash;
      registeredAt = Time.now();
      securityQuestion;
      securityAnswerHash;
    };

    studentAccounts.add(emailLower, account);
    #ok;
  };

  public shared ({ caller }) func loginStudent(email : Text, passwordHash : Text) : async ?StudentAccount {
    let emailLower = email.toLower();

    switch (studentAccounts.get(emailLower)) {
      case (null) { null };
      case (?account) {
        if (account.passwordHash == passwordHash) {
          ?account;
        } else {
          null;
        };
      };
    };
  };

  public query ({ caller }) func getSecurityQuestion(email : Text) : async ?Text {
    let emailLower = email.toLower();
    switch (studentAccounts.get(emailLower)) {
      case (null) { null };
      case (?account) { ?account.securityQuestion };
    };
  };

  // Helper function to check rate limiting
  func checkRateLimit(email : Text) : Bool {
    let emailLower = email.toLower();
    let now = Time.now();
    let fiveMinutesInNanos : Int = 5 * 60 * 1_000_000_000;

    switch (resetAttempts.get(emailLower)) {
      case (null) { true };
      case (?attempt) {
        let timeSinceLastAttempt = now - attempt.timestamp;
        if (timeSinceLastAttempt > fiveMinutesInNanos) {
          // Reset counter after 5 minutes
          true;
        } else if (attempt.failedAttempts >= 5) {
          // Too many failed attempts within 5 minutes
          false;
        } else {
          true;
        };
      };
    };
  };

  // Helper function to record reset attempt
  func recordResetAttempt(email : Text, success : Bool) {
    let emailLower = email.toLower();
    let now = Time.now();

    if (success) {
      // Clear attempts on success
      resetAttempts.remove(emailLower);
    } else {
      // Increment failed attempts
      let newAttempt : ResetAttempt = switch (resetAttempts.get(emailLower)) {
        case (null) {
          { email = emailLower; timestamp = now; failedAttempts = 1 };
        };
        case (?existing) {
          let timeSinceLastAttempt = now - existing.timestamp;
          let fiveMinutesInNanos : Int = 5 * 60 * 1_000_000_000;
          
          if (timeSinceLastAttempt > fiveMinutesInNanos) {
            // Reset counter if more than 5 minutes passed
            { email = emailLower; timestamp = now; failedAttempts = 1 };
          } else {
            // Increment counter
            { email = emailLower; timestamp = now; failedAttempts = existing.failedAttempts + 1 };
          };
        };
      };
      resetAttempts.add(emailLower, newAttempt);
    };
  };

  public shared ({ caller }) func resetPasswordWithSecurityAnswer(email : Text, securityAnswerHash : Text, newPasswordHash : Text) : async {
    #ok;
    #notFound;
    #wrongAnswer;
    #rateLimited;
  } {
    let emailLower = email.toLower();

    // Check rate limiting to prevent brute force attacks
    if (not checkRateLimit(emailLower)) {
      return #rateLimited;
    };

    switch (studentAccounts.get(emailLower)) {
      case (null) { 
        recordResetAttempt(emailLower, false);
        #notFound 
      };
      case (?account) {
        if (account.securityAnswerHash != securityAnswerHash) {
          recordResetAttempt(emailLower, false);
          return #wrongAnswer;
        };
        
        // Security answer is correct, update password
        let updatedAccount : StudentAccount = {
          account with passwordHash = newPasswordHash;
        };
        studentAccounts.add(emailLower, updatedAccount);
        recordResetAttempt(emailLower, true);
        #ok;
      };
    };
  };

  public shared ({ caller }) func getAllStudents() : async [StudentAccount] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all students");
    };

    studentAccounts.values().toArray().sort();
  };

  public shared ({ caller }) func deleteStudent(email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete students");
    };

    let emailLower = email.toLower();
    if (not studentAccounts.containsKey(emailLower)) {
      Runtime.trap("Student not found");
    };
    studentAccounts.remove(emailLower);
  };

  public query func getStudentCount() : async Nat {
    studentAccounts.size();
  };

  // Courses
  func generateCourseId() : Text {
    totalCoursesCreated += 1;
    "course_" # totalCoursesCreated.toText();
  };

  public shared ({ caller }) func createCourse(title : Text, description : Text, category : Text, youtube_url : Text, thumbnail_url : Text, difficulty : DifficultyLevel) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create courses");
    };

    let id = generateCourseId();
    let course : Course = {
      id;
      title;
      description;
      category;
      youtube_url;
      thumbnail_url;
      difficulty;
    };
    courses.add(id, course);
    id;
  };

  public shared ({ caller }) func updateCourse(id : Text, title : Text, description : Text, category : Text, youtube_url : Text, thumbnail_url : Text, difficulty : DifficultyLevel) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };

    switch (courses.get(id)) {
      case (null) {
        Runtime.trap("Course not found");
      };
      case (?_) {
        let course : Course = {
          id;
          title;
          description;
          category;
          youtube_url;
          thumbnail_url;
          difficulty;
        };
        courses.add(id, course);
      };
    };
  };

  public shared ({ caller }) func deleteCourse(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };

    if (not courses.containsKey(id)) {
      Runtime.trap("Course not found");
    };
    courses.remove(id);
  };

  public query ({ caller }) func getCourse(id : Text) : async ?Course {
    courses.get(id);
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray().sort();
  };

  // Test Topics, Questions
  func generateTopicId() : Text {
    totalTopicsCreated += 1;
    "topic_" # totalTopicsCreated.toText();
  };

  func generateQuestionId() : Text {
    totalQuestionsCreated += 1;
    "question_" # totalQuestionsCreated.toText();
  };

  public shared ({ caller }) func createTestTopic(title : Text, description : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create test topics");
    };

    let id = generateTopicId();
    let topic : TestTopic = {
      id;
      title;
      description;
    };
    testTopics.add(id, topic);
    id;
  };

  public shared ({ caller }) func updateTestTopic(id : Text, title : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update test topics");
    };

    switch (testTopics.get(id)) {
      case (null) {
        Runtime.trap("Test topic not found");
      };
      case (?_) {
        testTopics.add(id, { id; title; description });
      };
    };
  };

  public shared ({ caller }) func deleteTestTopic(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete test topics");
    };

    if (not testTopics.containsKey(id)) {
      Runtime.trap("Test topic not found");
    };
    testTopics.remove(id);
  };

  public query ({ caller }) func getTestTopic(id : Text) : async ?TestTopic {
    testTopics.get(id);
  };

  public query ({ caller }) func getAllTestTopics() : async [TestTopic] {
    testTopics.values().toArray().sort();
  };

  public query ({ caller }) func getQuestionsByTopic(topicId : Text) : async [MCQQuestion] {
    switch (testTopics.get(topicId)) {
      case (null) {
        Runtime.trap("Topic not found");
      };
      case (?_) {
        mcqQuestions.values().toArray().filter(func(q) { q.topic_id == topicId });
      };
    };
  };

  public shared ({ caller }) func createQuestion(topicId : Text, question_text : Text, options : [Text], correct_option_index : Nat) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create questions");
    };

    if (options.size() != 4) {
      Runtime.trap("Exactly 4 options are required");
    };

    switch (testTopics.get(topicId)) {
      case (null) {
        Runtime.trap("Topic not found");
      };
      case (?_) {
        let id = generateQuestionId();
        let question : MCQQuestion = {
          id;
          topic_id = topicId;
          question_text;
          options;
          correct_option_index;
        };
        mcqQuestions.add(id, question);
        id;
      };
    };
  };

  public shared ({ caller }) func updateQuestion(id : Text, topicId : Text, question_text : Text, options : [Text], correct_option_index : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update questions");
    };

    switch (testTopics.get(topicId)) {
      case (null) {
        Runtime.trap("Topic not found");
      };
      case (?_) {
        switch (mcqQuestions.get(id)) {
          case (null) {
            Runtime.trap("Question not found");
          };
          case (?_) {
            let question : MCQQuestion = {
              id;
              topic_id = topicId;
              question_text;
              options;
              correct_option_index;
            };
            mcqQuestions.add(id, question);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deleteQuestion(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete questions");
    };

    if (not mcqQuestions.containsKey(id)) {
      Runtime.trap("Question not found");
    };
    mcqQuestions.remove(id);
  };

  public query ({ caller }) func getQuestion(id : Text) : async ?MCQQuestion {
    mcqQuestions.get(id);
  };

  public query ({ caller }) func getAllQuestions() : async [MCQQuestion] {
    mcqQuestions.values().toArray();
  };

  // User Progress, XP, Quizzes & Courses
  public shared ({ caller }) func updateXP(xp : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update XP");
    };

    switch (userXP.get(caller)) {
      case (null) { userXP.add(caller, xp) };
      case (?existing) { userXP.add(caller, existing + xp) };
    };
  };

  public shared ({ caller }) func recordQuizAttempt(topicId : Text, score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record quiz attempts");
    };

    let attempt : QuizAttempt = {
      topicId;
      score;
      timestamp = Time.now();
    };

    let existingAttempts = switch (quizAttempts.get(caller)) {
      case (null) { List.empty<QuizAttempt>() };
      case (?a) { a };
    };

    existingAttempts.add(attempt);
    quizAttempts.add(caller, existingAttempts);

    let xpEarned = score * 10;
    switch (userXP.get(caller)) {
      case (null) { userXP.add(caller, xpEarned) };
      case (?existing) { userXP.add(caller, existing + xpEarned) };
    };
  };

  public shared ({ caller }) func recordCourseCompletion(courseId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record course completion");
    };

    let progress : CourseProgress = {
      courseId;
      completedAt = Time.now();
    };

    let existingProgress = switch (courseProgress.get(caller)) {
      case (null) { List.empty<CourseProgress>() };
      case (?p) { p };
    };

    existingProgress.add(progress);
    courseProgress.add(caller, existingProgress);

    switch (userXP.get(caller)) {
      case (null) { userXP.add(caller, 100) };
      case (?existing) { userXP.add(caller, existing + 100) };
    };
  };

  public query ({ caller }) func getUserXP(user : Principal) : async Nat {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own XP");
    };

    switch (userXP.get(user)) {
      case (null) { 0 };
      case (?xp) { xp };
    };
  };

  public query ({ caller }) func getUserQuizAttempts(user : Principal) : async [QuizAttempt] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own quiz attempts");
    };

    switch (quizAttempts.get(user)) {
      case (null) { [] };
      case (?attemptsList) { attemptsList.toArray() };
    };
  };

  public query ({ caller }) func getUserCourseProgress(user : Principal) : async [CourseProgress] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own course progress");
    };

    switch (courseProgress.get(user)) {
      case (null) { [] };
      case (?progressList) { progressList.toArray().sort() };
    };
  };

  // Job Listings
  func generateJobId() : Text {
    totalJobsCreated += 1;
    "job_" # totalJobsCreated.toText();
  };

  public shared ({ caller }) func createJobListing(title : Text, company : Text, location : Text, description : Text, apply_url : Text, job_type : JobType) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create job listings");
    };

    let id = generateJobId();
    let job : JobListing = {
      id;
      title;
      company;
      location;
      description;
      apply_url;
      job_type;
      time = Time.now();
    };
    jobListings.add(id, job);
    id;
  };

  public shared ({ caller }) func updateJobListing(id : Text, title : Text, company : Text, location : Text, description : Text, apply_url : Text, job_type : JobType) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update job listings");
    };

    switch (jobListings.get(id)) {
      case (null) {
        Runtime.trap("Job listing not found");
      };
      case (?_) {
        let job : JobListing = {
          id;
          title;
          company;
          location;
          description;
          apply_url;
          job_type;
          time = Time.now();
        };
        jobListings.add(id, job);
      };
    };
  };

  public shared ({ caller }) func deleteJobListing(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete job listings");
    };

    if (not jobListings.containsKey(id)) {
      Runtime.trap("Job listing not found");
    };
    jobListings.remove(id);
  };

  public query ({ caller }) func getJobListing(id : Text) : async ?JobListing {
    jobListings.get(id);
  };

  public query ({ caller }) func getAllJobListings() : async [JobListing] {
    jobListings.values().toArray().sort();
  };

  // Resume Profiles
  public shared ({ caller }) func saveResumeProfile(profile : ResumeProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save resume profiles");
    };

    resumes.add(caller, profile);
  };

  public query ({ caller }) func resumeProfile(user : Principal) : async ?ResumeProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own resume");
    };

    resumes.get(user);
  };

  // Job Application System
  // No ICP role check: students use custom email/password auth, not ICP identity.
  // Duplicate prevention uses email + jobId so each student applies once per job.
  public shared ({ caller }) func applyForJob(jobId : Text, name : Text, email : Text, phone : Text, coverLetter : Text) : async Text {
    // Validate required fields
    if (name.size() == 0 or email.size() == 0 or phone.size() == 0 or coverLetter.size() == 0) {
      Runtime.trap("All fields are required");
    };

    // Prevent duplicate applications from same email for same job
    let alreadyApplied = applications.values().toArray().filter(
      func(app : JobApplication) : Bool {
        app.email == email and app.jobId == jobId
      }
    ).size() > 0;

    if (alreadyApplied) {
      Runtime.trap("You have already applied for this job");
    };

    let applicationId = generateApplicationId();
    let newApplication : JobApplication = {
      id = applicationId;
      jobId;
      name;
      email;
      phone;
      coverLetter;
      principal = caller;
      timestamp = Time.now();
    };

    applications.add(applicationId, newApplication);
    applicationId;
  };

  // Returns applications for this caller.
  // Note: students use custom auth so principal may be anonymous;
  // the frontend also tracks applications via localStorage for reliability.
  public query ({ caller }) func getMyApplications() : async [JobApplication] {
    applications.values().toArray().filter(func(app) { app.principal == caller });
  };

  public query ({ caller }) func getAllApplications() : async [JobApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all applications");
    };

    applications.values().toArray();
  };

  public query ({ caller }) func getApplicationsByJob(jobId : Text) : async [JobApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view applications by job");
    };

    applications.values().toArray().filter(func(app) { app.jobId == jobId });
  };
};
