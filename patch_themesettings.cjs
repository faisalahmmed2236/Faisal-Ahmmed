const fs = require('fs');
const file = 'src/components/ThemeSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace(
  "import { generateResume } from '../utils/pdfGenerator';",
  "import { generateResume } from '../utils/pdfGenerator';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

// Add to open/close
content = content.replace(
  "setIsOpen(!isOpen);",
  "setIsOpen(!isOpen);\n            triggerVibration(hapticPatterns.medium);"
);

// Add to buttons
content = content.replace(
  "onClick={() => selectMode('dark')}",
  "onClick={() => { selectMode('dark'); triggerVibration(hapticPatterns.light); }}"
);
content = content.replace(
  "onClick={() => selectMode('light')}",
  "onClick={() => { selectMode('light'); triggerVibration(hapticPatterns.light); }}"
);
content = content.replace(
  "onClick={() => selectMode('system')}",
  "onClick={() => { selectMode('system'); triggerVibration(hapticPatterns.light); }}"
);

content = content.replace(
  "onClick={() => language !== 'en' && toggleLanguage()}",
  "onClick={() => { if (language !== 'en') toggleLanguage(); triggerVibration(hapticPatterns.light); }}"
);
content = content.replace(
  "onClick={() => language !== 'es' && toggleLanguage()}",
  "onClick={() => { if (language !== 'es') toggleLanguage(); triggerVibration(hapticPatterns.light); }}"
);

content = content.replace(
  "selectTheme(t.id as any)",
  "selectTheme(t.id as any); triggerVibration(hapticPatterns.medium)"
);

content = content.replace(
  "setSoundEnabled(false)",
  "setSoundEnabled(false); triggerVibration(hapticPatterns.light)"
);
content = content.replace(
  "setSoundEnabled(true);",
  "setSoundEnabled(true);\n                          triggerVibration(hapticPatterns.light);"
);

fs.writeFileSync(file, content);
