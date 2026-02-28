"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 border-t bg-white px-4 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl gap-3"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="悩みや質問を入力してください..."
          disabled={disabled}
          className="min-h-[60px] resize-none"
          rows={2}
        />
        <Button
          type="submit"
          disabled={!input.trim() || disabled}
          size="icon"
          className="h-[60px] w-[60px] shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
