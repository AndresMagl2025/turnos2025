/* ============================================================
   CONFIG — Turnos v1.6 B1
   Manejo de OPFS · Carpeta destino · Logo permiso · Guardado
   Extraído de Turnos1_6_B1.html (versión B1)
   ============================================================ */


/* ============================================================
   CLAVES DE ALMACENAMIENTO
   ============================================================ */

const MOVS_KEY = "movs_";
const LOGO_KEY = "logoPermiso";
let carpetaOPFS = null;


/* ============================================================
   GUARDAR Y CARGAR MOVIMIENTOS DEL MES
   ============================================================ */

function guardarMovs(anio, mes, movs) {
  localStorage.setItem(MOVS_KEY + anio + "_" + mes, JSON.stringify(movs));
}

function cargarMovs(anio, mes) {
  return JSON.parse(localStorage.getItem(MOVS_KEY + anio + "_" + mes) || "[]");
}


/* ============================================================
   LOGO PARA PERMISO — Guardar / cargar / borrar
   ============================================================ */

function guardarLogo(base64) {
  localStorage.setItem(LOGO_KEY, base64);
}

function obtenerLogo() {
  return localStorage.getItem(LOGO_KEY) || "";
}

function borrarLogo() {
  localStorage.removeItem(LOGO_KEY);
}


/* ============================================================
   SELECCIONAR CARPETA DESTINO (OPFS)
   ============================================================ */

async function elegirCarpeta() {
  try {
    carpetaOPFS = await window.showDirectoryPicker();
    localStorage.setItem("carpetaOPFS", "1");
    aviso("✔️ Carpeta seleccionada correctamente.");
  } catch (e) {
    aviso("⚠️ No se pudo seleccionar carpeta.");
  }
}

async function escribirArchivo(nombre, contenido) {
  if (!carpetaOPFS) {
    aviso("⚠️ No hay carpeta seleccionada.");
    return;
  }

  try {
    const h = await carpetaOPFS.getFileHandle(nombre, { create: true });
    const w = await h.createWritable();
    await w.write(contenido);
    await w.close();
    aviso("✔️ Archivo guardado en carpeta destino.");
  } catch (e) {
    aviso("⚠️ Error al escribir archivo.");
  }
}


/* ============================================================
   BACKUP COMPLETO DEL MES
   ============================================================ */

async function backupMes(anio, mes) {
  const movs = cargarMovs(anio, mes);
  const logo = obtenerLogo();

  const pack = {
    anio,
    mes,
    movimientos: movs,
    logoPermiso: logo,
    timestamp: new Date().toISOString()
  };

  const archivo = JSON.stringify(pack, null, 2);
  const nombre = `backup_${anio}_${mes}.json`;

  await escribirArchivo(nombre, archivo);
}


/* ============================================================
   IMPORTAR BACKUP
   ============================================================ */

function importarBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);

      if (!data.anio || !data.mes || !data.movimientos) {
        aviso("⚠️ Backup inválido.");
        return;
      }

      guardarMovs(data.anio, data.mes, data.movimientos);

      if (data.logoPermiso) {
        guardarLogo(data.logoPermiso);
      }

      aviso("✔️ Backup importado correctamente.");

      if (data.anio === anio && data.mes === mes) {
        construirDetalles(mes, anio, feriadosMes[mes]);
        aplicarMovimientos(mes, anio);
        mostrarMes(mes, anio);
      }

    } catch (e) {
      aviso("⚠️ Error al leer backup.");
    }
  };
  reader.readAsText(file);
}


/* ============================================================
   LIMPIAR TODO
   ============================================================ */

function limpiarTodo() {
  if (!confirm("¿Eliminar todos los datos almacenados?")) return;
  localStorage.clear();
  aviso("✔️ Todo borrado.");
  location.reload();
}

