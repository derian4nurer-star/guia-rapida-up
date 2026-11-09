const fs = require('fs');
const path = require('path');

console.log('Starting apply_decorations.js...');
let code = fs.readFileSync('app.js', 'utf8');

// 0. Ensure zoom modal state exists in App()
if (!code.includes('const [zoomImage, setZoomImage] = useState(null);')) {
  code = code.replace(
    'const [isMapOpen, setIsMapOpen] = useState(false);',
    'const [isMapOpen, setIsMapOpen] = useState(false);\n  const [zoomImage, setZoomImage] = useState(null);'
  );
  console.log('✓ 0. Added zoomImage state');
}

// 1. Section "¿No estás seguro?": Add buho_thinking.png next to title
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
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-sm shrink-0"
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
  console.log('✓ 1. buho_thinking.png added to "¿No estás seguro?" section header');
}

// 2. Section DAAR: Add daar_logo.png and buho_study.png in header
const oldDaarHeader = `{/* Píldora de Categoría */}
            <div className="mb-3">
              <span className="inline-block bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                TRÁMITES ACADÉMICOS Y REGISTRO
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mb-2">
              DAAR – Dirección Académica y de Asuntos Regulatorios
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Canal institucional oficial para matrícula, retiros, evaluaciones, reprogramaciones, reclamos, sumillas y grados académicos.
            </p>`;

const newDaarHeader = `{/* Banner de Cabecera DAAR con Logo Oficial y Mascota Estudiosa */}
            <div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#1E40AF] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50 mb-6">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-blue-400/20 text-blue-200 text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-blue-400/30">
                    TRÁMITES ACADÉMICOS Y REGISTRO
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  DAAR – Dirección Académica y de Asuntos Regulatorios
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Canal institucional oficial para matrícula, retiros, evaluaciones, reprogramaciones, reclamos, sumillas y grados académicos.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <div className="bg-white/95 p-2 rounded-xl border border-white/20 shadow-xs hidden sm:block">
                  <img 
                    src="assets/daar_logo.png" 
                    alt="Logo DAAR" 
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <img 
                  src="assets/buho_study.png" 
                  alt="Búho estudiando UP" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
                />
              </div>
            </div>`;

if (code.includes(oldDaarHeader)) {
  code = code.replace(oldDaarHeader, newDaarHeader);
  console.log('✓ 2. DAAR header enhanced with daar_logo.png and buho_study.png');
}

// 2b. DAAR Autoservicio: add powercampus_tramites_reference.jpg guide box
const oldDaarAutoservicioEnd = `</div>
                    </div>

                    {/* Fallback de Excepción para Casos Especiales */}`;

const newDaarAutoservicioEnd = `</div>

                      {/* Guía visual con captura del portal PowerCampus (Información General -> Trámites) */}
                      <div className="mt-4 bg-white border border-blue-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3.5 shadow-2xs">
                        <img 
                          src="assets/powercampus_tramites_reference.jpg" 
                          alt="Trámites en PowerCampus" 
                          className="w-full sm:w-44 h-28 rounded-lg border border-slate-200 shadow-xs object-cover cursor-pointer hover:opacity-90 transition shrink-0"
                          onClick={() => setZoomImage('assets/powercampus_tramites_reference.jpg')}
                          title="Clic para agrandar captura"
                        />
                        <div className="text-xs text-slate-700 flex-1">
                          <strong className="text-[#0B2240] block font-bold mb-1 flex items-center gap-1.5">
                            <Icon name="info" className="w-4 h-4 text-blue-600" />
                            ¿Dónde encuentro los trámites en PowerCampus?
                          </strong>
                          <p className="leading-relaxed text-slate-600">
                            Ingresa con tu correo UP a PowerCampus y haz clic en la pestaña superior <strong className="text-slate-900 font-semibold">«Información General» → «Trámites y Documentos»</strong> (listado de solicitudes virtuales: reconocimiento de inglés, duplicado de carné, convenios de prácticas, etc.).
                          </p>
                          <button
                            onClick={() => setZoomImage('assets/powercampus_tramites_reference.jpg')}
                            className="text-blue-700 hover:text-blue-900 font-bold underline mt-1 inline-flex items-center gap-1"
                          >
                            <span>🔍 Ver captura de referencia completa</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Fallback de Excepción para Casos Especiales */}`;

if (code.includes(oldDaarAutoservicioEnd)) {
  code = code.replace(oldDaarAutoservicioEnd, newDaarAutoservicioEnd);
  console.log('✓ 2b. PowerCampus screenshot visual guide integrated into DAAR autoservicio');
}

// 3. Section BFE: Add bfe_logo.png and buho_idea.png in header
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

const newBfeHeader = `{/* Banner de Cabecera BFE con Logo y Mascota */}
            <div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#1E40AF] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50 mb-6">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-blue-400/20 text-blue-200 text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-blue-400/30">
                    BIENESTAR Y VIDA UNIVERSITARIA
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  BFE – Dirección de Bienestar y Formación Estudiantil
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Contribuir al bienestar y a la formación integral del estudiante: consejería psicológica, tutoría académica, créditos EFE y Casa del Estudiante (Pabellón Z).
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <div className="bg-white/95 p-2 rounded-xl border border-white/20 shadow-xs hidden sm:block">
                  <img 
                    src="assets/bfe_logo.png" 
                    alt="Logo BFE" 
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <img 
                  src="assets/buho_idea.png" 
                  alt="Búho con idea UP" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
                />
              </div>
            </div>`;

if (code.includes(oldBfeHeader)) {
  code = code.replace(oldBfeHeader, newBfeHeader);
  console.log('✓ 3. BFE header enhanced with bfe_logo.png and buho_idea.png');
}

// 4. Directorio -> ORI: Display ori_banner_reference.jpg (Exact match to reference 2)
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

const newOriBanner = `{/* Banner Oficial HD de ORI (Réplica Exacta de Referencia 2 con Búho de Viaje) */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200">
                  <img 
                    src="assets/ori_banner_reference.jpg" 
                    alt="ORI – Oficina de Relaciones Internacionales" 
                    className="w-full h-auto object-cover block"
                  />
                </div>

                {/* Franja de Canales de Contacto Directo ORI */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      CANALES DE ATENCIÓN DIRECTA ORI
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-700">
                      <a href="mailto:outgoing@up.edu.pe" className="flex items-center gap-1 font-mono font-bold text-[#1E40AF] hover:underline">
                        <Icon name="mail" className="w-3.5 h-3.5 text-rose-600" /> outgoing@up.edu.pe
                      </a>
                      <a href="mailto:shortprograms@up.edu.pe" className="flex items-center gap-1 font-mono font-bold text-[#1E40AF] hover:underline">
                        <Icon name="mail" className="w-3.5 h-3.5 text-cyan-600" /> shortprograms@up.edu.pe
                      </a>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Icon name="map-pin" className="w-3.5 h-3.5 text-amber-600" /> Jr. Gral. Luis Sánchez Cerro 2141
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href="https://intercambio.up.edu.pe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Sistema de Intercambio</span>
                      <Icon name="external-link" className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://ori.up.edu.pe/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl transition flex items-center gap-1.5 border border-slate-300 shadow-2xs"
                    >
                      <span>Portal ORI</span>
                      <Icon name="external-link" className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>`;

if (code.includes(oldOriBanner)) {
  code = code.replace(oldOriBanner, newOriBanner);
  console.log('✓ 4. ORI banner replaced with exact reference 2 image (ori_banner_reference.jpg)');
}

// 5. Directorio -> Empleabilidad: Display empleabilidad_banner_reference.jpg (Exact match to reference 3)
// Check where currentDirCategory.items is mapped for standard categories
const oldDirItemsBlock = `{/* Cuadrícula de Contactos Oficiales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {currentDirCategory.items.map((item) => (`;

const newDirItemsBlock = `{/* Banner Especial de Empleabilidad (Réplica Exacta de Referencia 3) */}
                {currentDirCategory.id === 'empleabilidad' && (
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 mb-5">
                    <img 
                      src="assets/empleabilidad_banner_reference.jpg" 
                      alt="Empleabilidad y Red Alumni" 
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                )}

                {/* Cuadrícula de Contactos Oficiales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {currentDirCategory.items.map((item) => (`;

if (code.includes(oldDirItemsBlock)) {
  code = code.replace(oldDirItemsBlock, newDirItemsBlock);
  console.log('✓ 5. Empleabilidad banner replaced with exact reference 3 image (empleabilidad_banner_reference.jpg)');
}

// 6. Directorio -> T2D: Add t2d_logo.png
const oldT2dBannerStart = `<div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#16365F] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50">
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

const newT2dBannerStart = `<div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#16365F] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl border border-white/20 shadow-xs shrink-0">
                      <img src="assets/t2d_logo.png" alt="Logo T2D" className="h-12 w-12 object-contain" />
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

if (code.includes(oldT2dBannerStart)) {
  code = code.replace(oldT2dBannerStart, newT2dBannerStart);
  console.log('✓ 6. t2d_logo.png integrated into T2D header banner');
}

// 7. Directorio -> Representación Estudiantil: Add rea_logo.jpg, reup_logo.jpg and reup_buho_mascota.jpg
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
                        className="px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-bold text-xs flex items-center gap-1.5 transition self-start sm:self-auto"
                      >
                        <Icon name="instagram" className="w-3.5 h-3.5 text-pink-600" />
                        <span>Linktree / Instagram</span>
                        <Icon name="external-link" className="w-3 h-3 text-pink-500" />
                      </a>
                    </div>`;

const newRepHeader = `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <img 
                          src={org.id === 'rea' ? 'assets/rea_logo.jpg' : 'assets/reup_logo.jpg'} 
                          alt={org.nombre}
                          className="w-12 h-12 rounded-full border-2 border-blue-200 shadow-xs object-cover"
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
                          className="px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-bold text-xs flex items-center gap-1.5 transition self-start sm:self-auto"
                        >
                          <Icon name="instagram" className="w-3.5 h-3.5 text-pink-600" />
                          <span>Linktree / Instagram</span>
                          <Icon name="external-link" className="w-3 h-3 text-pink-500" />
                        </a>
                      </div>
                    </div>`;

if (code.includes(oldRepHeader)) {
  code = code.replace(oldRepHeader, newRepHeader);
  console.log('✓ 7. REA logo, REUP logo and REUP mascot added to Representación Estudiantil');
}

// 8. Add Zoom Image Modal before the end of main component
const oldModalEnd = `{/* MODAL DEL MAPA DEL CAMPUS PABELLÓN F Y Z */}
      <CampusMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        activePabellon={activePabellon}
      />`;

const newModalEnd = `{/* MODAL DEL MAPA DEL CAMPUS PABELLÓN F Y Z */}
      <CampusMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        activePabellon={activePabellon}
      />

      {/* MODAL DE ZOOM DE IMAGEN REFERENCIAL */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-slate-300 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <h3 className="font-bold text-base text-[#0B2240]">
                  Captura de Referencia · PowerCampus UP (Trámites y Documentos)
                </h3>
              </div>
              <button
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 flex items-center justify-center">
              <img 
                src={zoomImage} 
                alt="Captura de referencia ampliada" 
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Ubicación: Menú superior → «Información General» → «Trámites y Documentos»</span>
              <button
                onClick={() => setZoomImage(null)}
                className="px-4 py-1.5 bg-[#0B2240] text-white rounded-lg font-bold hover:bg-blue-900 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}`;

if (code.includes(oldModalEnd)) {
  code = code.replace(oldModalEnd, newModalEnd);
  console.log('✓ 8. Zoom Image modal added for referential screenshots');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('All decorative updates written to app.js');

