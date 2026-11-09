const fs = require('fs');
const s = fs.readFileSync('app.js', 'utf8');
const lines = s.split('\n');

function findSnippets(pattern) {
  lines.forEach((l, i) => {
    if (l.includes(pattern)) {
      console.log(`${i + 1}: ${l.trim().substring(0, 100)}`);
    }
  });
}

console.log('--- activeSection === daar ---');
findSnippets("activeSection === 'daar'");

console.log('--- CampusMapModal calls ---');
findSnippets("<CampusMapModal");

console.log('--- currentDirCategory.items ---');
findSnippets("currentDirCategory.items");

