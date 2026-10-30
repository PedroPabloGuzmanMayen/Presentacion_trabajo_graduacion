import { ArrowRight, Brain, Check, Database, FileSpreadsheet, Filter, GitBranch, KanbanSquare, Layers, Lock, Scissors, ShieldCheck, Sparkles, Target, Users, Workflow, X } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Badge, Card, CardHead, SceneHeader, Stat } from '@/components/ui'
import { Legend, useChartStyle } from '@/components/charts'
import {
  algoritmos, datos, division, excluidos, fases, flujoEntrenamiento, limpieza, meses, seleccion, tablaActividades, tablaEstudiantes,
  tecnologias, variablesCreadas, variablesPorMes,
} from '@/data/tesis'

// ---------------------------------------------------------------- Datos y obtención
export function DatosScene() {
  const tablas = [
    { titulo: 'Información de los estudiantes', filas: datos.filasRegistro, icon: Users, items: tablaEstudiantes },
    { titulo: 'Actividades del curso', filas: datos.filasActividades, icon: FileSpreadsheet, items: tablaActividades },
  ]
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Metodología · Datos"
        title="De dónde vienen los datos"
        intro="Se usaron las notas de los estudiantes de Pensamiento Cuantitativo de 2019 a 2022. Los datos los proporcionó la Ing. Lynette García Pérez y provienen de las bases de datos de la Universidad, de Canvas y de un archivo de Excel con las actividades del curso."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Periodo" value={datos.periodo} sub="Cuatro años del curso" icon={Database} tone="primary" />
        <Stat label="Estudiantes" value={datos.filasRegistro.toLocaleString('es-GT')} sub="registros iniciales" icon={Users} />
        <Stat label="Actividades" value={datos.filasActividades.toLocaleString('es-GT')} sub="registros de tareas, parciales y exámenes" icon={Layers} />
        <Stat label="Fuentes" value="3" sub="Bases de datos de la UVG, Canvas y un Excel de actividades" icon={FileSpreadsheet} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {tablas.map((t) => (
          <Card key={t.titulo}>
            <CardHead icon={t.icon} title={t.titulo} hint={`${t.filas.toLocaleString('es-GT')} filas`} />
            <ul className="p-5 pt-3 divide-y divide-border">
              {t.items.map((i) => (
                <li key={i.v} className="py-2 first:pt-0 last:pb-0 grid grid-cols-[minmax(0,11rem)_1fr] gap-3 text-xs">
                  <span className="font-medium text-foreground">{i.v}</span>
                  <span className="text-muted-foreground">{i.d}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
        <Card className="lg:col-span-2">
          <CardHead icon={FileSpreadsheet} title="Registro de actividades por año" hint="Archivo de Excel" />
          <div className="p-5 pt-3 grid md:grid-cols-[1fr_1.4fr] gap-4 items-center">
            <ul className="divide-y divide-border">
              {[
                { v: 'Nombre de la actividad', d: 'Cada tarea, parcial y examen del curso.' },
                { v: 'Puntos posibles', d: 'Lo máximo que se podía obtener.' },
              ].map((i) => (
                <li key={i.v} className="py-2 first:pt-0 last:pb-0 grid grid-cols-[minmax(0,11rem)_1fr] gap-3 text-xs">
                  <span className="font-medium text-foreground">{i.v}</span>
                  <span className="text-muted-foreground">{i.d}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed">Lista las actividades que se hicieron en cada año analizado. Sirvió para verificar que las actividades registradas coincidieran con la estructura real del curso y para detectar actividades faltantes.</p>
          </div>
        </Card>
      </div>

      <Card tone="good">
        <div className="p-5 grid md:grid-cols-[auto_1fr] gap-4 items-center">
          <div className="rounded-md border border-border/60 bg-muted/40 p-3 text-good w-fit"><Lock size={22} aria-hidden="true" /></div>
          <div className="space-y-1">
            <p className="eyebrow">Privacidad</p>
            <p className="text-sm max-w-3xl">El carné se reemplazó por un código anónimo y se eliminaron los nombres. Con estos datos no es posible saber a qué estudiante pertenece cada registro.</p>
          </div>
        </div>
      </Card>
    </section>
  )
}

// ---------------------------------------------------------------- Fases
export function FasesScene() {
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Metodología · Fases"
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

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHead icon={GitBranch} title="CRISP-DM" />
          <p className="p-5 pt-2 text-sm text-muted-foreground leading-relaxed">Ordenó el proyecto en fases enfocadas en los objetivos: analizar los datos, encontrar patrones y desarrollar los modelos.</p>
        </Card>
        <Card>
          <CardHead icon={KanbanSquare} title="Kanban" />
          <p className="p-5 pt-2 text-sm text-muted-foreground leading-relaxed">Un tablero visual para seguir las tareas de cada fase y sumar trabajo que no estaba planeado al inicio.</p>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="eyebrow mr-1">Herramientas</span>
        {tecnologias.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- Limpieza
export function LimpiezaScene() {
  const { p, tooltip } = useChartStyle()
  const clases = [
    { name: 'Aprobó', value: datos.tasaAprobacion, c: p.primary },
    { name: 'Reprobó', value: datos.tasaReprobacion, c: p.bad },
  ]
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Fase 1 · Limpieza de datos"
        title="Información completa y sin errores"
        intro="Antes de entrenar cualquier modelo se revisó que no hubiera datos faltantes, repetidos ni inconsistentes, y que las actividades registradas coincidieran con la estructura del curso de cada año."
      />

      <Card>
        <CardHead icon={Scissors} title="Pasos de la limpieza" />
        <ol className="p-5 pt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {limpieza.map((l, i) => (
            <li key={l.paso} className="rounded-md border border-border bg-card/60 p-3 space-y-1">
              <p className="text-xs font-semibold flex items-center gap-2"><span className="font-mono text-muted-foreground num">{String(i + 1).padStart(2, '0')}</span>{l.paso}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{l.detalle}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
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
        <Card tone="primary">
          <CardHead icon={ShieldCheck} title="Resultado de la limpieza" hint="Los registros sin información suficiente se dejaron fuera para no rellenar demasiados datos a ciegas." />
          <div className="p-5 pt-3 space-y-3">
            <ul className="space-y-2 text-sm">
              {excluidos.map((e) => (
                <li key={e.motivo} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{e.motivo}</span>
                  <span className="font-mono num">−{e.n}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-between gap-3 border-t border-border pt-3">
              <span className="text-sm font-medium">Estudiantes analizados</span>
              <span className="text-2xl font-semibold num text-primary">{datos.estudiantesFinal.toLocaleString('es-GT')}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- Creación de variables
export function CaracteristicasScene() {
  const grupos = [...new Set(variablesCreadas.map((v) => v.grupo))]
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Fase 2 · Creación de variables"
        title="De las calificaciones a señales de riesgo"
        intro="A partir de las notas y fechas de cada actividad se crearon nuevos indicadores. Se basaron en investigaciones previas y en experiencia con problemas parecidos, como la detección de fraude."
      />

      <div className="grid lg:grid-cols-3 gap-4 items-start">
        {grupos.map((g, gi) => (
          <Card key={g} tone={gi === 0 ? 'primary' : 'neutral'}>
            <CardHead icon={Sparkles} title={g} />
            <ul className="p-5 pt-3 divide-y divide-border">
              {variablesCreadas.filter((v) => v.grupo === g).map((v) => (
                <li key={v.v} className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                  <p className="text-sm font-medium">{v.v}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.d}</p>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-5 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="eyebrow">Resultado</p>
            <p className="mt-1 text-2xl font-semibold num">{datos.variablesConstruidas} variables</p>
            <p className="text-xs text-muted-foreground">Una fila por estudiante y semestre</p>
          </div>
          <div className="sm:col-span-2 text-sm text-muted-foreground leading-relaxed self-center">
            Las variables de cada mes se calcularon con la información disponible al cierre de ese mes. En 2019 las tareas se entregaban en papel, así que las fechas de entrega y calificación de ese año se completaron con valores típicos.
          </div>
        </div>
      </Card>
    </section>
  )
}

// ---------------------------------------------------------------- Análisis exploratorio
export function ExploratorioScene() {
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Fase 3 · Análisis exploratorio"
        title="Elegir los datos que realmente ayudan"
        intro="Con el 70 % de los datos (los mismos que luego usarían los modelos para aprender) se comparó a quienes aprobaron con quienes reprobaron. Se conservaron solo las variables que mostraban una diferencia clara entre ambos grupos."
      />

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: '¿Son diferentes los grupos?', d: 'Se comparó cada variable entre aprobados y reprobados para ver si sus valores eran distintos.' },
          { t: '¿Se relaciona con el resultado?', d: 'Se midió qué tanto se relaciona cada variable con aprobar y con la nota final.' },
          { t: '¿Repite información?', d: 'Si dos variables decían casi lo mismo, se quedó la más fácil de interpretar.' },
        ].map((c) => (
          <Card key={c.t}>
            <div className="p-5 space-y-1">
              <p className="text-sm font-semibold">{c.t}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead icon={Filter} title="Qué se usó y qué se descartó" />
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

// ---------------------------------------------------------------- Flujo de entrenamiento
export function EntrenamientoScene() {
  const { p } = useChartStyle()
  const colors = [p.primary, p['chart-2'], p['chart-3']]
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Fases 4 y 5 · Entrenamiento"
        title="Cómo se entrenaron los modelos"
        intro="Se entrenaron 40 modelos: cinco algoritmos, uno para cada mes de enero a abril y con dos enfoques. El primero predice si el estudiante aprueba o reprueba; el segundo estima su nota final."
      />

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { t: 'Clasificación', q: '¿Aprueba o reprueba?', obj: 'Aprobado', tipo: 'Binaria', d: 'Vale 1 si el estudiante aprobó y 0 si reprobó. El modelo da la probabilidad de reprobar y se enfoca en encontrar a quienes reprueban.' },
          { t: 'Regresión', q: '¿Qué nota sacará?', obj: 'Nota final', tipo: 'Numérica, de 0 a 100', d: 'El modelo estima la nota con la que el estudiante terminará el curso. Se aprueba con 61.' },
        ].map((e) => (
          <Card key={e.t} tone="accent">
            <CardHead icon={Target} title={`${e.t} · ${e.q}`} />
            <div className="p-5 pt-3 space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="eyebrow">Variable objetivo</span>
                <span className="text-lg font-semibold">{e.obj}</span>
                <Badge>{e.tipo}</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{e.d}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card tone="primary">
        <CardHead icon={Workflow} title="Flujo de entrenamiento" hint="El mismo proceso se repitió para cada algoritmo y cada mes." />
        <ol className="p-5 pt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {flujoEntrenamiento.map((f, i) => (
            <li key={f.t} className="relative rounded-md border border-border bg-card/60 p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold num">{i + 1}</span>
                <p className="text-sm font-semibold">{f.t}</p>
                {i < flujoEntrenamiento.length - 1 && <ArrowRight size={14} className="ml-auto shrink-0 text-muted-foreground" aria-hidden="true" />}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.d}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHead icon={Brain} title="Algoritmos utilizados" />
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

      <Card>
        <CardHead title="Cómo se repartieron los datos" />
        <div className="p-5 pt-4 grid md:grid-cols-[1.2fr_1fr] gap-5 items-center">
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
    </section>
  )
}
