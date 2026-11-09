const fs = require('fs');

const lines = fs.readFileSync('app.js', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('const DIRECTORIO_DATA ='));
console.log(lines.slice(start, start + 70).map((l, i) => (start + 1 + i) + ': ' + l).join('\n'));

