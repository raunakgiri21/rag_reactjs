import { useState } from "react";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";

import { useAskChatMutation } from "@/hooks/mutations/useAskChatMutation";

import type { ChatResponse } from "@/api/chat/chat.schema";
import { useDocumentsQuery } from "@/hooks/queries/useDocumentsQuery";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  sources?: ChatResponse["sources"];
}

export default function ChatPage() {
  const mutation = useAskChatMutation();
  const { data: documents } = useDocumentsQuery();

  const hasDocuments = (documents?.data?.length ?? 0) > 0;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function ask(question: string) {
    if (!hasDocuments) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "📄 You haven't uploaded any documents yet.\n\nPlease upload one or more PDF documents before asking a question.",
        },
      ]);

      return;
    }
    // Immediately show the user's message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    mutation.mutate(
      { question },
      {
        onSuccess(response) {
          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: response.data.answer,
            confidence: response.data.confidence,
            sources: response.data.sources,
          };

          setMessages((prev) => [...prev, assistantMessage]);
        },
        onError(error) {
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: `Error: ${error.message}`,
          };
          setMessages((prev) => [...prev, errorMessage]);
        },
      },
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>

      <ChatInput
        loading={mutation.isPending}
        disabled={!hasDocuments}
        onSend={ask}
      />
    </div>
  );
}
