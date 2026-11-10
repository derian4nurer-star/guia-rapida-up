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
    ),
    key: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    ),
    chat: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    ),
    music: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    ),
    book: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
    shield: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    globe: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    ),
    academic: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    ),
    doc: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    instagram: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 3h11A3.5 3.5 0 0121 6.5v11a3.5 3.5 0 01-3.5 3.5h-11A3.5 3.5 0 013 17.5v-11A3.5 3.5 0 016.5 3z" />
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
    "id": "br-1",
    "duda": "Matrícula, reserva de matrícula, retiro de curso o de semestre",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://daar.up.edu.pe/matricula",
    "enlaceTexto": "daar.up.edu.pe/matricula",
    "categoria": "Trámites Curriculares",
    "detalle": "Gestión directa con DAAR para retiros de cursos, reserva de matrícula y trámite regular de matrícula semestral.",
    "seccion": "daar",
    "subCat": "durante-semestre"
  },
  {
    "id": "br-2",
    "duda": "Reprogramar un examen, reclamos de notas, devolución de exámenes",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://daar.up.edu.pe",
    "enlaceTexto": "daar.up.edu.pe",
    "categoria": "Evaluaciones y Calificaciones",
    "detalle": "Reprogramación de exámenes parciales, finales, reclamos de pruebas o devolución formal de pruebas corregidas.",
    "seccion": "daar",
    "subCat": "examenes-notas"
  },
  {
    "id": "br-3",
    "duda": "Traslado interno, agregar carrera, examen de suficiencia de idioma",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://daar.up.edu.pe",
    "enlaceTexto": "daar.up.edu.pe",
    "categoria": "Régimen Académico",
    "detalle": "Cambios de especialidad interna, doble titulación/carrera simultánea y acreditación de suficiencia del idioma extranjero.",
    "seccion": "daar",
    "subCat": "durante-semestre"
  },
  {
    "id": "br-4",
    "duda": "Sumillas, requisitos, equivalencias, Sello UP, concentraciones",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://daar.up.edu.pe",
    "enlaceTexto": "daar.up.edu.pe",
    "categoria": "Plan Curricular",
    "detalle": "Información curricular oficial, sumillas para convalidaciones externas, requisitos de Sello UP y menciones de concentración.",
    "seccion": "daar",
    "subCat": "plan-estudios"
  },
  {
    "id": "br-5",
    "duda": "Tesis, trabajo de suficiencia profesional, diplomas",
    "canal": "Grados y Títulos",
    "dot": "bg-blue-600",
    "correo": "gradosytitulos@up.edu.pe",
    "enlace": "https://daar.up.edu.pe",
    "enlaceTexto": "gradosytitulos@up.edu.pe",
    "categoria": "Graduación y Titulación",
    "detalle": "Modalidades de obtención del título profesional (tesis y TSP), duplicados de diploma y trámites de bachiller.",
    "seccion": "daar",
    "subCat": "grados-titulos"
  },
  {
    "id": "br-6",
    "duda": "Dudas propias de tu carrera",
    "canal": "Tu facultad",
    "dot": "bg-purple-600",
    "correo": "fce@up.edu.pe",
    "contactoTexto": "Ver sección Directorio",
    "categoria": "Facultades",
    "detalle": "Consultas directas a las secretarías académicas de Ciencias Empresariales, Derecho, Economía y Finanzas o Ingeniería.",
    "seccion": "directorio",
    "subCat": "facultades"
  },
  {
    "id": "br-7",
    "duda": "Pensiones, cuotas y pagos",
    "canal": "Pensiones / Tesorería",
    "dot": "bg-amber-600",
    "correo": "pensiones@up.edu.pe",
    "correoAlt": "tesoreria@up.edu.pe",
    "enlaceTexto": "pensiones@up.edu.pe",
    "categoria": "Tesorería y Pensiones",
    "detalle": "Cronograma de pagos, dudas sobre escala de pensiones, prórrogas de cuotas y estados de cuenta.",
    "seccion": "directorio",
    "subCat": "oficinas"
  },
  {
    "id": "br-8",
    "duda": "Un problema personal, emocional, familiar o vocacional",
    "canal": "Consejería BFE",
    "dot": "bg-emerald-600",
    "correo": "consejeriapsicologica@up.edu.pe",
    "correoAlt": "consejeriaestudiantil@up.edu.pe",
    "enlaceTexto": "consejeriapsicologica@up.edu.pe",
    "categoria": "Bienestar y Acompañamiento",
    "detalle": "Atención psicológica y estudiantil gratuita y confidencial de BFE en Pabellón Z.",
    "seccion": "bfe",
    "subCat": "consejeria"
  },
  {
    "id": "br-9",
    "duda": "Bajo rendimiento, tutoría, discapacidad o ajustes para estudiar (NEE)",
    "canal": "BFE",
    "dot": "bg-emerald-600",
    "correo": "bfe@up.edu.pe",
    "enlaceTexto": "bfe@up.edu.pe",
    "categoria": "Inclusión y Rendimiento",
    "detalle": "Programa de tutoría para riesgo académico y gestión de ajustes razonables en exámenes para estudiantes con NEE o discapacidad.",
    "seccion": "bfe",
    "subCat": "apoyo"
  },
  {
    "id": "br-10",
    "duda": "Orientación vocacional",
    "canal": "BFE",
    "dot": "bg-emerald-600",
    "correo": "bfe@up.edu.pe",
    "enlaceTexto": "bfe@up.edu.pe",
    "categoria": "Vocación y Formación",
    "detalle": "Jornadas y talleres de orientación vocacional coordinadas periódicamente por Bienestar Estudiantil.",
    "seccion": "bfe",
    "subCat": "apoyo"
  },
  {
    "id": "br-11",
    "duda": "Créditos EFE, elencos, selecciones, Brigada UP, organizaciones",
    "canal": "BFE",
    "dot": "bg-emerald-600",
    "correo": "bfe@up.edu.pe",
    "enlaceTexto": "bfe@up.edu.pe",
    "categoria": "Experiencias Formativas",
    "detalle": "Acreditación y convalidación de créditos EFE (obligatorios y voluntarios), elencos, voluntariado Brigada UP y organizaciones.",
    "seccion": "bfe",
    "subCat": "efe"
  },
  {
    "id": "br-12",
    "duda": "Gimnasio, canchita, casilleros, aula de descanso",
    "canal": "Casa del Estudiante",
    "dot": "bg-emerald-600",
    "correo": "bfe@up.edu.pe",
    "contactoTexto": "Recepción, pabellón Z · bfe@up.edu.pe",
    "categoria": "Instalaciones Pabellón Z",
    "detalle": "Acceso al Gym UP, reserva de canchita deportiva, asignación de casilleros y descanso en el aula Z-201.",
    "seccion": "bfe",
    "subCat": "espacios"
  },
  {
    "id": "br-13",
    "duda": "Guías y planificadores para organizar tu semestre",
    "canal": "Casa UP",
    "dot": "bg-emerald-600",
    "enlace": "https://casaup.up.edu.pe",
    "enlaceTexto": "casaup.up.edu.pe",
    "categoria": "Recursos y Estrategia",
    "detalle": "Planificador Estudiantil UP, guías de estrategia académica y calendario integral descargable.",
    "seccion": "bfe",
    "subCat": "faqs"
  },
  {
    "id": "br-14",
    "duda": "Prácticas preprofesionales y empleo",
    "canal": "Empleabilidad",
    "dot": "bg-purple-600",
    "correo": "practicaspre@up.edu.pe",
    "enlaceTexto": "practicaspre@up.edu.pe",
    "categoria": "Desarrollo Profesional",
    "detalle": "Validación de convenios de prácticas preprofesionales, bolsa de trabajo y ferias laborales.",
    "seccion": "empleabilidad"
  },
  {
    "id": "br-15",
    "duda": "Intercambio de un semestre en el extranjero (Outgoing)",
    "canal": "ORI",
    "dot": "bg-rose-600",
    "correo": "outgoing@up.edu.pe",
    "enlace": "https://intercambio.up.edu.pe",
    "enlaceTexto": "intercambio.up.edu.pe",
    "categoria": "Movilidad Internacional",
    "detalle": "Estudia un semestre en universidades de América, Europa, Asia u Oceanía. Mínimo 20 créditos, promedio ponderado ≥ 13.00, inglés avanzado e inscripción en el sistema de intercambio.",
    "seccion": "ori"
  },
  {
    "id": "br-16",
    "duda": "Olvidé mi contraseña, correo UP, Blackboard, PowerCampus o Canvas bloqueado",
    "canal": "T2D – Soporte Tecnológico",
    "dot": "bg-cyan-500",
    "correo": "t2d@up.edu.pe",
    "enlace": "https://serviciost2d.up.edu.pe/",
    "enlaceTexto": "serviciost2d.up.edu.pe",
    "categoria": "Soporte TI y Accesos",
    "detalle": "Mesa de ayuda para restablecimiento de claves institucionales, desbloqueo de cuenta Google UP y soporte técnico de plataformas.",
    "seccion": "t2d"
  },
  {
    "id": "br-17",
    "duda": "Duplicado de carné universitario o carné de medio pasaje",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://powercampus.up.edu.pe",
    "enlaceTexto": "powercampus.up.edu.pe",
    "categoria": "Identificación Estudiantil",
    "detalle": "Solicitud virtual en PowerCampus: Información General → Trámites y Documentos. Costo oficial S/ 40.00 con foto formal.",
    "seccion": "daar",
    "subCat": "tramites-grado"
  },
  {
    "id": "br-18",
    "duda": "Constancia de matrícula, récord de notas, certificados de estudios o puesto en el ranking",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://daar.up.edu.pe",
    "enlaceTexto": "daar.up.edu.pe",
    "categoria": "Certificados y Récords",
    "detalle": "Emisión de constancias de estudios, orden de mérito, récord histórico y certificados oficiales con firma digital.",
    "seccion": "daar",
    "subCat": "tramites-grado"
  },
  {
    "id": "br-19",
    "duda": "Atención médica, emergencias en el campus, tópico o justificación médica de faltas",
    "canal": "Tópico Médico BFE",
    "dot": "bg-emerald-600",
    "correo": "medico@up.edu.pe",
    "contactoTexto": "Pabellón C, 1.° piso (al lado de Plaza Geis)",
    "categoria": "Salud y Tópico",
    "detalle": "Primeros auxilios, atención ambulatoria en campus y validación de descansos médicos para justificar inasistencias a evaluaciones.",
    "seccion": "bfe",
    "subCat": "espacios"
  },
  {
    "id": "br-20",
    "duda": "Disney Academic Exchange: prácticas remuneradas y cursos en Walt Disney World Resort",
    "canal": "ORI",
    "dot": "bg-rose-600",
    "correo": "intercambios@up.edu.pe",
    "enlace": "https://intercambio.up.edu.pe",
    "enlaceTexto": "intercambio.up.edu.pe",
    "categoria": "Experiencias Internacionales",
    "detalle": "Programa semestral de experiencia académica y prácticas en Orlando, Florida. Para alumnos regulares con inglés fluido y entrevista aprobada.",
    "seccion": "ori"
  },
  {
    "id": "br-21",
    "duda": "Programas cortos en el extranjero, misiones académicas o Faculty-Led Programs",
    "canal": "ORI",
    "dot": "bg-rose-600",
    "correo": "intercambios@up.edu.pe",
    "enlace": "https://intercambio.up.edu.pe",
    "enlaceTexto": "intercambio.up.edu.pe",
    "categoria": "Programas Cortos ORI",
    "detalle": "Cursos intensivos y visitas académicas internacionales de 2 a 4 semanas en universidades aliadas durante vacaciones de enero y julio.",
    "seccion": "ori"
  },
  {
    "id": "br-22",
    "duda": "Grupos de WhatsApp por carrera y ciclo, banco de sílabos o música de estudio",
    "canal": "Programa REA",
    "dot": "bg-violet-600",
    "correo": "progreaup@up.edu.pe",
    "contactoTexto": "Instagram @progreaup",
    "categoria": "Comunidad y Recursos REA",
    "detalle": "Comunidad estudiantil: enlaces a grupos de WhatsApp 'REA sin contactar', banco de sílabos hasta 2025-1, buzón de consultas y playlists de estudio.",
    "seccion": "representacion"
  },
  {
    "id": "br-23",
    "duda": "Causales de baja académica, apoyo en proyectos de ingeniería ('Tu amigo Inge') o doble grado",
    "canal": "REUP",
    "dot": "bg-violet-600",
    "correo": "reup@up.edu.pe",
    "contactoTexto": "Instagram @reupcontigo",
    "categoria": "Representación Estudiantil",
    "detalle": "Guía de causales de baja en PDF, exámenes pasados y asesoría con 'Tu amigo Inge', afiches de Doble Grado (UOL, Rennes, HEC) y comunidad oficial.",
    "seccion": "representacion"
  },
  {
    "id": "br-24",
    "duda": "Préstamo de libros físicos, cubículos para trabajo en equipo o bases de datos académicas",
    "canal": "Biblioteca Central UP",
    "dot": "bg-indigo-600",
    "correo": "biblioteca@up.edu.pe",
    "contactoTexto": "Pabellón B (Central) · Anexos 2125 / 2126",
    "categoria": "Biblioteca y Recursos",
    "detalle": "Reserva de cubículos grupales, acceso a JSTOR, Scopus, Bloomberg, repositorio de tesis y préstamo a domicilio de bibliografía de cursos.",
    "seccion": "directorio",
    "subCat": "oficinas"
  },
  {
    "id": "br-25",
    "duda": "Acreditación y convalidación del requisito de idioma inglés obligatorio para graduarse",
    "canal": "Centro de Idiomas / DAAR",
    "dot": "bg-blue-600",
    "correo": "idiomas@up.edu.pe",
    "correoAlt": "pregrado@up.edu.pe",
    "categoria": "Requisito de Idioma",
    "detalle": "Exámenes de nivelación, tablas de convalidación de exámenes internacionales (TOEFL, IELTS, Cambridge) y registro del requisito en DAAR.",
    "seccion": "daar",
    "subCat": "durante-semestre"
  },
  {
    "id": "br-26",
    "duda": "Recálculo socioeconómico de escala, becas de pensión, cuotas desdobladas o fraccionamiento",
    "canal": "Pensiones UP",
    "dot": "bg-amber-600",
    "correo": "pensiones@up.edu.pe",
    "contactoTexto": "Oficina de Pensiones · Anexos 2145 / 2146",
    "categoria": "Escalas y Pensiones",
    "detalle": "Evaluación para cambio de escala por imprevistos socioeconómicos, cronograma de boletas, moras y solicitudes de fraccionamiento.",
    "seccion": "directorio",
    "subCat": "oficinas"
  },
  {
    "id": "br-27",
    "duda": "Firma de convenios de prácticas preprofesionales, cartas de presentación y convalidación",
    "canal": "Empleabilidad",
    "dot": "bg-purple-600",
    "correo": "practicaspre@up.edu.pe",
    "contactoTexto": "Oficina de Empleabilidad · Anexo 2253",
    "categoria": "Convenios de Prácticas",
    "detalle": "Revisión y firma del Convenio de Prácticas y Plan de Capacitación según la Ley 28518, registro curricular y emisión de cartas para empresas.",
    "seccion": "empleabilidad"
  },
  {
    "id": "br-28",
    "duda": "Secretaría de Ingeniería, salón F400, laboratorios tecnológicos o proyectos de sistemas",
    "canal": "Facultad de Ingeniería (F400)",
    "dot": "bg-purple-600",
    "correo": "ingenieria@up.edu.pe",
    "contactoTexto": "Pabellón F, Piso 4 (Salón F400) · Anexo 2336",
    "categoria": "Facultades",
    "detalle": "Atención especializada para alumnos de Ingeniería de la Información, Empresarial e Industrial en el Salón F400.",
    "seccion": "directorio",
    "subCat": "facultades"
  },
  {
    "id": "br-29",
    "duda": "Conexión a Wifi UP / Eduroam, licencias de software (SPSS, Stata, Office 365, Power BI)",
    "canal": "T2D – Soporte Tecnológico",
    "dot": "bg-cyan-500",
    "correo": "t2d@up.edu.pe",
    "enlace": "https://serviciost2d.up.edu.pe/",
    "enlaceTexto": "serviciost2d.up.edu.pe",
    "categoria": "Software y Conectividad",
    "detalle": "Descarga de software académico oficial para cursos de pregrado, configuración de red inalámbrica Eduroam y soporte técnico.",
    "seccion": "t2d"
  },
  {
    "id": "br-30",
    "duda": "Reincorporación de estudios tras suspensión temporal, reserva o retiro de ciclo",
    "canal": "DAAR",
    "dot": "bg-blue-600",
    "correo": "pregrado@up.edu.pe",
    "enlace": "https://daar.up.edu.pe",
    "enlaceTexto": "daar.up.edu.pe",
    "categoria": "Reincorporación Académica",
    "detalle": "Trámite de retorno para estudiantes que reservaron matrícula o suspendieron estudios y desean reactivar su condición académica regular.",
    "seccion": "daar",
    "subCat": "durante-semestre"
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
      obligatorias: "Para ingresantes a partir de 2022-I: deben acreditar obligatoriamente 4 créditos EFE para egresar. Para ingresantes entre 2017-I y 2021-II: consultar el reglamento correspondiente en el portal de estudiantes.",
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
          nombre: "Oficina de Servicios Académicos y Registro (DAAR) — Ventanilla Presencial",
          correo: "pregrado@up.edu.pe",
          anexo: "8990",
          detalle: "Atención física en ventanilla y consultas telefónicas. Para trámites curriculares (matrícula, retiros, notas, sumillas), usa el módulo interactivo de DAAR."
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
      badge: "Intercambios, Disney y Becas",
      tipo: "ori_panel",
      headerInfo: {
        direccion: "Jr. Gral. Luis Sánchez Cerro 2141, Jesús María, Lima, Perú",
        central: "(01) 219-0100",
        correoOutgoing: "outgoing@up.edu.pe",
        correoShort: "shortprograms@up.edu.pe",
        web: "https://ori.up.edu.pe/"
      },
      outgoing: {
        titulo: "Outgoing: Programas de Intercambio Semestral",
        subtitulo: "Estudia un semestre académico en prestigiosas universidades de América, Europa, Asia u Oceanía",
        beneficios: [
          "Estudiar en una universidad extranjera durante un semestre académico",
          "Conocer otras culturas y sistemas educativos de vanguardia internacional",
          "Acceder a nuevas metodologías de enseñanza y redes globales",
          "Perfeccionar un idioma extranjero en inmersión académica y cultural",
          "Reconocimiento de cursos aprobados como electivos en el extranjero"
        ],
        requisitos: [
          "Mínimo 20 créditos acumulados al momento de postular",
          "Promedio ponderado acumulado igual o mayor a 13.00",
          "No encontrarse en riesgo académico ni en proceso disciplinario",
          "Nivel avanzado de inglés acreditado (certificado ≤ 2 años de antigüedad)"
        ],
        convocatorias: [
          { periodo: "1.er Semestre", fechas: "Enero – Mayo" },
          { periodo: "2.º Semestre", fechas: "Setiembre – Diciembre" }
        ],
        pagos: [
          { concepto: "Aplicación al programa", monto: "S/ 165 (no reembolsable)" },
          { concepto: "Aceptación de vacante", monto: "S/ 275 (no reembolsable)" },
          { concepto: "< 180 créditos acumulados", monto: "S/ 165 adicionales" },
          { concepto: "≥ 180 créditos acumulados", monto: "US$ 550 adicionales (excepto Derecho)" },
          { concepto: "Derecho con ≥ 210 créditos", monto: "US$ 550 adicionales" },
          { concepto: "Egresados (hasta 1 año)", monto: "US$ 1,100" }
        ],
        consideraciones: "Exoneración de pensiones en la universidad anfitriona. Los cursos pasan por prerreconocimiento oficial y se pagan en 4 armadas según tu escala UP. Retiro voluntario post-firma: S/ 330.",
        enlaces: [
          { texto: "Inicio de Aplicación", url: "https://intercambio.up.edu.pe" },
          { texto: "Sistema de Intercambio Estudiantil", url: "https://intercambio.up.edu.pe" },
          { texto: "Requisitos Generales", url: "https://ori.up.edu.pe" }
        ]
      },
      programasCortos: {
        facultyLed: {
          titulo: "Faculty Led Programs (Electivos en el extranjero)",
          creditos: "3 o 4 créditos académicos + 1 crédito de internacionalización",
          desc: "Cursos intensivos en el extranjero guiados por un docente de la UP para profundizar una disciplina con experiencia internacional directa.",
          ejemplos: [
            "Silicon Valley (San Francisco, EE. UU.) · Innovación, Tecnología y Emprendimiento",
            "Asia Tech (Corea del Sur y China) · Ecosistema Emprendedor",
            "Feria Anuga (Colonia, Alemania) · Global Manager Assistant",
            "Sostenibilidad empresarial y modelos de negocios circulares"
          ],
          requisitos: "> 18 años, prerrequisitos del curso, pasaporte vigente y visa si aplica. El costo no incluye pasajes ni gastos personales."
        },
        misiones: {
          titulo: "Misiones Académicas",
          creditos: "2 créditos académicos + 1 crédito de internacionalización",
          desc: "Experiencias formativas internacionales que combinan visitas a instituciones académicas y corporativas con actividades aplicativas y culturales.",
          requisitos: "> 18 años, pasaporte vigente y visa si aplica. Acompañamiento docente o de staff UP."
        },
        tailorMade: {
          titulo: "Tailor-made Programs",
          desc: "Programas a medida orientados a instituciones internacionales (seminarios, conferencias y talleres virtuales o presenciales).",
          contacto: "shortprograms@up.edu.pe"
        }
      },
      disney: {
        titulo: "Disney Academic Exchange",
        subtitulo: "Experiencia académica universitaria y prácticas profesionales en Walt Disney World",
        fases: [
          { fase: "1. Fase Académica", detalle: "10 días de clases intensivas en Montclair State University (New Jersey, EE. UU.)" },
          { fase: "2. Fase de Prácticas", detalle: "Periodo oficial de prácticas remuneradas en Walt Disney World (Orlando, Florida)" }
        ],
        beneficios: [
          "Reconocimiento de 6 créditos académicos UP",
          "Reconocimiento de 1 práctica preprofesional",
          "1 crédito de internacionalización"
        ],
        certificaciones: [
          { examen: "TOEFL", puntaje: "70+" },
          { examen: "IELTS", puntaje: "6.0+" },
          { examen: "Duolingo English Test", puntaje: "95+" },
          { examen: "TOEIC", puntaje: "650+" }
        ],
        requisitos: "Mayor de 18 años al momento de postular, alumno de pregrado UP, pasaporte vigente, promedio aprobado, constancia de notas por periodo y certificado de inglés (≤ 2 años de antigüedad).",
        correo: "outgoing@up.edu.pe"
      },
      becas: [
        {
          id: "beca-alianza",
          nombre: "Beca Alianza del Pacífico",
          destinos: "Chile, Colombia y México",
          periodo: "Segundo semestre del año (Convocatoria abril–mayo)",
          requisitos: "Pertenecer al tercio superior, carga mínima de 4 cursos, haber alcanzado la mitad de carrera (5.º ciclo finalizado).",
          beneficios: "Asignación económica mensual, cobertura de seguro médico de asistencia y pasajes de transporte internacional.",
          tag: "Tercio Superior · Desde 5.º ciclo",
          color: "border-amber-200 bg-amber-50/70"
        },
        {
          id: "beca-scotiabank",
          nombre: "Beca Scotiabank (Canadá)",
          destinos: "Canadá (Ciencias Empresariales e Ingeniería)",
          periodo: "Convocatorias periódicas por vacante",
          requisitos: "Alumnos de FCE o Ingeniería hasta 8.º ciclo, mínimo 80 créditos aprobados, 2 cursos de Digital Innovation e inglés certificado.",
          beneficios: "US$ 10,000 para gastos de intercambio, mentorship en Digital Factory Scotiabank Toronto y prácticas preprofesionales en Lima.",
          tag: "FCE & Ingeniería · US$ 10,000",
          color: "border-red-200 bg-red-50/70"
        }
      ],
      convenios: {
        titulo: "UP en el Mundo (Convenios Internacionales)",
        desc: "La Universidad del Pacífico cuenta con acuerdos bilaterales con universidades líderes en los cinco continentes.",
        continentes: [
          { nombre: "América", detalle: "Estados Unidos, Canadá, México, Chile, Colombia, Brasil, Argentina y más." },
          { nombre: "Europa", detalle: "España, Francia, Alemania, Reino Unido, Italia, Países Bajos, Suiza y más." },
          { nombre: "Asia", detalle: "Japón, Corea del Sur, China, Singapur y más." },
          { nombre: "Oceanía", detalle: "Australia y Nueva Zelanda." }
        ],
        link: "https://ori.up.edu.pe"
      },
      faqs: [
        { q: "¿Qué oportunidades ofrece ORI para los estudiantes de pregrado?", a: "Ofrece programas de intercambio semestral (Outgoing), Faculty Led Programs, misiones académicas, Disney Academic Exchange y oportunidades de becas para experiencias internacionales." },
        { q: "¿Puedo estudiar un semestre en el extranjero?", a: "Sí. La UP cuenta con convenios de intercambio con universidades de América, Europa, Asia y Oceanía. Los estudiantes regulares pueden postular siempre que cumplan los requisitos establecidos." },
        { q: "¿Cuántos créditos necesito para postular a un intercambio?", a: "Se requiere haber acumulado un mínimo de 20 créditos al momento de postular." },
        { q: "¿Qué promedio necesito para realizar un intercambio?", a: "El requisito general publicado es tener un promedio ponderado acumulado igual o mayor a 13.00." },
        { q: "¿Necesito saber inglés para postular?", a: "Sí. Para los programas de intercambio se solicita haber alcanzado el nivel avanzado de inglés. Además, cada universidad extranjera puede establecer requisitos específicos de idioma y certificación." },
        { q: "¿Cuánto dura un intercambio académico?", a: "Los programas de intercambio regular tienen una duración de un semestre académico." },
        { q: "¿Los cursos que llevo en el extranjero se reconocen en la UP?", a: "Sí. Los cursos aprobados en la universidad extranjera pueden reconocerse como cursos electivos en el extranjero, siguiendo el procedimiento de prerreconocimiento y las condiciones establecidas por la UP." },
        { q: "¿Tengo que pagar la universidad extranjera durante el intercambio?", a: "La información institucional señala que los estudiantes están exonerados del pago de derechos de enseñanza en la universidad anfitriona durante el intercambio. Sin embargo, existen pagos asociados al proceso de intercambio y al reconocimiento de créditos en la UP." },
        { q: "¿Qué es un Faculty Led Program?", a: "Es un curso internacional de corta duración dirigido por un profesor de la UP. Los estudiantes reciben clases y posteriormente viajan al extranjero para profundizar los conocimientos adquiridos mediante experiencias académicas y culturales." },
        { q: "¿Cuántos créditos puedo obtener mediante un Faculty Led Program?", a: "La oferta institucional señala el reconocimiento de 3 o 4 créditos académicos, dependiendo del programa, además de un crédito de internacionalización." },
        { q: "¿Qué es una misión académica?", a: "Es una experiencia internacional de corta duración que combina visitas a instituciones académicas y organizaciones con actividades académicas, aplicativas y culturales. Permite complementar la formación universitaria mediante el contacto con otras realidades profesionales." },
        { q: "¿Cuántos créditos otorgan las misiones académicas?", a: "La información publicada señala el reconocimiento de 2 créditos académicos y un crédito de internacionalización." },
        { q: "¿Qué es Disney Academic Exchange?", a: "Es un programa que permite participar en una experiencia académica y realizar prácticas en Walt Disney World, en Orlando, Estados Unidos. Comprende una fase académica de 10 días en Montclair State University, New Jersey, seguida de un periodo de prácticas en Disney." },
        { q: "¿Cuáles son los beneficios de Disney Academic Exchange?", a: "Se reconocen 6 créditos académicos UP, una práctica preprofesional y un crédito de internacionalización." },
        { q: "¿Qué requisitos necesito para postular a Disney Academic Exchange?", a: "Debes ser mayor de 18 años, estar matriculado en pregrado en la UP, contar con pasaporte vigente, tener promedio aprobado y presentar una constancia de notas por periodo. Además, necesitas un certificado de inglés vigente según los plazos y puntajes mínimos establecidos por ORI." },
        { q: "¿Qué certificaciones de inglés acepta Disney Academic Exchange?", a: "La página institucional menciona TOEFL (70), IELTS (6), Duolingo English Test (95) y TOEIC (650), con certificados no mayores a dos años." },
        { q: "¿ORI ofrece becas para estudiar en el extranjero?", a: "Sí. En sus materiales se identifican oportunidades como la Beca Alianza del Pacífico y la Beca Scotiabank. Sin embargo, las convocatorias, requisitos y beneficios deben verificarse para cada periodo." },
        { q: "¿Dónde puedo consultar las universidades con las que tiene convenio la UP?", a: "En la sección UP en el mundo del portal de ORI, donde se encuentra el directorio de universidades asociadas." },
        { q: "¿A qué correo puedo escribir para obtener información sobre los intercambios y Disney?", a: "Puedes escribir directamente a outgoing@up.edu.pe." },
        { q: "¿A qué correo puedo escribir para consultar sobre programas cortos?", a: "Puedes escribir a shortprograms@up.edu.pe." }
      ],
      items: [
        {
          id: "ori-oficial",
          nombre: "Oficina de Relaciones Internacionales (ORI)",
          correo: "outgoing@up.edu.pe",
          web: "https://ori.up.edu.pe",
          detalle: "Intercambio semestral, Disney Academic Exchange, programas cortos y becas de movilidad global."
        }
      ]
    },
    {
      id: "t2d",
      title: "Soporte e Informática (T2D)",
      badge: "Claves, Software y Sistemas",
      tipo: "t2d_panel",
      headerInfo: {
        web: "https://serviciost2d.up.edu.pe/",
        webTexto: "serviciost2d.up.edu.pe",
        horario: "Lunes a Viernes 7:30 a.m. – 9:30 p.m. · Sábados 7:30 a.m. – 5:00 p.m."
      },
      servicios: [
        {
          id: "t2d-1",
          nombre: "Recuperar Contraseña",
          icono: "key",
          tag: "Autoservicio",
          color: "border-cyan-200 bg-cyan-50/70 text-cyan-900",
          tagColor: "bg-cyan-100 text-cyan-800",
          detalle: "Restablecimiento inmediato de contraseña de correo institucional @up.edu.pe y plataformas de la universidad.",
          enlace: "https://serviciost2d.up.edu.pe/",
          enlaceTexto: "Restablecer en T2D"
        },
        {
          id: "t2d-2",
          nombre: "Clases Virtuales y Software UP",
          icono: "sparkles",
          tag: "Aulas & Licencias",
          color: "border-blue-200 bg-blue-50/70 text-blue-900",
          tagColor: "bg-blue-100 text-blue-800",
          detalle: "Accesos directos a sesiones de clases virtuales (Blackboard, Zoom) y licencias de software institucional para estudiantes.",
          enlace: "https://serviciost2d.up.edu.pe/",
          enlaceTexto: "Acceder a Software"
        },
        {
          id: "t2d-3",
          nombre: "Sistemas Académicos",
          icono: "book",
          tag: "Portales UP",
          color: "border-indigo-200 bg-indigo-50/70 text-indigo-900",
          tagColor: "bg-indigo-100 text-indigo-800",
          detalle: "Bolsa de Trabajo, Matrícula en línea, PowerCampus, Admisión, Calificaciones y Encuestas docentes centralizadas.",
          enlace: "https://serviciost2d.up.edu.pe/",
          enlaceTexto: "Ingresar a Sistemas"
        },
        {
          id: "t2d-4",
          nombre: "Servicios Informáticos y Soporte",
          icono: "shield",
          tag: "Mesa de Ayuda",
          color: "border-teal-200 bg-teal-50/70 text-teal-900",
          tagColor: "bg-teal-100 text-teal-800",
          detalle: "Atención técnica especializada: registro de solicitudes, reporte de fallas en equipos, conectividad y cuentas.",
          enlace: "https://serviciost2d.up.edu.pe/",
          enlaceTexto: "Reportar Falla"
        },
        {
          id: "t2d-5",
          nombre: "Sugerencias, Quejas y Felicitaciones",
          icono: "chat",
          tag: "Feedback",
          color: "border-amber-200 bg-amber-50/70 text-amber-900",
          tagColor: "bg-amber-100 text-amber-800",
          detalle: "Canal formal para registrar sugerencias de mejora, quejas sobre servicios tecnológicos o felicitaciones.",
          enlace: "https://serviciost2d.up.edu.pe/",
          enlaceTexto: "Enviar Comentario"
        },
        {
          id: "t2d-6",
          nombre: "Noticias sobre Ciberseguridad",
          icono: "shield",
          tag: "Seguridad Digital",
          color: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
          tagColor: "bg-emerald-100 text-emerald-800",
          detalle: "Alertas y avisos de seguridad digital institucional, protección anti-phishing y recomendaciones preventivas.",
          enlace: "https://serviciost2d.up.edu.pe/",
          enlaceTexto: "Ver Avisos"
        }
      ],
      items: [
        {
          id: "t2d-ofi",
          nombre: "Servicios Informáticos y de Soporte (T2D)",
          web: "https://serviciost2d.up.edu.pe/",
          detalle: "Mesa de ayuda digital, soporte de cuentas, software institucional y ciberseguridad."
        }
      ]
    },
    {
      id: "representacion",
      title: "Representación Estudiantil",
      badge: "REUP & Programa REA",
      tipo: "representacion_panel",
      organizaciones: [
        {
          id: "org-reup",
          nombre: "REUP (reupunido)",
          handle: "@reupcontigo",
          instagramUrl: "https://www.instagram.com/reupcontigo/",
          subtitulo: "Representación Estudiantil de la Universidad del Pacífico · Todos sus enlaces funcionan desde su Linktree",
          recursos: [
            {
              titulo: "Comunidad REUP de WhatsApp",
              tag: "Comunidad Oficial",
              desc: "Invitación para unirte a la comunidad oficial de WhatsApp de todos los estudiantes de la UP.",
              icono: "chat",
              accion: "Unirme al WhatsApp"
            },
            {
              titulo: "Causales de baja de la UP",
              tag: "Guía PDF",
              desc: "Documento oficial en PDF explicando al detalle las causales académicas de baja y permanencia.",
              icono: "doc",
              accion: "Ver PDF Oficial"
            },
            {
              titulo: "Tu amigo Inge",
              tag: "Ingeniería UP",
              desc: "Exámenes pasados, proyectos y materiales académicos de apoyo para estudiantes de Ingeniería.",
              icono: "academic",
              accion: "Ver Repositorio"
            },
            {
              titulo: "Doble Grado (2025)",
              tag: "Afiches UOL · Rennes · HEC",
              desc: "Afiches informativos y requisitos vigentes 2025 para postular a los convenios de doble titulación internacional.",
              icono: "globe",
              accion: "Ver Afiches 2025"
            }
          ]
        },
        {
          id: "org-rea",
          nombre: "Programa REA (progreaup)",
          handle: "@progreaup",
          instagramUrl: "https://www.instagram.com/progreaup/",
          subtitulo: "Acompañamiento, enlaces y recursos para estudiantes de pregrado · Acceso desde su Linktree de Instagram",
          recursos: [
            {
              titulo: "REA sin contactar",
              tag: "Grupos de WhatsApp",
              desc: "Encuentra el grupo oficial de WhatsApp correspondiente a tu salón y sección para estar comunicado.",
              icono: "chat",
              accion: "Buscar mi Salón"
            },
            {
              titulo: "Buzón REA",
              tag: "Formulario Unificado",
              desc: "Formulario pensado para que tengas un solo espacio donde compartir lo que necesites con el Programa REA.",
              icono: "mail",
              accion: "Llenar Formulario"
            },
            {
              titulo: "Banco de Sílabos",
              tag: "Hasta ciclo 2025-1",
              desc: "Repositorio descargable con los sílabos históricos de cursos UP para planificar tus materias.",
              icono: "book",
              accion: "Consultar Sílabos"
            },
            {
              titulo: "Música de REA Estudio",
              tag: "Playlist Focus",
              desc: "Selección musical ambiental diseñada para maximizar el enfoque y la productividad al estudiar.",
              icono: "music",
              accion: "Escuchar Música"
            }
          ]
        }
      ],
      items: [
        {
          id: "rep-reup-item",
          nombre: "REUP – Representación Estudiantil UP",
          redes: "Instagram: @reupcontigo (Linktree con grupos WhatsApp, causales de baja, exámenes Ingeniería y doble grado)",
          web: "https://www.instagram.com/reupcontigo/"
        },
        {
          id: "rep-rea-item",
          nombre: "Programa REA",
          redes: "Instagram: @progreaup (Linktree con grupos WhatsApp de salones, buzón REA, banco de sílabos y música)",
          web: "https://www.instagram.com/progreaup/"
        }
      ]
    }
  ]
};

/* ==========================================================================
   COMPONENTE PRINCIPAL (APP EN PANTALLA ÚNICA INTERACTIVA)
   ========================================================================== */

// Motor de Coincidencia por Raíces de Palabras Clave (Keyword Root Scoring)
// Cero costo de APIs, velocidad instantánea, 100% en JavaScript local en el cliente.

const STOP_WORDS = new Set([
  'de', 'la', 'el', 'en', 'y', 'a', 'un', 'una', 'unos', 'unas', 'mi', 'mis',
  'tu', 'tus', 'su', 'sus', 'al', 'del', 'los', 'las', 'por', 'para', 'con',
  'sin', 'que', 'se', 'es', 'me', 'le', 'lo', 'como', 'donde', 'esta',
  'estan', 'quiero', 'necesito', 'saber', 'tengo', 'hacer', 'puedo', 'voy', 'siento'
]);

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const CANALES_SEARCH_ENGINE = [
  {
    id: 'daar-retiro',
    oficina: 'DAAR — Servicios Académicos y Registro',
    tramite: 'Retiro de curso / Retiro de semestre',
    asunto: 'Retiro de curso',
    correo: 'pregrado@up.edu.pe',
    anexo: '8990',
    web: 'https://daar.up.edu.pe',
    webMatricula: 'https://daar.up.edu.pe/matricula',
    pabellon: null,
    horario: 'Lunes a viernes de 8:00 a. m. a 5:00 p. m.',
    consejo: 'Revisa el calendario académico antes de escribir; muchos trámites tienen fechas límite e improrrogables.',
    pasos: [
      'Verificar en el Calendario Académico oficial las fechas límite para retiro de curso o semestre.',
      'Asegurarte de escribir exclusivamente desde tu correo institucional @up.edu.pe.',
      'Generar el asunto en formato oficial: «Retiro de curso - [Tu Código]».',
      'Enviar la solicitud a pregrado@up.edu.pe indicando la asignatura, sección y justificación.'
    ],
    raices: ['retir', 'desmatricul', 'matricul', 'reserva', 'semestre', 'curso', 'reprogram', 'reclamo', 'examen', 'parcial', 'final', 'traslado', 'sumilla', 'sello', 'desaprob', 'jal', 'abandon'],
    pesoEspecial: { 'retir': 40, 'desmatricul': 40, 'reserva': 35, 'semestre': 25, 'reprogram': 30, 'reclamo': 30, 'sumilla': 30, 'sello': 30 },
    alternativaTrigger: {
      detectar: ['desaprob', 'jal', 'miedo', 'duda', 'dificil', 'estres', 'ansied', 'examen', 'parcial', 'nota'],
      pregunta: '¿Dudas antes de retirarte? Consulta con Tutoría / Consejería Estudiantil de BFE',
      subtexto: 'Antes de tomar una decisión definitiva sobre retirar la asignatura, conversa confidencialmente con un consejero de BFE o solicita tutoría académica personalizada.',
      canalAlternativoId: 'bfe-consejeria'
    }
  },
  {
    id: 'grados-titulos',
    oficina: 'Grados y Títulos — Secretaría General UP',
    tramite: 'Tesis, Grados Académicos, Bachiller y Diplomas',
    asunto: 'Consulta Grados y Títulos',
    correo: 'gradosytitulos@up.edu.pe',
    anexo: '8990',
    web: 'https://daar.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:00 a. m. a 5:00 p. m.',
    consejo: 'Asegúrate de haber completado todos los créditos curriculares y acreditado el idioma inglés antes de ingresar la carpeta de grado.',
    pasos: [
      'Verificar en PowerCampus el cumplimiento del 100% de créditos de tu plan de estudios y actividades EFE.',
      'Acreditar la suficiencia de idioma inglés ante el Centro de Idiomas y DAAR.',
      'Elegir la modalidad de titulación: Tesis o Trabajo de Suficiencia Profesional.',
      'Presentar la solicitud a gradosytitulos@up.edu.pe para ensobrado, duplicado o emisión de diploma.'
    ],
    raices: ['tesis', 'grado', 'titulo', 'bachiller', 'diploma', 'titulacion', 'ensobrado', 'revalidacion', 'duplicado'],
    pesoEspecial: { 'tesis': 40, 'grado': 40, 'titulo': 40, 'bachiller': 40, 'diploma': 40, 'ensobrado': 35 }
  },
  {
    id: 'bfe-consejeria',
    oficina: 'BFE — Consejería Universitaria (Gratuita y Confidencial)',
    tramite: 'Consejería Psicológica y Estudiantil',
    asunto: 'Solicitud de Cita de Consejería',
    correo: 'consejeriapsicologica@up.edu.pe',
    correoAlt: 'consejeriaestudiantil@up.edu.pe',
    anexo: '2215',
    web: 'https://www.up.edu.pe',
    pabellon: 'Z',
    ubicacionTexto: 'Pabellón Z — Casa del Estudiante (Piso 2, Jr. Sánchez Cerro 2215)',
    horario: 'Lunes a viernes de 8:00 a. m. a 5:00 p. m.',
    consejo: 'El servicio es 100% gratuito y confidencial. Atiende aspectos emocionales, vocacionales, sociales, académicos y familiares.',
    pasos: [
      'Elegir entre Consejería Psicológica (bienestar emocional) o Estudiantil (hábitos y adaptación).',
      'Enviar un correo a consejeriapsicologica@up.edu.pe o consejeriaestudiantil@up.edu.pe.',
      'Indicar brevemente el motivo de tu consulta y tus horarios disponibles libres de clase.',
      'Esperar la confirmación oficial con el enlace o sala asignada en el Pabellón Z.'
    ],
    raices: ['psicolog', 'emocion', 'estres', 'ansied', 'triste', 'deprim', 'familiar', 'vocacion', 'problema personal', 'terapia', 'salud mental', 'angustia', 'crisis', 'apoyo', 'llor', 'sentim', 'consejeria'],
    pesoEspecial: { 'psicolog': 40, 'estres': 40, 'ansied': 40, 'salud mental': 40, 'terapia': 35, 'consejeria': 35, 'emocion': 35 }
  },
  {
    id: 'bfe-acompanamiento',
    oficina: 'BFE — Acompañamiento Académico y NEE',
    tramite: 'Tutoría en Riesgo Académico y Ajustes Razonables NEE',
    asunto: 'Acompañamiento Académico / Tutoría BFE',
    correo: 'bfe@up.edu.pe',
    anexo: '2215',
    web: 'https://www.up.edu.pe',
    pabellon: 'Z',
    ubicacionTexto: 'Pabellón Z — Casa del Estudiante',
    horario: 'Lunes a viernes de 8:00 a. m. a 5:00 p. m.',
    consejo: 'Si sientes que tu rendimiento está en riesgo o tienes una condición NEE, acude tempranamente para recibir un plan de apoyo y evitar causales de baja.',
    pasos: [
      'Identificar la necesidad: Tutoría por bajo rendimiento/riesgo académico o ajustes razonables NEE.',
      'Escribir a bfe@up.edu.pe detallando tu situación académica y código de alumno.',
      'Coordinar una entrevista de evaluación con el equipo psicopedagógico.',
      'Participar en los talleres y sesiones de tutoría asignadas durante el semestre.'
    ],
    raices: ['riesgo', 'tutor', 'tutoria', 'desaprob', 'jal', 'bajo rendimiento', 'discapacidad', 'nee', 'neurodivergen', 'ajuste razonable', 'apoyo academico'],
    pesoEspecial: { 'riesgo': 40, 'tutor': 40, 'tutoria': 40, 'nee': 40, 'discapacidad': 40, 'ajuste razonable': 35, 'bajo rendimiento': 35 }
  },
  {
    id: 'bfe-espacios',
    oficina: 'BFE — Espacios de la Casa del Estudiante (Pabellón Z)',
    tramite: 'Gym UP, Canchita Deportiva, Casilleros y Salón Z-201',
    asunto: 'Consulta Espacios Pabellón Z',
    correo: 'bfe@up.edu.pe',
    correoCanchita: 'vr.espinozap@up.edu.pe',
    anexo: '2215',
    web: 'https://www.up.edu.pe',
    pabellon: 'Z',
    ubicacionTexto: 'Pabellón Z — Jr. Sánchez Cerro 2215, Jesús María',
    horario: 'Gym UP: L-V 7:30 a 11:30 a. m. y 1:00 a 9:00 p. m.',
    consejo: 'Para usar el Gym UP solo necesitas tu carnet UP y ropa deportiva. Los casilleros y material recreativo (pelotas/aros) se piden en recepción del Piso 1.',
    pasos: [
      'Ubicación: Dirígete a la Casa del Estudiante en Pabellón Z (Jr. Sánchez Cerro 2215).',
      'Gimnasio UP (Piso 1): Ingresa en los turnos disponibles (7:30-11:30 y 13:00-21:00) presentando carnet UP.',
      'Canchita Deportiva y Casilleros: Reserva en línea o escribe a vr.espinozap@up.edu.pe; pide llaves en recepción.',
      'Salón de Descanso Z-201 (Piso 2): Espacio silencioso para descansar y relajarte entre clases.'
    ],
    raices: ['gym', 'gimnasio', 'pesas', 'canchita', 'cancha', 'pelota', 'casillero', 'descanso', 'z201', 'dormir', 'basquet', 'voley', 'casa del estudiante', 'pabellon z', 'deporte', 'entrenar'],
    pesoEspecial: { 'gym': 45, 'gimnasio': 45, 'canchita': 40, 'casillero': 40, 'z201': 45, 'pabellon z': 40, 'descanso': 30 }
  },
  {
    id: 'bfe-efe',
    oficina: 'BFE — Créditos EFE (Experiencias Formativas Estudiantiles)',
    tramite: 'Elencos Artísticos, Brigada UP, Selecciones Deportivas',
    asunto: 'Consulta Créditos EFE',
    correo: 'bfe@up.edu.pe',
    anexo: '2215',
    web: 'https://www.up.edu.pe',
    pabellon: 'Z',
    ubicacionTexto: 'Pabellón Z — Casa del Estudiante',
    horario: 'Lunes a viernes de 8:00 a. m. a 5:00 p. m.',
    consejo: 'Participar activamente en elencos artísticos (@elencos.up), Brigada UP (@brigadeando.up) o selecciones deportivas convalida 1 crédito EFE voluntario.',
    pasos: [
      'Revisar convocatorias al inicio de semestre en Instagram: @elencos.up o @brigadeando.up.',
      'Audicionar o inscribirte en el elenco, brigada u organización estudiantil de tu agrado.',
      'Completar un mínimo del 80% de asistencia a ensayos, entrenamientos y presentaciones.',
      'Solicitar a BFE la acreditación de tu 1 crédito EFE al finalizar el ciclo académico.'
    ],
    raices: ['efe', 'elenco', 'brigada', 'seleccion deportiva', 'arte', 'danza', 'teatro', 'organizacion estudiantil', 'credito efe', 'voluntariado', 'musica', 'canto'],
    pesoEspecial: { 'efe': 45, 'credito efe': 45, 'elenco': 40, 'brigada': 40, 'danza': 30, 'teatro': 30 }
  },
  {
    id: 'fac-ingenieria',
    oficina: 'Facultad de Ingeniería',
    tramite: 'Secretaría Académica F400 (Pabellón F)',
    asunto: 'Consulta Facultad de Ingeniería',
    correo: 'ingenieria@up.edu.pe',
    anexo: '2336',
    web: 'https://www.up.edu.pe',
    pabellon: 'F',
    ubicacionTexto: 'Pabellón F — Secretaría en el F400 (Piso 4)',
    horario: 'Lunes a viernes de 8:30 a. m. a 5:30 p. m.',
    consejo: 'Atiende consultas sobre Ingeniería de la Información, Industrial, Sistemas y Empresarial; laboratorios de cómputo y convalidaciones curriculares.',
    pasos: [
      'Ubicación física: Subir al 4.º piso del Pabellón F (Salón F400) ingresando por Av. Salaverry 2020.',
      'Consultas virtuales: Escribir desde tu correo institucional a ingenieria@up.edu.pe.',
      'Asunto oficial: Indicar «Consulta Académica Ingeniería - [Tu Código]».',
      'Para trámites de laboratorios, proyectos o solicitudes de decanato, adjuntar la documentación requerida.'
    ],
    raices: ['ingenieria', 'sistemas', 'f400', 'industrial', 'informacion', 'laboratorio f400', 'pabellon f', 'inge', 'software'],
    pesoEspecial: { 'ingenieria': 45, 'f400': 50, 'sistemas': 35, 'pabellon f': 45 }
  },
  {
    id: 'fac-empresariales',
    oficina: 'Facultad de Ciencias Empresariales',
    tramite: 'Coordinación Académica de Administración, Marketing y Negocios',
    asunto: 'Consulta Facultad Ciencias Empresariales',
    correo: 'fce@up.edu.pe',
    anexo: '2257 / 2628',
    web: 'https://www.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:30 a. m. a 5:30 p. m.',
    consejo: 'Canal oficial para consultas de mallas y convalidaciones de Administración, Contabilidad, Marketing y Negocios Internacionales.',
    pasos: [
      'Redactar desde tu correo UP a fce@up.edu.pe.',
      'Indicar en el asunto: «Consulta FCE - [Carrera] - [Tu Código]».',
      'Describir claramente el motivo académico o administrativo.',
      'Esperar la respuesta de la coordinación de carrera en un plazo de 24 a 48 horas.'
    ],
    raices: ['empresariales', 'administracion', 'marketing', 'negocios internacionales', 'contabilidad', 'fce'],
    pesoEspecial: { 'empresariales': 40, 'administracion': 35, 'marketing': 35, 'fce': 40, 'contabilidad': 35 }
  },
  {
    id: 'fac-derecho',
    oficina: 'Facultad de Derecho',
    tramite: 'Dirección Académica y Clínicas Jurídicas',
    asunto: 'Consulta Facultad de Derecho',
    correo: 'derecho@up.edu.pe',
    anexo: '2329',
    web: 'https://derecho.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:30 a. m. a 5:30 p. m.',
    consejo: 'Atención a alumnos de Derecho para convalidaciones, clínicas jurídicas de práctica y orientación curricular.',
    pasos: [
      'Escribir a derecho@up.edu.pe desde tu cuenta de correo institucional UP.',
      'Consignar el asunto: «Consulta Académica Derecho - [Tu Código]».',
      'Detallar el trámite o consulta con los códigos de curso involucrados.',
      'La secretaría académica te responderá coordinando cita virtual o respuesta formal.'
    ],
    raices: ['derecho', 'leyes', 'abogado', 'juridica', 'clinica juridica'],
    pesoEspecial: { 'derecho': 45, 'leyes': 35, 'juridica': 35 }
  },
  {
    id: 'fac-economia',
    oficina: 'Facultad de Economía y Finanzas',
    tramite: 'Orientación Académica y Mallas Curriculares',
    asunto: 'Consulta Facultad Economía y Finanzas',
    correo: 'fef@up.edu.pe',
    anexo: '2143',
    web: 'https://fef.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:30 a. m. a 5:30 p. m.',
    consejo: 'Canal especializado para estudiantes de Economía y Finanzas, programas de doble grado y asesorías de cursos cuantitativos.',
    pasos: [
      'Enviar solicitud formal a fef@up.edu.pe.',
      'Asunto oficial: «Consulta FEF - [Tu Código]».',
      'Indicar el curso o consulta vocacional/académica específica.',
      'Revisar tu bandeja institucional para coordinar con los profesores coordinadores.'
    ],
    raices: ['economia', 'finanzas', 'fef', 'economista'],
    pesoEspecial: { 'economia': 45, 'finanzas': 45, 'fef': 45 }
  },
  {
    id: 'pensiones-tesoreria',
    oficina: 'Pensiones y Tesorería UP',
    tramite: 'Boletas de Pago, Cuotas del Semestre, Escalas y Devoluciones',
    asunto: 'Consulta sobre Pensiones y Boletas',
    correo: 'pensiones@up.edu.pe',
    correoAlt: 'tesoreria@up.edu.pe',
    anexo: '2239 (Pensiones) / 2272 - 2343 (Tesorería)',
    web: 'https://daar.up.edu.pe/pensiones',
    pabellon: null,
    horario: 'Lunes a viernes de 8:00 a. m. a 5:00 p. m.',
    consejo: 'Las fechas de vencimiento de las cuotas son improrrogables para evitar recargos por mora. Puedes verificar tus boletas en PowerCampus.',
    pasos: [
      'Verificar tu estado de cuenta y cronograma de boletas en el Portal Académico PowerCampus.',
      'Para consultas de escalas, fraccionamiento o recálculo socioeconómico: escribir a pensiones@up.edu.pe.',
      'Para constancias de no adeudo, devoluciones o pagos bancarios: escribir a tesoreria@up.edu.pe.',
      'Indicar siempre tu código de alumno de 8 dígitos y adjuntar el voucher de pago si aplica.'
    ],
    raices: ['pension', 'boleta', 'pago', 'cuota', 'tesoreria', 'deuda', 'escala', 'fraccionamiento', 'banco', 'mora', 'vencimiento', 'costo', 'dinero'],
    pesoEspecial: { 'pension': 45, 'boleta': 45, 'cuota': 40, 'tesoreria': 40, 'escala': 35, 'fraccionamiento': 35 }
  },
  {
    id: 'empleabilidad-practicas',
    oficina: 'Empleabilidad y Prácticas Preprofesionales',
    tramite: 'Convenios de Prácticas, Cartas de Presentación y Bolsa de Trabajo',
    asunto: 'Solicitud de Carta de Presentación / Convenio de Prácticas',
    correo: 'practicaspre@up.edu.pe',
    correoAlt: 'empleabilidad@up.edu.pe',
    anexo: '2253',
    web: 'https://empleabilidad.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:30 a. m. a 5:30 p. m.',
    consejo: 'Debes registrar y legalizar tu convenio de prácticas preprofesionales antes de comenzar tus labores para que tengan validez y seguro universitario.',
    pasos: [
      'Verificar en tu historial que cumples los créditos mínimos requeridos por tu carrera para iniciar prácticas.',
      'Solicitar tu Carta de Presentación digital enviando un correo a practicaspre@up.edu.pe.',
      'Al obtener una oferta, enviar el Convenio y Plan de Aprendizaje para revisión y firma de la UP.',
      'Acceder a la Bolsa de Trabajo UP para convocatorias exclusivas para estudiantes de pregrado.'
    ],
    raices: ['practica', 'convenio', 'empleo', 'cv', 'trabajo', 'alumni', 'carta de presentacion', 'bolsa de trabajo', 'laboral', 'empresa'],
    pesoEspecial: { 'practica': 45, 'convenio': 45, 'empleo': 35, 'cv': 35, 'bolsa de trabajo': 40 }
  },
  {
    id: 'ori-internacional',
    oficina: 'Oficina de Relaciones Internacionales (ORI)',
    tramite: 'Intercambio Outgoing, Disney Academic Exchange, Programas Cortos y Becas',
    asunto: 'Consulta Convocatoria Intercambio Outgoing',
    correo: 'outgoing@up.edu.pe',
    web: 'https://ori.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:30 a. m. a 5:30 p. m.',
    consejo: 'Requisitos clave: Mínimo 20 créditos acumulados, promedio ponderado ≥ 13.00, nivel de inglés avanzado certificado (< 2 años) y no estar en riesgo académico ni disciplinario.',
    pasos: [
      'Verificar los requisitos de postulación: 20 créditos, promedio ponderado ≥ 13.00 y certificado de inglés avanzado.',
      'Ingresar al portal de intercambio en ori.up.edu.pe durante las convocatorias (Ene-May o Set-Dic).',
      'Subir certificado de idioma, redactar ensayo en inglés (máx. 500 palabras) y seleccionar docente para recomendación.',
      'Seleccionar universidades de destino y enviar tu postulación en línea.'
    ],
    raices: ['intercambio', 'extranjero', 'ori', 'viaje', 'outgoing', 'disney', 'conveni', 'beca internacional', 'uol', 'rennes', 'hec', 'semestre internacional', 'faculty led'],
    pesoEspecial: { 'intercambio': 45, 'ori': 45, 'outgoing': 45, 'disney': 45, 'extranjero': 35 }
  },
  {
    id: 'centro-idiomas',
    oficina: 'Centro de Idiomas UP',
    tramite: 'Acreditación de Suficiencia de Idioma y Certificados',
    asunto: 'Suficiencia de Idioma Extranjero',
    correo: 'idiomas.informes@up.edu.pe',
    web: 'https://centrodeidiomas.up.edu.pe',
    pabellon: null,
    horario: 'Lunes a viernes de 8:30 a. m. a 6:00 p. m.',
    consejo: 'El certificado o examen de suficiencia de inglés es indispensable para postular al intercambio de ORI y para obtener el grado académico de Bachiller.',
    pasos: [
      'Revisar el cronograma mensual de exámenes de suficiencia o tabla de certificaciones internacionales reconocidas (TOEFL, IELTS, Cambridge).',
      'Inscribirte mediante el portal del Centro de Idiomas o correo institucional.',
      'Rendir la prueba en la fecha designada o presentar el certificado internacional oficial con antigüedad menor a 2 años.',
      'Verificar la convalidación de la suficiencia en tu récord de notas de DAAR.'
    ],
    raices: ['idioma', 'ingles', 'suficiencia de idioma', 'toefl', 'ielts', 'centro de idiomas', 'idiomas', 'aleman', 'frances', 'portugues'],
    pesoEspecial: { 'idioma': 40, 'ingles': 40, 'suficiencia de idioma': 45, 'toefl': 35, 'ielts': 35 }
  },
  {
    id: 't2d-soporte',
    oficina: 'T2D — Soporte y Servicios Informáticos',
    tramite: 'Recuperación de Contraseñas, Blackboard, PowerCampus y Software UP',
    asunto: 'Soporte Técnico T2D - [Problema]',
    correo: 't2d@up.edu.pe',
    web: 'https://serviciost2d.up.edu.pe/',
    pabellon: null,
    horario: 'L-V 7:30 a. m. – 9:30 p. m. | Sábados 7:30 a. m. – 5:00 p. m.',
    consejo: 'Si tu contraseña institucional se bloqueó o no puedes ingresar a Blackboard o PowerCampus, usa el portal de autoservicio o escribe a t2d@up.edu.pe.',
    pasos: [
      'Ingresar al portal de autoservicio oficial: https://serviciost2d.up.edu.pe/.',
      'Seleccionar "Recuperar contraseña" o registrar un ticket de soporte técnico.',
      'Si necesitas atención por correo, escribir a t2d@up.edu.pe indicando tu código UP y captura de pantalla del error.',
      'El equipo de soporte te brindará solución inmediata en los horarios de atención.'
    ],
    raices: ['t2d', 'contrasena', 'password', 'correo up', 'blackboard', 'powercampus', 'wifi', 'soporte tecnico', 'computo', 'software', 'canvas', 'ciberseguridad', 'bloqueo'],
    pesoEspecial: { 't2d': 45, 'contrasena': 45, 'password': 45, 'blackboard': 40, 'powercampus': 40, 'wifi': 35 }
  },
  {
    id: 'reup-estudiantil',
    oficina: 'REUP — Representación Estudiantil UP',
    tramite: 'Tu amigo Inge (Exámenes y proyectos), Causales de baja y Doble Grado',
    asunto: 'Consulta a Representación Estudiantil REUP',
    correo: 'reupunido@up.edu.pe',
    instagram: '@reupcontigo',
    web: 'https://www.instagram.com/reupcontigo',
    pabellon: null,
    horario: 'Canales digitales estudiantiles 24/7',
    consejo: 'REUP es la voz de los estudiantes. En su linktree de Instagram encuentras el PDF de causales de baja, el banco de exámenes "Tu amigo Inge" y la comunidad de WhatsApp.',
    pasos: [
      'Ingresar al perfil de Instagram @reupcontigo y acceder al Linktree oficial.',
      'Unirte a la comunidad oficial de WhatsApp REUP para mantenerte informado.',
      'Descargar el documento "Causales de dada de baja de la UP" para conocer tus derechos y procedimientos de apelación.',
      'Explorar el repositorio de "Tu amigo Inge" con exámenes y proyectos de ciclos pasados.'
    ],
    raices: ['reup', 'representacion estudiantil', 'amigo inge', 'examenes pasados', 'baja', 'causales de baja', 'doble grado', 'whatsapp reup', 'defensa estudiantil'],
    pesoEspecial: { 'reup': 45, 'amigo inge': 45, 'examenes pasados': 45, 'causales de baja': 45, 'doble grado': 35 }
  },
  {
    id: 'rea-programa',
    oficina: 'Programa REA — Red de Estudiantes y Acompañamiento',
    tramite: 'REA sin contactar (Grupos WhatsApp), Banco de Sílabos y Buzón REA',
    asunto: 'Consulta Programa REA',
    correo: 'progreaup@up.edu.pe',
    instagram: '@progreaup',
    web: 'https://www.instagram.com/progreaup',
    pabellon: null,
    horario: 'Canales digitales estudiantiles 24/7',
    consejo: '¿Buscas el grupo de WhatsApp de tu clase? En "REA sin contactar" están organizados por curso y sección. También puedes consultar el Banco de Sílabos y escuchar música de estudio.',
    pasos: [
      'Ingresar a la cuenta de Instagram @progreaup y pulsar el enlace de su biografía.',
      'Acceder a "REA sin contactar" para encontrar el enlace de WhatsApp de tu curso y sección.',
      'Revisar el "Banco de sílabos (hasta 2025-1)" para planificar tus lecturas y materias.',
      'Utilizar el "Buzón REA" para enviar sugerencias, inquietudes o necesidades estudiantiles.'
    ],
    raices: ['rea', 'progreaup', 'silabos', 'banco de silabos', 'grupo de whatsapp', 'buzon rea', 'musica rea', 'rea sin contactar'],
    pesoEspecial: { 'rea': 45, 'silabos': 45, 'grupo de whatsapp': 45, 'buzon rea': 45, 'musica rea': 35 }
  }
];

function scoreChannels(query) {
  if (!query || !query.trim()) {
    return { principal: null, alternativa: null, otros: [] };
  }

  const norm = normalizeText(query);
  const rawTokens = norm.split(/\s+/).filter(Boolean);
  const validTokens = rawTokens.filter(t => t.length >= 3 && !STOP_WORDS.has(t));

  const scored = CANALES_SEARCH_ENGINE.map(channel => {
    let score = 0;
    
    // 1. Coincidencia por raíces y frases multi-palabra
    channel.raices.forEach(r => {
      const normRoot = normalizeText(r);
      if (normRoot.includes(' ')) {
        // Frase multi-palabra (ej. 'salud mental', 'banco de silabos', 'credito efe')
        if (norm.includes(normRoot)) {
          const weight = (channel.pesoEspecial && channel.pesoEspecial[r]) ? channel.pesoEspecial[r] : 30;
          score += weight * 1.5;
        }
      } else {
        // Raíz simple (ej. 'retir', 'psicolog', 'contrasen', 'f400')
        validTokens.forEach(tok => {
          if (tok.startsWith(normRoot) || normRoot.startsWith(tok) || tok === normRoot) {
            const weight = (channel.pesoEspecial && channel.pesoEspecial[r]) ? channel.pesoEspecial[r] : 15;
            score += weight;
          }
        });
      }
    });

    // 2. Coincidencia en título o trámite
    const normTitle = normalizeText(channel.oficina + ' ' + channel.tramite);
    validTokens.forEach(tok => {
      if (normTitle.includes(tok)) {
        score += 10;
      }
    });

    // 3. Coincidencia de frase exacta (mínimo 3 caracteres para no disparar con letras sueltas)
    if (norm.length >= 3 && normTitle.includes(norm)) {
      score += 50;
    }

    return { ...channel, score };
  });

  // Ordenar de mayor a menor puntuación
  const sorted = scored.filter(c => c.score > 0).sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    return { principal: null, alternativa: null, otros: [] };
  }

  const principal = sorted[0];

  // Verificar si se activa la Tarjeta Secundaria de Alternativa
  let alternativa = null;
  if (principal.alternativaTrigger) {
    const triggerWords = principal.alternativaTrigger.detectar;
    const hasTrigger = triggerWords.some(w => norm.includes(normalizeText(w)));
    if (hasTrigger) {
      const altTarget = CANALES_SEARCH_ENGINE.find(c => c.id === principal.alternativaTrigger.canalAlternativoId);
      if (altTarget) {
        alternativa = {
          pregunta: principal.alternativaTrigger.pregunta,
          subtexto: principal.alternativaTrigger.subtexto,
          canalDestino: altTarget
        };
      }
    }
  }

  // Filtrar otros resultados relevantes
  const otros = sorted.slice(1, 4).filter(c => !alternativa || !alternativa.canalDestino || c.id !== alternativa.canalDestino.id);

  return { principal, alternativa, otros };
}

/* ==========================================================================
   MODAL / DRAWER DEL MAPA CONTEXTUAL (BAJO DEMANDA)
   Vector SVG de alta fidelidad basado en "Ubícate en la UP"
   (Jirón Sánchez Cerro, Av. Salaverry, Pabellón Z y Pabellón F - F400)
   ========================================================================== */
function CampusMapModal({ isOpen, onClose, initialPabellon = 'Z' }) {
  const [selectedPabellon, setSelectedPabellon] = useState(initialPabellon);

  useEffect(() => {
    if (initialPabellon) setSelectedPabellon(initialPabellon);
  }, [initialPabellon, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Cabecera del Modal */}
        <div className="bg-[#0B2240] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-blue-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
              <Icon name="map-pin" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                Ubícate en la UP · Plano Oficial del Campus
              </h3>
              <p className="text-xs text-slate-300">
                Pabellones, accesos oficiales y rutas por Jirón Sánchez Cerro y Av. Salaverry (Jesús María)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            title="Cerrar plano"
          >
            <Icon name="x" className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Barra de Pestañas Interactivas */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'Z', label: '📍 Pabellón Z · Casa del Estudiante' },
              { id: 'F', label: '📍 Pabellón F · Salón F400 (Ingeniería)' },
              { id: 'C', label: '📍 Pabellón C · Tópico Médico' },
              { id: 'B', label: '📍 Pabellón B · Biblioteca' },
              { id: 'JK', label: '📍 Pabellones J y K' },
              { id: 'ALL', label: '🗺️ Ver Campus General' }
            ].map((pab) => {
              const isSelected = selectedPabellon === pab.id;
              return (
                <button
                  key={pab.id}
                  onClick={() => setSelectedPabellon(pab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0B2240] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                  <span>{pab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-semibold text-slate-500 hidden sm:block">
            Haz clic en un pabellón para ver detalles y servicios
          </div>
        </div>

        {/* Contenedor del Plano Oficial y Tarjeta de Detalles */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F8F7F4] flex-1">
          
          {/* Imagen Oficial del Plano UP */}
          <div className="bg-white rounded-2xl p-2 sm:p-3 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-2 py-1 text-[11px] text-slate-500 border-b border-slate-100 mb-2 font-medium">
              <span>▲ Jr. Luis Sánchez Cerro &nbsp;·&nbsp; Jr. Inca Rípac (Izquierda)</span>
              <span>► Av. Gral. Salaverry (Ingreso Peatonal y Vehicular)</span>
            </div>
            
            <img 
              src="assets/mapa_campus_up.jpg" 
              alt="Plano Oficial Campus Universidad del Pacífico" 
              className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain rounded-xl select-none"
            />

            <div className="w-full mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 px-2 gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                <strong>Pabellones Principales:</strong> A, B, C, D, E, F, J, K, X, Z
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <strong>Áreas Verdes y Deporte:</strong> Canchita UP y Plaza Geis (Placita UP)
              </span>
            </div>
          </div>

          {/* Tarjetas Dinámicas de Información por Pabellón */}
          {selectedPabellon === 'Z' && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 space-y-3 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold uppercase text-[10px]">
                    UBICACIÓN DESTACADA
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-amber-950">
                    Pabellón Z · Casa del Estudiante
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-amber-800">
                  Acceso directo: Jr. Sánchez Cerro 2215
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
                  <strong className="text-[#0B2240] block font-bold">🏋️ Piso 1 · Bienestar y Deporte:</strong>
                  <p className="text-slate-600">
                    Gimnasio UP (máquinas y pesas), administración de casilleros, tópico de salud y préstamo de balones.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
                  <strong className="text-[#0B2240] block font-bold">🧠 Piso 2 · Consejería y Descanso:</strong>
                  <p className="text-slate-600">
                    Salón <strong>Z-201</strong> (espacio acondicionado para descanso entre clases), oficinas de Consejería Psicológica y Estudiantil BFE.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedPabellon === 'F' && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 sm:p-5 text-xs text-blue-950 space-y-3 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-200 text-blue-900 font-extrabold uppercase text-[10px]">
                    FACULTAD DE INGENIERÍA
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    Pabellón F · Salón F400 (Secretaría de Ingeniería)
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-blue-800">
                  Frente a Plaza Geis (Placita UP)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-blue-200 space-y-1">
                  <strong className="text-[#0B2240] block font-bold">🏢 Piso 4 · Salón F400:</strong>
                  <p className="text-slate-600">
                    Secretaría Académica de Ingeniería. Atención para Ingeniería de la Información, Empresarial e Industrial. Anexo directo: <strong>2336</strong>.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-200 space-y-1">
                  <strong className="text-[#0B2240] block font-bold">💻 Pisos 1 al 3 · Laboratorios:</strong>
                  <p className="text-slate-600">
                    Laboratorios de cómputo especializados, software de ingeniería y salas de desarrollo tecnológico.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedPabellon === 'C' && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 text-xs text-emerald-950 space-y-3 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold uppercase text-[10px]">
                    SALUD Y RECTORADO
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-emerald-950">
                    Pabellón C · Tópico Médico y Administración
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800">
                  Piso 1 · Al lado de Canchita UP
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                <strong className="text-[#0B2240] block font-bold">🩺 Tópico Médico Oficial (Piso 1):</strong>
                <p className="text-slate-600 leading-relaxed">
                  Atención de primeros auxilios en el campus, urgencias ambulatorias y recepción de descansos médicos para justificar inasistencias a exámenes. Correo: <strong>medico@up.edu.pe</strong> · Anexo: <strong>2120</strong>.
                </p>
              </div>
            </div>
          )}

          {selectedPabellon === 'B' && (
            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-4 sm:p-5 text-xs text-indigo-950 space-y-3 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-extrabold uppercase text-[10px]">
                    BIBLIOTECA CENTRAL
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-indigo-950">
                    Pabellón B · Biblioteca y Salas de Estudio
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-indigo-800">
                  Vista hacia Av. Salaverry
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-indigo-200 space-y-1">
                <strong className="text-[#0B2240] block font-bold">📚 Salas de Lectura y Cubículos de Estudio:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Préstamo de libros de cursos, reserva de cubículos para trabajos grupales, terminales Bloomberg y acceso a bases de datos científicas. Correo: <strong>biblioteca@up.edu.pe</strong> · Anexos: <strong>2125 / 2126</strong>.
                </p>
              </div>
            </div>
          )}

          {selectedPabellon === 'JK' && (
            <div className="bg-slate-100 border-2 border-slate-300 rounded-2xl p-4 sm:p-5 text-xs text-slate-800 space-y-3 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-extrabold uppercase text-[10px]">
                    PABELLONES J Y K
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#0B2240]">
                    Pabellones J y K · Aulas y Escuela de Posgrado
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-slate-600">
                  Cruzando Jr. Sánchez Cerro (entre Inca Rípac y Sánchez Cerro)
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-[#0B2240] block font-bold">🏛️ Edificios de Aulas Magnas y Escuela de Posgrado:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Pabellón J (Aulas de pregrado y laboratorios) y Pabellón K (Escuela de Posgrado y Centro de Idiomas). Acceso directo cruzando la calzada de Jr. Luis Sánchez Cerro.
                </p>
              </div>
            </div>
          )}

          {selectedPabellon === 'ALL' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-xs text-slate-700 space-y-3 animate-fade-in shadow-xs">
              <strong className="text-[#0B2240] block text-sm font-bold pb-2 border-b border-slate-100">
                Guía Rápida de Pabellones y Referencias del Campus UP:
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón A:</strong>
                  <span className="text-slate-600 text-[11px]">Aulas generales de clase y conferencias.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón B:</strong>
                  <span className="text-slate-600 text-[11px]">Biblioteca Central, cubículos y salas de lectura.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón C:</strong>
                  <span className="text-slate-600 text-[11px]">Tópico Médico (piso 1) y oficinas del Rectorado.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón D:</strong>
                  <span className="text-slate-600 text-[11px]">Auditorio Juan Julio Wicht y eventos institucionales.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón E:</strong>
                  <span className="text-slate-600 text-[11px]">Aulas de estudio y asesorías de tutoría.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón F:</strong>
                  <span className="text-slate-600 text-[11px]">Ingeniería (Secretaría F400) y laboratorios.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón Z:</strong>
                  <span className="text-slate-600 text-[11px]">Casa del Estudiante, Gimnasio UP, Z-201 y BFE.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellón X:</strong>
                  <span className="text-slate-600 text-[11px]">Escuela Pre Universitaria y aulas de extensión.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#0B2240] block font-bold">Pabellones J y K:</strong>
                  <span className="text-slate-600 text-[11px]">Cruzando Sánchez Cerro: aulas magnas y posgrado.</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Pie del Modal */}
        <div className="bg-slate-100 px-5 sm:px-6 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 flex items-center gap-1.5 text-center sm:text-left">
            <Icon name="map-pin" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Universidad del Pacífico · Jr. Sánchez Cerro 2141 / Av. Salaverry 2020, Jesús María, Lima</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B2240] hover:bg-[#16365F] text-white text-xs font-bold rounded-xl transition shadow-xs shrink-0"
          >
            Entendido, cerrar plano
          </button>
        </div>

      </div>
    </div>
  );
}


/* ==========================================================================
   TARJETA DINÁMICA DE RESULTADO PRINCIPAL
   ========================================================================== */
function DynamicResultCard({ 
  channel, 
  copyToClipboard, 
  onOpenMap 
}) {
  const [isCopiedAsunto, setIsCopiedAsunto] = useState(false);
  const [isCopiedCorreo, setIsCopiedCorreo] = useState(false);

  const officialSubject = channel.asunto || channel.tramite.split('/')[0].trim();

  const handleCopyAsunto = () => {
    copyToClipboard(officialSubject, '¡Asunto oficial copiado!');
    setIsCopiedAsunto(true);
    setTimeout(() => setIsCopiedAsunto(false), 2500);
  };

  const handleCopyCorreo = () => {
    copyToClipboard(channel.correo, '¡Correo institucional copiado!');
    setIsCopiedCorreo(true);
    setTimeout(() => setIsCopiedCorreo(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all space-y-5 animate-fade-in text-left">
      
      {/* Etiqueta Superior de Canal Oficial Identificado */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
            CANAL OFICIAL IDENTIFICADO
          </span>
          {channel.pabellon && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold flex items-center gap-1">
              📍 Pabellón {channel.pabellon}
            </span>
          )}
        </div>
        {channel.horario && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-400" />
            <span>{channel.horario}</span>
          </div>
        )}
      </div>

      {/* Titular: Oficina y Trámite Exacto */}
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2C59] leading-tight">
          {channel.oficina}
        </h3>
        <p className="text-sm sm:text-base font-bold text-blue-800 mt-0.5">
          Trámite: {channel.tramite}
        </p>
      </div>

      {/* Barra de Contacto Directo: Correo + Anexo + Web + Mapa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        {/* Correo Oficial con botón de copiado */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Correo Oficial</span>
            <span className="font-semibold text-slate-800 truncate block text-[11.5px]" title={channel.correo}>
              {channel.correo}
            </span>
          </div>
          <button
            onClick={handleCopyCorreo}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 transition shrink-0"
            title="Copiar correo"
          >
            <Icon name={isCopiedCorreo ? "check" : "copy"} className={'w-3.5 h-3.5 ' + (isCopiedCorreo ? 'text-emerald-600' : 'text-slate-600')} />
          </button>
        </div>

        {/* Anexo Telefónico */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Icon name="phone" className="w-4 h-4 text-blue-700" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Anexo Telefónico</span>
            <span className="font-bold text-slate-800 text-xs">
              {channel.anexo ? ('Anexo ' + channel.anexo) : 'Vía correo / portal'}
            </span>
          </div>
        </div>

        {/* Enlace Oficial Web */}
        {channel.web && (
          <a
            href={channel.web}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-900 flex items-center justify-between gap-2 transition font-bold"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-500 block">Portal Institucional</span>
              <span className="truncate block text-xs">Sitio Web Oficial</span>
            </div>
            <Icon name="external-link" className="w-4 h-4 text-blue-700 shrink-0" />
          </a>
        )}

        {/* Botón Mapa si tiene Pabellón */}
        {channel.pabellon && (
          <button
            onClick={() => onOpenMap(channel.pabellon)}
            className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Icon name="map-pin" className="w-4 h-4 text-white" />
            <span className="text-xs">📍 Ver ubicación en el mapa</span>
          </button>
        )}
      </div>

      {/* GENERADOR INTERACTIVO DE ASUNTO */}
      <div className="bg-[#F8F7F4] border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F2C59] block">
              ASUNTO OFICIAL SUGERIDO
            </span>
            <p className="text-xs text-slate-500">
              Formato institucional listo para copiar y enviar desde tu correo oficial UP:
            </p>
          </div>


        </div>

        {/* Asunto Generado y Botones de Copiar / Enviar */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Asunto Listo para Copiar:</span>
            <code className="font-mono text-xs sm:text-sm font-bold text-[#0F2C59] break-all select-all">
              {officialSubject}
            </code>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyAsunto}
              className="px-3 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Icon name={isCopiedAsunto ? "check" : "copy"} className="w-3.5 h-3.5" />
              <span>{isCopiedAsunto ? '¡Asunto Copiado!' : 'Copiar Asunto'}</span>
            </button>

            <a
              href={'mailto:' + channel.correo + '?subject=' + encodeURIComponent(officialSubject)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Icon name="mail" className="w-3.5 h-3.5" />
              <span>Redactar</span>
            </a>
          </div>
        </div>
      </div>

      {/* PROCEDIMIENTO EN PASOS CON CÍRCULOS NUMERADOS (1, 2, 3, 4) */}
      {channel.pasos && channel.pasos.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Procedimiento Oficial Paso a Paso:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {channel.pasos.map((paso, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <span className="w-6 h-6 rounded-full bg-[#0F2C59] text-white font-extrabold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {paso}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONSEJO / TIP INSTITUCIONAL */}
      {channel.consejo && (
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-2.5">
          <span className="text-base select-none">💡</span>
          <p className="text-xs text-blue-950 font-medium leading-relaxed">
            <strong className="font-bold text-[#0F2C59]">Consejo UP:</strong> {channel.consejo}
          </p>
        </div>
      )}

    </div>
  );
}

/* ==========================================================================
   TARJETA SECUNDARIA DE ALTERNATIVA CONTEXTUAL
   ========================================================================== */
function SecondaryAlternativeCard({ alternativa, onSelectAlternative }) {
  if (!alternativa || !alternativa.canalDestino) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 text-slate-800 shadow-md space-y-3 animate-fade-in text-left">
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-xs">
          💡 ALTERNATIVA RECOMENDADA
        </span>
        <span className="text-xs font-bold text-amber-900">
          Orientación preventiva antes de tomar una decisión
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-extrabold text-[#0B2240] leading-snug">
            {alternativa.pregunta}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            {alternativa.subtexto}
          </p>
        </div>

        <button
          onClick={() => onSelectAlternative(alternativa.canalDestino)}
          className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <span>Ver canal de BFE</span>
          <Icon name="arrow-right" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function App() {
  // Modal de Mapa Contextual (Bajo Demanda)
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapFocusPabellon, setMapFocusPabellon] = useState('Z');

  const handleOpenMap = (pab) => {
    setMapFocusPabellon(pab || 'Z');
    setShowMapModal(true);
  };

  // Sección activa seleccionada mediante los 4 botones principales
  const [activeSection, setActiveSection] = useState('rapido'); // 'rapido', 'daar', 'bfe', 'directorio'
  
  // Sub-estados interactivos dentro de cada sección (pocos textos visibles por nivel)
  const [activeDaarCat, setActiveDaarCat] = useState('durante-semestre');
  const [activeDaarItem, setActiveDaarItem] = useState(DAAR_DATA.categories[0].items[0]);

  const [activeBfeCat, setActiveBfeCat] = useState('consejeria');
  const [activeBfeItem, setActiveBfeItem] = useState(null);

  const [activeDirCat, setActiveDirCat] = useState('facultades');
  const [activeDirItem, setActiveDirItem] = useState(DIRECTORIO_DATA.categories[0].items[0]);

  // Sub-estados interactivos para ORI (Relaciones Internacionales)
  const [activeOriTab, setActiveOriTab] = useState('outgoing'); // 'outgoing', 'cortos', 'disney', 'becas', 'convenios', 'faqs'
  const [activeOriFaq, setActiveOriFaq] = useState(null);



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

    if (row.seccion === 'directorio' && row.subCat) {
      if (['ori', 'empleabilidad', 't2d', 'representacion'].includes(row.subCat)) {
        setActiveSection(row.subCat);
        if (row.oriTab) setActiveOriTab(row.oriTab);
      } else {
        setActiveSection('directorio');
        setActiveDirCat(row.subCat);
      }
    } else {
      setActiveSection(row.seccion);
    }

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
    }

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

  // Motor de Búsqueda Inteligente por Raíces (Keyword Root Scoring)
  const searchEngineResults = useMemo(() => {
    return scoreChannels(searchQuery);
  }, [searchQuery]);

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

    // Buscar en T2D y Representación Estudiantil
    const t2dCat = DIRECTORIO_DATA.categories.find(c => c.id === 't2d');
    if (t2dCat && t2dCat.servicios) {
      t2dCat.servicios.forEach(srv => {
        if (srv.nombre.toLowerCase().includes(term) || srv.detalle.toLowerCase().includes(term) || srv.tag.toLowerCase().includes(term)) {
          results.push({
            tipo: 'T2D · Soporte Tecnológico',
            titulo: srv.nombre,
            canal: 'T2D',
            detalle: srv.detalle,
            enlace: srv.enlace
          });
        }
      });
    }

    const repCat = DIRECTORIO_DATA.categories.find(c => c.id === 'representacion');
    if (repCat && repCat.organizaciones) {
      repCat.organizaciones.forEach(org => {
        org.recursos.forEach(rec => {
          if (rec.titulo.toLowerCase().includes(term) || rec.desc.toLowerCase().includes(term) || rec.tag.toLowerCase().includes(term)) {
            results.push({
              tipo: 'Representación · ' + org.nombre,
              titulo: rec.titulo,
              canal: org.nombre,
              detalle: rec.desc,
              enlace: org.instagramUrl
            });
          }
        });
      });
    }

    // Buscar en ORI (Relaciones Internacionales)
    const oriCat = DIRECTORIO_DATA.categories.find(c => c.id === 'ori');
    if (oriCat) {
      if (term.includes('disney') || term.includes('montclair') || term.includes('orlando')) {
        results.push({
          tipo: 'ORI · Disney Academic',
          titulo: oriCat.disney.titulo,
          canal: 'ORI',
          correo: oriCat.disney.correo,
          detalle: oriCat.disney.subtitulo + '. Reconoce 6 créditos UP, 1 práctica preprofesional y 1 crédito internac.',
          enlace: 'https://ori.up.edu.pe'
        });
      }
      if (term.includes('faculty') || term.includes('corta') || term.includes('mision') || term.includes('silicon')) {
        results.push({
          tipo: 'ORI · Programas Cortos',
          titulo: 'Faculty Led Programs & Misiones Académicas',
          canal: 'ORI',
          correo: 'shortprograms@up.edu.pe',
          detalle: 'Cursos con profesor UP (3-4 créditos) y misiones a empresas (2 créditos) + 1 crédito internacionalización.',
          enlace: 'https://ori.up.edu.pe'
        });
      }
      if (term.includes('beca') || term.includes('scotiabank') || term.includes('alianza') || term.includes('pacifico')) {
        results.push({
          tipo: 'ORI · Becas',
          titulo: 'Becas para Experiencias Internacionales',
          canal: 'ORI',
          correo: 'outgoing@up.edu.pe',
          detalle: 'Beca Alianza del Pacífico (Chile, Col, Méx) y Beca Scotiabank (Canadá, US$ 10,000).',
          enlace: 'https://ori.up.edu.pe'
        });
      }
      if (term.includes('intercambio') || term.includes('outgoing') || term.includes('extranjero') || term.includes('semestre')) {
        results.push({
          tipo: 'ORI · Intercambio Semestral',
          titulo: oriCat.outgoing.titulo,
          canal: 'ORI',
          correo: 'outgoing@up.edu.pe',
          detalle: oriCat.outgoing.subtitulo + '. Mínimo 20 créditos y promedio ≥ 13.00.',
          enlace: 'https://intercambio.up.edu.pe'
        });
      }
      if (oriCat.faqs) {
        oriCat.faqs.forEach(faq => {
          if (faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term)) {
            results.push({
              tipo: 'ORI · Preguntas Frecuentes',
              titulo: faq.q,
              canal: 'ORI',
              correo: 'outgoing@up.edu.pe',
              detalle: faq.a,
              enlace: 'https://ori.up.edu.pe'
            });
          }
        });
      }
    }

    // Buscar en Directorio general
    DIRECTORIO_DATA.categories.forEach(cat => {
      if (cat.items) {
        cat.items.forEach(it => {
          if (it.nombre.toLowerCase().includes(term) || (it.carreras && it.carreras.toLowerCase().includes(term)) || (it.detalle && it.detalle.toLowerCase().includes(term))) {
            results.push({
              tipo: 'Directorio · ' + cat.title,
              titulo: it.nombre,
              canal: cat.title,
              correo: it.correo,
              detalle: (it.anexo ? 'Anexo: ' + it.anexo + '. ' : '') + (it.carreras ? 'Carreras: ' + it.carreras + '. ' : '') + (it.detalle || ''),
              enlace: it.web
            });
          }
        });
      }
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

  // Categorías fijas de datos para secciones independientes
  const oriCategory = useMemo(() => DIRECTORIO_DATA.categories.find(c => c.id === 'ori') || {}, []);
  const t2dCategory = useMemo(() => DIRECTORIO_DATA.categories.find(c => c.id === 't2d') || {}, []);
  const repCategory = useMemo(() => DIRECTORIO_DATA.categories.find(c => c.id === 'representacion') || {}, []);
  const empCategory = useMemo(() => DIRECTORIO_DATA.categories.find(c => c.id === 'empleabilidad') || {}, []);

  // Selección de categoría actual en Directorio institucional (solo facultades, escuelas y oficinas)
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
          
          {/* Logo Oficial y Título Institucional */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <img 
              src="assets/up_logo_clean.png" 
              alt="Logo UP" 
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div className="h-6 w-[1px] bg-slate-300 hidden sm:block"></div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-[#0B2240] tracking-tight uppercase leading-snug">
                UP GUÍA RÁPIDA DE CANALES OFICIALES INSTITUCIONALES
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
        className="relative text-white py-8 sm:py-10 px-4 sm:px-6 overflow-hidden bg-[#0B2240] shadow-md"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(11, 34, 64, 0.94) 0%, rgba(15, 44, 89, 0.88) 50%, rgba(11, 34, 64, 0.82) 100%), url('assets/up_campus_facade_hd.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%'
        }}
      >
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-end justify-between gap-4 md:gap-6">
          
          {/* Lado Izquierdo: Textos y Buscador */}
          <div className="flex-1 w-full max-w-2xl">
            
            {/* Píldora: ¡TODO ESTÁ AQUÍ! */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A4C]/90 border border-blue-400/40 text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-3.5 shadow-sm">
              <span>¡TODO ESTÁ AQUÍ!</span>
            </div>

            {/* Titular Principal: ¿Tienes dudas? Encuentra el canal correcto. */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2.5">
              <span className="text-white">¿No sabes a dónde acudir?</span><br />
              <span className="text-[#F59E0B]">Encuentra el canal adecuado.</span>
            </h1>

            {/* Subtítulo Oficial */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed mb-6 font-normal">
              Todos los canales oficiales para estudiantes de pregrado: a quién escribir, cómo y dónde encontrar más información.
            </p>

            {/* 4 Reglas Rápidas Institucionales de la Guía UP */}
            <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2 bg-[#102A4C]/90 border border-blue-400/30 rounded-xl px-2.5 py-1.5 text-blue-100 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-blue-500/30 text-blue-300 font-extrabold flex items-center justify-center text-[10.5px] shrink-0">1</span>
                <span className="leading-tight font-medium text-[11px]">Busca tu duda</span>
              </div>
              <div className="flex items-center gap-2 bg-[#102A4C]/90 border border-blue-400/30 rounded-xl px-2.5 py-1.5 text-blue-100 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-blue-500/30 text-blue-300 font-extrabold flex items-center justify-center text-[10.5px] shrink-0">2</span>
                <span className="leading-tight font-medium text-[11px]">Escribe desde tu correo UP</span>
              </div>
              <div className="flex items-center gap-2 bg-[#102A4C]/90 border border-blue-400/30 rounded-xl px-2.5 py-1.5 text-blue-100 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 font-extrabold flex items-center justify-center text-[10.5px] shrink-0">3</span>
                <span className="leading-tight font-medium text-[11px]">Asunto: «Tema - Código»</span>
              </div>
              <div className="flex items-center gap-2 bg-[#102A4C]/90 border border-blue-400/30 rounded-xl px-2.5 py-1.5 text-blue-100 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 font-extrabold flex items-center justify-center text-[10.5px] shrink-0">4</span>
                <span className="leading-tight font-medium text-[11px]">Enlaces oficiales directos</span>
              </div>
            </div>

            {/* Barra de Consulta Redondeada en Lenguaje Natural */}
            <div className="relative flex items-center bg-white rounded-full shadow-2xl border-2 border-transparent focus-within:border-blue-400 transition-all overflow-hidden p-1 max-w-2xl mb-3">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Icon name="search" className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Escribe tu problema con tus propias palabras (ej: 'siento que voy a desaprobar y quiero retirarme', 'necesito apoyo psicológico', 'dónde está el gimnasio')..."
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

            {/* Píldoras de Frecuentes */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300">
              <span className="text-slate-300 font-medium">Frecuentes:</span>
              <button onClick={() => setSearchQuery('siento que voy a desaprobar un examen y quiero retirarme')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Retiro de curso</button>
              <button onClick={() => setSearchQuery('necesito apoyo psicológico')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Cita psicológica</button>
              <button onClick={() => setSearchQuery('dónde está el gimnasio')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Gym UP</button>
              <button onClick={() => setSearchQuery('donde pago mi boleta de pensión')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Pensiones</button>
              <button onClick={() => setSearchQuery('facultad de ingeniería f400')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Ingeniería F400</button>
              <button onClick={() => setSearchQuery('quiero irme de intercambio disney')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Intercambio ORI</button>
              <button onClick={() => setSearchQuery('olvidé mi contraseña de powercampus')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">T2D Contraseña</button>
              <button onClick={() => setSearchQuery('convenio de prácticas')} className="px-2.5 py-0.5 rounded-full bg-[#102A4C]/80 hover:bg-[#16365F] text-slate-200 border border-blue-400/20 transition">Prácticas</button>
            </div>

            {/* Panel de Resultados Dinámicos del Buscador Inteligente */}
            {searchQuery.trim() && (
              <div className="mt-5 space-y-4 text-left">
                {searchEngineResults.principal ? (
                  <>
                    {/* Tarjeta Dinámica Principal */}
                    <DynamicResultCard 
                      channel={searchEngineResults.principal}

                      copyToClipboard={copyToClipboard}
                      onOpenMap={handleOpenMap}
                    />

                    {/* Tarjeta Secundaria de Alternativa Contextual */}
                    {searchEngineResults.alternativa && (
                      <SecondaryAlternativeCard 
                        alternativa={searchEngineResults.alternativa}
                        onSelectAlternative={(altChannel) => {
                          setSearchQuery(altChannel.asunto || altChannel.tramite);
                        }}
                      />
                    )}

                    {/* Otras Opciones Detectadas */}
                    {searchEngineResults.otros && searchEngineResults.otros.length > 0 && (
                      <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-md">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                          Otras opciones encontradas para tu consulta:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {searchEngineResults.otros.map((other, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => setSearchQuery(other.asunto || other.tramite)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-xs font-semibold text-slate-700 transition flex items-center gap-1.5"
                            >
                              <span className="text-[#0B2240] font-bold">{other.oficina.split('—')[0].trim()}:</span>
                              <span>{other.tramite.split('/')[0].trim()}</span>
                              <Icon name="chevron-right" className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white text-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Icon name="search" className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-[#0B2240]">
                      No encontramos una coincidencia directa para "{searchQuery}"
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Intenta con palabras clave como <span className="font-semibold text-blue-700">retiro de curso, cita psicológica, gym up, pensión, f400, prácticas, contraseña</span>; o explora los 4 canales maestros de abajo.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Lado Derecho: Mascota Búho UP (Tamaño exacto a Imagen 2 con Búho Pensando) */}
          <div className="flex flex-col items-center justify-end flex-shrink-0 relative self-center md:self-end z-20">
            <img 
              src="assets/buho_thinking.png" 
              alt="Mascota Búho UP" 
              className="w-36 sm:w-40 md:w-48 lg:w-[195px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 pointer-events-none select-none block"
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
              LOS 8 CANALES MAESTROS INTERACTIVOS Y SEPARADOS
              (Diseño de Cuadro Original con los 8 Canales Oficiales UP)
              ================================================================ */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Selecciona el canal que necesitas consultar:</span>
              <span className="text-[11px] text-blue-300/80 font-normal hidden sm:inline">8 canales oficiales para pregrado</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
              {[
                { id: 'rapido', title: '¿No estás seguro?', desc: 'Tu duda → a quién escribir' },
                { id: 'daar', title: 'DAAR', desc: 'Matrícula, notas y trámites' },
                { id: 'bfe', title: 'BFE', desc: 'Bienestar, salud y Casa UP' },
                { id: 'ori', title: 'ORI', desc: 'Intercambios, Disney y becas' },
                { id: 'empleabilidad', title: 'Empleabilidad', desc: 'Prácticas y Red Alumni' },
                { id: 't2d', title: 'T2D', desc: 'Soporte TI, claves y sistemas' },
                { id: 'representacion', title: 'REUP y REA', desc: 'Comunidad, sílabos y apoyo' },
                { id: 'directorio', title: 'Directorio', desc: 'Facultades y teléfonos UP' },
              ].map((card) => {
                const isActive = activeSection === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => {
                      setActiveSection(card.id);
                      if (card.id === 'directorio') setActiveDirCat('facultades');
                    }}
                    className={`p-3.5 sm:p-4 rounded-xl text-left transition-all border flex flex-col justify-between min-h-[78px] sm:min-h-[86px] ${
                      isActive
                        ? 'bg-[#16365F] border-blue-400 ring-2 ring-blue-400/50 shadow-lg translate-y-[-2px]'
                        : 'bg-[#102A4C] border-[#1D3D66] hover:bg-[#133055] hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 w-full">
                      <span className={`font-bold text-sm sm:text-base ${isActive ? 'text-amber-300' : 'text-white'}`}>
                        {card.title}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 truncate w-full">
                      {card.desc}
                    </div>
                  </button>
                );
              })}
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
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/buho_thinking.png" 
                  alt="Búho pensando UP" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    ¿No estás seguro?
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Ubica tu tema en la columna izquierda y presiona cualquier fila para activar el enrutador y generar tu asunto oficial.
                  </p>
                </div>
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
                                        Asunto pre-armado: <span className="font-mono text-slate-800">«{row.duda.split(',')[0]}»</span>
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const subj = row.duda.split(',')[0];
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
                                        href={`mailto:${row.correo}?subject=${encodeURIComponent(row.duda.split(',')[0])}`}
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

                                {/* Enlace directo y servicios para canales informativos (T2D, REA, REUP, etc.) */}
                                {!row.correo && (
                                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                                    {row.pildoras && (
                                      <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                                          Servicios y accesos incluidos:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                          {row.pildoras.map((p, pIdx) => (
                                            <span key={pIdx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                              <span>{p}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {row.horario && (
                                      <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                                        <Icon name="clock" className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                        <span>Horario de atención: <strong>{row.horario}</strong></span>
                                      </div>
                                    )}

                                    {row.enlace && (
                                      <div className="pt-1 flex flex-wrap items-center gap-2">
                                        <a
                                          href={row.enlace}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="py-1.5 px-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition inline-flex items-center gap-1.5 shadow-sm"
                                        >
                                          <span>{row.canal === 'T2D' ? 'Ingresar a Servicios T2D' : `Abrir Linktree de ${row.canal}`}</span>
                                          <Icon name="external-link" className="w-3.5 h-3.5" />
                                        </a>
                                      </div>
                                    )}
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
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/buho_study.png" 
                  alt="Búho estudiando UP" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
                />
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 shadow-2xs">
                    TRÁMITES ACADÉMICOS
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    DAAR – Servicios Académicos y Registro
                  </h2>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Es la oficina para todo lo que afecta tu matrícula, tus notas y tu plan de estudios.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
                <img 
                  src="assets/daar_logo.png" 
                  alt="Logo DAAR" 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

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

                {/* Si es Matrícula, Retiro de curso, Retiro de semestre o Reserva: Trámite por Autoservicio */}
                {['d-matr', 'd-reser', 'd-retcurso', 'd-retsem'].includes(activeDaarItem.id) ? (
                  <div className="space-y-4 mb-5">
                    {/* Tarjeta Destacada de Autoservicio */}
                    <div className="bg-blue-50/80 border-2 border-blue-300 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1E40AF] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Icon name="check" className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-[#0B2240] text-sm sm:text-base">
                            Trámite 100% en Línea mediante Autoservicio
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                            Este trámite no se gestiona mediante correo ordinario. Se realiza de forma directa en las plataformas oficiales UP en las fechas establecidas en el Calendario Académico:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <a
                          href="https://powercampus.up.edu.pe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md transition flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-blue-600 block">Autoservicio Principal</span>
                            <span className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700">PowerCampus UP</span>
                            <span className="text-[11px] text-slate-500 block">Matrícula regular y retiros</span>
                          </div>
                          <Icon name="external-link" className="w-4 h-4 text-blue-600 shrink-0" />
                        </a>

                        <a
                          href="https://experience.up.edu.pe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md transition flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-blue-600 block">Portal del Alumno</span>
                            <span className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700">UP Experience</span>
                            <span className="text-[11px] text-slate-500 block">Cronogramas y acceso rápido</span>
                          </div>
                          <Icon name="external-link" className="w-4 h-4 text-blue-600 shrink-0" />
                        </a>
                      </div>

                      {/* Guía textual de ruta oficial en PowerCampus */}
                      <div className="mt-4 bg-white border border-blue-200 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name="info" className="w-4 h-4 text-blue-700" />
                        </div>
                        <div className="text-xs text-slate-700 flex-1">
                          <strong className="text-[#0B2240] block font-bold mb-0.5">
                            📍 Ruta oficial en PowerCampus:
                          </strong>
                          <p className="leading-relaxed text-slate-600">
                            Inicia sesión con tu correo institucional y dirígete al menú superior: <strong className="text-slate-900 font-semibold">«Información General» → «Trámites y Documentos»</strong> para acceder a las solicitudes virtuales de carné universitario, requisito de inglés, convenios de prácticas, cartas de presentación y verificación académica.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Fallback de Excepción para Casos Especiales */}
                    <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-slate-700">
                          <strong className="text-amber-950 font-bold block mb-0.5">
                            ¿Tu caso es excepcional o no corresponde a un trámite automático?
                          </strong>
                          <span>Si presentas alguna incidencia técnica o trámite especial, escribe directamente a pregrado@up.edu.pe:</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => copyToClipboard('pregrado@up.edu.pe', '¡Correo pregrado@up.edu.pe copiado!')}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-amber-300 rounded-lg font-bold text-slate-800 text-xs flex items-center gap-1 transition"
                          >
                            <Icon name="copy" className="w-3.5 h-3.5" />
                            <span>Copiar correo</span>
                          </button>
                          <a
                            href="mailto:pregrado@up.edu.pe?subject=Consulta%20Excepcional%20DAAR%20-%20Incidencia"
                            className="px-3 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition shadow-xs"
                          >
                            <Icon name="mail" className="w-3.5 h-3.5" />
                            <span>Escribir correo</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Generador de Asunto Oficial para Otros Trámites */}
                    <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm space-y-3 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0B2240] uppercase tracking-wider text-[11px]">
                          Asunto Oficial Recomendado:
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-2">
                        <span className="font-semibold break-all">
                          «{activeDaarItem.nombre}»
                        </span>
                        <button
                          onClick={() => {
                            const subj = activeDaarItem.nombre;
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
                        href={`mailto:${activeDaarItem.correo}?subject=${encodeURIComponent(activeDaarItem.nombre)}`}
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
                  </>
                )}

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
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/buho_idea.png" 
                  alt="Búho con idea UP" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
                />
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 shadow-2xs">
                    BIENESTAR Y VIDA UNIVERSITARIA
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    BFE – Dirección de Bienestar y Formación Estudiantil
                  </h2>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Contribuir al bienestar y a la formación integral del estudiante (Bienestar Estudiantil y Formación y Experiencia Estudiantil).
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
                <img 
                  src="assets/bfe_logo.png" 
                  alt="Logo BFE" 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

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
                <div className="space-y-0.5">
                  <a href="tel:012190100" className="font-bold text-[#1E40AF] hover:underline block">
                    (01) 219-0100 <span className="font-normal text-slate-600 text-[11px]">(Anexos: 2390 / 2261)</span>
                  </a>
                  <a href="https://www.up.edu.pe" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1">
                    <span>www.up.edu.pe</span>
                    <Icon name="external-link" className="w-2.5 h-2.5" />
                  </a>
                </div>
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
                    href={`mailto:consejeriapsicologica@up.edu.pe?subject=${encodeURIComponent(`Solicitud Consejería Psicológica`)}`}
                    className="px-4 py-2 bg-[#1E40AF] text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition"
                  >
                    Solicitar Cita Psicológica
                  </a>
                  <a
                    href={`mailto:consejeriaestudiantil@up.edu.pe?subject=${encodeURIComponent(`Solicitud Consejería Estudiantil`)}`}
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
                          href={`mailto:${item.correo}?subject=${encodeURIComponent(`${item.nombre}`)}`}
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
                        href={`mailto:${activeBfeItem.correo}?subject=${encodeURIComponent(`Consulta ${activeBfeItem.nombre}`)}`}
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

                {/* ====================================================================
            SECCIÓN: OFICINA DE RELACIONES INTERNACIONALES (ORI)
            ==================================================================== */}
        {activeSection === 'ori' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/buho_travel.png" 
                  alt="Búho ORI UP" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
                />
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 shadow-2xs">
                    RELACIONES INTERNACIONALES
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    ORI – Oficina de Relaciones Internacionales
                  </h2>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Oportunidades académicas, convenios globales y experiencias en el extranjero para estudiantes UP.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
                <img 
                  src="assets/ori_logo.png" 
                  alt="Logo ORI" 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            {/* Franja de Información Rápida ORI */}
            <div className="bg-[#EBF3FC] rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-blue-100 text-xs">
              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">CORREO OFICIAL</div>
                <button
                  onClick={() => copyToClipboard('intercambios@up.edu.pe', '¡Correo de ORI copiado!')}
                  className="font-bold text-[#1E40AF] hover:underline text-left flex items-center gap-1"
                >
                  <span>intercambios@up.edu.pe</span>
                  <Icon name="copy" className="w-3 h-3 text-[#1E40AF]" />
                </button>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">OFICINA / SEDE</div>
                <div className="font-semibold text-slate-800">Pabellón I · 2.° piso</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">ANEXOS TELEFÓNICOS</div>
                <div className="font-semibold text-slate-800">2137 / 2176</div>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">DESTINOS GLOBALES</div>
                <div className="font-semibold text-slate-800">América, Europa, Asia y Oceanía</div>
              </div>
            </div>

<div className="space-y-6 mb-6 animate-fade-in">
                
                {/* Banner Oficial ORI (Fondo de Imágenes UP + Búho Viajero) */}
                <div 
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  style={{
                    backgroundImage: "linear-gradient(to right, rgba(11, 34, 64, 0.95) 0%, rgba(15, 44, 89, 0.88) 50%, rgba(11, 34, 64, 0.80) 100%), url('assets/ori_banner_bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%'
                  }}
                >
                  <div className="space-y-2 flex-1 max-w-2xl">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-white text-rose-700 text-xs font-extrabold uppercase tracking-wider shadow-sm inline-block">
                        INTERNACIONAL
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      ORI – Oficina de Relaciones Internacionales
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                      Te ayuda a estudiar, hacer prácticas o llevar cursos en el extranjero.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 pt-2">
                      <span className="flex items-center gap-1 font-mono text-rose-200">
                        <Icon name="mail" className="w-3.5 h-3.5" /> outgoing@up.edu.pe
                      </span>
                      <span className="flex items-center gap-1 font-mono text-cyan-200">
                        <Icon name="mail" className="w-3.5 h-3.5" /> shortprograms@up.edu.pe
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="map-pin" className="w-3.5 h-3.5 text-slate-400" /> Jr. Gral. Luis Sánchez Cerro 2141
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0 self-end md:self-center">
                    <img 
                      src="assets/buho_travel.png" 
                      alt="Búho viajero UP" 
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-xl"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="https://intercambio.up.edu.pe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
                      >
                        <span>Sistema de Intercambio</span>
                        <Icon name="external-link" className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://ori.up.edu.pe/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 border border-white/20"
                      >
                        <span>Portal ORI</span>
                        <Icon name="external-link" className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Sub-Tabs de Navegación Dinámica sin Muros de Texto */}
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                  {[
                    { id: 'outgoing', label: '✈️ Intercambio Semestral' },
                    { id: 'cortos', label: '🌍 Programas Cortos (Faculty Led)' },
                    { id: 'disney', label: '🏰 Disney Academic Exchange' },
                    { id: 'becas', label: '🎓 Becas Internacionales' },
                    { id: 'convenios', label: '🌐 UP en el Mundo' },
                    { id: 'faqs', label: '❓ Preguntas Frecuentes (17)' }
                  ].map((tab) => {
                    const isTabActive = activeOriTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveOriTab(tab.id)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition ${
                          isTabActive
                            ? 'bg-[#0B2240] text-white shadow-sm ring-1 ring-blue-400'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* CONTENIDO SUB-TAB: 1. OUTGOING (INTERCAMBIO SEMESTRAL) */}
                {activeOriTab === 'outgoing' && (
                  <div className="space-y-5 animate-fade-in">
                    {/* Tarjetas de Requisitos Clave */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">CRÉDITOS MÍNIMOS</div>
                        <div className="text-lg font-extrabold text-[#0B2240] mt-0.5">20 créditos</div>
                        <div className="text-[11px] text-slate-500">Al momento de postular</div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">PROMEDIO PONDERADO</div>
                        <div className="text-lg font-extrabold text-[#0B2240] mt-0.5">≥ 13.00</div>
                        <div className="text-[11px] text-slate-500">Sin riesgo académico</div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                        <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">NIVEL DE IDIOMA</div>
                        <div className="text-lg font-extrabold text-[#0B2240] mt-0.5">Inglés Avanzado</div>
                        <div className="text-[11px] text-slate-500">Certificado ≤ 2 años</div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                        <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">CONVOCATORIAS</div>
                        <div className="text-xs font-bold text-[#0B2240] mt-1">Ene–May / Set–Dic</div>
                        <div className="text-[11px] text-slate-500">Para 1.º o 2.º semestre</div>
                      </div>
                    </div>

                    {/* Beneficios & Consideraciones Económicas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                        <h4 className="font-bold text-sm text-[#0B2240] flex items-center gap-1.5">
                          <Icon name="sparkles" className="w-4 h-4 text-rose-600" />
                          <span>Beneficios del Intercambio Semestral</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-700">
                          {oriCategory.outgoing.beneficios.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">✔</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                        <h4 className="font-bold text-sm text-[#0B2240] flex items-center gap-1.5">
                          <Icon name="doc" className="w-4 h-4 text-blue-600" />
                          <span>Estructura Oficial de Pagos</span>
                        </h4>
                        <div className="space-y-1.5 text-xs">
                          {oriCategory.outgoing.pagos.map((p, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200/80">
                              <span className="text-slate-600">{p.concepto}:</span>
                              <span className="font-bold text-[#0B2240] text-right">{p.monto}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nota Importante de Exoneración y Botones */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <strong>Exoneración de enseñanza:</strong> Estás exonerado de pagar pensiones en la universidad de destino. Los cursos pasan por prerreconocimiento y se pagan en 4 armadas según tu escala UP.
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href="https://intercambio.up.edu.pe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition"
                        >
                          Iniciar Aplicación ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENIDO SUB-TAB: 2. PROGRAMAS CORTOS */}
                {activeOriTab === 'cortos' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Faculty Led */}
                      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                            3 o 4 Créditos + 1 Internacionalización
                          </span>
                          <Icon name="sparkles" className="w-4 h-4 text-rose-600" />
                        </div>
                        <h4 className="font-extrabold text-base text-[#0B2240]">Faculty Led Programs</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Cursos intensivos en el extranjero guiados por un docente de la UP para profundizar una disciplina con experiencia internacional directa.
                        </p>
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Destinos y programas de ejemplo:</div>
                          {oriCategory.programasCortos.facultyLed.ejemplos.map((ej, idx) => (
                            <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                              <span>{ej}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          Requisitos: Mayor de 18 años, pasaporte vigente y visa si aplica. El costo no incluye pasajes.
                        </div>
                      </div>

                      {/* Misiones Académicas y Tailor-Made */}
                      <div className="space-y-4">
                        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                              2 Créditos + 1 Internacionalización
                            </span>
                            <Icon name="globe" className="w-4 h-4 text-blue-600" />
                          </div>
                          <h4 className="font-extrabold text-base text-[#0B2240]">Misiones Académicas</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Experiencias formativas internacionales que combinan visitas a instituciones académicas y corporativas con actividades aplicativas y culturales. Acompañamiento docente permanente.
                          </p>
                          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                            Requisitos: Mayor de 18 años, prerrequisitos del curso, pasaporte vigente y visa.
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                          <h4 className="font-bold text-xs text-[#0B2240] uppercase tracking-wider">Tailor-made Programs</h4>
                          <p className="text-xs text-slate-600">
                            Programas internacionales personalizados y seminarios ejecutivos orientados a instituciones aliadas. Contacto directo: <strong className="text-slate-800">shortprograms@up.edu.pe</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENIDO SUB-TAB: 3. DISNEY ACADEMIC EXCHANGE */}
                {activeOriTab === 'disney' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-[#0B2240] text-white p-6 rounded-2xl shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                            Programa Exclusivo
                          </span>
                          <h3 className="text-2xl font-extrabold tracking-tight mt-2">Disney Academic Exchange</h3>
                          <p className="text-xs sm:text-sm text-slate-200 mt-1">
                            Forma parte de The Walt Disney Company mientras estudias y acumulas créditos universitarios oficiales.
                          </p>
                        </div>
                        <a
                          href="mailto:outgoing@up.edu.pe?subject=Consulta%20Disney%20Academic%20Exchange"
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#0B2240] font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow"
                        >
                          <Icon name="mail" className="w-4 h-4" />
                          <span>Escribir a outgoing@up.edu.pe</span>
                        </a>
                      </div>

                      {/* 2 Fases del Programa */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-white/10 rounded-xl p-3.5 border border-white/20">
                          <div className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Fase 1: Académica</div>
                          <div className="text-sm font-bold mt-0.5">Montclair State University (New Jersey)</div>
                          <div className="text-xs text-slate-300 mt-1">10 días de clases universitarias intensivas.</div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3.5 border border-white/20">
                          <div className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Fase 2: Prácticas</div>
                          <div className="text-sm font-bold mt-0.5">Walt Disney World (Orlando, Florida)</div>
                          <div className="text-xs text-slate-300 mt-1">Periodo de prácticas oficiales remuneradas.</div>
                        </div>
                      </div>

                      {/* Triple Reconocimiento */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/20">
                        <div className="p-2 bg-white/5 rounded-lg">
                          <div className="text-base sm:text-xl font-extrabold text-amber-300">6 Créditos</div>
                          <div className="text-[10px] sm:text-xs text-slate-300">Académicos UP</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg">
                          <div className="text-base sm:text-xl font-extrabold text-amber-300">1 Práctica</div>
                          <div className="text-[10px] sm:text-xs text-slate-300">Preprofesional</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg">
                          <div className="text-base sm:text-xl font-extrabold text-amber-300">1 Crédito</div>
                          <div className="text-[10px] sm:text-xs text-slate-300">Internacionalización</div>
                        </div>
                      </div>
                    </div>

                    {/* Certificaciones y Puntajes Mínimos */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Certificaciones de idioma inglés y puntajes mínimos aceptados:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {oriCategory.disney.certificaciones.map((c, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                            <div className="text-xs font-bold text-slate-600 uppercase">{c.examen}</div>
                            <div className="text-lg font-extrabold text-[#1E40AF] mt-0.5">{c.puntaje}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-slate-600 pt-1">
                        * Los certificados deben tener una antigüedad no mayor a dos años. Requisitos: ser mayor de 18 años, alumno regular UP, promedio aprobado y constancia de notas.
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENIDO SUB-TAB: 4. BECAS INTERNACIONALES */}
                {activeOriTab === 'becas' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {oriCategory.becas.map((b) => (
                        <div key={b.id} className={`border-2 rounded-2xl p-5 space-y-3 shadow-xs ${b.color}`}>
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[10px] font-bold border border-slate-200">
                              {b.tag}
                            </span>
                            <Icon name="academic" className="w-4 h-4 text-slate-700" />
                          </div>
                          <h4 className="font-extrabold text-base text-[#0B2240]">{b.nombre}</h4>
                          <div className="text-xs text-slate-700 space-y-1.5">
                            <div><strong>Destinos:</strong> {b.destinos}</div>
                            <div><strong>Periodo:</strong> {b.periodo}</div>
                            <div><strong>Requisitos:</strong> {b.requisitos}</div>
                            <div><strong>Beneficios:</strong> {b.beneficios}</div>
                          </div>
                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                            <span className="text-slate-500">Canal: outgoing@up.edu.pe</span>
                            <a
                              href="mailto:outgoing@up.edu.pe?subject=Consulta%20sobre%20Beca%20Internacional"
                              className="font-bold text-[#1E40AF] hover:underline"
                            >
                              Consultar Convocatoria ↗
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONTENIDO SUB-TAB: 5. CONVENIOS INTERNACIONALES */}
                {activeOriTab === 'convenios' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                      <h4 className="font-bold text-sm text-[#0B2240] flex items-center gap-1.5">
                        <Icon name="globe" className="w-4 h-4 text-blue-600" />
                        <span>UP en el Mundo: Convenios en los 5 Continentes</span>
                      </h4>
                      <p className="text-xs text-slate-600">
                        La Universidad del Pacífico mantiene convenios de intercambio académico con prestigiosas universidades asociadas en todo el mundo:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {oriCategory.convenios.continentes.map((cont, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                            <div className="text-xs font-bold text-[#0B2240]">{cont.nombre}</div>
                            <div className="text-xs text-slate-600">{cont.detalle}</div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Consulta el directorio actualizado en ori.up.edu.pe</span>
                        <a
                          href={oriCategory.convenios.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#1E40AF] text-white font-bold rounded-lg hover:bg-blue-800 transition"
                        >
                          Ver Directorio de Convenios ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENIDO SUB-TAB: 6. PREGUNTAS FRECUENTES (17 FAQS) */}
                {activeOriTab === 'faqs' && (
                  <div className="space-y-2.5 animate-fade-in">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Banco oficial de preguntas frecuentes de ORI ({oriCategory.faqs.length} consultas):
                    </div>
                    {oriCategory.faqs.map((faq, idx) => {
                      const isOpen = activeOriFaq === idx;
                      return (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                          <button
                            onClick={() => setActiveOriFaq(isOpen ? null : idx)}
                            className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                          >
                            <span className="font-bold text-xs sm:text-sm text-[#0B2240]">{faq.q}</span>
                            <Icon name={isOpen ? "chevron-down" : "chevron-right"} className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-3.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5 leading-relaxed bg-slate-50/50">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
          </div>
        )}

        {/* ====================================================================
            SECCIÓN: EMPLEABILIDAD Y RED ALUMNI UP
            ==================================================================== */}
        {activeSection === 'empleabilidad' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/buho_formal.png" 
                  alt="Búho Formal Empleabilidad UP" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
                />
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 shadow-2xs">
                    DESARROLLO PROFESIONAL
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    Empleabilidad y Red Alumni
                  </h2>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Prácticas preprofesionales, convenios, empleo y la red de egresados de la Universidad del Pacífico.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shrink-0">
                <Icon name="briefcase" className="w-4 h-4 text-[#1E40AF]" />
                <span>Anexo 2253</span>
              </div>
            </div>

            {/* Banner Nativo de Empleabilidad (Fondo Imágenes UP + Búho Formal) */}
            <div 
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(20, 24, 60, 0.94) 0%, rgba(30, 36, 90, 0.88) 50%, rgba(20, 24, 60, 0.82) 100%), url('assets/empleabilidad_banner_bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%'
              }}
            >
              <div className="space-y-2 flex-1 max-w-2xl text-left">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white text-purple-800 text-xs font-extrabold uppercase tracking-wider shadow-sm inline-block">
                    DESARROLLO PROFESIONAL
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Empleabilidad y Red Alumni
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                  Prácticas preprofesionales, empleo y la red de egresados de la Universidad del Pacífico.
                </p>
              </div>

              <div className="shrink-0 self-end md:self-center">
                <img 
                  src="assets/buho_formal.png" 
                  alt="Búho formal UP" 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Áreas Oficiales de Empleabilidad */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[
                {
                  id: "practicas",
                  nombre: "Prácticas Preprofesionales",
                  desc: "Convalidación y registro de convenios de prácticas preprofesionales obligatorias.",
                  correo: "practicaspre@up.edu.pe",
                  anexo: "2253",
                  icono: "briefcase"
                },
                {
                  id: "empleo",
                  nombre: "Empleabilidad y Bolsa de Trabajo",
                  desc: "Orientación laboral, asesoría curricular y ofertas de empleo exclusivas UP.",
                  correo: "empleabilidad@up.edu.pe",
                  anexo: "2253",
                  icono: "award"
                },
                {
                  id: "alumni",
                  nombre: "Red Alumni UP",
                  desc: "Red de egresados y vinculación profesional permanente.",
                  correo: "redalumni@up.edu.pe",
                  anexo: "2253",
                  icono: "users"
                }
              ].map((item) => (
                <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-blue-400 transition shadow-2xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0B2240]">{item.nombre}</span>
                      <Icon name={item.icono} className="w-4 h-4 text-[#1E40AF]" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    <div className="text-[11px] font-mono text-slate-500 font-semibold">Anexo: {item.anexo}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => copyToClipboard(item.correo, '¡Correo copiado!')}
                      className="text-xs font-bold text-[#1E40AF] hover:underline flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{item.correo}</span>
                      <Icon name="copy" className="w-3 h-3 shrink-0" />
                    </button>
                    <a
                      href={'mailto:' + item.correo + '?subject=' + encodeURIComponent('Consulta ' + item.nombre)}
                      className="px-3 py-1 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition shrink-0"
                    >
                      Redactar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            SECCIÓN: T2D – SERVICIOS INFORMÁTICOS Y SOPORTE
            ==================================================================== */}
        {activeSection === 't2d' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0">
                  <img 
                    src="assets/t2d_logo.png" 
                    alt="Logo T2D" 
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 shadow-2xs">
                    SOPORTE E INFORMÁTICA
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    T2D – Servicios Informáticos y de Soporte
                  </h2>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Mesa de ayuda institucional, recuperación de contraseñas, sistemas académicos y software UP.
                  </p>
                </div>
              </div>

              <a
                href="https://serviciost2d.up.edu.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0B2240] hover:bg-[#16365F] text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-sm shrink-0"
              >
                <span>Portal de Autoservicio T2D</span>
                <Icon name="external-link" className="w-3.5 h-3.5" />
              </a>
            </div>

<div className="space-y-6 mb-6 animate-fade-in">
                {/* Banner Informativo T2D con Horario */}
                <div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#16365F] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl border border-white/20 shadow-xs shrink-0">
                      <img src="assets/t2d_logo.png" alt="Logo T2D" className="h-11 w-11 object-contain" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-cyan-400/30">
                        <Icon name="shield" className="w-3.5 h-3.5" />
                        <span>Mesa de Ayuda Tecnológica UP</span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">T2D – Servicios Informáticos y de Soporte</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5 flex items-center gap-2">
                        <Icon name="clock" className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                        <span>Atención: L–V 7:30 a.m. – 9:30 p.m. · Sáb 7:30 a.m. – 5:00 p.m.</span>
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://serviciost2d.up.edu.pe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#0B2240] font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 shadow flex-shrink-0"
                  >
                    <span>Ir a Portal T2D</span>
                    <Icon name="external-link" className="w-4 h-4" />
                  </a>
                </div>

                {/* Cuadrícula Dinámica de los 6 Servicios Clave de T2D */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t2dCategory.servicios.map((srv) => (
                    <div key={srv.id} className="bg-white border-2 border-slate-200 hover:border-cyan-400 rounded-2xl p-4 transition shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 group">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${srv.tagColor}`}>
                            {srv.tag}
                          </span>
                          <Icon name={srv.icono} className="w-4 h-4 text-cyan-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="font-bold text-sm text-[#0B2240] leading-snug">{srv.nombre}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{srv.detalle}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">serviciost2d.up.edu.pe</span>
                        <a
                          href={srv.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#1E40AF] hover:text-blue-800 flex items-center gap-1 group-hover:underline"
                        >
                          <span>{srv.enlaceTexto}</span>
                          <Icon name="arrow-right" className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}

        {/* ====================================================================
            SECCIÓN: REPRESENTACIÓN ESTUDIANTIL (REUP Y PROGRAMA REA)
            ==================================================================== */}
        {activeSection === 'representacion' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/reup_buho_mascota.jpg" 
                  alt="Mascota REUP" 
                  className="w-14 h-14 object-contain shrink-0 rounded-xl border border-slate-200"
                />
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 shadow-2xs">
                    REPRESENTACIÓN ESTUDIANTIL
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                    REUP y Programa REA – Comunidad UP
                  </h2>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Canales oficiales, apoyo entre pares, banco de sílabos, causales de baja y grupos de WhatsApp estudiantiles.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <img src="assets/reup_logo.jpg" alt="Logo REUP" className="h-9 w-auto object-contain rounded border border-slate-200" />
                <img src="assets/rea_logo.jpg" alt="Logo REA" className="h-9 w-auto object-contain rounded border border-slate-200" />
              </div>
            </div>

<div className="space-y-8 mb-6 animate-fade-in">
                {repCategory.organizaciones.map((org) => (
                  <div key={org.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                    {/* Encabezado con Handle y Linktree */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <img 
                          src={org.id === 'rea' ? 'assets/rea_logo.jpg' : 'assets/reup_logo.jpg'} 
                          alt={org.nombre}
                          className="w-12 h-12 rounded-full border-2 border-slate-200 shadow-xs object-cover shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2240]">{org.nombre}</h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold">
                              {org.handle}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{org.subtitulo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {org.id === 'reup' && (
                          <img 
                            src="assets/reup_buho_mascota.jpg" 
                            alt="Mascota REUP" 
                            className="h-10 w-auto object-contain hidden md:block" 
                          />
                        )}
                        <a
                          href={org.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                        >
                          <Icon name="instagram" className="w-3.5 h-3.5" />
                          <span>Abrir Linktree ({org.handle})</span>
                          <Icon name="external-link" className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* 4 Tarjetas Dinámicas e Interactivas de Recursos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {org.recursos.map((rec, rIdx) => (
                        <div key={rIdx} className="bg-white border border-slate-200 hover:border-purple-300 rounded-xl p-3.5 space-y-2 flex flex-col justify-between hover:shadow transition">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                                {rec.tag}
                              </span>
                              <Icon name={rec.icono} className="w-4 h-4 text-purple-600" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-[#0B2240]">{rec.titulo}</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{rec.desc}</p>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <a
                              href={org.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-1 px-2.5 bg-slate-50 hover:bg-purple-50 text-purple-800 hover:text-purple-900 border border-slate-200 hover:border-purple-200 rounded-lg text-xs font-semibold flex items-center justify-between transition"
                            >
                              <span>{rec.accion}</span>
                              <Icon name="chevron-right" className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* ====================================================================
            SECCIÓN: DIRECTORIO INSTITUCIONAL (FACULTADES, ESCUELAS Y SERVICIOS)
            ==================================================================== */}
        {activeSection === 'directorio' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in">
            
            {/* Píldora de Categoría */}
            <div className="mb-3">
              <span className="inline-block bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                DIRECTORIO INSTITUCIONAL
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mb-2">
              Directorio de Facultades, Escuelas y Dependencias UP
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Canales oficiales, anexos y correos de facultades, escuelas de posgrado y oficinas administrativas de la Universidad del Pacífico.
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
                <a 
                  href="https://www.up.edu.pe" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-[#1E40AF] hover:underline flex items-center gap-1"
                >
                  <span>www.up.edu.pe</span>
                  <Icon name="external-link" className="w-3 h-3 text-[#1E40AF]" />
                </a>
              </div>

              <div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">ADMISIÓN DIRECTO</div>
                <div className="font-semibold text-slate-800">{DIRECTORIO_DATA.header.admisionDirecto}</div>
              </div>
            </div>

            {/* Pestañas de las 3 categorías institucionales del Directorio */}
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Selecciona la dependencia institucional:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {DIRECTORIO_DATA.categories.filter(c => ['facultades', 'escuelas', 'oficinas'].includes(c.id)).map((cat) => {
                  const isCatActive = activeDirCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveDirCat(cat.id);
                        if (cat.items && cat.items.length > 0) setActiveDirItem(cat.items[0]);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition ${
                        isCatActive
                          ? 'bg-[#0B2240] text-white border-[#0B2240] shadow-sm ring-1 ring-blue-400'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{cat.title}</div>
                      <div className={`text-[10px] sm:text-xs mt-0.5 ${isCatActive ? 'text-blue-200' : 'text-slate-500'}`}>
                        {cat.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cuadrícula de dependencias del Directorio */}
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

                    {item.horario && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Icon name="clock" className="w-3 h-3 text-slate-400" />
                        <span>{item.horario}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                      {item.correo ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(item.correo, '¡Correo copiado!')}
                            className="text-xs font-bold text-[#1E40AF] hover:underline flex items-center gap-1"
                          >
                            <span>{item.correo}</span>
                            <Icon name="copy" className="w-3 h-3 text-[#1E40AF]" />
                          </button>
                          <a
                            href={'mailto:' + item.correo + '?subject=' + encodeURIComponent('Consulta ' + item.nombre)}
                            className="px-2.5 py-1 bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 rounded text-xs font-bold transition"
                          >
                            Redactar
                          </a>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Atención presencial / telefónica</span>
                      )}

                      {item.pabellon && (
                        <button
                          onClick={() => {
                            setSelectedPabellon(item.pabellon);
                            setShowMapModal(true);
                          }}
                          className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 transition"
                        >
                          <Icon name="map-pin" className="w-3 h-3" />
                          <span>Pabellón {item.pabellon}</span>
                        </button>
                      )}
                    </div>
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

      {/* Modal del Mapa Contextual del Campus (Bajo Demanda) */}
      <CampusMapModal 
        isOpen={showMapModal} 
        onClose={() => setShowMapModal(false)} 
        initialPabellon={mapFocusPabellon} 
      />

    </div>
  );
}

// Renderizado directo
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
