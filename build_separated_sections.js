const fs = require('fs');

const code = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');
const dirStart = code.indexOf("{activeSection === 'directorio' && (");
const mainEnd = code.indexOf('</main>', dirStart);
const oldDirSection = code.substring(dirStart, mainEnd);

const lines = oldDirSection.split('\n');

// 1. T2D block lines:
const t2dStartLine = lines.findIndex(l => l.includes("{currentDirCategory.id === 't2d' && ("));
const repStartLine = lines.findIndex(l => l.includes("{currentDirCategory.id === 'representacion' && ("));
const oriStartLine = lines.findIndex(l => l.includes("{currentDirCategory.id === 'ori' && ("));
const stdStartLine = lines.findIndex(l => l.includes("currentDirCategory.id !== 't2d' && currentDirCategory.id !== 'representacion'"));

console.log({ t2dStartLine, repStartLine, oriStartLine, stdStartLine });

// Extract T2D inner content (without the wrapper {currentDirCategory.id === 't2d' && ( and its closing )})
const t2dLines = lines.slice(t2dStartLine + 1, repStartLine - 2);
const t2dContent = t2dLines.join('\n');

// Extract Representacion inner content
const repLines = lines.slice(repStartLine + 1, oriStartLine - 2);
const repContent = repLines.join('\n');

// Extract ORI inner content
const oriLines = lines.slice(oriStartLine + 1, stdStartLine - 2);
const oriContent = oriLines.join('\n');

console.log('T2D lines:', t2dLines.length);
console.log('REP lines:', repLines.length);
console.log('ORI lines:', oriLines.length);

// Empleabilidad section:
const empleabilidadSection = `        {/* ====================================================================
            SECCIÓN 5: EMPLEABILIDAD Y RED ALUMNI UP
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
                    Prácticas preprofesionales, convenios, empleo y la red de egresados UP.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shrink-0">
                <Icon name="briefcase" className="w-4 h-4 text-[#1E40AF]" />
                <span>Central Anexo 2253</span>
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
        )}`;

// ORI section:
const oriSection = `        {/* ====================================================================
            SECCIÓN 4: OFICINA DE RELACIONES INTERNACIONALES (ORI)
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

${t2dLines ? oriContent : ''}
          </div>
        )}`;

// T2D section:
const t2dSection = `        {/* ====================================================================
            SECCIÓN 6: T2D – SOPORTE E INFORMÁTICA
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

${t2dContent}
          </div>
        )}`;

// REUP & REA section:
const repSection = `        {/* ====================================================================
            SECCIÓN 7: REPRESENTACIÓN ESTUDIANTIL (REUP Y PROGRAMA REA)
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

${repContent}
          </div>
        )}`;

// DIRECTORIO section (clean for facultades, escuelas, oficinas):
const dirSection = `        {/* ====================================================================
            SECCIÓN 8: DIRECTORIO INSTITUCIONAL (FACULTADES, ESCUELAS Y SERVICIOS)
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
                      className={\`p-3.5 rounded-xl text-left border transition \${
                        isCatActive
                          ? 'bg-[#0B2240] text-white border-[#0B2240] shadow-sm ring-1 ring-blue-400'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }\`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{cat.title}</div>
                      <div className={\`text-[10px] sm:text-xs mt-0.5 \${isCatActive ? 'text-blue-200' : 'text-slate-500'}\`}>
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
        )}`;

const allNewSections = [
  oriSection,
  empleabilidadSection,
  t2dSection,
  repSection,
  dirSection
].join('\n\n');

let finalCode = code.substring(0, dirStart) + allNewSections + '\n      ' + code.substring(mainEnd);

// Also update activeDirCat default to 'facultades'
finalCode = finalCode.replace("const [activeDirCat, setActiveDirCat] = useState('t2d');", "const [activeDirCat, setActiveDirCat] = useState('facultades');");

fs.writeFileSync('app.js', finalCode, 'utf8');
console.log('✓ Successfully separated all 8 sections in app.js!');

