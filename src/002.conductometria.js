const Conductometria = class {
  constructor(opciones = {}) {
    this._uuid = 0;
    this.fenomenos = [];
    this.conceptos = {};
    this.estados = {};
    this.tipos = {};
    this.opciones = Object.assign({}, opciones);
  }
  static crear(...args) {
    return new Conductometria(...args);
  }
  die(...args) {
    console.log(...args);
    process.exit();
  }
  uuid(prependice = "") {
    if(!(prependice in this.tipos)) {
      this.tipos[prependice] = [];
    }
    const _uuid = ++this._uuid;
    this.tipos[prependice].push(_uuid);
    return _uuid + "@" + prependice;
  }
  tracear(method, args) {
    if (this.opciones.tracear) {
      console.log(`[TRACE][Conductometria][${method}] ${args.length} arguments: ${Array.from(args).map(arg => typeof arg)}`);
    }
  }
  jsonify(beautify = true) {
    if (beautify) {
      return JSON.stringify({
        fenomenos: this.fenomenos,
        conceptos: this.conceptos,
        estados: this.estados,
        tipos: this.tipos,
      }, null, 2);
    } else {
      return JSON.stringify({
        fenomenos: this.fenomenos,
        conceptos: this.conceptos,
        estados: this.estados,
        tipos: this.tipos,
      });
    }
  }
  persistIn(file) {
    require("fs").writeFileSync(file, this.jsonify(), "utf8");
  }
  formatear = {
    tiempo: {
      a: {
        duracionFormateada: (ms = 0) => {
          this.tracear("formatear.tiempo.a.duracionFormateada", [ms]);
          const duracion = this.formatear.tiempo.a.duracion(ms);
          return this.formatear.duracion.a.duracionFormateada(duracion);
        },
        duracion: (ms = 0) => {
          this.tracear("formatear.tiempo.a.duracion", [ms]);
          const msInSecond = 1000;
          const msInMinute = msInSecond * 60;
          const msInHour = msInMinute * 60;
          const msInDay = msInHour * 24;
          const msInMonth = msInDay * 30.44; // Promedio de días por mes
          const msInYear = msInDay * 365.25; // Año con días bisiestos
          const anios = Math.floor(ms / msInYear);
          ms %= msInYear;
          const meses = Math.floor(ms / msInMonth);
          ms %= msInMonth;
          const dias = Math.floor(ms / msInDay);
          ms %= msInDay;
          const horas = Math.floor(ms / msInHour);
          ms %= msInHour;
          const minutos = Math.floor(ms / msInMinute);
          ms %= msInMinute;
          const segundos = Math.floor(ms / msInSecond);
          ms %= msInSecond;
          return {
            anios,
            meses,
            dias,
            horas,
            minutos,
            segundos,
            milisegundos: ms
          };
        }
      }
    },
    duracion: {
      a: {
        duracionFormateada: (duracion) => {
          this.tracear("formatear.duracion.a.duracionFormateada", [duracion]);
          let formateo = "";
          if (duracion.anios) formateo += " " + duracion.anios + "y";
          if (duracion.meses) formateo += " " + duracion.meses + "m";
          if (duracion.dias) formateo += " " + duracion.dias + "d";
          if (duracion.horas) formateo += " " + duracion.horas + "h";
          if (duracion.minutos) formateo += " " + duracion.minutos + "min";
          if (duracion.segundos) formateo += " " + duracion.segundos + "s";
          if (duracion.milisegundos) formateo += " " + duracion.milisegundos + "ms";
          return formateo.trimLeft();
        },
        tiempo: (duracion = null) => {
          this.tracear("formatear.duracion.a.tiempo", [duracion]);
          let salida = duracion;
          if (typeof duracion === "number") {
            salida = duracion;
          } else if (typeof duracion === "string") {
            const duracionInfoList = Timeformat_parser.parse(duracion);
            const duracionInfo = duracionInfoList[0];
            let duracionMilisegundos = 0;
            if (duracionInfo.milisegundos) duracionMilisegundos += duracionInfo.milisegundos;
            if (duracionInfo.segundos) duracionMilisegundos += duracionInfo.segundos * 1000;
            if (duracionInfo.minutos) duracionMilisegundos += duracionInfo.minutos * 1000 * 60;
            if (duracionInfo.horas) duracionMilisegundos += duracionInfo.horas * 1000 * 60 * 60;
            if (duracionInfo.dias) duracionMilisegundos += duracionInfo.dias * 1000 * 60 * 60 * 24;
            if (duracionInfo.meses) duracionMilisegundos += duracionInfo.meses * 1000 * 60 * 60 * 24 * 30;
            if (duracionInfo.anios) duracionMilisegundos += duracionInfo.anios * 1000 * 60 * 60 * 24 * 12;
            // this.die(duracionInfo, duracionMilisegundos);
            salida = duracionMilisegundos;
          } else if (typeof duracion !== "object") {
            salida = 0;
          } else if (duracion === null) {
            salida = 0;
          } else if (!("tipo" in duracion)) {
            throw new Error("No reconocido tipo de duración (1) en «formatear.duracion.a.tiempo»");
          } else if (duracion.tipo !== "Duracion") {
            throw new Error("No reconocido tipo de duración (2) en «formatear.duracion.a.tiempo»");
          }
          return salida;
        }
      }
    }
  }
  propagar = {
    estado: (datos) => {
      this.tracear("propagar.estado", [datos]);
      const nombreConcepto = datos.concepto;
      if (typeof nombreConcepto !== "string") {
        throw new Error("Se requiere «datos» de tener un «concepto» de tipo texto en «propagar.estado»");
      }
      Corregir_uuid: {
        Object.assign(datos, { uuid: this.uuid("estado") });
      }
      if (!(nombreConcepto in this.estados)) {
        this.estados[nombreConcepto] = {
          propagaciones: 0,
          causales: [],
          puntos: 0,
          duracion: 0
        };
      }
      Datos_propagados: {
        const concepto = this.conceptos[nombreConcepto];
        const estado = this.estados[nombreConcepto];
        Datos_modificados: {
          estado.propagaciones++;
          estado.puntos += datos.puntos || 0;
          estado.duracion += this.formatear.duracion.a.tiempo(datos.duracion || null);
          estado.causales.push(datos);
        }
        Datos_recalculados: {
          estado.duracion_legible = this.formatear.tiempo.a.duracionFormateada(estado.duracion);
          estado.puntos_por_propagacion = Math.floor(estado.puntos / estado.propagaciones);
        }
      }
    },
    fenomeno: (datos) => {
      this.tracear("propagar.fenomeno", [datos]);
      Expandir_propiedades_fijas: {
        Corregir_fecha: {
          if (datos.fecha) {
            if(typeof datos.fecha === "string") {
              datos.fecha_legible = datos.fecha;
              datos.fecha = Timeformat_parser.parse(datos.fecha_legible);
            }
          }
        }
        Corregir_hora: {
          if (datos.hora) {
            if(typeof datos.hora === "string") {
              datos.hora_legible = datos.hora;
              datos.hora = Timeformat_parser.parse(datos.hora_legible);
            }
          }
        }
        Corregir_duracion: {
          if (datos.duracion) {
            if (typeof datos.duracion === "number") {
              datos.duracion_legible = this.formatear.tiempo.a.duracionFormateada(datos.duracion);
            } else if(typeof datos.duracion === "string") {
              datos.duracion_legible = datos.duracion;
              datos.duracion = this.formatear.duracion.a.tiempo(datos.duracion);
            }
          }
        }
        Corregir_duracion: {
          if (datos.duracion) {
            if (typeof datos.duracion === "number") {
              datos.duracion_legible = this.formatear.tiempo.a.duracionFormateada(datos.duracion);
            } else if(typeof datos.duracion === "string") {
              datos.duracion_legible = datos.duracion;
              datos.duracion = this.formatear.duracion.a.tiempo(datos.duracion);
            }
          }
        }
        Corregir_uuid: {
          datos.uuid = this.uuid("fenómeno");
        }
      }
      Propagar_estado: {
        this.propagar.estado(datos);
      }
      Propagar_productos: {
        const concepto = this.obtener.concepto(datos.concepto, {});
        if (concepto.produce) {
          console.log("PRODUCE: " + concepto.produce);
          Object.entries(concepto.produce).forEach(([key, func]) => {
            // El callback devuelve el nuevo fenómeno:
            const producto_o_lista = func.call(this, datos, concepto);
            const lista = Array.isArray(producto_o_lista) ? producto_o_lista : [producto_o_lista];
            for(let index=0; index<lista.length; index++) {
              const producto = lista[index];
              // Le ponemos el concepto otra vez para asegurarnos:
              producto.concepto = key;
              // Registramos el nuevo fenómeno:
              this.registrar.fenomeno(producto);
            }
          });
        }
      }
    }
  }
  registrar = {
    fenomeno: (datos) => {
      this.tracear("registrar.fenomeno", []);
      Registrar: {
        this.fenomenos.push(datos);
      }
      Propagar: {
        this.propagar.fenomeno(datos);
      }
    },
    concepto: (datos) => {
      this.tracear("registrar.concepto", []);
      Validacion: {
        if (typeof datos !== "object") {
          throw new Error("Se requiere «datos» ser un objeto en «registrar.concepto»")
        }
        if (!("concepto" in datos)) {
          throw new Error("Se requiere «concepto» existir como propiedad en «datos» en «registrar.concepto»")
        }
        if (typeof datos.concepto !== "string") {
          throw new Error("Se requiere «datos.concepto» ser un string en «registrar.concepto»")
        }
      }
      Inicializacion: {
        if (!(datos.concepto in this.conceptos)) {
          this.conceptos[datos.concepto] = {
            ...datos,
            uuid: this.uuid("concepto")
          };
        }
      }
      Agregar_propiedades: {
        Object.assign(this.conceptos[datos.concepto], datos);
      }
    }
  };
  obtener = {
    fenomenos: () => {
      this.tracear("obtener.fenomenos", []);
      return this.fenomenos;
    },
    concepto: (nombre, porDefecto = undefined) => {
      if (!(nombre in this.conceptos)) {
        return porDefecto;
      }
      return this.conceptos[nombre];
    },
    conceptos: () => {
      this.tracear("obtener.conceptos", []);
      return this.conceptos;
    },
    estados: () => {
      this.tracear("obtener.estados", []);
      return this.estados;
    }
  };
}

Conductometria.default = Conductometria;

return Conductometria;