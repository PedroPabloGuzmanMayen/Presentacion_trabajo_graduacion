import { AlertTriangle, BookOpen, CalendarClock, GraduationCap, Layers, Scale, Target, TrendingDown, Users } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge, Card, CardHead, SceneHeader, Stat } from '@/components/ui'
import { useChartStyle } from '@/components/charts'
import { datos, proyecto } from '@/data/tesis'

export function InicioScene() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="primary">Trabajo de graduación</Badge>
          <Badge>{proyecto.universidad}</Badge>
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl leading-[1.08]">{proyecto.titulo}</h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">{proyecto.subtitulo}</p>
      </header>

      <Card tone="primary">
        <div className="p-6 flex flex-col md:flex-row md:items-stretch gap-6 md:divide-x md:divide-border">
          <div className="md:w-2/5 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target size={14} aria-hidden="true" />
              <p className="eyebrow">Resultado principal</p>
            </div>
            <p className="text-5xl md:text-6xl font-semibold tracking-tight num text-primary">89.6 %</p>
            <p className="text-sm text-muted-foreground max-w-xs">de los estudiantes que reprobaron fueron detectados desde <strong className="text-foreground">enero</strong>, el primer mes del semestre.</p>
          </div>
          <div className="flex-1 md:pl-6 grid grid-cols-2 gap-4 content-center">
            <div>
              <p className="eyebrow">Modelo elegido</p>
              <p className="mt-1 text-xl font-semibold">Random Forest</p>
              <p className="text-xs text-muted-foreground">Uno para cada mes</p>
            </div>
            <div>
              <p className="eyebrow">En abril</p>
              <p className="mt-1 text-xl font-semibold num">100 %</p>
              <p className="text-xs text-muted-foreground">de los casos detectados, con muy pocas falsas alarmas</p>
            </div>
            <div>
              <p className="eyebrow">Autor</p>
              <p className="mt-1 text-sm font-medium">{proyecto.autor}</p>
            </div>
            <div>
              <p className="eyebrow">Asesora</p>
              <p className="mt-1 text-sm font-medium">{proyecto.asesora}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Estudiantes analizados" value={datos.estudiantesFinal.toLocaleString('es-GT')} sub={`Pensamiento Cuantitativo, ${datos.periodo}`} icon={Users} />
        <Stat label="Reprobaron" value={`${datos.tasaReprobacion} %`} sub="Aproximadamente 1 de cada 7" icon={TrendingDown} tone="warn" />
        <Stat label="Modelos entrenados" value="40" sub="Para comparar y elegir el mejor" icon={Layers} />
        <Stat label="Calificaciones revisadas" value={datos.filasActividades.toLocaleString('es-GT')} sub="Tareas, parciales y entregas en Canvas" icon={BookOpen} />
      </div>
    </section>
  )
}

const graduacionHatfield = [
  { grupo: 'Hombres blancos', sin: 0.48, con: 0.33 },
  { grupo: 'Mujeres afroamericanas', sin: 0.28, con: 0.15 },
]

export function ProblemaScene() {
  const { p, axis, grid, tooltip } = useChartStyle()
  const data = graduacionHatfield.flatMap((g) => [
    { k: `${g.grupo} · sin nota baja`, v: g.sin * 100, c: p['chart-5'] },
    { k: `${g.grupo} · con nota baja`, v: g.con * 100, c: p.bad },
  ])
  return (
    <section className="space-y-6">
      <SceneHeader
        eyebrow="El problema"
        title="Reprobar un curso clave cuesta más que una nota"
        intro="El estudiante se atrasa en su carrera, pierde tiempo y muchas veces pierde motivación. Varios estudios relacionan reprobar estos cursos con abandonar la universidad."
      />

      <div className="grid md:grid-cols-3 gap-4">
        <Card tone="accent" className="md:col-span-1">
          <CardHead icon={GraduationCap} title="Pensamiento Cuantitativo" hint="Un curso clave: da las bases de la carrera y abre paso a los cursos siguientes." />
          <ul className="p-5 pt-3 space-y-2.5 text-sm">
            <li className="flex gap-2"><span className="text-accent">▸</span> Primer curso de matemática en varias ingenierías.</li>
            <li className="flex gap-2"><span className="text-accent">▸</span> Hay que aprobarlo para llevar Cálculo 1.</li>
            <li className="flex gap-2"><span className="text-accent">▸</span> Introduce las funciones y la trigonometría.</li>
          </ul>
        </Card>
        <Card className="md:col-span-2">
          <CardHead icon={AlertTriangle} title="Una nota baja en un curso clave reduce la probabilidad de graduarse" hint="Estudio con 110,000 estudiantes de carreras de ciencia e ingeniería en Estados Unidos (Hatfield et al., 2022)." />
          <div className="h-56 px-2 pb-3 pt-2">
            <ResponsiveContainer>
              <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40 }}>
                <CartesianGrid {...grid} horizontal={false} vertical />
                <XAxis type="number" domain={[0, 60]} unit=" %" {...axis} />
                <YAxis type="category" dataKey="k" width={200} {...axis} />
                <Tooltip {...tooltip} formatter={(v: number) => [`${v.toFixed(0)} %`, 'Se gradúa']} />
                <Bar dataKey="v" radius={[0, 4, 4, 0]} barSize={18}>
                  {data.map((d) => <Cell key={d.k} fill={d.c} />)}
                  <LabelList dataKey="v" position="right" formatter={(v: number) => `${v.toFixed(0)} %`} style={{ fill: p.foreground, fontSize: 11 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Precálculo (Estados Unidos)" value="> 60 %" sub="de quienes tuvieron una nota baja no se graduó (Adaricheva et al., 2025)" tone="bad" icon={TrendingDown} />
        <Stat label="Apoyo a tiempo" value="Funciona" sub="Tutorías, acompañamiento psicológico y meditación mejoran el rendimiento" tone="good" icon={CalendarClock} />
        <Stat label="En la UVG" value="Cálculo 1" sub="En 2024 ya se usaron modelos similares para detectar el riesgo en otro curso clave" tone="primary" icon={BookOpen} />
      </div>

      <Card>
        <div className="p-5 grid md:grid-cols-[auto_1fr] gap-4 items-center">
          <div className="rounded-md border border-border/60 bg-muted/40 p-3 text-primary w-fit"><Scale size={22} aria-hidden="true" /></div>
          <div className="space-y-1">
            <p className="eyebrow">La pregunta de la investigación</p>
            <p className="text-base md:text-lg font-medium max-w-3xl">Para dar apoyo a tiempo, primero hay que saber <span className="text-primary">quién lo necesita, y saberlo pronto</span>. ¿Puede un modelo identificar desde los primeros meses a los estudiantes en riesgo de reprobar?</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
