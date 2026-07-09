const fs = require('fs');
const file = 'src/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { triggerVibration')) {
  content = content.replace(
    "import { generateResume } from '../utils/pdfGenerator';",
    "import { generateResume } from '../utils/pdfGenerator';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
  );
}

content = content.replace(
  "onClick={() => generateResume(portfolioData)}",
  "onClick={() => { generateResume(portfolioData); triggerVibration(hapticPatterns.medium); }}"
);

fs.writeFileSync(file, content);
