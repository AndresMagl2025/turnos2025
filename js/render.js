/* ============================================================
   RENDER — Turnos v1.6 B1
   Extraído del archivo Turnos1_6_B1.html
   Controla:
   - Dibujar el mes completo
   - Construcción de la tabla
   - Feriados
   - Turnos base
   - Aplicación de movimientos
   - Navegación entre meses
   ============================================================ */


/* ============================================================
   MOSTRAR MES
   ============================================================ */

function mostrarMes(m, a) {

  const dias = diasDelMes(m, a);
  const tabla = document.getElementById("tabla");
  const ops = OPERARIOS;
  let html = "";

  /* -----------------------------------------------------------
     ENCABEZADO DE DÍAS
  ----------------------------------------------------------- */

  html += "<thead><tr><th>Operario</th>";

  for (let d = 1; d <= dias; d++) {
    const f = new Date(a, m, d);
    const dow = f.getDay();
    const fer = feriadosMes[m].find(x => x.dia === d);

    let cls = "";
    if (dow === 0) cls = "dom";
    if (fer) cls = "fer";

    html += `<th class="${cls}">${d}</th>`;
  }

  html += "</tr></thead><tbody>";


  /* -----------------------------------------------------------
     CUERPO: OPERARIOS × DÍAS
  ----------------------------------------------------------- */

  ops.forEach(op => {
    html += `<tr><td class="op">${NOMBRES[op]}</td>`;

    for (let d = 1; d <= dias; d++) {
      const f = new Date(a, m, d);
      const fer = feriadosMes[m].find(x => x.dia === d);
      const cls = fer ? "fer" : "";

      let turno = turnoParaOperario(op, f);

      html += `<td data-op="${op}" data-dia="${d}" class="${cls}">${turno}</td>`;
    }

    html += "</tr>";
  });

  html += "</tbody>";
  tabla.innerHTML = html;


  /* -----------------------------------------------------------
     APLICAR MOVIMIENTOS
  ----------------------------------------------------------- */

  aplicarMovimientos(m, a);


  /* -----------------------------------------------------------
     ACTUALIZAR TÍTULO DEL MES
  ----------------------------------------------------------- */

  document.getElementById("tituloMes").textContent =
    `${meses[m]} ${a}`;
}


/* ============================================================
   NAVEGACIÓN IZQUIERDA / DERECHA
   ============================================================ */

document.getElementById("prev").addEventListener("click", () => {
  mes--;
  if (mes < 0) {
    mes = 11;
    anio--;
  }
  mostrarMes(mes, anio);
  construirDetalles(mes, anio, feriadosMes[mes]);
});

document.getElementById("next").addEventListener("click", () => {
  mes++;
  if (mes > 11) {
    mes = 0;
    anio++;
  }
  mostrarMes(mes, anio);
  construirDetalles(mes, anio, feriadosMes[mes]);
});


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  mostrarMes(mes, anio);
  construirDetalles(mes, anio, feriadosMes[mes]);
});

