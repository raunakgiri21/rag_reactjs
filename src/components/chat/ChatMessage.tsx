import type { ChatResponse } from "@/api/chat/chat.schema";

export interface ChatMessageType {
  id: string;

  role: "user" | "assistant";

  content: string;

  confidence?: number;

  sources?: ChatResponse["sources"];
}

interface Props {
  message: ChatMessageType;
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import SourceList from "./SourceList";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  const confidence = message.confidence ?? null;
  return (
    <div className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-xl p-4 shadow ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>

        {confidence !== null && (
          <div className="mt-3 border-t pt-2 text-xs text-gray-500">
            Confidence:{" "}
            <span className="font-semibold">
              {(confidence * 100).toFixed(1)}%
            </span>
          </div>
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceList sources={message.sources} />
        )}
      </div>
    </div>
  );
}
