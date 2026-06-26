'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-dismissed-at';
const DISMISS_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

function isDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  const ts = localStorage.getItem(DISMISS_KEY);
  if (!ts) return false;
  return Date.now() - Number(ts) < DISMISS_COOLDOWN;
}

function dismiss() {
  localStorage.setItem(DISMISS_KEY, String(Date.now()));
}

export default function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (isDismissed()) return;

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    function handler(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setHidden(false);
    }
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferred || hidden) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-xl border border-primary/20 bg-canvas p-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Install Toolinter</p>
          <p className="text-xs text-ink-tertiary mt-0.5">
            Akses lebih cepat dari home screen. Gratis, tanpa Play Store.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={async () => {
                await deferred.prompt();
                const { outcome } = await deferred.userChoice;
                if (outcome === 'accepted') setDeferred(null);
              }}
              className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              Install
            </button>
            <button
              onClick={() => { dismiss(); setHidden(true); }}
              className="rounded-lg px-3 py-1.5 text-xs text-ink-muted hover:text-ink transition-colors"
            >
              Nanti saja
            </button>
          </div>
        </div>
        <button onClick={() => { dismiss(); setHidden(true); }} className="text-ink-muted hover:text-ink">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
