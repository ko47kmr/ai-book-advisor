"use client";

import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { ExternalLink, RotateCcw } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white px-4 py-4 shadow-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          {config.serviceName}
        </h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">新しい相談を始める</span>
          </Button>
          <a
            href={config.bookPurchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            <ExternalLink className="inline h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
