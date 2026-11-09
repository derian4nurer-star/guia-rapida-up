const fs = require('fs');
const s = fs.readFileSync('app.js', 'utf8');
const lines = s.split('\n');

function findAndPrint(term, count = 40) {
  const idx = lines.findIndex(l => l.includes(term));
  if (idx !== -1) {
    console.log(`=== Found "${term}" at line ${idx + 1} ===`);
    console.log(lines.slice(idx, idx + count).map((l, i) => (idx + 1 + i) + ': ' + l).join('\n'));
  } else {
    console.log(`=== "${term}" NOT FOUND ===`);
  }
}

findAndPrint("activeSection === 'directorio'", 50);
findAndPrint("activeDirCat === 'ori'", 40);
findAndPrint("activeDirCat === 'empleabilidad'", 30);
findAndPrint("activeDirCat === 't2d'", 30);
findAndPrint("activeDirCat === 'representacion'", 30);

