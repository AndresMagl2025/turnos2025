/* ============================================================
   FRANCOS TRABAJADOS — Turnos v1.6 B1
   Extraído directamente del archivo Turnos1_6_B1.html
   Unificado en 3 secciones:
   1) Aplicación visual
   2) Registro desde panel
   3) Detalles
   ============================================================ */


/* ============================================================
   1) APLICACIÓN VISUAL DEL FRANCO TRABAJADO
   ============================================================ */

function aplicarMovimientoFranco(M, m, a, map) {

  const d = M.dia;
  const c = map[`${M.operario}-${d}`];
  if (!c) return;

  const f = new Date(a, m, d);
  const t = turnoParaOperario(M.operario, f);
  const extra = M.comentario ? ` — ${M.comentario}` : "";

  c.className = "";
  c.classList.add("mov-violeta", "mov-outline", "tooltip");
  c.textContent = t;

  c.dataset.tip =
    `${NOMBRES[M.operario]} trabajó su franco el ${String(d).padStart(2,"0")}/${String(m+1).padStart(2,"0")} — Turno ${t}${extra}`;
}


/* ============================================================
   2) REGISTRO DEL FRANCO EN EL PANEL
   ============================================================ */

document.getElementById("registrarBtn").addEventListener("click", () => {
  const act = accionSel.value;
  const diasMax = diasDelMes(mes, anio);
  let movs = cargarMovs(anio, mes);
  const com = comentario.value.trim();

  if (act === "franco") {

    const d = parseInt(dia1.value, 10);
    const op = operarioSel.value;

    if (!(d >= 1 && d <= diasMax)) return;
    if (!op) return;

    movs.push({
      tipo: "franco",
      dia: d,
      operario: op,
      comentario: com
    });

    guardarMovs(anio, mes, movs);
    cerrarPanel();
    construirDetalles(mes, anio, feriadosMes[mes]);
    aplicarMovimientos(mes, anio);

    aviso("✔️ Franco trabajado registrado correctamente.");
  }
});



/* ============================================================
   3) DETALLES — LISTADO DE FRANCOS TRABAJADOS
   ============================================================ */

function construirDetallesFrancos(m, a, movs, HM) {

  const fecha = d => `${String(d).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}`;

  const fran = movs
    .filter(x => x.tipo === "franco")
    .sort((x, y) => x.dia - y.dia);

  if (fran.length) {

    HM += `<h3>🟪 Francos trabajados — ${meses[m]} ${a}</h3>`;

    fran.forEach((x, i) => {

      const f = new Date(a, m, x.dia);
      const t = turnoParaOperario(x.operario, f);

      HM += `<div class="detline">• ${NOMBRES[x.operario]} trabajó su franco el ${fecha(x.dia)} — Turno ${t}${x.comentario ? ` — ${x.comentario}` : ""}</div>`;
      HM += `<button class="btnImpDetalle btn-imp-franco" data-index="${i}">🖨 Imprimir franco</button>`;
      HM += `<div class="hr"></div>`;
    });
  }

  return HM;
}

