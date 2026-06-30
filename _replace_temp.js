const fs = require('fs');
let content = fs.readFileSync('d:/Bad Idea/LIKE 2000/script.js', 'utf8');

// Replace the bio textarea with the builder container
content = content.replace(
  /<label>Bio \/ Quem sou eu:<\/label>\n           <textarea id="up-edit-bio" placeholder="Fale um pouco sobre voc\u00EA\.\.\.">\$\{currentProfile\.bio \|\| ''\}<\/textarea>/g,
  '<div id="sm-builder-container"></div>'
);

// Also update the salvarInfoOrkut to use salvarInfoCompleta
content = content.replace(
  /<button onclick="salvarInfoOrkut\(\)" class="up-orkut-save-btn">💾 Salvar Dados Orkut<\/button>/g,
  '<button onclick="salvarInfoCompleta()" class="up-orkut-save-btn">💾 Salvar Dados Orkut</button>'
);

fs.writeFileSync('d:/Bad Idea/LIKE 2000/script.js', content, 'utf8');
console.log('Done');
