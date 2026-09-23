import { describe, it, expect } from "vitest";
import {
  chatsReducer,
  chatAdded,
  messageAdded,
  type ChatsState,
} from "./chats-slice";
import type { Message } from "./types";

function createMessage(overrides: Partial<Message> = {}): Message {
  return {
    id: "msg-1",
    chatId: "chat-1",
    text: "привет",
    direction: "incoming",
    timestamp: 1000,
    ...overrides,
  };
}

describe("chatsReducer", () => {
  const emptyState: ChatsState = {
    chats: {},
    messages: {},
    activeChatId: null,
  };

  it("создал чат — сразу же его и открыли", () => {
    const state = chatsReducer(
      emptyState,
      chatAdded({ chatId: "chat-1", phoneNumber: "79991234567", createdAt: 1 }),
    );

    expect(state.chats["chat-1"]).toEqual({
      chatId: "chat-1",
      phoneNumber: "79991234567",
      createdAt: 1,
    });
    expect(state.messages["chat-1"]).toEqual([]);
    expect(state.activeChatId).toBe("chat-1");
  });

  it("баг с поллингом: если чат уже есть, не перепрыгиваем на него и не затираем номер плейсхолдером", () => {
    const withFirstChat = chatsReducer(
      emptyState,
      chatAdded({ chatId: "chat-1", phoneNumber: "79991234567", createdAt: 1 }),
    );
    const withSecondChat = chatsReducer(
      withFirstChat,
      chatAdded({ chatId: "chat-2", phoneNumber: "79997654321", createdAt: 2 }),
    );

    const afterPollingHit = chatsReducer(
      withSecondChat,
      chatAdded({ chatId: "chat-1", phoneNumber: "chat-1", createdAt: 3 }),
    );

    expect(afterPollingHit.activeChatId).toBe("chat-2");
    expect(afterPollingHit.chats["chat-1"].phoneNumber).toBe("79991234567");
  });

  it("одно и то же сообщение дважды — не задваивается", () => {
    const withChat = chatsReducer(
      emptyState,
      chatAdded({ chatId: "chat-1", phoneNumber: "79991234567", createdAt: 1 }),
    );
    const withMessage = chatsReducer(
      withChat,
      messageAdded({ chatId: "chat-1", message: createMessage() }),
    );
    const withDuplicate = chatsReducer(
      withMessage,
      messageAdded({ chatId: "chat-1", message: createMessage() }),
    );

    expect(withDuplicate.messages["chat-1"]).toHaveLength(1);
  });

  it("а разные сообщения добавляются нормально, оба", () => {
    const withChat = chatsReducer(
      emptyState,
      chatAdded({ chatId: "chat-1", phoneNumber: "79991234567", createdAt: 1 }),
    );
    const withFirst = chatsReducer(
      withChat,
      messageAdded({
        chatId: "chat-1",
        message: createMessage({ id: "msg-1" }),
      }),
    );
    const withSecond = chatsReducer(
      withFirst,
      messageAdded({
        chatId: "chat-1",
        message: createMessage({ id: "msg-2" }),
      }),
    );

    expect(withSecond.messages["chat-1"]).toHaveLength(2);
  });
});
