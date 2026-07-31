import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <Outlet />
    </div>
  );
}
