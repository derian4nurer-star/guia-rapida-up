const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
const idx = lines.findIndex((l, i) => i > 3120 && l.includes('activeSection === \'daar\''));
console.log('daar panel in main starts at line', idx + 1);
console.log(lines.slice(idx, idx + 80).map((l, i) => (idx + 1 + i) + ': ' + l).join('\n'));

