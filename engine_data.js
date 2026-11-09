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

    // 3. Coincidencia de frase exacta
    if (normTitle.includes(norm)) {
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
      alternativa = {
        pregunta: principal.alternativaTrigger.pregunta,
        subtexto: principal.alternativaTrigger.subtexto,
        canalDestino: altTarget
      };
    }
  }

  // Filtrar otros resultados relevantes
  const otros = sorted.slice(1, 4).filter(c => !alternativa || c.id !== alternativa.canalDestino.id);

  return { principal, alternativa, otros };
}

module.exports = {
  CANALES_SEARCH_ENGINE,
  normalizeText,
  scoreChannels
};
