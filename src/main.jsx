import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./main.css";

import App from "./App";

import LoginPage from "./pages/Accounts/Login";
import FillData from "./pages/Accounts/FillData";
import ResetPasswordPage from "./pages/Accounts/ResetPassword";

import QRCodes from "./pages/QRCodes";
import CustomQR from "./pages/QRCodes/CustomQR";
import DefaultQR from "./pages/QRCodes/DefaultQR";

import Summary from "./pages/Summary";

import EditLinkPage from "./pages/EditLink";
import HistoryLinkPage from "./pages/HistoryLink";
import URLShortenerPage from "./pages/URLShortener";
import RequireAuth from "./pages/AuthRoute/RequireAuth";
import NotFoundPage from "./components/not-found/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "",
    children: [
      {
        path: "summary",
        element: <Summary />,
      },
      {
        path: "qr-codes",
        element: (
          <RequireAuth>
            <QRCodes />
          </RequireAuth>
        ),
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
        path: "/url-shortener",
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [
          {
            path: "history",
            element: <HistoryLinkPage />,
          },
          {
            path: "create",
            element: <URLShortenerPage />,
          },
          {
            path: "edit-link/:id",
            element: <EditLinkPage />,
          },
        ],
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
        path: "fill-data",
        element: <FillData />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/404-notfound",
    element: <NotFoundPage />
  },
  {
    path: "*",
    element: <Navigate to="/account/login" />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
