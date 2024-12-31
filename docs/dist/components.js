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
                    <button class="" v-on:click="() => responder(false).cerrar()">Cancelar</button>
                    <button class="letra_roja font_weight_bold" v-on:click="() => responder(true).cerrar()">Eliminar</button>
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
Vue.component("open-editor", {
  name: "open-editor",
  template: `<div class="open-editor">
    <div class="contenedor_de_panel_fijo">
        <div class="panel_fijo">
            <div class="panel_superior">
                <div class="contenedor_en_panel_superior">
                    <div class="textbox_contextual nowrap">
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
                            Back
                        </div>
                    </template>
                    <template v-if="nodo_actual_es_fichero">
                        <div class="icono_contextual fondo_rosa"
                            title="Cargar estado actual"
                            v-on:click="() => cargar_fichero_actual()">
                            Load
                        </div>
                    </template>
                    <template v-if="nodo_actual !== '/'">
                        <div class="icono_contextual fondo_verde"
                            title="Copiar fichero o directorio"
                            v-on:click="copiar_fichero_o_directorio">
                            Copy
                        </div>
                    </template>
                    <template v-if="nodo_actual_es_fichero">
                        <div class="icono_contextual fondo_verde"
                            v-if="['/','/kernel'].indexOf(nodo_actual) === -1"
                            title="Renombrar"
                            v-on:click="renombrar_nodo_actual">
                            Rename
                        </div>
                        <open-editor-iconset :contexto="this"
                            ref="serie_iconos_izquierdos"
                            :iconos-predefinidos="iconos_izquierdos"
                            identificador-de-contexto="izquierdos" />
                        <div class="icono_contextual fondo_negro letra_roja"
                            title="Eliminar"
                            v-on:click="() => eliminar_fichero_actual()">
                            Delete
                        </div>
                        <div class="icono_contextual fondo_rojo"
                            title="Exportar como URL"
                            v-on:click="exportar_como_url">
                            Link
                        </div>
                        <div class="icono_contextual fondo_azul"
                            title="Descargar como fichero"
                            v-on:click="descargar_fichero">
                            Get
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
                            Save
                        </div>
                        <div class="icono_contextual fondo_rojo"
                            title="Ejecuta el código"
                            v-on:click="() => ejecutar_fichero_actual()">
                            Run
                        </div>
                        <div class="icono_contextual fondo_naranja"
                            title="Compila el código"
                            v-on:click="() => compilar_fichero_actual()">
                            Compile
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Visualiza el código"
                            v-on:click="() => visualizar_fichero_actual()">
                            View
                        </div>
                        <div class="icono_contextual fondo_rosa"
                            title="Formatea el código"
                            v-on:click="() => formatear_fichero_actual()">
                            Format
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Incrementa tamaño de fuente"
                            v-on:click="() => incrementar_tamanio_de_fuente(1)">
                            Font++
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Decrementa tamaño de fuente"
                            v-on:click="() => incrementar_tamanio_de_fuente(-1)">
                            Font--
                        </div>
                        <div class="icono_contextual fondo_verde"
                            title="Alterna familia de fuente"
                            v-on:click="() => alternar_familia_de_fuente()">
                            Font
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
                            File++
                        </div>
                        <div class="icono_contextual fondo_verde"
                            title="Crea directorio"
                            v-on:click="crear_carpeta">
                            Dir++
                        </div>
                        <div class="icono_contextual fondo_rojo"
                            v-if="['/','/kernel'].indexOf(nodo_actual) === -1"
                            title="Elimina directorio"
                            v-on:click="eliminar_carpeta_actual">
                            Dir--
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Importar directorio como JSON"
                            v-on:click="importar_directorio_como_json">
                            &lt;&lt; JSON
                        </div>
                        <div class="icono_contextual fondo_blanco"
                            title="Exportar directorio como JSON"
                            v-on:click="exportar_directorio_como_json">
                            &gt;&gt; JSON
                        </div>
                    </template>
                </div>
            </div>
            <div class="panel_inferior">
                <div style="display: flex; flex-direction: row;">
                    <div class="contenedor_en_panel_superior"
                        style="flex: 100;">
                        <template v-if="nodo_actual_es_fichero && editor_de_codigo_posicion_cursor">
                            <div class="textbox_contextual contexto_inferior nowrap">
                                <b class="">
                                    <span>
                                        Line: {{ editor_de_codigo_posicion_cursor.start.line }}:{{ editor_de_codigo_posicion_cursor.start.column
                                        }}-{{ editor_de_codigo_posicion_cursor.end.line }}:{{ editor_de_codigo_posicion_cursor.end.column }}
                                    </span>
                                    <span> | </span>
                                    <span>
                                        Pos: {{ editor_de_codigo_posicion_cursor.start.offset }}-{{ editor_de_codigo_posicion_cursor.end.offset }}
                                    </span>
                                </b>
                            </div>
                        </template>
                    </div>
                    <div style="flex: 1; min-width: 40px;" class="nowrap">
                        <div title="Alternar consola" class="icono_contextual fondo_blanco" v-on:click="alternar_consola" style="max-height: 18px; padding-top: 7px;">
                            Console
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <windows-port :contexto="this"></windows-port>
    <c-dialogs :contexto="this"></c-dialogs>
    <console-hooker :contexto="this"></console-hooker>
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
