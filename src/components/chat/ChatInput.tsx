import { useState, type KeyboardEvent } from "react";

import { AskQuestionSchema } from "@/api/chat/chat.schema";

interface Props {
  loading: boolean;

  disabled?: boolean;

  onSend(question: string): void;
}

export default function ChatInput({
  loading,
  disabled = false,
  onSend,
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
        <textarea
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);

            if (error) {
              setError("");
            }
          }}
          onKeyDown={onKeyDown}
          disabled={loading || disabled}
          rows={3}
          placeholder="Ask anything..."
          className="w-full resize-none rounded-lg border p-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-3 flex justify-end">
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
