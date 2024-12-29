Vue.component("open-editor-iconset", {
  name: "open-editor-iconset",
  template: $template,
  props: {
    contexto: {
      type: Object,
      default: undefined
    },
    identificador_de_contexto: {
      type: String,
      default: () => "indefinido"
    },
    iconosPredefinidos: {
      type: Array,
      default: () => { }
    }
  },
  data() {
    return {
      serie: this.iconosPredefinidos
    }
  },
  methods: {
    cambiar_iconos(nuevos_iconos) {
      this.serie = nuevos_iconos;
      this.$forceUpdate(true);
    }
  },
  mounted() {
    console.log("mounted");

  },
  unmounted() {
    console.log("unmounted");

  }
});