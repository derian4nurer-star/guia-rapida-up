const fs = require('fs');

console.log('Starting apply_clean_imagery.js...');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Remove zoomImage state from App()
code = code.replace(
  'const [showMapModal, setShowMapModal] = useState(false);\n  const [zoomImage, setZoomImage] = useState(null);',
  'const [showMapModal, setShowMapModal] = useState(false);'
);
console.log('✓ 1. Removed zoomImage state');

// 2. Remove the zoomImage modal at the bottom of App()
const zoomModalRegex = /\{\/\* MODAL DE ZOOM DE CAPTURA REFERENCIAL DE POWERCAMPUS[\s\S]*?\{zoomImage && \([\s\S]*?\}\s*<\/div>\s*<\/div>\s*\)\}/;
if (zoomModalRegex.test(code)) {
  code = code.replace(zoomModalRegex, '');
  console.log('✓ 2. Removed zoomImage modal');
} else {
  console.log('⚠ 2. Zoom modal regex not matched, checking alternative...');
  const altIdx = code.indexOf('{/* MODAL DE ZOOM DE CAPTURA REFERENCIAL DE POWERCAMPUS');
  if (altIdx !== -1) {
    const endIdx = code.indexOf(')}', altIdx);
    if (endIdx !== -1) {
      code = code.substring(0, altIdx) + code.substring(endIdx + 2);
      console.log('✓ 2b. Removed zoomImage modal via substring');
    }
  }
}

// 3. DAAR Header: Ensure clean layout with buho_study.png and daar_logo.png
const oldDaarHeaderSnippet = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src="assets/buho_study.png" 
                  alt="Búho estudiando UP" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-sm shrink-0"
                />
                <div>
                  <div className="inline-block bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
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

              <div className="hidden sm:block shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-2xs">
                <img 
                  src="assets/daar_logo.png" 
                  alt="Logo DAAR" 
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>`;

const newDaarHeaderSnippet = `<div className="bg-gradient-to-r from-[#0B2240] via-[#102A4C] to-[#1E40AF] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/50 mb-6">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-blue-400/20 text-blue-200 text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-blue-400/30">
                    TRÁMITES ACADÉMICOS Y REGISTRO
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  DAAR – Servicios Académicos y Registro
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Es la oficina oficial para todo lo que afecta tu matrícula, tus notas, evaluaciones y tu plan de estudios.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <div className="bg-white p-2 rounded-xl border border-white/20 shadow-xs hidden sm:block">
                  <img 
                    src="assets/daar_logo.png" 
                    alt="Logo DAAR" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <img 
                  src="assets/buho_study.png" 
                  alt="Búho estudiando UP" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
                />
              </div>
            </div>`;

if (code.includes(oldDaarHeaderSnippet)) {
  code = code.replace(oldDaarHeaderSnippet, newDaarHeaderSnippet);
  console.log('✓ 3. DAAR header updated to beautiful banner with clean buho_study and daar_logo');
}

// 4. DAAR Autoservicio: Remove the laptop screenshot box and replace with a clean text guide
const oldAutoservicioGuide = `{/* Guía visual con captura del portal PowerCampus (Información General -> Trámites) */}
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
                      </div>`;

const newAutoservicioGuide = `<div className="mt-4 bg-white border border-blue-200 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name="info" className="w-4 h-4 text-blue-700" />
                        </div>
                        <div className="text-xs text-slate-700 flex-1">
                          <strong className="text-[#0B2240] block font-bold mb-0.5">
                            📍 Ruta oficial en PowerCampus:
                          </strong>
                          <p className="leading-relaxed text-slate-600">
                            Inicia sesión en PowerCampus y dirígete al menú superior: <strong className="text-slate-900 font-semibold">«Información General» → «Trámites y Documentos»</strong> para acceder a las solicitudes virtuales de carné universitario, requisito de inglés, convenios de prácticas, cartas de presentación y verificación académica.
                          </p>
                        </div>
                      </div>`;

if (code.includes(oldAutoservicioGuide)) {
  code = code.replace(oldAutoservicioGuide, newAutoservicioGuide);
  console.log('✓ 4. Removed laptop screenshot and replaced with clean institutional route guide');
}

// 5. ORI: Replace ori_banner_reference.jpg with clean native banner using assets/ori_banner_bg.jpg and assets/buho_travel.png
const oldOriBannerBlock = `{/* Banner Oficial HD de ORI (Réplica Exacta de Referencia 2 con Búho de Viaje) */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200">
                  <img 
                    src="assets/ori_banner_reference.jpg" 
                    alt="ORI – Oficina de Relaciones Internacionales" 
                    className="w-full h-auto object-cover block"
                  />
                </div>`;

const newOriBannerBlock = `{/* Banner Oficial de ORI con Fondo y Búho Viajero de Imágenes UP */}
                <div 
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  style={{
                    backgroundImage: "linear-gradient(to right, rgba(11, 34, 64, 0.94) 0%, rgba(15, 44, 89, 0.88) 50%, rgba(11, 34, 64, 0.80) 100%), url('assets/ori_banner_bg.jpg')",
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
                  </div>

                  <div className="shrink-0 self-end md:self-center">
                    <img 
                      src="assets/buho_travel.png" 
                      alt="Búho viajero UP" 
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>`;

if (code.includes(oldOriBannerBlock)) {
  code = code.replace(oldOriBannerBlock, newOriBannerBlock);
  console.log('✓ 5. ORI banner built natively with clean ori_banner_bg.jpg and buho_travel.png');
}

// 6. Empleabilidad: Replace empleabilidad_banner_reference.jpg with clean native banner using assets/empleabilidad_banner_bg.jpg and assets/buho_formal.png
const oldEmpBannerBlock = `{/* Banner Especial de Empleabilidad (Réplica Exacta de Imagen 3) */}
                {currentDirCategory.id === 'empleabilidad' && (
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 mb-5">
                    <img 
                      src="assets/empleabilidad_banner_reference.jpg" 
                      alt="Empleabilidad y Red Alumni" 
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                )}`;

const newEmpBannerBlock = `{/* Banner Especial de Empleabilidad con Fondo y Búho Formal de Imágenes UP */}
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
                )}`;

if (code.includes(oldEmpBannerBlock)) {
  code = code.replace(oldEmpBannerBlock, newEmpBannerBlock);
  console.log('✓ 6. Empleabilidad banner built natively with clean empleabilidad_banner_bg.jpg and buho_formal.png');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Finished updating app.js with clean native imagery!');

