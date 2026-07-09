const fs = require('fs');
const file = 'src/sections/Projects.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "href={project.githubUrl}",
  "href={project.githubUrl}\n                          onClick={() => triggerVibration(hapticPatterns.light)}"
);
content = content.replace(
  "href={project.liveUrl}",
  "href={project.liveUrl}\n                          onClick={() => triggerVibration(hapticPatterns.light)}"
);

fs.writeFileSync(file, content);
