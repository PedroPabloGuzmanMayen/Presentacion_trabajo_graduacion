import { Brain, Check, Database, Filter, GitBranch, KanbanSquare, Layers, Scissors, ShieldCheck, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Badge, Card, CardHead, SceneHeader, Stat } from '@/components/ui'
import { Legend, useChartStyle } from '@/components/charts'
import { algoritmos, datos, division, excluidos, fases, gruposVariables, limpieza, meses, seleccion, tecnologias, variablesPorMes } from '@/data/tesis'

export function DatosScene() {
  const { p, tooltip } = useChartStyle()
  const clases = [
    { name: 'Aprobó', value: datos.tasaAprobacion, c: p.primary },
    { name: 'Reprobó', value: datos.tasaReprobacion, c: p.bad },
  ]
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Datos"
        title="Cuatro años de notas en Pensamiento Cuantitativo"
        intro="Datos de la Universidad y de Canvas entre 2019 y 2022. Para proteger a los estudiantes, el carné se cambió por un código anónimo y se quitaron los nombres."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Estudiantes" value={datos.filasRegistro.toLocaleString('es-GT')} sub="registros iniciales: PAA, colegio, intento y nota final" icon={Database} />
        <Stat label="Actividades" value={datos.filasActividades.toLocaleString('es-GT')} sub="registros de tareas, parciales y entregas" icon={Layers} />
        <Stat label="Estudiantes analizados" value={datos.estudiantesFinal.toLocaleString('es-GT')} sub={`${datos.mujeres} mujeres · ${datos.hombres.toLocaleString('es-GT')} hombres`} icon={ShieldCheck} tone="primary" />
        <Stat label="Variables creadas" value={datos.variablesConstruidas} sub="una fila por estudiante y semestre" icon={Sparkles} tone="accent" />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        <Card>
          <CardHead icon={Scissors} title="Limpieza de datos" hint="Antes de entrenar cualquier modelo, la información tenía que estar completa, sin repetidos y sin errores." />
          <ol className="p-5 pt-3 grid sm:grid-cols-2 gap-3">
            {limpieza.map((l, i) => (
              <li key={l.paso} className="rounded-md border border-border bg-card/60 p-3 space-y-1">
                <p className="text-xs font-semibold flex items-center gap-2"><span className="font-mono text-muted-foreground num">{String(i + 1).padStart(2, '0')}</span>{l.paso}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{l.detalle}</p>
              </li>
            ))}
          </ol>
        </Card>

        <div className="flex flex-col gap-4">
          <Card tone="bad">
            <CardHead icon={Filter} title="Pocos casos de reprobación" hint="Solo 1 de cada 7 estudiantes reprueba. Eso hace más difícil que un modelo aprenda a reconocerlos, y se tomó en cuenta en todo el proyecto." />
            <div className="p-5 pt-2 flex items-center gap-4">
              <div className="h-36 w-36 shrink-0">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={clases} dataKey="value" innerRadius={42} outerRadius={64} startAngle={90} endAngle={-270} stroke="none">
                      {clases.map((c) => <Cell key={c.name} fill={c.c} />)}
                    </Pie>
                    <Tooltip {...tooltip} formatter={(v: number) => `${v} %`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-semibold num text-bad">{datos.tasaReprobacion} %</p>
                <p className="text-xs text-muted-foreground">reprobó el curso</p>
                <Legend items={clases.map((c) => ({ label: `${c.name} ${c.value} %`, color: c.c }))} />
              </div>
            </div>
          </Card>
          <Card>
            <CardHead title="Registros que se dejaron fuera" hint="Les faltaba demasiada información para usarlos con confianza." />
            <ul className="p-5 pt-3 space-y-2 text-sm">
              {excluidos.map((e) => (
                <li key={e.motivo} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{e.motivo}</span>
                  <span className="font-mono num">{e.n}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function MetodologiaScene() {
  const { p } = useChartStyle()
  const colors = [p.primary, p['chart-2'], p['chart-3']]
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Metodología"
        title="Seis fases de trabajo"
        intro="El proyecto siguió CRISP-DM, una guía común para proyectos de ciencia de datos que permite regresar a una fase anterior cuando aparece algo nuevo. Las tareas de cada fase se organizaron con un tablero Kanban."
      />

      <Card tone="primary">
        <CardHead icon={GitBranch} title="Fases del proyecto" right={<div className="flex gap-1.5"><Badge tone="primary">CRISP-DM</Badge><Badge><KanbanSquare size={10} aria-hidden="true" /> Kanban</Badge></div>} />
        <ol className="p-5 pt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fases.map((f) => (
            <li key={f.n} className="relative rounded-md border border-border bg-card/60 p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold num">{f.n}</span>
                <p className="text-sm font-semibold">{f.nombre}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.resumen}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHead icon={Brain} title="Algoritmos utilizados" hint="Cada uno se probó con dos enfoques: predecir si el estudiante aprueba o reprueba, y estimar su nota final." />
          <ul className="p-5 pt-3 divide-y divide-border">
            {algoritmos.map((a) => (
              <li key={a.t} className="py-2.5 first:pt-0 last:pb-0">
                <p className="text-sm font-medium">{a.t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.d}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHead icon={Layers} title="Un modelo para cada mes" hint="Cada modelo usa solo lo que se sabe hasta ese mes, igual que pasaría en la vida real. Mayo no se incluyó porque ya contiene la nota final." />
          <div className="p-5 pt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="text-left font-medium py-1.5 pr-3">Información</th>
                  {meses.map((m) => <th key={m} className="font-medium py-1.5 px-2 text-center">{m.slice(0, 3)}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {variablesPorMes.map((v) => (
                  <tr key={v.variable}>
                    <td className="py-2 pr-3">{v.variable}</td>
                    {v.meses.map((on, i) => (
                      <td key={i} className="py-2 px-2 text-center">
                        {on ? <Check size={14} className="inline text-good" aria-label="usada" /> : <span className="text-muted-foreground" aria-label="no usada">–</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4">
        <Card>
          <CardHead icon={Scissors} title="Cómo se repartieron los datos" hint="Se mantuvo la misma proporción de aprobados y reprobados en cada grupo." />
          <div className="p-5 pt-4 space-y-4">
            <div className="flex h-9 overflow-hidden rounded-md">
              {division.map((d, i) => (
                <div key={d.conjunto} className="grid place-items-center text-xs font-semibold" style={{ width: `${d.pct}%`, background: colors[i], color: p.card }}>
                  {d.pct} %
                </div>
              ))}
            </div>
            <ul className="space-y-2">
              {division.map((d, i) => (
                <li key={d.conjunto} className="flex gap-2 text-xs">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: colors[i] }} aria-hidden="true" />
                  <span><strong className="font-semibold">{d.conjunto}.</strong> <span className="text-muted-foreground">{d.uso}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card tone="accent">
            <CardHead icon={SlidersHorizontal} title="Ajuste de cada modelo" />
            <p className="p-5 pt-2 text-xs text-muted-foreground leading-relaxed">Se probaron <strong className="text-foreground">1,000 configuraciones</strong> distintas de cada modelo para quedarse con la que mejor funcionaba.</p>
          </Card>
          <Card tone="accent">
            <CardHead icon={ShieldCheck} title="¿Cuándo hay riesgo?" />
            <p className="p-5 pt-2 text-xs text-muted-foreground leading-relaxed">El objetivo es no dejar pasar a ningún estudiante en riesgo, pero sin llenar al docente de <strong className="text-foreground">falsas alarmas</strong>. Por eso se buscó un equilibrio entre ambas cosas, dando más importancia a detectar los casos reales.</p>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="eyebrow mr-1">Herramientas</span>
        {tecnologias.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
    </section>
  )
}

export function VariablesScene() {
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Variables"
        title="De las calificaciones a señales de riesgo"
        intro="A partir de las notas se crearon nuevos indicadores, basados en investigaciones previas y en experiencia con problemas parecidos, como la detección de fraude. Luego se revisó cuáles realmente ayudaban a distinguir a quienes aprueban de quienes reprueban."
      />

      <div className="grid md:grid-cols-3 gap-4">
        {gruposVariables.map((g, i) => (
          <Card key={g.grupo} tone={i === 0 ? 'primary' : 'neutral'}>
            <CardHead title={g.grupo} />
            <ul className="p-5 pt-3 space-y-1.5 text-xs">
              {g.items.map((it) => <li key={it} className="flex gap-2"><span className="text-accent">▸</span><span className="text-muted-foreground">{it}</span></li>)}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead icon={Filter} title="Qué se usó y qué se descartó" hint="Se conservaron los datos que mostraban una diferencia clara entre aprobados y reprobados." />
        <div className="p-5 pt-3 grid lg:grid-cols-2 gap-x-6">
          {[true, false].map((sel) => (
            <div key={String(sel)} className="min-w-0">
              <p className="eyebrow py-2 flex items-center gap-2">
                {sel ? <Badge tone="good">Se usaron · 6</Badge> : <Badge tone="bad">Se descartaron · 7</Badge>}
              </p>
              <ul className="divide-y divide-border">
                {seleccion.filter((s) => s.decision === sel).map((s) => (
                  <li key={s.variable} className="py-2 flex gap-2.5">
                    {sel ? <Check size={14} className="mt-0.5 shrink-0 text-good" aria-hidden="true" /> : <X size={14} className="mt-0.5 shrink-0 text-bad" aria-hidden="true" />}
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{s.variable}</p>
                      <p className="text-xs text-muted-foreground">{s.motivo}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}
