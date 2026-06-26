'use client';

import dynamic from 'next/dynamic';

export const LazySearchModal = dynamic(() => import('./search-modal'), {
  loading: () => null,
  ssr: false,
});

export const LazyAiInsightBox = dynamic(() => import('./ai-insight-box'), {
  loading: () => <div className="h-32 bg-surface animate-pulse rounded-xl" />,
  ssr: false,
});

export const LazyActionBar = dynamic(() => import('./action-bar').then(m => ({ default: m.ActionBar })), {
  loading: () => <div className="h-16 bg-surface animate-pulse rounded-xl" />,
  ssr: false,
});
