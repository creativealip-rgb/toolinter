"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AiChatbot = dynamic(() => import("./ai-chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function AiChatbotLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timeout = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return ready ? <AiChatbot /> : null;
}
