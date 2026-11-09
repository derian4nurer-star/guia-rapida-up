const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
console.log(lines.slice(3915, 3945).map((l, i) => (3916 + i) + ': ' + l).join('\n'));

