const fs = require('fs');

console.log('Fixing zoomImage declaration in app.js...');
let code = fs.readFileSync('app.js', 'utf8');

// Insert const [zoomImage, setZoomImage] = useState(null); right after showMapModal
const target = `const [showMapModal, setShowMapModal] = useState(false);`;
const replacement = `const [showMapModal, setShowMapModal] = useState(false);\n  const [zoomImage, setZoomImage] = useState(null);`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  console.log('✓ Successfully declared zoomImage state in App()!');
} else {
  console.error('Target not found!');
  process.exit(1);
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Saved app.js');

