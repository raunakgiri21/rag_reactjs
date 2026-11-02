import { useEffect, useRef, useState } from "react";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import type { ChatMessageType } from "@/components/chat/ChatMessage";

import { useAskChatMutation } from "@/hooks/mutations/useAskChatMutation";

import { useDocumentsQuery } from "@/hooks/queries/useDocumentsQuery";
import { useAuthStore } from "@/store/auth.store";
import { clearChatHistory, getChatStorageKey } from "@/services/chat.service";

function isChatMessage(value: unknown): value is ChatMessageType {
  if (!value || typeof value !== "object") return false;

  const message = value as Partial<ChatMessageType>;

  return (
    typeof message.id === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string"
  );
}

function readMessages(storageKey: string): ChatMessageType[] {
  const storedMessages = localStorage.getItem(storageKey);

  if (!storedMessages) return [];

  try {
    const parsedMessages: unknown = JSON.parse(storedMessages);

    return Array.isArray(parsedMessages)
      ? parsedMessages.filter(isChatMessage)
      : [];
  } catch (error) {
    console.error("Unable to restore chat messages.", error);
    return [];
  }
}

export default function ChatPage() {
  const mutation = useAskChatMutation();
  const { data: documents } = useDocumentsQuery();
  const user = useAuthStore((state) => state.user);

  const hasDocuments = (documents?.data?.length ?? 0) > 0;
  const storageKey = getChatStorageKey(user?.id ?? null);

  const [messages, setMessages] = useState<ChatMessageType[]>(() =>
    readMessages(storageKey),
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;

    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  function clearMessages() {
    clearChatHistory(user?.id ?? null);
    setMessages([]);
    setSuggestions([]);
  }

  function ask(question: string) {
    setSuggestions([]);

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
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    mutation.mutate(
      { question },
      {
        onSuccess(response) {
          const assistantMessage: ChatMessageType = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: response.data.answer,
            confidence: response.data.confidence,
            sources: response.data.sources,
          };

          setMessages((prev) => [...prev, assistantMessage]);
          setSuggestions(response.data.suggestions);
        },
        onError(error) {
          const errorMessage: ChatMessageType = {
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
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        <ChatMessages messages={messages} />
      </div>

      <ChatInput
        loading={mutation.isPending}
        disabled={!hasDocuments}
        onSend={ask}
        onClear={clearMessages}
        suggestions={suggestions}
        onSuggestionSelect={() => setSuggestions([])}
        isNewChat={messages.length === 0}
      />
    </div>
  );
}
