require(__dirname + "/dist/conductometria.bundle.js");
// Ejemplo de uso
const cm = Conductometria.crear({ tracear: 1 });

cm.registrar.concepto({
  concepto: "observación",
  definicion: "El hecho de pararse a observar",
  categorias: ["tal", "cual", "pascual"],
  produce: {
    disciplina: function({puntos = 0, duracion = 0}, concepto) {
      return {
        duracion: duracion * 0.2,
        puntos: puntos * 0.2
      };
    },
    calma: function({puntos = 0, duracion = 0}, concepto) {
      return [{
        duracion: this.formatear.duracion.a.tiempo(duracion || 0) * 0.2,
        puntos: puntos * 0.3
      }];
    },
  }
});

cm.registrar.fenomeno({
  concepto: "observación",
  fecha: "2025/01/01",
  hora: "08:00",
  duracion: "1h",
  puntos: 100,
  matices: { clima: "soleado", intensidad: "moderada" },
});

cm.registrar.fenomeno({
  concepto: "observación",
  fecha: "2025/01/01",
  hora: "08:00",
  duracion: "1h",
  puntos: 200,
  matices: { clima: "soleado", intensidad: "moderada" },
});

cm.registrar.fenomeno({
  concepto: "observación",
  fecha: "2025/01/01",
  hora: "08:00",
  duracion: "1h",
  puntos: 300,
  matices: { clima: "soleado", intensidad: "moderada" },
});

console.log(cm.obtener.fenomenos());
console.log(cm.obtener.conceptos());
console.log(cm.obtener.estados());
console.log(cm.jsonify());
cm.persistIn("test.json");