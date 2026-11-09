const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const start = content.indexOf('const DIRECTORIO_DATA =');
const end = content.indexOf('function App()');
const dirPart = content.substring(start, end);

const matches = [...dirPart.matchAll(/web:\s*['"]([^'"]+)['"]/g)];
console.log('Web links in DIRECTORIO_DATA:', matches.map(m => m[1]));

