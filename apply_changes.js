const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');

// 1. UPDATE DYNAMIC RESULT CARD
console.log('Step 1: Removing Código UP from DynamicResultCard...');
// Replace function signature and hooks
const cardStart = code.indexOf('function DynamicResultCard({');
const cardEnd = code.indexOf('function SearchEngineHeader(', cardStart);
let cardBlock = code.substring(cardStart, cardEnd);

cardBlock = cardBlock.replace(
  /function DynamicResultCard\({\s*channel,\s*studentCode,\s*setStudentCode,\s*copyToClipboard,\s*onOpenMap\s*}\) {[\s\S]*?const officialSubject = \(channel\.asunto \|\| channel\.tramite\.split\('\/'\)\[0\]\.trim\(\)\) \+ ' - ' \+ \(localCode \|\| '20231234'\);/,
  `function DynamicResultCard({ 
  channel, 
  copyToClipboard, 
  onOpenMap 
}) {
  const [isCopiedAsunto, setIsCopiedAsunto] = useState(false);
  const [isCopiedCorreo, setIsCopiedCorreo] = useState(false);

  const officialSubject = channel.asunto || channel.tramite.split('/')[0].trim();`
);

const genStart = cardBlock.indexOf('{/* GENERADOR INTERACTIVO DE ASUNTO */}');
const genEnd = cardBlock.indexOf('{/* PROCEDIMIENTO EN PASOS', genStart);

const newGenUi = `{/* ASUNTO OFICIAL SUGERIDO */}
      <div className="bg-[#F8F7F4] border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F2C59] block">
            ASUNTO OFICIAL SUGERIDO
          </span>
          <p className="text-xs text-slate-500">
            Formato institucional listo para copiar y enviar desde tu correo oficial UP:
          </p>
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

      `;

cardBlock = cardBlock.substring(0, genStart) + newGenUi + cardBlock.substring(genEnd);
code = code.substring(0, cardStart) + cardBlock + code.substring(cardEnd);
console.log('✓ DynamicResultCard updated!');

// 2. Remove studentCode in App()
console.log('Step 2: Cleaning studentCode state in App()...');
code = code.replace(
  /\s*\/\/ Código de Alumno Persistente\s*const \[studentCode, setStudentCode\] = useState\('20231234'\);\s*const \[isEditingCode, setIsEditingCode\] = useState\(false\);/,
  ''
);

code = code.replace(/studentCode=\{studentCode\}\s*setStudentCode=\{setStudentCode\}/g, '');
code = code.replace(/«\{row\.duda\.split\(','\)\[0\]\} – \{studentCode \|\| '20231234'\}»/g, '«{row.duda.split(\',\')[0]}»');
code = code.replace(/const subj = `\$\{row\.duda\.split\(','\)\[0\]\} – \$\{studentCode \|\| '20231234'\}`;/g, 'const subj = row.duda.split(\',\')[0];');
code = code.replace(/encodeURIComponent\(`\$\{row\.duda\.split\(','\)\[0\]\} – \$\{studentCode \|\| '20231234'\}`\)/g, 'encodeURIComponent(row.duda.split(\',\')[0])');

code = code.replace(
  /<div className="flex items-center justify-between text-xs">\s*<span className="font-bold text-\[#0B2240\] uppercase tracking-wider text-\[11px\]">\s*Fórmula de Asunto Oficial Pre-armada:\s*<\/span>\s*<span className="text-slate-500 text-\[11px\]">\s*Código activo: <strong className="text-amber-700 font-mono">\{studentCode \|\| '20231234'\}<\/strong>\s*<\/span>\s*<\/div>/,
  `<div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0B2240] uppercase tracking-wider text-[11px]">
                          Asunto Oficial Recomendado:
                        </span>
                      </div>`
);
code = code.replace(/«\{activeDaarItem\.nombre\} – \{studentCode \|\| '20231234'\}»/g, '«{activeDaarItem.nombre}»');
code = code.replace(/const subj = `\$\{activeDaarItem\.nombre\} – \$\{studentCode \|\| '20231234'\}`;/g, 'const subj = activeDaarItem.nombre;');
code = code.replace(/encodeURIComponent\(`\$\{activeDaarItem\.nombre\} – \$\{studentCode \|\| '20231234'\}`\)/g, 'encodeURIComponent(activeDaarItem.nombre)');
code = code.replace(/ – \$\{studentCode \|\| '20231234'\}/g, '');
code = code.replace(/ – \{studentCode \|\| '20231234'\}/g, '');
console.log('✓ studentCode references removed!');

// 3. MASTER NAV CARDS (8 SEPARATED CHANNELS)
console.log('Step 3: Updating Master Navigation to 8 separated channels...');
const navStart = code.indexOf('{/* ================================================================\n              LOS 4 BOTONES MAESTROS INTERACTIVOS');
const navEnd = code.indexOf('</section>\n\n      {/* ====================================================================\n          ÁREA PRINCIPAL DE CONTENIDO INTERACTIVO');

const newNavBlock = `{/* ================================================================
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
                { id: 't2d', title: 'T2D', desc: 'Soporte TI, claves y software' },
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
                    className={\`p-3.5 sm:p-4 rounded-xl text-left transition-all border flex flex-col justify-between min-h-[78px] sm:min-h-[86px] \${
                      isActive
                        ? 'bg-[#16365F] border-blue-400 ring-2 ring-blue-400/50 shadow-lg translate-y-[-2px]'
                        : 'bg-[#102A4C] border-[#1D3D66] hover:bg-[#133055] hover:border-slate-500'
                    }\`}
                  >
                    <div className="flex items-center justify-between mb-1 w-full">
                      <span className={\`font-bold text-sm sm:text-base \${isActive ? 'text-amber-300' : 'text-white'}\`}>
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
      `;

code = code.substring(0, navStart) + newNavBlock + code.substring(navEnd);
console.log('✓ Master navigation updated to 8 cards!');

// 4. SEPARATE T2D, REUP/REA, ORI, EMPLEABILIDAD, DIRECTORIO
console.log('Step 4: Separating specialized views into their own sections...');
const dirStart = code.indexOf('{activeSection === \'directorio\' && (');
const mainEnd = code.indexOf('</main>', dirStart);
const oldDirSection = code.substring(dirStart, mainEnd);

const t2dBlockMatch = oldDirSection.match(/\{\/\* VISTA DINÁMICA ESPECIALIZADA: T2D[\s\S]*?\{\/\* VISTA DINÁMICA ESPECIALIZADA: REPRESENTACIÓN/);
const repBlockMatch = oldDirSection.match(/\{\/\* VISTA DINÁMICA ESPECIALIZADA: REPRESENTACIÓN[\s\S]*?\{\/\* VISTA DINÁMICA ESPECIALIZADA: ORI/);
const oriBlockMatch = oldDirSection.match(/\{\/\* VISTA DINÁMICA ESPECIALIZADA: ORI[\s\S]*?\{\/\* ==============================================================\s*VISTA DINÁMICA DE CONTACTOS/);
const contactsBlockMatch = oldDirSection.match(/\{\/\* ==============================================================\s*VISTA DINÁMICA DE CONTACTOS[\s\S]*?\n\s*<\/div>\s*<\/div>\s*\)\}/);

let t2dInner = t2dBlockMatch[0].replace(/\{\/\* VISTA DINÁMICA ESPECIALIZADA: REPRESENTACIÓN/, '').trim();
t2dInner = t2dInner.replace(/\{currentDirCategory\.id === 't2d' && \(/, '');
t2dInner = t2dInner.substring(0, t2dInner.lastIndexOf(')}')).trim();

let repInner = repBlockMatch[0].replace(/\{\/\* VISTA DINÁMICA ESPECIALIZADA: ORI/, '').trim();
repInner = repInner.replace(/\{currentDirCategory\.id === 'representacion' && \(/, '');
repInner = repInner.substring(0, repInner.lastIndexOf(')}')).trim();

let oriInner = oriBlockMatch[0].replace(/\{\/\* ==============================================================\s*VISTA DINÁMICA DE CONTACTOS/, '').trim();
oriInner = oriInner.replace(/\{currentDirCategory\.id === 'ori' && \(/, '');
oriInner = oriInner.substring(0, oriInner.lastIndexOf(')}')).trim();

let contactsInner = contactsBlockMatch[0].replace(/\n\s*<\/div>\s*<\/div>\s*\)\}/, '').trim();

const newSections = `{/* ====================================================================
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

            ${oriInner}
          </div>
        )}

        {/* ====================================================================
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
                    Prácticas preprofesionales, convenios, empleo y vinculación profesional permanente.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shrink-0">
                <Icon name="briefcase" className="w-4 h-4 text-[#1E40AF]" />
                <span>Anexo 2253</span>
              </div>
            </div>

            {/* Banner Nativo de Empleabilidad */}
            <div 
              className="relative overflow-hidden rounded-2xl mb-8 p-6 sm:p-8 text-white shadow-md border border-slate-700/40 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.85) 60%, rgba(15, 23, 42, 0.75) 100%), url('assets/empleabilidad_banner_bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="max-w-xl space-y-2 z-10 text-left">
                <span className="inline-block bg-white text-slate-900 text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
                  DESARROLLO PROFESIONAL
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Empleabilidad y Red Alumni
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Prácticas preprofesionales, empleo y la red de egresados de la Universidad del Pacífico.
                </p>
              </div>

              <div className="shrink-0 z-10 flex items-center justify-center">
                <img 
                  src="assets/buho_formal.png" 
                  alt="Búho Formal Empleabilidad UP" 
                  className="w-24 sm:w-28 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Tarjetas de Áreas de Empleabilidad */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                  nombre: "Bolsa de Trabajo y Empleabilidad",
                  desc: "Orientación laboral, asesoría de currículum vitae y vacantes exclusivas UP.",
                  correo: "empleabilidad@up.edu.pe",
                  anexo: "2253",
                  icono: "award"
                },
                {
                  id: "alumni",
                  nombre: "Red Alumni UP",
                  desc: "Comunidad de egresados, networking y vinculación profesional permanente.",
                  correo: "redalumni@up.edu.pe",
                  anexo: "2253",
                  icono: "users"
                }
              ].map((area) => (
                <div key={area.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition shadow-2xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0B2240]">{area.nombre}</span>
                      <Icon name={area.icono} className="w-4 h-4 text-[#1E40AF]" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{area.desc}</p>
                    <div className="text-[11px] font-semibold text-slate-500 pt-1">Anexo: {area.anexo}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => copyToClipboard(area.correo, '¡Correo copiado!')}
                      className="text-xs font-bold text-[#1E40AF] hover:underline flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{area.correo}</span>
                      <Icon name="copy" className="w-3 h-3 shrink-0" />
                    </button>
                    <a
                      href={'mailto:' + area.correo + '?subject=' + encodeURIComponent('Consulta ' + area.nombre)}
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
                    T2D – Servicios Informáticos y Soporte
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

            ${t2dInner}
          </div>
        )}

        {/* ====================================================================
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

            ${repInner}
          </div>
        )}

        {/* ====================================================================
            SECCIÓN 8: DIRECTORIO OFICIAL (FACULTADES, ESCUELAS Y SERVICIOS)
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

            ${contactsInner}
          </div>
        )}
`;

code = code.substring(0, dirStart) + newSections + '\n      ' + code.substring(mainEnd);
console.log('✓ All 8 sections separated successfully!');

// 5. UPDATE navigateToSectionAndItem
console.log('Step 5: Updating navigateToSectionAndItem...');
const oldNavFuncStart = code.indexOf('const navigateToSectionAndItem = (row) => {');
const oldNavFuncEnd = code.indexOf('const showToast =', oldNavFuncStart);

const newNavFunc = `const navigateToSectionAndItem = (row) => {
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

  `;

code = code.substring(0, oldNavFuncStart) + newNavFunc + code.substring(oldNavFuncEnd);

// 6. UPDATE FOOTER
console.log('Step 6: Updating footer links...');
const footerStart = code.indexOf('<div className="flex items-center gap-3">');
if (footerStart !== -1) {
  const footerEnd = code.indexOf('</div>', footerStart) + 6;
  const newFooter = `<div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <button onClick={() => { setActiveSection('rapido'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">¿No estás seguro?</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('daar'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">DAAR</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('bfe'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">BFE</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('ori'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">ORI</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('empleabilidad'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">Empleabilidad</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('t2d'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">T2D</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('representacion'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">REUP y REA</button>
            <span className="text-slate-300">·</span>
            <button onClick={() => { setActiveSection('directorio'); setActiveDirCat('facultades'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-blue-700 underline">Directorio</button>
          </div>`;
  code = code.substring(0, footerStart) + newFooter + code.substring(footerEnd);
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('✓ All modifications saved to app.js!');
