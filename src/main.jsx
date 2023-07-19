import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import "./main.css"

import App from "./App"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register/"
import ResetPasswordPage from "./pages/ResetPassword"

import QRCodes from "./pages/QRCodes"
import CustomQR from "./pages/QRCodes/CustomQR"
import DefaultQR from "./pages/QRCodes/DefaultQR"

import Dashboard from "./pages/Testing/dashboard"
import Summary from "./pages/Summary"
import HistoryLinkPage from "./pages/HistoryLink"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/qr-codes",
        element: <QRCodes />,
        children: [
          {
            path: "default",
            element: <DefaultQR />,
          },
          {
            path: "custom",
            element: <CustomQR />,
          },
        ],
      },
      {
        path: "/history",
        element: <HistoryLinkPage />,
      },
    ],
  },
  {
    path: "/account",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/testing",
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Summary />,
  },
  {
    path: "*",
    element: <Navigate to="/account/login" />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
