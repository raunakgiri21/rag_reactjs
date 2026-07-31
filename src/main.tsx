import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { AppProvider } from "./providers";
import { setupInterceptors } from "./services/interceptors";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";

setupInterceptors();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
