const fs = require('fs');
let c = fs.readFileSync('src/assets/data.min.js', 'utf8');
c = c.replace(/"Personal Finance Tracker"/g, '"Personal-Finance-Tracker"');
c = c.replace(/"Smart Vehicle Lock"/g, '"Smart-Vehicle-Lock"');
c = c.replace(/"Child Adoption App UX\/UI"/g, '"Child-Adoption-App-UX-UI"');
c = c.replace(/"Python Mini Projects"/g, '"Python-Mini-Projects"');
fs.writeFileSync('src/assets/data.min.js', c);
