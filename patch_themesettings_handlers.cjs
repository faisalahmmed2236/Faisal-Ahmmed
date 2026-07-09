const fs = require('fs');
const file = 'src/components/ThemeSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "const handleOpenPanel = () => {",
  "const handleOpenPanel = () => {\n    triggerVibration(hapticPatterns.medium);"
);

content = content.replace(
  "const handleClosePanel = () => {",
  "const handleClosePanel = () => {\n    triggerVibration(hapticPatterns.light);"
);

fs.writeFileSync(file, content);
