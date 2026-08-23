import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
// import Landing from "@/pages/Landing";

export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);