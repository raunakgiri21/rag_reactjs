const CHAT_MESSAGES_KEY = "chat_messages";

export function getChatStorageKey(userId: string | null) {
  return `${CHAT_MESSAGES_KEY}_${userId ?? "anonymous"}`;
}

export function clearChatHistory(userId: string | null) {
  localStorage.removeItem(getChatStorageKey(userId));
}
