"use client";

import { useApp } from "@/context/AppContext";

export default function Header() {
  const { largeText, toggleLargeText, points } = useApp();

  return (
    <header
      className="sticky top-0 z-50 w-full
                 bg-white/95 backdrop-blur-sm border-b border-[#e6f5f3]
                 flex items-center justify-between px-4 h-14 shadow-sm flex-shrink-0"
      role="banner"
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2"
        aria-label="Jogja Smart People Logo"
      >
        <div className="w-8 h-8 rounded-lg bg-[#0d7a6b] flex items-center justify-center flex-shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="white"
              opacity="0.9"
            />
            <circle cx="12" cy="9" r="2.5" fill="#0d7a6b" />
            <path
              d="M8 17h8M9 19.5h6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-[#0d7a6b] leading-tight text-[13px]">
            Jogja Smart
          </p>
          <p className="font-extrabold text-[#09564a] leading-tight text-[15px] -mt-0.5">
            People
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Large Text Toggle */}
        <button
          onClick={toggleLargeText}
          aria-pressed={largeText}
          aria-label={
            largeText ? "Matikan Mode Teks Besar" : "Aktifkan Mode Teks Besar"
          }
          title={
            largeText ? "Matikan Mode Teks Besar" : "Aktifkan Mode Teks Besar"
          }
          className={[
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold",
            "transition-all duration-200 active:scale-95",
            largeText
              ? "bg-[#0d7a6b] border-[#0d7a6b] text-white"
              : "bg-[#e6f5f3] border-[#0d7a6b]/20 text-[#0d7a6b]",
          ].join(" ")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <text
              x="2"
              y="17"
              fontSize="14"
              fontWeight="bold"
              fill="currentColor"
            >
              A
            </text>
            <text
              x="12"
              y="20"
              fontSize="10"
              fontWeight="bold"
              fill="currentColor"
            >
              A
            </text>
          </svg>
          <span className="hidden sm:inline">
            {largeText ? "Teks Besar" : "Teks Besar"}
          </span>
          <span>{largeText ? "ON" : "OFF"}</span>
        </button>

        {/* User avatar + points */}
        <button
          aria-label="Profil Saya — SinaU Points: 1250"
          className="flex items-center gap-1.5 bg-[#f5ede4] rounded-full pl-1 pr-2.5 py-1
                     border border-[#8b5e3c]/20 hover:border-[#8b5e3c]/50 transition-colors active:scale-95"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0d7a6b] to-[#09564a] flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <div className="flex items-center gap-0.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3 h-3 text-[#c9a84c]"
              aria-hidden="true"
            >
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill="currentColor"
              />
            </svg>
            <span className="text-[#8b5e3c] font-bold text-xs">
              {points.toLocaleString("id-ID")}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
