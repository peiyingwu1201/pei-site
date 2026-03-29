"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/articles", label: "文章" },
  { href: "/portfolio", label: "作品集" },
  { href: "/learning", label: "學習觀點" },
  { href: "/about", label: "關於我" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Pei<span className="text-indigo-500">.</span>
        </Link>
        <ul className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors hover:text-indigo-500 ${
                  pathname.startsWith(href)
                    ? "text-indigo-500 font-medium"
                    : "text-gray-600"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
