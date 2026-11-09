const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.toLowerCase().includes('casaup')) {
    console.log('Line ' + (i + 1) + ': ' + l);
  }
});

