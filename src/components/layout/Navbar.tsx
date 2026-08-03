import { useLocation } from "react-router-dom";

function getTitle(pathname: string) {
  if (pathname === "/") return "Chat";
  if (pathname.startsWith("/documents")) return "Documents";
  if (pathname.startsWith("/upload")) return "Upload";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/login")) return "Login";
  if (pathname.startsWith("/register")) return "Register";

  return "Dashboard";
}

export default function Navbar() {
  const location = useLocation();

  const title = getTitle(location.pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-8 backdrop-blur-sm shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        <p className="text-sm text-gray-500">Manage your AI workspace</p>
      </div>
    </header>
  );
}
