Vue.component("c-dialogs", {
  name: "c-dialogs",
  template: $template,
  props: {
    contexto: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    this.$logger.trace("c-dialogs][data", arguments);
    return {
      tickets: 1,
      dialogo: undefined,
      respuesta_pendiente: false,
      respuesta: undefined,
      dialogo_de_confirmacion_titulo: "",
      dialogo_de_confirmacion_enunciado: "",
      dialogo_de_notificacion_titulo: "",
      dialogo_de_notificacion_enunciado: "",
      esta_dialogo_personalizado_abierto: false,
      dialogo_personalizado_titulo: "",
      dialogo_personalizado_plantilla: ""
    };
  },
  methods: {
    getTicket() {
      this.$logger.trace("c-dialogs][getTicket", arguments);
      return this.tickets++;
    },
    confirmar(opts) {
      this.$logger.trace("c-dialogs][confirmar", arguments);
      const { pregunta, titulo } = opts;
      this.dialogo_de_confirmacion_titulo = titulo;
      this.dialogo_de_confirmacion_enunciado = pregunta;
      return this.abrir("dialogo_de_confirmacion");
    },
    notificar(opts) {
      this.$logger.trace("c-dialogs][notificar", arguments);
      const { pregunta, titulo } = opts;
      this.dialogo_de_notificacion_titulo = titulo;
      this.dialogo_de_notificacion_enunciado = pregunta;
      return this.abrir("dialogo_de_notificacion");
    },
    pedir_texto(opts) {
      this.$logger.trace("c-dialogs][pedir_texto", arguments);
      const { pregunta, titulo } = opts;
      this.dialogo_de_notificacion_titulo = titulo;
      this.dialogo_de_notificacion_enunciado = pregunta;
      return this.abrir("dialogo_de_pedir_texto");
    },
    personalizado(opts) {
      this.$logger.trace("c-dialogs][personalizado", arguments);
      const { plantilla, titulo, datos = false, metodos = {} } = opts;
      this.dialogo_personalizado_titulo = titulo;
      this.$vue.component("dialogo-personalizado", {
        name: "dialogo-personalizado",
        template: "<div class='window-body'>" + plantilla + "</div>",
        data: datos ?? function () {
          return {

          };
        },
        props: {
          contexto: {
            type: Object,
            required: true,
          },
          dialogos: {
            type: Object,
            required: true,
          }
        },
        methods: {
          responder: (...args) => this.responder(...args),
          cerrar: (...args) => this.cerrar(...args),
          ...metodos
        },
      });
      this.esta_dialogo_personalizado_abierto = true;
      return this.abrir("dialogo_personalizado");
    },
    abrir(id) {
      this.$logger.trace("c-dialogs][abrir", arguments);
      if (this.respuesta_pendiente) {
        throw new Error("Hay un diálogo pendiente y no se puede abrir el diálogo «" + id + "»");
      }
      const htmlDialog = this.$refs[id];
      if (!htmlDialog) {
        throw new Error("No se ha encontrado diálogo «" + id + "»");
      }
      htmlDialog.showModal();
      Actualizar_valores: {
        this.dialogo = htmlDialog;
        this.respuesta_pendiente = Promise.withResolvers();
        this.respuesta = undefined;
      }
      return this.respuesta_pendiente.promise;
    },
    responder(valor) {
      this.$logger.trace("c-dialogs][responder", arguments);
      this.respuesta = valor;
      return this;
    },
    resetear_formularios() {
      this.$logger.trace("c-dialogs][resetear_formularios", arguments);
      const ids = Object.keys(this.$refs).filter(id => id.startsWith("respuesta_"));
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        this.$refs[id].value = "";
      }
    },
    cerrar(error = false) {
      this.$logger.trace("c-dialogs][cerrar", arguments);
      this.dialogo.close();
      const respuesta = this.respuesta;
      const respuesta_pendiente = this.respuesta_pendiente;
      Resetear_valores: {
        this.respuesta = undefined;
        this.respuesta_pendiente = undefined;
        this.dialogo = undefined;
        this.dialogo_de_confirmacion_titulo = undefined;
        this.dialogo_de_confirmacion_enunciado = undefined;
        this.esta_dialogo_personalizado_abierto = false;
        this.resetear_formularios();
      }
      if (error) {
        return respuesta_pendiente.reject(error);
      }
      return respuesta_pendiente.resolve(respuesta);
    }
  },
  mounted: function () {
    this.$logger.trace("c-dialogs][mounted", arguments);
    this.$vue.prototype.$dialogs = this;
  }
});