import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorFallback({
  title = "Something went wrong",
  message = "We were unable to display this content. Please try again.",
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-xl border bg-white p-6 text-center">
      <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
      <div>
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
