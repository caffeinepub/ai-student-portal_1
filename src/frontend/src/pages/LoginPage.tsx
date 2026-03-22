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

  // Login / Register state
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("E SIVASANKARA");
  const [email, setEmail] = useState("edagottisivasankara@gmail.com");
  const [password, setPassword] = useState("siva@2004");
  const [showPassword, setShowPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState(
    SECURITY_QUESTIONS[0],
  );
  const [securityAnswer, setSecurityAnswer] = useState("");

  // Forgot Password state
  const [forgotStep, setForgotStep] = useState<ForgotStep>(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [fetchedQuestion, setFetchedQuestion] = useState("");
  const [forgotAnswer, setForgotAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Shared state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── Login / Register Submit ───────────────────────────────────────────────
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

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
    }
  };

  // ─── Forgot Password: Step 1 — fetch security question ────────────────────
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

  // ─── Forgot Password: Step 2 — verify security answer ────────────────────
  const handleForgotStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!forgotAnswer.trim()) {
      setError("Please enter your security answer.");
      return;
    }
    setForgotStep(3);
  };

  // ─── Forgot Password: Step 3 — reset password ────────────────────────────
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
    if (result.success) {
      setForgotSuccess(true);
    } else {
      setError(result.error ?? "Password reset failed.");
    }
  };

  // ─── Mode switch helpers ──────────────────────────────────────────────────
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

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4 py-8"
      data-ocid="login.page"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            AI Student Portal
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Learn · Practice · Grow
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* ── FORGOT PASSWORD FLOW ── */}
          {mode === "forgot" && (
            <>
              {/* Back link */}
              {!forgotSuccess && (
                <button
                  type="button"
                  onClick={backToLogin}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
                  data-ocid="forgot.back.link"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Sign In
                </button>
              )}

              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <KeyRound className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Reset Your Password
                </h2>
              </div>

              {/* Step indicator */}
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

              {/* Success state */}
              {forgotSuccess ? (
                <div
                  className="text-center py-6"
                  data-ocid="forgot.success_state"
                >
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Password Reset!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Your password has been updated successfully. You can now
                    sign in with your new password.
                  </p>
                  <Button
                    className="w-full"
                    onClick={backToLogin}
                    data-ocid="forgot.back.link"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Go to Sign In
                  </Button>
                </div>
              ) : forgotStep === 1 ? (
                /* Step 1: Email */
                <form onSubmit={handleForgotStep1} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter the email address associated with your account and
                    we'll verify your identity.
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
                /* Step 2: Security question answer */
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
                    <p className="text-xs text-muted-foreground">
                      Answer is case-insensitive.
                    </p>
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
                /* Step 3: New password */
                <form onSubmit={handleForgotStep3} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Choose a strong new password for your account.
                  </p>
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
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
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
                      Confirm New Password
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
                  {loading && (
                    <p
                      className="text-sm text-muted-foreground text-center"
                      data-ocid="forgot.loading_state"
                    >
                      Resetting password...
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

          {/* ── LOGIN / REGISTER FLOW ── */}
          {mode !== "forgot" && (
            <>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {mode === "login"
                  ? "Sign in to your account"
                  : "Create your account"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {mode === "login"
                  ? "Enter your student email and password to continue."
                  : "Register with your student email to get started."}
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Security question fields — register only */}
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
                      <p className="text-xs text-muted-foreground">
                        Remember this answer — you'll need it to reset your
                        password.
                      </p>
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
                  className="w-full"
                  disabled={loading}
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

                {/* Forgot Password link — login mode only */}
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

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="ml-1 text-primary font-medium hover:underline"
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
          AI Student Portal &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
