'use client'

import Link from 'next/link'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ArrowRight, Search, ShieldCheck } from 'lucide-react'
import { MathUtils } from 'three'
import type { Group, Mesh } from 'three'

const LOOP_SECONDS = 5
const TAU = Math.PI * 2

const salaryComparisons = [
  {
    company: 'BCP',
    role: 'Analista de datos',
    wrong: 2.1,
    market: 3.35,
    displayedWrong: 'S/8.2k',
    displayedMarket: 'S/12.5k',
    gap: 'S/4.3k',
    x: -2.15,
    z: 0.15,
    phase: 0,
  },
  {
    company: 'Interbank',
    role: 'Product manager',
    wrong: 2.55,
    market: 4.05,
    displayedWrong: 'S/10.1k',
    displayedMarket: 'S/15.8k',
    gap: 'S/5.7k',
    x: 0,
    z: -0.22,
    phase: 0.13,
  },
  {
    company: 'Alicorp',
    role: 'UX researcher',
    wrong: 1.72,
    market: 2.86,
    displayedWrong: 'S/6.6k',
    displayedMarket: 'S/9.1k',
    gap: 'S/2.5k',
    x: 2.15,
    z: 0.1,
    phase: 0.26,
  },
]

function smoothStep(value: number) {
  const t = MathUtils.clamp(value, 0, 1)
  return t * t * (3 - 2 * t)
}

function SalaryMarketModel() {
  const rootRef = useRef<Group>(null)
  const scannerRef = useRef<Group>(null)
  const wrongBarRefs = useRef<(Mesh | null)[]>([])
  const marketBarRefs = useRef<(Mesh | null)[]>([])
  const deltaRefs = useRef<(Mesh | null)[]>([])
  const markerRefs = useRef<(Mesh | null)[]>([])

  const particles = useMemo(
    () =>
      Array.from({ length: 56 }, (_, index) => ({
        x: Math.sin(index * 12.9898) * 5.2,
        y: 0.5 + ((index * 37) % 23) * 0.14,
        z: -1.7 + ((index * 19) % 31) * 0.08,
        scale: 0.018 + (index % 5) * 0.006,
      })),
    []
  )

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime()
    const loop = (elapsed % LOOP_SECONDS) / LOOP_SECONDS

    if (rootRef.current) {
      rootRef.current.rotation.y = -0.2 + Math.sin(elapsed * 0.52) * 0.08 + pointer.x * 0.08
      rootRef.current.rotation.x = -0.08 + pointer.y * 0.04
      rootRef.current.position.y = Math.sin(elapsed * 0.8) * 0.06
    }

    if (scannerRef.current) {
      scannerRef.current.rotation.z = elapsed * 0.46
      scannerRef.current.rotation.y = elapsed * 0.28
      scannerRef.current.scale.setScalar(1 + Math.sin(loop * TAU) * 0.025)
    }

    salaryComparisons.forEach((item, index) => {
      const timeline = (loop + item.phase) % 1
      const reveal = smoothStep((timeline - 0.1) / 0.48)
      const emphasis = Math.sin(timeline * TAU) * 0.5 + 0.5
      const wrongHeight = item.wrong * (0.96 + emphasis * 0.04)
      const marketHeight = MathUtils.lerp(0.22, item.market, reveal)
      const deltaHeight = Math.max(marketHeight - wrongHeight, 0.05)

      const wrongBar = wrongBarRefs.current[index]
      if (wrongBar) {
        wrongBar.scale.y = wrongHeight
        wrongBar.position.y = wrongHeight / 2
      }

      const marketBar = marketBarRefs.current[index]
      if (marketBar) {
        marketBar.scale.y = marketHeight
        marketBar.position.y = marketHeight / 2
      }

      const delta = deltaRefs.current[index]
      if (delta) {
        delta.scale.y = deltaHeight
        delta.position.y = wrongHeight + deltaHeight / 2
        delta.rotation.y = elapsed * 0.18 + index * 0.35
      }

      const marker = markerRefs.current[index]
      if (marker) {
        marker.position.y = marketHeight + 0.18 + emphasis * 0.08
        marker.rotation.y = elapsed * 1.6
        marker.rotation.x = elapsed * 0.8
      }
    })
  })

  return (
    <group ref={rootRef} position={[0, -1.8, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <circleGeometry args={[4.4, 96]} />
        <meshStandardMaterial color="#111113" roughness={0.82} metalness={0.12} />
      </mesh>

      <group ref={scannerRef} position={[0, 2.15, -0.18]}>
        <mesh>
          <torusGeometry args={[2.84, 0.01, 12, 144]} />
          <meshStandardMaterial color="#d6d6d6" emissive="#a3a3a3" emissiveIntensity={0.45} transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.12, 0.008, 12, 144]} />
          <meshStandardMaterial color="#71717a" transparent opacity={0.45} />
        </mesh>
      </group>

      {particles.map((particle, index) => (
        <mesh key={index} position={[particle.x, particle.y, particle.z]} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={index % 7 === 0 ? '#86efac' : '#d4d4d8'} transparent opacity={index % 7 === 0 ? 0.58 : 0.32} />
        </mesh>
      ))}

      {salaryComparisons.map((item, index) => (
        <group key={item.company} position={[item.x, 0, item.z]}>
          <mesh position={[0, -0.01, 0]}>
            <boxGeometry args={[1.22, 0.02, 0.88]} />
            <meshStandardMaterial color="#18181b" roughness={0.74} metalness={0.28} />
          </mesh>

          <mesh ref={(node) => { wrongBarRefs.current[index] = node }} position={[-0.23, item.wrong / 2, 0]} scale={[0.28, item.wrong, 0.28]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#52525b" roughness={0.45} metalness={0.58} />
          </mesh>

          <mesh ref={(node) => { marketBarRefs.current[index] = node }} position={[0.24, item.market / 2, 0]} scale={[0.34, item.market, 0.34]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#f4f4f5" emissive="#52525b" emissiveIntensity={0.12} roughness={0.22} metalness={0.72} />
          </mesh>

          <mesh ref={(node) => { deltaRefs.current[index] = node }} position={[0.24, item.market / 2, 0]} scale={[0.42, item.market - item.wrong, 0.42]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#86efac" emissive="#22c55e" emissiveIntensity={0.28} transparent opacity={0.24} roughness={0.3} metalness={0.34} />
          </mesh>

          <mesh ref={(node) => { markerRefs.current[index] = node }} position={[0.24, item.market + 0.18, 0]}>
            <octahedronGeometry args={[0.19, 0]} />
            <meshStandardMaterial color="#bbf7d0" emissive="#22c55e" emissiveIntensity={0.38} roughness={0.28} metalness={0.56} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function SalaryScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.25, 7.2], fov: 39 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3.5, 5.5, 4]} intensity={2.4} />
      <pointLight position={[-3.2, 2.5, 3.5]} intensity={1.6} color="#f4f4f5" />
      <pointLight position={[2.8, 2.4, 2]} intensity={1.2} color="#86efac" />
      <fog attach="fog" args={['#09090b', 7.5, 11.5]} />
      <SalaryMarketModel />
    </Canvas>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#09090b] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_22%_80%,rgba(34,197,94,0.13),transparent_28%),linear-gradient(135deg,#09090b_0%,#111113_48%,#050505_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:92px_92px] opacity-55" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/55 to-transparent" />

      <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-8">
        <div className="max-w-3xl">
          <div className="mb-7 h-px w-28 bg-gradient-to-r from-white/70 to-transparent" />

          <p className="font-mono text-xs uppercase tracking-[0.34em] text-neutral-400">
            Salarios reales por empresa
          </p>

          <h1 className="mt-5 max-w-4xl text-[clamp(2.85rem,6.2vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white">
            No negocies tu sueldo a ciegas.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
            Empliq cruza sueldos, puestos y reseñas para mostrarte si tu oferta está por debajo del mercado antes de aceptar o pedir aumento.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/salarios"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 active:scale-[0.98]"
            >
              Comparar mi sueldo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/empresas"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] active:scale-[0.98]"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Explorar empresas
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="bg-neutral-950/72 p-4 backdrop-blur-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Oferta recibida</p>
              <p className="mt-2 font-mono text-2xl text-neutral-200">S/8.2k</p>
            </div>
            <div className="bg-neutral-950/72 p-4 backdrop-blur-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-green-300/80">Mercado real</p>
              <p className="mt-2 font-mono text-2xl text-green-300">S/12.5k</p>
            </div>
          </div>
        </div>

        <div className="relative h-[430px] min-w-0 sm:h-[540px] lg:h-[640px]" aria-label="Animación 3D comparando sueldos ofertados contra sueldos de mercado">
          <div className="absolute inset-0 rounded-[2.25rem] border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_40px_100px_-55px_rgba(255,255,255,0.55)] backdrop-blur-sm" />
          <div className="absolute inset-0 overflow-hidden rounded-[2.25rem]">
            <SalaryScene />
          </div>

          <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-neutral-950/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:left-6 sm:top-6">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.75)]" />
              Simulación 3D en loop de 5s
            </div>
            <p className="mt-3 max-w-[14rem] text-sm leading-6 text-neutral-400">
              Las columnas claras revelan el rango real; el volumen verde marca dinero dejado sobre la mesa.
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-4 right-4 grid gap-2 sm:left-6 sm:right-6 sm:grid-cols-3">
            {salaryComparisons.map((item) => (
              <div key={item.company} className="rounded-2xl border border-white/10 bg-neutral-950/74 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.company}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.role}</p>
                  </div>
                  <ShieldCheck className="h-4 w-4 text-green-300" aria-hidden="true" />
                </div>
                <div className="mt-3 flex items-end justify-between gap-2 font-mono text-xs">
                  <span className="text-neutral-500">{item.displayedWrong}</span>
                  <span className="text-green-300">+{item.gap}</span>
                  <span className="text-neutral-200">{item.displayedMarket}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
