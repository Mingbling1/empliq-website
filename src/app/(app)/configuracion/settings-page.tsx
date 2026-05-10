"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Loader2,
  Check,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { LucideIcon } from "lucide-react"

/* ─── Types ─── */

type Section = "perfil" | "notificaciones" | "privacidad" | "apariencia"

interface MenuItem {
  id: Section
  folio: string
  label: string
  description: string
  icon: LucideIcon
}

const menuItems: MenuItem[] = [
  { id: "perfil",         folio: "01", label: "Perfil",         description: "Nombre, avatar, nickname", icon: User },
  { id: "notificaciones", folio: "02", label: "Notificaciones", description: "Alertas y preferencias",   icon: Bell },
  { id: "privacidad",     folio: "03", label: "Privacidad",     description: "Visibilidad de datos",     icon: Shield },
  { id: "apariencia",     folio: "04", label: "Apariencia",     description: "Tema · idioma · moneda",   icon: Moon },
]

/* ─── Toggle editorial ─── */

function Toggle({ enabled, onToggle, disabled }: { enabled: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      role="switch"
      aria-checked={enabled}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer transition-colors border",
        enabled ? "bg-ink border-ink" : "bg-paper-deep border-rule",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 bg-paper transition-transform mt-[1px] border border-ink",
          enabled ? "translate-x-[18px]" : "translate-x-[1px]",
        )}
      />
    </button>
  )
}

/* ─── Avatar choices ─── */

const AVATAR_OPTIONS = [
  "/illustrations/avatars/avatar_2094458_01.png",
  "/illustrations/avatars/avatar_2094458_02.png",
  "/illustrations/avatars/avatar_2094458_03.png",
  "/illustrations/avatars/avatar_2094458_04.png",
  "/illustrations/avatars/avatar_2094458_05.png",
  "/illustrations/avatars/avatar_2094458_06.png",
  "/illustrations/avatars/avatar_2094458_07.png",
  "/illustrations/avatars/avatar_2094458_08.png",
  "/illustrations/avatars/avatar_2094458_09.png",
  "/illustrations/avatars/avatar_four_happy_women_portraits_black_white_1089355_401.png",
  "/illustrations/avatars/avatar_Gemini_Generated_Image_vlmic5vlmic5vlmi_01.png",
  "/illustrations/avatars/avatar_Gemini_Generated_Image_vlmic5vlmic5vlmi_02.png",
  "/illustrations/avatars/avatar_Gemini_Generated_Image_vlmic5vlmic5vlmi_03.png",
  "/illustrations/avatars/avatar_Gemini_Generated_Image_vlmic5vlmic5vlmi_04.png",
  "/illustrations/avatars/avatar_people_communicating_various_ways_phone_call_laptop_chat_discussion_675502_1390_01.png",
  "/illustrations/avatars/avatar_people_communicating_various_ways_phone_call_laptop_chat_discussion_675502_1390_02.png",
  "/illustrations/avatars/avatar_people_communicating_various_ways_phone_call_laptop_chat_discussion_675502_1390_03.png",
  "/illustrations/avatars/avatar_people_communicating_various_ways_phone_call_laptop_chat_discussion_675502_1390_04.png",
  "/illustrations/avatars/avatar_people_communicating_various_ways_phone_call_laptop_chat_discussion_675502_1390_05.png",
  "/illustrations/avatars/avatar_people_communicating_various_ways_phone_call_laptop_chat_discussion_675502_1390_06.png",
  "/illustrations/avatars/avatar_women_emotions_monochrome_flat_linear_character_heads_set_151150_15217_01.png",
  "/illustrations/avatars/avatar_women_emotions_monochrome_flat_linear_character_heads_set_151150_15217_02.png",
  "/illustrations/avatars/avatar_women_emotions_monochrome_flat_linear_character_heads_set_151150_15217_03.png",
  "/illustrations/avatars/avatar_women_emotions_monochrome_flat_linear_character_heads_set_151150_15217_04.png",
]

/* ─── Section header (folio + display italic) ─── */

function SectionHeading({ folio, title, lede }: { folio: string; title: string; lede: string }) {
  return (
    <header className="border-b border-ink pb-4 mb-8">
      <p className="label-mono mb-2">{folio} · Configuración</p>
      <h2 className="font-display italic text-[clamp(1.5rem,2.5vw,2rem)] text-ink leading-tight">
        {title}
      </h2>
      <p className="font-serif text-ink-soft mt-2 max-w-[55ch]">{lede}</p>
    </header>
  )
}

/* ─── Section: Perfil ─── */

function PerfilSection({ user }: { user: SupabaseUser | null }) {
  const router = useRouter()
  const userName = user?.user_metadata?.full_name || ""
  const userAvatar = user?.user_metadata?.avatar_url
  const userEmail = user?.email || ""
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [savedAvatar, setSavedAvatar] = useState<string | null>(null)
  const [nickname, setNickname] = useState("")
  const [savedNickname, setSavedNickname] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [nicknameError, setNicknameError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.access_token) return
      api.profiles
        .getMe(session.access_token)
        .then((profile) => {
          if (profile.avatarUrl) {
            setSelectedAvatar(profile.avatarUrl)
            setSavedAvatar(profile.avatarUrl)
          }
          if (profile.nickname) {
            setNickname(profile.nickname)
            setSavedNickname(profile.nickname)
          }
        })
        .catch(() => {})
    })
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setSaveSuccess(false)
    setNicknameError(null)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) return

      if (selectedAvatar && selectedAvatar !== savedAvatar) {
        await api.profiles.updateAvatar(session.access_token, selectedAvatar)
        setSavedAvatar(selectedAvatar)
      }
      if (nickname !== savedNickname && nickname.length >= 3) {
        await api.profiles.updateNickname(session.access_token, nickname)
        setSavedNickname(nickname)
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)

      const { revalidateProfile } = await import("@/app/(app)/actions")
      await revalidateProfile()
      router.refresh()
    } catch (err: any) {
      if (err?.message?.includes("nickname") || err?.message?.includes("Nickname")) {
        setNicknameError("Ese nickname ya está en uso")
      } else {
        console.error("Error saving profile:", err)
      }
    } finally {
      setSaving(false)
    }
  }

  const avatarChanged = selectedAvatar !== savedAvatar && selectedAvatar !== null
  const nicknameChanged = nickname !== savedNickname && nickname.length >= 3
  const hasChanges = avatarChanged || nicknameChanged

  return (
    <div>
      <SectionHeading
        folio="01"
        title="Perfil"
        lede="Tu identidad en la plataforma. Solo el avatar y el nickname son públicos."
      />

      <div className="space-y-10">
        {/* Avatar actual + Google */}
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-center border-b border-rule-soft pb-8">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 rounded-sm border border-rule-soft">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName} className="rounded-sm" />
              ) : (
                <AvatarFallback className="text-lg bg-paper-deep rounded-sm">
                  {userName.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-ink-muted text-sm">→</span>
            <Avatar className="h-14 w-14 rounded-sm border border-ink">
              {selectedAvatar ? (
                <AvatarImage src={selectedAvatar} alt="Avatar anónimo" className="rounded-sm" />
              ) : (
                <AvatarFallback className="text-xs bg-paper-deep text-ink-muted rounded-sm">
                  Anon
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div>
            <p className="font-serif text-lg text-ink">{userName || "Usuario"}</p>
            <div className="flex items-center gap-2 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="label-mono">Verificado con Google</span>
            </div>
            <p className="label-mono mt-2 normal-case tracking-normal !text-ink-muted">
              Solo el avatar de la derecha es visible públicamente.
            </p>
          </div>
        </div>

        {/* Avatar picker */}
        <div className="space-y-3">
          <Label className="label-mono">Elige tu avatar anónimo</Label>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-w-lg">
            {AVATAR_OPTIONS.map((src) => (
              <button
                key={src}
                onClick={() => setSelectedAvatar(src)}
                className={cn(
                  "relative h-12 w-12 overflow-hidden border transition-all",
                  selectedAvatar === src
                    ? "border-ink ring-1 ring-ink"
                    : "border-rule-soft hover:border-rule",
                )}
              >
                <img src={src} alt="Avatar" className="h-full w-full object-cover" />
                {selectedAvatar === src && (
                  <div className="absolute inset-0 bg-ink/15 flex items-center justify-center">
                    <Check className="h-4 w-4 text-ink" strokeWidth={1.5} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 max-w-md border-t border-rule-soft pt-8">
          <FieldRow label="Nombre completo" hint="Sincronizado desde tu cuenta de Google.">
            <Input
              defaultValue={userName}
              disabled
              className="bg-paper-deg/30 border border-rule-soft rounded-none focus-visible:ring-0 font-serif"
            />
          </FieldRow>

          <FieldRow label="Correo electrónico">
            <Input
              defaultValue={userEmail}
              disabled
              className="bg-paper-deg/30 border border-rule-soft rounded-none focus-visible:ring-0 font-mono text-sm"
            />
          </FieldRow>

          <FieldRow
            label="Nickname"
            hint={
              nicknameError
                ? nicknameError
                : "Visible junto a tus reseñas. Mínimo 3 caracteres."
            }
            hintClass={nicknameError ? "text-vermillion" : ""}
          >
            <Input
              value={nickname}
              onChange={(e) => {
                setNicknameError(null)
                setNickname(e.target.value)
              }}
              placeholder="Ej: VelozCóndor4521"
              maxLength={30}
              className={cn(
                "bg-paper border border-rule rounded-none focus-visible:ring-0 focus-visible:border-ink font-serif",
                nicknameError && "border-vermillion",
              )}
            />
          </FieldRow>
        </div>

        <div className="flex items-center gap-4 border-t border-rule-soft pt-6">
          <button
            disabled={!hasChanges || saving}
            onClick={handleSave}
            className={cn(
              "inline-flex items-center px-5 py-2.5 text-sm font-medium transition-colors",
              hasChanges && !saving
                ? "bg-ink text-paper hover:bg-ink-soft"
                : "bg-paper-deep text-ink-muted cursor-not-allowed",
            )}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Guardando…
              </>
            ) : (
              "Guardar cambios"
            )}
          </button>
          {saveSuccess && (
            <p className="label-mono !text-vermillion-deep">Cambios guardados</p>
          )}
        </div>
      </div>
    </div>
  )
}

function FieldRow({
  label,
  hint,
  hintClass = "",
  children,
}: {
  label: string
  hint?: string
  hintClass?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label className="label-mono">{label}</Label>
      {children}
      {hint && (
        <p className={cn("text-xs text-ink-muted font-serif", hintClass)}>{hint}</p>
      )}
    </div>
  )
}

/* ─── Section: Notificaciones ─── */

function PreferenceRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string
  description: string
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-5 border-b border-rule-soft last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="font-serif text-sm text-ink-soft mt-1">{description}</p>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  )
}

function NotificacionesSection() {
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [salaryAlerts, setSalaryAlerts] = useState(false)
  const [reviewAlerts, setReviewAlerts] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)

  return (
    <div>
      <SectionHeading
        folio="02"
        title="Notificaciones"
        lede="Elige qué alertas quieres recibir. Las preferencias se guardarán automáticamente."
      />
      <div className="max-w-2xl divide-y divide-rule-soft">
        <PreferenceRow
          title="Notificaciones por email"
          description="Recibe actualizaciones en tu correo."
          enabled={emailNotifs}
          onToggle={() => setEmailNotifs(!emailNotifs)}
        />
        <PreferenceRow
          title="Alertas de salarios"
          description="Cuando se publican nuevos salarios en empresas que sigues."
          enabled={salaryAlerts}
          onToggle={() => setSalaryAlerts(!salaryAlerts)}
        />
        <PreferenceRow
          title="Alertas de reseñas"
          description="Cuando hay nuevas reseñas de empresas que sigues."
          enabled={reviewAlerts}
          onToggle={() => setReviewAlerts(!reviewAlerts)}
        />
        <PreferenceRow
          title="Resumen semanal"
          description="Un resumen de las novedades de la semana."
          enabled={weeklyDigest}
          onToggle={() => setWeeklyDigest(!weeklyDigest)}
        />
      </div>
      <p className="font-serif italic text-ink-muted mt-6 text-sm">
        Las preferencias se guardarán automáticamente · próximamente.
      </p>
    </div>
  )
}

/* ─── Section: Privacidad ─── */

function PrivacidadSection() {
  const [publicProfile, setPublicProfile] = useState(false)
  const [showSalary, setShowSalary] = useState(false)
  const [showCompany, setShowCompany] = useState(true)

  return (
    <div>
      <SectionHeading
        folio="03"
        title="Privacidad"
        lede="Controla la visibilidad de tu información en empliq."
      />

      <div className="max-w-2xl divide-y divide-rule-soft">
        <PreferenceRow
          title="Perfil público"
          description="Otros usuarios pueden ver tu perfil."
          enabled={publicProfile}
          onToggle={() => setPublicProfile(!publicProfile)}
        />
        <PreferenceRow
          title="Mostrar salario en reseñas"
          description="Tu salario reportado será visible en la empresa."
          enabled={showSalary}
          onToggle={() => setShowSalary(!showSalary)}
        />
        <PreferenceRow
          title="Mostrar empresa actual"
          description="Tu empresa aparecerá en tu perfil."
          enabled={showCompany}
          onToggle={() => setShowCompany(!showCompany)}
        />
      </div>

      <div className="mt-12 max-w-2xl border-t border-rule pt-8">
        <p className="label-mono mb-2 !text-vermillion-deep">Zona de peligro</p>
        <h3 className="font-display italic text-2xl text-ink mb-2">
          Eliminar cuenta
        </h3>
        <p className="font-serif text-ink-soft mb-4">
          Borraremos tus datos personales en un plazo de 30 días. Los aportes
          anonimizados (sueldos, reseñas) permanecen porque ya no son
          identificables.
        </p>
        <button
          disabled
          className="inline-flex items-center px-4 py-2 text-sm font-medium border border-vermillion text-vermillion hover:bg-vermillion hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  )
}

/* ─── Section: Apariencia ─── */

function AparienciaSection() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light")

  return (
    <div>
      <SectionHeading
        folio="04"
        title="Apariencia"
        lede="Personaliza cómo se ve empliq y tus preferencias regionales."
      />

      <div className="max-w-md space-y-10">
        <div>
          <Label className="label-mono mb-3 block">Tema</Label>
          <div className="grid grid-cols-3 gap-px bg-rule border border-rule">
            {([
              { id: "light" as const, label: "Claro", icon: Sun },
              { id: "dark" as const, label: "Oscuro", icon: Moon },
              { id: "system" as const, label: "Sistema", icon: Globe },
            ]).map((option) => (
              <button
                key={option.id}
                onClick={() => setTheme(option.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-5 transition-colors",
                  theme === option.id
                    ? "bg-paper-deep text-ink"
                    : "bg-paper text-ink-muted hover:bg-paper-deep/40",
                )}
              >
                <option.icon className="h-5 w-5" strokeWidth={1.25} />
                <span className="text-xs font-medium">{option.label}</span>
                {theme === option.id && (
                  <Check className="h-3.5 w-3.5 text-vermillion" strokeWidth={1.5} />
                )}
              </button>
            ))}
          </div>
          <p className="font-serif italic text-ink-muted text-sm mt-3">
            Solo modo claro disponible por ahora.
          </p>
        </div>

        <RegionalRow label="Idioma" value="Español (Perú)" hint="Único idioma disponible" />
        <RegionalRow label="Moneda" value="PEN · S/. Sol Peruano" hint="Única moneda disponible" />
      </div>
    </div>
  )
}

function RegionalRow({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="space-y-2">
      <Label className="label-mono">{label}</Label>
      <div className="flex items-center gap-3 p-4 border border-rule-soft bg-paper-deep/30">
        <span className="text-lg">🇵🇪</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">{value}</p>
          <p className="label-mono normal-case tracking-normal !text-ink-muted mt-0.5">
            {hint}
          </p>
        </div>
        <Check className="h-4 w-4 text-vermillion" strokeWidth={1.5} />
      </div>
    </div>
  )
}

/* ─── Settings Page Shell ─── */

export function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<Section>("perfil")

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-8">
        <div className="grid lg:grid-cols-[18rem_1fr] gap-10">
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
          <div className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case "perfil":
        return <PerfilSection user={user} />
      case "notificaciones":
        return <NotificacionesSection />
      case "privacidad":
        return <PrivacidadSection />
      case "apariencia":
        return <AparienciaSection />
    }
  }

  return (
    <div>
      {/* Editorial page header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-10 lg:py-14">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 label-mono hover:text-ink transition-colors mb-6"
          >
            <ArrowLeft className="h-3 w-3" />
            Volver
          </button>
          <p className="label-mono mb-3">A · 05 · Cuenta y preferencias</p>
          <h1 className="headline-display text-ink text-[clamp(2rem,4vw,3.25rem)] font-light max-w-[24ch]">
            Tu cuenta, en <em className="not-italic font-normal">tus términos.</em>
          </h1>
          <p className="font-serif italic text-ink-soft text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed mt-4 max-w-[60ch]">
            Administra tu identidad pública, alertas y preferencias regionales.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-10 lg:py-16">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[18rem_1fr]">
          {/* Sidebar editorial */}
          <nav aria-label="Secciones de configuración">
            <ul className="border-y border-rule-soft divide-y divide-rule-soft">
              {menuItems.map((item) => {
                const active = activeSection === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "w-full grid grid-cols-[auto_1fr_auto] gap-3 items-center px-2 py-4 text-left transition-colors",
                        active
                          ? "bg-paper-deep/60"
                          : "hover:bg-paper-deep/30",
                      )}
                    >
                      <span className="label-mono">{item.folio}</span>
                      <div className="min-w-0">
                        <span
                          className={cn(
                            "block text-sm",
                            active ? "font-medium text-ink" : "text-ink-soft",
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="block label-mono normal-case tracking-normal !text-ink-muted mt-0.5">
                          {item.description}
                        </span>
                      </div>
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-ink" : "text-ink-muted",
                        )}
                        strokeWidth={1.5}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Content */}
          <div className="min-w-0">{renderSection()}</div>
        </div>
      </div>
    </div>
  )
}
