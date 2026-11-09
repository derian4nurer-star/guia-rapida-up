const fs = require('fs');

const lines = fs.readFileSync('app.js', 'utf8').split('\n');
console.log(lines.slice(880, 960).map((l, i) => (881 + i) + ': ' + l).join('\n'));

