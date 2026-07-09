const fs = require('fs');
const file = 'src/components/ThemeSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "onClick={() => selectTheme(t.id as any); triggerVibration(hapticPatterns.medium)}",
  "onClick={() => { selectTheme(t.id as any); triggerVibration(hapticPatterns.medium); }}"
);

content = content.replace(
  "onClick={() => setSoundEnabled(false); triggerVibration(hapticPatterns.light)}",
  "onClick={() => { setSoundEnabled(false); triggerVibration(hapticPatterns.light); }}"
);

fs.writeFileSync(file, content);
