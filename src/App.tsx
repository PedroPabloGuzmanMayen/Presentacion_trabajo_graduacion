import { useCallback, useEffect, useMemo, useState, type ComponentType } from 'react'
import {
  BarChart3, Brain, ChevronLeft, ChevronRight, HelpCircle, Maximize2, Minimize2, NotebookPen, ClipboardCheck, Database, FlaskConical, GitBranch, Home, Lightbulb, ListFilter,
  Menu, MessagesSquare, Scissors, Search, Workflow, Moon, PanelLeftClose, PanelLeftOpen, Sigma, Sparkles, Sun, Target, Wrench, X,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'
import { InicioScene, PreguntaScene, ProblemaScene } from '@/scenes/contexto'
import { CaracteristicasScene, DatosScene, EntrenamientoScene, ExploratorioScene, FasesScene, LimpiezaScene, ModelosScene } from '@/scenes/proceso'
import { ClasificacionScene, ComparacionScene, HallazgosScene, ImportanciaScene, RegresionScene } from '@/scenes/resultados'
import { notas } from '@/data/notas'
import { ConclusionesScene, DiscusionScene, HerramientaScene } from '@/scenes/cierre'

type Scene = { id: string; label: string; icon: LucideIcon; component: ComponentType }
const grupos: Array<{ titulo: string; escenas: Scene[] }> = [
  {
    titulo: 'Contexto',
    escenas: [
      { id: 'inicio', label: 'Inicio', icon: Home, component: InicioScene },
      { id: 'problema', label: 'El problema', icon: Target, component: ProblemaScene },
      { id: 'pregunta', label: 'La pregunta', icon: HelpCircle, component: PreguntaScene },
    ],
  },
  {
    titulo: 'Metodología',
    escenas: [
      { id: 'datos', label: 'Datos', icon: Database, component: DatosScene },
      { id: 'fases', label: 'Fases del estudio', icon: GitBranch, component: FasesScene },
      { id: 'limpieza', label: 'Limpieza de datos', icon: Scissors, component: LimpiezaScene },
      { id: 'variables', label: 'Creación de variables', icon: ListFilter, component: CaracteristicasScene },
      { id: 'exploratorio', label: 'Análisis exploratorio', icon: Search, component: ExploratorioScene },
      { id: 'modelos', label: 'Modelos', icon: Brain, component: ModelosScene },
      { id: 'entrenamiento', label: 'Entrenamiento', icon: Workflow, component: EntrenamientoScene },
    ],
  },
  {
    titulo: 'Resultados',
    escenas: [
      { id: 'hallazgos', label: 'Hallazgos', icon: Lightbulb, component: HallazgosScene },
      { id: 'clasificacion', label: 'Casos detectados', icon: ClipboardCheck, component: ClasificacionScene },
      { id: 'comparacion', label: 'Comparación de modelos', icon: BarChart3, component: ComparacionScene },
      { id: 'regresion', label: 'Nota estimada', icon: Sigma, component: RegresionScene },
      { id: 'importancia', label: '¿En qué se fija el modelo?', icon: Sparkles, component: ImportanciaScene },
      { id: 'herramienta', label: 'Herramienta', icon: Wrench, component: HerramientaScene },
    ],
  },
  {
    titulo: 'Cierre',
    escenas: [
      { id: 'discusion', label: 'Discusión', icon: MessagesSquare, component: DiscusionScene },
      { id: 'conclusiones', label: 'Conclusiones y recomendaciones', icon: FlaskConical, component: ConclusionesScene },
    ],
  },
]
const escenas = grupos.flatMap((g) => g.escenas)

const store = {
  get(k: string) { try { return localStorage.getItem(k) } catch { return null } },
  set(k: string, v: string) { try { localStorage.setItem(k, v) } catch { /* sin almacenamiento */ } },
}

function initialScene() {
  const h = typeof location !== 'undefined' ? location.hash.replace('#', '') : ''
  return escenas.some((s) => s.id === h) ? h : 'inicio'
}

function isDark() {
  const t = document.documentElement.getAttribute('data-theme')
  if (t) return t === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [active, setActive] = useState(initialScene)
  const [collapsed, setCollapsed] = useState(() => store.get('tesis-sidebar') === 'collapsed')
  const [drawer, setDrawer] = useState(false)
  const [dark, setDark] = useState(isDark)
  const [showNotes, setShowNotes] = useState(() => store.get('tesis-notas') === '1')
  const [focus, setFocus] = useState(false)

  const index = escenas.findIndex((s) => s.id === active)
  const Active = escenas[index].component
  const grupoActivo = useMemo(() => grupos.find((g) => g.escenas.some((s) => s.id === active))!.titulo, [active])

  const go = useCallback((id: string) => {
    setActive(id)
    setDrawer(false)
    try { history.replaceState(null, '', `#${id}`) } catch { /* el visor puede bloquearlo */ }
    document.getElementById('main')?.scrollTo({ top: 0 })
  }, [])

  const step = useCallback((d: number) => {
    const next = escenas[Math.min(escenas.length - 1, Math.max(0, index + d))]
    if (next.id !== active) go(next.id)
  }, [index, active, go])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, [role="radiogroup"]')) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); step(1) }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); step(-1) }
      if (e.key === 'n' || e.key === 'N') setShowNotes((v) => !v)
      if (e.key === 'f' || e.key === 'F') setFocus((v) => !v)
      if (e.key === 'Escape') setFocus(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  useEffect(() => { store.set('tesis-sidebar', collapsed ? 'collapsed' : 'expanded') }, [collapsed])
  useEffect(() => { store.set('tesis-notas', showNotes ? '1' : '0') }, [showNotes])

  useEffect(() => {
    const sync = () => setDark(isDark())
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', sync)
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => { mq.removeEventListener('change', sync); mo.disconnect() }
  }, [])

  const toggleTheme = () => document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark')

  const nav = (compact: boolean) => (
    <nav className="flex-1 px-2 py-3 flex flex-col gap-3 overflow-y-auto" aria-label="Secciones">
      {grupos.map((g) => (
        <div key={g.titulo} className="flex flex-col gap-0.5">
          {!compact && <p className="eyebrow px-2.5 pb-1">{g.titulo}</p>}
          {compact && <div className="mx-2 mb-1 border-t border-border/60 first:hidden" />}
          {g.escenas.map((s) => {
            const Icon = s.icon
            const on = s.id === active
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                aria-current={on ? 'page' : undefined}
                title={compact ? s.label : undefined}
                className={clsx(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                  on ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  compact && 'justify-center',
                )}
              >
                <Icon size={15} className={clsx('shrink-0', on && 'text-primary')} aria-hidden="true" />
                {!compact && <span className="text-left leading-snug">{s.label}</span>}
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )

  const brand = (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium truncate">UVG · Trabajo de graduación</p>
      <h1 className="text-sm font-semibold leading-tight truncate">Riesgo de reprobación</h1>
    </div>
  )

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="shrink-0 p-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )

  const prev = escenas[index - 1]
  const next = escenas[index + 1]

  return (
    <div className="flex h-full overflow-hidden bg-background text-foreground">
      {/* Barra lateral (escritorio) */}
      <aside className={clsx(focus ? 'hidden' : 'hidden md:flex', 'border-r border-border flex-col transition-[width] duration-200 ease-out', collapsed ? 'w-14' : 'w-60')}>
        <div className="flex items-center justify-between gap-2 px-3 py-3 border-b border-border/60">
          {!collapsed && brand}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="shrink-0 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>
        {nav(collapsed)}
        <div className={clsx('border-t border-border/60 px-3 py-3 flex items-center gap-2', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && <p className="text-[10px] text-muted-foreground leading-snug">← → avanzar · N notas<br />F pantalla completa</p>}
          {themeButton}
        </div>
      </aside>

      {/* Menú móvil */}
      {drawer && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <button type="button" aria-label="Cerrar menú" className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <aside className="relative z-10 w-64 max-w-[80%] h-full border-r border-border bg-card flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingLeft: 'env(safe-area-inset-left, 0px)' }}>
            <div className="flex items-center justify-between gap-2 px-3 py-3 border-b border-border/60">
              {brand}
              <button type="button" onClick={() => setDrawer(false)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground" aria-label="Cerrar menú"><X size={15} /></button>
            </div>
            {nav(false)}
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="md:hidden gutter flex items-center justify-between gap-2 py-2.5 border-b border-border">
          <button type="button" onClick={() => setDrawer(true)} className="p-1.5 rounded-md border border-border text-muted-foreground" aria-label="Abrir menú"><Menu size={15} /></button>
          <div className="min-w-0 text-center">
            <p className="eyebrow">{grupoActivo}</p>
            <p className="text-sm font-semibold truncate">{escenas[index].label}</p>
          </div>
          {themeButton}
        </div>

        <main id="main" className="flex-1 overflow-y-auto">
          <div className={clsx('gutter md:px-10 py-6 md:py-10 min-h-full flex flex-col', focus ? 'max-w-7xl mx-auto' : 'max-w-6xl')}>
            <div key={active} className="scene-enter flex-1 flex flex-col justify-center">
              <Active />
            </div>

            {showNotes && notas[active] && (
              <aside className="mt-8 rounded-lg border border-dashed border-accent/50 bg-accent/5 p-4" aria-label="Notas del presentador">
                <p className="eyebrow mb-2 flex items-center gap-1.5"><NotebookPen size={12} aria-hidden="true" /> Notas del presentador</p>
                <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground list-disc pl-5">
                  {notas[active].map((n) => <li key={n}>{n}</li>)}
                </ul>
              </aside>
            )}

            <footer className="mt-10 pt-4 border-t border-border flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={!prev}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:pointer-events-none min-w-0"
              >
                <ChevronLeft size={15} aria-hidden="true" /><span className="truncate">{prev ? prev.label : 'Anterior'}</span>
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowNotes((v) => !v)}
                  aria-pressed={showNotes}
                  title="Notas del presentador (N)"
                  className={clsx('flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs transition-colors', showNotes ? 'border-accent/60 bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:bg-muted')}
                >
                  <NotebookPen size={14} aria-hidden="true" /><span className="hidden sm:inline">Notas</span>
                </button>
                <span className="text-xs text-muted-foreground font-mono num">{index + 1} / {escenas.length}</span>
                <button
                  type="button"
                  onClick={() => setFocus((v) => !v)}
                  aria-pressed={focus}
                  title="Pantalla completa (F)"
                  className="hidden md:flex rounded-md border border-border p-2 text-muted-foreground hover:bg-muted"
                  aria-label={focus ? 'Mostrar menú' : 'Ocultar menú'}
                >
                  {focus ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={!next}
                className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none min-w-0"
              >
                <span className="truncate">{next ? next.label : 'Fin'}</span><ChevronRight size={15} aria-hidden="true" />
              </button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
