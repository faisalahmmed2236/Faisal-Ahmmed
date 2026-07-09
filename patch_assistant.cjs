const fs = require('fs');
const file = 'src/components/AIAssistantWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { useLanguage } from '../context/LanguageContext';",
  "import { useLanguage } from '../context/LanguageContext';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

content = content.replace(
  "setIsOpen(true)",
  "setIsOpen(true); triggerVibration(hapticPatterns.medium)"
);
content = content.replace(
  "setIsOpen(false)",
  "setIsOpen(false); triggerVibration(hapticPatterns.light)"
);
content = content.replace(
  "setIsOpen(!isOpen)",
  "setIsOpen(!isOpen); triggerVibration(hapticPatterns.medium)"
);

content = content.replace(
  "const handleSend = () => {",
  "const handleSend = () => {\n    triggerVibration(hapticPatterns.light);"
);

content = content.replace(
  "onClick={() => setIsOpen(true)}",
  "onClick={() => { setIsOpen(true); triggerVibration(hapticPatterns.medium); }}"
);
content = content.replace(
  "onClick={() => setIsOpen(false)}",
  "onClick={() => { setIsOpen(false); triggerVibration(hapticPatterns.light); }}"
);

fs.writeFileSync(file, content);
