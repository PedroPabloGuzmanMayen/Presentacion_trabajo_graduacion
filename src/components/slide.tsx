import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

// Diapositiva: un título corto y grande, y un área visual que ocupa el resto.
export function Slide({ eyebrow, title, lead, children, className }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section className={clsx('flex flex-col gap-8 md:gap-10', className)}>
      <header className="space-y-3">
        <p className="eyebrow text-xs">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08] max-w-4xl">{title}</h2>
        {lead && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{lead}</p>}
      </header>
      {children}
    </section>
  )
}

type Tone = 'primary' | 'accent' | 'good' | 'warn' | 'bad' | 'neutral'
const toneText: Record<Tone, string> = {
  primary: 'text-primary', accent: 'text-accent', good: 'text-good', warn: 'text-warn', bad: 'text-bad', neutral: 'text-foreground',
}
const toneBox: Record<Tone, string> = {
  primary: 'border-primary/40 bg-primary/10 text-primary',
  accent: 'border-accent/40 bg-accent/10 text-accent',
  good: 'border-good/40 bg-good/10 text-good',
  warn: 'border-warn/40 bg-warn/10 text-warn',
  bad: 'border-bad/40 bg-bad/10 text-bad',
  neutral: 'border-border bg-muted/50 text-foreground',
}

// Número grande con una etiqueta corta debajo.
export function Big({ value, label, tone = 'neutral', size = 'lg' }: { value: ReactNode; label: ReactNode; tone?: Tone; size?: 'md' | 'lg' | 'xl' }) {
  const sz = { md: 'text-3xl md:text-4xl', lg: 'text-4xl md:text-6xl', xl: 'text-6xl md:text-8xl' }[size]
  return (
    <div className="min-w-0">
      <p className={clsx('font-semibold tracking-tight num leading-none', sz, toneText[tone])}>{value}</p>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">{label}</p>
    </div>
  )
}

// Ícono dentro de un cuadro de color, con una etiqueta corta.
export function IconTile({ icon: Icon, label, sub, tone = 'neutral' }: { icon: LucideIcon; label: ReactNode; sub?: ReactNode; tone?: Tone }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className={clsx('grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl border', toneBox[tone])}>
        <Icon className="h-8 w-8 md:h-9 md:w-9" aria-hidden="true" />
      </div>
      <div>
        <p className="text-base md:text-lg font-semibold leading-tight">{label}</p>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )
}

export function Chip({ children, tone = 'neutral', icon: Icon }: { children: ReactNode; tone?: Tone; icon?: LucideIcon }) {
  return (
    <span className={clsx('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm md:text-base font-medium', toneBox[tone])}>
      {Icon && <Icon size={16} aria-hidden="true" />}
      <span className="text-foreground">{children}</span>
    </span>
  )
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('rounded-xl border border-border bg-card p-5 md:p-6', className)}>{children}</div>
}
