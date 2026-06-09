"use client";

import { useApp } from "@/context/AppContext";
import { useState } from "react";

type Project = {
  id: number;
  title: string;
  creator: string;
  avatar: string;
  category: string;
  desc: string;
  tags: string[];
  members: number;
  maxMembers: number;
  likes: number;
  status: "open" | "ongoing" | "full";
};

const projects: Project[] = [
  {
    id: 1,
    title: "JogjaTrash: Pelaporan Sampah Digital",
    creator: "Rizky A.",
    avatar: "R",
    category: "Lingkungan",
    desc: "Aplikasi mobile untuk pelaporan titik sampah ilegal di Sleman & Bantul secara real-time kepada pemerintah kota.",
    tags: ["React Native", "Node.js", "Maps API"],
    members: 3,
    maxMembers: 5,
    likes: 42,
    status: "open",
  },
  {
    id: 2,
    title: "SiMantap: Sistem Informasi UMKM Jogja",
    creator: "Putri H.",
    avatar: "P",
    category: "Ekonomi Lokal",
    desc: "Platform digital yang membantu UMKM lokal Jogja untuk mengelola stok, penjualan, dan laporan keuangan sederhana.",
    tags: ["Next.js", "PostgreSQL", "Tailwind"],
    members: 4,
    maxMembers: 4,
    likes: 67,
    status: "full",
  },
  {
    id: 3,
    title: "WisataJogja AR: Panduan Cagar Budaya",
    creator: "Anisa D.",
    avatar: "A",
    category: "Pariwisata & Budaya",
    desc: "Aplikasi augmented reality untuk wisatawan yang ingin memahami sejarah candi dan situs warisan budaya di DIY.",
    tags: ["Unity", "AR Foundation", "Firebase"],
    members: 2,
    maxMembers: 6,
    likes: 89,
    status: "open",
  },
  {
    id: 4,
    title: "PantauBencana DIY: Mitigasi Berbasis AI",
    creator: "Fajar N.",
    avatar: "F",
    category: "Kebencanaan",
    desc: "Sistem peringatan dini dan peta risiko bencana untuk warga DIY menggunakan data BMKG dan analitik AI.",
    tags: ["Python", "TensorFlow", "Leaflet.js"],
    members: 5,
    maxMembers: 7,
    likes: 110,
    status: "ongoing",
  },
  {
    id: 5,
    title: "BelajarBersama: LMS Open-Source untuk SD Jogja",
    creator: "Hendra W.",
    avatar: "H",
    category: "Pendidikan",
    desc: "Platform belajar gratis untuk murid SD di pelosok DIY yang belum terjangkau internet stabil, berbasis offline-first.",
    tags: ["Vue.js", "IndexedDB", "PWA"],
    members: 3,
    maxMembers: 5,
    likes: 78,
    status: "open",
  },
];

const categoryColors: Record<string, string> = {
  Lingkungan: "bg-[#e6f5f3] text-[#0d7a6b]",
  "Ekonomi Lokal": "bg-[#fef9ec] text-[#8b5e3c]",
  "Pariwisata & Budaya": "bg-[#f0f6ff] text-[#4a6fa5]",
  Kebencanaan: "bg-[#fff0f5] text-[#c0535a]",
  Pendidikan: "bg-[#f5f0ff] text-[#7c4fa5]",
};

const avatarColors = [
  "bg-[#0d7a6b]",
  "bg-[#8b5e3c]",
  "bg-[#4a6fa5]",
  "bg-[#c0535a]",
  "bg-[#7c4fa5]",
];

export default function KaryaJogjaPage() {
  const { largeText } = useApp();
  const [joined, setJoined] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"semua" | "open" | "ongoing">("semua");

  const base = largeText ? "text-base" : "text-sm";
  const sm = largeText ? "text-sm" : "text-xs";
  const h1 = largeText ? "text-2xl" : "text-xl";

  const filtered = projects.filter((p) => {
    if (filter === "semua") return true;
    if (filter === "open") return p.status === "open";
    if (filter === "ongoing")
      return p.status === "ongoing" || p.status === "full";
    return true;
  });

  const handleJoin = (id: number) => {
    setJoined((prev) => ({ ...prev, [id]: true }));
  };

  const statusLabel: Record<
    Project["status"],
    { label: string; color: string }
  > = {
    open: { label: "Buka Tim", color: "text-[#0d7a6b] bg-[#e6f5f3]" },
    ongoing: { label: "Berjalan", color: "text-[#8b5e3c] bg-[#fef9ec]" },
    full: { label: "Tim Penuh", color: "text-gray-500 bg-gray-100" },
  };

  return (
    <div className="bg-[#f7fafa] min-h-full relative">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#0d7a6b] to-[#09564a] px-5 pt-5 pb-8">
        <h1 className={`text-white font-extrabold ${h1} mb-1`}>Karya Jogja</h1>
        <p className={`text-[#a8e6de] ${sm}`}>
          Kolaborasi inovasi warga untuk kota yang lebih cerdas
        </p>
      </div>

      {/* Filter chips */}
      <div
        className="px-4 pt-4 pb-2 flex gap-2 flex-wrap"
        role="group"
        aria-label="Filter proyek"
      >
        {(["semua", "open", "ongoing"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={[
              "px-3 py-1.5 rounded-full font-semibold transition-all",
              sm,
              filter === f
                ? "bg-[#0d7a6b] text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200 hover:border-[#0d7a6b]/30",
            ].join(" ")}
          >
            {f === "semua"
              ? "Semua Proyek"
              : f === "open"
                ? "🟢 Cari Anggota"
                : "🔄 Berjalan"}
          </button>
        ))}
      </div>

      {/* Project Feed */}
      <div className="px-4 pt-2 pb-24 space-y-4">
        {filtered.map((project, idx) => {
          const isJoined = joined[project.id];
          const isFull = project.status === "full";
          const sl = statusLabel[project.status];

          return (
            <article
              key={project.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
                         hover:shadow-md hover:border-[#0d7a6b]/20 transition-all duration-200"
              aria-label={`Proyek: ${project.title}`}
            >
              {/* Top row */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white font-bold flex-shrink-0`}
                  aria-hidden="true"
                >
                  {project.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`font-bold text-gray-800 ${base} leading-snug`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`flex-shrink-0 ${sm} font-semibold px-2 py-0.5 rounded-full ${sl.color}`}
                    >
                      {sl.label}
                    </span>
                  </div>
                  <p className={`text-gray-500 ${sm}`}>
                    oleh {project.creator}
                  </p>
                </div>
              </div>

              {/* Category */}
              <span
                className={`inline-block ${sm} font-semibold px-2 py-0.5 rounded-lg mb-2 ${categoryColors[project.category] || "bg-gray-100 text-gray-600"}`}
              >
                {project.category}
              </span>

              {/* Description */}
              <p className={`text-gray-600 ${sm} leading-relaxed mb-3`}>
                {project.desc}
              </p>

              {/* Tech stack tags */}
              <div
                className="flex flex-wrap gap-1.5 mb-3"
                aria-label="Tech stack"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`bg-gray-100 text-gray-600 rounded-md px-2 py-0.5 font-mono ${sm}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="flex items-center gap-1.5"
                  aria-label={`${project.members} dari ${project.maxMembers} anggota`}
                >
                  <div className="flex -space-x-1.5" aria-hidden="true">
                    {Array.from({ length: Math.min(project.members, 4) }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded-full ${avatarColors[i % avatarColors.length]} border-2 border-white`}
                        />
                      ),
                    )}
                  </div>
                  <span className={`text-gray-500 ${sm}`}>
                    {project.members}/{project.maxMembers} anggota
                  </span>
                </div>
                <div
                  className="flex items-center gap-1"
                  aria-label={`${project.likes} suka`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-[#c0535a]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className={`text-gray-500 ${sm}`}>{project.likes}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => !isFull && !isJoined && handleJoin(project.id)}
                  disabled={isFull || isJoined}
                  aria-label={
                    isJoined
                      ? `Sudah bergabung ke ${project.title}`
                      : isFull
                        ? `Tim ${project.title} sudah penuh`
                        : `Bergabung ke tim ${project.title}`
                  }
                  className={[
                    "flex-1 py-2.5 rounded-xl font-bold transition-all duration-200",
                    base,
                    isJoined
                      ? "bg-[#e6f5f3] text-[#0d7a6b] cursor-default"
                      : isFull
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#0d7a6b] text-white hover:bg-[#09564a] active:scale-[0.98] shadow-sm",
                  ].join(" ")}
                >
                  {isJoined
                    ? "✓ Sudah Bergabung"
                    : isFull
                      ? "Tim Penuh"
                      : "Join Tim →"}
                </button>
                <button
                  aria-label={`Urun rembuk di proyek ${project.title}`}
                  className={[
                    "px-4 py-2.5 rounded-xl font-bold border transition-all duration-200",
                    base,
                    "border-[#0d7a6b]/30 text-[#0d7a6b] hover:bg-[#e6f5f3] active:scale-[0.98]",
                  ].join(" ")}
                >
                  Urun Rembuk
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* FAB: Unggah Inovasi */}
      <button
        onClick={() => setShowModal(true)}
        aria-label="Unggah inovasi baru"
        className="absolute bottom-20 right-4 z-40 w-14 h-14 bg-[#0d7a6b] text-white rounded-full
                   shadow-xl flex items-center justify-center fab-pulse
                   hover:bg-[#09564a] active:scale-90 transition-all duration-200"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Modal: Upload Innovation */}
      {showModal && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="w-full bg-white rounded-t-3xl px-5 pt-5 pb-10 shadow-2xl">
            <div
              className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"
              aria-hidden="true"
            />
            <h2
              id="modal-title"
              className={`font-extrabold text-gray-800 ${h1} mb-1`}
            >
              Unggah Inovasi
            </h2>
            <p className={`text-gray-500 ${sm} mb-5`}>
              Bagikan ide atau proyek inovatif Anda kepada warga dan mitra
              Jogja.
            </p>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="proj-title"
                  className={`block font-semibold text-gray-700 ${sm} mb-1`}
                >
                  Nama Proyek / Inovasi
                </label>
                <input
                  id="proj-title"
                  type="text"
                  placeholder="Contoh: JogjaEdu — LMS untuk Lansia"
                  className={`w-full border border-gray-200 rounded-xl px-3 py-2.5 ${base} focus:outline-none focus:ring-2 focus:ring-[#0d7a6b] placeholder:text-gray-400`}
                />
              </div>
              <div>
                <label
                  htmlFor="proj-desc"
                  className={`block font-semibold text-gray-700 ${sm} mb-1`}
                >
                  Deskripsi Singkat
                </label>
                <textarea
                  id="proj-desc"
                  rows={3}
                  placeholder="Jelaskan masalah yang ingin Anda selesaikan..."
                  className={`w-full border border-gray-200 rounded-xl px-3 py-2.5 ${base} resize-none focus:outline-none focus:ring-2 focus:ring-[#0d7a6b] placeholder:text-gray-400`}
                />
              </div>
              <div>
                <label
                  htmlFor="proj-tags"
                  className={`block font-semibold text-gray-700 ${sm} mb-1`}
                >
                  Tech Stack (pisahkan dengan koma)
                </label>
                <input
                  id="proj-tags"
                  type="text"
                  placeholder="React, Python, Firebase..."
                  className={`w-full border border-gray-200 rounded-xl px-3 py-2.5 ${base} focus:outline-none focus:ring-2 focus:ring-[#0d7a6b] placeholder:text-gray-400`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 py-3 rounded-xl border border-gray-200 font-bold ${base} text-gray-600 hover:bg-gray-50 active:scale-95 transition-all`}
              >
                Batal
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 py-3 rounded-xl bg-[#0d7a6b] text-white font-bold ${base} hover:bg-[#09564a] active:scale-95 transition-all shadow-sm`}
              >
                Unggah Sekarang 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
