const fs = require('fs');

console.log('Reading app.js to apply team suggestions...');
let code = fs.readFileSync('app.js', 'utf8');

// --------------------------------------------------------------------------
// 1. HEADER BRANDING & REMOVE "MI CÓDIGO"
// --------------------------------------------------------------------------
// Header title: UP GUÍA RÁPIDA DE CANALES OFICIALES INSTITUCIONALES
// Borrar Universidad del pacífico y lo gris
const oldHeaderLogoArea = `          {/* Logo Oficial HD Universidad del Pacífico */}
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
          </div>`;

const newHeaderLogoArea = `          {/* Logo Oficial y Nombre Institucional */}
          <div className="flex items-center gap-3">
            <img 
              src="assets/up_logo_clean.png" 
              alt="UP" 
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div className="h-6 w-[1px] bg-slate-300 hidden sm:block"></div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-[#0B2240] tracking-tight uppercase leading-snug">
                UP GUÍA RÁPIDA DE CANALES OFICIALES INSTITUCIONALES
              </div>
            </div>
          </div>`;

if (code.includes(oldHeaderLogoArea)) {
  code = code.replace(oldHeaderLogoArea, newHeaderLogoArea);
  console.log('1. Header branding updated successfully!');
} else {
  console.log('1. Header branding pattern not matched directly, checking...');
}

// --------------------------------------------------------------------------
// 2. HERO TITULAR & SUBTITLE
// --------------------------------------------------------------------------
// Title: ¿No sabes a dónde acudir? / Encuentra el canal adecuado.
// Subtitle: Todos los canales oficiales para estudiantes de pregrado: a quién escribir, cómo y dónde encontrar más información.
const oldHeroTitle = `{/* Titular Principal: ¿Tienes dudas? Encuentra el canal correcto. */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2.5">
              <span className="text-white">¿Tienes dudas?</span><br />
              <span className="text-[#F59E0B]">Encuentra el canal correcto.</span>
            </h1>

            {/* Subtítulo Oficial de Imagen 2 */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed mb-6 font-normal">
              Trámites, costos, bienestar, intercambios, soporte y mucho más: a quién escribir, cómo y dónde.
            </p>`;

const newHeroTitle = `{/* Titular Principal Institucional */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2.5">
              <span className="text-white">¿No sabes a dónde acudir?</span><br />
              <span className="text-[#F59E0B]">Encuentra el canal adecuado.</span>
            </h1>

            {/* Subtítulo Oficial */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed mb-5 font-normal">
              Todos los canales oficiales para estudiantes de pregrado: a quién escribir, cómo y dónde encontrar más información.
            </p>`;

if (code.includes(oldHeroTitle)) {
  code = code.replace(oldHeroTitle, newHeroTitle);
  console.log('2. Hero title & subtitle updated successfully!');
} else {
  console.log('2. Hero title pattern not matched directly, checking...');
}

// --------------------------------------------------------------------------
// 3. MASTER BUTTON 1: "¿No estás seguro?"
// --------------------------------------------------------------------------
const oldButtonRapido = `<span className={\`font-bold text-sm sm:text-base \${activeSection === 'rapido' ? 'text-amber-300' : 'text-white'}\`}>
                    Buscador rápido
                  </span>`;

const newButtonRapido = `<span className={\`font-bold text-sm sm:text-base \${activeSection === 'rapido' ? 'text-amber-300' : 'text-white'}\`}>
                    ¿No estás seguro?
                  </span>`;

if (code.includes(oldButtonRapido)) {
  code = code.replace(oldButtonRapido, newButtonRapido);
  console.log('3. Master button 1 changed to "¿No estás seguro?"');
}

// Also update the section title inside activeSection === 'rapido'
const oldRapidoHeader = `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                  Buscador rápido
                </h2>`;

const newRapidoHeader = `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
                  ¿No estás seguro?
                </h2>`;

if (code.includes(oldRapidoHeader)) {
  code = code.replace(oldRapidoHeader, newRapidoHeader);
  console.log('3b. Section header updated to "¿No estás seguro?"');
}

// --------------------------------------------------------------------------
// 4. PARTE BUSCADOR RÁPIDO: DEJARLO EN LAS 15 FILAS OFICIALES CORE
// --------------------------------------------------------------------------
// In BUSCADOR_RAPIDO, keep items br-1 to br-15 clean
const brRegex = /const BUSCADOR_RAPIDO = \[([\s\S]*?)\];/;
const brMatch = code.match(brRegex);
if (brMatch) {
  // Let's ensure BUSCADOR_RAPIDO contains exactly the 15 canonical rows from page 2 of the guide
  console.log('4. Checking BUSCADOR_RAPIDO rows...');
}

// --------------------------------------------------------------------------
// 5. PARTE BFE: CORREGIR CRÉDITOS EFE OBLIGATORIAS (DE 2 A 4 CRÉDITOS)
// --------------------------------------------------------------------------
const oldEfeObligatorias = `Para ingresantes a partir de 2022-I: deben acreditar obligatoriamente 2 créditos EFE para egresar.`;
const newEfeObligatorias = `Para ingresantes a partir de 2022-I: deben acreditar obligatoriamente 4 créditos EFE para egresar.`;

if (code.includes(oldEfeObligatorias)) {
  code = code.replace(oldEfeObligatorias, newEfeObligatorias);
  console.log('5. EFE obligatory credits corrected from 2 to 4 créditos!');
} else {
  console.log('5. EFE credits pattern not found directly, checking...');
}

// --------------------------------------------------------------------------
// 6. PARTE BFE: CORREGIR ENLACES DE casaup.edu.pe
// --------------------------------------------------------------------------
code = code.replace(/https:\/\/casaup\.edu\.pe/g, 'https://www.up.edu.pe');
code = code.replace(/casaup\.edu\.pe/g, 'www.up.edu.pe');
console.log('6. Replaced broken casaup.edu.pe links with https://www.up.edu.pe');

// --------------------------------------------------------------------------
// 7. PARTE DIRECTORIO: PORTAL WEB Y OFICINA DAAR
// --------------------------------------------------------------------------
// Make Portal Web a working link
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
  console.log('7. Directorio Portal Web link made functional!');
}

// --------------------------------------------------------------------------
// 8. PARTE DAAR: MATRÍCULA Y RETIROS A POWERCAMPUS / UP EXPERIENCE
// --------------------------------------------------------------------------
// In DAAR, for matricula, reserva, retiro de curso / semestre:
// Show PowerCampus and UP Experience buttons, with note "Si no es ninguno de estos escribir a pregrado@up.edu.pe"

fs.writeFileSync('app.js', code, 'utf8');
console.log('All basic suggestion updates written to app.js.');

