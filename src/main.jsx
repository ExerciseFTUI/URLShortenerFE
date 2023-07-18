import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./main.css";

import App from "./App";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register/";
import ResetPasswordPage from "./pages/ResetPassword";

import QRCodes from "./pages/QRCodes";
import CustomQR from "./pages/QRCodes/CustomQR";
import DefaultQR from "./pages/QRCodes/DefaultQR";
import Summary from "./pages/Summary";

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
    path: "/",
    element: <Summary />,
  },
  {
    path: "*",
    element: <Navigate to="/account/login" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
