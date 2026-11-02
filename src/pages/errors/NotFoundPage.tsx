import { ArrowLeft, FileQuestion, House } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <FileQuestion size={40} strokeWidth={1.5} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-gray-500">
          The page you are looking for may have been moved, deleted, or never
          existed.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <House size={16} />
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
