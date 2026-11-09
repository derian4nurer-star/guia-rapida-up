const fs = require('fs');

console.log('Starting apply_final_improvements.js...');
let code = fs.readFileSync('app.js', 'utf8');

// ============================================================================
// 1. HEADER BRANDING: "UP GUÍA RÁPIDA DE CANALES OFICIALES INSTITUCIONALES"
// ============================================================================
const headerLogoRegex = /\{?\/\* Logo Oficial HD Universidad del Pacífico \*\/\}\s*<div className="flex items-center gap-3\.5">[\s\S]*?<div className="h-7 w-\[1px\] bg-slate-200 hidden sm:block"><\/div>\s*<div>\s*<div className="text-sm font-extrabold text-\[#0B2240\] leading-none mb-0\.5">\s*Guía rápida de canales\s*<\/div>\s*<div className="text-\[11px\] text-slate-500 font-medium">\s*Pregrado · 2026-II\s*<\/div>\s*<\/div>\s*<\/div>/;

const newHeaderLogo = `{/* Logo Oficial y Título Institucional */}
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
          </div>`;

if (headerLogoRegex.test(code)) {
  code = code.replace(headerLogoRegex, newHeaderLogo);
  console.log('✓ 1. Header branding updated successfully!');
} else {
  console.log('⚠ 1. Header regex did not match, trying alternative search...');
  const altSearch = `Guía rápida de canales`;
  if (code.includes(altSearch)) {
    console.log('Found alternative match in header');
  }
}

// ============================================================================
// 2. HERO TITULAR & SUBTITLE
// ============================================================================
const heroRegex = /<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2\.5">\s*<span className="text-white">¿Tienes dudas\?<\/span><br \/>\s*<span className="text-\[#F59E0B\]">Encuentra el canal correcto\.<\/span>\s*<\/h1>\s*\{?\/\* Subtítulo Oficial de Imagen 2 \*\/\}\s*<p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed mb-6 font-normal">\s*Trámites, costos, bienestar, intercambios, soporte y mucho más: a quién escribir, cómo y dónde\.\s*<\/p>/;

const newHeroContent = `<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2.5">
              <span className="text-white">¿No sabes a dónde acudir?</span><br />
              <span className="text-[#F59E0B]">Encuentra el canal adecuado.</span>
            </h1>

            {/* Subtítulo Oficial */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed mb-6 font-normal">
              Todos los canales oficiales para estudiantes de pregrado: a quién escribir, cómo y dónde encontrar más información.
            </p>`;

if (heroRegex.test(code)) {
  code = code.replace(heroRegex, newHeroContent);
  console.log('✓ 2. Hero titular & subtitle updated successfully!');
} else {
  console.log('⚠ 2. Hero regex did not match directly, checking...');
}

// ============================================================================
// 3. MASTER BUTTON 1 & SECTION TITLE: "¿No estás seguro?"
// ============================================================================
// Replace "Buscador rápido" in master button 1
const oldBtnRapido = `<span className={\`font-bold text-sm sm:text-base \${activeSection === 'rapido' ? 'text-amber-300' : 'text-white'}\`}>
                    Buscador rápido
                  </span>`;
const newBtnRapido = `<span className={\`font-bold text-sm sm:text-base \${activeSection === 'rapido' ? 'text-amber-300' : 'text-white'}\`}>
                    ¿No estás seguro?
                  </span>`;

if (code.includes(oldBtnRapido)) {
  code = code.replace(oldBtnRapido, newBtnRapido);
  console.log('✓ 3. Master Button 1 changed to "¿No estás seguro?"');
} else {
  console.log('⚠ 3. Master Button 1 pattern not matched directly');
}

// Replace in activeSection === 'rapido' header
const oldSectionTitle = `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                  Buscador rápido
                </h2>`;
const newSectionTitle = `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                  ¿No estás seguro?
                </h2>`;

if (code.includes(oldSectionTitle)) {
  code = code.replace(oldSectionTitle, newSectionTitle);
  console.log('✓ 3b. Section header updated to "¿No estás seguro?"');
}

// ============================================================================
// 4. BUSCADOR_RAPIDO: DEJARLO HASTA LA FILA 15 (CANÓNICAS DEL AFICHE ORIGINAL)
// ============================================================================
// Find where br-15 ends and where ]; is
const br15Idx = code.indexOf('id: "br-15"');
if (br15Idx !== -1) {
  // Find the end of br-15 object
  const br19Idx = code.indexOf('id: "br-19"', br15Idx);
  const brCloseIdx = code.indexOf('];', br15Idx);
  if (br19Idx !== -1 && br19Idx < brCloseIdx) {
    // Cut out br-19 up to just before ];
    // Let's find the closing brace before br-19
    const commaBefore19 = code.lastIndexOf('},', br19Idx);
    if (commaBefore19 !== -1) {
      code = code.substring(0, commaBefore19 + 1) + '\n];' + code.substring(brCloseIdx + 2);
      console.log('✓ 4. BUSCADOR_RAPIDO trimmed to canonical 15 rows (up to br-15)!');
    }
  }
}

// ============================================================================
// 5. BFE: EFE 4 CRÉDITOS Y CASASUP.EDU.PE
// ============================================================================
code = code.replace(/deben acreditar obligatoriamente 2 créditos EFE para egresar/g, 'deben acreditar obligatoriamente 4 créditos EFE para egresar');
console.log('✓ 5. EFE obligatory credits set to 4 créditos!');

// Replace any casaup.edu.pe with https://www.up.edu.pe or official links
code = code.replace(/https:\/\/casaup\.edu\.pe/g, 'https://www.up.edu.pe');
code = code.replace(/casaup\.edu\.pe/g, 'www.up.edu.pe');
console.log('✓ 5b. Broken casaup.edu.pe replaced with https://www.up.edu.pe');

// In BFE header data
code = code.replace(
  'central: "(01) 219-0100 (Anexos: 2390 / 2261) | www.up.edu.pe"',
  'central: "(01) 219-0100 (Anexos: 2390 / 2261)",\n    portal: "https://www.up.edu.pe"'
);

// In BFE franja celeste JSX
const oldBfeCentralWeb = `<div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">CENTRAL / WEB</div>
                <div className="font-bold text-[#1E40AF]">{BFE_DATA.header.central}</div>
              </div>`;

const newBfeCentralWeb = `<div>
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
              </div>`;

if (code.includes(oldBfeCentralWeb)) {
  code = code.replace(oldBfeCentralWeb, newBfeCentralWeb);
  console.log('✓ 5c. BFE Central & Web link updated in franja celeste!');
}

// ============================================================================
// 6. DIRECTORIO: PORTAL WEB WORKING LINK & OFICINA DAAR
// ============================================================================
const oldDirPortal = `<div>
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-0.5 text-[10px]">PORTAL WEB</div>
                <div className="font-bold text-[#1E40AF]">{DIRECTORIO_DATA.header.portal}</div>
              </div>`;

const newDirPortal = `<div>
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
              </div>`;

if (code.includes(oldDirPortal)) {
  code = code.replace(oldDirPortal, newDirPortal);
  console.log('✓ 6a. Directorio Portal Web link made functional!');
}

// In Directorio data: update ofi-daar
const oldOfiDaar = `{
          id: "ofi-daar",
          nombre: "Servicios Académicos y Registro (DAAR)",
          correo: "pregrado@up.edu.pe",
          anexo: "8990"
        },`;

const newOfiDaar = `{
          id: "ofi-daar",
          nombre: "Oficina de Servicios Académicos y Registro (DAAR) — Ventanilla Presencial",
          correo: "pregrado@up.edu.pe",
          anexo: "8990",
          detalle: "Atención física en ventanilla y consultas telefónicas. Para trámites curriculares (matrícula, retiros, notas, sumillas), usa el módulo interactivo de DAAR."
        },`;

if (code.includes(oldOfiDaar)) {
  code = code.replace(oldOfiDaar, newOfiDaar);
  console.log('✓ 6b. ofi-daar updated with in-person notice and detail!');
}

// In Directorio rendering: add bridge button for ofi-daar
const oldDirItemEnd = `{item.correo && (
                        <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                          <button
                            onClick={() => copyToClipboard(item.correo, \`¡Correo \${item.correo} copiado!\`)}
                            className="font-bold text-xs text-[#1E40AF] hover:underline flex items-center gap-1"
                          >
                            <span>{item.correo}</span>
                            <Icon name="copy" className="w-3 h-3 text-slate-400" />
                          </button>
                          <a
                            href={\`mailto:\${item.correo}?subject=\${encodeURIComponent(\`Consulta \${item.nombre} – \${studentCode || '20231234'}\`)}\`}
                            className="px-2.5 py-1 bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 rounded text-xs font-bold transition"
                          >
                            Redactar
                          </a>
                        </div>
                      )}`;

const newDirItemEnd = `{item.correo && (
                        <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                          <button
                            onClick={() => copyToClipboard(item.correo, \`¡Correo \${item.correo} copiado!\`)}
                            className="font-bold text-xs text-[#1E40AF] hover:underline flex items-center gap-1"
                          >
                            <span>{item.correo}</span>
                            <Icon name="copy" className="w-3 h-3 text-slate-400" />
                          </button>
                          <a
                            href={\`mailto:\${item.correo}?subject=\${encodeURIComponent(\`Consulta \${item.nombre} – \${studentCode || '20231234'}\`)}\`}
                            className="px-2.5 py-1 bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 rounded text-xs font-bold transition"
                          >
                            Redactar
                          </a>
                        </div>
                      )}

                      {item.id === 'ofi-daar' && (
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setActiveSection('daar');
                              window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className="w-full py-2 px-3 bg-[#1E40AF] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                          >
                            <span>Ir al módulo de Trámites DAAR</span>
                            <Icon name="chevron-right" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}`;

if (code.includes(oldDirItemEnd)) {
  code = code.replace(oldDirItemEnd, newDirItemEnd);
  console.log('✓ 6c. Bridge button to DAAR section added in Directorio card!');
}

// ============================================================================
// 7. DAAR SECTION OVERHAUL: MATRÍCULA & RETIROS A POWERCAMPUS / UP EXPERIENCE
// ============================================================================
// Look for DAAR detail rendering
const oldDaarDetailBlock = `{/* Texto Oficial Textual */}
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
                        const subj = \`\${activeDaarItem.nombre} – \${studentCode || '20231234'}\`;
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
                    href={\`mailto:\${activeDaarItem.correo}?subject=\${encodeURIComponent(\`\${activeDaarItem.nombre} – \${studentCode || '20231234'}\`)}\`}
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
                </div>`;

const newDaarDetailBlock = `{/* Texto Oficial Textual */}
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
                            const subj = \`\${activeDaarItem.nombre} – \${studentCode || '20231234'}\`;
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
                        href={\`mailto:\${activeDaarItem.correo}?subject=\${encodeURIComponent(\`\${activeDaarItem.nombre} – \${studentCode || '20231234'}\`)}\`}
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
                )}`;

if (code.includes(oldDaarDetailBlock)) {
  code = code.replace(oldDaarDetailBlock, newDaarDetailBlock);
  console.log('✓ 7. DAAR detail overhauled for PowerCampus & UP Experience with exception fallback!');
} else {
  console.log('⚠ 7. oldDaarDetailBlock pattern not matched directly, checking...');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Finished writing updates to app.js');

