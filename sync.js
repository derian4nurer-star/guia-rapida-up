const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');

// Check syntax balance
let b = 0, p = 0, k = 0;
for (let c of appJs) {
  if (c === '{') b++; if (c === '}') b--;
  if (c === '(') p++; if (c === ')') p--;
  if (c === '[') k++; if (c === ']') k--;
}
console.log('app.js balance -> braces:', b, 'parens:', p, 'brackets:', k);

if (b !== 0 || p !== 0 || k !== 0) {
  console.error('ERROR: Unbalanced brackets in app.js!');
  process.exit(1);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
const scriptStartTag = '<script type="text/babel">';
const scriptEndTag = '</script>';

const startIdx = indexHtml.indexOf(scriptStartTag);
const endIdx = indexHtml.lastIndexOf(scriptEndTag);

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: script tags not found in index.html!');
  process.exit(1);
}

const header = indexHtml.substring(0, startIdx + scriptStartTag.length);
const footer = indexHtml.substring(endIdx);

const newHtml = header + '\n' + appJs + '\n  ' + footer;
fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('index.html successfully updated and synced with app.js! Length:', newHtml.length);

