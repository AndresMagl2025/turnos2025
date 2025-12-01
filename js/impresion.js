/* ===== IMPRIMIR REGISTROS ===== */

document.getElementById("printRegBtn").addEventListener("click",()=>{
  const movs = cargarMovs(anio,mes);
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                 "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  let body = `<h2>Registros — ${meses[mes]} ${anio}</h2>`;

  const reemplazos = movs.filter(x=>x.tipo==="reemp");
  const cambios    = movs.filter(x=>x.tipo==="cambio");
  const francoTrab = movs.filter(x=>x.tipo==="franco");
  const faltas     = movs.filter(x=>x.tipo==="falta");
  const fuera      = movs.filter(x=>x.tipo==="fuera");

  if(reemplazos.length){
    body+=`<h3>🟩 Reemplazos</h3>`;
    reemplazos.forEach(x=>{
      body+=`<div>• ${NOMBRES[x.operario]} reemplazó a ${NOMBRES[x.destino]} el ${fecha(x.dia)} — Turno ${x.turno}${x.comentario?` — ${x.comentario}`:""}</div>`;
    });
    body+='<hr>';
  }

  if(cambios.length){
    body+=`<h3>🟦 Cambios de día</h3>`;
    cambios.forEach(x=>{
      body+=`<div>• ${NOMBRES[x.operario]} cambió el día ${fecha(x.dia)} — Turno ${x.turno}${x.comentario?` — ${x.comentario}`:""}</div>`;
    });
    body+='<hr>';
  }

  if(francoTrab.length){
    body+=`<h3>🟪 Francos trabajados</h3>`;
    francoTrab.forEach(x=>{
      body+=`<div>• ${NOMBRES[x.operario]} trabajó su franco el ${fecha(x.dia)} — Turno ${x.turno}${x.comentario?` — ${x.comentario}`:""}</div>`;
    });
    body+='<hr>';
  }

  if(faltas.length){
    body+=`<h3>🟪 Faltas con aviso</h3>`;
    faltas.forEach(x=>{
      body+=`<div>• ${NOMBRES[x.operario]} — Falta con aviso el ${fecha(x.dia)}${x.comentario?` — ${x.comentario}`:""}</div>`;
    });
    body+='<hr>';
  }

  if(fuera.length){
    body+=`<h3>🕓 Entradas/Salidas fuera de horario</h3>`;
    fuera.forEach(x=>{
      body+=`<div>• ${NOMBRES[x.operario]} — ${x.modo==="entrada"?"Entrada":"Salida"} el ${fecha(x.dia)} — ${x.modo==="entrada"?"Ingresó":"Salió"} a las ${x.hora} (Debía ${x.horaProg})${x.comentario?` — ${x.comentario}`:""}</div>`;
    });
  }

  const w = window.open("","_blank");
  w.document.write(`<!doctype html><html>
  <head>
    <meta charset="utf-8">
    <title>Registros ${meses[mes]} ${anio}</title>
    <style>
      body{font-family:Poppins,Calibri,Verdana,sans-serif;padding:16px}
      h2{margin:0 0 10px}
      @page{size:A4 portrait;margin:15mm}
    </style>
  </head>
  <body>${body}</body></html>`);
  w.document.close();
});


/* ===== IMPRIMIR PERMISO DESDE EL DETALLE ===== */

function imprimirPermisoUnit(reg){
  const mov = reg;
  const nombre = NOMBRES[mov.operario] || mov.operario;
  const modo = mov.modo==="entrada" ? "entrada" : "salida";
  const horaReal = mov.hora || "00:00";
  const horaProg = mov.horaProg || "00:00";
  const hoy = new Date();
  const fechaStr = `${String(hoy.getDate()).padStart(2,'0')}/${
                    String(hoy.getMonth()+1).padStart(2,'0')}/${
                    hoy.getFullYear()}`;
  const logo = localStorage.getItem(LOGO_KEY)||"";
  const titulo = modo==="entrada"
                   ? "Registro de entrada fuera de horario"
                   : "Registro de salida fuera de horario";

  const w = window.open("","_blank");
  if(!w){aviso("⚠️ El navegador bloqueó la ventana emergente.");return;}

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${titulo}</title>
  <style>
     @page{size:A4 portrait;margin:18mm}
     body{font-family:Poppins,Calibri,Verdana,sans-serif;line-height:1.35;color:#111}
     .enc{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px}
     .logo{width:130px;height:auto}
     .lugar{font-size:14px}
     .bold{font-weight:700}
     h1{font-size:20px;text-align:center;margin:8px 0 12px}
     .box{border:1px solid #000;padding:14px 16px;border-radius:6px;margin-bottom:16px}
     .firmas{display:flex;justify-content:space-between;align-items:flex-end;margin-top:55px}
     .col{display:flex;flex-direction:column;align-items:center}
     .col.izq{margin-left:calc(33% - 2cm)}
     .col.der{margin-right:calc(33% - 2cm)}
     .linea{width:4cm;border-top:1px dotted #000;height:1px;margin-top:0;}
     .label{font-size:13px;color:#444;margin-top:6px}
  </style></head><body>

     <div class="enc">
       <div>${logo?`<img class="logo" src="${logo}">`:""}</div>
       <div class="lugar"><span class="bold">Totoras, ${fechaStr}</span></div>
     </div>

     <h1>${titulo.toUpperCase()}</h1>

     <div class="box">
       Por la presente se informa que en el día de la fecha el operario
       <strong>Sr. ${nombre}</strong> ${modo==="entrada"?"ingresó":"se retiró"} a las
       <strong>${horaReal} hs</strong>, debiendo hacerlo a las
       <strong>${horaProg} hs</strong>.
       ${mov.comentario?`<div style="margin-top:8px;font-size:13px"><strong>Observación:</strong> ${mov.comentario}</div>`:""}
     </div>

     <div class="firmas">
       <div class="col izq">
         <div class="linea"></div>
         <div class="label">Firma del solicitante</div>
         <div class="aclar">${nombre}</div>
       </div>

       <div class="col der">
         <div class="linea"></div>
         <div class="label">Firma del encargado</div>
         <div class="aclar">Andrés Magliano</div>
       </div>
     </div>

  </body></html>`;

  w.document.write(html);
  w.document.close();
}


/* ===== IMPRIMIR PERMISO DESDE BOTÓN PRINCIPAL ===== */

document.getElementById("printPermBtn").addEventListener("click",()=>{
  const movs = cargarMovs(anio,mes).filter(x=>x.tipo==="fuera");
  if(!movs.length){aviso("⚠️ No hay acciones de Entrada/Salida fuera de horario.");return;}

  const last = movs[movs.length-1];
  imprimirPermisoUnit(last);
});

