'use client'

import { useApp } from '@/context/AppContext'
import { useState } from 'react'

type Tab = 'literasi' | 'internet' | 'bootcamp'

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: 'literasi', label: 'Literasi Dasar', emoji: '📚' },
  { id: 'internet', label: 'Internet Sehat', emoji: '🛡️' },
  { id: 'bootcamp', label: 'Talenta Jogja', emoji: '🚀' },
]

type Module = {
  id: number
  title: string
  desc: string
  progress: number
  pts: number
  duration: string
  level: string
  voiceGuide: boolean
  interactiveVideo: boolean
  instructor: string
}

const moduleData: Record<Tab, Module[]> = {
  literasi: [
    {
      id: 1,
      title: 'Mengenal Informasi Hoaks',
      desc: 'Pelajari cara memilah berita palsu dan menjaga kesehatan informasi digital Anda.',
      progress: 100,
      pts: 80,
      duration: '45 mnt',
      level: 'Pemula',
      voiceGuide: true,
      interactiveVideo: false,
      instructor: 'Budi Santoso',
    },
    {
      id: 2,
      title: 'Literasi Media Sosial untuk Warga',
      desc: 'Gunakan media sosial secara bijak, produktif, dan bertanggung jawab.',
      progress: 40,
      pts: 80,
      duration: '60 mnt',
      level: 'Pemula',
      voiceGuide: true,
      interactiveVideo: true,
      instructor: 'Siti Rahayu',
    },
    {
      id: 3,
      title: 'Transaksi Digital Aman',
      desc: 'Lindungi data finansial Anda saat berbelanja & bertransaksi secara online.',
      progress: 0,
      pts: 100,
      duration: '50 mnt',
      level: 'Menengah',
      voiceGuide: false,
      interactiveVideo: true,
      instructor: 'Dwi Prakoso',
    },
  ],
  internet: [
    {
      id: 4,
      title: 'Keamanan Kata Sandi & Akun',
      desc: 'Buat kata sandi yang kuat dan aktifkan verifikasi dua langkah untuk melindungi akun.',
      progress: 65,
      pts: 90,
      duration: '40 mnt',
      level: 'Pemula',
      voiceGuide: true,
      interactiveVideo: true,
      instructor: 'Rina Kusuma',
    },
    {
      id: 5,
      title: 'Etika Berinteraksi di Dunia Digital',
      desc: 'Pahami norma, sopan santun, dan hak privasi di ruang digital.',
      progress: 20,
      pts: 70,
      duration: '35 mnt',
      level: 'Pemula',
      voiceGuide: true,
      interactiveVideo: false,
      instructor: 'Agus Winarno',
    },
    {
      id: 6,
      title: 'Menghindari Penipuan Online (Phishing)',
      desc: 'Kenali modus penipuan siber dan cara melaporkannya ke pihak berwenang.',
      progress: 0,
      pts: 120,
      duration: '55 mnt',
      level: 'Menengah',
      voiceGuide: false,
      interactiveVideo: true,
      instructor: 'Hendra Wijaya',
    },
  ],
  bootcamp: [
    {
      id: 7,
      title: 'HTML & CSS Dasar',
      desc: 'Fondasi membangun halaman web: struktur, tampilan, dan prinsip desain responsif.',
      progress: 75,
      pts: 150,
      duration: '3 jam',
      level: 'Pemula',
      voiceGuide: false,
      interactiveVideo: true,
      instructor: 'Rizky Aditya',
    },
    {
      id: 8,
      title: 'JavaScript Esensial',
      desc: 'Buat halaman web interaktif menggunakan JavaScript modern dan logika pemrograman.',
      progress: 10,
      pts: 200,
      duration: '5 jam',
      level: 'Menengah',
      voiceGuide: false,
      interactiveVideo: true,
      instructor: 'Putri Handayani',
    },
    {
      id: 9,
      title: 'Desain UI dengan Figma',
      desc: 'Kuasai tools desain UI/UX profesional dan ciptakan prototipe aplikasi lokal.',
      progress: 0,
      pts: 180,
      duration: '4 jam',
      level: 'Pemula',
      voiceGuide: true,
      interactiveVideo: true,
      instructor: 'Anisa Dewi',
    },
    {
      id: 10,
      title: 'Dasar-Dasar Python untuk Data',
      desc: 'Mulai perjalanan analitik data Anda dengan Python — dari variabel hingga visualisasi.',
      progress: 0,
      pts: 220,
      duration: '6 jam',
      level: 'Menengah',
      voiceGuide: false,
      interactiveVideo: true,
      instructor: 'Fajar Nugroho',
    },
  ],
}

export default function KancaSinaUPage() {
  const { largeText, addPoints } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('literasi')
  const [started, setStarted] = useState<Record<number, boolean>>({})

  const base = largeText ? 'text-base' : 'text-sm'
  const sm = largeText ? 'text-sm' : 'text-xs'
  const h1 = largeText ? 'text-2xl' : 'text-xl'

  const handleStart = (mod: Module) => {
    if (started[mod.id] || mod.progress === 100) return
    setStarted((prev) => ({ ...prev, [mod.id]: true }))
    if (mod.progress === 0) addPoints(Math.round(mod.pts * 0.1))
  }

  return (
    <div className="bg-[#f7fafa] min-h-full">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#0d7a6b] to-[#09564a] px-5 pt-5 pb-8">
        <h1 className={`text-white font-extrabold ${h1} mb-1`}>Kanca SinaU</h1>
        <p className={`text-[#a8e6de] ${sm}`}>Pilih modul & mulai perjalanan belajarmu hari ini</p>
      </div>

      {/* Tabs */}
      <div
        className="flex bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100"
        role="tablist"
        aria-label="Kategori Modul Belajar"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 relative transition-all',
                'active:bg-gray-50',
                active ? 'text-[#0d7a6b]' : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
            >
              <span className={`${sm} leading-none`} aria-hidden="true">{tab.emoji}</span>
              <span className={`${sm} font-semibold leading-tight text-center`}>{tab.label}</span>
              {active && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0d7a6b] rounded-full tab-active-bar"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Module List */}
      <div
        className="px-4 pt-4 pb-4 space-y-4"
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {moduleData[activeTab].map((mod) => {
          const done = mod.progress === 100
          const inProgress = mod.progress > 0 && mod.progress < 100
          const isStarted = started[mod.id]

          return (
            <article
              key={mod.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
                         hover:shadow-md hover:border-[#0d7a6b]/20 transition-all duration-200"
              aria-label={`Modul: ${mod.title}`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className={`font-bold text-gray-800 ${base} leading-snug`}>{mod.title}</h3>
                    {done && (
                      <span className="bg-[#e6f5f3] text-[#0d7a6b] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ Selesai
                      </span>
                    )}
                  </div>
                  <p className={`text-gray-500 ${sm} leading-relaxed`}>{mod.desc}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className={`text-[#c9a84c] font-extrabold ${base} leading-none`}>+{mod.pts}</p>
                  <p className={`text-[#c9a84c] ${sm} leading-none`}>poin</p>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 ${sm} font-medium`}>
                  ⏱ {mod.duration}
                </span>
                <span className={[
                  'rounded-full px-2 py-0.5 font-medium',
                  sm,
                  mod.level === 'Pemula' ? 'bg-[#e6f5f3] text-[#0d7a6b]' : 'bg-[#fef9ec] text-[#8b5e3c]',
                ].join(' ')}>
                  {mod.level}
                </span>
                <span className={`text-gray-500 ${sm}`}>oleh {mod.instructor}</span>
              </div>

              {/* Accessibility badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3" aria-label="Fitur aksesibilitas">
                {mod.voiceGuide && (
                  <span
                    className={`inline-flex items-center gap-1 bg-[#f0f6ff] text-[#4a6fa5] border border-[#4a6fa5]/20 rounded-full px-2 py-0.5 ${sm} font-medium`}
                    title="Modul ini mendukung panduan suara untuk pengguna tunanetra"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" aria-hidden="true">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Voice Guiding
                  </span>
                )}
                {mod.interactiveVideo && (
                  <span
                    className={`inline-flex items-center gap-1 bg-[#fff0f5] text-[#c0535a] border border-[#c0535a]/20 rounded-full px-2 py-0.5 ${sm} font-medium`}
                    title="Modul ini menggunakan video interaktif"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" aria-hidden="true">
                      <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                    </svg>
                    Video Interaktif
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-gray-500 ${sm}`}>
                    {done ? 'Sudah selesai!' : inProgress ? 'Sedang berlangsung' : 'Belum dimulai'}
                  </span>
                  <span className={`font-semibold ${sm} ${done ? 'text-[#0d7a6b]' : 'text-gray-600'}`}>
                    {mod.progress}%
                  </span>
                </div>
                <div
                  className="bg-gray-100 rounded-full h-2"
                  role="progressbar"
                  aria-valuenow={mod.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Kemajuan ${mod.title}: ${mod.progress}%`}
                >
                  <div
                    className={[
                      'h-2 rounded-full transition-all',
                      done
                        ? 'bg-gradient-to-r from-[#0d7a6b] to-[#14b49a]'
                        : 'bg-gradient-to-r from-[#0d7a6b] to-[#14b49a]',
                    ].join(' ')}
                    style={{ width: `${mod.progress}%` }}
                  />
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => handleStart(mod)}
                disabled={done}
                aria-label={done ? `${mod.title} sudah selesai` : `${inProgress ? 'Lanjutkan' : 'Mulai'} ${mod.title}`}
                className={[
                  'w-full py-2.5 rounded-xl font-bold transition-all duration-200',
                  base,
                  done
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isStarted || inProgress
                    ? 'bg-[#e6f5f3] text-[#0d7a6b] hover:bg-[#0d7a6b] hover:text-white active:scale-[0.98]'
                    : 'bg-[#0d7a6b] text-white hover:bg-[#09564a] active:scale-[0.98] shadow-sm',
                ].join(' ')}
              >
                {done ? '✓ Selesai' : isStarted || inProgress ? 'Lanjutkan Belajar →' : 'Mulai Belajar →'}
              </button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
