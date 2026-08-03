import type { ChatMessageType } from "./ChatMessage";
import  ChatMessage  from "./ChatMessage";

interface Props {
  messages: ChatMessageType[];
}

export default function ChatMessages({ messages }: Props) {
  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <ChatMessage
          key={m.id}
          message={m}
        />
      ))}
    </div>
  );
}
