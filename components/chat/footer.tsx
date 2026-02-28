"use client";

import { config } from "@/lib/config";

export function Footer() {
  return (
    <div className="px-4 py-3 text-center">
      <p className="text-xs text-gray-500">{config.disclaimer}</p>
    </div>
  );
}
