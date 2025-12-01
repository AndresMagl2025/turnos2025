/* ============================================================
   UTILIDADES — Turnos v1.6 B1
   Extraído directamente de Turnos1_6_B1.html (versión B1)
   ============================================================ */

/* ========= Cálculos de días ========= */
function daysBetween(a, b) {
  const d = 86400000;
  return Math.floor(
    (Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) -
     Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) / d
  );
}

function diasDelMes(m, a) {
  return new Date(a, m + 1, 0).getDate();
}

/* ========= Cálculo de turnos según tabla cíclica ========= */
function turnoCaldera(op, fecha) {
  const base = OFFSETS[op];
  const delta = daysBetween(fecha, REF);
  let i = (base + delta) % cycle.length;
  if (i < 0) i += cycle.length;
  return cycle[i];
}

/* ========= Semanas ISO ========= */
function startOfISOWeek(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

const HOY = new Date();
const BASE_WEEK = startOfISOWeek(HOY);

function weekIndex(d) {
  return Math.floor(
    daysBetween(startOfISOWeek(d), BASE_WEEK) / 7
  );
}

/* ========= Turnos para Mantenimiento ========= */
function turnoMantenimiento(op, fecha) {
  const dow = fecha.getDay();
  const w = ((weekIndex(fecha) % 2) + 2) % 2;

  if (op === "FORMICONI") return turnoCaldera("GODOY", fecha);
  if (op === "CABALLERO" || op === "MAGLIANO") return (dow >= 1 && dow <= 5) ? "M" : "F";

  if (op === "LIEVY") {
    if (dow === 0) return "F";
    if (dow >= 1 && dow <= 5) return "M";
    if (dow === 6) return (w === 0) ? "M" : "F";
  }

  if (op === "PESCE") {
    if (w === 0) {
      if (dow === 0) return "F";
      if (dow >= 1 && dow <= 6) return "M";
      return "F";
    } else {
      if (dow >= 1 && dow <= 5) return "T";
      return "F";
    }
  }

  if (op === "PERALTA") {
    if (w === 0) {
      if (dow >= 1 && dow <= 5) return "T";
      return "F";
    } else {
      if (dow === 0) return "F";
      if (dow >= 1 && dow <= 6) return "M";
      return "F";
    }
  }

  return "F";
}

/* ========= Ruta general ========= */
function turnoParaOperario(op, fecha) {
  return CALDERAS.includes(op)
    ? turnoCaldera(op, fecha)
    : turnoMantenimiento(op, fecha);
}

