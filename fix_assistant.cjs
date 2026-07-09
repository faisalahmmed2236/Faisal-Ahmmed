const fs = require('fs');
const file = 'src/components/AIAssistantWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "onClick={() => setIsOpen(true); triggerVibration(hapticPatterns.medium)}",
  "onClick={() => { setIsOpen(true); triggerVibration(hapticPatterns.medium); }}"
);
content = content.replace(
  "onClick={() => setIsOpen(false); triggerVibration(hapticPatterns.light)}",
  "onClick={() => { setIsOpen(false); triggerVibration(hapticPatterns.light); }}"
);
content = content.replace(
  "onClick={() => setIsOpen(!isOpen); triggerVibration(hapticPatterns.medium)}",
  "onClick={() => { setIsOpen(!isOpen); triggerVibration(hapticPatterns.medium); }}"
);

fs.writeFileSync(file, content);
