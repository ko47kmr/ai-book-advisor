"use client";

import { Message as MessageType } from "@/lib/types";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-gray-100 text-gray-900"
            : "bg-white text-gray-900 ring-1 ring-gray-200"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-600 text-white">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
