(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Litestarter_app_components"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Litestarter_app_components"] = mod;
  }
  if(typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function() {
Vue.component("app", {
  name: "app",
  template: `<div class="app">
    <!--Contenido del componente-->
    <open-editor></open-editor>
</div>`,
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
Vue.component("c-dialogs", {
  name: "c-dialogs",
  template: `<div>
    <dialog class="dialogo" style="max-width: 400px;" id="dialogo_personalizado" ref="dialogo_personalizado">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ dialogo_personalizado_titulo || "Diálogo personalizado" }}</div>
            </div>
            <template v-if="esta_dialogo_personalizado_abierto">
                <dialogo-personalizado :contexto="contexto" :dialogos="this" />
            </template>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Este diálogo está personalizado.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" style="max-width: 400px;" id="dialogo_de_pedir_texto" ref="dialogo_de_pedir_texto">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ dialogo_de_notificacion_titulo }}</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div style="white-space:pre-wrap;">{{ dialogo_de_notificacion_enunciado }}</div>
                    <input class="width_100" type="text" ref="texto_de_pedir_texto" placeholder=""  v-on:keypress.enter="() => responder($refs.texto_de_pedir_texto.value).cerrar()" />
                </div>
                <div class="window-body-foot">
                    <button class="" v-on:click="() => responder($refs.texto_de_pedir_texto.value).cerrar()">Aceptar</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Esto es una notificación.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" style="max-width: 400px;" id="dialogo_de_exportar_script_como_url" ref="dialogo_de_exportar_script_como_url">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ dialogo_de_notificacion_titulo }}</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div>Para abrir este recurso puedes pegar esta URL:</div>
                    <textarea style="text-wrap:wrap; font-size:10px; margin: 0px; overflow: scroll; width: 100%; height: 100%; min-height: 120px;" v-model="dialogo_de_notificacion_enunciado" />
                </div>
                <div class="window-body-foot">
                    <button class="" v-on:click="() => { $window.navigator.clipboard.writeText(dialogo_de_notificacion_enunciado); responder(false).cerrar(); }">Copiar enlace</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Con este link puedes abrir automáticamente este script.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" style="max-width: 400px;" id="dialogo_de_confirmacion" ref="dialogo_de_confirmacion">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ dialogo_de_confirmacion_titulo || "Confirmar" }}</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div style="white-space:pre-wrap;">{{ dialogo_de_confirmacion_enunciado }}</div>
                </div>
                <div class="window-body-foot">
                    <button class="font_weight_bold" v-on:click="() => responder(true).cerrar()">Confirmar</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Este diálogo consiste en confirmar o cancelar.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" style="max-width: 400px;" id="dialogo_de_notificacion" ref="dialogo_de_notificacion">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ dialogo_de_notificacion_titulo || "Notificación" }}</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div style="white-space:pre-wrap;">{{ dialogo_de_notificacion_enunciado }}</div>
                </div>
                <div class="window-body-foot">
                    <button class="font_weight_bold" v-on:click="() => responder(true).cerrar()">Aceptar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Este diálogo consiste en confirmar solamente.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" id="dialogo_de_confirmar_eliminar_fichero_actual" ref="dialogo_de_confirmar_eliminar_fichero_actual">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Eliminar fichero</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div>¿Seguro que quieres eliminar el fichero actual?</div>
                    <div class="texto_de_codigo_especial_1"><b>{{ contexto.nodo_actual }}</b></div>
                </div>
                <div class="window-body-foot">
                    <button class="letra_roja font_weight_bold" v-on:click="() => responder(true).cerrar()">Eliminar</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Se perderá el contenido del fichero.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" id="dialogo_de_confirmar_eliminar_directorio_actual" ref="dialogo_de_confirmar_eliminar_directorio_actual">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Eliminar directorio</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div>¿Seguro que quieres eliminar el directorio actual?</div>
                    <div class="texto_de_codigo_especial_1"><b>{{ contexto.nodo_actual }}</b></div>
                    <template v-if="contexto.nodo_actual_subnodos.length">
                        <div>Contiene:</div>
                        <div>
                            <ol>
                                <li v-for="subnodo, subnodo_index in contexto.nodo_actual_subnodos" v-bind:key="'subnodo_de_directorio_a_eliminar_' + subnodo_index">
                                    <span v-if="typeof subnodo.valor === 'object'">
                                        <b>{{ subnodo.nombre }}</b>
                                    </span>
                                    <span v-else="">
                                        {{ subnodo.nombre }}
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </template>
                </div>
                <div class="window-body-foot">
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                    <button class="letra_roja font_weight_bold" v-on:click="() => responder(true).cerrar()">Eliminar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>Se perderán todos los ficheros y directorios que haya dentro.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" id="dialogo_de_pedir_nombre_de_fichero" ref="dialogo_de_pedir_nombre_de_fichero">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Crear fichero</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div>Escribe el nombre que quieres para el nuevo fichero:</div>
                    <input class="width_100" type="text" ref="respuesta_1" v-on:keypress.enter="() => responder($refs.respuesta_1.value).cerrar()"/>
                </div>
                <div class="window-body-foot">
                    <button class="" v-on:click="() => responder($refs.respuesta_1.value).cerrar()">Aceptar</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>No se admiten caracteres raros, tipo / y cosas así.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" id="dialogo_de_pedir_nombre_de_directorio" ref="dialogo_de_pedir_nombre_de_directorio">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Crear directorio</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div>Escribe el nombre que quieres para el nuevo directorio:</div>
                    <input class="width_100" type="text" ref="respuesta_2" v-on:keypress.enter="() => responder($refs.respuesta_2.value).cerrar()"/>
                </div>
                <div class="window-body-foot">
                    <button class="" v-on:click="() => responder($refs.respuesta_2.value).cerrar()">Aceptar</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>No se admiten caracteres raros, tipo / y cosas así.</div>
                </div>
            </div>
        </div>
    </dialog>
    <dialog class="dialogo" id="dialogo_de_renombrar_nodo_actual" ref="dialogo_de_renombrar_nodo_actual">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Renombrar {{ contexto.nodo_actual_es_directorio ? 'directorio' : 'fichero' }} actual</div>
            </div>
            <div class="window-body">
                <div class="window-body-main">
                    <div>Parece que quieres renombrar el {{ contexto.nodo_actual_es_directorio ? 'directorio' : 'fichero' }}:</div>
                    <div class="texto_de_codigo_especial_1"><b>{{ contexto.nodo_actual }}</b></div>
                    <div>Escribe el nombre que quieres para el {{ contexto.nodo_actual_es_directorio ? 'directorio' : 'fichero' }}:</div>
                    <input class="width_100" type="text" ref="respuesta_3" v-on:keypress.enter="() => responder($refs.respuesta_3.value).cerrar()"/>
                </div>
                <div class="window-body-foot">
                    <button class="" v-on:click="() => responder($refs.respuesta_3.value).cerrar()">Aceptar</button>
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-bar-field" style="text-align: right;">
                    <div>No se admiten caracteres raros, tipo / y cosas así.</div>
                </div>
            </div>
        </div>
    </dialog>
</div>`,
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
      htmlDialog.show();
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
  template: `<div class="c-dialog">
    <dialog class="window_dialog">
        <div class="window_container">
            <div class="window_viewer">
                <transition name="fade">
                    <div class="window modal"
                        v-if="is_active">
                        <div class="title-bar">
                            <div class="title-bar-text">
                                <slot name="title"></slot>
                            </div>
                            <div class="title-bar-controls">
                                <button aria-label="Close"
                                    v-on:click="() => set(undefined).close()"></button>
                            </div>
                        </div>
                        <div class="window-body">
                            <div style="display: flex; flex-direction: column; height: 100%;">
                                <div style="flex: 100; overflow: scroll; padding: 4px 6px;">
                                    <slot name="body"></slot>
                                </div>
                                <div style="flex: 1;"
                                    v-if="$slots.bodyfooter">
                                    <slot name="bodyfooter"></slot>
                                </div>
                            </div>
                        </div>
                        <div class="status-bar">
                            <div class="status-bar-field">
                                <template v-if="$slots.footer">
                                    <slot name="footer"></slot>
                                </template>
                                <template v-else>
                                    Powered by <a href="https://github.com/allnulled">allnulled</a>
                                </template>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </dialog>
</div>`,
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
Vue.component("c-title", {
  name: "c-title",
  template: `<div class="c-title">
    <h3><slot></slot></h3>
</div>`,
  props: {},
  data() {
    return {}
  },
  methods: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  deactivated() {},
});
Vue.component("home-page", {
  name: "home-page",
  template: `<div class="home-page">
    <c-dialog ref="dialogo_1">
        <template slot="title">Título del diálogo</template>
        <template slot="body">
            Cuerpo del diálogo
        </template>
        <template slot="bodyfooter">
            <div style="text-align: right; padding: 4px;">
                <button v-on:click="() => $refs.dialogo_1.set(true).close()">Aceptar</button>
                <button v-on:click="() => $refs.dialogo_1.close()">Cancelar</button>
            </div>
        </template>
        <!--template slot="footer">
            <span class="status-bar-field">Pie del diálogo</span>
        </template-->
    </c-dialog>
    <c-dialog ref="notificacion_1">
        <template slot="title">Título del diálogo</template>
        <template slot="body">
            Cuerpo del diálogo
        </template>
        <template slot="bodyfooter">
            <div style="text-align: right; padding: 4px;">
                <button v-on:click="() => $refs.notificacion_1.set(true).close()">Aceptar</button>
                <button v-on:click="() => $refs.notificacion_1.close()">Cancelar</button>
            </div>
        </template>
        <!--template slot="footer">
            <span class="status-bar-field">Pie del diálogo</span>
        </template-->
    </c-dialog>
    <div class="wiki_viewer">
        <div class="wiki_content">
            <div class="wiki_title">
                <span class="wiki_title_text">En Linux Libertine y en 21.8px</span>
                <span class="wiki_title_controls">
                    <button class="stretch_button"
                        v-on:click="() => $refs.notificacion_1.open()">Notificación</button>
                    <button class="stretch_button"
                        v-on:click="() => $refs.dialogo_1.open()">Diálogo</button>
                </span>
            </div>
            <!--
        wiki_table_of_contents
        wiki_article
        wiki_table_of_details
        -->
            <div class="wiki_subtitle">
                <span class="wiki_subtitle_text">En Linux Libertine y en 17px</span>
                <span class="wiki_subtitle_controls">
                    <button class="stretch_button"
                        v-on:click="() => $refs.notificacion_1.open()">Notificación</button>
                    <button class="stretch_button"
                        v-on:click="() => $refs.dialogo_1.open()">Diálogo</button>
                </span>
            </div>
            <div class="table_of_details">
                <div class="title">Título del artículo</div>
                <div class="image_container">
                    <div class="image">Imagen no disponible.</div>
                    <div class="image_footer">Título de la imagen.</div>
                </div>
                <table class="subtable_of_details">
                    <thead>
                        <tr>
                            <td class="title" colspan="100">Título de la tabla</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="key">Propiedad:</td>
                            <td class="value">Valor</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="wiki_paragraph">Texto normal, en Arial o Sans-Serif o algo.</div>
            <div class="wiki_paragraph">Esto sería un <a href="#">hipervínculo</a> a algún recurso.</div>
            <div class="wiki_paragraph">Esto sería una lista de elementos ordenados:</div>
            <ol class="wiki_list">
                <li>
                    <div>Elemento 1:</div>
                    <ol class="wiki_list">
                        <li>Elemento 1.1</li>
                        <li>Elemento 1.2</li>
                        <li>Elemento 1.3</li>
                    </ol>
                </li>
                <li>
                    <div>Elemento 2:</div>
                    <ol class="wiki_list">
                        <li>Elemento 2.1</li>
                        <li>Elemento 2.2</li>
                        <li>Elemento 2.3</li>
                    </ol>
                </li>
                <li>
                    <div>Elemento 3:</div>
                    <ol class="wiki_list">
                        <li>Elemento 3.1</li>
                        <li>Elemento 3.2</li>
                        <li>Elemento 3.3</li>
                    </ol>
                </li>
            </ol>
            <div class="wiki_paragraph">Esto sería una lista de elementos desordenados:</div>
            <ul class="wiki_list">
                <li>
                    <div>Elemento 1:</div>
                    <ul class="wiki_list">
                        <li>Elemento 1.1</li>
                        <li>Elemento 1.2</li>
                        <li>Elemento 1.3</li>
                    </ul>
                </li>
                <li>
                    <div>Elemento 2:</div>
                    <ul class="wiki_list">
                        <li>Elemento 2.1</li>
                        <li>Elemento 2.2</li>
                        <li>Elemento 2.3</li>
                    </ul>
                </li>
                <li>
                    <div>Elemento 3:</div>
                    <ul class="wiki_list">
                        <li>Elemento 3.1</li>
                        <li>Elemento 3.2</li>
                        <li>Elemento 3.3</li>
                    </ul>
                </li>
            </ul>
            <div class="wiki_paragraph">Esto es un superíndice<a href="#"><sup>[123]</sup></a> y esto un subíndice <a href="#"><sub>[123]</sub></a></div>
        </div>
    </div>
</div>`,
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
Vue.component("console-hooker", {
  name: "console-hooker",
  template: `<div class="console-hooker" :class="{hide:!is_shown}">
    <div>Console hooker</div>
    <div class="console_viewer">
        <div class="console_box">
            <div id="console-hooker-output"></div>
        </div>
    </div>
</div>`,
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
  template: `<div class="conductometria-viewer">
    <div class="panel_seccionador">
        <div class="flex_row_centered">
            <div class="flex_100" style="padding-right: 4px; white-space: nowrap; text-align: right;">Estás en sección de: </div>
            <select class="flex_1" v-model="seccion_seleccionada" style="min-width: 100px; text-align: left;">
                <option value="Fenómenos">Fenómenos</option>
                <option value="Conceptos">Conceptos</option>
                <option value="Estados">Estados</option>
            </select>
        </div>
    </div>
    <div class="seccion" v-if="seccion_seleccionada === 'Estados'">
        <div class="titulo_de_seccion">Estados:</div>
        <div class="item_de_seccion item_tipo_estado" v-for="estado, estado_index in conductometria_adapter.estados"
            v-bind:key="'conductometria_estado_' + estado_index">
            <div class="identificador_de_item" v-on:click="() => alternar_estado(estado_index)">{ {{ estado.concepto }} } un total de {{ estado.duracion_legible }} en {{ estado.propagaciones }} propagaciones.</div>
            <div class="fila_list" :class="{shown: mostrando_estados.indexOf(estado_index) !== -1}">
                <div class="fila_item" v-for="value, key, counter in estado" v-bind:key="'key_conductometria_estado_' + estado_index + '_prop_' + key">
                    <div class="fila_key">{{ counter + 1 }}. {{ $utils.humanize(key) }}:</div>
                    <div class="fila_value">{{ value }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="seccion" v-if="seccion_seleccionada === 'Fenómenos'">
        <div class="titulo_de_seccion">Fenómenos:</div>
        <div class="item_de_seccion item_tipo_fenomeno" v-for="fenomenos_de_dia, fenomenos_de_dia_index in conductometria_adapter.fenomenos"
            v-bind:key="'conductometria_fenomenos_dia_' + fenomenos_de_dia.dia">
            <div class="identificador_de_item" v-on:click="() => alternar_dia_de_fenomenos(fenomenos_de_dia.dia)" v-bind:key="'conductometria_fenomeno_' + fenomenos_de_dia.dia + '_id'">
                {{ $utils.humanizeDatestring(fenomenos_de_dia.dia, 1) }} tiene asignados {{ fenomenos_de_dia.fenomenos.length }} fenómenos.
            </div>
            <div class="fila_list" :class="{shown: mostrando_dias_de_fenomenos.indexOf(fenomenos_de_dia.dia) !== -1}" v-bind:key="'conductometria_fenomeno_' + fenomenos_de_dia.dia + '_fila'">
                <div class="fila_item" v-for="fenomeno, fenomeno_index in fenomenos_de_dia.fenomenos" v-bind:key="'key_conductometria_fenomeno_' + fenomenos_de_dia.dia + '_prop_' + fenomeno_index">
                    <div class="fila_key">{ {{ fenomeno.concepto }} } a las {{ fenomeno.hora_legible }} durante {{ fenomeno.duracion_legible }}.</div>
                </div>
            </div>
        </div>
    </div>
    <div class="seccion" v-if="seccion_seleccionada === 'Conceptos'">
        <div class="titulo_de_seccion">Conceptos:</div>
        <div class="item_de_seccion item_tipo_concepto" v-for="concepto, concepto_index in conductometria_adapter.conceptos"
            v-bind:key="'conductometria_concepto_' + concepto_index">
            <div class="identificador_de_item" v-on:click="() => alternar_concepto(concepto_index)">{{ concepto.concepto }}</div>
            <div class="fila_list" :class="{shown: mostrando_conceptos.indexOf(concepto_index) !== -1}">
                <div class="fila_item" v-for="value, key, counter in concepto" v-bind:key="'key_conductometria_concepto_' + concepto_index + '_prop_' + key">
                    <div class="fila_key">{{ counter + 1 }}. {{ $utils.humanize(key) }}:</div>
                    <div class="fila_value">{{ value }}</div>
                </div>
            </div>
        </div>
    </div>
</div>`,
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
Vue.component("open-editor", {
  name: "open-editor",
  template: `<div class="open-editor">
    <div class="contenedor_de_panel_fijo">
        <div class="panel_fijo">
            <div class="panel_superior" style="display: flex; flex-direction: row;">
                <div style="flex: 1; min-width: 40px;" class="nowrap">
                    <div title="Comandos rápidos" class="icono_contextual fondo_amarillo boton_bin" v-on:click="alternar_comandos_rapidos" style="border-radius: 50%;">
                        <span>Bin!</span>
                    </div>
                </div>
                <div class="contenedor_en_panel_superior" style="flex: 100;">
                    <div class="textbox_contextual nowrap caja_de_ruta_abierta">
                        <b class="">
                            {{ nodo_actual }}
                        </b>
                    </div>
                </div>
            </div>
            <div class="disposicion_horizontal">
                <div class="panel_izquierdo">
                    <template v-if="nodo_actual !== '/'">
                        <div class="icono_contextual fondo_blanco"
                            title="Volver a directorio"
                            v-on:click="() => subir_de_directorio()">
                            <span>Back</span>
                        </div>
                    </template>
                    <template v-if="nodo_actual_es_fichero">
                        <div class="icono_contextual fondo_rosa"
                            title="Cargar estado actual"
                            v-on:click="() => cargar_fichero_actual()">
                            <span>Load</span>
                        </div>
                    </template>
                    <template v-if="nodo_actual !== '/'">
                        <div class="icono_contextual fondo_verde"
                            title="Copiar fichero o directorio"
                            v-on:click="copiar_fichero_o_directorio">
                            <span>Copy</span>
                        </div>
                    </template>
                    <template v-if="nodo_actual_es_fichero">
                        <div class="icono_contextual fondo_verde"
                            v-if="['/','/kernel'].indexOf(nodo_actual) === -1"
                            title="Renombrar"
                            v-on:click="renombrar_nodo_actual">
                            <span>Rename</span>
                        </div>
                        <open-editor-iconset :contexto="this"
                            ref="serie_iconos_izquierdos"
                            :iconos-predefinidos="iconos_izquierdos"
                            identificador-de-contexto="izquierdos" />
                        <div class="icono_contextual fondo_negro letra_roja"
                            title="Eliminar"
                            v-on:click="() => eliminar_fichero_actual()">
                            <span>Delete</span>
                        </div>
                        <div class="icono_contextual fondo_rojo"
                            title="Exportar como URL"
                            v-on:click="exportar_como_url">
                            <span>Link</span>
                        </div>
                        <div class="icono_contextual fondo_azul"
                            title="Descargar como fichero"
                            v-on:click="descargar_fichero">
                            <span>Get</span>
                        </div>
                        <div class="icono_contextual fondo_naranja"
                            title="Ver el fuente"
                            v-on:click="() => ver_fuente_actual()">
                            <span>Code</span>
                        </div>
                    </template>
                </div>
                <div class="panel_medio"
                    style="flex: 100;">
                    <div class="panel_central">
                        <div class="contenedor_de_editor_de_codigo"
                            ref="panel_medio">
                            <template v-if="!nodo_actual_es_directorio">
                                <template v-if="typeof nodo_actual_contenido_de_fichero === 'string'">
                                    <textarea class="editor_de_codigo"
                                        ref="editor_de_codigo"
                                        spellcheck="false"
                                        v-on:focus="actualizar_posicion_de_cursor"
                                        v-on:click="actualizar_posicion_de_cursor"
                                        v-on:keyup="actualizar_posicion_de_cursor"
                                        v-on:keydown.ctrl.s.prevent="guardar_fichero_actual"
                                        v-on:input="actualizar_posicion_de_cursor"
                                        v-model="nodo_actual_contenido_de_fichero">
                                    </textarea>
                                </template>
                            </template>
                            <template v-else-if="nodo_actual_es_directorio">
                                <div class="contenedor_de_lista_de_nodos">
                                    <ul class="no_list lista_de_nodos">
                                        <template v-if="nodo_actual_subnodos && nodo_actual_subnodos.length">
                                            <li v-for="subnodo, subnodo_index in nodo_actual_subnodos"
                                                v-bind:key="'nodo_' + nodo_actual + '_subnodo-' + subnodo_index">
                                                <button v-if="typeof subnodo.valor === 'object'"
                                                    class="nowrap width_100 text_align_left"
                                                    v-on:click="() => abrir_nodo(subnodo.nombre)">
                                                    <b>{{ subnodo.nombre }}</b>
                                                </button>
                                                <button v-else=""
                                                    class="nowrap width_100 text_align_left"
                                                    v-on:click="() => abrir_nodo(subnodo.nombre)">
                                                    {{ subnodo.nombre }}
                                                </button>
                                            </li>
                                        </template>
                                        <template v-else>
                                            <li style="text-align: center;">
                                                <span class="font_size_small">There are no files or directories here.</span>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="panel_derecho">
                    <template v-if="nodo_actual_es_fichero">
                        <div class="icono_contextual fondo_azul"
                            title="Guardar estado actual"
                            v-on:click="() => guardar_fichero_actual()">
                            <span>Save</span>
                        </div>
                        <div class="icono_contextual fondo_rojo"
                            title="Ejecuta el código"
                            v-on:click="() => ejecutar_fichero_actual()">
                            <span>Run</span>
                        </div>
                        <div class="icono_contextual fondo_naranja"
                            title="Compila el código"
                            v-on:click="() => compilar_fichero_actual()">
                            <span>Compile</span>
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Visualiza el código"
                            v-on:click="() => visualizar_fichero_actual()">
                            <span>View</span>
                        </div>
                        <div class="icono_contextual fondo_rosa"
                            title="Formatea el código"
                            v-on:click="() => formatear_fichero_actual()">
                            <span>Format</span>
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Incrementa tamaño de fuente"
                            v-on:click="() => incrementar_tamanio_de_fuente(1)">
                            <span>Font++</span>
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Decrementa tamaño de fuente"
                            v-on:click="() => incrementar_tamanio_de_fuente(-1)">
                            <span>Font--</span>
                        </div>
                        <div class="icono_contextual fondo_verde"
                            title="Alterna familia de fuente"
                            v-on:click="() => alternar_familia_de_fuente()">
                            <span>Font</span>
                        </div>
                        <open-editor-iconset :contexto="this"
                            ref="serie_iconos_derechos"
                            :iconos-predefinidos="iconos_derechos"
                            identificador-de-contexto="derechos" />
                    </template>
                    <template v-if="nodo_actual_es_directorio">
                        <div class="icono_contextual fondo_azul"
                            title="Crea fichero"
                            v-on:click="crear_fichero">
                            <span>File++</span>
                        </div>
                        <div class="icono_contextual fondo_verde"
                            title="Crea directorio"
                            v-on:click="crear_carpeta">
                            <span>Dir++</span>
                        </div>
                        <div class="icono_contextual fondo_rojo"
                            v-if="['/','/kernel'].indexOf(nodo_actual) === -1"
                            title="Elimina directorio"
                            v-on:click="eliminar_carpeta_actual">
                            <span>Dir--</span>
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Importar directorio como JSON"
                            v-on:click="importar_directorio_como_json">
                            <span>&lt;&lt; JSON</span>
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Exportar directorio como JSON"
                            v-on:click="exportar_directorio_como_json">
                            <span>&gt;&gt; JSON</span>
                        </div>
                    </template>
                </div>
            </div>
            <div class="panel_inferior">
                <div style="display: flex; flex-direction: row;">
                    <div style="flex: 1; min-width: 40px;" class="nowrap">
                        <div title="Acceso a procesos" class="icono_contextual fondo_naranja icono_contextual_inferior" style="visibility: hidden;">
                            Process
                        </div>
                    </div>
                    <div class="contenedor_en_panel_superior"
                        style="flex: 100;">
                        <template v-if="nodo_actual_es_fichero && editor_de_codigo_posicion_cursor">
                            <div class="textbox_contextual contexto_inferior nowrap">
                                <b class="">
                                    <div>
                                        Line: {{ editor_de_codigo_posicion_cursor.start.line }}:{{ editor_de_codigo_posicion_cursor.start.column
                                        }}-{{ editor_de_codigo_posicion_cursor.end.line }}:{{ editor_de_codigo_posicion_cursor.end.column }}
                                    </div>
                                    <div>
                                        Pos: {{ editor_de_codigo_posicion_cursor.start.offset }}-{{ editor_de_codigo_posicion_cursor.end.offset }}
                                    </div>
                                </b>
                            </div>
                        </template>
                    </div>
                    <div style="flex: 1; min-width: 40px;" class="nowrap">
                        <div title="Alternar consola" class="icono_contextual fondo_blanco icono_contextual_inferior" v-on:click="alternar_consola">
                            Console
                        </div>
                    </div>
                    <div style="flex: 1; min-width: 40px;" class="nowrap" v-if="nodo_actual_es_fichero">
                        <div title="Snippets rápidos" class="icono_contextual fondo_azul icono_contextual_inferior" v-on:click="alternar_snippets_rapidos">
                            Snippet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <windows-port :contexto="this"></windows-port>
    <c-dialogs :contexto="this"></c-dialogs>
    <console-hooker :contexto="this"></console-hooker>
    <c-dialog ref="ventana_bin">
        <template slot="title">Binarios rápidos</template>
        <template slot="body">
            <div>
                <div style="padding-bottom: 4px;">
                    <input ref="binarios_busqueda_input" type="text" style="width: 100%;" v-model="binarios_busqueda" v-focus />
                </div>
                <template v-for="file, file_index in binarios_rapidos">
                    <span v-if="binarios_busqueda === '' || (file_index + file).includes(binarios_busqueda)" v-bind:key="'binary-' + file_index" style="margin-right: 4px; margin-bottom: 4px; display: inline-block;">
                        <button style="font-size: 10px;" v-on:click="() => ejecutar_binario_rapido(file)">{{ file }}</button>
                    </span>
                </template>
            </div>
        </template>
        <template slot="bodyfooter">
            <div style="text-align: right; padding: 4px;">
                <button v-on:click="() => $refs.ventana_bin.close()">Cancelar</button>
            </div>
        </template>
        <template slot="footer">
            <span class="status-bar-field">Clicar a uno lo ejecutará directamente.</span>
        </template>
    </c-dialog>
    <c-dialog ref="ventana_snippet">
        <template slot="title">Snippets rápidos</template>
        <template slot="body">
            <div>
                <span v-for="file, file_index in snippets_rapidos" v-bind:key="'snippet-' + file_index" style="margin-right: 4px; margin-bottom: 4px;">
                    <button v-on:click="() => ejecutar_snippet_rapido(file)">{{ file }}</button>
                </span>
            </div>
        </template>
        <template slot="bodyfooter">
            <div style="text-align: right; padding: 4px;">
                <button v-on:click="() => $refs.ventana_snippet.close()">Cancelar</button>
            </div>
        </template>
        <template slot="footer">
            <span class="status-bar-field">Clicar a uno lo ejecutará directamente.</span>
        </template>
    </c-dialog>
    <c-dialog ref="ventana_process">
        <template slot="title">Procesos abiertos</template>
        <template slot="body">
            <div v-if="hasWindowPort">
                <span v-for="proceso, proceso_index in procesos_cargados" v-bind:key="'process-item-' + proceso_index" style="margin-right: 4px; margin-bottom: 4px;">
                    <button v-on:click="() => abrir_ventana_de_proceso(proceso)">{{ proceso.title }}</button>
                </span>
            </div>
        </template>
        <template slot="bodyfooter">
            <div style="text-align: right; padding: 4px;">
                <button v-on:click="() => cargar_procesos()">Recargar</button>
                <button v-on:click="() => $refs.ventana_process.close()">Cancelar</button>
            </div>
        </template>
        <template slot="footer">
            <span class="status-bar-field">Clicar a uno lo abrirá directamente.</span>
        </template>
    </c-dialog>
    <c-dialog ref="conductometria_viewer">
        <template slot="title">
            Visualizar conductometría
        </template>
        <template slot="body">
            <conductometria-viewer :conductometria="$conductometria" />
        </template>
        <template slot="bodyfooter">
            <div style="text-align: right; padding: 4px;">
                <button v-on:click="() => $refs.conductometria_viewer.close()">Cancelar</button>
            </div>
        </template>
        <template slot="footer">
            <span class="status-bar-field">Visualización de instancia de conductometría.</span>
        </template>
    </c-dialog>
    <div style="position: fixed; top: auto; bottom: 4px; left: 0px; right: auto; z-index: 9999; opacity: 1;" class="nowrap">
        <div title="Acceso a procesos" class="icono_contextual fondo_naranja icono_contextual_inferior" style="opacity: 1;" v-on:click="alternar_acceso_a_procesos">
            Process
        </div>
    </div>
</div>`,
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
      console_logs: [],
      binarios_rapidos: [],
      snippets_rapidos: [],
      procesos_cargados: [],
      binarios_busqueda: "",
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
          //
        } else if (this.nodo_actual.endsWith(".any")) {
          // Compilar anylang a json:
          const contenidoAny = this.nodo_actual_contenido_de_fichero;
          const contenidoJson = this.$anyParser.parse(contenidoAny);
          const ficheroJson = this.nodo_actual.replace(/\.any$/g, ".json");
          await this.$ufs.write_file(ficheroJson, JSON.stringify(contenidoJson, null, 2));
          //
        } else if (this.nodo_actual.endsWith(".jsont")) {
          // Compilar jsontyped a json:
          const contenidoJsont = this.nodo_actual_contenido_de_fichero;
          const astJsont = this.$jsonTyped.parser.parse(contenidoJsont);
          const jsontReducers = await this.$ufs.require("/kernel/jsont/reducers/index.js");
          const contenidoJson = this.$jsonTyped.reducer.reduce(astJsont, jsontReducers);
          const ficheroJson = this.nodo_actual.replace(/\.jsont$/g, ".json");
          await this.$ufs.write_file(ficheroJson, contenidoJson);
          //
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
      Comprobaciones_para_asegurar_el_kernel: {
        if (!this.$ufs.exists("/kernel")) {
          this.$ufs.make_directory("/kernel");
        }
        if (!this.$ufs.exists("/kernel/components")) {
          this.$ufs.make_directory("/kernel/components");
        }
        if (!this.$ufs.exists("/kernel/commands")) {
          this.$ufs.make_directory("/kernel/commands");
        }
        if (!this.$ufs.exists("/kernel/snippets")) {
          this.$ufs.make_directory("/kernel/snippets");
        }
        if (!this.$ufs.exists("/kernel/symbols")) {
          this.$ufs.make_directory("/kernel/symbols");
        }
        if (!this.$ufs.exists("/kernel/jsont")) {
          this.$ufs.make_directory("/kernel/jsont");
        }
        if (!this.$ufs.exists("/kernel/jsont/reducers")) {
          this.$ufs.make_directory("/kernel/jsont/reducers");
        }
        if (!this.$ufs.exists("/kernel/shared")) {
          this.$ufs.make_directory("/kernel/shared");
        }
        if (!this.$ufs.exists("/kernel/shared/resource")) {
          this.$ufs.make_directory("/kernel/shared/resource");
        }
        if (!this.$ufs.exists("/kernel/jsont/reducers/index.js")) {
          this.$ufs.write_file("/kernel/jsont/reducers/index.js", this.$codeBeautifier.js(`return [
            function (node) {
              if (node.$type === "sumar") {
                return node.$operands.reduce((out, it) => {
                  out += node[it];
                  return out;
                }, 0);
              }
            },
            function (node) {
              if (node.$type === "restar") {
                return node.$operands.reduce((out, it) => {
                  out -= node[it];
                  return out;
                }, 0);
              }
            },
          ]`));
        }
        if (!this.$ufs.exists("/kernel/source.js")) {
          this.$ufs.write_file("/kernel/source.js", this.$codeBeautifier.js(`
            const fecha = new Date();
            const hora = (fecha.getHours() + "").padStart(2, '0');
            const minuto = (fecha.getMinutes() + "").padStart(2, '0');
            const dia = (fecha.getDate() + "").padStart(2, '0');
            const mes = ((fecha.getMonth() + 1) + "").padStart(2, '0');
            const anio = (fecha.getFullYear() + "").padStart(4, '0');

            await this.$dialogs.notificar({
              titulo: "¡Bienvenid@ a open-editor!",
              pregunta: \`Son las \${hora}:\${minuto} del día \${dia}/\${mes}/\${anio}.\`
            });
          `));
        }
      }
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
        if (url_parameters.has("shared_resource") && url_parameters.has("name")) {
          const code = url_parameters.get("shared_resource");
          const name = url_parameters.get("name");
          const folder = url_parameters.get("folder");
          let fullname = undefined;
          if(url_parameters.has("folder")) {
            // Si tiene "folder" nos aseguramos que exista.
            fullname = "/kernel/shared/resource/" + folder + "/" + name;
            const intermediate_folder = "/kernel/shared/resource/" + folder;
            if(!this.$ufs.is_directory(intermediate_folder)) {
              this.$ufs.make_directory(intermediate_folder);
            }
          } else {
            // Si no tiene "folder" lo pondremos en la carpeta directamente.
            fullname = "/kernel/shared/resource/" + name;
          }
          await this.$ufs.write_file(fullname, code);
          await this.abrir_nodo(fullname);
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
        params.set("shared_resource", recurso_directo);
        const name = this.nodo_actual.split("/").pop();
        params.set("name", name);
        const folder = await this.$dialogs.pedir_texto({
          titulo: "Nombre de carpeta compartida de link exportado como URL",
          pregunta: "Escribe en qué carpeta compartida quieres poner este recurso cuyo nombre será «" + name + "»:"
        });
        if(!folder) {
          return;
        }
        params.set("folder", folder);
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
      this.$logger.trace("open-editor][alternar_consola", arguments);
      this.$consoleHooker.is_shown = !this.$consoleHooker.is_shown;
      this.$consoleHooker.$forceUpdate(true);
    },
    preparar_codigo_visualizado(code, language = "javascript") {
      return `<pre class="code_viewer language-${language}">${this.$codeHighlighter.highlight(code, { language }).value}</pre>`;
    },
    visualizar_conductometria() {
      this.$logger.trace("open-editor][visualizar_conductometria", arguments);
      this.$refs.conductometria_viewer.open();
    },
    ver_fuente_actual() {
      this.$logger.trace("open-editor][ver_fuente_actual", arguments);
      const fuente = this.nodo_actual_contenido_de_fichero;
      const generadorDialogo = () => {
        return () => {
          return {
            data() {
              return { fuente }
            },
            mounted() {

            }
          }
        };
      }
      if (this.nodo_actual.endsWith(".js")) {
        const colorizedCodeHtml = this.preparar_codigo_visualizado(fuente, "javascript");
        this.$windowsPort.createWindow("Ver fuente de JavaScript", colorizedCodeHtml);
      } else if (this.nodo_actual.endsWith(".css")) {
        const colorizedCodeHtml = this.preparar_codigo_visualizado(fuente, "css");
        this.$windowsPort.createWindow("Ver fuente de CSS", colorizedCodeHtml);
      } else if (this.nodo_actual.endsWith(".html")) {
        const colorizedCodeHtml = this.preparar_codigo_visualizado(fuente, "html");
        this.$windowsPort.createWindow("Ver fuente de HTML", colorizedCodeHtml);
      } else if (this.nodo_actual.endsWith(".md")) {
        const colorizedCodeHtml = this.preparar_codigo_visualizado(fuente, "md");
        this.$windowsPort.createWindow("Ver fuente de MD", colorizedCodeHtml);
      } else if (this.nodo_actual.endsWith(".json")) {
        const colorizedCodeHtml = this.preparar_codigo_visualizado(fuente, "json");
        this.$windowsPort.createWindow("Ver fuente de JSON", colorizedCodeHtml);
      } else if (this.nodo_actual.endsWith(".json")) {
        const colorizedCodeHtml = this.preparar_codigo_visualizado(fuente, "json");
        this.$windowsPort.createWindow("Ver fuente de SCSS", colorizedCodeHtml);
      }
    },
    alternar_acceso_a_procesos() {
      this.$logger.trace("open-editor][alternar_acceso_a_procesos", arguments);
      this.cargar_procesos();
      this.$refs.ventana_process.open();
    },
    alternar_snippets_rapidos() {
      this.$logger.trace("open-editor][alternar_snippets_rapidos", arguments);
      this.$refs.ventana_snippet.open();
    },
    alternar_caracteres_rapidos() {
      this.$logger.trace("open-editor][alternar_caracteres_rapidos", arguments);
      this.$refs.ventana_symbols.open();
    },
    alternar_comandos_rapidos() {
      this.$logger.trace("open-editor][alternar_comandos_rapidos", arguments);
      this.$refs.ventana_bin.open();
    },
    cargar_binarios_rapidos() {
      this.$logger.trace("open-editor][cargar_binarios_rapidos", arguments);
      try {
        const command_files = this.$ufs.read_directory("/kernel/commands");
        const command_filenames = Object.keys(command_files);
        const binarios_rapidos = [];
        for(let index=0; index<command_filenames.length; index++) {
          const command_filename = command_filenames[index];
          const command_file = command_files[command_filename];
          if(typeof command_file === "string") {
            binarios_rapidos.push(command_filename);
          }
        }
        this.binarios_rapidos = binarios_rapidos;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    ejecutar_binario_rapido(file) {
      this.$logger.trace("open-editor][ejecutar_binario_rapido", arguments);
      this.$refs.ventana_bin.close();
      return this.$ufs.require(`/kernel/commands/${file}`);
    },
    cargar_snippets_rapidos() {
      this.$logger.trace("open-editor][cargar_snippets_rapidos", arguments);
      try {
        const command_files = this.$ufs.read_directory("/kernel/snippets");
        const command_filenames = Object.keys(command_files);
        const snippets_rapidos = [];
        for(let index=0; index<command_filenames.length; index++) {
          const command_filename = command_filenames[index];
          const command_file = command_files[command_filename];
          if(typeof command_file === "string") {
            snippets_rapidos.push(command_filename);
          }
        }
        this.snippets_rapidos = snippets_rapidos;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    ejecutar_snippet_rapido(file) {
      this.$logger.trace("open-editor][ejecutar_snippet_rapido", arguments);
      return this.$ufs.require(`/kernel/snippets/${file}`);
    },
    cargar_simbolos_rapidos() {
      this.$logger.trace("open-editor][cargar_simbolos_rapidos", arguments);
      try {
        const command_files = this.$ufs.read_directory("/kernel/symbols");
        const command_filenames = Object.keys(command_files);
        const simbolos_rapidos = [];
        for(let index=0; index<command_filenames.length; index++) {
          const command_filename = command_filenames[index];
          const command_file = command_files[command_filename];
          if(typeof command_file === "string") {
            simbolos_rapidos.push(command_filename);
          }
        }
        this.simbolos_rapidos = simbolos_rapidos;
      } catch (error) {
        this.gestionar_error(error);
      }
    },
    cargar_procesos() {
      this.$logger.trace("open-editor][cargar_procesos", arguments);
      this.procesos_cargados =  Object.values(this.$windowsPort.active_windows)
      return this.procesos_cargados;
    },
    abrir_ventana_de_proceso(proceso) {
      this.$logger.trace("open-editor][abrir_ventana_de_proceso", arguments);
      console.log("Retomando ventana: " + proceso);
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
  computed: {
    hasWindowPort() {
      return typeof this.$windowPort !== "undefined";
    }
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
      await this.cargar_source();
      await this.cargar_subnodos();
      await this.cargar_recurso_remoto();
      Carga_de_ventanas: {
        await this.cargar_binarios_rapidos();
        await this.cargar_snippets_rapidos();
        await this.cargar_simbolos_rapidos();
      }
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
Vue.component("open-editor-iconset", {
  name: "open-editor-iconset",
  template: `<div class="open-editor-iconset">
    <template v-for="icono, icono_index in serie">
        <template v-if="(typeof icono.condition !== 'function') || icono.condition(contexto, this)">
            <div class="icono_contextual"
                :class="icono.class"
                :title="icono.title"
                v-on:click="() => icono.event(contexto)"
                v-bind:key="'icono_' + identificador_de_contexto + '_' + icono_index"> {{ icono.label }} </div>
        </template>
    </template>
</div>`,
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
Vue.component("windows-port", {
  name: "windows-port",
  template: `<div class="windows-port">
    <template v-if="is_showing_windows_port">
        <div class="contenedor_de_panel_fijo"
            style="bottom:0; padding: 12px;">
            <div style="display: flex; height: 100%;">
                <div class="window" style="height: 100%; width: 100%;">
                    <div class="title-bar">
                        <div class="title-bar-text">{{ active_windows[window_component].title }}</div>
                        <div class="title-bar-controls">
                            <button aria-label="Close"
                                v-on:click="close"></button>
                        </div>
                    </div>
                    <div class="window-body" style="height: calc(100% - 36px); overflow: scroll;">
                        <component :is="window_component"
                            :port="this"
                            ref="activeWindow"></component>
                    </div>
                </div>
            </div>
        </div>
    </template>
</div>`,
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
});
