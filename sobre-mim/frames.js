var FRAME_CATALOG = [
  { key: 'box_rounded', name: 'Caixa Arredondada', category: 'Caixa', description: 'asdf', apply: function(texto) { var l=texto.split("\n"); var m=0; for(var i=0;i<l.length;i++){if(l[i].length>m)m=l[i].length;} var t="\u256d"+"\u2500".repeat(m+2)+"\u256e"; var b="\u2570"+"\u2500".repeat(m+2)+"\u256f"; var r=[t]; for(var i=0;i<l.length;i++){r.push("\u2502 "+l[i]+" ".repeat(m-l[i].length)+" \u2502");} r.push(b); return r.join("\n"); } },
  { key: 'box_thick', name: 'Caixa Grossa', category: 'Caixa', description: 'asdf', apply: function(texto) { var l=texto.split("\n"); var m=0; for(var i=0;i<l.length;i++){if(l[i].length>m)m=l[i].length;} var t="\u2554"+"\u2550".repeat(m+2)+"\u2557"; var b="\u255a"+"\u2550".repeat(m+2)+"\u255d"; var r=[t]; for(var i=0;i<l.length;i++){r.push("\u2551 "+l[i]+" ".repeat(m-l[i].length)+" \u2551");} r.push(b); return r.join("\n"); } },
  { key: 'box_light', name: 'Caixa Fina', category: 'Caixa', description: 'asdf', apply: function(texto) { var l=texto.split("\n"); var m=0; for(var i=0;i<l.length;i++){if(l[i].length>m)m=l[i].length;} var t="\u250c"+"\u2500".repeat(m+2)+"\u2510"; var b="\u2514"+"\u2500".repeat(m+2)+"\u2518"; var r=[t]; for(var i=0;i<l.length;i++){r.push("\u2502 "+l[i]+" ".repeat(m-l[i].length)+" \u2502");} r.push(b); return r.join("\n"); } },
  { key: 'stars_classic', name: 'Estrelas Classic', category: 'Estrelas', description: 'asdf', apply: function(texto) { var l=texto.split("\n"); var m=0; for(var i=0;i<l.length;i++){if(l[i].length>m)m=l[i].length;} var r=l.map(function(x){return "\u2605 "+x+" \u2605";}); return r.join("\n"); } },
  { key: 'hearts_classic', name: 'Coracoes Classic', category: 'Coracoes', description: 'asdf', apply: function(texto) { var l=texto.split("\n"); var m=0; for(var i=0;i<l.length;i++){if(l[i].length>m)m=l[i].length;} var r=l.map(function(x){return "\u2665 "+x+" \u2665";}); return r.join("\n"); } },
  { key: 'quotes_curly', name: 'Aspas Curvas', category: 'Aspas', description: 'texto', apply: function(texto) { var l=texto.split("\n"); return l.map(function(x){return "\u275d "+x+" \u275e";}).join("\n"); } },
  { key: 'quotes_angle', name: 'Aspas Angulares', category: 'Aspas', description: 'texto', apply: function(texto) { var l=texto.split("\n"); return l.map(function(x){return "\u00ab "+x+" \u00bb";}).join("\n"); } },
  { key: 'fancy_ornament', name: 'Ornamental', category: 'Ornamental', description: 'asdf', apply: function(texto) { var l=texto.split("\n"); return l.map(function(x){return "\ua9c1\u0f3a "+x+" \u0f3b\ua9c1";}).join("\n"); } },
  { key: 'none', name: 'Sem Moldura', category: 'Nenhuma', description: 'texto puro', apply: function(texto) { return texto; } }
];

function aplicarMoldura(texto, frameKey) {
  if (!texto || !frameKey || frameKey === "none") return texto || "";
  for (var i = 0; i < FRAME_CATALOG.length; i++) {
    if (FRAME_CATALOG[i].key === frameKey) return FRAME_CATALOG[i].apply(texto);
  }
  return texto;
}

function getFrameByKey(key) {
  for (var i = 0; i < FRAME_CATALOG.length; i++) {
    if (FRAME_CATALOG[i].key === key) return FRAME_CATALOG[i];
  }
  return null;
}
