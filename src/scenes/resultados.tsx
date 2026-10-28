import { useState } from 'react'
import { Award, BarChart3, Crosshair, Repeat, Ruler, Sigma, Users } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import clsx from 'clsx'
import { Badge, Card, CardHead, SceneHeader, Segmented, Stat } from '@/components/ui'
import { IqrBar, Legend, useChartStyle } from '@/components/charts'
import { modelColor } from '@/lib/theme'
import {
  acumuladoPorMes, clasificacion, importanciaClf, importanciaReg, meses, modelos, modelosReg, notaPorIntento, paaPorClase,
  parcialesPorClase, promediosClf, promediosReg, regresion, reprobacionPorGenero, reprobacionPorIntento, reprobadosPrueba, variablesImp,
} from '@/data/tesis'

const mesCorto = (m: string) => m.slice(0, 3)

// ---------------------------------------------------------------- Hallazgos
export function HallazgosScene() {
  const { p, axis, grid, tooltip } = useChartStyle()
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Hallazgos"
        title="Repetir el curso no mejora el resultado"
        intro="A partir del segundo intento el rendimiento cae. Lo mismo se encontró antes en Cálculo 1, lo que sugiere que el patrón se repite en varios cursos de matemática de la Universidad."
      />

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
        <Card tone="bad">
          <CardHead icon={Repeat} title="¿Cuántos reprueban según el intento?" hint="Estudiantes de 2019 a 2022." />
          <div className="h-64 px-2 pb-3 pt-3">
            <ResponsiveContainer>
              <BarChart data={reprobacionPorIntento} margin={{ top: 24, right: 12, left: -8 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="intento" {...axis} />
                <YAxis domain={[0, 100]} unit=" %" {...axis} />
                <Tooltip {...tooltip} formatter={(v: number) => [`${v} %`, 'Reprobó']} />
                <Bar dataKey="tasa" radius={[4, 4, 0, 0]} barSize={56}>
                  {reprobacionPorIntento.map((d, i) => <Cell key={d.intento} fill={i === 0 ? p.primary : p.bad} />)}
                  <LabelList dataKey="tasa" position="top" formatter={(v: number) => `${v} %`} style={{ fill: p.foreground, fontSize: 12, fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="px-5 pb-4 text-xs text-muted-foreground">2,083 estudiantes en su primer intento, 224 en el segundo y 18 en el tercero o más.</p>
        </Card>

        <Card>
          <CardHead icon={Ruler} title="Nota final según el intento" hint="La barra muestra dónde está la mitad de los estudiantes; el número, la nota del estudiante típico. Se aprueba con 61." />
          <div className="p-5 pt-4 space-y-3">
            {notaPorIntento.map((n) => (
              <IqrBar key={n.intento} label={`Intento ${n.intento}`} q1={n.q1} med={n.mediana} q3={n.q3} min={0} max={100} color={n.intento === '1' ? p.primary : p.bad} />
            ))}
            <p className="text-xs text-muted-foreground pt-1">En el tercer y cuarto intento nadie llegó a 61.</p>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHead title="Notas en los parciales" hint="La diferencia entre ambos grupos es muy clara." />
          <div className="p-5 pt-4 space-y-3">
            <IqrBar label="Aprobó" q1={parcialesPorClase.aprobado.q1} med={parcialesPorClase.aprobado.mediana} q3={parcialesPorClase.aprobado.q3} min={0} max={100} color={p.primary} />
            <IqrBar label="Reprobó" q1={parcialesPorClase.reprobado.q1} med={parcialesPorClase.reprobado.mediana} q3={parcialesPorClase.reprobado.q3} min={0} max={100} color={p.bad} />
          </div>
        </Card>
        <Card>
          <CardHead title="Puntaje en la PAA" hint="Quienes aprueban suelen tener más puntos." />
          <div className="p-5 pt-4 space-y-3">
            <IqrBar label="Aprobó" q1={paaPorClase.aprobado.q1} med={paaPorClase.aprobado.mediana} q3={paaPorClase.aprobado.q3} min={900} max={1500} color={p.primary} />
            <IqrBar label="Reprobó" q1={paaPorClase.reprobado.q1} med={paaPorClase.reprobado.mediana} q3={paaPorClase.reprobado.q3} min={900} max={1500} color={p.bad} />
          </div>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHead icon={Users} title="Reprobación por género" hint="La diferencia es pequeña, así que no se usó en los modelos." />
          <ul className="p-5 pt-4 space-y-3">
            {reprobacionPorGenero.map((g) => (
              <li key={g.genero} className="space-y-1">
                <div className="flex justify-between text-xs"><span>{g.genero}</span><span className="font-mono num">{g.tasa} % · {g.reprobados} de {g.total.toLocaleString('es-GT')}</span></div>
                <div className="h-2 rounded bg-muted"><div className="h-2 rounded" style={{ width: `${(g.tasa / 20) * 100}%`, background: p['chart-5'] }} /></div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHead icon={BarChart3} title="Porcentaje acumulado en actividades al final de cada mes" hint="Valor del estudiante típico de cada grupo. Desde febrero, los dos grupos ya se separan claramente." />
        <div className="h-60 px-2 pb-3 pt-3">
          <ResponsiveContainer>
            <LineChart data={acumuladoPorMes} margin={{ right: 24, left: -8, top: 8 }}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="mes" {...axis} />
              <YAxis domain={[40, 100]} unit=" %" {...axis} />
              <Tooltip {...tooltip} formatter={(v: number, n: string) => [`${v} %`, n === 'aprobado' ? 'Aprobó' : 'Reprobó']} />
              <Line dataKey="aprobado" stroke={p.primary} strokeWidth={2.5} dot={{ r: 3, fill: p.primary }} />
              <Line dataKey="reprobado" stroke={p.bad} strokeWidth={2.5} dot={{ r: 3, fill: p.bad }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="px-5 pb-4"><Legend items={[{ label: 'Aprobó', color: p.primary }, { label: 'Reprobó', color: p.bad }]} /></div>
      </Card>
    </section>
  )
}

// ---------------------------------------------------------------- Clasificación
type MetricaClf = 'Casos reales detectados' | 'Falsas alarmas'
const metricasClf: MetricaClf[] = ['Casos reales detectados', 'Falsas alarmas']

export function ClasificacionScene() {
  const { p, axis, grid, tooltip } = useChartStyle()
  const [metrica, setMetrica] = useState<MetricaClf>('Casos reales detectados')
  const detectados = metrica === 'Casos reales detectados'
  const data = meses.map((mes) => {
    const row: Record<string, number | string> = { mes }
    for (const m of modelos) {
      const r = clasificacion.find((c) => c.modelo === m && c.mes === mes)!
      row[m] = +((detectados ? r.sens : 1 - r.prec) * 100).toFixed(1)
    }
    return row
  })
  const rf = meses.map((mes) => {
    const r = clasificacion.find((c) => c.modelo === 'Random Forest' && c.mes === mes)!
    const tp = Math.round(r.sens * reprobadosPrueba)
    const alertas = Math.round(tp / r.prec)
    return { mes, tp, fp: alertas - tp, sens: r.sens, prec: r.prec }
  })

  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Resultados · ¿Aprueba o reprueba?"
        title="Random Forest detecta casi todos los casos desde enero"
        intro={`Resultados con estudiantes que los modelos nunca habían visto: ${reprobadosPrueba} de ellos reprobaron. Todos los modelos mejoran conforme avanza el semestre y tienen más información.`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {rf.map((r) => (
          <Card key={r.mes} tone={r.mes === 'Enero' ? 'primary' : 'neutral'}>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between"><p className="eyebrow">{r.mes}</p><Badge tone="primary">Random Forest</Badge></div>
              <p className="text-3xl font-semibold num tracking-tight">{(r.sens * 100).toFixed(1)} %</p>
              <p className="text-xs text-muted-foreground">casos reales detectados · <span className="text-foreground font-medium num">{r.tp} de {reprobadosPrueba}</span></p>
              <div className="flex items-center justify-between border-t border-border pt-2 text-xs">
                <span className="text-muted-foreground">Falsas alarmas</span>
                <span className="font-mono num text-warn">{((1 - r.prec) * 100).toFixed(1)} % · {r.fp}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead
          icon={Crosshair}
          title="Comparación de los cinco algoritmos por mes"
          hint={detectados ? 'Porcentaje de estudiantes que reprobaron y que el modelo marcó en riesgo. Más es mejor.' : 'Porcentaje de alertas que resultaron ser estudiantes que sí aprobaron. Menos es mejor.'}
          right={<Segmented label="Qué mostrar" value={metrica} options={metricasClf} onChange={setMetrica} />}
        />
        <div className="h-72 px-2 pt-4">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ right: 12, left: -8 }} barCategoryGap="18%">
              <CartesianGrid {...grid} />
              <XAxis dataKey="mes" {...axis} />
              <YAxis domain={detectados ? [60, 100] : [0, 40]} allowDataOverflow unit=" %" {...axis} />
              <Tooltip {...tooltip} formatter={(v: number) => `${v.toFixed(1)} %`} />
              {modelos.map((m, i) => (
                <Bar key={m} dataKey={m} fill={modelColor(p, i)} radius={[3, 3, 0, 0]} opacity={i === 0 ? 1 : 0.75} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="px-5 pb-4 pt-2"><Legend items={modelos.map((m, i) => ({ label: m, color: modelColor(p, i), strong: i === 0 }))} /></div>
      </Card>

      <Card tone="primary">
        <CardHead icon={Award} title="Promedio de los cuatro meses" hint="Random Forest logra el mejor equilibrio: detecta casi todos los casos y genera pocas falsas alarmas." />
        <div className="p-5 pt-3 overflow-x-auto">
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="text-left font-medium py-2">Modelo</th>
                <th className="text-right font-medium py-2">Casos reales detectados</th>
                <th className="text-right font-medium py-2">Falsas alarmas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {promediosClf.map((r) => {
                const best = r.modelo === 'Random Forest'
                const maxSens = r.sens === Math.max(...promediosClf.map((x) => x.sens))
                const minFa = r.prec === Math.max(...promediosClf.map((x) => x.prec))
                return (
                  <tr key={r.modelo} className={clsx(best && 'bg-primary/5')}>
                    <td className="py-2.5 font-medium">{r.modelo} {best && <Badge tone="primary">Elegido</Badge>}</td>
                    <td className={clsx('py-2.5 text-right font-mono num', maxSens && 'text-good font-semibold')}>{(r.sens * 100).toFixed(1)} %</td>
                    <td className={clsx('py-2.5 text-right font-mono num', minFa && 'text-good font-semibold')}>{((1 - r.prec) * 100).toFixed(1)} %</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">En verde, el mejor valor de cada columna. Los modelos que detectan un poco más también generan bastantes más falsas alarmas, y el que tiene menos falsas alarmas deja escapar más casos en enero.</p>
        </div>
      </Card>
    </section>
  )
}

// ---------------------------------------------------------------- Regresión
export function RegresionScene() {
  const { p, axis, grid, tooltip } = useChartStyle()
  const regColor = (i: number) => (i === 4 ? p.primary : [p['chart-5'], p['chart-2'], p['chart-3'], p['chart-4']][i])
  const data = meses.map((mes) => {
    const row: Record<string, number | string> = { mes: mesCorto(mes) }
    for (const m of modelosReg) row[m] = regresion.find((r) => r.modelo === m && r.mes === mes)!.rmse
    return row
  })
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Resultados · ¿Qué nota sacará?"
        title="Estimar la nota exacta es difícil al inicio"
        intro="El segundo enfoque intentó adivinar la nota final. El mejor modelo fue la regresión lineal, pero en enero su error ronda entre 10 y 15 puntos. Como muchos estudiantes quedan cerca de 61, ese margen no alcanza para saber quién va a reprobar."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Mejor modelo" value="Lineal" sub="Regresión lineal" icon={Award} tone="primary" />
        <Stat label="Error en enero" value="14.9 pts" sub="RMSE, sobre 100 puntos" icon={Sigma} tone="bad" />
        <Stat label="Error en abril" value="4.1 pts" sub="RMSE, sobre 100 puntos" icon={Sigma} tone="good" />
        <Stat label="Cerca del límite" value="210+" sub="estudiantes con nota entre 56 y 65" icon={Ruler} tone="warn" />
      </div>

      <Card>
        <CardHead
          icon={Sigma}
          title="Error de la nota estimada por mes (RMSE)"
          hint="Cuántos puntos se equivoca, en promedio, la nota estimada (escala de 0 a 100). Menos es mejor. La franja marca un error de 10 puntos o más."
        />
        <div className="h-72 px-2 pt-4">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ right: 24, left: -8, top: 8 }}>
              <CartesianGrid {...grid} />
              <ReferenceArea y1={10} y2={16} fill={p.bad} fillOpacity={0.08} />
              <ReferenceLine y={10} stroke={p.bad} strokeDasharray="4 4" label={{ value: '10 pts', position: 'insideTopRight', fill: p.bad, fontSize: 11 }} />
              <XAxis dataKey="mes" {...axis} />
              <YAxis domain={[0, 16]} {...axis} />
              <Tooltip {...tooltip} formatter={(v: number) => `${v.toFixed(1)} pts`} />
              {modelosReg.map((m, i) => (
                <Line key={m} dataKey={m} stroke={regColor(i)} strokeWidth={m === 'Regresión lineal' ? 3 : 1.75} dot={{ r: m === 'Regresión lineal' ? 4 : 2.5, fill: regColor(i) }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="px-5 pb-4 pt-2"><Legend items={modelosReg.map((m, i) => ({ label: m, color: regColor(i), strong: m === 'Regresión lineal' }))} /></div>
      </Card>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-4">
        <Card>
          <CardHead title="Error promedio de los cuatro meses (RMSE)" />
          <div className="p-5 pt-3 overflow-x-auto">
            <table className="w-full text-sm min-w-[300px]">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left font-medium py-2">Modelo</th>
                  <th className="text-right font-medium py-2">RMSE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {promediosReg.map((r) => (
                  <tr key={r.modelo} className={clsx(r.modelo === 'Regresión lineal' && 'bg-primary/5')}>
                    <td className="py-2.5 font-medium">{r.modelo}</td>
                    <td className="py-2.5 text-right font-mono num">{r.rmse.toFixed(1)} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card tone="accent">
          <CardHead title="¿Por qué elegir aprueba / reprueba?" />
          <div className="p-5 pt-3 space-y-3 text-sm">
            <p className="text-muted-foreground">Ese enfoque detecta más casos de reprobación desde el primer mes. Estimar la nota no se descarta del todo: puede servir de <strong className="text-foreground">apoyo</strong>.</p>
            <div className="rounded-md border border-warn/40 bg-warn/10 p-3 text-xs">
              Si un estudiante aparece <strong>sin riesgo</strong> pero con una <strong>nota estimada baja</strong>, conviene revisarlo y darle seguimiento.
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- Importancia
export function ImportanciaScene() {
  const { p, axis, grid, tooltip } = useChartStyle()
  const [enfoque, setEnfoque] = useState<'¿Aprueba o reprueba?' | '¿Qué nota sacará?'>('¿Aprueba o reprueba?')
  const clf = enfoque === '¿Aprueba o reprueba?'
  const lista = clf ? modelos : modelosReg
  const [modelo, setModelo] = useState<string>('Random Forest')
  const fuente = clf ? importanciaClf : importanciaReg
  const m = (lista as readonly string[]).includes(modelo) ? modelo : 'Random Forest'
  const matriz = fuente[m]
  const trend = meses.map((mes, i) => ({
    mes: mesCorto(mes),
    intento: matriz[i][0],
    acumulado: matriz[i][1],
    examenes: +(matriz[i][2] + matriz[i][3]).toFixed(2),
    perfil: +(matriz[i][4] + matriz[i][5] + matriz[i][6]).toFixed(2),
  }))
  const series = [
    { k: 'intento', label: 'Número de intento', c: p.bad },
    { k: 'acumulado', label: '% acumulado en actividades', c: p.primary },
    { k: 'examenes', label: 'Notas de parciales', c: p['chart-2'] },
    { k: 'perfil', label: 'PAA, colegio y título', c: p['chart-5'] },
  ]

  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Resultados · ¿En qué se fija el modelo?"
        title="Al inicio pesa el historial; después, el rendimiento"
        intro="En enero todavía hay pocas notas, así que el modelo se fija sobre todo en si el estudiante ya había llevado el curso. Con el paso de los meses pasan a importar más el porcentaje acumulado y los parciales, y la PAA, el colegio y el título dejan de pesar."
      />

      <div className="flex flex-wrap items-center gap-3">
        <Segmented label="Enfoque" value={enfoque} options={['¿Aprueba o reprueba?', '¿Qué nota sacará?'] as const} onChange={setEnfoque} />
        <Segmented label="Modelo" value={m} options={lista as readonly string[]} onChange={setModelo} />
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-4">
        <Card>
          <CardHead title={`Peso de cada dato · ${m}`} hint="Qué tanto usa el modelo cada dato para decidir, de 0 a 1. Cada mes suma 1." />
          <div className="p-5 pt-3 overflow-x-auto">
            <table className="w-full text-xs min-w-[420px]">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="text-left font-medium py-1.5 pr-2">Dato</th>
                  {meses.map((mes) => <th key={mes} className="font-medium py-1.5 text-center w-[16%]">{mesCorto(mes)}</th>)}
                </tr>
              </thead>
              <tbody>
                {variablesImp.map((v, vi) => (
                  <tr key={v}>
                    <td className="py-1 pr-2 whitespace-nowrap">{v}</td>
                    {meses.map((_, mi) => {
                      const val = matriz[mi][vi]
                      const na = (mi === 0 && (vi === 2 || vi === 3)) || (mi === 1 && vi === 3)
                      return (
                        <td key={mi} className="p-0.5">
                          <div
                            className="rounded px-1.5 py-1.5 text-center font-mono num"
                            style={{ background: na ? 'transparent' : `color-mix(in srgb, ${p.primary} ${Math.round(8 + val * 62)}%, transparent)`, color: p.foreground, fontWeight: val >= 0.3 ? 600 : 400 }}
                          >
                            {na ? <span className="text-muted-foreground">–</span> : val.toFixed(2)}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="Cómo cambia a lo largo del semestre" hint="Peso agrupado por tipo de dato." />
          <div className="h-64 px-2 pt-3">
            <ResponsiveContainer>
              <LineChart data={trend} margin={{ right: 20, left: -12, top: 8 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="mes" {...axis} />
                <YAxis domain={[0, 1]} {...axis} />
                <Tooltip {...tooltip} formatter={(v: number, n: string) => [v.toFixed(2), series.find((s) => s.k === n)?.label ?? n]} />
                {series.map((s) => <Line key={s.k} dataKey={s.k} stroke={s.c} strokeWidth={2.25} dot={{ r: 3, fill: s.c }} />)}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 pb-4 pt-2"><Legend items={series.map((s) => ({ label: s.label, color: s.c }))} /></div>
        </Card>
      </div>

      <Card tone="accent">
        <div className="p-5 grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="eyebrow">¿Aprueba o reprueba?</p>
            <p className="text-muted-foreground">El número de intento es el dato más útil en los primeros meses para saber <strong className="text-foreground">si</strong> un estudiante va a reprobar.</p>
          </div>
          <div className="space-y-1">
            <p className="eyebrow">¿Qué nota sacará?</p>
            <p className="text-muted-foreground">Aquí manda el porcentaje acumulado desde enero; el intento ayuda poco a estimar <strong className="text-foreground">la nota exacta</strong>.</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
