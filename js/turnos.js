
/* ========= Cálculo de turnos ========= */

function turnoCaldera(op, fecha) {
  const dow = fecha.getDay(); 
  const w   = ((weekIndex(fecha) % 2) + 2) % 2;

  if (op === "FORMICONI")
    return turnoCaldera("GODOY", fecha);

  if (op === "CABALLERO" || op === "MAGLIANO")
    return (dow >= 1 && dow <= 5) ? "M" : "F";

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

function turnoMantenimiento(op, fecha) {
  const dow = fecha.getDay();
  const w   = ((weekIndex(fecha) % 2) + 2) % 2;

  if (op === "FORMICONI")
    return turnoCaldera("GODOY", fecha);

  if (op === "CABALLERO" || op === "MAGLIANO")
    return (dow >= 1 && dow <= 5) ? "M" : "F";

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

function turnoParaOperario(op, fecha) {
  return CALDERAS.includes(op)
    ? turnoCaldera(op, fecha)
    : turnoMantenimiento(op, fecha);
}
