const fs = require('fs');
const file = 'src/sections/Contact.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { useLanguage } from '../context/LanguageContext';",
  "import { useLanguage } from '../context/LanguageContext';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

content = content.replace(
  "href={`mailto:${profile.socials.email}`}",
  "href={`mailto:${profile.socials.email}`}\n              onClick={() => triggerVibration(hapticPatterns.medium)}"
);

fs.writeFileSync(file, content);
