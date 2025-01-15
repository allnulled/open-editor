const ConductometriaViewerAdapter = class {

  constructor(conductometria) {
    this.conceptos = [];
    this.fenomenos = [];
    this.estados = [];
    this.$original = conductometria;
    this.cargar();
  }

  cargar() {
    Cargar_conceptos: {
      this.conceptos = [];
      const conceptos = this.$original.conceptos;
      const conceptos_ids = Object.keys(conceptos);
      for(let index_concepto=0; index_concepto<conceptos_ids.length; index_concepto++) {
        const concepto_id = conceptos_ids[index_concepto];
        const concepto_dato = conceptos[concepto_id];
        this.conceptos.push(concepto_dato);
      }
    }
    Cargar_fenomenos: {
      this.fenomenos = [];
      const fenomenos = this.$original.fenomenos;
      const fechas_ids = fenomenos.map(f => f.fecha_legible).filter((fecha, index, self) => self.indexOf(fecha) === index).sort();
      const fechas_datos = {};
      Inicializamos_datos:
      for(let index=0; index<fechas_ids.length; index++) {
        const fecha_id = fechas_ids[index];
        fechas_datos[fecha_id] = [];
      }
      Insertamos_por_dias_los_fenomenos:
      for(let index_fenomeno=0; index_fenomeno<fenomenos.length; index_fenomeno++) {
        const fenomeno = fenomenos[index_fenomeno];
        const fecha_id = fenomeno.fecha_legible;
        fechas_datos[fecha_id].push(fenomeno);
      }
      Exportamos_fenomenos: {
        for(let index=0; index<fechas_ids.length; index++) {
          const fecha_id = fechas_ids[index];
          this.fenomenos.push({
            dia: fecha_id,
            fenomenos: fechas_datos[fecha_id]
          });
        }
      }
      this.fenomenos = this.fenomenos.reverse();
    }
    Cargar_estados: {
      this.estados = [];
      const estados = this.$original.estados;
      const estados_ids = Object.keys(estados);
      for(let index_estado=0; index_estado<estados_ids.length; index_estado++) {
        const estado_id = estados_ids[index_estado];
        const estado_dato = estados[estado_id];
        this.estados.push({ concepto: estado_id, ...estado_dato });
      }
    }
  }

};


Vue.component("conductometria-viewer", {
  name: "conductometria-viewer",
  template: $template,
  props: {
    conductometria: {
      type: Object,
      required: true
    }
  },
  data() {
    this.$logger.trace("conductometria-viewer][data", arguments);
    const conductometriaAdapter = new ConductometriaViewerAdapter(this.conductometria);
    return {
      seccion_seleccionada: undefined,
      mostrando_estados: [],
      mostrando_dias_de_fenomenos: [],
      mostrando_conceptos: [],
      conductometria_adapter: conductometriaAdapter
    }
  },
  methods: {
    alternar_estado(estado_index) {
      this.$logger.trace("conductometria-viewer][alternar_estado", arguments);
      const position = this.mostrando_estados.indexOf(estado_index);
      if(position === -1) {
        this.mostrando_estados.push(estado_index);
      } else {
        this.mostrando_estados.splice(position, 1);
      }
    },
    alternar_dia_de_fenomenos(fenomeno_index) {
      this.$logger.trace("conductometria-viewer][alternar_dia_de_fenomenos", arguments);
      const position = this.mostrando_dias_de_fenomenos.indexOf(fenomeno_index);
      if(position === -1) {
        this.mostrando_dias_de_fenomenos.push(fenomeno_index);
      } else {
        this.mostrando_dias_de_fenomenos.splice(position, 1);
      }
    },
    alternar_concepto(concepto_index) {
      this.$logger.trace("conductometria-viewer][alternar_concepto", arguments);
      const position = this.mostrando_conceptos.indexOf(concepto_index);
      if(position === -1) {
        this.mostrando_conceptos.push(concepto_index);
      } else {
        this.mostrando_conceptos.splice(position, 1);
      }
    },
    ir_a_seccion(seccion) {
      this.$logger.trace("conductometria-viewer][ir_a_seccion", arguments);
      this.seccion_seleccionada = seccion;
    }
  },
  mounted() {
    this.$logger.trace("conductometria-viewer][mounted", arguments);
    this.ir_a_seccion("Fenómenos");
  },
  unmounted() {
    this.$logger.trace("conductometria-viewer][unmounted", arguments);
  }
});