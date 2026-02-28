export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
}
