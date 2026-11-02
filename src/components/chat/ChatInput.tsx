import { useState, type KeyboardEvent } from "react";

import { AskQuestionSchema } from "@/api/chat/chat.schema";

interface Props {
  loading: boolean;

  disabled?: boolean;

  onSend(question: string): void;

  onClear(): void;

  suggestions?: string[];

  onSuggestionSelect(suggestion: string): void;

  isNewChat?: boolean;
}

export default function ChatInput({
  loading,
  disabled = false,
  onSend,
  onClear,
  suggestions = [],
  onSuggestionSelect,
  isNewChat = false,
}: Props) {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  function submit() {
    const result = AskQuestionSchema.safeParse({
      question,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid question");
      return;
    }

    setError("");

    onSend(result.data.question);

    setQuestion("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (loading) return;

    if (e.key !== "Enter") return;

    if (e.shiftKey) return;

    e.preventDefault();

    submit();
  }

  return (
    <>
      {disabled && (
        <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 max-w-lg text-center m-auto text-sm text-yellow-800">
          📄 You haven't uploaded any documents yet.
          <br />
          Upload one or more PDF documents before asking questions.
        </div>
      )}
      <div className="border-t bg-white p-4">
        {suggestions.length > 0 && !disabled && (
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion}-${index}`}
                type="button"
                onClick={() => {
                  setQuestion(suggestion);
                  onSuggestionSelect(suggestion);
                }}
                disabled={loading}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-left text-sm text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div
            role="status"
            aria-live="polite"
            className="flex h-\[84px]\ items-center rounded-lg border bg-gray-50 p-3 text-gray-600"
          >
            Generating answer
            <span className="loading-dots ml-2" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </div>
        ) : (
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);

              if (error) {
                setError("");
              }
            }}
            onKeyDown={onKeyDown}
            disabled={disabled}
            rows={3}
            placeholder="Ask anything..."
            className="w-full resize-none rounded-lg border p-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
          />
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-3 flex justify-end gap-3">
          {!disabled && !loading && !isNewChat && (
            <button
              type="button"
              onClick={onClear}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 cursor-pointer"
            >
              Clear chat
            </button>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={loading || disabled}
            className="rounded bg-blue-600 px-6 py-2 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}
