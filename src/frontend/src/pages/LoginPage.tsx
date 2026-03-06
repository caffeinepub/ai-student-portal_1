import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("E SIVASANKARA");
  const [email, setEmail] = useState("edagottisivasankara@gmail.com");
  const [password, setPassword] = useState("siva@2004");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    const result =
      mode === "login"
        ? await login(name, email, password)
        : await register(name, email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
    }
  };

  const switchMode = () => {
    setError("");
    setMode((m) => (m === "login" ? "register" : "login"));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4"
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

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
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          AI Student Portal &copy; 2024
        </p>
      </div>
    </div>
  );
}
