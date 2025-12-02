/* ============================================================
   DETALLES — PANEL DERECHO
   Turnos v1.6 B1 — Extraído del archivo original
   Coordina todas las secciones:
   - Reemplazos
   - Cambios de día
   - Francos trabajados
   - Faltas con aviso
   - Fuera de horario
   ============================================================ */


/* ============================================================
   FUNCIÓN PRINCIPAL — arma el panel derecho completo
   ============================================================ */

function construirDetalles(m, a, fer) {

  let HM = "";
  const movs = cargarMovs(a, m).sort((x, y) => x.dia - y.dia);

  /* -------------------------------
     REEMPLAZOS
  --------------------------------*/
  HM = construirDetallesReemplazos(m, a, movs, HM);

  /* -------------------------------
     CAMBIOS DE DÍA
  --------------------------------*/
  HM = construirDetallesCambios(m, a, movs, HM);

  /* -------------------------------
     FRANCOS TRABAJADOS
  --------------------------------*/
  HM = construirDetallesFrancos(m, a, movs, HM);

  /* -------------------------------
     FALTAS CON AVISO
  --------------------------------*/
  HM = construirDetallesFaltas(m, a, movs, HM);

  /* -------------------------------
     ENTRADAS / SALIDAS FUERA DE HORARIO
  --------------------------------*/
  HM = construirDetallesFueraHorario(m, a, movs, HM);

  /* -------------------------------
     FERiados del mes
  --------------------------------*/
  if (fer && fer.length) {
    HM += `<h3>📅 Feriados del mes</h3>`;
    fer.forEach(f => {
      HM += `<div class="detline">• ${String(f.dia).padStart(2,"0")}/${String(m+1).padStart(2,"0")} — ${f.desc}</div>`;
    });
    HM += `<div class="hr"></div>`;
  }

  document.getElementById("historial").innerHTML = HM;


  /* ======================================================
     ASIGNAR EVENTOS A LOS BOTONES DE IMPRESIÓN
     ====================================================== */

  // Reemplazos
  document.querySelectorAll(".btn-imp-reemplazo").forEach((b, i) => {
    b.addEventListener("click", () => {
      const movs = cargarMovs(a, m).filter(x => x.tipo === "reemplazo");
      imprimirReemplazoUnit(movs[i], m, a);
    });
  });

  // Cambios
  document.querySelectorAll(".btn-imp-cambio").forEach((b, i) => {
    b.addEventListener("click", () => {
      const movs = cargarMovs(a, m).filter(x => x.tipo === "cambio");
      imprimirCambioUnit(movs[i], m, a);
    });
  });

  // Francos
  document.querySelectorAll(".btn-imp-franco").forEach((b, i) => {
    b.addEventListener("click", () => {
      const movs = cargarMovs(a, m).filter(x => x.tipo === "franco");
      imprimirFrancoUnit(movs[i], m, a);
    });
  });

  // Faltas
  document.querySelectorAll(".btn-imp-falta").forEach((b, i) => {
    b.addEventListener("click", () => {
      const movs = cargarMovs(a, m).filter(x => x.tipo === "falta");
      imprimirFaltaUnit(movs[i], m, a);
    });
  });

  // Fuera de horario — permisos
  document.querySelectorAll(".btn-imp-perm").forEach((b, i) => {
    b.addEventListener("click", () => {
      const movs = cargarMovs(a, m).filter(x => x.tipo === "fuera");
      imprimirPermisoUnit(movs[i]);
    });
  });

}

