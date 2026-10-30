import { useState } from 'react'
import { ArrowRight, User } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import clsx from 'clsx'
import { Segmented } from '@/components/ui'
import { Big, Panel, Slide } from '@/components/slide'
import { Legend, useChartStyle } from '@/components/charts'
import { clasificacion, importanciaClf, meses, promediosClf, regresion, reprobacionPorIntento, reprobadosPrueba, type Mes } from '@/data/tesis'

const mesCorto = (m: string) => m.slice(0, 3)

// ---------------------------------------------------------------- Hallazgos
export function HallazgosScene() {
  const { p, axis, grid } = useChartStyle()
  return (
    <Slide eyebrow="Resultados · Hallazgos" title="Repetir el curso no mejora el resultado">
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        <Panel>
          <p className="text-lg font-semibold">Reprobaron, según el intento</p>
          <div className="h-72 mt-2">
            <ResponsiveContainer>
              <BarChart data={reprobacionPorIntento} margin={{ top: 36, right: 8, left: -16 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="intento" {...axis} tick={{ ...axis.tick, fontSize: 14 }} />
                <YAxis domain={[0, 100]} hide />
                <Bar dataKey="tasa" radius={[6, 6, 0, 0]} barSize={84}>
                  {reprobacionPorIntento.map((d, i) => <Cell key={d.intento} fill={i === 0 ? p.primary : p.bad} />)}
                  <LabelList dataKey="tasa" position="top" formatter={(v: number) => `${v} %`} style={{ fill: p.foreground, fontSize: 22, fontWeight: 700 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <div className="grid gap-5">
          <Panel>
            <p className="eyebrow mb-3">Mediana en parciales</p>
            <div className="flex items-end gap-6">
              <Big value="80" label="aprobó" tone="primary" size="md" />
              <span className="pb-6 text-muted-foreground">vs.</span>
              <Big value="33" label="reprobó" tone="bad" size="md" />
            </div>
          </Panel>
          <Panel>
            <p className="eyebrow mb-3">Mediana en la PAA</p>
            <div className="flex items-end gap-6">
              <Big value="1,234" label="aprobó" tone="primary" size="md" />
              <span className="pb-6 text-muted-foreground">vs.</span>
              <Big value="1,130" label="reprobó" tone="bad" size="md" />
            </div>
          </Panel>
        </div>
      </div>
    </Slide>
  )
}

// ---------------------------------------------------------------- Clasificación (Random Forest)
export function ClasificacionScene() {
  const [mes, setMes] = useState<Mes>('Enero')
  const r = clasificacion.find((c) => c.modelo === 'Random Forest' && c.mes === mes)!
  const tp = Math.round(r.sens * reprobadosPrueba)
  const fp = Math.round(tp / r.prec) - tp
  const fn = reprobadosPrueba - tp
  return (
    <Slide eyebrow="Resultados · Random Forest" title="Detecta 9 de cada 10 desde enero">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Segmented label="Mes" value={mes} options={meses} onChange={setMes} />
        <p className="text-base text-muted-foreground">{reprobadosPrueba} estudiantes que reprobaron, nunca vistos por el modelo</p>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5 items-stretch">
        <Panel>
          <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5 md:gap-2" role="img" aria-label={`${tp} detectados de ${reprobadosPrueba}`}>
            {Array.from({ length: reprobadosPrueba }, (_, i) => (
              <div key={i} className={clsx('grid aspect-square place-items-center rounded-md transition-colors duration-300', i < tp ? 'bg-good/20 text-good' : 'bg-bad/20 text-bad')}>
                <User className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-good" aria-hidden="true" />Detectado a tiempo</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-bad" aria-hidden="true" />Se escapó</span>
          </div>
        </Panel>
        <div className="grid gap-5">
          <Panel><Big value={`${tp} de ${reprobadosPrueba}`} label={`detectados en ${mes.toLowerCase()} (${(r.sens * 100).toFixed(1)} %)`} tone="good" /></Panel>
          <div className="grid grid-cols-2 gap-5">
            <Panel><Big value={fn} label="se escaparon" tone="bad" size="md" /></Panel>
            <Panel><Big value={fp} label="falsas alarmas" tone="warn" size="md" /></Panel>
          </div>
        </div>
      </div>
    </Slide>
  )
}

// ---------------------------------------------------------------- Comparación de modelos
export function ComparacionScene() {
  const { p } = useChartStyle()
  return (
    <Slide eyebrow="Resultados · Comparación" title="Random Forest: el mejor equilibrio">
      <Panel>
        <div className="grid grid-cols-[minmax(0,9rem)_1fr_1fr] md:grid-cols-[minmax(0,12rem)_1fr_1fr] gap-x-4 gap-y-4 items-center">
          <span />
          <p className="text-sm md:text-base font-semibold text-good">Casos detectados</p>
          <p className="text-sm md:text-base font-semibold text-warn">Falsas alarmas</p>
          {promediosClf.map((m) => {
            const best = m.modelo === 'Random Forest'
            return (
              <div key={m.modelo} className="contents">
                <p className={clsx('text-sm md:text-lg', best ? 'font-semibold text-primary' : 'text-muted-foreground')}>{m.modelo}</p>
                <div className="flex items-center gap-2">
                  <div className="h-6 md:h-7 rounded" style={{ width: `${m.sens * 80}%`, background: p.good, opacity: best ? 1 : 0.45 }} />
                  <span className={clsx('text-sm md:text-base num', best && 'font-semibold')}>{(m.sens * 100).toFixed(0)} %</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 md:h-7 rounded" style={{ width: `${(1 - m.prec) * 80 * 2.5}%`, background: p.warn, opacity: best ? 1 : 0.45 }} />
                  <span className={clsx('text-sm md:text-base num', best && 'font-semibold')}>{((1 - m.prec) * 100).toFixed(0)} %</span>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
      <p className="text-lg md:text-xl text-muted-foreground">Promedio de enero a abril. Detecta casi todos, con pocas falsas alarmas.</p>
    </Slide>
  )
}

// ---------------------------------------------------------------- Regresión
export function RegresionScene() {
  const { p, axis, grid } = useChartStyle()
  const data = meses.map((mes) => ({ mes: mesCorto(mes), rmse: regresion.find((r) => r.modelo === 'Regresión lineal' && r.mes === mes)!.rmse }))
  return (
    <Slide eyebrow="Resultados · Nota estimada" title="Estimar la nota exacta es difícil al inicio">
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-5">
        <Panel className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-4">
            <Big value="±15" label="puntos en enero" tone="bad" />
            <ArrowRight className="h-7 w-7 text-muted-foreground shrink-0" aria-hidden="true" />
            <Big value="±4" label="puntos en abril" tone="good" />
          </div>
          <p className="text-base text-muted-foreground">Regresión lineal, el mejor modelo de nota (RMSE)</p>
        </Panel>
        <Panel>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={data} margin={{ right: 24, left: -12, top: 30 }}>
                <CartesianGrid {...grid} />
                <ReferenceArea y1={10} y2={18} fill={p.bad} fillOpacity={0.08} />
                <ReferenceLine y={10} stroke={p.bad} strokeDasharray="4 4" label={{ value: 'Error de 10 puntos', position: 'insideTopRight', fill: p.bad, fontSize: 12 }} />
                <XAxis dataKey="mes" {...axis} tick={{ ...axis.tick, fontSize: 14 }} />
                <YAxis domain={[0, 18]} {...axis} />
                <Line dataKey="rmse" stroke={p.primary} strokeWidth={4} dot={{ r: 6, fill: p.primary }} isAnimationActive={false}>
                  <LabelList dataKey="rmse" position="top" offset={12} formatter={(v: number) => v.toFixed(1)} style={{ fill: p.foreground, fontSize: 14, fontWeight: 600 }} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <Panel className="border-warn/40 bg-warn/10">
        <p className="text-lg md:text-xl font-medium">Útil como apoyo: <span className="text-muted-foreground">sin riesgo, pero con nota estimada baja → revisar.</span></p>
      </Panel>
    </Slide>
  )
}

// ---------------------------------------------------------------- Importancia
export function ImportanciaScene() {
  const { p, axis, grid } = useChartStyle()
  const m = importanciaClf['Random Forest']
  const trend = meses.map((mes, i) => ({
    mes: mesCorto(mes),
    intento: m[i][0],
    acumulado: m[i][1],
    examenes: +(m[i][2] + m[i][3]).toFixed(2),
    perfil: +(m[i][4] + m[i][5] + m[i][6]).toFixed(2),
  }))
  const series = [
    { k: 'intento', label: 'Número de intento', c: p.bad },
    { k: 'acumulado', label: '% acumulado', c: p.primary },
    { k: 'examenes', label: 'Parciales', c: p['chart-2'] },
    { k: 'perfil', label: 'PAA, colegio y título', c: p['chart-5'] },
  ]
  return (
    <Slide eyebrow="Resultados · ¿En qué se fija?" title="Al inicio pesa el historial; después, el rendimiento">
      <Panel>
        <p className="text-base text-muted-foreground">Importancia de cada dato para Random Forest</p>
        <div className="h-80 mt-2">
          <ResponsiveContainer>
            <LineChart data={trend} margin={{ right: 24, left: -12, top: 12 }}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="mes" {...axis} tick={{ ...axis.tick, fontSize: 14 }} />
              <YAxis domain={[0, 0.6]} {...axis} />
              {series.map((s) => <Line key={s.k} dataKey={s.k} stroke={s.c} strokeWidth={s.k === 'perfil' ? 2.5 : 4} dot={{ r: 5, fill: s.c }} isAnimationActive={false} />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3"><Legend className="text-sm md:text-base" items={series.map((s) => ({ label: s.label, color: s.c }))} /></div>
      </Panel>
    </Slide>
  )
}
