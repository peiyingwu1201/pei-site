"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/articles", label: "Knowledge Base" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f5]/80 backdrop-blur-[20px]">
      <nav className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-headline font-semibold text-sm tracking-wide text-[#2f342e]">
          The Atelier
        </Link>
        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors font-body ${
                  pathname.startsWith(href)
                    ? "text-[#2f342e] font-medium"
                    : "text-[#5c605a] hover:text-[#2f342e]"
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
