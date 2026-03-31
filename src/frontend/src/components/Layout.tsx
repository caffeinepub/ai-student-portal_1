import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  ClipboardList,
  Code2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useAuth } from "../hooks/useAuth";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/courses", label: "Courses", icon: BookOpen },
  { path: "/mcq", label: "MCQ Tests", icon: ClipboardList },
  { path: "/coding", label: "Coding", icon: Code2 },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/resume", label: "Resume Builder", icon: FileText },
] as const;

function XPBadge() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const { data: xp } = useQuery({
    queryKey: ["xp", identity?.getPrincipal().toString()],
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

  const xpVal = xp ? Number(xp) : 0;

  return (
    <div
      className="xp-badge flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
      data-ocid="header.xp-badge"
    >
      <Zap className="w-3.5 h-3.5" />
      <span>{xpVal} XP</span>
    </div>
  );
}

export default function Layout() {
  const { theme, setTheme } = useTheme();
  useInternetIdentity();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-20 lg:hidden w-full h-full border-0 cursor-default"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo / Branding */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="logo-badge w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-base text-gradient leading-tight truncate">
              Student Portal
            </h1>
            <p className="text-[10px] text-sidebar-foreground/50 font-medium tracking-wide">
              Learn · Build · Achieve
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive =
              path === "/" ? currentPath === "/" : currentPath.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                data-ocid={`nav.${label.toLowerCase().replace(/\s+/g, "-")}.link`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 sidebar-glow-item ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-[3px] border-primary pl-[calc(0.75rem-3px)] font-semibold"
                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-primary" : "text-sidebar-foreground/50"
                  }`}
                />
                {label}
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
          {user && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-sidebar-accent">
                <div className="w-7 h-7 rounded-full logo-badge flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-sidebar-foreground font-semibold truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-sidebar-foreground/40 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
                onClick={() => logout()}
                data-ocid="nav.logout.button"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 lg:px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="header.menu.button"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Mobile: show portal title */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="logo-badge w-6 h-6 rounded-md flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-gradient">
              Student Portal
            </span>
          </div>

          <div className="hidden lg:block">
            <h2 className="font-display font-bold text-foreground text-sm">
              Student Portal
            </h2>
            <p className="text-[10px] text-muted-foreground">
              Learn · Build · Achieve
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <XPBadge />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
              data-ocid="header.theme.toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {user && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/8 border border-primary/15">
                  <User className="w-3 h-3 text-primary" />
                  <span className="text-xs font-semibold text-foreground max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => logout()}
                  className="text-xs hover:text-destructive hover:border-destructive/50 transition-colors"
                  data-ocid="header.logout.button"
                >
                  <LogOut className="w-3 h-3 mr-1.5" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
