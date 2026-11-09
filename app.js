/**
 * GUÍA RÁPIDA UP — ENCUENTRA EL CANAL CORRECTO
 * Aplicación oficial interactiva de canales institucionales para estudiantes UP (2026-II)
 * Arquitectura Interactiva en Pantalla Única: Cero páginas separadas, botones interactivos por niveles.
 * Mínimo texto visible a primera vista, 100% de la información oficial al hacer clic.
 */

const { useState, useMemo, useEffect } = React;

/* ==========================================================================
   SISTEMA DE ICONOS VECTORIALES
   ========================================================================== */
function Icon({ name, className = "w-4 h-4", ...props }) {
  const icons = {
    search: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
    'arrow-right': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    ),
    'chevron-right': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    ),
    'chevron-down': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    ),
    'external-link': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    ),
    mail: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    copy: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    ),
    check: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    ),
    x: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    ),
    phone: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    'map-pin': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    clock: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    calendar: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    info: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    edit: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    ),
    send: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    ),
    sparkles: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    )
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {icons[name] || icons.info}
    </svg>
  );
}

/* ==========================================================================
   BASE DE DATOS COMPLETA E INTACTA (VERBATIM DE LA GUÍA OFICIAL UP)
   ========================================================================== */

// 1. Buscador Rápido (15 filas de consulta rápida)
const BUSCADOR_RAPIDO = [
  {
    id: "br-1",
    duda: "Matrícula, reserva de matrícula, retiro de curso o de semestre",
    canal: "DAAR",
    dot: "bg-blue-600",
    correo: "pregrado@up.edu.pe",
    enlace: "https://daar.up.edu.pe/matricula",
    enlaceTexto: "daar.up.edu.pe/matricula",
    categoria: "Trámites Curriculares",
    detalle: "Gestión directa con DAAR para retiros de cursos, reserva de matrícula y trámite regular de matrícula semestral.",
    seccion: "daar",
    subCat: "durante-semestre"
  },
  {
    id: "br-2",
    duda: "Reprogramar un examen, reclamos de notas, devolución de exámenes",
    canal: "DAAR",
    dot: "bg-blue-600",
    correo: "pregrado@up.edu.pe",
    enlace: "https://daar.up.edu.pe",
    enlaceTexto: "daar.up.edu.pe",
    categoria: "Evaluaciones y Calificaciones",
    detalle: "Reprogramación de exámenes parciales, finales, reclamos de pruebas o devolución formal de pruebas corregidas.",
    seccion: "daar",
    subCat: "examenes-notas"
  },
  {
    id: "br-3",
    duda: "Traslado interno, agregar carrera, examen de suficiencia de idioma",
    canal: "DAAR",
    dot: "bg-blue-600",
    correo: "pregrado@up.edu.pe",
    enlace: "https://daar.up.edu.pe",
    enlaceTexto: "daar.up.edu.pe",
    categoria: "Régimen Académico",
    detalle: "Cambios de especialidad interna, doble titulación/carrera simultánea y acreditación de suficiencia del idioma extranjero.",
    seccion: "daar",
    subCat: "durante-semestre"
  },
  {
    id: "br-4",
    duda: "Sumillas, requisitos, equivalencias, Sello UP, concentraciones",
    canal: "DAAR",
    dot: "bg-blue-600",
    correo: "pregrado@up.edu.pe",
    enlace: "https://daar.up.edu.pe",
    enlaceTexto: "daar.up.edu.pe",
    categoria: "Plan Curricular",
    detalle: "Información curricular oficial, sumillas para convalidaciones externas, requisitos de Sello UP y menciones de concentración.",
    seccion: "daar",
    subCat: "plan-estudios"
  },
  {
    id: "br-5",
    duda: "Tesis, trabajo de suficiencia profesional, diplomas",
    canal: "Grados y Títulos",
    dot: "bg-blue-600",
    correo: "gradosytitulos@up.edu.pe",
    enlace: "https://daar.up.edu.pe",
    enlaceTexto: "gradosytitulos@up.edu.pe",
    categoria: "Graduación y Titulación",
    detalle: "Modalidades de obtención del título profesional (tesis y TSP), duplicados de diploma y trámites de bachiller.",
    seccion: "daar",
    subCat: "grados-titulos"
  },
  {
    id: "br-6",
    duda: "Dudas propias de tu carrera",
    canal: "Tu facultad",
    dot: "bg-purple-600",
    correo: "fce@up.edu.pe",
    contactoTexto: "Ver sección Directorio",
    categoria: "Facultades",
    detalle: "Consultas directas a las secretarías académicas de Ciencias Empresariales, Derecho, Economía y Finanzas o Ingeniería.",
    seccion: "directorio",
    subCat: "facultades"
  },
  {
    id: "br-7",
    duda: "Pensiones, cuotas y pagos",
    canal: "Pensiones / Tesorería",
    dot: "bg-amber-600",
    correo: "pensiones@up.edu.pe",
    correoAlt: "tesoreria@up.edu.pe",
    enlaceTexto: "pensiones@up.edu.pe",
    categoria: "Tesorería y Pensiones",
    detalle: "Cronograma de pagos, dudas sobre escala de pensiones, prórrogas de cuotas y estados de cuenta.",
    seccion: "directorio",
    subCat: "oficinas"
  },
  {
    id: "br-8",
    duda: "Un problema personal, emocional, familiar o vocacional",
    canal: "Consejería BFE",
    dot: "bg-emerald-600",
    correo: "consejeriapsicologica@up.edu.pe",
    correoAlt: "consejeriaestudiantil@up.edu.pe",
    enlaceTexto: "consejeriapsicologica@up.edu.pe",
    categoria: "Bienestar y Acompañamiento",
    detalle: "Atención psicológica y estudiantil gratuita y confidencial de BFE en Pabellón Z.",
    seccion: "bfe",
    subCat: "consejeria"
  },
  {
    id: "br-9",
    duda: "Bajo rendimiento, tutoría, discapacidad o ajustes para estudiar (NEE)",
    canal: "BFE",
    dot: "bg-emerald-600",
    correo: "bfe@up.edu.pe",
    enlaceTexto: "bfe@up.edu.pe",
    categoria: "Inclusión y Rendimiento",
    detalle: "Programa de tutoría para riesgo académico y gestión de ajustes razonables en exámenes para estudiantes con NEE o discapacidad.",
    seccion: "bfe",
    subCat: "apoyo"
  },
  {
    id: "br-10",
    duda: "Orientación vocacional",
    canal: "BFE",
    dot: "bg-emerald-600",
    correo: "bfe@up.edu.pe",
    enlaceTexto: "bfe@up.edu.pe",
    categoria: "Vocación y Formación",
    detalle: "Jornadas y talleres de orientación vocacional coordinadas periódicamente por Bienestar Estudiantil.",
    seccion: "bfe",
    subCat: "apoyo"
  },
  {
    id: "br-11",
    duda: "Créditos EFE, elencos, selecciones, Brigada UP, organizaciones",
    canal: "BFE",
    dot: "bg-emerald-600",
    correo: "bfe@up.edu.pe",
    enlaceTexto: "bfe@up.edu.pe",
    categoria: "Experiencias Formativas",
    detalle: "Acreditación y convalidación de créditos EFE (obligatorios y voluntarios), elencos, voluntariado Brigada UP y organizaciones.",
    seccion: "bfe",
    subCat: "efe"
  },
  {
    id: "br-12",
    duda: "Gimnasio, canchita, casilleros, aula de descanso",
    canal: "Casa del Estudiante",
    dot: "bg-emerald-600",
    correo: "bfe@up.edu.pe",
    contactoTexto: "Recepción, pabellón Z · bfe@up.edu.pe",
    categoria: "Instalaciones Pabellón Z",
    detalle: "Acceso al Gym UP, reserva de canchita deportiva, asignación de casilleros y descanso en el aula Z-201.",
    seccion: "bfe",
    subCat: "espacios"
  },
  {
    id: "br-13",
    duda: "Guías y planificadores para organizar tu semestre",
    canal: "Casa UP",
    dot: "bg-emerald-600",
    enlace: "https://casaup.up.edu.pe",
    enlaceTexto: "casaup.up.edu.pe",
    categoria: "Recursos y Estrategia",
    detalle: "Planificador Estudiantil UP, guías de estrategia académica y calendario integral descargable.",
    seccion: "bfe",
    subCat: "faqs"
  },
  {
    id: "br-14",
    duda: "Prácticas preprofesionales y empleo",
    canal: "Empleabilidad",
    dot: "bg-purple-600",
    correo: "practicaspre@up.edu.pe",
    enlaceTexto: "practicaspre@up.edu.pe",
    categoria: "Desarrollo Profesional",
    detalle: "Validación de convenios de prácticas preprofesionales, bolsa de trabajo y ferias laborales.",
    seccion: "directorio",
    subCat: "empleabilidad"
  },
  {
    id: "br-15",
    duda: "Intercambio y oportunidades en el extranjero",
    canal: "ORI",
    dot: "bg-rose-600",
    enlace: "https://ori.up.edu.pe",
    enlaceTexto: "ori.up.edu.pe",
    categoria: "Internacionalización",
    detalle: "Oficina de Relaciones Internacionales: programas de intercambio semestral, doble grado internacional y becas.",
    seccion: "directorio",
    subCat: "ori"
  }
];

// 2. DAAR (Trámites Académicos)
const DAAR_DATA = {
  header: {
    correo: "pregrado@up.edu.pe",
    web: "https://daar.up.edu.pe",
    webTexto: "daar.up.edu.pe",
    matricula: "https://daar.up.edu.pe/matricula",
    matriculaTexto: "daar.up.edu.pe/matricula",
    grados: "gradosytitulos@up.edu.pe"
  },
  categories: [
    {
      id: "durante-semestre",
      title: "Durante el semestre",
      badge: "7 trámites",
      items: [
        {
          id: "d-matr",
          nombre: "Matrícula",
          descripcion: "Proceso semestral obligatorio de selección e inscripción de asignaturas a través de la plataforma DAAR según turno y orden de mérito.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe/matricula"
        },
        {
          id: "d-reser",
          nombre: "Reserva de matrícula",
          descripcion: "Solicitud formal para suspender los estudios de un ciclo lectivo sin perder la condición de alumno regular ni vacante en la UP.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "d-retcurso",
          nombre: "Retiro de curso",
          descripcion: "Anulación de la inscripción en una asignatura específica durante el semestre, dentro de los plazos establecidos por el Calendario Académico.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "d-retsem",
          nombre: "Retiro del semestre",
          descripcion: "Renuncia justificada a todas las asignaturas matriculadas durante el periodo académico en curso antes de la fecha límite oficial.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "d-trasl",
          nombre: "Traslado interno y agregación de carrera",
          descripcion: "Gestión para cambiar de carrera dentro de la UP o cursar una segunda especialidad simultánea (carrera paralela).",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "d-idioma",
          nombre: "Inscripción al examen de suficiencia de idioma",
          descripcion: "Acreditación del dominio de idioma extranjero exigido por el plan de estudios mediante evaluación de suficiencia administrada por el Centro de Idiomas y DAAR.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "d-encuesta",
          nombre: "Encuestas de evaluación de docentes y encargados de prácticas",
          descripcion: "Registro formal y retroalimentación institucional sobre el desempeño pedagógico de los profesores y jefes de práctica del semestre.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        }
      ]
    },
    {
      id: "examenes-notas",
      title: "Exámenes y notas",
      badge: "5 trámites",
      items: [
        {
          id: "e-reprog",
          nombre: "Reprogramación de exámenes y evaluaciones",
          descripcion: "Solicitud justificada (por motivos de salud, fuerza mayor o cruce formal) para rendir una evaluación fuera de la fecha programada regular.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "e-reclam",
          nombre: "Reclamos de exámenes parciales y finales",
          descripcion: "Procedimiento oficial para solicitar la recalificación o revisión de preguntas evaluadas en exámenes parciales o finales.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "e-devol",
          nombre: "Devolución de exámenes finales",
          descripcion: "Entrega física o digital de las pruebas finales calificadas para verificación del puntaje por parte del alumno.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "e-promed",
          nombre: "Reclamos de promedio de trabajos o prácticas",
          descripcion: "Revisión formal de discrepancias en el cálculo de notas continuas, controles de lectura, tareas académicas o prácticas calificadas.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "e-semin",
          nombre: "Reclamos de notas de seminarios",
          descripcion: "Observaciones y apelaciones a calificaciones obtenidas en asignaturas tipo seminario de tesis o investigación.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        }
      ]
    },
    {
      id: "plan-estudios",
      title: "Plan de estudios",
      badge: "3 temas",
      note: "Para dudas propias de tu carrera, escribe también a tu facultad.",
      items: [
        {
          id: "p-sumill",
          nombre: "Sumillas, requisitos y equivalencias",
          descripcion: "Emisión de sumillas y sílabos oficiales visados para convalidaciones externas, revisión de prerrequisitos de cursos y tablas de equivalencias de planes antiguos.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "p-sello",
          nombre: "Sello UP",
          descripcion: "Acreditación de las competencias nucleares que conforman el sello distintivo formativo de la Universidad del Pacífico.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "p-concen",
          nombre: "Concentraciones",
          descripcion: "Elección y certificación de menciones o concentraciones temáticas especializadas contempladas en la malla curricular de cada carrera.",
          correo: "pregrado@up.edu.pe",
          web: "https://daar.up.edu.pe"
        }
      ]
    },
    {
      id: "grados-titulos",
      title: "Grados y títulos",
      badge: "4 trámites",
      items: [
        {
          id: "g-modali",
          nombre: "Modalidades de titulación: tesis o trabajo de suficiencia profesional",
          descripcion: "Asesoría y presentación de expedientes para la obtención del Título Profesional a través de Tesis de Grado o Trabajo de Suficiencia Profesional (TSP).",
          correo: "gradosytitulos@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "g-verif",
          nombre: "Verificaciones académicas y ensobrado de documentos",
          descripcion: "Legalización, autenticación, ensobrado y envío directo de expedientes académicos a universidades del exterior o embajadas.",
          correo: "gradosytitulos@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "g-duplic",
          nombre: "Duplicado de diplomas y revalidación de título",
          descripcion: "Expedición de duplicados por pérdida o deterioro de diplomas de bachiller o título, y trámites de revalidación de grados obtenidos en el extranjero.",
          correo: "gradosytitulos@up.edu.pe",
          web: "https://daar.up.edu.pe"
        },
        {
          id: "g-impres",
          nombre: "Impresión física del diploma digital",
          descripcion: "Emisión y entrega formal en cartulina institucional de la representación física del diploma digital (bachiller o título profesional).",
          correo: "gradosytitulos@up.edu.pe",
          web: "https://daar.up.edu.pe"
        }
      ]
    }
  ],
  footerWarning: "Consejo: antes de escribir, revisa el calendario académico; muchos trámites (retiro, reprogramación, reclamos) tienen fechas límite."
};

// 3. BFE (Bienestar y Vida Universitaria)
const BFE_DATA = {
  header: {
    correo: "bfe@up.edu.pe",
    ubicacion: "Pabellón Z - Casa del Estudiante (Jr. Sánchez Cerro 2215)",
    horario: "L-V 7:30 a. m. - 7:30 p. m. | Sáb 9:00 a. m. - 1:00 p. m.",
    central: "(01) 219-0100 (Anexos: 2390 / 2261) | casaup.up.edu.pe"
  },
  categories: [
    {
      id: "consejeria",
      title: "Consejería Universitaria",
      badge: "Psicológica y Estudiantil",
      descripcion: "Atención gratuita y confidencial para temas emocionales, vocacionales, sociales, académicos o familiares.",
      pdfLink: "https://casaup.up.edu.pe/wp-content/uploads/2025/09/Consejeria-Universitaria-2025_web.pdf",
      pasos: [
        { num: 1, titulo: "Identificar si se requiere consejería psicológica o estudiantil." },
        { num: 2, titulo: "Enviar un correo solicitando cita a: consejeriapsicologica@up.edu.pe o consejeriaestudiantil@up.edu.pe" },
        { num: 3, titulo: "Incluir un breve resumen del motivo de consulta." },
        { num: 4, titulo: "Indicar disponibilidad para reunirse (Lunes a viernes entre 8:00 a. m. y 5:00 p. m.)." },
        { num: 5, titulo: "Esperar la respuesta del equipo para coordinar la cita formal." }
      ]
    },
    {
      id: "apoyo",
      title: "Apoyo Académico y NEE",
      badge: "5 programas",
      items: [
        {
          id: "ap-acomp",
          nombre: "Acompañamiento académico en el primer semestre",
          texto: "Dirigido a estudiantes en riesgo académico. La invitación se realiza al inicio de cada semestre. A los participantes se les asigna un tutor para seguimiento académico, orientación en la toma de decisiones, estrategias para mejorar resultados y absolución de dudas sobre procedimientos UP.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "ap-vocac",
          nombre: "Jornadas de orientación vocacional",
          texto: "Sesiones y talleres organizados para explorar vocación, confirmación de especialidad y reorientación profesional.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "ap-tutor",
          nombre: "Programa de tutoría para estudiantes en riesgo académico",
          texto: "Acompañamiento individualizado con un docente tutor para superar condiciones de permanencia y mejorar el rendimiento.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "ap-taller",
          nombre: "Talleres y charlas sobre competencias",
          texto: "Estrategias de aprendizaje universitario, gestión del tiempo, manejo de ansiedad ante exámenes y vida saludable.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "ap-nee",
          nombre: "Atención a estudiantes con discapacidad o Necesidades Educativas Específicas (NEE)",
          texto: "BFE atiende a estudiantes con NEE o neurodivergencia para favorecer su acceso, permanencia y aprendizaje en igualdad de condiciones, gestionando ajustes razonables en evaluaciones.",
          correo: "bfe@up.edu.pe"
        }
      ]
    },
    {
      id: "efe",
      title: "Experiencias Formativas (EFE)",
      badge: "Créditos y Actividades",
      descripcion: "Desarrollan competencias socioemocionales mediante arte, deporte, voluntariado y liderazgo.",
      flujogramaLink: "https://casaup.up.edu.pe/nuevo-flujograma-plan-efe-para-planes-2027-i-y-2028-i/",
      obligatorias: "Para ingresantes a partir de 2022-I: deben acreditar obligatoriamente 2 créditos EFE para egresar. Para ingresantes entre 2017-I y 2021-II: consultar el reglamento correspondiente en el portal de estudiantes.",
      voluntarias: "Se ofrecen actividades deportivas, artísticas, culturales y de liderazgo. Por ser parte de una selección deportiva, elenco artístico o Brigada UP se puede solicitar la convalidación de 1 crédito EFE voluntario.",
      enlaces: [
        { nombre: "Elencos y Selecciones Deportivas", ig: "@elencos.up", url: "https://casaup.up.edu.pe/vida-universitaria/elencos-artisticos/" },
        { nombre: "Brigada UP (Voluntariado)", ig: "@brigadeando.up", url: "https://casaup.up.edu.pe/vida-universitaria/brigada-up/" },
        { nombre: "Organizaciones Estudiantiles (Guía Oficial PDF)", ig: "Casa UP", url: "https://casaup.up.edu.pe/wp-content/uploads/2025/09/2025_Guia-de-Organizaciones-estudiantiles-UP_act.set_.pdf" }
      ]
    },
    {
      id: "espacios",
      title: "Espacios de Pabellón Z",
      badge: "8 instalaciones",
      descripcion: "Casa del Estudiante (Jr. Sánchez Cerro 2215). Haz clic en cada espacio para ver detalles oficiales:",
      items: [
        {
          id: "esp-gym",
          nombre: "Gym UP",
          ubicacion: "1.er piso, Pabellón Z",
          horario: "L-V 7:30 a. m. a 11:30 a. m. y 1:00 p. m. a 9:00 p. m.",
          detalle: "Incluye orientación personalizada de entrenadores. Consultas y confirmación de requisitos: bfe@up.edu.pe.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "esp-cancha",
          nombre: "Canchita deportiva",
          ubicacion: "Pabellón Z",
          horario: "Reserva en línea según disponibilidad",
          detalle: "Coordinador de Deportes: Víctor Espinoza Paredes (vr.espinozap@up.edu.pe). Se debe revisar el formulario o instructivo oficial de reserva.",
          correo: "vr.espinozap@up.edu.pe"
        },
        {
          id: "esp-casilleros",
          nombre: "Casilleros",
          ubicacion: "Módulo de recepción, Pabellón Z",
          horario: "L-V 7:30 a. m. - 7:30 p. m.",
          detalle: "Se solicitan presencialmente en recepción presentando carné de alumno. Sujeto a disponibilidad de casilleros y normas de uso.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "esp-recreativo",
          nombre: "Espacio recreativo",
          ubicacion: "Estacionamiento de Pabellón Z",
          horario: "Horario regular de Casa del Estudiante",
          detalle: "Cuenta con aro de básquet y net de vóley. Se pueden solicitar pelotas y raquetas en el módulo de recepción.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "esp-z201",
          nombre: "Aula de descanso (Salón Z-201)",
          ubicacion: "2.° piso, Casa del Estudiante",
          horario: "L-V 7:30 a. m. - 7:30 p. m.",
          detalle: "Espacio silencioso acondicionado con puffs y sillones para relajarse y descansar entre horas de clase.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "esp-z304",
          nombre: "Sala de ensayo de música (Z-304)",
          ubicacion: "3.er piso, Pabellón Z",
          horario: "Previa reserva",
          detalle: "Equipada con batería acústica, amplificadores de guitarra y bajo, y teclado para ensayos musicales.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "esp-escenicas",
          nombre: "Salas de artes escénicas (Z-302 y Z-303)",
          ubicacion: "3.er piso, Pabellón Z",
          horario: "Previa reserva",
          detalle: "Acondicionadas con piso flotante y espejos para talleres y ensayos de danza y teatro.",
          correo: "bfe@up.edu.pe"
        },
        {
          id: "esp-z105",
          nombre: "Sala de uso múltiple (Z-105)",
          ubicacion: "1.er piso, Pabellón Z",
          horario: "Actividades institucionales",
          detalle: "Espacio para charlas, conferencias, dinámicas grupales y reuniones estudiantiles.",
          correo: "bfe@up.edu.pe"
        }
      ]
    },
    {
      id: "faqs",
      title: "18 Preguntas Frecuentes",
      badge: "Banco Oficial BFE",
      faqs: [
        {
          q: "¿Dónde puedo pedir ayuda si estoy pasando por un problema personal o emocional?",
          a: "Puedes solicitar consejería universitaria de BFE. Hay consejería psicológica y estudiantil; la atención se describe como gratuita y confidencial. Revisa la página de consejería y confirma el correo correspondiente."
        },
        {
          q: "¿Cómo saco una cita de consejería?",
          a: "Envía un correo con un breve resumen del motivo de consulta y tu disponibilidad. El material de 2025 muestra correos diferenciados para consejería psicológica (consejeriapsicologica@up.edu.pe) y estudiantil (consejeriaestudiantil@up.edu.pe); BFE debe confirmar cuáles siguen vigentes."
        },
        {
          q: "¿La consejería cuesta?",
          a: "La página de Bienestar Estudiantil y el folleto de consejería describen la atención como gratuita y confidencial."
        },
        {
          q: "¿Qué hago si estoy en riesgo académico?",
          a: "BFE cuenta con un Programa de Tutoría para estudiantes en riesgo académico. La invitación se realiza al inicio del semestre y se asigna un tutor para seguimiento y orientación. Para más información, la página indica bfe@up.edu.pe."
        },
        {
          q: "¿Puedo pedir un tutor por mi cuenta?",
          a: "La información pública dice que la invitación se realiza al inicio del semestre, pero no describe una postulación abierta. Consulta a BFE (bfe@up.edu.pe) para saber si existe otra vía."
        },
        {
          q: "¿La universidad ofrece orientación vocacional?",
          a: "Sí. Bienestar Estudiantil enumera jornadas de orientación vocacional. Un material indica que suelen realizarse en el segundo semestre; confirma la convocatoria del año en curso con bfe@up.edu.pe."
        },
        {
          q: "Tengo una discapacidad o necesito ajustes para estudiar. ¿A quién escribo?",
          a: "BFE indica que Bienestar Estudiantil atiende a estudiantes con NEE y gestiona ajustes razonables. La solicitud de asistencia se canaliza mediante bfe@up.edu.pe."
        },
        {
          q: "¿Dónde está el gimnasio y en qué horario funciona?",
          a: "Gym UP está en la Casa del Estudiante, primer piso, pabellón Z. El horario publicado es lunes a viernes de 7:30 a. m. a 11:30 a. m. y de 1:00 p. m. a 9:00 p. m. Confirma cambios por feriados o período académico."
        },
        {
          q: "¿Cómo reservo la canchita?",
          a: "La página de servicios contiene indicaciones y un enlace de reserva. Para consultas adicionales señala a Víctor Espinoza Paredes, Coordinador de Deportes, en vr.espinozap@up.edu.pe. El procedimiento completo debe transcribirse desde el formulario o instructivo."
        },
        {
          q: "¿Cómo consigo un casillero?",
          a: "La página indica que puedes solicitar la reserva en la recepción de la Casa del Estudiante (Pabellón Z). También enlaza normas de uso. Confirma disponibilidad, duración y requisitos en recepción."
        },
        {
          q: "¿Dónde puedo descansar entre clases?",
          a: "Existe un Aula de descanso en el salón Z-201 de la Casa del Estudiante. La página enlaza normas de convivencia."
        },
        {
          q: "¿Dónde pido pelotas para jugar vóley o básquet?",
          a: "En el espacio recreativo del estacionamiento de la Casa del Estudiante (Pabellón Z) se pueden solicitar pelotas en recepción. Confirma horarios y condiciones de préstamo."
        },
        {
          q: "¿Qué son las EFE?",
          a: "Son Experiencias Formativas Estudiantiles que buscan desarrollar habilidades, actitudes y disposiciones mediante expresión artística, práctica deportiva y acción solidaria."
        },
        {
          q: "¿Las EFE son obligatorias?",
          a: "Casa UP distingue EFE obligatorias y voluntarias. El reglamento aplicable depende de la cohorte de ingreso y del plan de estudios. Consulta el reglamento que te corresponde."
        },
        {
          q: "¿Puedo participar en actividades artísticas o deportivas?",
          a: "Casa UP presenta Elencos Artísticos y Selecciones Deportivas como EFE voluntarias. Las convocatorias, cupos y pruebas de ingreso deben confirmarse en cada edición."
        },
        {
          q: "¿Qué es la Brigada UP?",
          a: "Es un equipo de estudiantes voluntarios que promueve una cultura de prevención y seguridad y pone sus conocimientos al servicio de los demás."
        },
        {
          q: "¿Quién ayuda a las organizaciones estudiantiles?",
          a: "La Coordinación de Participación Estudiantil brinda acompañamiento y soporte formativo y administrativo, incluyendo asesoría de planes de trabajo, capacitaciones, reservas de espacios y difusión."
        },
        {
          q: "¿Dónde encuentro guías para organizar mi semestre?",
          a: "En Recursos UP se publican la Guía de estrategia académica, Guía de vida UP, Planificador Estudiantil UP 2026, Planificador semestral y otros materiales. Verifica la edición vigente."
        }
      ]
    }
  ]
};

// 4. Directorio de Contactos
const DIRECTORIO_DATA = {
  header: {
    central: "(01) 219-0100",
    portal: "up.edu.pe",
    sede: "Jr. Sánchez Cerro 2141, Jesús María",
    admisionDirecto: "219-0130 / Opción 3"
  },
  categories: [
    {
      id: "facultades",
      title: "Facultades",
      badge: "4 facultades",
      items: [
        {
          id: "fac-fce",
          nombre: "Facultad de Ciencias Empresariales",
          correo: "fce@up.edu.pe",
          anexo: "2257 / 2628",
          carreras: "Administración, Marketing, Negocios Internacionales"
        },
        {
          id: "fac-derecho",
          nombre: "Facultad de Derecho",
          correo: "derecho@up.edu.pe",
          anexo: "2329",
          carreras: "Derecho"
        },
        {
          id: "fac-fef",
          nombre: "Facultad de Economía y Finanzas",
          correo: "fef@up.edu.pe",
          anexo: "2143",
          carreras: "Economía, Finanzas"
        },
        {
          id: "fac-ing",
          nombre: "Facultad de Ingeniería",
          correo: "ingenieria@up.edu.pe",
          anexo: "2336",
          ubicacion: "Secretaría en el F400",
          redes: "Instagram: Facultad de Ingeniería (@ingenieria_up) · LinkedIn: Ingeniería UP",
          carreras: "Ingeniería de la Información, Ingeniería Empresarial"
        }
      ]
    },
    {
      id: "escuelas",
      title: "Escuelas y Centros",
      badge: "6 dependencias",
      items: [
        {
          id: "esc-ejec",
          nombre: "Educación Ejecutiva",
          correo: "programas@up.edu.pe",
          telefono: "219-0101"
        },
        {
          id: "esc-idiomas",
          nombre: "Centro de Idiomas",
          correo: "idiomas.informes@up.edu.pe",
          telefono: "Consultas por correo institucional"
        },
        {
          id: "esc-ciup",
          nombre: "Centro de Investigación (CIUP)",
          correo: "comunicacionesciup@up.edu.pe",
          telefono: "219-0100 / Anexo 2103"
        },
        {
          id: "esc-posg",
          nombre: "Escuela de Posgrado",
          correo: "postgrado@up.edu.pe",
          telefono: "219-0101"
        },
        {
          id: "esc-maestr",
          nombre: "Escuela de Posgrado – Maestrías",
          correo: "maestrias@up.edu.pe",
          telefono: "219-0101"
        },
        {
          id: "esc-pre",
          nombre: "Escuela Preuniversitaria",
          correo: "conexion@up.edu.pe",
          telefono: "219-0100 (opción 3) / 219-0130"
        }
      ]
    },
    {
      id: "oficinas",
      title: "Oficinas Administrativas y Servicios",
      badge: "6 oficinas",
      items: [
        {
          id: "ofi-admision",
          nombre: "Admisión",
          correo: "conexion@up.edu.pe",
          anexo: "2687",
          directo: "219-0130 / Opción 3"
        },
        {
          id: "ofi-eventos",
          nombre: "Eventos",
          correo: "eventos@up.edu.pe",
          anexo: "5343 / 5349"
        },
        {
          id: "ofi-comunic",
          nombre: "Comunicaciones e Imagen Institucional",
          correo: "comunicaciones@up.edu.pe",
          anexo: "5331 / 5348 / 5346"
        },
        {
          id: "ofi-pension",
          nombre: "Pensiones",
          correo: "pensiones@up.edu.pe",
          anexo: "2239"
        },
        {
          id: "ofi-daar",
          nombre: "Servicios Académicos y Registro (DAAR)",
          correo: "pregrado@up.edu.pe",
          anexo: "8990"
        },
        {
          id: "ofi-tesor",
          nombre: "Tesorería",
          correo: "tesoreria@up.edu.pe",
          anexo: "2272 / 2343 / 2378"
        }
      ]
    },
    {
      id: "empleabilidad",
      title: "Empleabilidad y Comunidad",
      badge: "3 áreas",
      items: [
        {
          id: "emp-alumni",
          nombre: "Red Alumni",
          correo: "redalumni@up.edu.pe",
          anexo: "2253",
          detalle: "Red de egresados y vinculación profesional permanente."
        },
        {
          id: "emp-pract",
          nombre: "Prácticas Preprofesionales",
          correo: "practicaspre@up.edu.pe",
          anexo: "2253",
          detalle: "Convalidación y registro de convenios de prácticas preprofesionales."
        },
        {
          id: "emp-bolsa",
          nombre: "Empleabilidad",
          correo: "empleabilidad@up.edu.pe",
          anexo: "2253",
          detalle: "Orientación laboral, asesoría curricular y bolsa de empleo UP."
        }
      ]
    },
    {
      id: "ori",
      title: "Relaciones Internacionales (ORI)",
      badge: "Movilidad global",
      items: [
        {
          id: "ori-oficial",
          nombre: "Oficina de Relaciones Internacionales (ORI)",
          web: "https://ori.up.edu.pe",
          detalle: "Intercambio estudiantil académico internacional, convocatorias de movilidad y programas de doble grado en el extranjero."
        }
      ]
    }
  ]
};

/* ==========================================================================
   COMPONENTE PRINCIPAL (APP EN PANTALLA ÚNICA INTERACTIVA)
   ========================================================================== */
function App() {
  // Sección activa seleccionada mediante los 4 botones principales
  const [activeSection, setActiveSection] = useState('rapido'); // 'rapido', 'daar', 'bfe', 'directorio'
  
  // Sub-estados interactivos dentro de cada sección (pocos textos visibles por nivel)
  const [activeDaarCat, setActiveDaarCat] = useState('durante-semestre');
  const [activeDaarItem, setActiveDaarItem] = useState(DAAR_DATA.categories[0].items[0]);

  const [activeBfeCat, setActiveBfeCat] = useState('consejeria');
  const [activeBfeItem, setActiveBfeItem] = useState(null);

  const [activeDirCat, setActiveDirCat] = useState('facultades');
  const [activeDirItem, setActiveDirItem] = useState(DIRECTORIO_DATA.categories[0].items[0]);

  // Código de Alumno Persistente
  const [studentCode, setStudentCode] = useState('20231234');
  const [isEditingCode, setIsEditingCode] = useState(false);

  // Barra de Consulta Inteligente en Lenguaje Natural
  const [searchQuery, setSearchQuery] = useState('');

  // Filtro en tabla rápida
  const [searchRapido, setSearchRapido] = useState('');
  const [activeRapidoRow, setActiveRapidoRow] = useState(null);

  // Toast flotante
  const [toastMessage, setToastMessage] = useState('');

  // Función de navegación inteligente directa a la sección y trámite
  const navigateToSectionAndItem = (row) => {
    if (!row.seccion) return;
    setActiveSection(row.seccion);

    if (row.seccion === 'daar') {
      if (row.subCat) setActiveDaarCat(row.subCat);
      const cat = DAAR_DATA.categories.find(c => c.id === row.subCat);
      if (cat && cat.items.length > 0) {
        const firstWord = row.duda.split(' ')[0].toLowerCase();
        const matchedItem = cat.items.find(it => it.nombre.toLowerCase().includes(firstWord)) || cat.items[0];
        setActiveDaarItem(matchedItem);
      }
    } else if (row.seccion === 'bfe') {
      if (row.subCat) setActiveBfeCat(row.subCat);
    } else if (row.seccion === 'directorio') {
      if (row.subCat) setActiveDirCat(row.subCat);
    }

    // Scroll suave hacia la sección
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const copyToClipboard = (text, label = '¡Copiado!') => {
    navigator.clipboard.writeText(text);
    showToast(label);
  };

  // Resultados en tiempo real de la consulta inteligente
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const term = searchQuery.toLowerCase().trim();
    const results = [];

    // Buscar en Buscador Rápido
    BUSCADOR_RAPIDO.forEach(item => {
      if (item.duda.toLowerCase().includes(term) || item.categoria.toLowerCase().includes(term) || item.canal.toLowerCase().includes(term)) {
        results.push({
          tipo: 'Buscador Rápido',
          titulo: item.duda,
          canal: item.canal,
          correo: item.correo,
          detalle: item.detalle,
          enlace: item.enlace
        });
      }
    });

    // Buscar en DAAR
    DAAR_DATA.categories.forEach(cat => {
      cat.items.forEach(it => {
        if (it.nombre.toLowerCase().includes(term) || it.descripcion.toLowerCase().includes(term)) {
          results.push({
            tipo: 'DAAR · ' + cat.title,
            titulo: it.nombre,
            canal: 'DAAR',
            correo: it.correo,
            detalle: it.descripcion,
            enlace: it.web
          });
        }
      });
    });

    // Buscar en BFE
    if (term.includes('consejer') || term.includes('psicol') || term.includes('emocion') || term.includes('cita')) {
      results.push({
        tipo: 'BFE · Bienestar',
        titulo: 'Consejería Universitaria Psicológica y Estudiantil',
        canal: 'BFE',
        correo: 'consejeriapsicologica@up.edu.pe',
        detalle: 'Atención gratuita y confidencial para temas emocionales, vocacionales, sociales, académicos o familiares.',
        enlace: BFE_DATA.categories[0].pdfLink
      });
    }

    BFE_DATA.categories[1].items.forEach(it => {
      if (it.nombre.toLowerCase().includes(term) || it.texto.toLowerCase().includes(term)) {
        results.push({
          tipo: 'BFE · Apoyo Académico',
          titulo: it.nombre,
          canal: 'BFE',
          correo: it.correo,
          detalle: it.texto
        });
      }
    });

    BFE_DATA.categories[3].items.forEach(esp => {
      if (esp.nombre.toLowerCase().includes(term) || esp.ubicacion.toLowerCase().includes(term) || esp.detalle.toLowerCase().includes(term)) {
        results.push({
          tipo: 'BFE · Pabellón Z',
          titulo: esp.nombre,
          canal: 'Casa del Estudiante',
          correo: esp.correo,
          detalle: esp.ubicacion + '. Horario: ' + esp.horario + '. ' + esp.detalle
        });
      }
    });

    BFE_DATA.categories[4].faqs.forEach(faq => {
      if (faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term)) {
        results.push({
          tipo: 'BFE · Preguntas Frecuentes',
          titulo: faq.q,
          canal: 'BFE',
          correo: 'bfe@up.edu.pe',
          detalle: faq.a
        });
      }
    });

    // Buscar en Directorio
    DIRECTORIO_DATA.categories.forEach(cat => {
      cat.items.forEach(it => {
        if (it.nombre.toLowerCase().includes(term) || (it.carreras && it.carreras.toLowerCase().includes(term)) || (it.detalle && it.detalle.toLowerCase().includes(term))) {
          results.push({
            tipo: 'Directorio · ' + cat.title,
            titulo: it.nombre,
            canal: cat.title,
            correo: it.correo,
            detalle: 'Anexo: ' + (it.anexo || it.telefono || '') + '. ' + (it.carreras ? 'Carreras: ' + it.carreras : '') + ' ' + (it.detalle || ''),
            enlace: it.web
          });
        }
      });
    });

    // Deduplicar
    const seen = new Set();
    return results.filter(r => {
      const key = r.titulo.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 6);
  }, [searchQuery]);

  // Filtrado de la tabla rápida
  const filteredRapido = useMemo(() => {
    if (!searchRapido.trim()) return BUSCADOR_RAPIDO;
    const term = searchRapido.toLowerCase();
    return BUSCADOR_RAPIDO.filter(item => 
      item.duda.toLowerCase().includes(term) ||
      item.canal.toLowerCase().includes(term) ||
      (item.correo && item.correo.toLowerCase().includes(term))
    );
  }, [searchRapido]);

  // Selección de categoría actual en DAAR
  const currentDaarCategory = useMemo(() => {
    return DAAR_DATA.categories.find(c => c.id === activeDaarCat) || DAAR_DATA.categories[0];
  }, [activeDaarCat]);

  // Selección de categoría actual en BFE
  const currentBfeCategory = useMemo(() => {
    return BFE_DATA.categories.find(c => c.id === activeBfeCat) || BFE_DATA.categories[0];
  }, [activeBfeCat]);

  // Selección de categoría actual en Directorio
  const currentDirCategory = useMemo(() => {
    return DIRECTORIO_DATA.categories.find(c => c.id === activeDirCat) || DIRECTORIO_DATA.categories[0];
  }, [activeDirCat]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col">
      
      {/* ====================================================================
          BARRA SUPERIOR OFICIAL (Estilo Profesional Idéntico a Imagen 2)
          ==================================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo Oficial HD Universidad del Pacífico */}
          <div className="flex items-center gap-3.5">
            <img 
              src="assets/up_logo_clean.png" 
              alt="Universidad del Pacífico" 
              className="h-10 sm:h-11 w-auto object-contain"
            />
            <div className="h-7 w-[1px] bg-slate-200 hidden sm:block"></div>
            <div>
              <div className="text-sm font-extrabold text-[#0B2240] leading-none mb-0.5">
                Guía rápida de canales
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Pregrado · 2026-II
              </div>
            </div>
          </div>

          {/* Lado derecho limpio institucional */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Canales Institucionales Oficiales</span>
          </div>

        </div>
      </header>

      {/* ====================================================================
          HERO BANNER CON FONDO DE LA FACHADA UP EN AZUL OSCURO TRANSPARENTE
          (Réplica Exacta de Imagen 2 con Letras en Relieve y Mascota Búho UP)
          ==================================================================== */}
      <section 
        className="relative text-white pt-8 sm:pt-10 md:pt-12 pb-0 px-4 sm:px-6 overflow-hidden bg-[#0B2240] shadow-md"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(11, 34, 64, 0.94) 0%, rgba(15, 44, 89, 0.88) 50%, rgba(11, 34, 64, 0.82) 100%), url('assets/up_campus_facade_hd.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%'
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8">
          
          {/* Lado Izquierdo: Textos y Buscador */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-3xl pb-6 md:pb-10">
            
            {/* Píldora: ¡TODO ESTÁ AQUÍ! */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A4C]/90 border border-blue-400/40 text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-3.5 shadow-sm">
              <span>¡TODO ESTÁ AQUÍ!</span>
            </div>

            {/* Titular Principal: ¿Tienes dudas? Encuentra el canal correcto. */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2.5">
              <span className="text-white">¿Tienes dudas?</span><br />
              <span className="text-[#F59E0B]">Encuentra el canal correcto.</span>
            </h1>

            {/* Subtítulo Oficial de Imagen 2 */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed mb-6 font-normal">
              Trámites, costos, bienestar, intercambios, soporte y mucho más: a quién escribir, cómo y dónde.
            </p>

            {/* Barra de Consulta Redondeada en Lenguaje Natural */}
            <div className="relative flex items-center bg-white rounded-full shadow-2xl border-2 border-transparent focus-within:border-blue-400 transition-all overflow-hidden p-1 max-w-2xl mb-3">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Icon name="search" className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Escribe tu duda: retiro de curso, psicólogo, contraseña, intercambio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pr-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-2 px-2.5 py-0.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition font-medium"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Píldoras de Frecuentes (Exactas a Imagen 2) */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300">
              <span className="text-slate-300 font-medium">Frecuentes:</span>
              <button onClick={() => setSearchQuery('Retiro de curso')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Retiro de curso</button>
              <button onClick={() => setSearchQuery('Consejería')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Cita psicológica</button>
              <button onClick={() => setSearchQuery('Constancias')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Constancias</button>
              <button onClick={() => setSearchQuery('Pensiones')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Pensiones</button>
              <button onClick={() => setSearchQuery('Intercambio')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Intercambio</button>
              <button onClick={() => setSearchQuery('Prácticas')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Prácticas</button>
            </div>

            {/* Resultados de la Consulta Inteligente */}
            {searchQuery && (
              <div className="mt-4 bg-white text-slate-800 rounded-2xl p-5 shadow-2xl border border-slate-200 animate-fade-in space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider">
                    {globalSearchResults.length > 0 
                      ? ('Canales y trámites identificados para "' + searchQuery + '":')
                      : ('No se encontraron coincidencias directas para "' + searchQuery + '"')}
                  </span>
                  <span className="text-xs text-slate-400">
                    {globalSearchResults.length} resultado(s)
                  </span>
                </div>

                {globalSearchResults.map((res, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                          {res.tipo}
                        </span>
                        <h4 className="font-bold text-sm text-[#0B2240]">
                          {res.titulo}
                        </h4>
                      </div>
                      {res.correo && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              const subj = res.titulo.split('–')[0].trim() + ' – ' + (studentCode || '20231234');
                              copyToClipboard(subj, "¡Asunto oficial copiado!");
                            }}
                            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-200 transition flex items-center gap-1"
                          >
                            <Icon name="copy" className="w-3 h-3" />
                            <span>Copiar Asunto</span>
                          </button>
                          <a
                            href={'mailto:' + res.correo + '?subject=' + encodeURIComponent(res.titulo.split('–')[0].trim() + ' – ' + (studentCode || '20231234'))}
                            className="px-3 py-1 bg-[#1E40AF] text-white hover:bg-blue-800 text-xs font-bold rounded transition"
                          >
                            Redactar
                          </a>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {res.detalle}
                    </p>

                    {res.correo && (
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 flex items-center justify-between">
                        <span>Canal oficial: <strong className="text-slate-800">{res.correo}</strong></span>
                        <span className="font-mono text-slate-600">Asunto: «{res.titulo.split('–')[0].trim()} – {studentCode || '20231234'}»</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Lado Derecho: Mascota Búho UP Grande y al Costado de Todo (Exacto a Imagen de Referencia) */}
          <div className="flex flex-col items-center justify-end flex-shrink-0 relative self-center md:self-end z-20 pb-0">
            <img 
              src="assets/up_mascot_reup.png" 
              alt="Mascota Oficial Búho RE UP" 
              className="w-64 sm:w-72 md:w-80 lg:w-[390px] xl:w-[430px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 pointer-events-none select-none block"
            />
          </div>

        </div>
      </section>

      {/* ====================================================================
          BARRA DE LOS 4 CANALES MAESTROS (Fondo Azul Marino Oscuro)
          ==================================================================== */}
      <section className="bg-[#0B2240] text-white pt-2 pb-8 px-4 sm:px-6 border-b border-[#1A3A64]">
        <div className="max-w-5xl mx-auto">

          {/* ================================================================
              LOS 4 BOTONES MAESTROS INTERACTIVOS (Identidad de Imagen 1)
              ================================================================ */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Selecciona el canal que necesitas consultar:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              
              {/* Botón Buscador rápido */}
              <button
                onClick={() => setActiveSection('rapido')}
                className={`p-4 rounded-xl text-left transition-all border ${
                  activeSection === 'rapido'
                    ? 'bg-[#16365F] border-blue-400 ring-2 ring-blue-400/50 shadow-lg translate-y-[-2px]'
                    : 'bg-[#102A4C] border-[#1D3D66] hover:bg-[#133055] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm sm:text-base ${activeSection === 'rapido' ? 'text-amber-300' : 'text-white'}`}>
                    Buscador rápido
                  </span>
                  {activeSection === 'rapido' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  Tu duda → a quién escribir
                </div>
              </button>

              {/* Botón DAAR */}
              <button
                onClick={() => setActiveSection('daar')}
                className={`p-4 rounded-xl text-left transition-all border ${
                  activeSection === 'daar'
                    ? 'bg-[#16365F] border-blue-400 ring-2 ring-blue-400/50 shadow-lg translate-y-[-2px]'
                    : 'bg-[#102A4C] border-[#1D3D66] hover:bg-[#133055] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm sm:text-base ${activeSection === 'daar' ? 'text-amber-300' : 'text-white'}`}>
                    DAAR
                  </span>
                  {activeSection === 'daar' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  Matrícula, notas, exámenes, títulos
                </div>
              </button>

              {/* Botón BFE */}
              <button
                onClick={() => setActiveSection('bfe')}
                className={`p-4 rounded-xl text-left transition-all border ${
                  activeSection === 'bfe'
                    ? 'bg-[#16365F] border-blue-400 ring-2 ring-blue-400/50 shadow-lg translate-y-[-2px]'
                    : 'bg-[#102A4C] border-[#1D3D66] hover:bg-[#133055] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm sm:text-base ${activeSection === 'bfe' ? 'text-amber-300' : 'text-white'}`}>
                    BFE
                  </span>
                  {activeSection === 'bfe' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  Bienestar, EFE y Casa del Estudiante
                </div>
              </button>

              {/* Botón Directorio */}
              <button
                onClick={() => setActiveSection('directorio')}
                className={`p-4 rounded-xl text-left transition-all border ${
                  activeSection === 'directorio'
                    ? 'bg-[#16365F] border-blue-400 ring-2 ring-blue-400/50 shadow-lg translate-y-[-2px]'
                    : 'bg-[#102A4C] border-[#1D3D66] hover:bg-[#133055] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm sm:text-base ${activeSection === 'directorio' ? 'text-amber-300' : 'text-white'}`}>
                    Directorio
                  </span>
                  {activeSection === 'directorio' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  Facultades, pagos, empleabilidad, ORI
                </div>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          ÁREA PRINCIPAL DE CONTENIDO INTERACTIVO EN PANTALLA ÚNICA
          (Sin cambiar de página: el panel se despliega directamente aquí)
          ==================================================================== */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        
        {/* ==================================================================
            SECCIÓN ACTIVA: BUSCADOR RÁPIDO (Réplica de Imagen 2)
            ================================================================== */}
        {activeSection === 'rapido' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                  Buscador rápido
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Ubica tu tema en la columna izquierda y presiona cualquier fila para activar el enrutador y generar tu asunto oficial.
                </p>
              </div>

              {/* Filtro en tiempo real */}
              <div className="relative w-full md:w-72">
                <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrar duda (ej. retiro, gym)..."
                  value={searchRapido}
                  onChange={(e) => setSearchRapido(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Tabla Oficial de 15 Filas con Clics Interactivos */}
            <div className="overflow-x-auto border-b-2 border-[#0B2240] mb-6">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-[#0B2240] text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <th className="py-3 px-3 sm:px-4 w-[46%]">SI TU DUDA ES SOBRE...</th>
                    <th className="py-3 px-3 sm:px-4 w-[24%]">CANAL</th>
                    <th className="py-3 px-3 sm:px-4 w-[30%]">CONTACTO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRapido.map((row) => {
                    const isSelected = activeRapidoRow && activeRapidoRow.id === row.id;
                    return (
                      <React.Fragment key={row.id}>
                        <tr
                          onClick={() => setActiveRapidoRow(isSelected ? null : row)}
                          className={`transition cursor-pointer ${
                            isSelected ? 'bg-blue-50/90 font-medium' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3.5 px-3 sm:px-4 font-semibold text-slate-900 flex items-center gap-2">
                            <span className={`text-xs transition-transform inline-block font-bold ${
                              isSelected ? 'text-blue-600 rotate-90' : 'text-slate-300'
                            }`}>
                              ▶
                            </span>
                            <span>{row.duda}</span>
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-2 font-medium text-slate-800">
                              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${row.dot}`}></span>
                              {row.canal}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-[#1E40AF]">
                            {row.correo ? (
                              <span className="font-semibold hover:underline block text-xs sm:text-sm">{row.correo}</span>
                            ) : null}
                            {row.enlace && (
                              <a
                                href={row.enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-blue-700 hover:underline block"
                              >
                                {row.enlaceTexto || row.enlace}
                              </a>
                            )}
                            {!row.correo && !row.enlace && (
                              <span className="text-slate-600 font-semibold text-xs sm:text-sm">{row.contactoTexto}</span>
                            )}
                          </td>
                        </tr>

                        {/* DESPLIEGUE INMEDIATO EN EL MISMO LUGAR (Cero scroll hacia abajo) */}
                        {isSelected && (
                          <tr>
                            <td colSpan="3" className="p-0 border-b-2 border-blue-300">
                              <div className="bg-gradient-to-r from-blue-50/90 via-slate-50 to-blue-50/50 p-4 sm:p-5 animate-fade-in space-y-3">
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                                      Canal identificado · {row.canal} ({row.categoria})
                                    </span>
                                    <h4 className="text-base font-bold text-[#0B2240]">
                                      {row.duda}
                                    </h4>
                                  </div>

                                  {/* Botón directo a la sección correspondiente */}
                                  {row.seccion && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigateToSectionAndItem(row);
                                      }}
                                      className="px-3.5 py-1.5 bg-[#0B2240] hover:bg-[#16365F] text-white text-xs font-bold rounded-xl transition self-start sm:self-auto flex items-center gap-1.5 shadow"
                                    >
                                      <span>Ir a la sección {row.canal}</span>
                                      <Icon name="arrow-right" className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>

                                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                                  {row.detalle}
                                </p>

                                {/* Generador de Asunto Oficial Inmediato */}
                                {row.correo && (
                                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                                      <span className="font-bold text-[#0B2240]">
                                        Asunto pre-armado: <span className="font-mono text-slate-800">«{row.duda.split(',')[0]} – {studentCode || '20231234'}»</span>
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const subj = `${row.duda.split(',')[0]} – ${studentCode || '20231234'}`;
                                            copyToClipboard(subj, "¡Asunto oficial copiado!");
                                          }}
                                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-xs transition flex items-center gap-1"
                                        >
                                          <Icon name="copy" className="w-3 h-3" />
                                          <span>Copiar Asunto</span>
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(row.correo, "¡Correo copiado!");
                                          }}
                                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-xs transition flex items-center gap-1"
                                        >
                                          <Icon name="copy" className="w-3 h-3" />
                                          <span>Copiar Correo</span>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                      <a
                                        href={`mailto:${row.correo}?subject=${encodeURIComponent(`${row.duda.split(',')[0]} – ${studentCode || '20231234'}`)}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="py-1.5 px-3 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition inline-flex items-center gap-1.5"
                                      >
                                        <Icon name="mail" className="w-3.5 h-3.5" />
                                        <span>Abrir en mi Correo UP</span>
                                      </a>
                                      {row.enlace && (
                                        <a
                                          href={row.enlace}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition inline-flex items-center gap-1"
                                        >
                                          <span>Web oficial</span>
                                          <Icon name="external-link" className="w-3 h-3" />
                                        </a>
                                      )}
                                    </div>

                                  </div>
                                )}

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Enlaces Puente al pie */}
            <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1 pt-2">
              <span>Más información:</span>
              <a href="https://daar.up.edu.pe" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] font-bold hover:underline">
                daar.up.edu.pe
              </a>
              <span>(trámites académicos) ·</span>
              <a href="https://casaup.up.edu.pe" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] font-bold hover:underline">
                casaup.up.edu.pe
              </a>
              <span>(bienestar y vida universitaria).</span>
            </div>

          </div>
        )}

        {/* ==================================================================
            2. SECCIÓN ACTIVA: DAAR (Réplica Exacta de Imagen 3)
            ================================================================== */}
        {activeSection === 'daar' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            
            {/* Píldora de Categoría */}
            <div className="mb-3">
              <span className="inline-block bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                TRÁMITES ACADÉMICOS
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mb-2">
              DAAR – Servicios Académicos y Registro
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Es la oficina para todo lo que afecta tu matrícula, tus notas y tu plan de estudios.
            </p>

            {/* Franja Celeste de 4 Columnas (Exacta a Imagen 3) */}
            <div className="bg-[#EBF3FC] rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-blue-100 text-xs">
              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">CORREO</div>
                <button
                  onClick={() => copyToClipboard(DAAR_DATA.header.correo, "¡Correo de DAAR copiado!")}
                  className="font-bold text-[#1E40AF] hover:underline text-left flex items-center gap-1"
                >
                  <span>{DAAR_DATA.header.correo}</span>
                  <Icon name="copy" className="w-3 h-3 text-slate-400" />
                </button>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">WEB</div>
                <a href={DAAR_DATA.header.web} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1E40AF] hover:underline">
                  {DAAR_DATA.header.webTexto}
                </a>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">MATRÍCULA</div>
                <a href={DAAR_DATA.header.matricula} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1E40AF] hover:underline">
                  {DAAR_DATA.header.matriculaTexto}
                </a>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">GRADOS Y TÍTULOS</div>
                <button
                  onClick={() => copyToClipboard(DAAR_DATA.header.grados, "¡Correo de Grados y Títulos copiado!")}
                  className="font-bold text-[#1E40AF] hover:underline text-left flex items-center gap-1"
                >
                  <span>{DAAR_DATA.header.grados}</span>
                  <Icon name="copy" className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* ==============================================================
                BOTONES INTERACTIVOS DE LAS 4 ÁREAS DE DAAR
                (Organizado con muy pocas letras para evitar muros de texto)
                ============================================================== */}
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Elige la categoría del trámite:
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {DAAR_DATA.categories.map((cat) => {
                  const isCatActive = activeDaarCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveDaarCat(cat.id);
                        setActiveDaarItem(cat.items[0]);
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isCatActive
                          ? 'bg-[#0B2240] text-white border-[#0B2240] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{cat.title}</div>
                      <div className={`text-[11px] mt-0.5 ${isCatActive ? 'text-blue-200' : 'text-slate-500'}`}>
                        {cat.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==============================================================
                2. BOTONES INTERACTIVOS PARA CADA TRÁMITE DE ESA CATEGORÍA
                ============================================================== */}
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Selecciona el trámite para ver sus requisitos y asunto oficial:
              </div>

              <div className="flex flex-wrap gap-2">
                {currentDaarCategory.items.map((item) => {
                  const isItemActive = activeDaarItem && activeDaarItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveDaarItem(item)}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-1.5 ${
                        isItemActive
                          ? 'bg-[#1E40AF] text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-700'
                      }`}
                    >
                      <span>{item.nombre}</span>
                      {isItemActive && <Icon name="check" className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==============================================================
                3. DETALLE COMPLETO Y ASUNTO PRE-ARMADO (100% Sin Recortes)
                ============================================================== */}
            {activeDaarItem && (
              <div className="bg-slate-50 border-2 border-blue-200 rounded-2xl p-5 sm:p-6 mb-8 animate-fade-in">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                      {currentDaarCategory.title} · Trámite Oficial UP
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2240]">
                      {activeDaarItem.nombre}
                    </h3>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                    Destino: <strong className="text-slate-800">{activeDaarItem.correo}</strong>
                  </div>
                </div>

                {/* Texto Oficial Textual */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-5">
                  {activeDaarItem.descripcion}
                </p>

                {/* Generador de Asunto Oficial */}
                <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B2240] uppercase tracking-wider text-[11px]">
                      Fórmula de Asunto Oficial Pre-armada:
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Código activo: <strong className="text-amber-700 font-mono">{studentCode || '20231234'}</strong>
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-2">
                    <span className="font-semibold break-all">
                      «{activeDaarItem.nombre} – {studentCode || '20231234'}»
                    </span>
                    <button
                      onClick={() => {
                        const subj = `${activeDaarItem.nombre} – ${studentCode || '20231234'}`;
                        copyToClipboard(subj, "¡Asunto oficial copiado!");
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-200 text-xs font-sans font-bold flex items-center gap-1 transition"
                      title="Copiar fórmula"
                    >
                      <Icon name="copy" className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </button>
                  </div>
                </div>

                {/* Botones de Acción Inmediata */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${activeDaarItem.correo}?subject=${encodeURIComponent(`${activeDaarItem.nombre} – ${studentCode || '20231234'}`)}`}
                    className="px-4 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Icon name="mail" className="w-3.5 h-3.5" />
                    <span>Redactar en mi Correo UP</span>
                  </a>

                  <button
                    onClick={() => copyToClipboard(activeDaarItem.correo, "¡Correo institucional copiado!")}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5"
                  >
                    <Icon name="copy" className="w-3.5 h-3.5" />
                    <span>Copiar {activeDaarItem.correo}</span>
                  </button>

                  {activeDaarItem.web && (
                    <a
                      href={activeDaarItem.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
                    >
                      <span>Web oficial</span>
                      <Icon name="external-link" className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            )}

            {/* Recordatorio del Calendario Académico */}
            <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <Icon name="info" className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-slate-800">Consejo:</strong> antes de escribir, revisa el calendario académico; muchos trámites (retiro, reprogramación, reclamos) tienen fechas límite.
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================
            3. SECCIÓN ACTIVA: BFE (Bienestar y Vida Universitaria)
            ================================================================== */}
        {activeSection === 'bfe' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            
            {/* Píldora de Categoría */}
            <div className="mb-3">
              <span className="inline-block bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                BIENESTAR Y VIDA UNIVERSITARIA
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mb-2">
              BFE – Dirección de Bienestar y Formación Estudiantil
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Contribuir al bienestar y a la formación integral del estudiante (Bienestar Estudiantil y Formación y Experiencia Estudiantil).
            </p>

            {/* Franja Celeste de Datos Institucionales */}
            <div className="bg-[#EBF3FC] rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-blue-100 text-xs">
              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">CORREO</div>
                <button
                  onClick={() => copyToClipboard(BFE_DATA.header.correo, "¡Correo bfe@up.edu.pe copiado!")}
                  className="font-bold text-[#1E40AF] hover:underline text-left flex items-center gap-1"
                >
                  <span>{BFE_DATA.header.correo}</span>
                  <Icon name="copy" className="w-3 h-3 text-slate-400" />
                </button>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">UBICACIÓN</div>
                <div className="font-semibold text-slate-800">{BFE_DATA.header.ubicacion}</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">HORARIO</div>
                <div className="font-semibold text-slate-800">{BFE_DATA.header.horario}</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">CENTRAL / WEB</div>
                <div className="font-bold text-[#1E40AF]">{BFE_DATA.header.central}</div>
              </div>
            </div>

            {/* ==============================================================
                BOTONES INTERACTIVOS DE LAS 5 ÁREAS DE BFE
                ============================================================== */}
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Selecciona el área de bienestar o formación:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {BFE_DATA.categories.map((cat) => {
                  const isCatActive = activeBfeCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveBfeCat(cat.id);
                        setActiveBfeItem(null);
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isCatActive
                          ? 'bg-[#0B2240] text-white border-[#0B2240] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs">{cat.title}</div>
                      <div className={`text-[10px] mt-0.5 ${isCatActive ? 'text-blue-200' : 'text-slate-500'}`}>
                        {cat.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-panel 1: Consejería Universitaria */}
            {activeBfeCat === 'consejeria' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 animate-fade-in space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0B2240]">
                    Consejería Universitaria Psicológica y Estudiantil
                  </h3>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    Gratuita y Confidencial
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {currentBfeCategory.descripcion}
                </p>

                <div className="space-y-3 pt-2">
                  {currentBfeCategory.pasos.map((paso) => (
                    <div key={paso.num} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#1E40AF] text-white font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                        {paso.num}
                      </span>
                      <span className="text-slate-800">{paso.titulo}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2.5 pt-3">
                  <a
                    href={`mailto:consejeriapsicologica@up.edu.pe?subject=${encodeURIComponent(`Solicitud Consejería Psicológica – ${studentCode || '20231234'}`)}`}
                    className="px-4 py-2 bg-[#1E40AF] text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition"
                  >
                    Solicitar Cita Psicológica
                  </a>
                  <a
                    href={`mailto:consejeriaestudiantil@up.edu.pe?subject=${encodeURIComponent(`Solicitud Consejería Estudiantil – ${studentCode || '20231234'}`)}`}
                    className="px-4 py-2 bg-blue-50 text-[#1E40AF] font-bold text-xs rounded-xl hover:bg-blue-100 border border-blue-200 transition"
                  >
                    Solicitar Cita Estudiantil
                  </a>
                  <a
                    href={currentBfeCategory.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-white text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 hover:bg-slate-100 transition flex items-center gap-1.5"
                  >
                    <span>Folleto Oficial PDF 2025</span>
                    <Icon name="external-link" className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Sub-panel 2: Apoyo Académico y NEE */}
            {activeBfeCat === 'apoyo' && (
              <div className="space-y-3 mb-6 animate-fade-in">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Programas y apoyos disponibles (clic para ver el detalle oficial):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentBfeCategory.items.map((item) => (
                    <div key={item.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <div className="font-bold text-sm text-[#0B2240]">{item.nombre}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.texto}</p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500">{item.correo}</span>
                        <a
                          href={`mailto:${item.correo}?subject=${encodeURIComponent(`${item.nombre} – ${studentCode || '20231234'}`)}`}
                          className="px-2.5 py-1 bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 rounded text-xs font-bold transition"
                        >
                          Escribir a BFE
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-panel 3: EFE */}
            {activeBfeCat === 'efe' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-[#0B2240]">
                  Experiencias Formativas Estudiantiles (EFE)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {currentBfeCategory.descripcion}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-[#0B2240] block mb-1">EFE Obligatorias:</span>
                    <p className="text-slate-600">{currentBfeCategory.obligatorias}</p>
                  </div>
                  <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-amber-950">
                    <span className="font-bold block mb-1">★ Convalidación de 1 Crédito EFE Voluntario:</span>
                    <p className="text-amber-900">{currentBfeCategory.voluntarias}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  {currentBfeCategory.enlaces.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-400 font-semibold text-[#1E40AF] flex items-center gap-1.5 transition"
                    >
                      <span>{link.nombre} ({link.ig})</span>
                      <Icon name="external-link" className="w-3 h-3" />
                    </a>
                  ))}
                  <a
                    href={currentBfeCategory.flujogramaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#1E40AF] text-white rounded-xl font-bold hover:bg-blue-800 transition"
                  >
                    Ver Nuevo Flujograma EFE
                  </a>
                </div>
              </div>
            )}

            {/* Sub-panel 4: Espacios Pabellón Z */}
            {activeBfeCat === 'espacios' && (
              <div className="space-y-4 mb-6 animate-fade-in">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Instalaciones en Jr. Sánchez Cerro 2215 (presiona cada espacio para ver sus condiciones):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {currentBfeCategory.items.map((espacio) => {
                    const isSelected = activeBfeItem && activeBfeItem.id === espacio.id;
                    return (
                      <button
                        key={espacio.id}
                        onClick={() => setActiveBfeItem(espacio)}
                        className={`p-3 rounded-xl text-left border transition ${
                          isSelected
                            ? 'bg-[#1E40AF] text-white border-blue-600 shadow-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs truncate">{espacio.nombre}</div>
                        <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {espacio.ubicacion}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detalle del Espacio */}
                {activeBfeItem && (
                  <div className="bg-slate-50 border border-blue-200 rounded-xl p-4 animate-fade-in text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0B2240]">{activeBfeItem.nombre}</span>
                      <span className="text-slate-500 bg-white px-2 py-0.5 rounded border">{activeBfeItem.ubicacion}</span>
                    </div>
                    <div><strong>Horario:</strong> {activeBfeItem.horario}</div>
                    <div className="text-slate-600 leading-relaxed">{activeBfeItem.detalle}</div>
                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={`mailto:${activeBfeItem.correo}?subject=${encodeURIComponent(`Consulta ${activeBfeItem.nombre} – ${studentCode || '20231234'}`)}`}
                        className="px-3 py-1 bg-[#1E40AF] text-white rounded font-bold hover:bg-blue-800 transition"
                      >
                        Consultar a {activeBfeItem.correo}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sub-panel 5: 18 FAQs */}
            {activeBfeCat === 'faqs' && (
              <div className="space-y-2.5 mb-6 animate-fade-in">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Las 18 preguntas oficiales más consultadas:
                </div>

                <div className="space-y-2">
                  {currentBfeCategory.faqs.map((faq, idx) => {
                    const isOpen = activeBfeItem === idx;
                    return (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setActiveBfeItem(isOpen ? null : idx)}
                          className="w-full text-left p-3.5 font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-700 flex items-center justify-between gap-3"
                        >
                          <span>{faq.q}</span>
                          <Icon name={isOpen ? "chevron-down" : "chevron-right"} className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-3.5 text-xs text-slate-600 border-t border-slate-200/60 pt-2.5 leading-relaxed bg-white">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================================================================
            SECCIÓN ACTIVA: DIRECTORIO DE CONTACTOS
            ================================================================== */}
        {activeSection === 'directorio' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            
            {/* Píldora de Categoría */}
            <div className="mb-3">
              <span className="inline-block bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                DIRECTORIO OFICIAL
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mb-2">
              Directorio de contactos – Universidad del Pacífico
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Canales oficiales, anexos y correos de facultades, escuelas, servicios administrativos y empleabilidad.
            </p>

            {/* Franja Celeste */}
            <div className="bg-[#EBF3FC] rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-blue-100 text-xs">
              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">CENTRAL TELEFÓNICA</div>
                <div className="font-bold text-[#1E40AF]">{DIRECTORIO_DATA.header.central}</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">SEDE PRINCIPAL</div>
                <div className="font-semibold text-slate-800">{DIRECTORIO_DATA.header.sede}</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">PORTAL WEB</div>
                <div className="font-bold text-[#1E40AF]">{DIRECTORIO_DATA.header.portal}</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">ADMISIÓN DIRECTO</div>
                <div className="font-semibold text-slate-800">{DIRECTORIO_DATA.header.admisionDirecto}</div>
              </div>
            </div>

            {/* ==============================================================
                BOTONES INTERACTIVOS DE LAS 5 CATEGORÍAS DEL DIRECTORIO
                ============================================================== */}
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Selecciona la categoría del directorio:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {DIRECTORIO_DATA.categories.map((cat) => {
                  const isCatActive = activeDirCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveDirCat(cat.id);
                        setActiveDirItem(cat.items[0]);
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isCatActive
                          ? 'bg-[#0B2240] text-white border-[#0B2240] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs">{cat.title}</div>
                      <div className={`text-[10px] mt-0.5 ${isCatActive ? 'text-blue-200' : 'text-slate-500'}`}>
                        {cat.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botones y Detalle de la Categoría Seleccionada */}
            <div className="space-y-3 mb-6 animate-fade-in">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Dependencias registradas en {currentDirCategory.title}:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentDirCategory.items.map((item) => (
                  <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 hover:border-blue-400 transition">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-sm text-[#0B2240]">{item.nombre}</div>
                      {item.anexo && (
                        <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700 whitespace-nowrap">
                          Anexo {item.anexo}
                        </span>
                      )}
                      {item.telefono && (
                        <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 whitespace-nowrap">
                          {item.telefono}
                        </span>
                      )}
                    </div>

                    {item.carreras && (
                      <div className="text-xs text-slate-600">
                        <strong>Carreras:</strong> {item.carreras}
                      </div>
                    )}

                    {item.redes && (
                      <div className="text-[11px] text-slate-500">
                        {item.ubicacion && <span className="font-semibold text-slate-700">{item.ubicacion} · </span>}
                        {item.redes}
                      </div>
                    )}

                    {item.detalle && (
                      <div className="text-xs text-slate-600">
                        {item.detalle}
                      </div>
                    )}

                    {item.correo && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                        <button
                          onClick={() => copyToClipboard(item.correo, `¡Correo ${item.correo} copiado!`)}
                          className="font-bold text-xs text-[#1E40AF] hover:underline flex items-center gap-1"
                        >
                          <span>{item.correo}</span>
                          <Icon name="copy" className="w-3 h-3 text-slate-400" />
                        </button>
                        <a
                          href={`mailto:${item.correo}?subject=${encodeURIComponent(`Consulta ${item.nombre} – ${studentCode || '20231234'}`)}`}
                          className="px-2.5 py-1 bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 rounded text-xs font-bold transition"
                        >
                          Redactar
                        </a>
                      </div>
                    )}

                    {item.web && (
                      <div className="pt-2">
                        <a
                          href={item.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
                        >
                          <span>Visitar portal web</span>
                          <Icon name="external-link" className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ====================================================================
          TOAST DE NOTIFICACIÓN FLOTANTE
          ==================================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2240] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-400 text-xs sm:text-sm flex items-center gap-2 animate-bounce">
          <Icon name="check" className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          PIE DE PÁGINA INSTITUCIONAL LIMPIO
          ==================================================================== */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Universidad del Pacífico · Sistema de Canales y Trámites para Pregrado
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveSection('rapido')} className="hover:text-blue-700 underline">Buscador rápido</button>
            <button onClick={() => setActiveSection('daar')} className="hover:text-blue-700 underline">DAAR</button>
            <button onClick={() => setActiveSection('bfe')} className="hover:text-blue-700 underline">BFE</button>
            <button onClick={() => setActiveSection('directorio')} className="hover:text-blue-700 underline">Directorio</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Renderizado directo
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
