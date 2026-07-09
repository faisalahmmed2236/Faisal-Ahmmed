const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { FloatingShareWidget } from './components/FloatingShareWidget';",
  "import { FloatingShareWidget } from './components/FloatingShareWidget';\nimport { ExitIntentModal } from './components/ExitIntentModal';"
);

content = content.replace(
  "<FloatingShareWidget />\n    </div>",
  "<FloatingShareWidget />\n      <ExitIntentModal />\n    </div>"
);

fs.writeFileSync(file, content);
