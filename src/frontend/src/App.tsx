import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import AdminPanel from "./pages/AdminPanel";
import ChatAssistant from "./pages/ChatAssistant";
import CodingPractice from "./pages/CodingPractice";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import JobListings from "./pages/JobListings";
import MCQTests from "./pages/MCQTests";
import ResumeBuilder from "./pages/ResumeBuilder";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="student-portal-theme">
      <Outlet />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  ),
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Dashboard,
});

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/courses",
  component: Courses,
});

const mcqRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/mcq",
  component: MCQTests,
});

const codingRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/coding",
  component: CodingPractice,
});

const jobsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/jobs",
  component: JobListings,
});

const resumeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/resume",
  component: ResumeBuilder,
});

const chatRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/chat",
  component: ChatAssistant,
});

const adminRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin",
  component: AdminPanel,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    coursesRoute,
    mcqRoute,
    codingRoute,
    jobsRoute,
    resumeRoute,
    chatRoute,
    adminRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
