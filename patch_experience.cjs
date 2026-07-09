const fs = require('fs');
const file = 'src/sections/Experience.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { triggerVibration')) {
  content = content.replace(
    "import { useLanguage } from '../context/LanguageContext';",
    "import { useLanguage } from '../context/LanguageContext';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
  );
}

content = content.replace(
  "onClick={() => setActiveTab('experience')}",
  "onClick={() => { setActiveTab('experience'); triggerVibration(hapticPatterns.medium); }}"
);
content = content.replace(
  "onClick={() => setActiveTab('education')}",
  "onClick={() => { setActiveTab('education'); triggerVibration(hapticPatterns.medium); }}"
);

fs.writeFileSync(file, content);
