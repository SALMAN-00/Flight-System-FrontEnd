import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import About from "../pages/about";
import Login from "../pages/login";
import Signup from "../pages/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
