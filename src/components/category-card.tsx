import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  desc: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
  available?: boolean;
}

export default function CategoryCard({
  title,
  desc,
  href,
  icon: Icon,
  badge,
  available = true,
}: CategoryCardProps) {
  const inner = (
    <div
      className={`group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 ${
        available
          ? "hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          : "opacity-50 cursor-default"
      }`}
    >
      {Icon && (
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
          <Icon size={20} />
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-500 flex-1">
        {desc}
      </p>
      {badge && (
        <span className="mt-3 inline-block w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
          {badge}
        </span>
      )}
      {!available && (
        <span className="mt-3 inline-block w-fit rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600">
          Segera Hadir
        </span>
      )}
    </div>
  );

  if (!available) return <div className="h-full">{inner}</div>;

  return (
    <Link href={href} className="block no-underline h-full">
      {inner}
    </Link>
  );
}
