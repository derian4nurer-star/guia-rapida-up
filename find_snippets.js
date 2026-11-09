const fs = require('fs');
const s = fs.readFileSync('app.js', 'utf8');
const lines = s.split('\n');

function findSnippet(term) {
  const idx = lines.findIndex(l => l.includes(term));
  console.log(`Snippet [${term}]: line ${idx + 1}`);
  if (idx !== -1) {
    console.log(lines.slice(idx, idx + 20).map((l, i) => (idx + 1 + i) + ': ' + l).join('\n'));
  }
}

findSnippet("activeSection === 'daar'");
findSnippet("currentDirCategory.organizaciones.map");
findSnippet("Cuadrícula de Contactos Oficiales");
findSnippet("CampusMapModal");

