const fs = require('fs');

const lines = fs.readFileSync('app.js', 'utf8').split('\n');
console.log(lines.slice(3120, 3200).map((l, i) => (3121 + i) + ': ' + l).join('\n'));

