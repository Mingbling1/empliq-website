"use client"

import { useState } from "react"
import { Check, Search } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/* ─── Data ─── */

const currencies = [
    { code: "PEN", symbol: "S/.", name: "Sol Peruano", flag: "🇵🇪" },
]

const languages = [
    { code: "es-PE", name: "Español (Perú)", flag: "🇵🇪" },
]

/* ─── Selector List ─── */

interface SelectorItem {
    code: string
    name: string
    flag: string
    symbol?: string
}

function SelectorList({
    items,
    selected,
    onSelect,
    searchPlaceholder,
    showSymbol,
}: {
    items: SelectorItem[]
    selected: string
    onSelect: (code: string) => void
    searchPlaceholder: string
    showSymbol?: boolean
}) {
    const [search, setSearch] = useState("")

    const filtered = items.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.code.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
                <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 text-sm bg-paper-deep/50 border border-rule-soft rounded-none focus-visible:ring-0 focus-visible:border-ink font-serif"
                />
            </div>

            <div className="max-h-[280px] overflow-y-auto border-y border-rule-soft divide-y divide-rule-soft">
                {filtered.map((item) => {
                    const isSelected = item.code === selected
                    return (
                        <button
                            key={item.code}
                            onClick={() => onSelect(item.code)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3 text-sm transition-colors text-left",
                                isSelected
                                    ? "bg-paper-deep font-medium text-ink"
                                    : "hover:bg-paper-deep/40 text-ink-soft"
                            )}
                        >
                            <span className="text-base leading-none">{item.flag}</span>
                            <span className="flex-1">
                                {showSymbol && item.symbol ? (
                                    <span>
                                        <span className="font-mono text-ink">{item.code}</span>
                                        <span className="text-ink-muted"> · {item.symbol}</span>
                                        <span className="font-serif text-ink-muted text-xs ml-2">{item.name}</span>
                                    </span>
                                ) : (
                                    <span className="font-serif">{item.name}</span>
                                )}
                            </span>
                            {isSelected && (
                                <Check className="h-4 w-4 text-vermillion shrink-0" strokeWidth={1.5} />
                            )}
                        </button>
                    )
                })}
                {filtered.length === 0 && (
                    <p className="font-serif italic text-ink-muted text-center py-4">
                        Sin resultados
                    </p>
                )}
            </div>
        </div>
    )
}

/* ─── Main Component ─── */

export function CurrencyLanguageSelector() {
    const [currencyOpen, setCurrencyOpen] = useState(false)
    const [languageOpen, setLanguageOpen] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState("PEN")
    const [selectedLanguage, setSelectedLanguage] = useState("es-PE")

    const currency = currencies.find((c) => c.code === selectedCurrency) || currencies[0]
    const language = languages.find((l) => l.code === selectedLanguage) || languages[0]

    return (
        <div className="hidden md:flex items-center gap-1 mr-1">
            {/* Currency */}
            <Dialog open={currencyOpen} onOpenChange={setCurrencyOpen}>
                <DialogTrigger asChild>
                    <button className="label-mono inline-flex items-baseline gap-1.5 px-2 py-1.5 hover:text-ink hover:bg-paper-deep transition-colors">
                        <span className="font-mono text-ink">{currency.symbol}</span>
                        <span>{currency.code} / mes</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px] p-0 bg-paper border border-rule rounded-none">
                    <DialogHeader className="px-5 pt-5 pb-0">
                        <DialogTitle className="font-display italic text-xl text-ink">Moneda</DialogTitle>
                    </DialogHeader>
                    <div className="px-5 pb-5 pt-3">
                        <SelectorList
                            items={currencies}
                            selected={selectedCurrency}
                            onSelect={(code) => {
                                setSelectedCurrency(code)
                                setCurrencyOpen(false)
                            }}
                            searchPlaceholder="Buscar moneda"
                            showSymbol
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <span className="h-4 w-px bg-rule" aria-hidden />

            {/* Language */}
            <Dialog open={languageOpen} onOpenChange={setLanguageOpen}>
                <DialogTrigger asChild>
                    <button
                        className="inline-flex items-center px-1.5 py-1 hover:bg-paper-deep transition-colors"
                        aria-label="Cambiar idioma"
                    >
                        <span className="text-sm leading-none">{language.flag}</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px] p-0 bg-paper border border-rule rounded-none">
                    <DialogHeader className="px-5 pt-5 pb-0">
                        <DialogTitle className="font-display italic text-xl text-ink">Idioma</DialogTitle>
                    </DialogHeader>
                    <div className="px-5 pb-5 pt-3">
                        <SelectorList
                            items={languages}
                            selected={selectedLanguage}
                            onSelect={(code) => {
                                setSelectedLanguage(code)
                                setLanguageOpen(false)
                            }}
                            searchPlaceholder="Buscar idioma"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
