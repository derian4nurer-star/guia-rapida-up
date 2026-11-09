const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('const BUSCADOR_RAPIDO ='));
const end = lines.findIndex((l, i) => i > start && l.includes('];'));
const text = lines.slice(start, end).join('\n');

const regex = /id:\s*"([^"]+)",\s*duda:\s*"([^"]+)",\s*canal:\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(text)) !== null) {
  console.log(`${match[1]}: ${match[3]} -> ${match[2]}`);
}

