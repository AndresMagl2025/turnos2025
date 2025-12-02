/* ============================================================
   FERIADOS — Turnos v1.6 B1
   Extraído del archivo original Turnos1_6_B1.html
   Manejo:
   - Listado anual fijo
   - Acceso por mes
   - Integración con render.js y detalles.js
   ============================================================ */


/* ============================================================
   FERIADOS DEL AÑO (Versión B1 Original)
   ============================================================ */
/* 
   Estructura:
   feriadosMes[mes] = [
      { dia: X, desc: "Descripción" },
      ...
   ]
*/

const feriadosMes = [
  /* Enero */
  [
    { dia: 1, desc: "Año Nuevo" }
  ],

  /* Febrero */
  [
    { dia: 12, desc: "Carnaval" },
    { dia: 13, desc: "Carnaval" }
  ],

  /* Marzo */
  [
    { dia: 24, desc: "Día de la Memoria" }
  ],

  /* Abril */
  [
    { dia: 2,  desc: "Malvinas"      },
    { dia: 14, desc: "Viernes Santo" }
  ],

  /* Mayo */
  [
    { dia: 1,  desc: "Día del Trabajador" },
    { dia: 25, desc: "Revolución de Mayo" }
  ],

  /* Junio */
  [
    { dia: 17, desc: "Paso a la Inmortalidad de Güemes" },
    { dia: 20, desc: "Día de la Bandera" }
  ],

  /* Julio */
  [
    { dia: 9, desc: "Independencia" }
  ],

  /* Agosto */
  [
    { dia: 17, desc: "Paso a la Inmortalidad de San Martín" }
  ],

  /* Septiembre */
  [
    /* No hay feriados nacionales */
  ],

  /* Octubre */
  [
    { dia: 12, desc: "Diversidad Cultural" }
  ],

  /* Noviembre */
  [
    { dia: 20, desc: "Soberanía Nacional" }
  ],

  /* Diciembre */
  [
    { dia: 8,  desc: "Inmaculada Concepción" },
    { dia: 25, desc: "Navidad" }
  ]
];


/* ============================================================
   FUNCIÓN AUXILIAR (Opcional)
   ============================================================ */

function esFeriado(dia, mes) {
  return feriadosMes[mes].some(f => f.dia === dia);
}

