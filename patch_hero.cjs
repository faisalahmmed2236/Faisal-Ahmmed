const fs = require('fs');
const file = 'src/sections/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { generateResume } from '../utils/pdfGenerator';",
  "import { generateResume } from '../utils/pdfGenerator';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

content = content.replace(
  "onClick={() => generateResume(portfolioData)}",
  "onClick={() => { generateResume(portfolioData); triggerVibration(hapticPatterns.medium); }}"
);

// We can also add haptics to the View Projects button:
content = content.replace(
  "href=\"#projects\"",
  "href=\"#projects\"\n               onClick={() => triggerVibration(hapticPatterns.light)}"
);

fs.writeFileSync(file, content);
