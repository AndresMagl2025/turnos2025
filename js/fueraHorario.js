/* ============================================================
   ENTRADAS / SALIDAS FUERA DE HORARIO — Turnos v1.6 B1
   Extraído directamente del archivo Turnos1_6_B1.html
   Unificado en 3 secciones:
   1) Aplicación visual
   2) Registro desde panel
   3) Construcción de detalles
   ============================================================ */


/* ============================================================
   1) APLICACIÓN VISUAL DEL MOVIMIENTO "FUERA DE HORARIO"
   ============================================================ */

function aplicarMovimientoFueraHorario(M, m, a, map) {

  const c = map[`${M.operario}-${M.dia}`];
  if (!c) return;

  const extra = M.comentario ? ` — ${M.comentario}` : "";

  c.classList.add("fueraHorario", "mov-outline", "tooltip");

  if (!c.querySelector(".fh-ico")) {
    const i = document.createElement("span");
    i.className = "fh-ico";
    i.textContent = "🕓";
    c.appendChild(i);
  }

  c.dataset.tip =
    `${NOMBRES[M.operario]} — ${M.modo === "entrada" ? "Entrada" : "Salida"} ${M.hora} ` +
    `(Debía ${M.horaProg})${extra}`;
}


/* ============================================================
   2) REGISTRO DESDE PANEL
   ============================================================ */

document.getElementById("registrarBtn").addEventListener("click", () => {

  const act = accionSel.value;
  const diasMax = diasDelMes(mes, anio);
  let movs = cargarMovs(anio, mes);
  const com = comentario.value.trim();

  if (act === "fuera") {

    const d = parseInt(dia1.value, 10);
    const op = operarioSel.value;
    const modo = modoSel.value;     // entrada / salida
    const hora = horaReal.value;    // hora real
    const prog = horaProg.value;    // hora programada

    if (!(d >= 1 && d <= diasMax)) return;
    if (!op || !modo || !hora || !prog) return;

    movs.push({
      tipo: "fuera",
      dia: d,
      operario: op,
      modo,
      hora,
      horaProg: prog,
      comentario: com
    });

    guardarMovs(anio, mes, movs);
    cerrarPanel();
    construirDetalles(mes, anio, feriadosMes[mes]);
    aplicarMovimientos(mes, anio);

    aviso("✔️ Registro fuera de horario cargado correctamente.");
  }
});


/* ============================================================
   3) DETALLES — LISTADO DE "FUERA DE HORARIO"
   ============================================================ */

function construirDetallesFueraHorario(m, a, movs, HM) {

  const fecha = d => `${String(d).padStart(2,"0")}/${String(m+1).padStart(2,"0")}`;

  const fuera = movs
    .filter(x => x.tipo === "fuera")
    .sort((x, y) => x.dia - y.dia);

  if (fuera.length) {

    HM += `<h3>🕓 Entradas / salidas fuera de horario — ${meses[m]} ${a}</h3>`;

    fuera.forEach((x, i) => {
      const texto =
        `• ${NOMBRES[x.operario]} — ` +
        `${x.modo === "entrada" ? "entró" : "se retiró"} ` +
        `a las ${x.hora || "00:00"} hs ` +
        `(debía hacerlo a las ${x.horaProg || "00:00"} hs)` +
        ` el ${fecha(x.dia)}` +
        `${x.comentario ? ` — ${x.comentario}` : ""}`;

      HM += `<div class="detline">${texto}</div>`;
      HM += `<button class="btnImpDetalle btn-imp-perm" data-index="${i}">🖨 Imprimir permiso</button>`;
      HM += '<div class="hr"></div>';
    });
  }

  return HM;
}

