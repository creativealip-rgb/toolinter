"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function ViewCounter({
  slug,
  initialViews,
}: {
  slug: string;
  initialViews: number;
}) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.views) setViews(data.views);
      })
      .catch(() => {});
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
      <Eye className="h-3 w-3" />
      {views.toLocaleString("id-ID")} views
    </span>
  );
}
