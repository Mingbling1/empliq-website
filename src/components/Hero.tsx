'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Shader3 = dynamic(
  () => import('./Shader3').then((mod) => ({ default: mod.Shader3 })),
  { ssr: false }
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const visualVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 8, rotateY: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      delay: 0.22,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {index < words.length - 1 ? <span className="inline-block w-[0.28em]" /> : null}
        </motion.span>
      ))}
    </span>
  )
}

function SalarySignal() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/88 p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(34,197,94,0.11),transparent_28%)] opacity-80 hero-salary-scan" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:36px_36px] opacity-50" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-400">Comparador salarial</p>
          <h2 className="mt-1 max-w-xs text-lg font-semibold tracking-[-0.04em] text-neutral-950 sm:text-xl">
            La diferencia entre aceptar y negociar.
          </h2>
        </div>
        <div className="self-start rounded-full border border-green-200 bg-green-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-green-700 hero-salary-chip sm:text-xs">
          +S/4,300/mes
        </div>
      </div>

      <div className="relative mt-6 h-[205px] sm:h-[220px]">
        <svg className="absolute inset-x-0 top-0 h-[88px] w-full" viewBox="0 0 480 100" fill="none" aria-hidden="true">
          <path d="M60 62 C136 24 196 24 252 52 C300 76 360 72 428 36" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="4 6" />
          <path className="hero-salary-conn" d="M60 62 C136 24 196 24 252 52 C300 76 360 72 428 36" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" />
          <circle className="hero-salary-node" cx="60" cy="62" r="13" stroke="#a3a3a3" strokeWidth="1" fill="white" />
          <circle className="hero-salary-node hero-delay-1" cx="252" cy="52" r="13" stroke="#737373" strokeWidth="1" fill="white" />
          <circle className="hero-salary-node hero-delay-2" cx="428" cy="36" r="13" stroke="#22c55e" strokeWidth="1" fill="#f0fdf4" />
          <circle className="hero-salary-dot" cx="60" cy="62" r="3.5" fill="#737373" />
          <circle className="hero-salary-dot hero-delay-1" cx="252" cy="52" r="3.5" fill="#171717" />
          <circle className="hero-salary-dot hero-delay-2" cx="428" cy="36" r="3.5" fill="#22c55e" />
          <circle className="hero-salary-tracer" r="3" fill="#22c55e">
            <animateMotion dur="5.8s" repeatCount="indefinite" path="M60 62 C136 24 196 24 252 52 C300 76 360 72 428 36" />
          </circle>
        </svg>

        <div className="absolute bottom-0 left-0 right-0 grid h-[132px] grid-cols-3 items-end gap-2 sm:h-[150px] sm:gap-4">
          <div className="hero-salary-column-group">
            <div className="mb-2 text-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-400">Oferta</p>
            </div>
            <div className="relative mx-auto h-[72px] w-12 overflow-hidden rounded-t-lg border border-neutral-200 bg-neutral-100 sm:h-[84px] sm:w-14">
              <div className="absolute bottom-0 h-[58%] w-full bg-neutral-500/70" />
              <div className="absolute inset-x-0 bottom-[58%] h-px bg-white/80" />
            </div>
            <p className="mt-2 text-center font-mono text-xs font-semibold text-neutral-700">S/8.2k</p>
          </div>

          <div className="hero-salary-column-group">
            <div className="mb-2 text-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-400">Rango</p>
            </div>
            <div className="relative mx-auto h-[96px] w-12 overflow-hidden rounded-t-lg border border-neutral-200 bg-neutral-100 sm:h-[110px] sm:w-14">
              <div className="absolute bottom-0 h-[86%] w-full bg-neutral-950" />
              <div className="absolute bottom-[58%] left-0 right-0 h-px bg-white/80" />
              <div className="absolute inset-x-2 bottom-[86%] h-px bg-green-300/90 hero-salary-threshold" />
            </div>
            <p className="mt-2 text-center font-mono text-xs font-semibold text-neutral-950">S/12.5k</p>
          </div>

          <div className="hero-salary-column-group">
            <div className="mb-2 text-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-green-700">Gap</p>
            </div>
            <div className="relative mx-auto h-[96px] w-12 overflow-hidden rounded-t-lg border border-green-200 bg-green-50 sm:h-[110px] sm:w-14">
              <div className="absolute bottom-0 w-full bg-green-500/70 hero-salary-fill" />
              <div className="absolute inset-x-0 bottom-[44%] h-px bg-white/85" />
            </div>
            <p className="mt-2 text-center font-mono text-xs font-semibold text-green-700">+52%</p>
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid gap-2 border-t border-neutral-200 pt-3 sm:grid-cols-3">
        <div className="rounded-lg bg-neutral-50 px-2.5 py-2.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-neutral-400">Sin datos</p>
          <p className="mt-0.5 text-xs font-medium text-neutral-700">Aceptas S/8.2k</p>
        </div>
        <div className="rounded-lg bg-neutral-50 px-2.5 py-2.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-neutral-400">Con Empliq</p>
          <p className="mt-0.5 text-xs font-medium text-neutral-950">Ves S/12.5k</p>
        </div>
        <div className="rounded-lg bg-green-50 px-2.5 py-2.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-green-700/75">Resultado</p>
          <p className="mt-0.5 text-xs font-medium text-green-800">Negocias con evidencia</p>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden lg:min-h-0 lg:flex-1">
      <Shader3 className="!fixed !top-20 !h-[calc(100vh+800px)]" color="#808080" />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(0,0,0,0.09),transparent_29%),radial-gradient(circle_at_18%_74%,rgba(34,197,94,0.08),transparent_26%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-6 pt-4 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex self-start">
              <div className="rounded-full border border-neutral-300/70 bg-white/55 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl">
                <span className="text-sm font-medium text-neutral-700">Comparador de salarios por empresa</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-3xl text-[1.85rem] font-semibold leading-[1] tracking-[-0.055em] text-neutral-950 sm:text-4xl md:text-5xl lg:text-[3.5rem]"
            >
              <AnimatedHeadline text="No aceptes" />{' '}
              <span className="text-neutral-500">
                <AnimatedHeadline text="un sueldo equivocado." />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-sm leading-7 text-neutral-600 sm:text-base"
            >
              Empliq te muestra si la oferta esta debajo del rango real de tu puesto y empresa, para negociar con datos antes de decidir.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/salarios"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 active:scale-[0.98]"
              >
                Comparar salarios
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/empresas"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 active:scale-[0.98]"
              >
                Explorar empresas
              </Link>
            </motion.div>

            <motion.p variants={itemVariants} className="max-w-md text-xs leading-6 text-neutral-500 sm:text-sm">
              La visual muestra el punto exacto: lo que te ofrecen, el rango real observado y la brecha que puedes recuperar.
            </motion.p>
          </motion.div>

          <motion.div
            variants={visualVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <SalarySignal />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[2] h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
