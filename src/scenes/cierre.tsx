import {
  ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, Clock, Download, FileText, Gauge, Globe, GraduationCap, Layers,
  Rocket, ScanSearch, ShieldCheck, Upload, Users, X,
} from 'lucide-react'
import { Big, Chip, IconTile, Panel, Slide } from '@/components/slide'

export function HerramientaScene() {
  const pasos = [
    { icon: Upload, t: 'Subir notas', sub: 'Dos archivos .csv' },
    { icon: CalendarDays, t: 'Elegir el mes' },
    { icon: Gauge, t: 'Ver el riesgo', sub: 'Por estudiante' },
    { icon: Download, t: 'Descargar' },
  ]
  return (
    <Slide eyebrow="Fase 6 · Herramienta" title="Una herramienta web para el docente">
      <ol className="flex flex-wrap items-start justify-center gap-4 md:gap-8">
        {pasos.map((s, i) => (
          <li key={s.t} className="flex items-start gap-4 md:gap-8">
            <IconTile icon={s.icon} label={s.t} sub={s.sub} tone={i === 2 ? 'accent' : 'primary'} />
            {i < pasos.length - 1 && <ArrowRight className="mt-6 md:mt-7 h-7 w-7 text-muted-foreground hidden sm:block" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap justify-center gap-3">
        <Chip icon={Globe} tone="primary">Disponible en la web</Chip>
        <Chip icon={Rocket}>Gradio + Hugging Face</Chip>
      </div>
    </Slide>
  )
}

export function DiscusionScene() {
  return (
    <Slide eyebrow="Discusión" title="¿Por qué Random Forest?">
      <div className="grid sm:grid-cols-3 gap-5">
        <Panel><IconTile icon={ScanSearch} label="Detecta casi todos" sub="Desde el primer mes" tone="good" /></Panel>
        <Panel><IconTile icon={ShieldCheck} label="Pocas falsas alarmas" tone="good" /></Panel>
        <Panel><IconTile icon={Layers} label="Estable todo el semestre" tone="good" /></Panel>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Panel className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
            <p className="text-lg md:text-xl font-semibold">Coincide con estudios previos en la UVG</p>
          </div>
          <div className="flex items-end gap-6">
            <Big value="5.3 %" label="1.er intento" tone="primary" size="md" />
            <ArrowRight className="mb-8 h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <Big value="83 %" label="2.º intento" tone="bad" size="md" />
          </div>
        </Panel>
        <Panel className="space-y-4">
          <p className="text-lg md:text-xl font-semibold">Limitaciones</p>
          <ul className="space-y-3">
            {[
              { icon: FileText, t: '2019: entregas en papel' },
              { icon: X, t: 'PAA faltantes' },
              { icon: Users, t: 'Sin datos demográficos' },
            ].map((l) => (
              <li key={l.t} className="flex items-center gap-3 text-base md:text-lg">
                <l.icon className="h-5 w-5 shrink-0 text-warn" aria-hidden="true" />{l.t}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Slide>
  )
}

export function ConclusionesScene() {
  const conclusiones = [
    { icon: CheckCircle2, t: 'Detecta al menos el 89.6 % desde enero' },
    { icon: Check, t: 'Random Forest, el mejor modelo' },
    { icon: Clock, t: 'Quien repite el curso reprueba más' },
    { icon: Gauge, t: 'Estimar la nota sirve como apoyo' },
  ]
  const recomendaciones = ['Datos recientes', 'Uso real por docentes', 'Otros cursos clave', 'Más variables', 'Efecto de tutorías', 'Un modelo por departamento']
  return (
    <Slide eyebrow="Cierre" title="Conclusiones y recomendaciones">
      <div className="grid sm:grid-cols-2 gap-4">
        {conclusiones.map((c) => (
          <Panel key={c.t} className="flex items-center gap-4">
            <c.icon className="h-8 w-8 shrink-0 text-good" aria-hidden="true" />
            <p className="text-lg md:text-xl font-semibold leading-snug">{c.t}</p>
          </Panel>
        ))}
      </div>
      <div className="space-y-4">
        <p className="flex items-center gap-2 text-lg font-semibold"><GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" /> Siguientes pasos</p>
        <div className="flex flex-wrap gap-2.5">
          {recomendaciones.map((r) => <Chip key={r} tone="accent">{r}</Chip>)}
        </div>
      </div>
    </Slide>
  )
}
