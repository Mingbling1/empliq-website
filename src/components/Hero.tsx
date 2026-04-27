'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'

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

const previewVariants = {
  hidden: { opacity: 0, y: 28, rotateX: 8, rotateY: -10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.25,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const floatingCardVariants = {
  hidden: { opacity: 0, scale: 0.86, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

const MOCK_REVIEWS = [
  {
    nickname: 'ValienteCondor42',
    avatar: '/illustrations/avatars/avatar_2094458_01.png',
    badge: 'Empleado actual',
    rating: 4,
    title: 'Buen ambiente, pero el sueldo no alcanza',
    body: 'La gente es bacan y se aprende bastante, pero para lo que exigen merecemos ganar mejor.',
  },
  {
    nickname: 'InkaDigital88',
    avatar: '/illustrations/avatars/avatar_2094458_04.png',
    badge: null,
    rating: 3,
    title: 'Mucha chamba, poca plata',
    body: 'Horas extras sin pagar y poco reconocimiento. Los beneficios ayudan, pero tus horas valen mas.',
  },
]

const MOCK_SALARIES = [
  { title: 'Senior Software Engineer', company: 'BCP', salary: 'S/12,000', reports: 23 },
  { title: 'Product Manager', company: 'Interbank', salary: 'S/15,000', reports: 14 },
  { title: 'UX Designer', company: 'Alicorp', salary: 'S/8,000', reports: 9 },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3 w-3 ${star <= rating ? 'fill-neutral-800 text-neutral-800' : 'text-neutral-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {index < text.split(' ').length - 1 ? <span className="inline-block w-[0.28em]" /> : null}
        </motion.span>
      ))}
    </span>
  )
}

function SalarySignal() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.8)_44%,transparent_70%)] opacity-60 hero-salary-scan" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">Brecha detectada</p>
          <p className="mt-1 text-sm font-semibold text-neutral-900">Oferta vs mercado real</p>
        </div>
        <div className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-green-700 hero-salary-chip">
          +S/4.3k
        </div>
      </div>

      <div className="relative mt-5 h-[168px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 168" fill="none" aria-hidden="true">
          <path d="M72 86 C132 38 181 38 242 86 C285 121 320 121 365 80" stroke="#d4d4d8" strokeWidth="1.2" strokeDasharray="4 5" />
          <path className="hero-salary-conn" d="M72 86 C132 38 181 38 242 86 C285 121 320 121 365 80" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <circle className="hero-salary-node" cx="72" cy="86" r="20" stroke="#a3a3a3" strokeWidth="1" fill="white" />
          <circle className="hero-salary-node hero-delay-1" cx="242" cy="86" r="20" stroke="#a3a3a3" strokeWidth="1" fill="white" />
          <circle className="hero-salary-node hero-delay-2" cx="365" cy="80" r="20" stroke="#22c55e" strokeWidth="1" fill="#f0fdf4" />
          <circle className="hero-salary-dot" cx="72" cy="86" r="5" fill="#71717a" />
          <circle className="hero-salary-dot hero-delay-1" cx="242" cy="86" r="5" fill="#71717a" />
          <circle className="hero-salary-dot hero-delay-2" cx="365" cy="80" r="5" fill="#22c55e" />
        </svg>

        <div className="absolute bottom-0 left-3 right-3 grid h-[132px] grid-cols-3 items-end gap-4">
          <div>
            <div className="mb-2 text-center font-mono text-[10px] text-neutral-400">Oferta</div>
            <div className="relative mx-auto h-[78px] w-14 overflow-hidden rounded-t-xl border border-neutral-200 bg-neutral-100">
              <div className="absolute bottom-0 h-[56%] w-full bg-neutral-500/70" />
            </div>
            <p className="mt-2 text-center font-mono text-xs font-semibold text-neutral-700">S/8.2k</p>
          </div>
          <div>
            <div className="mb-2 text-center font-mono text-[10px] text-neutral-400">Rango</div>
            <div className="relative mx-auto h-[104px] w-14 overflow-hidden rounded-t-xl border border-neutral-200 bg-neutral-100">
              <div className="absolute bottom-0 h-[86%] w-full bg-neutral-900" />
              <div className="absolute bottom-[56%] left-0 right-0 h-px bg-white/80" />
            </div>
            <p className="mt-2 text-center font-mono text-xs font-semibold text-neutral-900">S/12.5k</p>
          </div>
          <div>
            <div className="mb-2 text-center font-mono text-[10px] text-green-700">Gap</div>
            <div className="relative mx-auto h-[104px] w-14 overflow-hidden rounded-t-xl border border-green-200 bg-green-50">
              <div className="absolute bottom-0 w-full bg-green-500/70 hero-salary-fill" />
            </div>
            <p className="mt-2 text-center font-mono text-xs font-semibold text-green-700">+52%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const [activeTab, setActiveTab] = useState<'salarios' | 'resenas'>('salarios')

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTab((prev) => (prev === 'salarios' ? 'resenas' : 'salarios'))
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden lg:min-h-0 lg:flex-1">
      <Shader3 className="!fixed !top-20 !h-[calc(100vh+800px)]" color="#808080" />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(0,0,0,0.09),transparent_29%),radial-gradient(circle_at_18%_74%,rgba(34,197,94,0.08),transparent_26%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-7 pt-5 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <motion.div
            className="flex flex-col gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex self-start">
              <div className="rounded-full border border-neutral-300/70 bg-white/55 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl">
                <span className="text-sm font-medium text-neutral-700">Buscador de salarios y empresas</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-3xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.06em] text-neutral-950 sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              <AnimatedHeadline text="Todos merecemos" />{' '}
              <span className="text-neutral-500">
                <AnimatedHeadline text="saber cuanto vale nuestro trabajo." />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg"
            >
              Compara sueldos reales por empresa, lee resenas anonimas y evita aceptar una oferta por debajo del mercado peruano.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/empresas"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 active:scale-[0.98]"
              >
                Explorar empresas
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/salarios"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/60 px-6 py-3 text-sm font-medium text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 active:scale-[0.98]"
              >
                Ver salarios
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 4, 6].map((avatar) => (
                  <Image
                    key={avatar}
                    src={`/illustrations/avatars/avatar_2094458_0${avatar}.png`}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-700">
                <span className="font-semibold text-neutral-950">85,000+</span> empresas y datos reales de la comunidad
              </p>
            </motion.div>
          </motion.div>

          <div className="relative lg:pl-4">
            <motion.div
              variants={previewVariants}
              initial="hidden"
              animate="visible"
              className="relative overflow-hidden rounded-[1.65rem] border border-neutral-200 bg-white/82 shadow-[0_32px_90px_-45px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-2 border-b border-neutral-200/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="rounded-lg bg-neutral-100 px-4 py-1 font-mono text-xs text-neutral-500">
                    empliq.io/salarios
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-neutral-50/90 p-4 sm:p-5">
                <SalarySignal />

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Salario promedio', value: 'S/8,500' },
                    { label: 'Puestos activos', value: '2,340' },
                    { label: 'Empresas', value: '85,455' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-neutral-100 bg-white p-3.5 shadow-sm">
                      <p className="mb-1 text-[10px] text-neutral-500">{stat.label}</p>
                      <p className="text-base font-bold text-neutral-950">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-1">
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { key: 'salarios' as const, label: 'Salarios' },
                      { key: 'resenas' as const, label: 'Resenas' },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative overflow-hidden rounded-lg py-2 text-xs font-medium transition-colors ${
                          activeTab === tab.key ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-700'
                        }`}
                      >
                        {activeTab === tab.key ? (
                          <motion.span
                            layoutId="hero-tab-indicator"
                            className="absolute inset-0 rounded-lg bg-neutral-100 shadow-sm"
                            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                          />
                        ) : null}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="min-h-[170px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'salarios' ? (
                      <motion.div
                        key="salarios"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="space-y-2"
                      >
                        {MOCK_SALARIES.map((job) => (
                          <div key={`${job.company}-${job.title}`} className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-white px-3.5 py-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                              <svg className="h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-neutral-950">{job.title}</p>
                              <p className="text-[10px] text-neutral-400">{job.company} · {job.reports} reportes</p>
                            </div>
                            <span className="shrink-0 font-mono text-sm font-bold text-neutral-950">{job.salary}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="resenas"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="space-y-3"
                      >
                        {MOCK_REVIEWS.map((review) => (
                          <div key={review.nickname} className="rounded-lg border border-neutral-100 bg-white p-3.5">
                            <div className="mb-2 flex items-center gap-2.5">
                              <Image
                                src={review.avatar}
                                alt={review.nickname}
                                width={28}
                                height={28}
                                className="rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="truncate text-xs font-medium text-neutral-800">{review.nickname}</span>
                                  {review.badge ? (
                                    <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[9px] text-neutral-500">
                                      {review.badge}
                                    </span>
                                  ) : null}
                                </div>
                                <StarRow rating={review.rating} />
                              </div>
                            </div>
                            <p className="mb-0.5 text-xs font-medium text-neutral-800">{review.title}</p>
                            <p className="line-clamp-2 text-[11px] leading-relaxed text-neutral-500">{review.body}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={0.75}
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              className="absolute -left-7 top-[35%] hidden rounded-2xl border border-neutral-200 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl lg:block drift-y"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/illustrations/avatars/avatar_2094458_07.png"
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-semibold text-neutral-950">FieroAlpaca99</p>
                  <p className="text-[10px] text-neutral-400">Reporto su sueldo</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={0.95}
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              className="absolute -right-5 bottom-[24%] hidden rounded-2xl border border-neutral-200 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl lg:block drift-y-reverse"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-950">98%</p>
                  <p className="text-[10px] text-neutral-500">Datos verificados</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[2] h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
