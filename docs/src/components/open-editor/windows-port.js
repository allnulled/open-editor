Vue.component("windows-port", {
  name: "windows-port",
  template: $template,
  props: {
    
  },
  data() {
    return {
      alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
      is_showing_windows_port: false,
      window_component: undefined,
      active_windows: {},
    }
  },
  methods: {
    _generateId(len = 30) {
      let id = "";
      while (id.length < len) {
        id += this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
      }
      return id;
    },
    createWindow(title, template, generator) {
      this.$ensure({ title }).type("string");
      this.$ensure({ template }).type("string");
      if(typeof generator === "undefined") {
        generator = function() {
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
      this.active_windows[name] = {
        title: title,
        component: this.$refs.activeWindow,
        process: this.$process.manager.createProcess({
          name,
          title,
          component: this.$refs.activeWindow,
          createdAt: new Date()
        })
      };
      return {
        close() {
          delete this.active_windows[name];
        }
      };
    },
    closeWindow(name) {
      const activeWindow = this.active_windows[name];
      if(activeWindow) {
        try {
          activeWindow.process.close();
        } catch (error) {
          console.log(error);
        }
        delete this.active_windows[name];
      }
    },
    close() {
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