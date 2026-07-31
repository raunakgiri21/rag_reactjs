import { Outlet } from "react-router-dom";

import { useInitializeAuth } from "@/hooks/useInitializeAuth";

export default function Root() {
  useInitializeAuth();

  return <Outlet />;
}
