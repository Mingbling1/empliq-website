'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const Shader3 = dynamic(
  () => import('./Shader3').then((mod) => ({ default: mod.Shader3 })),
  { ssr: false }
)

// ─── Mock data ───────────────────────────────────────────────────────────────

const MOCK_REVIEWS = [
  {
    nickname: 'ValienteCóndor42',
    avatar: '/illustrations/avatars/avatar_2094458_01.png',
    badge: 'Empleado actual',
    rating: 4,
    title: 'Buen ambiente, pero el sueldo no alcanza',
    body: 'La gente es bacán y se aprende un montón, pero para lo que te exigen merecemos ganar mejor.',
  },
  {
    nickname: 'InkaDigital88',
    avatar: '/illustrations/avatars/avatar_2094458_04.png',
    badge: null,
    rating: 3,
    title: 'Mucha chamba, poca plata',
    body: 'Horas extras sin pagar y cero reconocimiento. Los beneficios están bien pero tus horas valen más.',
  },
]

const MOCK_SALARIES = [
  { title: 'Senior Software Engineer', company: 'BCP', salary: 'S/12,000', reports: 23 },
  { title: 'Product Manager', company: 'Interbank', salary: 'S/15,000', reports: 14 },
  { title: 'UX Designer', company: 'Alicorp', salary: 'S/8,000', reports: 9 },
]

// ─── Small components ────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? 'text-neutral-800 fill-neutral-800' : 'text-neutral-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 1.5,
}: {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const counter = useRef({ val: 0 })

  useGSAP(() => {
    gsap.to(counter.current, {
      val: end,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(counter.current.val).toLocaleString()}${suffix}`
        }
      },
    })
  })

  return <span ref={ref}>{prefix}0{suffix}</span>
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'salarios' | 'reseñas'>('salarios')
  const [isAnimating, setIsAnimating] = useState(false)

  // Refs
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineCharsRef = useRef<HTMLSpanElement>(null)
  const gradientLineRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialProofRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)
  const statsRowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const salariesRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  // 3D tilt state (desktop only)
  const tiltRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CINEMATIC ENTRANCE TIMELINE
  // ═══════════════════════════════════════════════════════════════════════════
  useGSAP(
    () => {
      if (!heroRef.current || !contentRef.current) return

      // Reveal content wrapper
      gsap.set(contentRef.current, { autoAlpha: 1 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // ── Horizontal accent line draws across ──
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
      )

      // ── Badge drops in ──
      tl.from(
        badgeRef.current,
        { y: -20, autoAlpha: 0, duration: 0.5 },
        '-=0.3'
      )

      // ── Headline chars cascade with 3D rotation ──
      const chars = headlineCharsRef.current?.querySelectorAll('.hero-char')
      if (chars?.length) {
        tl.from(
          chars,
          {
            y: 60,
            autoAlpha: 0,
            rotationX: -40,
            transformOrigin: 'bottom center',
            duration: 0.7,
            ease: 'back.out(1.4)',
            stagger: 0.02,
          },
          '-=0.2'
        )
      }

      // ── Gradient subtitle line sweeps up ──
      tl.from(
        gradientLineRef.current,
        { y: 30, autoAlpha: 0, scale: 0.97, duration: 0.7 },
        '-=0.4'
      )

      // ── Paragraph words stagger in ──
      const words = subtitleRef.current?.querySelectorAll('.hero-word')
      if (words?.length) {
        tl.from(
          words,
          { y: 15, autoAlpha: 0, duration: 0.5, stagger: 0.03 },
          '-=0.4'
        )
      }

      // ── CTA buttons bounce up ──
      const ctaChildren = ctaRef.current?.children
      if (ctaChildren?.length) {
        tl.from(
          ctaChildren,
          {
            y: 25,
            autoAlpha: 0,
            scale: 0.92,
            duration: 0.6,
            ease: 'back.out(2)',
            stagger: 0.1,
          },
          '-=0.3'
        )
      }

      // ── Social proof ──
      tl.from(
        socialProofRef.current,
        { y: 15, autoAlpha: 0, duration: 0.5 },
        '-=0.3'
      )

      // ── Card perspective entrance ──
      tl.from(
        cardRef.current,
        {
          x: 80,
          autoAlpha: 0,
          scale: 0.88,
          rotationY: -12,
          duration: 1,
          ease: 'power3.out',
          transformPerspective: 1200,
          transformOrigin: 'center center',
        },
        '-=0.9'
      )

      // ── Stats cards stagger ──
      const statCards = statsRowRef.current?.children
      if (statCards?.length) {
        tl.from(
          statCards,
          {
            y: 15,
            autoAlpha: 0,
            scale: 0.92,
            duration: 0.4,
            stagger: 0.07,
            ease: 'back.out(1.4)',
          },
          '-=0.5'
        )
      }

      // ── Floating notifications pop in with elastic ──
      floatingRefs.current.forEach((el, i) => {
        if (!el) return
        tl.from(
          el,
          {
            scale: 0,
            autoAlpha: 0,
            rotation: -8,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          },
          `-=${0.35 - i * 0.08}`
        )
      })
    },
    { scope: heroRef }
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. 3D TILT EFFECT ON CARD (desktop with pointer device only)
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!cardRef.current || !cardInnerRef.current) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const card = cardRef.current

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 600) {
        tiltRef.current.tx = (dy / rect.height) * -6
        tiltRef.current.ty = (dx / rect.width) * 6
      } else {
        tiltRef.current.tx = 0
        tiltRef.current.ty = 0
      }
    }

    const onLeave = () => {
      tiltRef.current.tx = 0
      tiltRef.current.ty = 0
    }

    const tick = () => {
      tiltRef.current.x += (tiltRef.current.tx - tiltRef.current.x) * 0.07
      tiltRef.current.y += (tiltRef.current.ty - tiltRef.current.y) * 0.07
      if (cardInnerRef.current) {
        cardInnerRef.current.style.transform = `perspective(1200px) rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. TAB INITIALISATION
  // ═══════════════════════════════════════════════════════════════════════════
  useGSAP(
    () => {
      if (!salariesRef.current || !reviewsRef.current) return
      gsap.set(salariesRef.current, { x: 0, autoAlpha: 1, scale: 1 })
      gsap.set(reviewsRef.current, { x: 60, autoAlpha: 0, scale: 0.9 })
    },
    { scope: containerRef }
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. TAB TRANSITIONS
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!salariesRef.current || !reviewsRef.current) return
    const sal = salariesRef.current
    const rev = reviewsRef.current

    setIsAnimating(true)
    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) })

    if (activeTab === 'salarios') {
      tl.to(rev, { x: -60, autoAlpha: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' }, 0)
      tl.to(sal, { x: 0, autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, 0.1)
    } else {
      tl.to(sal, { x: 60, autoAlpha: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' }, 0)
      tl.to(rev, { x: 0, autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, 0.1)
    }
  }, [activeTab])

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. AUTO-ROTATE TABS WITH PROGRESS BAR
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!progressRef.current) return
    const tw = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 5,
        ease: 'none',
        transformOrigin: 'left center',
        onComplete: () => {
          if (!isAnimating) {
            setActiveTab((p) => (p === 'salarios' ? 'reseñas' : 'salarios'))
          }
        },
      }
    )
    return () => {
      tw.kill()
    }
  }, [activeTab, isAnimating])

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. AMBIENT DRIFT ON FLOATING ELEMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  useGSAP(
    () => {
      floatingRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: 'random(-6, 6)',
          x: 'random(-3, 3)',
          rotation: 'random(-2, 2)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2.5 + i * 0.4,
        })
      })
    },
    { scope: heroRef }
  )

  // ═══════════════════════════════════════════════════════════════════════════

  const handleTabChange = (tab: 'salarios' | 'reseñas') => {
    if (tab !== activeTab && !isAnimating) setActiveTab(tab)
  }

  // Split text into animated character spans
  const splitChars = (text: string) =>
    text.split('').map((c, i) => (
      <span
        key={i}
        className="hero-char"
        style={{ display: c === ' ' ? 'inline' : 'inline-block' }}
      >
        {c === ' ' ? '\u00A0' : c}
      </span>
    ))

  // Split text into word spans
  const splitWords = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="hero-word inline-block mr-[0.3em]">
        {w}
      </span>
    ))

  return (
    <section
      ref={heroRef}
      className="relative min-h-[80vh] lg:min-h-0 lg:flex-1 flex items-center justify-center overflow-hidden"
    >
      {/* ── Shader background ── */}
      {isMounted && (
        <Shader3
          className="!fixed !top-20 !h-[calc(100vh+800px)]"
          color="#808080"
        />
      )}

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* ── Horizontal accent line ── */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent z-[2] opacity-40"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* ── Content (hidden until GSAP reveals) ── */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-4 md:pt-8 pb-6"
        style={{ visibility: 'hidden' }}
      >
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* LEFT COLUMN — Text content                                    */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-3 sm:gap-5">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex self-start">
              <div className="flex items-center gap-2.5 bg-neutral-900/8 backdrop-blur-sm border border-neutral-300/50 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-600" />
                </span>
                <span className="text-neutral-700 font-medium text-sm tracking-tight">
                  Buscador de salarios y empresas
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-6xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
              <span
                ref={headlineCharsRef}
                className="block overflow-hidden"
                style={{ perspective: '600px' }}
              >
                {splitChars('Todos merecemos')}
              </span>
              <span
                ref={gradientLineRef}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400"
              >
                un mejor trabajo.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-neutral-600 max-w-lg leading-relaxed"
            >
              {splitWords(
                'Descubre cuánto pagan de verdad, lee reseñas de quienes ya están adentro y negocia con datos reales. La comunidad laboral que el Perú necesitaba.'
              )}
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="/empresas"
                className="group relative inline-flex items-center gap-2 bg-neutral-900 text-white px-7 py-3.5 rounded-xl font-medium overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explorar empresas
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="/salarios"
                className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm text-neutral-800 border border-neutral-300 px-7 py-3.5 rounded-xl font-medium hover:bg-white/80 hover:border-neutral-400 transition-all"
              >
                Ver salarios
              </a>
            </div>

            {/* Social proof */}
            <div ref={socialProofRef} className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 4, 6].map((n) => (
                  <Image
                    key={n}
                    src={`/illustrations/avatars/avatar_2094458_0${n}.png`}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">85,000+</span>{' '}
                empresas &middot; datos reales
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* RIGHT COLUMN — Interactive dashboard card                     */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div ref={cardRef} className="relative lg:pl-8">
            <div
              ref={cardInnerRef}
              className="relative bg-white/80 backdrop-blur-xl border border-neutral-200/80 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-500 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Glossy reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none z-20 rounded-2xl" />

              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-300/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-neutral-100 rounded-lg px-4 py-1 text-neutral-400 text-xs font-mono">
                    empliq.io/empresas
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-3 sm:p-5 bg-neutral-50/80">
                {/* Stats row with animated counters */}
                <div ref={statsRowRef} className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Salario promedio', end: 8500, prefix: 'S/' },
                    { label: 'Puestos activos', end: 2340, prefix: '' },
                    { label: 'Empresas', end: 85455, prefix: '' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-3.5 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                    >
                      <p className="text-neutral-500 text-[10px] mb-1 uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-neutral-900 font-bold text-base font-mono">
                        <AnimatedCounter
                          end={stat.end}
                          prefix={stat.prefix}
                          delay={1.5 + i * 0.15}
                        />
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className="mt-3">
                  <div className="flex gap-1 bg-neutral-100 rounded-lg p-1">
                    {(['salarios', 'reseñas'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`flex-1 text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                          activeTab === tab
                            ? 'text-neutral-900 bg-white shadow-sm'
                            : 'text-neutral-500 hover:text-neutral-700'
                        }`}
                      >
                        {tab === 'salarios' ? 'Salarios' : 'Reseñas'}
                      </button>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-1.5 h-[2px] bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      ref={progressRef}
                      className="h-full bg-gradient-to-r from-neutral-400 to-neutral-300 rounded-full"
                      style={{
                        transform: 'scaleX(0)',
                        transformOrigin: 'left center',
                      }}
                    />
                  </div>
                </div>

                {/* Tab content */}
                <div ref={containerRef} className="relative mt-4 min-h-[280px]">
                  {/* Salaries panel */}
                  <div
                    ref={salariesRef}
                    className="space-y-2 w-full"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents:
                        activeTab === 'salarios' ? 'auto' : 'none',
                    }}
                  >
                    {MOCK_SALARIES.map((job, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white rounded-lg px-3.5 py-3 border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all duration-200 cursor-default"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-neutral-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-900 text-sm font-medium truncate">
                            {job.title}
                          </p>
                          <p className="text-neutral-400 text-[10px]">
                            {job.company} &middot; {job.reports} reportes
                          </p>
                        </div>
                        <span className="text-neutral-900 font-mono text-sm font-bold shrink-0">
                          {job.salary}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Reviews panel */}
                  <div
                    ref={reviewsRef}
                    className="space-y-3 w-full"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: 0,
                      transform: 'translateX(60px) scale(0.9)',
                      pointerEvents:
                        activeTab === 'reseñas' ? 'auto' : 'none',
                    }}
                  >
                    {MOCK_REVIEWS.map((review, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg p-3.5 border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all duration-200 cursor-default"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <Image
                            src={review.avatar}
                            alt={review.nickname}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-neutral-800 truncate">
                                {review.nickname}
                              </span>
                              {review.badge && (
                                <span className="text-[9px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded-full border border-neutral-200 shrink-0">
                                  {review.badge}
                                </span>
                              )}
                            </div>
                            <StarRow rating={review.rating} />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-neutral-800 mb-0.5">
                          {review.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                          {review.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating notification: reported salary ── */}
            <div
              ref={(el) => {
                floatingRefs.current[0] = el
              }}
              className="absolute -left-6 top-[35%] bg-white/95 backdrop-blur-xl border border-neutral-200/80 rounded-xl p-3 shadow-xl hidden lg:flex items-center gap-3 hover:scale-105 transition-transform cursor-default"
            >
              <Image
                src="/illustrations/avatars/avatar_2094458_07.png"
                alt=""
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-neutral-900 text-xs font-semibold">
                  FieroAlpaca99
                </p>
                <p className="text-neutral-400 text-[10px]">
                  Reportó su sueldo
                </p>
              </div>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </div>

            {/* ── Floating notification: verified data ── */}
            <div
              ref={(el) => {
                floatingRefs.current[1] = el
              }}
              className="absolute -right-4 bottom-[18%] bg-white/95 backdrop-blur-xl border border-neutral-200/80 rounded-xl p-3 shadow-xl hidden lg:flex items-center gap-3 hover:scale-105 transition-transform cursor-default"
            >
              <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-neutral-900 text-sm font-bold">98%</p>
                <p className="text-neutral-500 text-[10px]">
                  Datos verificados
                </p>
              </div>
            </div>

            {/* ── Floating notification: live activity counter ── */}
            <div
              ref={(el) => {
                floatingRefs.current[2] = el
              }}
              className="absolute -right-2 top-[6%] bg-white/95 backdrop-blur-xl border border-neutral-200/80 rounded-lg px-3 py-2 shadow-lg hidden lg:flex items-center gap-2 hover:scale-105 transition-transform cursor-default"
            >
              <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500">Hoy</p>
                <p className="text-xs font-bold text-neutral-900">
                  +127 reportes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-[2]" />
    </section>
  )
}
