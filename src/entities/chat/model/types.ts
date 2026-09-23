export type MessageDirection = "incoming" | "outgoing";

export interface Message {
  id: string;
  chatId: string;
  text: string;
  direction: MessageDirection;
  timestamp: number;
}

export interface Chat {
  chatId: string;
  phoneNumber: string;
  createdAt: number;
}
