Vue.component("console-hooker", {
  name: "console-hooker",
  template: $template,
  props: {

  },
  data() {
    this.$logger.trace("console-hooker][data", arguments);
    return {
      is_shown: false,
      instance: undefined
    }
  },
  methods: {
    
  },
  mounted() {
    this.$logger.trace("console-hooker][mounted", arguments);
    this.instance = new ConsoleHooker("console-hooker-output");
    this.$vue.prototype.$consoleHooker = this;
  },
  unmounted() {
    this.$logger.trace("console-hooker][unmounted", arguments);

  }
});