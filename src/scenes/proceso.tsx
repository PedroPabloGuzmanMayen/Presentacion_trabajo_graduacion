import {
  ArrowRight, BarChart3, Brain, CalendarDays, Check, CheckCircle2, Cog, Copy, Database, FileSpreadsheet, FileX, Filter, Lock,
  MonitorSmartphone, Rocket, Scissors, Search, Sparkles, Tags, Target, TreeDeciduous, Trees, TrendingUp, Type, X,
} from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Big, Chip, IconTile, Panel, Slide } from '@/components/slide'
import { useChartStyle } from '@/components/charts'
import { datos, division, meses, seleccion } from '@/data/tesis'

// ---------------------------------------------------------------- Datos
export function DatosScene() {
  return (
    <Slide eyebrow="Metodología · Datos" title="Cuatro años de notas: 2019 a 2022">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <IconTile icon={Database} label="Base de datos UVG" sub="Perfil de cada estudiante" tone="primary" />
        <IconTile icon={MonitorSmartphone} label="Canvas" sub="Notas y entregas" tone="primary" />
        <IconTile icon={FileSpreadsheet} label="Excel de actividades" sub="Actividades y puntos por año" tone="primary" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Panel><Big value={datos.filasRegistro.toLocaleString('es-GT')} label="registros de estudiantes" /></Panel>
        <Panel><Big value={datos.filasActividades.toLocaleString('es-GT')} label="registros de actividades" /></Panel>
      </div>
      <div className="flex items-center gap-3 text-good">
        <Lock className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-base md:text-lg font-medium">Datos anónimos: sin carné ni nombres</p>
      </div>
    </Slide>
  )
}

// ---------------------------------------------------------------- Fases
const pasos = [
  { icon: Scissors, t: 'Limpieza' },
  { icon: Sparkles, t: 'Variables' },
  { icon: Search, t: 'Exploración' },
  { icon: Brain, t: 'Modelos' },
  { icon: Target, t: 'Evaluación' },
  { icon: Rocket, t: 'Herramienta' },
]

export function FasesScene() {
  return (
    <Slide eyebrow="Metodología · Fases" title="Seis fases basadas en CRISP-DM">
      <ol className="grid grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
        {pasos.map((s, i) => (
          <li key={s.t} className="relative flex flex-col items-center text-center gap-3">
            <div className="relative grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
              <s.icon className="h-8 w-8" aria-hidden="true" />
              <span className="absolute -top-2 -left-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold num">{i + 1}</span>
            </div>
            <p className="text-base md:text-lg font-semibold">{s.t}</p>
            {i < pasos.length - 1 && <ArrowRight className="hidden lg:block absolute top-7 md:top-9 -right-4 h-5 w-5 text-muted-foreground" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-3">
        <Chip tone="primary" icon={Cog}>CRISP-DM: fases que se pueden repetir</Chip>
        <Chip icon={CheckCircle2}>Kanban: seguimiento de tareas</Chip>
      </div>
    </Slide>
  )
}

// ---------------------------------------------------------------- Limpieza
export function LimpiezaScene() {
  const { p } = useChartStyle()
  const clases = [
    { name: 'Aprobó', value: datos.tasaAprobacion, c: p.primary },
    { name: 'Reprobó', value: datos.tasaReprobacion, c: p.bad },
  ]
  const checks = [
    { icon: Type, t: 'Formatos' },
    { icon: FileX, t: 'Valores imposibles' },
    { icon: Copy, t: 'Repetidos' },
    { icon: Filter, t: 'Datos faltantes' },
    { icon: Tags, t: 'Categorías raras' },
  ]
  return (
    <Slide eyebrow="Fase 1 · Limpieza" title="Datos completos y sin errores">
      <div className="grid md:grid-cols-[1fr_1fr] gap-5 items-stretch">
        <Panel>
          <ul className="grid gap-4">
            {checks.map((c) => (
              <li key={c.t} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-good/40 bg-good/10 text-good"><c.icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="text-lg md:text-xl font-medium">{c.t}</span>
                <Check className="ml-auto h-5 w-5 text-good" aria-label="revisado" />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="flex flex-col items-center justify-center gap-4">
          <div className="relative h-48 w-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={clases} dataKey="value" innerRadius={62} outerRadius={92} startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
                  {clases.map((c) => <Cell key={c.name} fill={c.c} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center">
              <p className="text-4xl font-semibold num text-bad">13.5 %</p>
            </div>
          </div>
          <p className="text-lg md:text-xl font-semibold text-center">Solo 1 de cada 7 reprueba</p>
        </Panel>
      </div>
      <Panel className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-lg md:text-xl text-muted-foreground">Resultado</p>
        <p className="text-3xl md:text-4xl font-semibold num text-primary">{datos.estudiantesFinal.toLocaleString('es-GT')} <span className="text-lg md:text-xl text-foreground font-medium">estudiantes</span></p>
      </Panel>
    </Slide>
  )
}

// ---------------------------------------------------------------- Variables
const gruposVis = [
  { icon: TrendingUp, t: 'Rendimiento', tone: 'primary' as const, items: ['% acumulado', 'Nota de parciales', 'Cambio mensual', 'Vs. la sección'] },
  { icon: MonitorSmartphone, t: 'Canvas', tone: 'accent' as const, items: ['Entregas tardías', 'Comentarios', 'Días para calificar'] },
  { icon: CalendarDays, t: 'Contexto', tone: 'neutral' as const, items: ['Virtual o presencial'] },
]

export function CaracteristicasScene() {
  return (
    <Slide eyebrow="Fase 2 · Variables" title="De las calificaciones a señales de riesgo">
      <div className="grid md:grid-cols-3 gap-5">
        {gruposVis.map((g) => (
          <Panel key={g.t} className="space-y-5">
            <IconTile icon={g.icon} label={g.t} tone={g.tone} />
            <div className="flex flex-wrap justify-center gap-2">
              {g.items.map((i) => <Chip key={i}>{i}</Chip>)}
            </div>
          </Panel>
        ))}
      </div>
      <p className="text-xl md:text-2xl font-semibold"><span className="text-primary num">40</span> variables por estudiante</p>
    </Slide>
  )
}

// ---------------------------------------------------------------- Exploratorio
const cortos: Record<string, string> = {
  'Porcentaje acumulado en actividades': '% acumulado',
  'Notas en los parciales': 'Parciales',
  'Número de intento': 'Número de intento',
  'Puntaje en la PAA': 'PAA',
  'Colegio': 'Colegio',
  'Título de nivel medio': 'Título',
  'Comparación con la sección': 'Vs. la sección',
  'Cambio de un mes a otro': 'Cambio mensual',
  'Entregas tardías': 'Entregas tardías',
  'Cantidad de comentarios': 'Comentarios',
  'Días para calificar': 'Días para calificar',
  'Modalidad y año': 'Modalidad y año',
  'Género': 'Género',
}

export function ExploratorioScene() {
  return (
    <Slide eyebrow="Fase 3 · Análisis exploratorio" title="Solo lo que distingue a quienes reprueban">
      <div className="grid md:grid-cols-2 gap-5">
        {[true, false].map((sel) => (
          <Panel key={String(sel)} className="space-y-5">
            <div className={`flex items-center gap-3 ${sel ? 'text-good' : 'text-bad'}`}>
              {sel ? <Check className="h-7 w-7" aria-hidden="true" /> : <X className="h-7 w-7" aria-hidden="true" />}
              <p className="text-2xl font-semibold">{sel ? 'Se usaron' : 'Se descartaron'}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {seleccion.filter((s) => s.decision === sel).map((s) => (
                <Chip key={s.variable} tone={sel ? 'good' : 'bad'}>{cortos[s.variable] ?? s.variable}</Chip>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </Slide>
  )
}

// ---------------------------------------------------------------- Modelos
const algos = [
  { icon: TreeDeciduous, t: 'Árbol de decisión' },
  { icon: Trees, t: 'Random Forest' },
  { icon: Trees, t: 'XGBoost' },
  { icon: Trees, t: 'LightGBM' },
  { icon: TrendingUp, t: 'Regresión logística / lineal' },
]

export function ModelosScene() {
  return (
    <Slide eyebrow="Fase 4 · Modelos" title="Un modelo para cada mes del semestre">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-center">
        <Big value="5" label="algoritmos" tone="primary" />
        <span className="text-3xl md:text-5xl text-muted-foreground">×</span>
        <Big value="4" label="meses" tone="primary" />
        <span className="text-3xl md:text-5xl text-muted-foreground">×</span>
        <Big value="2" label="enfoques" tone="primary" />
        <span className="text-3xl md:text-5xl text-muted-foreground">=</span>
        <Big value="40" label="modelos" tone="accent" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Panel className="space-y-2">
          <p className="eyebrow">Clasificación</p>
          <p className="text-2xl font-semibold">¿Aprueba o reprueba?</p>
          <p className="text-base text-muted-foreground">Objetivo: <span className="text-foreground font-medium">Aprobado</span> · sí / no</p>
        </Panel>
        <Panel className="space-y-2">
          <p className="eyebrow">Regresión</p>
          <p className="text-2xl font-semibold">¿Qué nota sacará?</p>
          <p className="text-base text-muted-foreground">Objetivo: <span className="text-foreground font-medium">Nota final</span> · 0 a 100</p>
        </Panel>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {meses.map((m, i) => (
          <div key={m} className="rounded-lg border border-border bg-card p-3 text-center">
            <p className="text-lg md:text-xl font-semibold">{m}</p>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">{i === 0 ? 'Perfil + tareas' : '+ parciales'}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {algos.map((a) => <Chip key={a.t} icon={a.icon}>{a.t}</Chip>)}
      </div>
    </Slide>
  )
}

// ---------------------------------------------------------------- Entrenamiento
const flujo = [
  { icon: Scissors, t: 'Separar' },
  { icon: Cog, t: 'Ajustar', sub: '1,000 pruebas' },
  { icon: Brain, t: 'Entrenar' },
  { icon: Target, t: 'Definir el riesgo' },
  { icon: BarChart3, t: 'Evaluar', sub: 'Datos nuevos' },
]

export function EntrenamientoScene() {
  const { p } = useChartStyle()
  const colors = [p.primary, p['chart-2'], p['chart-3']]
  const nombres = ['Aprender', 'Ajustar', 'Evaluar']
  return (
    <Slide eyebrow="Fases 4 y 5 · Entrenamiento" title="Detectar a todos, sin llenar de falsas alarmas">
      <ol className="flex flex-wrap items-start justify-center gap-4 md:gap-6">
        {flujo.map((f, i) => (
          <li key={f.t} className="flex items-start gap-4 md:gap-6">
            <IconTile icon={f.icon} label={f.t} sub={f.sub} tone="primary" />
            {i < flujo.length - 1 && <ArrowRight className="mt-6 md:mt-7 h-6 w-6 text-muted-foreground hidden sm:block" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <Panel className="space-y-4">
        <div className="flex h-14 overflow-hidden rounded-lg">
          {division.map((d, i) => (
            <div key={d.conjunto} className="grid place-items-center text-base md:text-lg font-semibold" style={{ width: `${d.pct}%`, background: colors[i], color: p.card }}>
              {d.pct} %
            </div>
          ))}
        </div>
        <div className="flex">
          {division.map((d, i) => (
            <p key={d.conjunto} className="text-sm md:text-base font-medium text-center" style={{ width: `${d.pct}%` }}>{nombres[i]}</p>
          ))}
        </div>
      </Panel>

      <div className="flex flex-wrap items-center gap-3">
        <Chip tone="good" icon={Check}>Más peso a detectar</Chip>
        <span className="text-muted-foreground">+</span>
        <Chip tone="warn" icon={Filter}>Controlar falsas alarmas</Chip>
      </div>
    </Slide>
  )
}
