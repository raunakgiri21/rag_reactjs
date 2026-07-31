import { useAuthStore } from "@/store/auth.store";

import { useLogoutMutation } from "@/hooks/mutations/useLogoutMutation";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  const logoutMutation = useLogoutMutation();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>

        <button
          onClick={() => logoutMutation.mutate()}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
