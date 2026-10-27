// Datos tomados del documento de tesis (metodología, resultados, discusión y conclusiones).

export const proyecto = {
  titulo: 'Detección temprana del riesgo de reprobación en Pensamiento Cuantitativo',
  subtitulo: 'Modelos de aprendizaje automático supervisado con datos institucionales de la UVG (2019–2022)',
  autor: 'Pedro Pablo Guzmán Mayen',
  asesora: 'Ing. Lynette García Pérez',
  universidad: 'Universidad del Valle de Guatemala',
  carrera: 'Ingeniería en Ciencia de la Computación y Tecnologías de la Información',
}

export const meses = ['Enero', 'Febrero', 'Marzo', 'Abril'] as const
export type Mes = (typeof meses)[number]

// ---------- Conjunto de datos ----------
export const datos = {
  periodo: '2019–2022',
  filasRegistro: 2720,
  filasActividades: 61934,
  estudiantesFinal: 2325,
  mujeres: 848,
  hombres: 1477,
  tasaReprobacion: 13.5,
  tasaAprobacion: 86.5,
  variablesConstruidas: 40,
}

export const limpieza = [
  { paso: 'Formatos corregidos', detalle: 'Notas, puntajes y fechas guardados como texto se convirtieron al formato correcto.' },
  { paso: 'Valores imposibles', detalle: 'Había puntajes de la PAA de hasta 2,700 cuando la escala llega a 1,600. Se reemplazaron por el valor típico.' },
  { paso: 'Textos uniformes', detalle: 'Nombres de colegios, títulos y actividades se escribieron de la misma forma para poder compararlos.' },
  { paso: 'Registros repetidos', detalle: 'Se dejó una sola fila por estudiante y actividad, y se reconstruyeron los intentos anteriores de quienes repitieron el curso.' },
  { paso: 'Datos faltantes', detalle: 'Se excluyeron registros casi vacíos (incluido un estudiante de prueba de Canvas) y retiros. Las PAA faltantes se completaron con el valor típico.' },
  { paso: 'Actividades incompletas', detalle: 'Se estimó la nota de las actividades faltantes para que la suma coincidiera con la nota final registrada.' },
  { paso: 'Categorías pequeñas', detalle: 'Colegios y títulos con menos de 10 estudiantes se agruparon como "Otro".' },
]

export const excluidos = [
  { motivo: 'Registros sin información', n: 318 },
  { motivo: 'Retirados', n: 111 },
  { motivo: 'Convalidado', n: 1 },
]

// ---------- Metodología ----------
export const fases = [
  { n: 1, nombre: 'Limpieza de datos', resumen: 'Revisar que la información estuviera completa, sin repetidos ni errores.' },
  { n: 2, nombre: 'Creación de variables', resumen: 'Convertir las calificaciones en indicadores útiles, como el porcentaje acumulado de cada mes.' },
  { n: 3, nombre: 'Análisis exploratorio', resumen: 'Buscar qué datos realmente distinguen a quienes aprueban de quienes reprueban.' },
  { n: 4, nombre: 'Desarrollo de modelos', resumen: 'Entrenar 40 modelos: 5 algoritmos, para cada mes y con dos enfoques.' },
  { n: 5, nombre: 'Evaluación de modelos', resumen: 'Medir cuántos casos detecta cada modelo y cuántas falsas alarmas genera.' },
  { n: 6, nombre: 'Prueba de concepto', resumen: 'Construir una herramienta web para usar el mejor modelo.' },
]

export const division = [
  { conjunto: 'Entrenamiento', pct: 70, uso: 'Con estos datos los modelos aprenden los patrones.' },
  { conjunto: 'Validación', pct: 15, uso: 'Sirven para ajustar cada modelo y decidir a partir de qué punto se considera que hay riesgo.' },
  { conjunto: 'Prueba', pct: 15, uso: 'Datos que el modelo nunca vio, para medir qué tan bien detecta el riesgo.' },
]

export const variablesPorMes: Array<{ variable: string; meses: [boolean, boolean, boolean, boolean] }> = [
  { variable: 'Puntaje PAA', meses: [true, true, true, true] },
  { variable: 'Título de nivel medio', meses: [true, true, true, true] },
  { variable: 'Colegio de procedencia', meses: [true, true, true, true] },
  { variable: 'Número de intento', meses: [true, true, true, true] },
  { variable: '% acumulado en actividades', meses: [true, true, true, true] },
  { variable: 'Notas de parciales hasta el mes', meses: [false, true, true, true] },
]

export const tecnologias = ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Optuna', 'Gradio', 'Hugging Face']

export const algoritmos = [
  { t: 'Árbol de decisión', d: 'Hace preguntas sencillas sobre los datos, como "¿su porcentaje acumulado es menor a 70 %?", hasta llegar a una respuesta.' },
  { t: 'Random Forest', d: 'Combina cientos de árboles de decisión y se queda con la respuesta en la que coinciden la mayoría.' },
  { t: 'XGBoost y LightGBM', d: 'También combinan árboles, pero cada árbol nuevo aprende de los errores de los anteriores.' },
  { t: 'Regresión logística y lineal', d: 'Modelos más simples que sirven como punto de comparación.' },
]

// ---------- Variables ----------
export const gruposVariables = [
  {
    grupo: 'Rendimiento en el curso',
    items: ['Porcentaje acumulado en actividades al final de cada mes', 'Nota del parcial de cada mes', 'Cambio de un mes a otro', 'Comparación con el resto de la sección'],
  },
  {
    grupo: 'Comportamiento en Canvas',
    items: ['Entregas tardías', 'Cantidad de comentarios', 'Días que tardaban en calificar las tareas'],
  },
  {
    grupo: 'Contexto del curso',
    items: ['Modalidad: virtual (pandemia) o presencial'],
  },
]

export const seleccion = [
  { variable: 'Porcentaje acumulado en actividades', decision: true, motivo: 'Es muy distinto entre quienes aprueban y quienes reprueban.' },
  { variable: 'Notas en los parciales', decision: true, motivo: 'Es muy distinto entre quienes aprueban y quienes reprueban.' },
  { variable: 'Número de intento', decision: true, motivo: 'Quienes repiten el curso reprueban mucho más.' },
  { variable: 'Puntaje en la PAA', decision: true, motivo: 'Quienes aprueban suelen tener un puntaje más alto.' },
  { variable: 'Colegio', decision: true, motivo: 'Tiene una relación moderada con aprobar o reprobar.' },
  { variable: 'Título de nivel medio', decision: true, motivo: 'Tiene una relación moderada; se conservó para medir su efecto.' },
  { variable: 'Comparación con la sección', decision: false, motivo: 'Repetía la misma información que el porcentaje acumulado y las notas.' },
  { variable: 'Cambio de un mes a otro', decision: false, motivo: 'Casi no se relaciona con el resultado final.' },
  { variable: 'Entregas tardías', decision: false, motivo: 'Aprobados y reprobados entregan tarde por igual.' },
  { variable: 'Cantidad de comentarios', decision: false, motivo: 'No hay diferencia entre aprobados y reprobados.' },
  { variable: 'Días para calificar', decision: false, motivo: 'La diferencia es mínima.' },
  { variable: 'Modalidad y año', decision: false, motivo: 'Reflejan la pandemia, una situación que no se repetirá.' },
  { variable: 'Género', decision: false, motivo: 'La diferencia es pequeña y la relación es débil.' },
]

// ---------- Hallazgos del análisis exploratorio ----------
export const reprobacionPorIntento = [
  { intento: '1.er intento', tasa: 5.3, n: 2083 },
  { intento: '2.º intento', tasa: 83.0, n: 224 },
  { intento: '3 o más', tasa: 100, n: 18 },
]

// Cuartiles de la nota final por intento (Figura 6.2)
export const notaPorIntento = [
  { intento: '1', q1: 70, mediana: 80, q3: 85 },
  { intento: '2', q1: 40, mediana: 52, q3: 58 },
  { intento: '3', q1: 22, mediana: 30, q3: 35 },
  { intento: '4', q1: 45, mediana: 55, q3: 57 },
]

export const reprobacionPorGenero = [
  { genero: 'Femenino', tasa: 10.8, reprobados: 92, total: 848 },
  { genero: 'Masculino', tasa: 15.1, reprobados: 223, total: 1477 },
]

// Medianas aproximadas por clase (boxplots de la metodología)
export const acumuladoPorMes = [
  { mes: 'Ene', aprobado: 91, reprobado: 60 },
  { mes: 'Feb', aprobado: 85, reprobado: 54 },
  { mes: 'Mar', aprobado: 85, reprobado: 53 },
  { mes: 'Abr', aprobado: 85, reprobado: 52 },
  { mes: 'May', aprobado: 85, reprobado: 51 },
]

export const parcialesPorClase = { aprobado: { q1: 66, mediana: 80, q3: 90 }, reprobado: { q1: 17, mediana: 33, q3: 45 } }
export const paaPorClase = { aprobado: { q1: 1180, mediana: 1234, q3: 1350 }, reprobado: { q1: 1050, mediana: 1130, q3: 1234 } }

// ---------- Resultados: clasificación (Tabla 6.1) ----------
export const modelos = ['Random Forest', 'XGBoost', 'LightGBM', 'Árbol de decisión', 'Regresión logística'] as const
export const modelosReg = ['Random Forest', 'XGBoost', 'LightGBM', 'Árbol de decisión', 'Regresión lineal'] as const

type FilaClf = { modelo: string; mes: Mes; umbral: number; sens: number; prec: number; f2: number; prauc: number }
export const clasificacion: FilaClf[] = [
  { modelo: 'Random Forest', mes: 'Enero', umbral: 0.209, sens: 0.896, prec: 0.705, f2: 0.85, prauc: 0.842 },
  { modelo: 'XGBoost', mes: 'Enero', umbral: 0.188, sens: 0.896, prec: 0.717, f2: 0.853, prauc: 0.832 },
  { modelo: 'LightGBM', mes: 'Enero', umbral: 0.131, sens: 0.896, prec: 0.683, f2: 0.843, prauc: 0.849 },
  { modelo: 'Árbol de decisión', mes: 'Enero', umbral: 0.255, sens: 0.896, prec: 0.694, f2: 0.846, prauc: 0.764 },
  { modelo: 'Regresión logística', mes: 'Enero', umbral: 0.464, sens: 0.729, prec: 0.854, f2: 0.751, prauc: 0.85 },
  { modelo: 'Random Forest', mes: 'Febrero', umbral: 0.234, sens: 0.917, prec: 0.815, f2: 0.894, prauc: 0.951 },
  { modelo: 'XGBoost', mes: 'Febrero', umbral: 0.136, sens: 0.979, prec: 0.758, f2: 0.925, prauc: 0.951 },
  { modelo: 'LightGBM', mes: 'Febrero', umbral: 0.192, sens: 0.958, prec: 0.807, f2: 0.924, prauc: 0.958 },
  { modelo: 'Árbol de decisión', mes: 'Febrero', umbral: 0.2, sens: 0.979, prec: 0.681, f2: 0.9, prauc: 0.906 },
  { modelo: 'Regresión logística', mes: 'Febrero', umbral: 0.258, sens: 0.979, prec: 0.691, f2: 0.904, prauc: 0.942 },
  { modelo: 'Random Forest', mes: 'Marzo', umbral: 0.222, sens: 1.0, prec: 0.814, f2: 0.956, prauc: 0.978 },
  { modelo: 'XGBoost', mes: 'Marzo', umbral: 0.137, sens: 1.0, prec: 0.727, f2: 0.93, prauc: 0.984 },
  { modelo: 'LightGBM', mes: 'Marzo', umbral: 0.338, sens: 0.958, prec: 0.852, f2: 0.935, prauc: 0.974 },
  { modelo: 'Árbol de decisión', mes: 'Marzo', umbral: 0.075, sens: 1.0, prec: 0.615, f2: 0.889, prauc: 0.967 },
  { modelo: 'Regresión logística', mes: 'Marzo', umbral: 0.277, sens: 1.0, prec: 0.814, f2: 0.956, prauc: 0.974 },
  { modelo: 'Random Forest', mes: 'Abril', umbral: 0.422, sens: 1.0, prec: 0.96, f2: 0.992, prauc: 0.987 },
  { modelo: 'XGBoost', mes: 'Abril', umbral: 0.303, sens: 0.979, prec: 0.959, f2: 0.975, prauc: 0.981 },
  { modelo: 'LightGBM', mes: 'Abril', umbral: 0.345, sens: 0.979, prec: 0.94, f2: 0.971, prauc: 0.986 },
  { modelo: 'Árbol de decisión', mes: 'Abril', umbral: 0.8, sens: 0.979, prec: 0.94, f2: 0.971, prauc: 0.993 },
  { modelo: 'Regresión logística', mes: 'Abril', umbral: 0.392, sens: 0.979, prec: 0.94, f2: 0.971, prauc: 0.985 },
]

// Tabla 6.2
export const promediosClf = [
  { modelo: 'Random Forest', sens: 0.953, prec: 0.824, f2: 0.923, prauc: 0.94 },
  { modelo: 'XGBoost', sens: 0.964, prec: 0.79, f2: 0.921, prauc: 0.937 },
  { modelo: 'LightGBM', sens: 0.948, prec: 0.821, f2: 0.918, prauc: 0.942 },
  { modelo: 'Árbol de decisión', sens: 0.964, prec: 0.733, f2: 0.902, prauc: 0.908 },
  { modelo: 'Regresión logística', sens: 0.922, prec: 0.825, f2: 0.896, prauc: 0.938 },
]

// ---------- Resultados: regresión (Tabla 6.3 y 6.4) ----------
type FilaReg = { modelo: string; mes: Mes; rmse: number; mae: number; r: number }
export const regresion: FilaReg[] = [
  { modelo: 'Random Forest', mes: 'Enero', rmse: 14.543, mae: 9.951, r: 0.782 },
  { modelo: 'XGBoost', mes: 'Enero', rmse: 14.477, mae: 10.736, r: 0.778 },
  { modelo: 'LightGBM', mes: 'Enero', rmse: 14.714, mae: 10.714, r: 0.772 },
  { modelo: 'Árbol de decisión', mes: 'Enero', rmse: 15.229, mae: 10.509, r: 0.758 },
  { modelo: 'Regresión lineal', mes: 'Enero', rmse: 14.856, mae: 11.545, r: 0.766 },
  { modelo: 'Random Forest', mes: 'Febrero', rmse: 9.942, mae: 7.515, r: 0.909 },
  { modelo: 'XGBoost', mes: 'Febrero', rmse: 9.387, mae: 7.21, r: 0.914 },
  { modelo: 'LightGBM', mes: 'Febrero', rmse: 9.597, mae: 7.463, r: 0.911 },
  { modelo: 'Árbol de decisión', mes: 'Febrero', rmse: 13.098, mae: 9.256, r: 0.828 },
  { modelo: 'Regresión lineal', mes: 'Febrero', rmse: 8.958, mae: 6.743, r: 0.922 },
  { modelo: 'Random Forest', mes: 'Marzo', rmse: 7.932, mae: 6.134, r: 0.94 },
  { modelo: 'XGBoost', mes: 'Marzo', rmse: 7.537, mae: 5.603, r: 0.945 },
  { modelo: 'LightGBM', mes: 'Marzo', rmse: 7.783, mae: 5.969, r: 0.941 },
  { modelo: 'Árbol de decisión', mes: 'Marzo', rmse: 8.625, mae: 6.415, r: 0.928 },
  { modelo: 'Regresión lineal', mes: 'Marzo', rmse: 6.97, mae: 5.388, r: 0.953 },
  { modelo: 'Random Forest', mes: 'Abril', rmse: 4.836, mae: 3.551, r: 0.983 },
  { modelo: 'XGBoost', mes: 'Abril', rmse: 4.327, mae: 3.184, r: 0.984 },
  { modelo: 'LightGBM', mes: 'Abril', rmse: 4.655, mae: 3.412, r: 0.982 },
  { modelo: 'Árbol de decisión', mes: 'Abril', rmse: 7.721, mae: 5.93, r: 0.949 },
  { modelo: 'Regresión lineal', mes: 'Abril', rmse: 4.076, mae: 3.015, r: 0.985 },
]

export const promediosReg = [
  { modelo: 'Random Forest', rmse: 9.313, mae: 6.788, r: 0.904 },
  { modelo: 'XGBoost', rmse: 8.932, mae: 6.683, r: 0.905 },
  { modelo: 'LightGBM', rmse: 9.187, mae: 6.89, r: 0.902 },
  { modelo: 'Árbol de decisión', rmse: 11.168, mae: 8.028, r: 0.866 },
  { modelo: 'Regresión lineal', rmse: 8.715, mae: 6.673, r: 0.907 },
]

// ---------- Importancia de variables (Figuras 6.6–6.15) ----------
// Valores normalizados leídos de las gráficas de la tesis (aproximados a dos decimales).
// Orden: [intentos, % acumulado, examen del mes, exámenes previos, PAA, colegio, título]
export const variablesImp = ['Número de intento', '% acumulado en actividades', 'Parcial del mes', 'Parciales anteriores', 'Puntaje PAA', 'Colegio', 'Título de nivel medio'] as const

type Imp = Record<string, number[][]>
export const importanciaClf: Imp = {
  'Random Forest': [[0.57, 0.31, 0, 0, 0.06, 0.04, 0.02], [0.37, 0.45, 0.13, 0, 0.02, 0.015, 0.015], [0.21, 0.36, 0.21, 0.15, 0.04, 0.02, 0.01], [0.19, 0.37, 0.26, 0.17, 0.01, 0, 0]],
  XGBoost: [[0.84, 0.1, 0, 0, 0.02, 0.02, 0.01], [0.57, 0.18, 0.09, 0, 0.05, 0.05, 0.05], [0.6, 0.16, 0.08, 0.06, 0.04, 0.03, 0.03], [0.29, 0.44, 0.19, 0.09, 0, 0, 0]],
  LightGBM: [[0.55, 0.33, 0, 0, 0.07, 0.04, 0.01], [0.32, 0.43, 0.23, 0, 0.01, 0.01, 0.01], [0.18, 0.62, 0.08, 0.1, 0.02, 0.01, 0.01], [0.15, 0.48, 0.31, 0.07, 0, 0, 0]],
  'Árbol de decisión': [[0.65, 0.3, 0, 0, 0.02, 0.02, 0.01], [0.55, 0.34, 0.1, 0, 0.005, 0, 0.005], [0.25, 0.64, 0, 0.1, 0, 0, 0], [0.11, 0.57, 0.28, 0.04, 0, 0, 0]],
  'Regresión logística': [[0.43, 0.39, 0, 0, 0.1, 0.06, 0.03], [0.42, 0.47, 0.11, 0, 0, 0, 0], [0.38, 0.44, 0.06, 0.13, 0, 0, 0], [0.18, 0.38, 0.24, 0.2, 0, 0, 0]],
}
export const importanciaReg: Imp = {
  'Random Forest': [[0.16, 0.48, 0, 0, 0.17, 0.12, 0.08], [0.1, 0.43, 0.29, 0, 0.08, 0.06, 0.05], [0.02, 0.75, 0.08, 0.12, 0.01, 0.01, 0.01], [0.02, 0.43, 0.25, 0.29, 0, 0, 0]],
  XGBoost: [[0.24, 0.47, 0, 0, 0.11, 0.1, 0.07], [0.05, 0.62, 0.23, 0, 0.04, 0.04, 0.03], [0.05, 0.57, 0.2, 0.12, 0.03, 0.02, 0.02], [0.04, 0.5, 0.29, 0.14, 0.01, 0.01, 0.01]],
  LightGBM: [[0.14, 0.65, 0, 0, 0.1, 0.09, 0.03], [0.01, 0.75, 0.21, 0, 0.01, 0.01, 0.01], [0, 0.75, 0.12, 0.12, 0, 0, 0], [0, 0.77, 0.15, 0.08, 0, 0, 0]],
  'Árbol de decisión': [[0.38, 0.52, 0, 0, 0.06, 0.03, 0.01], [0.07, 0.77, 0.14, 0, 0.01, 0, 0.01], [0.01, 0.82, 0.02, 0.14, 0.01, 0, 0], [0, 0.85, 0.15, 0, 0, 0, 0]],
  'Regresión lineal': [[0.12, 0.47, 0, 0, 0.21, 0.14, 0.05], [0.01, 0.52, 0.36, 0, 0.02, 0.05, 0.03], [0, 0.52, 0.16, 0.25, 0.04, 0, 0.02], [0, 0.49, 0.22, 0.26, 0, 0, 0.01]],
}

// Reprobados en el conjunto de prueba (15 % de los datos). Se deduce de la sensibilidad: 0.896 = 43/48.
export const reprobadosPrueba = 48

// ---------- Cierre ----------
export const conclusiones = [
  'Se desarrolló un modelo de aprendizaje automático que identifica a tiempo a los estudiantes en riesgo de reprobar Pensamiento Cuantitativo. Desde el primer mes detectó al menos al 89.6 % de quienes reprobaron.',
  'Se construyeron modelos con cinco algoritmos distintos, uno para cada mes del semestre, tanto para predecir si un estudiante aprueba como para estimar su nota final.',
  'Una limpieza cuidadosa de los datos garantizó que los modelos aprendieran de información confiable.',
  'Quienes reprueban suelen tener bajo rendimiento en actividades y parciales, menor puntaje en la PAA y más intentos del curso.',
  'Random Forest fue el mejor modelo: detectó más del 89.6 % de los casos en todos los meses y generó pocas falsas alarmas.',
  'Estimar la nota exacta es poco confiable en los primeros meses (error de más de 10 puntos), pero sirve como apoyo al modelo principal.',
  'Se construyó una herramienta web que usa el modelo, muestra sus resultados y permite descargarlos.',
]

export const recomendaciones = [
  { titulo: 'Más información del estudiante', texto: 'Agregar datos socioeconómicos y demográficos, con las autorizaciones necesarias y cuidando que el modelo no tenga sesgos.' },
  { titulo: 'Datos recientes', texto: 'Probar los modelos con semestres más recientes para confirmar que siguen funcionando igual de bien.' },
  { titulo: 'Uso real', texto: 'Analizar si es viable integrar los modelos para que los use el personal docente.' },
  { titulo: 'Otros cursos clave', texto: 'Repetir el proceso en Física, Programación Básica, Álgebra Lineal, Ecuaciones Diferenciales o Química.' },
  { titulo: 'Efecto de las tutorías', texto: 'Medir cómo influyen las tutorías de la Universidad en el rendimiento.' },
  { titulo: 'Inteligencia artificial', texto: 'Explorar si las herramientas de IA de la Universidad pueden personalizar el aprendizaje.' },
  { titulo: 'Un modelo por departamento', texto: 'Evaluar si los cursos de primer año de Matemática siguen los mismos patrones y pueden usar un solo modelo.' },
  { titulo: 'Interacción en Canvas', texto: 'Usar años recientes para entender mejor los tiempos de entrega y el uso de la plataforma.' },
]
