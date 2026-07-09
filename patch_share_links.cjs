const fs = require('fs');
const file = 'src/components/FloatingShareWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "href={link.url}",
  "href={link.url}\n                onClick={() => triggerVibration(hapticPatterns.light)}"
);

fs.writeFileSync(file, content);
