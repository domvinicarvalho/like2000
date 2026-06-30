var fs = require('fs');
var c = fs.readFileSync('d:/Bad Idea/LIKE 2000/perfil.html', 'utf8');
var i = c.indexOf('Editar Perfil');
if (i >= 0) {
  var start = Math.max(0, i - 40);
  var end = Math.min(c.length, i + 80);
  console.log('FOUND at ' + i + ':');
  console.log(c.substring(start, end));
  console.log('---');
}
var count = 0;
var p = 0;
while ((p = c.indexOf('Editar Perfil', p)) >= 0) { count++; p++; }
console.log('Total Editar Perfil: ' + count);

var sc = 0; p = 0;
while ((p = c.indexOf('sm-edit-link', p)) >= 0) { sc++; p++; }
console.log('Total sm-edit-link: ' + sc);
