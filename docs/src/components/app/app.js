Vue.component("app", {
  name: "app",
  template: $template,
  props: {},
  data() {
    return {}
  },
  methods: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    Arranque_automatico_para_tests: {
      break Arranque_automatico_para_tests;
      document.querySelector("button").click();
    }
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  deactivated() {},
});