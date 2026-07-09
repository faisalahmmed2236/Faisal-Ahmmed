const fs = require('fs');
const file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { generateResume } from '../utils/pdfGenerator';",
  "import { generateResume } from '../utils/pdfGenerator';\nimport { triggerVibration, hapticPatterns } from '../lib/haptics';"
);

// Add to toggleMode
content = content.replace(
  "const toggleMode = () => {",
  "const toggleMode = () => {\n    triggerVibration(hapticPatterns.light);"
);

// Add to toggleLanguage
content = content.replace(
  "const toggleLanguage = () => {",
  "const toggleLanguage = () => {\n    triggerVibration(hapticPatterns.light);"
);

// Add to setMobileMenuOpen
content = content.replace(
  "setMobileMenuOpenState(open);",
  "setMobileMenuOpenState(open);\n    triggerVibration(open ? hapticPatterns.medium : hapticPatterns.light);"
);

// Add to scrollToTop
content = content.replace(
  "const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {",
  "const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {\n    triggerVibration(hapticPatterns.medium);"
);

// Add to scrollToSection
content = content.replace(
  "const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {",
  "const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {\n    triggerVibration(hapticPatterns.light);"
);

content = content.replace(
  "onClick={() => generateResume(portfolioData)}",
  "onClick={() => { generateResume(portfolioData); triggerVibration(hapticPatterns.medium); }}"
);

fs.writeFileSync(file, content);
