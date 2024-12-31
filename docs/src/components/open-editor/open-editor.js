Vue.component("open-editor", {
  name: "open-editor",
  template: $template,
  data() {
    return {
      error: undefined,
      nodo_actual: "/",
      nodo_actual_es_fichero: false,
      nodo_actual_es_directorio: true,
      nodo_actual_subnodos: [],
      nodo_actual_contenido_de_fichero: undefined,
      iconos_derechos: [],
      iconos_inferiores: [],
      iconos_izquierdos: [],
      editor_de_codigo_familia_de_fuente: "monospace",
      editor_de_codigo_tamanio_de_fuente: 10,
      editor_de_codigo_posicion_cursor: undefined,
      console_hooker: undefined,
      console_logs: []
    }
  },
  methods: {
    registrar_evento_de_redimensionar() {
      this.$logger.trace("open-editor][registrar_evento_de_redimensionar", arguments);
      //window.addEventListener("resize", this.evento_de_redimensionar);
      window.addEventListener('resize', this.evento_de_redimensionar);
    },
    desregistrar_evento_de_redimensionar() {
      this.$logger.trace("open-editor][desregistrar_evento_de_redimensionar", arguments);
      //window.removeEventListener("resize", this.evento_de_redimensionar);
      window.removeEventListener("resize", this.evento_de_redimensionar);
    },
    evento_de_redimensionar() {
      this.$logger.trace("open-editor][evento_de_redimensionar", arguments);
      const window = this.$window;
      const windowBetterHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      const isKeyboardOpen = windowBetterHeight < screen.height; // Ajusta el umbral si es necesario
      const fixedBottom = this.$refs.panel_medio;
      if (isKeyboardOpen) {
        fixedBottom.style.height = `${windowBetterHeight - (40 * 2)}px`;
      } else {
        fixedBottom.style.height = '0';
      }
    },
    lose_focus_from_editor() {
      this.$logger.trace("open-editor][lose_focus_from_editor", arguments);
      this.$refs.editor_de_codigo.blur();
    },
    obtener_posicion_de_cursor(textarea) {
      this.$logger.trace("open-editor][obtener_posicion_de_cursor", arguments);
      const { value, selectionStart, selectionEnd } = textarea;
      const getLineAndColumn = (offset) => {
        const lines = value.slice(0, offset).split("\n");
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return { line, column, offset };
      };
      return {
        start: getLineAndColumn(selectionStart),
        end: getLineAndColumn(selectionEnd),
      };
    },
    actualizar_posicion_de_cursor() {
      this.$logger.trace("open-editor][actualizar_posicion_de_cursor", arguments);
      const editor = this.$refs.editor_de_codigo;
      this.editor_de_codigo_posicion_cursor = false;
      setTimeout(() => {
        this.editor_de_codigo_posicion_cursor = this.obtener_posicion_de_cursor(editor);
      }, 0);
    },
    async cargar_subnodos() {
      try {
        this.$logger.trace("open-editor][cargar_subnodos", arguments);
        const subnodos = await this.$ufs.read_directory(this.nodo_actual);
        const subnodos_ordenados = Object.keys(subnodos).sort((s1, s2) => {
          const v1 = subnodos[s1];
          const v2 = subnodos[s2];
          const is_object_1 = typeof v1 === "object";
          const is_object_2 = typeof v2 === "object";
          if (is_object_1 && is_object_2) {
            return s1 < s2 ? -1 : 1;
          }
          if ((!is_object_1) && (!is_object_2)) {
            return s1 < s2 ? -1 : 1;
          }
          if (is_object_1) return -1;
          if (is_object_2) return 1;
          return s1 < s2 ? -1 : 1;
        }).reduce((output, key) => {
          output.push({
            nombre: key,
            valor: subnodos[key]
          });
          return output;
        }, []);
        this.nodo_actual_subnodos = subnodos_ordenados;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    gestionar_error(error, no_propagar = false) {
      this.$logger.trace("open-editor][gestionar_error", arguments);
      console.log(error);
      this.error = error;
      if (!no_propagar) {
        throw error;
      }
    },
    subir_de_directorio() {
      this.$logger.trace("open-editor][subir_de_directorio", arguments);
      const partes = this.nodo_actual.split(/\//g);
      const nodo_anterior = "/" + partes.splice(0, partes.length - 1).join("/");
      const nodo_anterior_corregido = this.$ufs.resolve_path(nodo_anterior)
      return this.abrir_nodo(nodo_anterior_corregido);
    },
    async crear_carpeta() {
      try {
        this.$logger.trace("open-editor][crear_carpeta", arguments);
        const nombre = await this.$dialogs.abrir("dialogo_de_pedir_nombre_de_directorio");
        if (!nombre) return;
        const ruta = this.$ufs.resolve_path(this.nodo_actual, nombre);
        this.$logger.trace("open-editor][Creando carpeta: " + ruta, arguments);
        await this.$ufs.make_directory(ruta);
        await this.cargar_subnodos();
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async crear_fichero() {
      try {
        this.$logger.trace("open-editor][crear_fichero", arguments);
        const nombre = await this.$dialogs.abrir("dialogo_de_pedir_nombre_de_fichero");
        if (!nombre) return;
        const ruta = this.$ufs.resolve_path(this.nodo_actual, nombre);
        await this.$ufs.write_file(ruta, "");
        await this.cargar_subnodos();
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async guardar_fichero_actual() {
      try {
        this.$logger.trace("open-editor][abrir_nodo", arguments);
        await this.$ufs.write_file(this.nodo_actual, this.nodo_actual_contenido_de_fichero);
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async cargar_fichero_actual() {
      try {
        this.$logger.trace("open-editor][cargar_fichero_actual", arguments);
        const contenido = await this.$ufs.read_file(this.nodo_actual);
        this.nodo_actual_contenido_de_fichero = contenido;
        this.$forceUpdate(true);
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async abrir_nodo(nodo) {
      try {
        this.$logger.trace("open-editor][abrir_nodo", arguments);
        const ruta = this.$ufs.resolve_path(this.nodo_actual, nodo);
        const es_fichero = await this.$ufs.is_file(ruta);
        if (es_fichero) {
          this.nodo_actual = ruta;
          this.nodo_actual_es_directorio = false;
          this.nodo_actual_contenido_de_fichero = await this.$ufs.read_file(ruta);
          // this.nodo_actual_subnodos = []; // Lo dejamos igual
          this.nodo_actual_es_fichero = true;
          return;
        }
        const es_directorio = await this.$ufs.is_directory(ruta);
        if (es_directorio) {
          this.nodo_actual = ruta;
          // this.nodo_actual_contenido_de_fichero = await this.$ufs.read_file(ruta); // Lo dejamos igual también
          this.nodo_actual_es_directorio = true;
          this.nodo_actual_es_fichero = false;
          await this.cargar_subnodos();
          return;
        }
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async eliminar_carpeta_actual() {
      try {
        this.$logger.trace("open-editor][eliminar_carpeta_actual", arguments);
        const confirmation = await this.$dialogs.abrir("dialogo_de_confirmar_eliminar_directorio_actual");
        if (!confirmation) return;
        await this.$ufs.delete_directory(this.nodo_actual);
        await this.subir_de_directorio();
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async eliminar_fichero_actual() {
      try {
        this.$logger.trace("open-editor][eliminar_fichero_actual", arguments);
        const confirmation = await this.$dialogs.abrir("dialogo_de_confirmar_eliminar_fichero_actual");
        if (!confirmation) return;
        await this.$ufs.delete_file(this.nodo_actual);
        await this.subir_de_directorio();
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async ejecutar_fichero_actual() {
      try {
        this.$logger.trace("open-editor][ejecutar_fichero_actual", arguments);
        // @TODO: start process
        const AsyncFunction = (async function () { }).constructor;
        const function_content = this.nodo_actual_contenido_de_fichero;
        const execution = new AsyncFunction(function_content);
        await execution.call(this);
      } catch (error) {
        this.gestionar_error(error, true);
      }
    },
    async compilar_fichero_actual() {
      try {
        this.$logger.trace("open-editor][compilar_fichero_actual", arguments);
        if (this.nodo_actual.endsWith(".md")) {
          // Compilar de md a html:
          const contenidoMd = this.nodo_actual_contenido_de_fichero;
          const contenidoHtml = this.$markdown.parse(contenidoMd);
          const ficheroHtml = this.nodo_actual.replace(/\.md$/g, ".html");
          this.$ufs.write_file(ficheroHtml, contenidoHtml);
          await this.$dialogs.notificar({
            titulo: "Compilación exitosa",
            pregunta: "Tu fichero de html compilado se encuentra en:\n" + ficheroHtml
          });
        } else if (this.nodo_actual.endsWith(".pegjs")) {
          // Compilar de pegjs a js:
          const contenidoPegjs = this.nodo_actual_contenido_de_fichero;
          const globalId = await this.$dialogs.pedir_texto({
            titulo: "Compilar *.pegjs a *.js",
            pregunta: "¿Qué nombre de variable global quieres que tenga este parser?"
          });
          if (!globalId) {
            return;
          }
          const stringId = JSON.stringify(globalId);
          const contenidoJsParser = this.$peg.buildParser(contenidoPegjs, {
            output: "source",
            trace: false,
          });
          const ficheroJs = this.nodo_actual.replace(/\.pegjs$/g, ".js");
          const contenidoJs = `(function(mod) {
            if(typeof window !== 'undefined') {
              window[${stringId}] = mod;
            }
            if(typeof global !== 'undefined') {
              global[${stringId}] = mod;
            }
            if(typeof module !== 'undefined') {
              module.exports = mod;
            }
          })(${contenidoJsParser})`;
          this.$ufs.write_file(ficheroJs, contenidoJs);
          await this.$dialogs.notificar({
            titulo: "Compilación exitosa",
            pregunta: "Tu fichero de sintaxis compilada se encuentra en:\n" + ficheroJs
          });
        }
      } catch (error) {
        this.gestionar_error(error, true);
      }
    },
    async visualizar_fichero_actual() {
      try {
        const wrapWindowCode = function (contenidoHtml) {
          return `<div>
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="flex: 100; overflow: scroll; padding: 4px 6px;" ref="contents">
                  ${contenidoHtml}
                </div>
                <div style="position: absolute; bottom: 10px; left: auto; right: 9px;">
                    <button v-on:click="pdfy">Descargar PDF</button>
                    <button v-on:click="textify">Descargar texto</button>
                </div>
            </div>
          </div>`;
        }
        const editor = this;
        const generadorDialogo = function () {
          return {
            methods: {
              textify: function () {
                const filename = editor.nodo_actual.replace(/\.(md|html)$/g, "") + ".txt";
                const filecontent = this.$refs.contents.textContent;
                editor.$downloadFile(filename, filecontent);
              },
              pdfy: function () {
                this.$pdf.save(this.$refs.contents);
              }
            }
          }
        };
        if (this.nodo_actual.endsWith(".md")) {
          const contenidoMd = this.nodo_actual_contenido_de_fichero;
          const contenidoHtml = this.$markdown.parse(contenidoMd);
          const contenidoDialogo = wrapWindowCode(contenidoHtml);
          await this.$windowsPort.createWindow("Visualización de markdown", contenidoDialogo, generadorDialogo);
        } else if (this.nodo_actual.endsWith(".html")) {
          const contenidoHtml = this.nodo_actual_contenido_de_fichero;
          const contenidoDialogo = wrapWindowCode(contenidoHtml);
          await this.$windowsPort.createWindow("Visualización de html", contenidoDialogo, generadorDialogo);
        }
      } catch (error) {
        this.gestionar_error(error, true);
      }
    },
    async formatear_fichero_actual() {
      try {
        this.$logger.trace("open-editor][formatear_fichero_actual", arguments);
        if (this.nodo_actual.endsWith(".up") || this.nodo_actual.endsWith(".upl")) {
          this.nodo_actual_contenido_de_fichero = this.$window.UPL.format(this.nodo_actual_contenido_de_fichero);
          return;
        }
        const options = {
          indent_size: "2",
          indent_char: " ",
          max_preserve_newlines: "5",
          preserve_newlines: true,
          keep_array_indentation: false,
          break_chained_methods: false,
          indent_scripts: "normal",
          brace_style: "collapse",
          space_before_conditional: true,
          unescape_strings: false,
          jslint_happy: false,
          end_with_newline: false,
          wrap_line_length: "0",
          indent_inner_html: false,
          comma_first: false,
          e4x: false,
          indent_empty_lines: false,
          console_hooker: undefined,
          console_logs: []
        };
        if (this.nodo_actual.endsWith(".js")) {
          this.nodo_actual_contenido_de_fichero = this.$window.beautifier.js(this.nodo_actual_contenido_de_fichero, options);
        } else if (this.nodo_actual.endsWith(".html")) {
          this.nodo_actual_contenido_de_fichero = this.$window.beautifier.html(this.nodo_actual_contenido_de_fichero, options);
        } else if (this.nodo_actual.endsWith(".css")) {
          this.nodo_actual_contenido_de_fichero = this.$window.beautifier.css(this.nodo_actual_contenido_de_fichero, options);
        }
      } catch (error) {
        this.gestionar_error(error, true);
      }
    },
    incrementar_tamanio_de_fuente(cantidad) {
      this.$logger.trace("open-editor][incrementar_tamanio_de_fuente", arguments);
      this.editor_de_codigo_tamanio_de_fuente += cantidad;
      this.$refs.editor_de_codigo.style.fontSize = this.editor_de_codigo_tamanio_de_fuente + "px";
    },
    alternar_familia_de_fuente() {
      this.$logger.trace("open-editor][alternar_familia_de_fuente", arguments);
      if (this.editor_de_codigo_familia_de_fuente === "monospace") {
        this.editor_de_codigo_familia_de_fuente = "'9pt Segoe UI','SegoeUI','Noto Sans','sans-serif'";
      } else {
        this.editor_de_codigo_familia_de_fuente = "monospace";
      }
      this.$refs.editor_de_codigo.style.fontFamily = this.editor_de_codigo_familia_de_fuente;
    },
    cargar_source() {
      this.$logger.trace("open-editor][cargar_source", arguments);
      return this.import("/kernel/source.js");
    },
    async import(file) {
      try {
        this.$logger.trace("open-editor][import", arguments);
        const has_source = await this.$ufs.exists(file);
        if (has_source) {
          const source_contents = await this.$ufs.read_file(file);
          const source_function = new (async function () { }).constructor(source_contents);
          return await source_function.call(this);
        }
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async importVueComponent(componentPath) {
      try {
        // @DOING: metodo para importar componentes vue desde ufs:
        this.$logger.trace("open-editor][importVueComponent", arguments);
        const componentJsPath = componentPath + ".js";
        const componentCssPath = componentPath + ".css";
        const componentHtmlPath = componentPath + ".html";
        const has_js = await this.$ufs.exists(componentJsPath);
        const has_css = await this.$ufs.exists(componentCssPath);
        const has_html = await this.$ufs.exists(componentHtmlPath);
        if (has_source) {
          const source_contents = await this.$ufs.read_file(file);
          const source_function = new (async function () { }).constructor(source_contents);
          return await source_function.call(this);
        }
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async renombrar_nodo_actual() {
      try {
        this.$logger.trace("open-editor][renombrar_nodo_actual", arguments);
        const name2 = await this.$dialogs.abrir("dialogo_de_renombrar_nodo_actual");
        if (!name2) return;
        await this.$ufs.rename(this.nodo_actual, name2);
        const parts = this.nodo_actual.split("/");
        parts.pop();
        const nuevo_nodo = this.$ufs.resolve_path(...parts.concat(name2));
        await this.abrir_nodo("/" + nuevo_nodo);
        return;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async cargar_recurso_remoto() {
      try {
        this.$logger.trace("open-editor][cargar_recurso_remoto", arguments);
        const url_parameters = new URLSearchParams(window.location.search);
        if (url_parameters.has("recurso_directo")) {
          const code = url_parameters.get("recurso_directo");
          await this.$ufs.write_file("/resource.js", code);
          await this.abrir_nodo("/resource.js");
        } else if (url_parameters.has("recurso_remoto")) {
          const recurso_remoto = url_parameters.get("recurso_remoto");
          const response = await fetch(recurso_remoto);
          const code = await response.text();
          await this.$ufs.write_file("/resource.js", code);
          await this.abrir_nodo("/resource.js");
        }
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async exportar_como_url() {
      try {
        this.$logger.trace("open-editor][exportar_como_url", arguments);
        const params = new URLSearchParams();
        const recurso_directo = this.nodo_actual_contenido_de_fichero;
        params.set("recurso_directo", recurso_directo);
        this.$dialogs.dialogo_de_notificacion_titulo = "Exportar script como URL";
        this.$dialogs.dialogo_de_notificacion_enunciado = "https://allnulled.github.io/open-editor/index.html?" + params.toString();
        await this.$dialogs.abrir("dialogo_de_exportar_script_como_url");
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    async copiar_fichero_o_directorio() {
      try {
        this.$logger.trace("open-editor][copiar_fichero_o_directorio", arguments);
        if (this.nodo_actual_es_fichero) {
          // Si es fichero:
          const nueva_ruta = await this.$dialogs.pedir_texto({
            titulo: "Copiar fichero a otro directorio",
            pregunta: "Escribe la ruta completa a donde quieres copiar el fichero. Debe existir el directorio:"
          });
          if (!nueva_ruta) {
            return;
          }
          await this.$ufs.write_file(nueva_ruta, this.nodo_actual_contenido_de_fichero);
        } else if (this.nodo_actual_es_directorio) {
          // Si es directorio:
          const nueva_ruta = await this.$dialogs.pedir_texto({
            titulo: "Copiar directorio a otro directorio",
            pregunta: "Escribe la ruta completa a donde quieres copiar el directorio. Debe existir el directorio anterior:"
          });
          if (!nueva_ruta) {
            return;
          }
          await this.$ufs.operate_on_node(nueva_ruta, (pivote, prop) => {
            return pivote[prop] = this.nodo_actual_subnodos;
          });
        }
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    mostrar_mensaje_de_consola(...args) {
      this.console_logs.push(...args);
    },
    downloadTextFile(filename, content) {
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    },
    async descargar_fichero() {
      const filename = this.nodo_actual.split("/").pop();
      const filesize = this.nodo_actual_contenido_de_fichero.length;
      const confirmacion = await this.$dialogs.confirmar({
        titulo: "Descarga de fichero",
        pregunta: `¿Seguro que quieres descargar el fichero ${filename}? Ocupa ${filesize}B.`
      });
      if (confirmacion) {
        this.downloadTextFile(filename, this.nodo_actual_contenido_de_fichero);
      }
    },
    async exportar_directorio_como_json() {
      this.$logger.trace("open-editor][exportar_directorio_como_json", arguments);
      const codigo = JSON.stringify(this.$ufs.read_directory(this.nodo_actual), null, 2);
      await this.$dialogs.personalizado({
        titulo: "Exportar directorio como JSON",
        plantilla: `
          <div>
          <div style="padding: 4px;">
              <pre style="margin: 0px; margin-bottom: 4px; padding: 8px; overflow: scroll;">{{ codigo }}</pre>
              <div style="text-align: right;">
                <button v-on:click="() => copyToClipboard()">Copiar texto</button>
                <button v-on:click="() => cerrar()">Cancelar</button>
              </div>
            </div>
          </div>
        `,
        datos: function () {
          return {
            codigo
          };
        },
        metodos: {
          copyToClipboard() {
            this.$window.navigator.clipboard.writeText(this.codigo);
          }
        }
      });
    },
    async importar_directorio_como_json() {
      this.$logger.trace("open-editor][importar_directorio_como_json", arguments);
      const editor = this;
      const directorio_actual = this.nodo_actual;
      await this.$dialogs.personalizado({
        titulo: "Importar directorio como JSON",
        plantilla: `
          <div>
            <div style="padding: 4px;" v-if="paso === 1">
              <div style="padding: 12px;">¡Cuidado! ¡Esta operación eliminará absolutamente todos los nodos que haya en el directorio actualmente!</div>
              <div style="text-align: right;">
                <button v-on:click="() => seguir()">Continuar</button>
                <button v-on:click="() => cerrar()">Cancelar</button>
              </div>
            </div>
            <div style="padding: 4px;" v-if="paso === 2">
              <textarea style="width:100%;min-height:230px;" v-model="texto_a_importar" />
              <div v-if="error">
                <div>Error: {{ error }}</div>
                <button v-on:click="limpiar_error">Aceptar</button>
              </div>
              <div style="text-align: right;">
                <button v-on:click="() => importar()">Importar</button>
                <button v-on:click="() => cerrar()">Cancelar</button>
              </div>
            </div>
          </div>
        `,
        datos: function () {
          return {
            paso: 1,
            texto_a_importar: "",
            error: undefined
          };
        },
        metodos: {
          volver() {
            this.paso--;
          },
          seguir() {
            this.paso++;
          },
          limpiar_error() {
            this.error = undefined;
          },
          importar() {
            const importacion = JSON.parse(this.texto_a_importar);
            this.$ufs.operate_on_node(directorio_actual, (pivote, prop) => {
              return pivote[prop] = importacion;
            });
            editor.abrir_nodo(directorio_actual);
            this.cerrar();
          }
        }
      });
    },
    alternar_consola() {
      this.$consoleHooker.is_shown = !this.$consoleHooker.is_shown;
      this.$consoleHooker.$forceUpdate(true);
    }
  },
  watch: {
    iconos_izquierdos(nuevo_valor) {
      this.$logger.trace("open-editor][watch.iconos_izquierdos", arguments);
      this.$refs.serie_iconos_izquierdos.cambiar_iconos(nuevo_valor);
    },
    iconos_superiores(nuevo_valor) {
      this.$logger.trace("open-editor][watch.iconos_superiores", arguments);
      this.$refs.serie_iconos_superiores.cambiar_iconos(nuevo_valor);
    },
    iconos_inferiores(nuevo_valor) {
      this.$logger.trace("open-editor][watch.iconos_inferiores", arguments);
      this.$refs.serie_iconos_inferiores.cambiar_iconos(nuevo_valor);
    },
    iconos_derechos(nuevo_valor) {
      this.$logger.trace("open-editor][watch.iconos_derechos", arguments);
      this.$refs.serie_iconos_derechos.cambiar_iconos(nuevo_valor);
    },
  },
  async mounted() {
    try {
      this.$logger.trace("open-editor][mounted", arguments);
      Vue.prototype.$openEditor = this;
      Vue.prototype.$downloadFile = this.downloadTextFile.bind(this);
      Vue.prototype.$ufs = UFS_manager.create();
      Vue.prototype.$ufs.require = (path, parameters = []) => {
        const filepath = Vue.prototype.$ufs.resolve_path(path);
        const filecontents = Vue.prototype.$ufs.read_file(filepath);
        const asyncExample = async function () { };
        const AsyncFunction = asyncExample.constructor;
        const filedata = new AsyncFunction(filecontents);
        return filedata.call(this, ...parameters);
      };
      Vue.prototype.$ufs.requireVueComponent = async (path, parameters = {}) => {
        const $ufs = Vue.prototype.$ufs;
        // Import css
        const contentCss = $ufs.read_file(path + ".css");
        // Import html
        const contentHtml = $ufs.read_file(path + ".html");
        // Import js
        const contentJs = $ufs.read_file(path + ".js");
        // Injections
        Inject_css: {
          const styleTag = document.createElement("style");
          styleTag.textContent = contentCss;
          const repeated = Array.from(document.body.querySelectorAll("style")).filter(styleTag => {
            const uid = styleTag.getAttribute("style-tag-id");
            return uid === path;
          });
          if (repeated.length === 0) {
            styleTag.setAttribute("style-tag-id", path);
            document.body.appendChild(styleTag);
          }
        }
        Inject_js: {
          const AsyncFunction = (async function () { }).constructor;
          let scriptCode = contentJs;
          console.log(contentJs);
          Object.assign(parameters, {
            $template: contentHtml
          });
          const asyncFunction = new AsyncFunction(...Object.keys(parameters), contentJs);
          scriptCode = asyncFunction.toString();
          const result = await asyncFunction.call(this, ...Object.values(parameters));
          return result;
        }
      };
      this.registrar_evento_de_redimensionar();
      this.evento_de_redimensionar();
      await this.cargar_subnodos();
      await this.cargar_source();
      await this.cargar_recurso_remoto();
      this.$window.oe = this;
    } catch (error) {
      this.gestionar_error(error);
    }
  },
  unmounted() {
    this.$logger.trace("open-editor][unmounted", arguments);
    this.desregistrar_evento_de_redimensionar();
    this.deshookear_consola();
  }
});