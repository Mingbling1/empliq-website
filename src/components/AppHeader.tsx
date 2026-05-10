"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, LogOut, Settings, Building2, DollarSign, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Wordmark } from "@/components/editorial/Wordmark"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { CurrencyLanguageSelector } from "@/components/CurrencyLanguageSelector"
import { api } from "@/lib/api"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const NAV = [
  { href: "/empresas", label: "Empresas", Icon: Building2 },
  { href: "/salarios", label: "Salarios", Icon: DollarSign },
]

export function AppHeader({ initialAvatarUrl }: { initialAvatarUrl?: string | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [customAvatar, setCustomAvatar] = useState<string | null>(initialAvatarUrl ?? null)
  const [prevInitialAvatar, setPrevInitialAvatar] = useState(initialAvatarUrl)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  if (initialAvatarUrl !== prevInitialAvatar) {
    setPrevInitialAvatar(initialAvatarUrl)
    setCustomAvatar(initialAvatarUrl ?? null)
  }

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user && !initialAvatarUrl) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.access_token) {
            api.profiles.getMe(session.access_token).then((profile) => {
              if (profile.avatarUrl) setCustomAvatar(profile.avatarUrl)
            }).catch(() => {})
          }
        })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null),
    )
    return () => subscription.unsubscribe()
  }, [initialAvatarUrl])

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario"
  const userInitials = userName.charAt(0).toUpperCase()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur-md border-b border-rule-soft">
      {/* Top bar: wordmark · search · utilities */}
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 flex h-14 lg:h-16 items-center gap-6">
        <Wordmark className="text-[1.0625rem] shrink-0" />

        {/* Search desktop */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="hidden sm:flex flex-1 max-w-md mx-auto items-stretch border border-rule-soft hover:border-rule transition-colors focus-within:border-ink"
        >
          <span className="flex items-center px-3 text-ink-muted">
            <Search className="size-4" strokeWidth={1.5} />
          </span>
          <input
            placeholder="Buscar empresa, puesto o sector"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent py-2 pr-3 text-sm font-serif text-ink placeholder:text-ink-muted/80 outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
          <CurrencyLanguageSelector />

          <button
            type="button"
            aria-label="Buscar"
            className="sm:hidden p-2 text-ink-muted hover:text-ink rounded-sm hover:bg-paper-deep transition-colors"
            onClick={() => {
              setMobileSearchOpen((v) => !v)
              setTimeout(() => searchInputRef.current?.focus(), 80)
            }}
          >
            <Search className="size-4" strokeWidth={1.5} />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-sm hover:bg-paper-deep p-1 transition-colors"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <Avatar className="h-8 w-8 rounded-sm border border-rule-soft">
                  {customAvatar ? (
                    <AvatarImage src={customAvatar} alt="Avatar" className="rounded-sm" />
                  ) : (
                    <AvatarFallback className="text-xs bg-paper-deep text-ink rounded-sm">
                      {userInitials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <ChevronDown className="size-3 text-ink-muted hidden sm:block" strokeWidth={1.5} />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-64 bg-paper border border-rule shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] z-50"
                  >
                    <div className="px-4 py-3.5 border-b border-rule-soft">
                      <p className="label-mono mb-1">Sesión activa</p>
                      <p className="text-sm font-medium text-ink truncate">{userName}</p>
                      <p className="text-xs text-ink-muted truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/configuracion"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink-soft hover:text-ink hover:bg-paper-deep transition-colors"
                      >
                        <Settings className="size-4" strokeWidth={1.5} />
                        Configuración
                      </Link>
                    </div>

                    <div className="border-t border-rule-soft py-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink-soft hover:text-vermillion hover:bg-paper-deep transition-colors"
                      >
                        <LogOut className="size-4" strokeWidth={1.5} />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:inline text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-1.5 bg-ink text-paper text-sm font-medium hover:bg-ink-soft transition-colors"
              >
                Entrar
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search expanded */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-6 pb-3">
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex items-stretch border border-rule focus-within:border-ink"
          >
            <span className="flex items-center px-3 text-ink-muted">
              <Search className="size-4" strokeWidth={1.5} />
            </span>
            <input
              ref={searchInputRef}
              placeholder="Buscar empresa o puesto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent py-2 pr-3 text-sm font-serif text-ink placeholder:text-ink-muted/80 outline-none"
            />
          </form>
        </div>
      )}

      {/* Secondary nav — editorial tabs */}
      <div className="border-t border-rule-soft">
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10">
          <nav aria-label="Secciones" className="flex items-center gap-0">
            {NAV.map(({ href, label, Icon }) => {
              const active = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-1 py-3 mr-6 lg:mr-8 text-sm transition-colors",
                    active
                      ? "text-ink font-medium"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={1.5} />
                  {label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 -bottom-px h-px bg-ink"
                    />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
