const fs = require('fs');

console.log('Starting build_clean_app.js...');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Section "¿No estás seguro?": add buho_thinking.png cleanly in header
const oldRapidoHeader = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                  ¿No estás seguro?
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Ubica tu tema en la columna izquierda y presiona cualquier fila para activar el enrutador y generar tu asunto oficial.
                </p>
              </div>`;

const newRapidoHeader = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
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
              </div>`;

if (code.includes(oldRapidoHeader)) {
  code = code.replace(oldRapidoHeader, newRapidoHeader);
  console.log('✓ 1. "¿No estás seguro?" header enhanced with clean buho_thinking.png');
}

// 2. Section DAAR: replace text header with contained flex row including buho_study.png and daar_logo.png
const oldDaarHeader = `{/* Píldora de Categoría */}
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
            </p>`;

const newDaarHeader = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
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
            </div>`;

if (code.includes(oldDaarHeader)) {
  code = code.replace(oldDaarHeader, newDaarHeader);
  console.log('✓ 2. DAAR header enhanced with clean buho_study.png and daar_logo.png');
}

// 2b. DAAR Autoservicio: add textual route guide (NO reference screenshots!)
const oldAutoservicioLinks = `</div>
                    </div>

                    {/* Fallback de Excepción para Casos Especiales */}`;

const newAutoservicioLinks = `</div>

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

                    {/* Fallback de Excepción para Casos Especiales */}`;

if (code.includes(oldAutoservicioLinks)) {
  code = code.replace(oldAutoservicioLinks, newAutoservicioLinks);
  console.log('✓ 2b. DAAR autoservicio route guide added');
}

// 3. Section BFE: replace text header with contained flex row including buho_idea.png and bfe_logo.png
const oldBfeHeader = `{/* Píldora de Categoría */}
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
            </p>`;

const newBfeHeader = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
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
            </div>`;

if (code.includes(oldBfeHeader)) {
  code = code.replace(oldBfeHeader, newBfeHeader);
  console.log('✓ 3. BFE header enhanced with clean buho_idea.png and bfe_logo.png');
}

// 4. Directorio -> T2D: Add t2d_logo.png to banner
const oldT2dBanner = `<div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#16365F] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-cyan-400/30">
                      <Icon name="shield" className="w-3.5 h-3.5" />
                      <span>Mesa de Ayuda Tecnológica UP</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">T2D – Servicios Informáticos y de Soporte</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
                      <Icon name="clock" className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                      <span>Atención: Lunes a Viernes 7:30 a.m. – 9:30 p.m. · Sábados 7:30 a.m. – 5:00 p.m.</span>
                    </p>
                  </div>`;

const newT2dBanner = `<div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#16365F] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50">
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
                  </div>`;

if (code.includes(oldT2dBanner)) {
  code = code.replace(oldT2dBanner, newT2dBanner);
  console.log('✓ 4. T2D header enhanced with t2d_logo.png');
}

// 5. Directorio -> Representación Estudiantil: Add rea_logo.jpg, reup_logo.jpg and reup_buho_mascota.jpg
const oldRepHeader = `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2240]">{org.nombre}</h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold">
                            {org.handle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{org.subtitulo}</p>
                      </div>
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
                    </div>`;

const newRepHeader = `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
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
                    </div>`;

if (code.includes(oldRepHeader)) {
  code = code.replace(oldRepHeader, newRepHeader);
  console.log('✓ 5. REA and REUP logos added');
}

// 6. Directorio -> ORI: Native banner using ori_banner_bg.jpg and buho_travel.png
const oldOriBanner = `{/* Banner Informativo ORI con Canales Oficiales */}
                <div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#1E40AF] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-400/20 text-rose-300 text-[11px] font-bold uppercase tracking-wider border border-rose-400/30">
                      <Icon name="globe" className="w-3.5 h-3.5" />
                      <span>Movilidad Estudiantil Global UP</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Oficina de Relaciones Internacionales (ORI)</h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                      Promueve la internacionalización de estudiantes UP mediante intercambios semestrales, programas cortos, Disney Academic y becas de financiamiento en el extranjero.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 pt-1">
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
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0 w-full md:w-auto">
                    <a
                      href="https://intercambio.up.edu.pe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow"
                    >
                      <span>Sistema de Intercambio</span>
                      <Icon name="external-link" className="w-4 h-4" />
                    </a>
                    <a
                      href="https://ori.up.edu.pe/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 border border-white/20"
                    >
                      <span>Portal Oficial ORI</span>
                      <Icon name="external-link" className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>`;

const newOriBanner = `{/* Banner Oficial ORI (Fondo de Imágenes UP + Búho Viajero) */}
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
                </div>`;

if (code.includes(oldOriBanner)) {
  code = code.replace(oldOriBanner, newOriBanner);
  console.log('✓ 6. Native ORI banner with clean background and buho_travel applied');
}

// 7. Directorio -> Empleabilidad: Native banner using empleabilidad_banner_bg.jpg and buho_formal.png
const oldDirItemsBlock = `<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDirCategory.items.map((item) => (`;

const newDirItemsBlock = `{/* Banner de Empleabilidad (Fondo de Imágenes UP + Búho Formal) */}
                {currentDirCategory.id === 'empleabilidad' && (
                  <div 
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6"
                    style={{
                      backgroundImage: "linear-gradient(to right, rgba(20, 24, 60, 0.94) 0%, rgba(30, 36, 90, 0.88) 50%, rgba(20, 24, 60, 0.82) 100%), url('assets/empleabilidad_banner_bg.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center 30%'
                    }}
                  >
                    <div className="space-y-2 flex-1 max-w-2xl">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-white text-purple-800 text-xs font-extrabold uppercase tracking-wider shadow-sm inline-block">
                          DESARROLLO PROFESIONAL
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                        Empleabilidad y Red Alumni
                      </h3>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                        Prácticas preprofesionales, empleo y la red de egresados UP.
                      </p>
                    </div>

                    <div className="shrink-0 self-end md:self-center">
                      <img 
                        src="assets/buho_formal.png" 
                        alt="Búho formal UP" 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDirCategory.items.map((item) => (`;

if (code.includes(oldDirItemsBlock)) {
  code = code.replace(oldDirItemsBlock, newDirItemsBlock);
  console.log('✓ 7. Native Empleabilidad banner with clean background and buho_formal applied');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('All clean imagery successfully applied to app.js');

