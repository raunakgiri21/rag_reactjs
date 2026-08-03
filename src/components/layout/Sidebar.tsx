import {
  MessageSquare,
  FileText,
  Upload,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";
import { useLogoutMutation } from "@/hooks/mutations/useLogoutMutation";

const menuItems = [
  {
    label: "Chat",
    to: "/",
    icon: MessageSquare,
  },
  {
    label: "Documents",
    to: "/documents",
    icon: FileText,
  },
  {
    label: "Upload",
    to: "/upload",
    icon: Upload,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);

  const logoutMutation = useLogoutMutation();

  return (
    <aside className="flex h-screen w-64 flex-col  border-r border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-white shadow-sm p-6">
        <h2 className="text-2xl font-bold text-blue-600">🤖 RAG AI</h2>

        <p className="mt-1 text-sm text-gray-500">AI Knowledge Assistant</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-b border-gray-100 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium">{user?.name}</p>

            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          <LogOut size={18} />

          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
