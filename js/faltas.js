/* ============================================================
   FALTAS CON AVISO — Turnos v1.6 B1
   Extraído directamente de Turnos1_6_B1.html
   Unificado en 3 secciones:
   1) Aplicación visual
   2) Registro desde panel
   3) Construcción de detalles
   ============================================================ */


/* ============================================================
   1) APLICACIÓN VISUAL DE "FALTA CON AVISO"
   ============================================================ */

function aplicarMovimientoFalta(M, m, a, map) {

  const c = map[`${M.operario}-${M.dia}`];
  if (!c) return;

  const extra = M.comentario ? ` — ${M.comentario}` : "";

  c.className = "";
  c.classList.add("mov-fa", "mov-outline", "tooltip");
  c.textContent = "FA";

  c.dataset.tip =
    `${NOMBRES[M.operario]} — Falta con aviso${extra}`;
}



/* ============================================================
   2) REGISTRO DESDE PANEL
   ============================================================ */

document.getElementById("registrarBtn").addEventListener("click", () => {

  const act = accionSel.value;
  const diasMax = diasDelMes(mes, anio);
  let movs = cargarMovs(anio, mes);
  const com = comentario.value.trim();

  if (act === "falta") {

    const d = parseInt(dia1.value, 10);
    const op = operarioSel.value;

    if (!(d >= 1 && d <= diasMax)) return;
    if (!op) return;

    movs.push({
      tipo: "falta",
      dia: d,
      operario: op,
      comentario: com
    });

    guardarMovs(anio, mes, movs);
    cerrarPanel();
    construirDetalles(mes, anio, feriadosMes[mes]);
    aplicarMovimientos(mes, anio);

    aviso("✔️ Falta con aviso registrada correctamente.");
  }
});



/* ============================================================
   3) DETALLES — LISTADO DE FALTAS
   ============================================================ */

function construirDetallesFaltas(m, a, movs, HM) {

  const fecha = d => `${String(d).padStart(2,"0")}/${String(m+1).padStart(2,"0")}`;

  const faltas = movs
    .filter(x => x.tipo === "falta")
    .sort((x, y) => x.dia - y.dia);

  if (faltas.length) {

    HM += `<h3>🟪 Faltas con aviso — ${meses[m]} ${a}</h3>`;

    faltas.forEach((x, i) => {

      HM += `<div class="detline">• ${NOMBRES[x.operario]} — Falta con aviso el ${fecha(x.dia)}${x.comentario ? ` — ${x.comentario}` : ""}</div>`;
      HM += `<button class="btnImpDetalle btn-imp-falta" data-index="${i}">🖨 Imprimir falta</button>`;
      HM += '<div class="hr"></div>';

    });
  }

  return HM;
}

