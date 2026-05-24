const fs = require('fs');
let content = fs.readFileSync('src/index.html', 'utf8');
content = content.replace(/Jayant Goel \(JayantGoel001\)'s/g, "HARINIVASH S's");
content = content.replace(/Jayant Goel/g, "HARINIVASH S");
content = content.replace(/jayantgoel001\.github\.io/g, "harinivash-s.github.io");
content = content.replace(/JayantGoel001/g, "HARINIVASH-S");
content = content.replace(/jayantgoel001/g, "harinivash-s");
content = content.replace(/jgoel92@gmail\.com/g, "harinivash0077@gmail.com");
fs.writeFileSync('src/index.html', content);
