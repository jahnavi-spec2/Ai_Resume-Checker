import { Navigate, createBrowserRouter } from "react-router-dom";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Resumes from "@/pages/Resumes";
import ResumeDetail from "@/pages/ResumeDetail";
import Dashboard from "@/pages/Dashboard";
import Insights from "@/pages/Insights";
import Versions from "@/pages/Versions";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import JobMatch from "@/pages/JobMatch";
import { AppLayout } from "@/components/layout/AppShell";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // everything below shares the sidebar/topbar shell.
  {
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/resumes", element: <Resumes /> },
      { path: "/resumes/:id", element: <ResumeDetail /> },
      { path: "/job-match", element: <JobMatch /> },
      { path: "/insights", element: <Insights /> },
      { path: "/versions", element: <Versions /> },
      { path: "/history", element: <History /> },
      { path: "/settings", element: <Settings /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);