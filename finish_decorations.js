const fs = require('fs');

console.log('Running finish_decorations.js...');
let code = fs.readFileSync('app.js', 'utf8');

// 1. DAAR Header: add buho_study.png and daar_logo.png
const oldDaarHeaderStart = `{/* Píldora de Categoría */}
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

const newDaarHeaderStart = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
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

if (code.includes(oldDaarHeaderStart)) {
  code = code.replace(oldDaarHeaderStart, newDaarHeaderStart);
  console.log('✓ 1. DAAR header enhanced with buho_study.png and daar_logo.png');
} else {
  console.log('⚠ 1. DAAR header pattern not matched directly');
}

// 2. Directorio -> Empleabilidad banner: insert before currentDirCategory.items.map
const oldDirItemsBlock = `<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDirCategory.items.map((item) => (`;

const newDirItemsBlock = `{/* Banner Especial de Empleabilidad (Réplica Exacta de Imagen 3) */}
                {currentDirCategory.id === 'empleabilidad' && (
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 mb-5">
                    <img 
                      src="assets/empleabilidad_banner_reference.jpg" 
                      alt="Empleabilidad y Red Alumni" 
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDirCategory.items.map((item) => (`;

if (code.includes(oldDirItemsBlock)) {
  code = code.replace(oldDirItemsBlock, newDirItemsBlock);
  console.log('✓ 2. Empleabilidad banner added from reference 3 (assets/empleabilidad_banner_reference.jpg)');
} else {
  console.log('⚠ 2. oldDirItemsBlock not matched directly');
}

// Also in Empleabilidad cards, show buho_formal.png
const oldDirItemCardTitle = `<div className="font-bold text-sm text-[#0B2240]">{item.nombre}</div>`;
const newDirItemCardTitle = `<div className="flex items-center gap-2">
                          {currentDirCategory.id === 'empleabilidad' && (
                            <img src="assets/buho_formal.png" alt="Búho formal" className="w-5 h-5 object-contain shrink-0" />
                          )}
                          <div className="font-bold text-sm text-[#0B2240]">{item.nombre}</div>
                        </div>`;

if (code.includes(oldDirItemCardTitle)) {
  code = code.replace(oldDirItemCardTitle, newDirItemCardTitle);
  console.log('✓ 2b. buho_formal.png added to Empleabilidad cards');
}

// 3. Representación Estudiantil: add rea_logo.jpg, reup_logo.jpg and reup_buho_mascota.jpg
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
  console.log('✓ 3. REA logo, REUP logo and REUP mascot added to Representación Estudiantil');
} else {
  console.log('⚠ 3. oldRepHeader pattern not matched directly');
}

// 4. Modal de zoom para captura de pantalla de PowerCampus (Imagen 1)
const oldModalEnd = `<CampusMapModal 
        isOpen={showMapModal} 
        onClose={() => setShowMapModal(false)} 
        initialPabellon={mapFocusPabellon} 
      />`;

const newModalEnd = `<CampusMapModal 
        isOpen={showMapModal} 
        onClose={() => setShowMapModal(false)} 
        initialPabellon={mapFocusPabellon} 
      />

      {/* MODAL DE ZOOM DE CAPTURA REFERENCIAL DE POWERCAMPUS (IMAGEN 1) */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border border-slate-300 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 animate-pulse"></span>
                <div>
                  <h3 className="font-extrabold text-base text-[#0B2240]">
                    Captura Oficial de Referencia · PowerCampus UP
                  </h3>
                  <span className="text-xs text-slate-500">
                    Ruta: Pestaña «Información General» → «Trámites y Documentos»
                  </span>
                </div>
              </div>
              <button
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900 flex items-center justify-center">
              <img 
                src={zoomImage} 
                alt="Captura de referencia ampliada de PowerCampus" 
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-600">
                Aquí encuentras: Precios y plazos, Solicitud de requisito de inglés, Carné universitario, Firma de convenio de prácticas, Carta de presentación y Verificación académica.
              </span>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href="https://powercampus.up.edu.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition shadow-xs"
                >
                  <span>Abrir PowerCampus</span>
                  <Icon name="external-link" className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setZoomImage(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}`;

if (code.includes(oldModalEnd)) {
  code = code.replace(oldModalEnd, newModalEnd);
  console.log('✓ 4. Zoom Image modal added for PowerCampus reference screenshot');
} else {
  console.log('⚠ 4. oldModalEnd pattern not matched directly');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Finished updating app.js');

