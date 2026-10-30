import { ArrowRight, Clock, GraduationCap, HeartCrack, HelpingHand, Hourglass, LogOut, Search } from 'lucide-react'
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Badge } from '@/components/ui'
import { Big, IconTile, Panel, Slide } from '@/components/slide'
import { useChartStyle } from '@/components/charts'
import { proyecto } from '@/data/tesis'

export function InicioScene() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center gap-10">
      <header className="space-y-5">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="primary">Trabajo de graduación</Badge>
          <Badge>{proyecto.universidad}</Badge>
        </div>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-5xl leading-[1.05]">{proyecto.titulo}</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{proyecto.subtitulo}</p>
      </header>
      <dl className="flex flex-wrap gap-x-14 gap-y-4 border-t border-border pt-6">
        <div>
          <dt className="eyebrow">Autor</dt>
          <dd className="mt-1 text-lg font-medium">{proyecto.autor}</dd>
        </div>
        <div>
          <dt className="eyebrow">Asesora</dt>
          <dd className="mt-1 text-lg font-medium">{proyecto.asesora}</dd>
        </div>
      </dl>
    </section>
  )
}

export function ProblemaScene() {
  const { p, axis } = useChartStyle()
  const data = [
    { k: 'Sin notas bajas', v: 48, c: p['chart-5'] },
    { k: 'Con una nota baja', v: 33, c: p.bad },
  ]
  return (
    <Slide eyebrow="El problema" title="La reprobación y su relación con la deserción">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        <IconTile icon={Clock} label="Retraso" tone="warn" />
        <IconTile icon={Hourglass} label="Tiempo perdido" tone="warn" />
        <IconTile icon={HeartCrack} label="Desmotivación" tone="warn" />
        <ArrowRight className="h-8 w-8 text-muted-foreground hidden sm:block" aria-hidden="true" />
        <IconTile icon={LogOut} label="Deserción" tone="bad" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Panel className="flex flex-col justify-center">
          <Big value="+60 %" label="no se graduó tras reprobar Precálculo" tone="bad" />
          <p className="mt-4 text-xs text-muted-foreground">Adaricheva et al., 2025 · Estados Unidos</p>
        </Panel>
        <Panel>
          <p className="text-base font-semibold">Probabilidad de graduarse</p>
          <div className="h-40 mt-2">
            <ResponsiveContainer>
              <BarChart data={data} layout="vertical" margin={{ left: 4, right: 48 }}>
                <XAxis type="number" domain={[0, 60]} hide />
                <YAxis type="category" dataKey="k" width={130} {...axis} tick={{ ...axis.tick, fontSize: 13 }} axisLine={false} />
                <Bar dataKey="v" radius={[0, 6, 6, 0]} barSize={30}>
                  {data.map((d) => <Cell key={d.k} fill={d.c} />)}
                  <LabelList dataKey="v" position="right" formatter={(v: number) => `${v} %`} style={{ fill: p.foreground, fontSize: 16, fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground">Hatfield et al., 2022 · 110,000 estudiantes</p>
        </Panel>
      </div>
    </Slide>
  )
}

export function PreguntaScene() {
  return (
    <Slide eyebrow="La pregunta" title="¿Podemos detectar a tiempo quién va a reprobar?">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-5">
        <Panel>
          <p className="eyebrow mb-5">Un curso clave</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="rounded-xl border border-primary/50 bg-primary/10 px-5 py-4">
              <p className="text-lg md:text-2xl font-semibold text-primary">Pensamiento Cuantitativo</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <div className="rounded-xl border border-border bg-muted/50 px-5 py-4">
              <p className="text-lg md:text-2xl font-semibold">Cálculo 1</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <div className="rounded-xl border border-dashed border-border px-5 py-4">
              <p className="text-lg md:text-2xl font-semibold text-muted-foreground">Carrera</p>
            </div>
          </div>
          <p className="mt-5 text-base text-muted-foreground">Primer curso de matemática en varias ingenierías.</p>
        </Panel>
        <Panel className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-4">
            <Search className="h-9 w-9 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-xl md:text-2xl font-semibold">Identificar pronto</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 ml-1.5" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <HelpingHand className="h-9 w-9 shrink-0 text-good" aria-hidden="true" />
            <p className="text-xl md:text-2xl font-semibold">Apoyar a tiempo</p>
          </div>
        </Panel>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <GraduationCap className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-base">Antecedente en la UVG: modelos similares en Cálculo 1 (Pineda, 2024).</p>
      </div>
    </Slide>
  )
}
