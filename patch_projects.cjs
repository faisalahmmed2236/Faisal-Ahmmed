const fs = require('fs');
const file = 'src/sections/Projects.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { ProjectImpact } from '../components/ProjectImpact';",
  "import { ProjectImpact } from '../components/ProjectImpact';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

content = content.replace(
  "onClick={() => setSelectedTech(null)}",
  "onClick={() => { setSelectedTech(null); triggerVibration(hapticPatterns.light); }}"
);
content = content.replace(
  "onClick={() => setSelectedTech(tech)}",
  "onClick={() => { setSelectedTech(tech); triggerVibration(hapticPatterns.light); }}"
);

fs.writeFileSync(file, content);
