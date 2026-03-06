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
  MessageSquare,
  Moon,
  ShieldCheck,
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
  { path: "/chat", label: "AI Chat", icon: MessageSquare },
  { path: "/admin", label: "Admin", icon: ShieldCheck },
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
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm text-sidebar-foreground leading-tight">
              AI Student Portal
            </h1>
            <p className="text-xs text-sidebar-foreground/50">
              Learn · Practice · Grow
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all sidebar-glow-item ${
                  isActive
                    ? "bg-sidebar-primary/20 text-sidebar-primary border border-sidebar-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
          {user && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <User className="w-3.5 h-3.5 text-sidebar-foreground/50 flex-shrink-0" />
                <p className="text-xs text-sidebar-foreground/70 truncate font-medium">
                  {user.name}
                </p>
              </div>
              <p className="text-xs text-sidebar-foreground/40 px-1 truncate">
                {user.email}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
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

          <div className="hidden lg:block">
            <h2 className="font-display font-semibold text-foreground text-sm">
              AI Student Portal
            </h2>
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
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => logout()}
                  data-ocid="header.logout.button"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
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
