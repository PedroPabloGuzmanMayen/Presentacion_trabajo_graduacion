import { AlertTriangle, BookMarked, CheckCircle2, Cloud, Download, FileSpreadsheet, Lightbulb, Medal, Scale, Upload } from 'lucide-react'
import clsx from 'clsx'
import { Badge, Card, CardHead, SceneHeader } from '@/components/ui'
import { conclusiones, recomendaciones } from '@/data/tesis'

const caracteristicas = [
  { icon: Upload, t: 'Subir los datos', d: 'El docente carga dos archivos .csv: uno con la información general de los estudiantes y otro con sus notas en las actividades del semestre.' },
  { icon: FileSpreadsheet, t: 'Elegir el mes', d: 'La herramienta usa el modelo de ese mes y revisa que los archivos tengan información hasta esa fecha.' },
  { icon: Scale, t: 'Ver el riesgo', d: 'Muestra la probabilidad de reprobar de cada estudiante y si está en riesgo o fuera de riesgo.' },
  { icon: Download, t: 'Descargar resultados', d: 'Los resultados se exportan en .csv para darles seguimiento.' },
  { icon: Cloud, t: 'Disponible en la web', d: 'Está publicada en Hugging Face, así que se puede usar desde el navegador sin instalar nada.' },
]

export function HerramientaScene() {
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="Herramienta"
        title="Una herramienta para usar el modelo"
        intro="Como prueba de concepto se construyó una aplicación web que usa el modelo Random Forest. Está pensada para que el personal docente pueda identificar a los estudiantes en riesgo sin conocimientos técnicos."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {caracteristicas.map((s, i) => (
          <Card key={s.t} tone={i === 2 ? 'primary' : undefined} className={i === caracteristicas.length - 1 ? 'sm:col-span-2' : undefined}>
            <div className="p-5 flex gap-3">
              <div className="h-fit rounded-md border border-border/60 bg-muted/40 p-2 text-primary"><s.icon size={16} aria-hidden="true" /></div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{s.t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function DiscusionScene() {
  const comparacion = [
    { m: 'Random Forest', t: 'Es el que mejor equilibra detectar casos reales y evitar falsas alarmas, y lo hace igual de bien todos los meses.', tone: 'primary' as const, tag: 'Elegido' },
    { m: 'LightGBM', t: 'Muy cerca del mejor, pero en enero genera más falsas alarmas.', tone: 'neutral' as const },
    { m: 'XGBoost', t: 'Detecta muchos casos, pero en febrero y marzo genera más falsas alarmas.', tone: 'neutral' as const },
    { m: 'Regresión logística', t: 'Casi no da falsas alarmas, pero en enero solo detecta el 72.9 % de los casos. Y enero es el mes más importante.', tone: 'neutral' as const },
    { m: 'Árbol de decisión', t: 'Detecta muchos casos, pero es el que más falsas alarmas genera en febrero y marzo.', tone: 'neutral' as const },
  ]
  return (
    <section className="space-y-6">
      <SceneHeader eyebrow="Discusión" title="Por qué Random Forest y qué nos dicen los datos" intro="Los resultados se midieron con estudiantes que el modelo nunca había visto, así que es de esperar que funcione igual de bien con estudiantes nuevos." />

      <Card>
        <CardHead icon={Medal} title="Elección del mejor modelo" />
        <ul className="p-5 pt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {comparacion.map((c) => (
            <li key={c.m} className={clsx('rounded-md border p-3 space-y-1', c.tone === 'primary' ? 'border-primary/50 bg-primary/5 md:col-span-2 lg:col-span-1 lg:row-span-2' : 'border-border bg-card/60')}>
              <p className="text-sm font-semibold flex items-center gap-2">{c.m}{c.tag && <Badge tone="primary">{c.tag}</Badge>}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.t}</p>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card tone="primary">
          <CardHead icon={BookMarked} title="Coincide con investigaciones previas en la institución" />
          <div className="p-5 pt-3 space-y-2 text-sm text-muted-foreground">
            <p>Un estudio de 2024 en la UVG encontró que repetir Cálculo 1 no mejoraba el rendimiento; lo empeoraba. Aquí pasa lo mismo: solo el <strong className="text-foreground">5.3 %</strong> reprueba en el primer intento, frente al <strong className="text-bad">83 %</strong> en el segundo.</p>
            <p>En ambos casos, el porcentaje acumulado en actividades es uno de los mejores indicadores del riesgo. El patrón parece repetirse en varios cursos de la Universidad.</p>
          </div>
        </Card>
        <Card tone="warn">
          <CardHead icon={AlertTriangle} title="Limitaciones" />
          <ul className="p-5 pt-3 space-y-2.5 text-sm">
            <li className="flex gap-2"><span className="text-warn">▸</span><span className="text-muted-foreground">En 2019 las tareas se entregaban en papel y Canvas casi no se usaba. Por eso fue difícil medir el efecto de las entregas tardías en unos 400 estudiantes.</span></li>
            <li className="flex gap-2"><span className="text-warn">▸</span><span className="text-muted-foreground">A muchos estudiantes les faltaba el puntaje de la PAA.</span></li>
            <li className="flex gap-2"><span className="text-warn">▸</span><span className="text-muted-foreground">No se contó con datos socioeconómicos ni demográficos, que suelen usarse en estudios parecidos.</span></li>
          </ul>
        </Card>
      </div>

      <Card>
        <div className="p-5 grid md:grid-cols-[auto_1fr] gap-4 items-center">
          <div className="rounded-md border border-border/60 bg-muted/40 p-3 text-accent w-fit"><Scale size={22} aria-hidden="true" /></div>
          <p className="text-sm md:text-base max-w-3xl">Estimar la nota con un margen de unos 10 puntos no basta para saber si un estudiante cerca de 61 va a reprobar. Por eso esa estimación queda como <strong>apoyo</strong>: el docente puede revisarla en los estudiantes que el modelo principal no marcó en riesgo.</p>
        </div>
      </Card>
    </section>
  )
}

export function ConclusionesScene() {
  return (
    <section className="space-y-6">
      <SceneHeader eyebrow="Cierre" title="Conclusiones y recomendaciones" />

      <Card tone="primary">
        <CardHead icon={CheckCircle2} title="Conclusiones" />
        <ol className="p-5 pt-3 grid md:grid-cols-2 gap-x-6 gap-y-3">
          {conclusiones.map((c, i) => (
            <li key={i} className={clsx('flex gap-3 text-sm', i === 0 && 'md:col-span-2')}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold text-primary num">{i + 1}</span>
              <span className={clsx('leading-relaxed', i === 0 ? 'text-foreground font-medium' : 'text-muted-foreground')}>{c}</span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-semibold"><Lightbulb size={16} className="text-accent" aria-hidden="true" /> Recomendaciones</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recomendaciones.map((r) => (
            <Card key={r.titulo}>
              <div className="p-4 space-y-1">
                <p className="text-sm font-semibold">{r.titulo}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.texto}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
