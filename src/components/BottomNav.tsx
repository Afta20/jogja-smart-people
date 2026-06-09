"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

const navItems = [
  {
    href: "/",
    label: "Beranda",
    id: "beranda",
    icon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          d="M3 12L12 3l9 9"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? "#e6f5f3" : "none"}
        />
      </svg>
    ),
  },
  {
    href: "/kanca-sinau",
    label: "Kanca SinaU",
    id: "kanca-sinau",
    icon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? "#e6f5f3" : "none"}
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/karya-jogja",
    label: "Karya Jogja",
    id: "karya-jogja",
    icon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="7"
          width="20"
          height="14"
          rx="2"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          fill={active ? "#e6f5f3" : "none"}
        />
        <path
          d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="16"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="14"
          x2="14"
          y2="14"
          stroke={active ? "#0d7a6b" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/reward",
    label: "Reward",
    id: "reward",
    icon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          stroke={active ? "#c9a84c" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? "#fef9ec" : "none"}
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { largeText } = useApp();

  return (
    <nav
      className="w-full z-50 bg-white border-t border-gray-100 shadow-lg flex-shrink-0 overflow-hidden"
      aria-label="Navigasi Utama"
      role="navigation"
    >
      <ul className="relative flex items-stretch h-14" role="list">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.id} className="flex-1" role="listitem">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={[
                  "flex flex-col items-center justify-center gap-0.5 w-full h-full relative",
                  "transition-all duration-200 active:scale-95",
                  active
                    ? "text-[#0d7a6b]"
                    : "text-gray-400 hover:text-gray-600",
                ].join(" ")}
              >
                {active && (
                  <span
                    className="absolute top-0 inset-x-0 h-[3px] bg-[#0d7a6b] rounded-b-full"
                    aria-hidden="true"
                  />
                )}
                {item.icon(active)}
                <span
                  className={[
                    "leading-tight font-medium",
                    largeText ? "text-[11px]" : "text-[10px]",
                    active ? "text-[#0d7a6b] font-semibold" : "text-gray-400",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
