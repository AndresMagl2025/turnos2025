/* ============================================================
   CAMBIOS DE DÍA — Turnos v1.6 B1
   Extraído directamente del archivo Turnos1_6_B1.html
   Unificado en 3 secciones:
   1) Aplicación visual
   2) Registro desde panel
   3) Construcción de detalles
   ============================================================ */


/* ============================================================
   1) APLICACIÓN VISUAL DEL CAMBIO EN LA GRILLA
   ============================================================ */

function aplicarMovimientoCambio(M, m, a, map) {

  const d = M.dia;
  const c = map[`${M.operario}-${d}`];
  if (!c) return;

  const f = new Date(a, m, d);
  const extra = M.comentario ? ` — ${M.comentario}` : "";
  const t = M.turno;

  c.className = "";
  c.classList.add("mov-azul", "mov-outline", "tooltip");

  c.textContent = t;
  c.dataset.tip = `${NOMBRES[M.operario]} cambió el día ${String(d).padStart(2,"0")}/${String(m+1).padStart(2,"0")} — Turno ${t}${extra}`;
}


/* ============================================================
   2) REGISTRO EN PANEL DE CARGA
   ============================================================ */

document.getElementById("registrarBtn").addEventListener("click", () => {
  const act = accionSel.value;
  const diasMax = diasDelMes(mes, anio);
  let movs = cargarMovs(anio, mes);
  const com = comentario.value.trim();

  if (act === "cambio") {

    const d = parseInt(dia1.value, 10);
    const op = operarioSel.value;
    const t = turnoSel.value;

    if (!(d >= 1 && d <= diasMax)) return;
    if (!op || !t) return;

    movs.push({
      tipo: "cambio",
      dia: d,
      operario: op,
      turno: t,
      comentario: com
    });

    guardarMovs(anio, mes, movs);
    cerrarPanel();
    construirDetalles(mes, anio, feriadosMes[mes]);
    aplicarMovimientos(mes, anio);

    aviso("✔️ Cambio registrado correctamente.");
  }
});


/* ============================================================
   3) DETALLES — LISTADO DE CAMBIOS DE DÍA
   ============================================================ */

function construirDetallesCambios(m, a, movs, HM) {

  const fecha = d => `${String(d).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}`;

  const cambios = movs
    .filter(x => x.tipo === "cambio")
    .sort((x, y) => x.dia - y.dia);

  if (cambios.length) {

    HM += `<h3>🟦 Cambios de día — ${meses[m]} ${a}</h3>`;

    cambios.forEach((x, i) => {
      HM += `<div class="detline">• ${NOMBRES[x.operario]} cambió el día ${fecha(x.dia)} — Turno ${x.turno}${x.comentario ? ` — ${x.comentario}` : ""}</div>`;
      HM += `<button class="btnImpDetalle btn-imp-cambio" data-index="${i}">🖨 Imprimir cambio</button>`;
      HM += `<div class="hr"></div>`;
    });
  }

  return HM;
}

