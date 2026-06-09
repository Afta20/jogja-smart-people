"use client";

import { useApp } from "@/context/AppContext";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { largeText } = useApp();

  return (
    // Outer desktop backdrop — subtle noise-ish pattern to feel like a desk/table
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #b2d8d2 0%, #8bbfb8 40%, #6aa39c 100%)",
      }}
    >
      {/* Phone frame wrapper */}
      <div
        className="relative flex flex-col"
        style={{
          width: "100%",
          maxWidth: 390,
          // Tall enough to show scrollable content; clamps on very short viewports
          height: "min(844px, 100dvh)",
          // Classic phone rounded corners
          borderRadius: 44,
          // Layered box shadow: outer bezel + depth glow
          boxShadow:
            "0 0 0 10px #1a1a1a, 0 0 0 11px #2e2e2e, 0 40px 80px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
        aria-label="Simulasi antarmuka aplikasi mobile"
      >
        {/* ── Status Bar (notch row) ── */}
        <div
          className="flex-shrink-0 flex items-center justify-between bg-[#0d7a6b] px-6"
          style={{ height: 44, paddingTop: 4 }}
          aria-hidden="true"
        >
          {/* Time */}
          <span className="text-white font-semibold" style={{ fontSize: 13 }}>
            9:41
          </span>

          {/* Dynamic Island / notch pill */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full"
            style={{ width: 120, height: 34, top: 5 }}
          />

          {/* Status icons */}
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg
              viewBox="0 0 18 12"
              className="w-4 h-3 text-white"
              fill="currentColor"
            >
              <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="1" />
              <rect x="5" y="5" width="3" height="7" rx="0.5" opacity="1" />
              <rect x="10" y="2" width="3" height="10" rx="0.5" opacity="1" />
              <rect
                x="15"
                y="0"
                width="3"
                height="12"
                rx="0.5"
                opacity="0.35"
              />
            </svg>
            {/* WiFi */}
            <svg
              viewBox="0 0 16 12"
              className="w-3.5 h-3 text-white"
              fill="currentColor"
            >
              <path d="M8 10.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-3.1-3.1a4.4 4.4 0 0 1 6.2 0l-1.1 1.1a2.8 2.8 0 0 0-4 0L4.9 7.4zm-2.1-2.1a7 7 0 0 1 10.4 0L12 6.4a5.4 5.4 0 0 0-8 0L2.8 5.3zm-2-2a9.6 9.6 0 0 1 14.6 0L14.2 4.3A8 8 0 0 0 1.8 4.3L.8 3.3z" />
            </svg>
            {/* Battery */}
            <svg
              viewBox="0 0 25 12"
              className="w-5 h-3 text-white"
              fill="currentColor"
            >
              <rect
                x="0"
                y="1"
                width="21"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <rect x="1.5" y="2.5" width="15" height="7" rx="1" opacity="1" />
              <path d="M22.5 4.5v3a1.5 1.5 0 0 0 0-3z" />
            </svg>
          </div>
        </div>

        {/* ── App content area ── */}
        <div
          className={[
            "flex-1 flex flex-col bg-white overflow-hidden",
            largeText ? "text-lg" : "text-sm",
          ].join(" ")}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <Header />
          <main
            className="flex-1 overflow-y-auto pb-4"
            id="main-content"
            style={{ overscrollBehavior: "contain" }}
          >
            {children}
          </main>
          <BottomNav />
        </div>

        {/* ── Home Indicator ── */}
        <div
          className="flex-shrink-0 flex items-center justify-center bg-white"
          style={{ height: 34 }}
          aria-hidden="true"
        >
          <div
            className="bg-gray-900 rounded-full"
            style={{ width: 134, height: 5 }}
          />
        </div>
      </div>

      {/* Desktop watermark outside phone */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 font-semibold pointer-events-none"
        style={{ fontSize: 11, letterSpacing: "0.1em" }}
        aria-hidden="true"
      >
        JOGJA SMART PEOPLE · Preview Mode
      </div>
    </div>
  );
}
