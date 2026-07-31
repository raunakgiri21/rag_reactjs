import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";
import AppLoader from "@/components/common/AppLoader";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isInitialized = useAuthStore((s) => s.isInitialized);

  if (!isInitialized) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}
