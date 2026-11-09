const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
console.log(lines.slice(3480, 3570).map((l, i) => (3481 + i) + ': ' + l).join('\n'));

