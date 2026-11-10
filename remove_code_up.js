const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. In DynamicResultCard: replace signature and state
const target1 = `function DynamicResultCard({ 
  channel, 
  studentCode, 
  setStudentCode, 
  copyToClipboard, 
  onOpenMap 
}) {
  const [localCode, setLocalCode] = useState(studentCode || '20231234');
  const [isCopiedAsunto, setIsCopiedAsunto] = useState(false);
  const [isCopiedCorreo, setIsCopiedCorreo] = useState(false);

  useEffect(() => {
    setLocalCode(studentCode || '20231234');
  }, [studentCode]);

  const handleCodeChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
    setLocalCode(val);
    if (setStudentCode) setStudentCode(val);
  };

  const officialSubject = (channel.asunto || channel.tramite.split('/')[0].trim()) + ' - ' + (localCode || '20231234');`;

const repl1 = `function DynamicResultCard({ 
  channel, 
  copyToClipboard, 
  onOpenMap 
}) {
  const [isCopiedAsunto, setIsCopiedAsunto] = useState(false);
  const [isCopiedCorreo, setIsCopiedCorreo] = useState(false);

  const officialSubject = channel.asunto || channel.tramite.split('/')[0].trim();`;

if (!code.includes(target1)) {
  console.error('Target 1 not found!');
  process.exit(1);
}
code = code.replace(target1, repl1);

// 2. In DynamicResultCard: replace the Code input box UI
const target2 = `          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <label className="text-xs font-bold text-slate-600">Código UP:</label>
            <input
              type="text"
              maxLength="8"
              value={localCode}
              onChange={handleCodeChange}
              placeholder="Ej. 20231234"
              className="w-24 px-2.5 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-center"
            />
          </div>`;

if (!code.includes(target2)) {
  console.error('Target 2 not found!');
  process.exit(1);
}
code = code.replace(target2, '');

// Also clean the description text in that header:
code = code.replace(
  'Ingresa tu código de alumno para redactar según el formato institucional «Tema - Código»:',
  'Formato institucional listo para copiar y enviar desde tu correo oficial UP:'
);

code = code.replace(
  'GENERADOR AUTOMÁTICO DE ASUNTO OFICIAL UP',
  'ASUNTO OFICIAL SUGERIDO'
);

// 3. Remove studentCode in App()
const target3 = `  // Código de Alumno Persistente
  const [studentCode, setStudentCode] = useState('20231234');
  const [isEditingCode, setIsEditingCode] = useState(false);`;

if (!code.includes(target3)) {
  console.error('Target 3 not found!');
  process.exit(1);
}
code = code.replace(target3, '');

// 4. In DynamicResultCard call inside SearchEngineResults:
code = code.replace(
  `                      studentCode={studentCode}
                      setStudentCode={setStudentCode}`,
  ''
);

fs.writeFileSync('app.js', code, 'utf8');
console.log('✓ Successfully removed all Código UP inputs and states!');

