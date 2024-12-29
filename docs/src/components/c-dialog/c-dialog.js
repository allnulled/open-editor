const noop = () => {};
const defaultData = {
  is_active: false,
  promise: Promise.resolve(),
  resolve: noop,
  reject: noop,
  value: undefined
};
Vue.component("c-dialog", {
  name: "c-dialog",
  template: $template,
  data() {
    return Object.assign({}, defaultData, {
      priority: 1,
    });
  },
  methods: {
    open() {
      const priority = this.$dialogs.getTicket();
      let resolve = noop;
      let reject = noop;
      const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      this.resolve = resolve;
      this.reject = reject;
      this.promise = promise;
      this.value = undefined;
      this.priority = priority;
      this._show();
      this.is_active = true;
      return this.promise;
    },
    set(value) {
      this.value = value;
      return this;
    },
    close() {
      const value = this.value;
      this.resolve(value);
      this.reset();
      return value;
    },
    reset() {
      Object.assign(this, defaultData, {is_active:true});
      this.is_active = false;
      this._close();
      return this;
    },
    _show() {
      this.$el.querySelector("dialog").show();
    },
    _close() {
      this.$el.querySelector("dialog").close();
    }
  },
  watch: {}
});