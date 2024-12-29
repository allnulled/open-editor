Vue.component("home-page", {
  name: "home-page",
  template: $template,
  props: {},
  data() {
    return {}
  },
  methods: {},
  watch: {},
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    this.$window.c = this;
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  deactivated() { },
});