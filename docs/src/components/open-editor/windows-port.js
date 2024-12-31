Vue.component("windows-port", {
  name: "windows-port",
  template: $template,
  props: {

  },
  data() {
    this.$logger.trace("windows-port][data", arguments);
    return {
      alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
      is_showing_windows_port: false,
      window_component: undefined,
      active_windows: {},
    }
  },
  methods: {
    _generateId(len = 30) {
      this.$logger.trace("windows-port][_generateId", arguments);
      let id = "";
      while (id.length < len) {
        id += this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
      }
      return id;
    },
    createWindow(title, template, generator) {
      this.$logger.trace("windows-port][createWindow", arguments);
      this.$ensure({ title }).type("string");
      this.$ensure({ template }).type("string");
      if (typeof generator === "undefined") {
        generator = function () {
          return {
            data() {
              return {};
            }
          };
        };
      }
      this.$ensure({ generator }).type("function");
      this.is_showing_windows_port = false;
      const componentDef = generator(this);
      const name = "window-port-" + this._generateId(10);
      Object.assign(componentDef, { name, template });
      this.$vue.component(name, componentDef);
      this.window_component = name;
      this.is_showing_windows_port = true;
      const processObject = this.$process.manager.createProcess({
        name,
        title,
        component: this.$refs.activeWindow,
        createdAt: new Date()
      });
      this.active_windows[name] = {
        title: title,
        component: this.$refs.activeWindow,
        process: processObject
      };
      return {
        name,
        title,
        process: processObject,
        close() {
          delete this.active_windows[name];
        }
      };
    },
    closeWindow(name) {
      this.$logger.trace("windows-port][closeWindow", arguments);
      const activeWindow = this.active_windows[name];
      if (activeWindow) {
        try {
          activeWindow.process.close();
        } catch (error) {
          console.log(error);
        }
        delete this.active_windows[name];
      }
    },
    close() {
      this.$logger.trace("windows-port][close", arguments);
      this.closeWindow(this.window_component);
      this.is_showing_windows_port = false;
    }
  },
  mounted() {
    this.$logger.trace("mounted", arguments);
    this.$vue.prototype.$windowsPort = this;
  },
  unmounted() {
    this.$logger.trace("unmounted", arguments);

  }
});