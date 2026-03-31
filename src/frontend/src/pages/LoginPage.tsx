import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useAuth } from "../hooks/useAuth";

type Mode = "login" | "register" | "forgot";
type ForgotStep = 1 | 2 | 3;

const SECURITY_QUESTIONS = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your favorite teacher's name?",
  "What is the name of your primary school?",
];

export default function LoginPage() {
  const { login, register, resetPassword } = useAuth();
  const { actor } = useActor();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("E SIVASANKARA");
  const [email, setEmail] = useState("edagottisivasankara@gmail.com");
  const [password, setPassword] = useState("siva@2004");
  const [showPassword, setShowPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState(
    SECURITY_QUESTIONS[0],
  );
  const [securityAnswer, setSecurityAnswer] = useState("");

  const [forgotStep, setForgotStep] = useState<ForgotStep>(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [fetchedQuestion, setFetchedQuestion] = useState("");
  const [forgotAnswer, setForgotAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (mode === "register") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (!securityAnswer.trim()) {
        setError("Please provide a security answer.");
        return;
      }
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setLoading(true);
    const result =
      mode === "login"
        ? await login(name, email, password)
        : await register(
            name,
            email,
            password,
            securityQuestion,
            securityAnswer,
          );
    setLoading(false);
    if (!result.success) setError(result.error ?? "Something went wrong.");
  };

  const handleForgotStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!forgotEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!actor) {
      setError("Connecting to server, please try again.");
      return;
    }
    setLoading(true);
    try {
      const question = await actor.getSecurityQuestion(
        forgotEmail.trim().toLowerCase(),
      );
      if (!question) {
        setError("No account found with this email address.");
        setLoading(false);
        return;
      }
      setFetchedQuestion(question);
      setForgotStep(2);
    } catch {
      setError("Failed to fetch security question. Please try again.");
    }
    setLoading(false);
  };

  const handleForgotStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!forgotAnswer.trim()) {
      setError("Please enter your security answer.");
      return;
    }
    setForgotStep(3);
  };

  const handleForgotStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }
    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = await resetPassword(forgotEmail, forgotAnswer, newPassword);
    setLoading(false);
    if (result.success) setForgotSuccess(true);
    else setError(result.error ?? "Password reset failed.");
  };

  const switchMode = () => {
    setError("");
    setMode((m) => (m === "login" ? "register" : "login"));
  };
  const enterForgot = () => {
    setError("");
    setForgotStep(1);
    setForgotEmail("");
    setFetchedQuestion("");
    setForgotAnswer("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotSuccess(false);
    setMode("forgot");
  };
  const backToLogin = () => {
    setError("");
    setMode("login");
  };

  return (
    <div className="min-h-screen flex bg-background" data-ocid="login.page">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 portal-gradient p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white font-display font-bold text-lg leading-tight">
                Student Portal
              </p>
              <p className="text-white/60 text-xs">Learn · Build · Achieve</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-white font-display font-bold text-4xl leading-tight">
              Your gateway to
              <br />
              <span className="text-white/80">learning & growth</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Master programming, ace interviews, build your resume, and launch
              your tech career — all in one place.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { label: "Courses", value: "10+" },
            { label: "MCQ Topics", value: "7" },
            { label: "Coding Problems", value: "1080+" },
            { label: "Job Listings", value: "30" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
            >
              <p className="text-white font-display font-bold text-2xl">
                {item.value}
              </p>
              <p className="text-white/60 text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="logo-badge w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-2xl text-gradient">
              Student Portal
            </h1>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Your gateway to learning, coding, and career growth
            </p>
          </div>

          {/* Desktop heading above card */}
          <div className="hidden lg:block mb-8">
            <h1 className="font-display font-bold text-3xl text-gradient mb-1">
              Student Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Your gateway to learning, coding, and career growth
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl shadow-xl p-8 animate-fade-in-up">
            {/* FORGOT PASSWORD FLOW */}
            {mode === "forgot" && (
              <>
                {!forgotSuccess && (
                  <button
                    type="button"
                    onClick={backToLogin}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
                    data-ocid="forgot.back.link"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </button>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <KeyRound className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Reset Your Password
                  </h2>
                </div>
                {!forgotSuccess && (
                  <div className="flex items-center gap-2 mb-5 mt-2">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                            forgotStep === s
                              ? "bg-primary text-primary-foreground"
                              : forgotStep > s
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {forgotStep > s ? "✓" : s}
                        </div>
                        {s < 3 && (
                          <div
                            className={`h-0.5 w-8 rounded transition-colors ${forgotStep > s ? "bg-primary/40" : "bg-muted"}`}
                          />
                        )}
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground ml-1">
                      {forgotStep === 1 && "Enter your email"}
                      {forgotStep === 2 && "Answer security question"}
                      {forgotStep === 3 && "Create new password"}
                    </p>
                  </div>
                )}
                {forgotSuccess ? (
                  <div
                    className="text-center py-6"
                    data-ocid="forgot.success_state"
                  >
                    <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">
                      Password Reset!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Your password has been updated successfully.
                    </p>
                    <Button
                      className="w-full"
                      onClick={backToLogin}
                      data-ocid="forgot.back.link"
                    >
                      <LogIn className="w-4 h-4 mr-2" /> Go to Sign In
                    </Button>
                  </div>
                ) : forgotStep === 1 ? (
                  <form onSubmit={handleForgotStep1} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Enter the email address associated with your account.
                    </p>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="forgot-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="your@email.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        data-ocid="forgot.email.input"
                      />
                    </div>
                    {error && (
                      <p
                        className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
                        data-ocid="forgot.error_state"
                      >
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                      data-ocid="forgot.continue.button"
                    >
                      {loading ? "Checking..." : "Continue"}
                    </Button>
                  </form>
                ) : forgotStep === 2 ? (
                  <form onSubmit={handleForgotStep2} className="space-y-4">
                    <div className="bg-muted/50 border border-border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                        Security Question
                      </p>
                      <p className="text-sm text-foreground font-medium">
                        {fetchedQuestion}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="forgot-answer"
                        className="text-sm font-medium"
                      >
                        Your Answer
                      </Label>
                      <Input
                        id="forgot-answer"
                        type="text"
                        placeholder="Enter your answer"
                        value={forgotAnswer}
                        onChange={(e) => setForgotAnswer(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        data-ocid="forgot.answer.input"
                      />
                    </div>
                    {error && (
                      <p
                        className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
                        data-ocid="forgot.error_state"
                      >
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                      data-ocid="forgot.verify.button"
                    >
                      Verify
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotStep3} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="new-password"
                        className="text-sm font-medium"
                      >
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          autoComplete="new-password"
                          className="pr-10"
                          autoFocus
                          data-ocid="forgot.new_password.input"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowNewPassword((v) => !v)}
                          tabIndex={-1}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="confirm-password"
                        className="text-sm font-medium"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        data-ocid="forgot.confirm_password.input"
                      />
                    </div>
                    {error && (
                      <p
                        className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
                        data-ocid="forgot.error_state"
                      >
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                      data-ocid="forgot.reset.submit_button"
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </form>
                )}
              </>
            )}

            {/* LOGIN / REGISTER FLOW */}
            {mode !== "forgot" && (
              <>
                <h2 className="text-lg font-display font-bold text-foreground mb-1">
                  {mode === "login" ? "Welcome back!" : "Create your account"}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {mode === "login"
                    ? "Sign in to continue your learning journey."
                    : "Join the Student Portal and start learning today."}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-ocid="login.form"
                >
                  {mode === "register" && (
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="E SIVASANKARA"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        data-ocid="login.name.input"
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Student Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="edagottisivasankara@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      data-ocid="login.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={
                          mode === "login" ? "current-password" : "new-password"
                        }
                        className="pr-10"
                        data-ocid="login.password.input"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {mode === "register" && (
                    <>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="security-question"
                          className="text-sm font-medium"
                        >
                          Security Question
                        </Label>
                        <select
                          id="security-question"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
                          value={securityQuestion}
                          onChange={(e) => setSecurityQuestion(e.target.value)}
                          data-ocid="register.security_question.select"
                        >
                          {SECURITY_QUESTIONS.map((q) => (
                            <option
                              key={q}
                              value={q}
                              className="bg-card text-foreground"
                            >
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="security-answer"
                          className="text-sm font-medium"
                        >
                          Security Answer
                        </Label>
                        <Input
                          id="security-answer"
                          type="text"
                          placeholder="Your answer (case-insensitive)"
                          value={securityAnswer}
                          onChange={(e) => setSecurityAnswer(e.target.value)}
                          autoComplete="off"
                          data-ocid="register.security_answer.input"
                        />
                      </div>
                    </>
                  )}

                  {error && (
                    <p
                      className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
                      data-ocid="login.error_state"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full font-semibold"
                    disabled={loading}
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.50 0.22 260), oklch(0.55 0.18 290))",
                    }}
                    data-ocid="login.submit_button"
                  >
                    {loading ? (
                      "Please wait..."
                    ) : mode === "login" ? (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>

                  {mode === "login" && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={enterForgot}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                        data-ocid="login.forgot_password.link"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  )}
                </form>

                <div className="mt-5 pt-5 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    {mode === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="ml-1 text-primary font-semibold hover:underline"
                      data-ocid="login.switch_mode.button"
                    >
                      {mode === "login" ? "Create Account" : "Sign In"}
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} Student Portal. Built with{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
