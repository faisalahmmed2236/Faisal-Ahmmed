const fs = require('fs');
const file = 'src/components/FloatingShareWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { useLanguage } from '../context/LanguageContext';",
  "import { useLanguage } from '../context/LanguageContext';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

content = content.replace(
  "onClick={() => setIsOpen(!isOpen)}",
  "onClick={() => { setIsOpen(!isOpen); triggerVibration(hapticPatterns.medium); }}"
);

fs.writeFileSync(file, content);
