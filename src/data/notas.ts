// Notas del presentador: lo que se dice en cada diapositiva. Se muestran con la tecla N.
export const notas: Record<string, string[]> = {
  inicio: [
    'Presentarse y presentar a la asesora.',
    'Tema: modelos de aprendizaje automático para detectar a tiempo el riesgo de reprobar Pensamiento Cuantitativo en la UVG.',
  ],
  problema: [
    'Reprobar retrasa al estudiante en su plan de estudios, le hace perder tiempo y muchas veces motivación.',
    'Varios estudios relacionan reprobar cursos clave con la deserción universitaria.',
    'Adaricheva et al. (2025): en una universidad de EE. UU., más del 60 % de quienes sacaron menos de C- en Precálculo no se graduó.',
    'Hatfield et al. (2022), 110,000 estudiantes: una sola nota baja en un curso clave reduce la probabilidad de graduarse (de 48 % a 33 % en el grupo mayoritario).',
  ],
  pregunta: [
    'Un curso clave da las bases de la carrera y es prerrequisito de los cursos siguientes.',
    'Pensamiento Cuantitativo es el curso introductorio de matemática en varias ingenierías, prerrequisito de Cálculo 1, e introduce funciones y funciones trigonométricas.',
    'Tutorías, acompañamiento psicológico o meditación mejoran el rendimiento, pero primero hay que identificar con precisión y anticipación a quién ayudar.',
    'En 2024 un estudiante de la UVG ya aplicó modelos similares en Cálculo 1 (Pineda, 2024).',
  ],
  datos: [
    'Datos proporcionados por la Ing. Lynette García Pérez.',
    'Tabla de estudiantes (2,720 filas): PAA, colegio, título de nivel medio, género, número de intento, nota final y estado.',
    'Tabla de actividades (61,934 filas): nombre, sección, notas, puntos posibles, fechas de entrega y calificación, tipo de entrega y comentarios.',
    'Excel de actividades por año: nombre de cada actividad y sus puntos posibles.',
    'El carné se reemplazó por un código anónimo y se eliminaron los nombres.',
  ],
  fases: [
    'Organicé el proyecto en seis fases basadas en CRISP-DM, adaptadas a la investigación.',
    'CRISP-DM permite regresar a una fase anterior cuando aparece algo nuevo. Kanban organizó las tareas de cada fase.',
  ],
  limpieza: [
    'Verifiqué que no hubiera valores faltantes, duplicados ni inconsistencias, y que las actividades coincidieran con la estructura del curso.',
    'Se excluyeron 318 registros sin información (incluido el "estudiante de prueba" de Canvas) y 112 retiros o convalidaciones. Las PAA faltantes se completaron con la mediana.',
    'Solo alrededor del 13.5 % reprobó: clases desbalanceadas, algo que tomé en cuenta en todo el proyecto.',
  ],
  variables: [
    'Me basé en investigaciones previas y en mi experiencia con problemas similares, como la detección de fraude.',
    'Rendimiento: porcentaje acumulado en actividades y nota de los exámenes de cada mes, su cambio de un mes a otro y su comparación con la sección.',
    'Comportamiento en el LMS: entregas tardías, cantidad de comentarios y velocidad de calificación.',
    'Contexto: modalidad virtual o presencial, por los años de pandemia.',
  ],
  exploratorio: [
    'Evalué tanto las variables construidas como las originales (género, colegio, título) para ver cuáles distinguían a quienes aprobaban de quienes reprobaban.',
    'Se conservaron las variables de rendimiento, el número de intento, la PAA, el colegio y el título de nivel medio.',
    'Se usó solo el 70 % de entrenamiento para no filtrar información de la evaluación.',
  ],
  modelos: [
    'Dos enfoques: clasificación (¿aprueba o reprueba?) y regresión (¿qué nota final sacará?). Quería saber cuál era más adecuado para detectar el riesgo.',
    'Cinco algoritmos: Random Forest, LightGBM, XGBoost, Árbol de Decisión y Regresión Logística o Lineal.',
    'Un modelo para cada mes, de enero a abril. Cada uno usa solo la información disponible hasta ese mes, igual que en la práctica.',
    'En enero no hay parciales: solo perfil del estudiante y porcentaje acumulado.',
  ],
  entrenamiento: [
    '70 % para entrenar, 15 % de validación para ajustar la configuración, 15 % de prueba con datos que el modelo nunca vio.',
    'Se probaron 1,000 configuraciones de cada modelo.',
    'Como el objetivo es no dejar pasar a ningún estudiante en riesgo, prioricé detectar a quienes reprueban. Pero priorizar solo eso genera muchas falsas alarmas.',
    'Por eso el punto de riesgo se definió con una métrica que balancea casos detectados y falsas alarmas, con más peso en detectar (F2).',
  ],
  hallazgos: [
    'Solo el 5.3 % reprobó en su primer intento, pero el 83 % de quienes lo llevaron por segunda vez reprobó, y el 100 % de quienes lo intentaron 3 veces o más.',
    'Repetir el curso no mejora el rendimiento. Coincide con Pineda (2024) en Cálculo 1: el patrón se repite en varios cursos del Departamento de Matemática.',
    'Las notas en parciales y la PAA también separan claramente a ambos grupos.',
  ],
  comparacion: [
    'Resultados sobre el conjunto de prueba, con estudiantes que los modelos nunca vieron: 48 de ellos reprobaron.',
    'Todos los modelos mejoran conforme avanza el semestre y tienen más información.',
    'En enero detectan entre 72.9 % y 89.6 % de los casos; en abril, entre 97.9 % y 100 %.',
    'Cambiar a "Falsas alarmas": también bajan con los meses. El Árbol de decisión es el que más genera en febrero y marzo.',
  ],
  'comparacion-nota': [
    'Segundo enfoque: estimar la nota final.',
    'En enero todos los modelos se equivocan entre 14 y 15 puntos; en abril, entre 4 y 8.',
    'El Árbol de decisión es el que más se equivoca. La regresión lineal tiene el menor error promedio.',
  ],
  regresion: [
    'La mejor regresión fue la lineal. Al final del semestre estima la nota con bastante precisión.',
    'En los primeros meses su error ronda entre 10 y 15 puntos: elevado, porque muchos estudiantes están en el límite de aprobar.',
    'Por eso se descartó como modelo principal, pero sugiero usarla como complemento: alguien marcado sin riesgo pero con nota estimada baja merece seguimiento.',
  ],
  importancia: [
    'Promedio de los cinco modelos de clasificación: todos siguen el mismo patrón.',
    'En los primeros meses el modelo le da más importancia al número de intento que al porcentaje acumulado.',
    'Con el paso de los meses importan más las notas de los parciales y el porcentaje acumulado.',
    'El número de intento tiene gran capacidad predictiva en los primeros meses.',
  ],
  herramienta: [
    'Interfaz en Gradio desplegada en Hugging Face Spaces.',
    'Se suben dos .csv (información general y notas de actividades), se elige el mes y muestra la probabilidad de reprobar de cada estudiante.',
    'Las predicciones se exportan en .csv.',
  ],
  discusion: [
    'El mejor modelo de clasificación fue Random Forest: no tiene la mayor sensibilidad, pero sí el mejor balance entre casos detectados y falsas alarmas.',
    'XGBoost y el Árbol detectan un poco más, pero con más falsas alarmas. La Regresión Logística casi no da falsas alarmas, pero en enero solo detecta el 72.9 %, y enero es el mes más importante.',
    'Me quedé con Random Forest y el enfoque de clasificación porque detecta más casos de reprobación. La regresión queda como complemento.',
    'Las métricas son del conjunto de prueba: no hay señales de sobreajuste.',
    'Coincide con Pineda (2024): repetir el curso no mejora el rendimiento.',
    'Limitaciones: en 2019 las entregas eran en papel y Canvas casi no se usaba (unos 400 estudiantes); faltaban puntajes PAA; no había variables demográficas.',
  ],
  casos: [
    'Así se ve Random Forest con los 48 estudiantes que reprobaron en el conjunto de prueba.',
    'Detecta 43 de 48 desde enero, y todos desde marzo.',
    'Las falsas alarmas bajan con los meses: en abril solo 2.',
  ],
  conclusiones: [
    'El modelo detecta al menos el 89.6 % de los reprobados desde el primer mes.',
    'Recomiendo analizar la viabilidad de usar estos modelos en un entorno real y verificar si con datos recientes mantienen su capacidad predictiva.',
    'Otras recomendaciones: más variables, otros cursos clave, efecto de las tutorías.',
    'Cerrar agradeciendo y abrir preguntas.',
  ],
}
