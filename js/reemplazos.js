/* ============================================================
   REEMPLAZOS — Turnos v1.6 B1
   Extraído, ordenado y unificado desde Turnos1_6_B1.html
   Incluye:
   1) Aplicación visual
   2) Registro en panel
   3) Bloque de “Detalles”
   ============================================================ */


/* ============================================================
   1) APLICACIÓN VISUAL DEL REEMPLAZO EN LA GRILLA
   ============================================================ */

function aplicarMovimientos(m, a) {
  const movs = cargarMovs(a, m);
  if (!movs.length) return;

  const cells = document.querySelectorAll("td[data-op]");
  const map = {};
  cells.forEach(c => { map[`${c.dataset.op}-${c.dataset.dia}`] = c; });

  movs.forEach(M => {

    /* ------- REEMPLAZO ------- */
    if (M.tipo === "reemplazo") {
      const d = M.dia;
      const cRZ = map[`${M.reemplazado}-${d}`];
      const cRC = map[`${M.reemplazante}-${d}`];
      const f = new Date(a, m, d);
      const turnoReemplazado = turnoParaOperario(M.reemplazado, f);
      const extra = M.comentario ? ` — ${M.comentario}` : "";

      if (cRC) {
        cRC.className = "";
        cRC.classList.add("mov-rojo", "mov-outline", "tooltip");
        cRC.textContent = turnoReemplazado;
        cRC.dataset.tip =
          `${NOMBRES[M.reemplazante]} reemplazó a ${NOMBRES[M.reemplazado]} ` +
          `(${String(d).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}) — Turno ${turnoReemplazado}${extra}`;
      }

      if (cRZ) {
        cRZ.className = "";
        cRZ.classList.add("F", "mov-outline", "tooltip");
        cRZ.textContent = "F";
        cRZ.dataset.tip =
          `${NOMBRES[M.reemplazado]} fue reemplazado por ${NOMBRES[M.reemplazante]} ` +
          `(${String(d).padStart(2, "0")}/${String(m + 1).padStart(2, "0")})${extra}`;
      }
    }

  });
}



/* ============================================================
   2) REGISTRO EN EL PANEL DE CARGA
   ============================================================ */

document.getElementById("registrarBtn").addEventListener("click", () => {
  const act = accionSel.value;
  const diasMax = diasDelMes(mes, anio);
  let movs = cargarMovs(anio, mes);
  const com = comentario.value.trim();

  if (act === "reemplazo") {
    const d = parseInt(dia1.value, 10);
    if (!(d >= 1 && d <= diasMax)) return;

    const rz = reemplazadoSel.value;
    const rc = reemplazanteSel.value;

    if (!rz || !rc) return;

    movs.push({
      tipo: "reemplazo",
      dia: d,
      reemplazado: rz,
      reemplazante: rc,
      comentario: com
    });

    guardarMovs(anio, mes, movs);
    cerrarPanel();
    construirDetalles(mes, anio, feriadosMes[mes]);
    aplicarMovimientos(mes, anio);

    aviso("✔️ Reemplazo registrado correctamente.");
  }
});



/* ============================================================
   3) DETALLES — LISTADO DE REEMPLAZOS
   ============================================================ */

function construirDetallesReemplazos(m, a, movs, HM) {
  const fecha = d => `${String(d).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}`;

  const rep = movs
    .filter(x => x.tipo === "reemplazo")
    .sort((x, y) => x.dia - y.dia);

  if (rep.length) {
    HM += `<h3>🧰 Reemplazos — ${meses[m]} ${a}</h3>`;

    rep.forEach((x, i) => {
      const f = new Date(a, m, x.dia);
      const t = turnoParaOperario(x.reemplazado, f);

      HM += `<div class="detline">• ${NOMBRES[x.reemplazante]} reemplaza a ${NOMBRES[x.reemplazado]} el ${fecha(x.dia)} — Turno ${t}${x.comentario ? ` — ${x.comentario}` : ""}</div>`;
      HM += `<div class="detline">• ${NOMBRES[x.reemplazado]} tomó franco el ${fecha(x.dia)}</div>`;
      HM += `<button class="btnImpDetalle btn-imp-reemplazo" data-index="${i}">🖨 Imprimir reemplazo</button>`;
      HM += `<div class="hr"></div>`;
    });
  }

  return HM;
}


