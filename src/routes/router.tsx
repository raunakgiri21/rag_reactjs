import { createBrowserRouter } from "react-router-dom";

import Root from "@/Root";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Dashboard Pages
// import DashboardPage from "@/pages/dashboard/DashboardPage";
import ChatPage from "@/pages/chat/ChatPage";
// import ProfilePage from "@/pages/profile/ProfilePage";
// import SettingsPage from "@/pages/settings/SettingsPage";

// Error Pages
import NotFoundPage from "@/pages/errors/NotFoundPage";
import DocumentsPage from "@/pages/documents/DocumentsPage";
import UploadPage from "@/pages/documents/UploadPage";
import DocumentPreview from "@/pages/documents/DocumentPreview";

export const router = createBrowserRouter([
  {
    element: <Root />,

    children: [
      // ===========================
      // Protected Routes
      // ===========================
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: <DashboardLayout />,

            children: [
              // {
              //   index: true,
              //   element: <DashboardPage />,
              // },
              {
                path: "documents",
                element: <DocumentsPage />,
              },
              {
                path: "upload",
                element: <UploadPage />,
              },
              {
                path: "/documents/:documentId",
                element: <DocumentPreview />,
              },
              {
                index: true,
                element: <ChatPage />,
              },
              // {
              //   path: "profile",
              //   element: <ProfilePage />,
              // },
              // {
              //   path: "settings",
              //   element: <SettingsPage />,
              // },
            ],
          },
        ],
      },

      // ===========================
      // Public Routes
      // ===========================
      {
        element: <PublicRoute />,

        children: [
          {
            element: <AuthLayout />,

            children: [
              {
                path: "login",
                element: <LoginPage />,
              },
              {
                path: "register",
                element: <RegisterPage />,
              },
            ],
          },
        ],
      },

      // ===========================
      // 404
      // ===========================
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
