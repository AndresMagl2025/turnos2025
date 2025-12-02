/* ============================================================
   PANEL DE CARGA — Turnos v1.6 B1
   Extraído del código original Turnos1_6_B1.html
   Control:
   - abrir/cerrar panel
   - selects dinámicos
   - navegación con flechas
   - confirmar con Enter
   ============================================================ */


/* ============================================================
   MOSTRAR Y OCULTAR PANEL
   ============================================================ */

function abrirPanel() {
  document.getElementById("panel").classList.add("on");
}

function cerrarPanel() {
  document.getElementById("panel").classList.remove("on");
  comentario.value = "";
  dia1.value = "";
}


/* Botón cerrar */
document.getElementById("cerrarPanel").addEventListener("click", cerrarPanel);


/* ============================================================
   CAMBIO DE ACCIÓN — actualiza los campos visibles
   ============================================================ */

accionSel.addEventListener("change", () => {
  const act = accionSel.value;

  // ocultar todo
  document.querySelectorAll(".row").forEach(r => r.style.display = "none");

  if (act === "reemplazo") {
    rowDia.style.display = "flex";
    rowReemplazo.style.display = "flex";
  }

  if (act === "cambio") {
    rowDia.style.display = "flex";
    rowOperario.style.display = "flex";
    rowTurno.style.display = "flex";
  }

  if (act === "franco") {
    rowDia.style.display = "flex";
    rowOperario.style.display = "flex";
  }

  if (act === "falta") {
    rowDia.style.display = "flex";
    rowOperario.style.display = "flex";
  }

  if (act === "fuera") {
    rowDia.style.display = "flex";
    rowOperario.style.display = "flex";
    rowModo.style.display = "flex";
    rowHoraReal.style.display = "flex";
    rowHoraProg.style.display = "flex";
  }
});


/* ============================================================
   NAVEGACIÓN CON FLECHAS
   ============================================================ */

const inputsPanel = [
  dia1,
  operarioSel,
  reemplazadoSel,
  reemplazanteSel,
  turnoSel,
  modoSel,
  horaReal,
  horaProg,
  comentario,
  registrarBtn
];

function moverFocoPanel(dir) {
  const actual = document.activeElement;
  let idx = inputsPanel.indexOf(actual);
  if (idx === -1) return;

  idx = idx + dir;
  if (idx < 0) idx = 0;
  if (idx >= inputsPanel.length) idx = inputsPanel.length - 1;

  inputsPanel[idx].focus();
}

document.addEventListener("keydown", e => {
  if (!document.getElementById("panel").classList.contains("on")) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    moverFocoPanel(+1);
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    moverFocoPanel(-1);
  }

  if (e.key === "Enter") {
    if (document.getElementById("panel").classList.contains("on")) {
      registrarBtn.click();
    }
  }

  if (e.key === "Escape") {
    cerrarPanel();
  }
});

