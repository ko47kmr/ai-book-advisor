"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/chat/header";
import { Message } from "@/components/chat/message";
import { ChatInput } from "@/components/chat/chat-input";
import { Footer } from "@/components/chat/footer";
import { config } from "@/lib/config";
import { Message as MessageType, ChatRequest, ChatResponse } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // localStorageから履歴を読み込む
  useEffect(() => {
    const savedHistory = localStorage.getItem(config.storageKey);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setMessages(parsed);
      } catch (error) {
        console.error("Failed to parse chat history:", error);
        // 初期メッセージを設定
        setMessages([
          {
            role: "assistant",
            content: config.initialMessage,
          },
        ]);
      }
    } else {
      // 初期メッセージを設定
      setMessages([
        {
          role: "assistant",
          content: config.initialMessage,
        },
      ]);
    }
  }, []);

  // メッセージが更新されたらlocalStorageに保存
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(config.storageKey, JSON.stringify(messages));
    }
  }, [messages]);

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 新しい相談を始める（履歴リセット）
  const handleReset = () => {
    localStorage.removeItem(config.storageKey);
    setMessages([
      {
        role: "assistant",
        content: config.initialMessage,
      },
    ]);
  };

  // メッセージ送信
  const handleSend = async (message: string) => {
    // ユーザーメッセージを追加
    const userMessage: MessageType = {
      role: "user",
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // API呼び出し
      const chatRequest: ChatRequest = {
        message,
        history: messages.filter((msg) => msg.role !== "assistant" || messages.indexOf(msg) < messages.length), // 初期メッセージを除く
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRequest),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data: ChatResponse = await response.json();

      // AIの応答を追加
      const assistantMessage: MessageType = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // エラーメッセージを追加
      const errorMessage: MessageType = {
        role: "assistant",
        content:
          "申し訳ございません。エラーが発生しました。もう一度お試しください。",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header onReset={handleReset} />

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start gap-3 px-4 py-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <div className="h-5 w-5 animate-pulse">AI</div>
              </div>
              <div className="max-w-[80%] rounded-lg bg-white px-4 py-3 text-sm ring-1 ring-gray-200">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <Footer />
      </div>

      {/* 入力エリア */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
