"use client";

import { useApp } from "@/context/AppContext";
import { useState } from "react";
import Link from "next/link";

const careerPaths = [
  {
    id: 1,
    title: "Jalur Frontend Developer",
    match: 94,
    desc: "Bangun antarmuka digital masa depan Yogyakarta",
    icon: "💻",
    color: "from-[#0d7a6b] to-[#14b49a]",
    modules: 12,
  },
  {
    id: 2,
    title: "Jalur UI/UX Designer",
    match: 88,
    desc: "Rancang pengalaman digital yang inklusif & manusiawi",
    icon: "🎨",
    color: "from-[#8b5e3c] to-[#c9a84c]",
    modules: 9,
  },
  {
    id: 3,
    title: "Jalur Data Analyst",
    match: 79,
    desc: "Ubah data warga Jogja menjadi keputusan cerdas",
    icon: "📊",
    color: "from-[#4a6fa5] to-[#6b93cc]",
    modules: 14,
  },
];

const activeModules = [
  {
    id: 1,
    title: "HTML & CSS Dasar",
    progress: 75,
    category: "Talenta Jogja",
    pts: 150,
  },
  {
    id: 2,
    title: "Literasi Media Sosial",
    progress: 40,
    category: "Literasi Dasar",
    pts: 80,
  },
];

const announcements = [
  {
    id: 1,
    type: "event",
    text: "Bootcamp UI/UX bersama Telkom Indonesia — Daftar sebelum 20 Juni 2026!",
    tag: "🗓 Acara",
  },
  {
    id: 2,
    type: "tip",
    text: "Tips: Selesaikan 1 modul per hari agar poin Anda terus bertambah.",
    tag: "💡 Tips",
  },
];

export default function BerandaPage() {
  const { largeText, points } = useApp();
  const [expandCareer, setExpandCareer] = useState(false);

  const base = largeText ? "text-base" : "text-sm";
  const sm = largeText ? "text-sm" : "text-xs";
  const h1 = largeText ? "text-2xl" : "text-xl";
  const h2 = largeText ? "text-xl" : "text-base";

  return (
    <div className="bg-[#f7fafa] min-h-full">
      {/* Hero + Card wrapper — hero melebar ke bawah lalu kartu duduk di dalam padding-nya */}
      <div className="relative bg-gradient-to-br from-[#0d7a6b] via-[#0a6459] to-[#09564a] overflow-hidden">
        {/* Decorative circles — overflow-hidden sekarang aman karena pakai wrapper */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5"
          aria-hidden="true"
        />
        <div
          className="absolute top-4 right-16 w-16 h-16 rounded-full bg-[#c9a84c]/20"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -left-12 w-48 h-48 rounded-full bg-white/5"
          aria-hidden="true"
        />

        {/* Batik-inspired pattern strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-3 opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,#c9a84c 0,#c9a84c 8px,transparent 8px,transparent 16px)",
          }}
        />

        {/* Hero text content */}
        <section
          className="relative px-5 pt-6 pb-6"
          aria-labelledby="hero-greeting"
        >
          <p className={`text-[#a8e6de] font-medium ${sm} mb-1`}>
            Senin, 9 Juni 2026
          </p>
          <h1
            id="hero-greeting"
            className={`text-white font-extrabold ${h1} leading-snug`}
          >
            Sugeng Rawuh,
            <br />
            <span className="text-[#c9a84c]">Afreeza!</span> 👋
          </h1>
          <p className={`text-[#b8ddd9] mt-1 ${sm} max-w-xs`}>
            Teruslah belajar & berkontribusi untuk Jogja yang lebih cerdas.
          </p>

          {/* Points badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-2xl px-4 py-2 border border-white/20">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#c9a84c]"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <div>
              <p className={`text-white font-extrabold ${h2} leading-none`}>
                {points.toLocaleString("id-ID")}
              </p>
              <p className={`text-[#a8e6de] ${sm}`}>SinaU Points</p>
            </div>
            <div className="w-px h-8 bg-white/20" aria-hidden="true" />
            <div>
              <p className={`text-white font-bold ${base} leading-none`}>
                Lv. 5
              </p>
              <p className={`text-[#a8e6de] ${sm}`}>Pelajar Aktif</p>
            </div>
          </div>
        </section>

        {/* Progress Cards — menempel langsung di bawah hero text, masih dalam wrapper hijau */}
        {/* px + pb memberi "rumah" untuk kartu, lalu wrapper hijau berakhir di sini */}
        <section
          className="relative px-4 pb-6"
          aria-labelledby="progress-section"
        >
          <div
            className="bg-white rounded-2xl p-4"
            style={{
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                id="progress-section"
                className={`font-bold text-gray-800 ${base}`}
              >
                Modul Aktif Saya
              </h2>
              <Link
                href="/kanca-sinau"
                className={`text-[#0d7a6b] font-semibold ${sm} hover:underline focus-visible:underline`}
              >
                Lihat Semua →
              </Link>
            </div>
            <ul
              className="space-y-3"
              role="list"
              aria-label="Daftar modul aktif"
            >
              {activeModules.map((mod) => (
                <li key={mod.id} className="group">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p
                        className={`font-semibold text-gray-800 ${base} group-hover:text-[#0d7a6b] transition-colors`}
                      >
                        {mod.title}
                      </p>
                      <span
                        className={`inline-block bg-[#e6f5f3] text-[#0d7a6b] rounded-full px-2 py-0.5 font-medium ${sm}`}
                      >
                        {mod.category}
                      </span>
                    </div>
                    <span
                      className={`text-[#c9a84c] font-bold ${sm} flex-shrink-0`}
                    >
                      +{mod.pts} pts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 bg-gray-100 rounded-full h-2"
                      role="progressbar"
                      aria-valuenow={mod.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${mod.title}: ${mod.progress}% selesai`}
                    >
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#0d7a6b] to-[#14b49a] transition-all"
                        style={{ width: `${mod.progress}%` }}
                      />
                    </div>
                    <span
                      className={`text-gray-500 ${sm} font-medium w-8 text-right`}
                    >
                      {mod.progress}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      {/* end hero+card wrapper */}

      {/* Announcements */}
      <section className="px-4 mb-5" aria-labelledby="announcements-section">
        <h2
          id="announcements-section"
          className={`font-bold text-gray-800 ${base} mb-3`}
        >
          Info & Pengumuman
        </h2>
        <ul className="space-y-2" role="list">
          {announcements.map((ann) => (
            <li
              key={ann.id}
              className={[
                "bg-white rounded-xl p-3 border flex gap-3 items-start shadow-sm",
                ann.type === "event"
                  ? "border-[#0d7a6b]/20"
                  : "border-[#c9a84c]/30",
              ].join(" ")}
            >
              <span
                className={`${sm} font-semibold flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-lg ${ann.type === "event" ? "bg-[#e6f5f3] text-[#0d7a6b]" : "bg-[#fef9ec] text-[#8b5e3c]"}`}
              >
                {ann.tag}
              </span>
              <p className={`text-gray-700 ${sm} leading-relaxed`}>
                {ann.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* AI Career Recommendations */}
      <section className="px-4 mb-6" aria-labelledby="career-section">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2
              id="career-section"
              className={`font-bold text-gray-800 ${base}`}
            >
              Talenta Jogja — AI Rekomendasi
            </h2>
            <p className={`text-gray-500 ${sm}`}>
              Berdasarkan profil & tren industri lokal
            </p>
          </div>
          <span className="bg-gradient-to-r from-[#0d7a6b] to-[#14b49a] text-white text-[10px] font-bold px-2 py-1 rounded-full">
            AI
          </span>
        </div>

        <ul
          className={[
            "space-y-3 overflow-hidden transition-all duration-500",
            expandCareer ? "" : "max-h-[340px]",
          ].join(" ")}
          role="list"
          aria-label="Rekomendasi jalur karier"
        >
          {careerPaths.map((path) => (
            <li key={path.id}>
              <Link
                href="/kanca-sinau"
                className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-4
                           hover:shadow-md hover:border-[#0d7a6b]/30 active:scale-[0.98]
                           transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-[#0d7a6b]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-xl flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {path.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p
                        className={`font-bold text-gray-800 ${base} group-hover:text-[#0d7a6b] transition-colors truncate`}
                      >
                        {path.title}
                      </p>
                      <span
                        className={`flex-shrink-0 bg-[#e6f5f3] text-[#0d7a6b] font-bold ${sm} px-2 py-0.5 rounded-full`}
                      >
                        {path.match}% cocok
                      </span>
                    </div>
                    <p className={`text-gray-500 ${sm} leading-relaxed mb-2`}>
                      {path.desc}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 bg-gray-100 rounded-full h-1.5"
                        role="progressbar"
                        aria-valuenow={path.match}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Kesesuaian ${path.match}%`}
                      >
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${path.color}`}
                          style={{ width: `${path.match}%` }}
                        />
                      </div>
                      <span className={`text-gray-400 ${sm} flex-shrink-0`}>
                        {path.modules} modul
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {!expandCareer && (
          <button
            onClick={() => setExpandCareer(true)}
            className={`mt-3 w-full text-center text-[#0d7a6b] font-semibold ${sm} py-2 hover:underline`}
          >
            Lihat lebih banyak jalur ↓
          </button>
        )}
      </section>

      {/* Daily Challenge Banner */}
      <section className="px-4 mb-8" aria-labelledby="challenge-section">
        <div className="bg-gradient-to-r from-[#f5ede4] to-[#fef9ec] rounded-2xl p-4 border border-[#c9a84c]/30 flex items-center gap-4">
          <div
            className="w-12 h-12 bg-[#c9a84c] rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            aria-hidden="true"
          >
            🏆
          </div>
          <div className="flex-1">
            <h2
              id="challenge-section"
              className={`font-bold text-[#8b5e3c] ${base}`}
            >
              Tantangan Harian
            </h2>
            <p className={`text-[#8b5e3c]/80 ${sm}`}>
              Selesaikan 1 kuis literasi digital hari ini — Raih +50 poin bonus!
            </p>
          </div>
          <Link
            href="/kanca-sinau"
            className={`bg-[#8b5e3c] text-white font-bold ${sm} px-3 py-2 rounded-xl flex-shrink-0
                       hover:bg-[#7a5234] active:scale-95 transition-all`}
            aria-label="Mulai tantangan harian"
          >
            Mulai
          </Link>
        </div>
      </section>
    </div>
  );
}
