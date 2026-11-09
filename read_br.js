const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('const BUSCADOR_RAPIDO ='));
const end = lines.findIndex((l, i) => i > start && l.includes('];'));
console.log('BUSCADOR_RAPIDO from line', start + 1, 'to', end + 1);
const items = lines.slice(start, end).filter(l => l.includes('id: "br-'));
console.log('Total items in BUSCADOR_RAPIDO:', items.length);
items.forEach(l => console.log(l.trim()));

