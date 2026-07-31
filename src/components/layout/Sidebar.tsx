import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="mb-8 text-xl font-bold">RAG AI</h2>

      <nav className="space-y-3">
        <Link
          className="block"
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className="block"
          to="/documents"
        >
          Documents
        </Link>

        <Link
          className="block"
          to="/upload"
        >
          Upload
        </Link>

        <Link
          className="block"
          to="/chat"
        >
          Chat
        </Link>

        <Link
          className="block"
          to="/settings"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
