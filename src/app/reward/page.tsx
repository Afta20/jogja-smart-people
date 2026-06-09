"use client";

import { useApp } from "@/context/AppContext";
import { useState } from "react";

type RewardItem = {
  id: number;
  title: string;
  subtitle: string;
  cost: number;
  icon: string;
  category: string;
  stock: number;
  popular?: boolean;
};

const rewards: RewardItem[] = [
  {
    id: 1,
    title: "Voucher TransJogja",
    subtitle: "Gratis naik bus TransJogja 3x perjalanan",
    cost: 500,
    icon: "🚌",
    category: "Transportasi",
    stock: 50,
    popular: true,
  },
  {
    id: 2,
    title: "Saldo E-Wallet Rp20.000",
    subtitle: "Dikirim ke GoPay, OVO, atau Dana",
    cost: 1000,
    icon: "💰",
    category: "E-Wallet",
    stock: 100,
    popular: true,
  },
  {
    id: 3,
    title: "Voucher Belanja Malioboro",
    subtitle: "Nikmati diskon 15% di toko pilihan Malioboro",
    cost: 750,
    icon: "🛍️",
    category: "Belanja",
    stock: 30,
  },
  {
    id: 4,
    title: "Kuota Internet 5GB",
    subtitle: "Berlaku untuk semua operator Indonesia",
    cost: 600,
    icon: "📶",
    category: "Internet",
    stock: 75,
  },
  {
    id: 5,
    title: "Tiket Masuk Museum Sonobudoyo",
    subtitle: "Jelajahi warisan budaya Keraton Yogyakarta",
    cost: 300,
    icon: "🏛️",
    category: "Wisata",
    stock: 20,
    popular: true,
  },
  {
    id: 6,
    title: "Sertifikat Digital Talenta Jogja",
    subtitle: "Sertifikat resmi bertanda tangan Dinas Kominfo DIY",
    cost: 400,
    icon: "🎓",
    category: "Sertifikat",
    stock: 999,
  },
  {
    id: 7,
    title: "Diskon Kopi Angkringan Digital",
    subtitle: "Nikmati kopi gratis di 10 kafe mitra Jogja Smart City",
    cost: 200,
    icon: "☕",
    category: "Kuliner",
    stock: 150,
  },
  {
    id: 8,
    title: "Saldo E-Wallet Rp50.000",
    subtitle: "Dikirim ke GoPay, OVO, atau Dana",
    cost: 2500,
    icon: "💳",
    category: "E-Wallet",
    stock: 40,
  },
];

const categoryColors: Record<string, string> = {
  Transportasi: "bg-[#e6f5f3] text-[#0d7a6b]",
  "E-Wallet": "bg-[#fef9ec] text-[#8b5e3c]",
  Belanja: "bg-[#fff0f5] text-[#c0535a]",
  Internet: "bg-[#f0f6ff] text-[#4a6fa5]",
  Wisata: "bg-[#f5ede4] text-[#8b5e3c]",
  Sertifikat: "bg-[#f5f0ff] text-[#7c4fa5]",
  Kuliner: "bg-[#fef9ec] text-[#8b5e3c]",
};

const levelData = [
  { level: 1, label: "Warga Digital", min: 0, max: 500 },
  { level: 2, label: "Pelajar Aktif", min: 500, max: 1000 },
  { level: 3, label: "Talenta Muda", min: 1000, max: 2000 },
  { level: 4, label: "Inovator Jogja", min: 2000, max: 3500 },
  { level: 5, label: "Duta Smart City", min: 3500, max: 5000 },
];

export default function RewardPage() {
  const { largeText, points, addPoints } = useApp();
  const [redeemed, setRedeemed] = useState<Record<number, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<string>("Semua");

  const base = largeText ? "text-base" : "text-sm";
  const sm = largeText ? "text-sm" : "text-xs";
  const h1 = largeText ? "text-2xl" : "text-xl";
  const h2 = largeText ? "text-xl" : "text-base";

  const currentLevelData =
    levelData
      .slice()
      .reverse()
      .find((l) => points >= l.min) || levelData[0];
  const nextLevel = levelData.find((l) => l.min > currentLevelData.min);
  const progressToNext = nextLevel
    ? Math.min(
        ((points - currentLevelData.min) /
          (nextLevel.min - currentLevelData.min)) *
          100,
        100,
      )
    : 100;

  const handleRedeem = (item: RewardItem) => {
    if (redeemed[item.id] || points < item.cost) return;
    setRedeemed((prev) => ({ ...prev, [item.id]: true }));
    addPoints(-item.cost);
    setToastMsg(`✅ Berhasil! ${item.title} ditukarkan.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const categories = [
    "Semua",
    ...Array.from(new Set(rewards.map((r) => r.category))),
  ];
  const filtered =
    filterCat === "Semua"
      ? rewards
      : rewards.filter((r) => r.category === filterCat);

  return (
    <div className="bg-[#f7fafa] min-h-full relative">
      {/* Toast */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className={[
            "absolute top-20 left-1/2 -translate-x-1/2 z-50",
            "bg-[#09564a] text-white font-semibold rounded-xl px-4 py-3 shadow-xl",
            sm,
            "max-w-[90vw] text-center",
          ].join(" ")}
        >
          {toastMsg}
        </div>
      )}

      {/* Hero + Level Map wrapper — kartu duduk di dalam hero, tidak overlap */}
      <div className="relative bg-gradient-to-br from-[#0d7a6b] via-[#0a6459] to-[#09564a] overflow-hidden">
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -left-10 w-44 h-44 rounded-full bg-white/5"
          aria-hidden="true"
        />

        {/* Hero text content */}
        <div className="px-5 pt-5 pb-4">
          <h1 className={`text-white font-extrabold ${h1} mb-4`}>
            SinaU Reward
          </h1>

          {/* Points card */}
          <div className="bg-white/15 backdrop-blur rounded-2xl border border-white/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={`text-[#a8e6de] ${sm} font-medium`}>
                  Total SinaU Points
                </p>
                <p
                  className={`text-white font-extrabold leading-none mt-0.5`}
                  style={{ fontSize: largeText ? "2.5rem" : "2rem" }}
                >
                  {points.toLocaleString("id-ID")}
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl bg-[#c9a84c] flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-9 h-9 text-white"
                  fill="currentColor"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
            </div>

            {/* Level badge */}
            <div className="flex items-center justify-between mb-2">
              <span className={`text-white font-bold ${base}`}>
                Lv. {currentLevelData.level} — {currentLevelData.label}
              </span>
              {nextLevel && (
                <span className={`text-[#a8e6de] ${sm}`}>
                  Menuju Lv. {nextLevel.level}:{" "}
                  {(nextLevel.min - points).toLocaleString("id-ID")} pts lagi
                </span>
              )}
            </div>

            {/* Level progress bar */}
            <div
              className="bg-white/20 rounded-full h-2"
              role="progressbar"
              aria-valuenow={Math.round(progressToNext)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress ke level berikutnya: ${Math.round(progressToNext)}%`}
            >
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8cc79] transition-all"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
        </div>
        {/* end px-5 hero text wrapper */}

        {/* Level Roadmap — di dalam wrapper hijau, padding bawah jadi penutup */}
        <section
          className="relative px-4 pb-6 pt-4"
          aria-labelledby="level-section"
        >
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h2
              id="level-section"
              className={`font-bold text-gray-800 ${base} mb-3`}
            >
              Peta Level SinaU
            </h2>
            <div
              className="flex items-center gap-1 overflow-x-auto pb-1"
              role="list"
              aria-label="Level perjalanan"
            >
              {levelData.map((l, i) => {
                const reached = points >= l.min;
                return (
                  <div
                    key={l.level}
                    className="flex items-center gap-1 flex-shrink-0"
                    role="listitem"
                  >
                    <div
                      className={[
                        "flex flex-col items-center gap-0.5",
                        reached ? "opacity-100" : "opacity-40",
                      ].join(" ")}
                      aria-label={`Level ${l.level}: ${l.label} — ${reached ? "Tercapai" : "Belum tercapai"}`}
                    >
                      <div
                        className={[
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                          sm,
                          reached && l.level === currentLevelData.level
                            ? "bg-[#0d7a6b] text-white ring-2 ring-[#0d7a6b] ring-offset-1"
                            : reached
                              ? "bg-[#e6f5f3] text-[#0d7a6b]"
                              : "bg-gray-100 text-gray-400",
                        ].join(" ")}
                      >
                        {l.level}
                      </div>
                      <span
                        className={`${sm} text-gray-600 text-center leading-tight`}
                        style={{ fontSize: "9px", maxWidth: 48 }}
                      >
                        {l.label}
                      </span>
                    </div>
                    {i < levelData.length - 1 && (
                      <div
                        className={`w-6 h-0.5 rounded-full flex-shrink-0 mb-3 ${points >= levelData[i + 1].min ? "bg-[#0d7a6b]" : "bg-gray-200"}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      {/* end hero+level wrapper */}

      {/* Category filter */}
      <div
        className="px-4 mb-3 flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Filter kategori hadiah"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            aria-pressed={filterCat === cat}
            className={[
              "flex-shrink-0 px-3 py-1.5 rounded-full font-semibold transition-all",
              sm,
              filterCat === cat
                ? "bg-[#0d7a6b] text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200 hover:border-[#0d7a6b]/30",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reward Grid */}
      <section className="px-4 pb-8" aria-labelledby="rewards-section">
        <h2
          id="rewards-section"
          className={`font-bold text-gray-800 ${base} mb-3`}
        >
          Pilih Hadiah
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item) => {
            const canAfford = points >= item.cost;
            const isRedeemed = redeemed[item.id];

            return (
              <article
                key={item.id}
                className={[
                  "bg-white rounded-2xl shadow-sm border p-3 flex flex-col transition-all duration-200",
                  isRedeemed
                    ? "border-[#0d7a6b]/30 opacity-75"
                    : canAfford
                      ? "border-gray-100 hover:shadow-md hover:border-[#0d7a6b]/20"
                      : "border-gray-100 opacity-60",
                ].join(" ")}
                aria-label={`Hadiah: ${item.title}, ${item.cost} poin`}
              >
                {/* Icon + popular badge */}
                <div className="flex items-start justify-between mb-2">
                  <div
                    className="w-10 h-10 bg-[#f7fafa] rounded-xl flex items-center justify-center text-2xl"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {item.popular && (
                      <span className="bg-[#c9a84c] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        POPULER
                      </span>
                    )}
                    <span
                      className={`${categoryColors[item.category] || "bg-gray-100 text-gray-600"} font-semibold rounded-full px-1.5 py-0.5`}
                      style={{ fontSize: "9px" }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <h3
                  className={`font-bold text-gray-800 ${sm} leading-snug mb-0.5`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-gray-500 flex-1 leading-tight mb-2`}
                  style={{ fontSize: "10px" }}
                >
                  {item.subtitle}
                </p>

                {/* Cost */}
                <div className="flex items-center gap-1 mb-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 text-[#c9a84c]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                  <span className={`text-[#8b5e3c] font-extrabold ${sm}`}>
                    {item.cost.toLocaleString("id-ID")} pts
                  </span>
                </div>

                <button
                  onClick={() => handleRedeem(item)}
                  disabled={!canAfford || isRedeemed}
                  aria-label={
                    isRedeemed
                      ? `${item.title} sudah ditukarkan`
                      : !canAfford
                        ? `Poin tidak cukup untuk ${item.title}`
                        : `Tukar ${item.title} dengan ${item.cost} poin`
                  }
                  className={[
                    "w-full py-2 rounded-xl font-bold transition-all duration-200",
                    sm,
                    isRedeemed
                      ? "bg-[#e6f5f3] text-[#0d7a6b] cursor-default"
                      : !canAfford
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#0d7a6b] text-white hover:bg-[#09564a] active:scale-[0.98]",
                  ].join(" ")}
                >
                  {isRedeemed
                    ? "✓ Ditukar"
                    : !canAfford
                      ? "Poin Kurang"
                      : "Tukar"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Transaction History CTA */}
      <section className="px-4 mb-8">
        <div className="bg-gradient-to-r from-[#f5ede4] to-[#fef9ec] rounded-2xl p-4 border border-[#c9a84c]/30">
          <h2 className={`font-bold text-[#8b5e3c] ${base} mb-1`}>
            Riwayat Penukaran
          </h2>
          <p className={`text-[#8b5e3c]/80 ${sm} mb-3`}>
            Lihat semua histori poin & hadiah yang telah Anda tukarkan.
          </p>
          <button
            className={`px-4 py-2 bg-[#8b5e3c] text-white rounded-xl font-bold ${sm}
                        hover:bg-[#7a5234] active:scale-95 transition-all`}
            aria-label="Lihat riwayat penukaran poin"
          >
            Lihat Riwayat →
          </button>
        </div>
      </section>
    </div>
  );
}
