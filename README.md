# open-editor

Open source editor por [allnulled](#https://github.com/allnulled).

## Editor en línea

Usa `open-editor` directamente desde cualquier dispositivo en:

- [https://allnulled.github.io/open-editor/index.html](https://allnulled.github.io/open-editor/index.html)

## Instalación

```sh
git clone https://github.com/allnulled/open-editor.git .
```

## APIs

### APIs externas

Esta es una lista de todos los proyectos que se inyectan en algún momento y viven en el `src/externals`:

- [vue-v2.js](https://v2.vuejs.org/v2/guide/) para componentes
- [socket.io-client.js@4.8.1](https://socket.io) para comunicaciones dúplex
- [sql-wasm.js](https://github.com/sql-js/sql.js) para tener soporte de SQL
- [sql-wasm.wasm](https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.1/dist/sql-wasm.wasm) para los bindings a bajo nivel
- [beautifier](https://github.com/beautifier/js-beautify) para embellecer el código js, css y html.
- [win7.css](https://khang-nd.github.io/7.css/) para no tener que pensar en los estilos.
- [marked.js](https://github.com/markedjs/marked) para transpilar markdown a html.
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) para conseguir PDFs del html vivo.
- [pegjs.js](https://github.com/peggyjs/peggy) para poder compilar sintaxis personalizadas.
- [@allnulled/importer](https://github.com/allnulled/importer) como sistema de módulos.
- [@allnulled/ensure](https://github.com/allnulled/ensure) para aserciones y errores de tipo.
- [@allnulled/universal-file-system](https://github.com/allnulled/universal-file-system) como parche cross-env para el sistema de ficheros.
- [@allnulled/basic-logger](https://github.com/allnulled/basic-logger/) para tracear cualquier API.
- [@allnulled/browsie](https://github.com/allnulled/browsie) para persistencia fuerte con IndexedDB.
- [@allnulled/conductometria-api](https://github.com/allnulled/conductometria-api) como API de agenda incorporada.
- [@allnulled/process-interface](https://github.com/allnulled/process-interface/) para gestionar ventanas.
- [@allnulled/sqlite-polyfill](https://github.com/allnulled/sqlite-polyfill) para parchear cross-env el SQL.
- [@allnulled/sqlite-data-system](https://github.com/allnulled/sqlite-data-system/) para ampliar lo básico de los sistemas de datos.
- [@allnulled/universal-store](https://github.com/allnulled/universal-store) para persistencia reactiva con localStorage (con `docs/src/external/store.unbundled.js`).
- [@allnulled/anylang](https://github.com/allnulled/anylang) como párser rápido genérico.
- refresher.js para refresco automático, personalizado y personalizable.

### APIs internas

Además de todas estas, se inyectan algunos componentes en `src/components`. Aquí están:
- La API del editor en `open-editor`
- La API de diálogos entre `c-dialog` y `c-dialogs`
- La API de notificaciones instantáneas entre en `c-badge` y `c-badges` (prematuro)



## Ficheros

Esta es una explicación de los ficheros en el directorio `docs` o raíz, según se mire:

- `bundle.js`: compiles the Vue.js v2 components, JavaScript and CSS to `dist/*.*`. Can run with `npm run build`.
- `bundlelist.components.js`: provides the list of components.
- `bundlelist.js.js`: provides the list of components.
- `bundlelist.css.js`: provides the list of components.
- `create-component.js`: creates a new component from the templates on `src/components/prototype`. Can run with `npm run create-component`.
- `package.json`: the package.json of the front-end project itself. Change it to fit your requirements.
- `reloader.js`: starts a socket-server and watching changes on files to emit the order to refresh to the browser. Can run with `npm run reloader`.
- `serve.sh`: starts an http server providing access to the application statically. Can run with `npm run serve`.
- `index.html`: contiene la aplicación inicial. Normalmente pones la intersitial inicial.

### El fichero src/index.js

El fichero en `docs/src/index.js` es clave para entender la arquitectura de dependencias de esta aplicación, que se basa en [@allnulled/importer](#):

```js
window.process = {
    env: {
        // In local/http "test", in github/https "production":
        NODE_ENV: (window.location.href.startsWith("https") ? "production" : "test")
    }
};
window.process.env.NODE_ENV = "test";
const main = async function () {
    try {
        Import_scripts: {
            window.startIntersitialCountdown();
            if (process.env.NODE_ENV === "test") {
                // importer.setTotal(64); 
                importer.setTotal(71);
                importer.setTimeout(1000 * 2);
                First_wave: {
                    await Promise.all([
                        importer.scriptSrc("src/external/socket.io-client.js"),
                        importer.scriptSrc("src/external/beautifier.js"),
                        importer.scriptSrc("src/external/vue-v2.js"),
                        importer.scriptSrc("src/external/basic-logger.js"),
                        importer.scriptSrc("src/external/ensure.js"),
                        importer.scriptSrc("src/external/ufs.js"),
                        importer.scriptSrc("src/external/store.unbundled.js"),
                        importer.scriptSrc("src/external/browsie.js"),
                        importer.scriptSrc("src/external/sql-wasm.js"),
                        importer.scriptSrc("src/external/sqlite-polyfill.js"),
                        importer.scriptSrc("src/external/sqlite-data-system.unbundled.js"),
                        importer.scriptSrc("src/external/process-interface.js"),
                        importer.scriptSrc("src/external/marked.js"),
                        importer.scriptSrc("src/external/html2pdf.bundle.js"),
                        importer.scriptSrc("src/external/pegjs.js"),
                        importer.scriptSrc("src/components/console-hooker/console-hooker-api.js"),
                        importer.scriptSrc("src/external/highlight/es/highlight.js"),
                        importer.scriptSrc("src/external/conductometria.bundle.js"),
                        importer.scriptSrc("cordova.js").catch(error => false) // Try to import cordova
                    ]);
                }
                Second_wave: {
                    await Promise.all([
                        importer.scriptSrc("src/external/cordova-payload.js").catch(error => false), // Try to import cordova payload silently for the web not to crash
                        importer.scriptSrc("src/external/highlight/languages/css.js"),
                        importer.scriptSrc("src/external/highlight/languages/javascript.js"),
                        importer.scriptSrc("src/external/highlight/languages/json.js"),
                        importer.scriptSrc("src/external/highlight/languages/xml.js"),
                        importer.scriptSrc("src/external/highlight/languages/scss.js"),
                        importer.scriptSrc("src/external/highlight/languages/markdown.js"),
                        importer.scriptSrc("src/external/anylang.js"),
                        importer.scriptSrc("src/components/c-badges/c-badges.js"),
                        importer.importVueComponent("src/components/c-dialogs/c-dialogs"),
                        importer.importVueComponent("src/components/open-editor/windows-port"),
                        importer.importVueComponent("src/components/open-editor/open-editor-iconset"),
                        importer.importVueComponent("src/components/open-editor/open-editor"),
                        importer.importVueComponent("src/components/c-title/c-title"),
                        importer.importVueComponent("src/components/home-page/home-page"),
                        importer.importVueComponent("src/components/app/app"),
                        importer.importVueComponent("src/components/c-dialog/c-dialog"),
                        importer.importVueComponent("src/components/c-badge/c-badge"),
                        importer.importVueComponent("src/components/console-hooker/console-hooker"),
                    ]);
                }
                Third_synchronous_wave: {
                    ///////////////////////////////////////////////////////
                    await importer.linkStylesheet("src/components/home-page/wikipedia.css");
                    await importer.linkStylesheet("src/external/win7.css");
                    await importer.linkStylesheet("src/external/highlight/styles/default.css");
                    await importer.scriptSrc("src/external/refresher.js"); // only test
                    await importer.scriptSrc("src/external/remotable.js"); // only test
                }
            } else if (process.env.NODE_ENV === "production") {
                importer.setTotal(1);
                importer.setTimeout(1000 * 1);
                In_production_only_app_js_and_css: {
                    await importer.scriptSrc("dist/app.js");
                    await importer.linkStylesheet("dist/app.css");
                }
            } else {
                importer.setTotal(2);
                importer.setTimeout(1000 * 1);
                In_others_we_add_the_refresher: {
                    await importer.scriptSrc("dist/app.js");
                    await importer.linkStylesheet("dist/app.css");
                    await importer.scriptSrc("src/external/refresher.js");
                }
            }
        }
        Create_app: {
            const processInterface = new window.ProcessInterface();
            const processManager = new processInterface.ProcessManager();
            Vue.prototype.$consoleHooker = undefined;
            Vue.prototype.$process = {};
            Vue.prototype.$process.interface = processInterface;
            Vue.prototype.$process.manager = processManager;
            Vue.prototype.$vue = window.Vue;
            Vue.prototype.$codeHighlighter = window.hljs;
            Vue.prototype.$codeBeautifier = window.beautifier;
            Vue.prototype.$markdown = window.marked;
            Vue.prototype.$pdf = { save: window.html2pdf };
            Vue.prototype.$peg = window.PEG;
            Vue.prototype.$anyParser = window.AnylangParser;
            Vue.prototype.$dialogs = undefined;
            Vue.prototype.$ufs = undefined;
            Vue.prototype.$logger = window.BasicLogger.create("app", { trace: true });
            Vue.prototype.$window = window;
            Vue.prototype.$importer = window.importer;
            Vue.prototype.$socketio = window.io;
            Vue.prototype.$fetch = window.fetch;
            Vue.prototype.$ensure = window.ensure;
            Vue.prototype.$store = window.UniversalStore.create();
            Conflictive_point: {
                // Vue.prototype.$sqlite = new SQLitePolyfill("litestarter.main.db", "src/external/sql-wasm.wasm");
                // await Vue.prototype.$sqlite.init("litestarter.main.db", "src/external/sql-wasm.wasm");
                const dataSystem = SqliteDataSystem.create();
                Vue.prototype.$db = dataSystem.db;
                Vue.prototype.$auth = dataSystem.auth;
                Vue.prototype.$rest = dataSystem.rest;
                Vue.prototype.$ajax = fetch;
                await Vue.prototype.$db.init("litestarter.main.db", "src/external/sql-wasm.wasm");
            }
            const app = new Vue({
                render: h => h(Vue.options.components.app),
            }).$mount("#app");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
window.addEventListener("load", main);
```

Los ficheros se cargan por olas, cada ola espera a que acabe la anterior, porque los de la siguiente tienen dependencias con los de la anterior, o quieren sobreescribir lo anterior al menos.

Con [@allnulled/importer](https://github.com/allnulled/importer) tenemos una serie de métodos para incluir en cualquier momento ficheros de lógica, de estilos o de texto.

### Inyección de dependencias

Otro punto interesante de este mismo fichero, el `docs/src/index.js`, es que hace la inyección de dependencias global. Las inyecta a `Vue.prototype.$*` y de esta forma están accesibles desde cualquier punto de la aplicación. Está todo ahí, en el código fuente de arriba.

## Tips para el editor en línea

- No tengo nada para mostrar la consola de momento.
- Desde el `this` puedes acceder a las APIs inyectadas vía `Vue.prototype.$*`:
- Usa el `await this.$ufs.require(file)` para importar ficheros del sistema de fichero simulado.
   - No hay ni `module.exports` ni `require`, pero puedes tirar con eso.

A continuación se explican cosas sobre cómo el editor permite que uses las APIs de JavaScript creando ficheros `.js` y dándole al botón de «Run».

### 1. ¿Cómo crear procesos de ventana?

Esto es un ejemplo de cómo crear un proceso de ventana:

La API de `src/components/open-editor/windows-port.js` se encarga de dejarte poder hacer, desde el editor mismo y luego «Run»:

```js
await this.$windowsPort.createWindow("Hello, window!", `
  <div>
    <div>
      <input type="text" style="width:100%;" v-model="value" />
      <div>{{ value }}</div>
      <button v-on:click="() => port.close()">Accept</button>
    </div>
  </div>
`, function() {
  return {
    props: {
      port: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        value: "Texto de la caja de texto"
      };
    }
  };
});
```

Los procesos iniciados por `$windowsPort` pueden verse en `$process.manager.processes` y su `name` coincide con el de `$windowsPort.active_windows[name]`. De esta forma puedes acceder al componente de ventana que ha iniciado el proceso. Quizá más adelante se hace un shortcut.

### 2. ¿Cómo crear diálogos espontáneos?

La API de `src/components/c-dialogs/c-dialogs.js` se encarga de dejarte poder hacer:

#### 2.1. Diálogo espontáneo de confirmación

```js
await this.$dialogs.confirmar({
  titulo: "Confirmación de tal",
  pregunta: "¿Estás seguro de tal?",
});
```

#### 2.2. Diálogo espontáneo de notificación

```js
await this.$dialogs.notificar({
  titulo: "Notificación de tal",
  pregunta: "Esto es una notificación de tal",
});
```

#### 2.3. Diálogo espontáneo de pedir texto

```js
await this.$dialogs.pedir_texto({
  titulo: "Pedir texto de tal",
  pregunta: "Escribe el texto de tal:",
});
```

#### 2.4. Diálogo espontáneo personalizado

```js
const respuesta = await this.$dialogs.personalizado({
  titulo: "Pedir texto de tal",
  plantilla: `<div>
    <div style="padding: 4px;">
      <div style="padding: 4px; padding-top: 0px;">Aquí pueden ir <b>componentes Vue.js v2</b></div>
      <input type="text" style="width: 100%; padding: 4px;" v-model="valor" />
    </div>
    <div style="display: flex; padding: 4px;">
      <span style="flex: 100;"></span>
      <button v-on:click="() => responder(valor).cerrar()">Aceptar</button>
      <button v-on:click="() => cerrar()" style="margin-left: 4px;">Cancelar</button>
    </div>
  </div>`,
  datos: function() {
    return {
      valor: "valor inicial"
    }
  }
});

await this.$dialogs.notificar({
  titulo: "Valor introducido desde diálogo personalizado",
  pregunta: respuesta
});
```

### 3. ¿Cómo crear un diálogo embedido?

La API de `src/components/c-dialog/c-dialog.js` se encarga de dejarte poder hacer:

```html
<c-dialog ref="notificacion_1">
    <template slot="title">
      Título del diálogo
    </template>
    <template slot="body">
        Cuerpo del diálogo
    </template>
    <template slot="bodyfooter">
        <div style="text-align: right; padding: 4px;">
            <button v-on:click="() => $refs.notificacion_1.set(true).close()">Aceptar</button>
            <button v-on:click="() => $refs.notificacion_1.close()">Cancelar</button>
        </div>
    </template>
    <template slot="footer">
        <span class="status-bar-field">Pie del diálogo</span>
    </template>
</c-dialog>
```

### 4. ¿Cuál es la diferencia entre diálogos espontáneos, diálogos embedidos y procesos de ventana?

Los diálogos embedidos son diálogos HTML5/Vue.js v2 que se pueden escribir en cualquier parte **de las plantillas** o **del html**.

Los diálogos espontáneos son diálogos también HTML5/Vue.js v2 que se pueden escribir en cualquier parte **de la lógica** o **del javascript**.

Los procesos de ventana son diálogos también HTML5/Vue.js v2 pero funcionan diferente. Se gestionan a través de un `WindowsManager`, y forman objetos `WindowProcess`, que tienen una herencia de la API de `src/external/process-interface.js` que es este proyecto:

  - [https://github.com/allnulled/process-interface/](https://github.com/allnulled/process-interface/)

La ventaja de los procesos de ventana es que su gestión puede supervisarse posteriormente. Cualquiera puede echar un `setTimeout` desde cualquier lugar y luego venga, busca. Pero de hacerlo bien, centralizamos la fábrica y proxificamos el producto.

## Comandos

### 1. ¿Qué comandos puedo usar en el proyecto?

En el `package.json` ahora mismo se definen estos:

```json
{
  "scripts": {
    "build": "node bundle.js",
    "create-component": "node create-component.js",
    "serve": "npx http-server -c-1 . -o",
    "reloader": "node reloader.js",
    "up": "node bundle.js && cd .. && npm run up"
  }
}
```

Para desarrollo te interesa poner 2 en funcionamiento: `npm run serve` y `npm run reloader`.

Cuando quieras preparar el entorno de producción, te interesa mirar el comando `npm run build` y los ficheros:

  - `src/bundle.components.js`: reúne todos los componentes vue.js v2 en orden para unificarlos. Saca `dist/components.{js|css}`.
     - estamos usando la API de [vuebundler](https://github.com/allnulled/vuebundler)
  - `src/bundle.css.js`: reúne todos los estilos css en orden para unificarlos. En 1 de ellos hay que poner los `dist/components.css`.
     - estamos usando la API de [htmlbundler](https://github.com/allnulled/htmlbundler) con `--wrap 0`.
  - `src/bundle.js.js`: reúne toda la lógica javascript en orden para unificarlos. En 1 de ellos hay que poner los `dist/components.js`.
     - estamos usando la API de [htmlbundler](https://github.com/allnulled/htmlbundler) con `--wrap 1`. 

No pensaba especificarlo, pero no hay un `watch` que te haga el `build`. Sería fácil de implementarlo, pero para desarrollo yo cargo los ficheros enteros por orden, es en producción que compilo con el `npm run build`. Y estaría molestando mientras desarrollo, además de ofuscando los errores. So, trabajo así, porque tiene más sentido. Y... sin... sin u... sin usar... *webpack* jej ya está, ya lo he dicho.

Lo último es usar el `npm run up` para subir más rápido los cambios.

Y seguimos. El último punto concentrado de código que destacaría, si vas a usar esto es `src/components/open-editor` donde dentro tiene varios componentes. Ahí se concentra bastante lógica también, pero ya es una API no tan genérica, mucho más específica.

Ah, bueno, y para crear componentes desde cero, tienes el comando `npm run create-component` que te pregunta y te genera el directorio y los ficheros base. Si quieres.

Sobre todo, si empiezas, es llevarte bien con `index.html` y `src/index.js`. Estos ficheros son los más clave.

### 7. ¿Qué otras APIs hay inyectadas?

Hay APIs inyectadas a posteriori, desde dentro de un componente.

En `src/components/open-editor` hay una inyección bastante destacable, que es el `require` para [`ufs`](https://github.com/allnulled/ufs). Aquí es:

```js
Vue.prototype.$ufs.require = (path, parameters = []) => {
    const filepath = Vue.prototype.$ufs.resolve_path(path);
    const filecontents = Vue.prototype.$ufs.read_file(filepath);
    const asyncExample = async function () { };
    const AsyncFunction = asyncExample.constructor;
    const filedata = new AsyncFunction(filecontents);
    return filedata.call(this, ...parameters);
};
```

De hecho, esto sucede en el `mounted` de `src/components/open-editor/open-editor.js`. También se inyecta `this.$ufs.requireVueComponent` que funciona muy similar: le pasamos la ruta común de los 3 ficheros html, css y js del componente vue, sin la extensión, y él cargará los 3. Y también `Vue.prototype.$openEditor`.

Sabes qué, mejor dejo el `mounted` aquí.

```js
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
```

La mayor parte del `mounted` la ocupa el `Vue.prototype.$ufs.requireVueComponent` ahora mismo al menos. Pero con esto podemos hacer includes de los ficheros que hay guardados por `Vue.prototype.$ufs` desde el momento en que tengamos montado `open-editor` en el DOM.

La otra API inyectada, ésta desde `src/components/open-editor/windows-port.js` es la de `WindowManager` que deriva de [`process-interface`](https://github.com/allnulled/process-interface).

```js
{
  mounted() {
    this.$logger.trace("mounted", arguments);
    this.$vue.prototype.$windowsPort = this;
  }
}
```

Inyecta `Vue.prototype.$windowsPort` globalmente en el `mounted`. Y desde aquí podemos tirar un **proceso de ventana** o **WindowProcess**.

### 8. ¿Cómo trabajo con componentes gráficos?

Para gráficos, estamos sobre el html, css, javascript, y vue@2 sobre todo.

Para obtener una lista de los componentes renderizables por vue@2 puedes:

```js
console.log(Vue.options.components);
```

Para ampliar la lista de los componentes renderizables por vue@2 puedes:

```js
Vue.component("nombre-del-componente", {
  name: "nombre-del-componente",
  props: {},
  template: `<div>Hola</div>`,
  data() {
    return {}
  },
  methods: {},
  watch: {},
  computed: {},
  mounted() {},
  unmounted() {}
})
```

Pero si quieres importar directamente `.css`, `.html` y `.js` de una, con `open-editor` puedes:

```js
this.$ufs.requireVueComponent("/path/to/my/component/component");
// Cargará conjuntamente los ficheros:
//   - /path/to/my/component/component.html (solo texto)
//   - /path/to/my/component/component.css (como style tag con uid)
//   - /path/to/my/component/component.js (inyectando los parámetros de función: $template)
```

De esta forma, con una línea rápida puedes importar los componentes que requieras.

Los 2 imports agregados a `this.$ufs` de la librería [`universal-file-system`](https://github.com/allnulled/universal-file-system) funcionan como si llamases a esa función, no hay cacheo de nada, diferente del `require` de node.js. Igualmente, si necesitas patrón singleton lo puedes implementar rápidamente a mano en cada módulo que lo precise.

Otro dato importante es que los estilos cargados con `$ufs.requireVueComponent` tienen un identificador único, por el cual se inyectan solo 1 vez. Es la implementación de *patrón singleton* que he improvisado para los estilos.


## Funcionalidades del editor

Con el editor puedes, de forma relativamente intuitiva:

 - cuando estás navegando por el árbol de ficheros:
    - navegar por el árbol de ficheros
    - crear un fichero: botón «File++»
    - crear un directorio: botón «Dir++»
    - abrir un fichero: botón del nombre del fichero
    - abrir un directorio: botón del nombre del directorio
 - cuando abres un fichero:
    - guardar un fichero: botón «Save»
    - cargar un fichero: botón «Load»
    - renombrar un fichero: botón «Rename»
    - eliminar un fichero: botón «Delete»
    - copiar un fichero a otro directorio: botón «Copy»
    - ejecutar un fichero: botón «Run». Solo funciona con los ficheros:
       - *.js.
    - compilar un fichero: botón «Compile». Solo funciona con los ficheros:
       - *.md los pasa a *.html
       - *.pegjs los pasa a *.js
       - [*.any](https://github.com/allnulled/anylang) los pasa a *.json 
       - [*.jsont](https://github.com/allnulled/jsontyped) los pasa a *.json
    - visualizar un fichero: botón «View».
       - *.md: visualiza el html como vue@2
       - *.html: visualiza como vue@2
    - visualizar código coloreado: botón «Code».
       - *.js
       - *.css
       - *.html
    - formatear un fichero: botón «Format». Solo funciona con los ficheros:
       - *.js
       - *.css
       - *.html
    - incrementar tamaño de fuente: botón «Font++».
    - decrementar tamaño de fuente: botón «Font--».
    - cambiar estilo de fuente: botón «Font».
    - exportar un fichero a URL: botón «Link».
    - cargar recursos tanto por texto en URL como por recurso remoto: con los url-search-params de `shared_resource`, `name` y `folder`.
    - importar un nodo del árbol de ficheros: botón «&lt;&lt; JSON».
    - exportar un nodo del árbol de ficheros: botón «&gt;&gt; JSON».
    - descargar en un fichero: botón «Get».
    - abrir un visualizador del log de consola: botón «Console».
    - abrir un visualizador de los procesos abiertos: botón «Process».
    - abrir un panel de comandos rápidos: botón «Bin!».
    - abrir un panel de snippets rápidos: botón «Snippet».

Y dentro puedes encontrarte más funcionalidades. Por ejemplo, cuando visualizas un `html` o un `md`, te aparece una ventana con el `html` (bueno, `vue@2` realmente) resultante, también aparecen 2 botones: «Descargar texto» y «Descargar PDF». Los 2 funcionan, pero cumplen cometidos distintos: el texto es para que tengas un mp3 rápidamente (con programas externos, ahí desde el navegador no, desde Android puede que se haga algo), y el PDF como es solo una imagen, para que puedas seguirlo.

Por tanto, podemos decir que el editor ofrece cierto soporte por defecto para ficheros:

  - html
  - css
  - js
  - md
  - pegjs
  - [@allnulled/anylang](https://github.com/allnulled/anylang) (como párser genérico)
  - [@allnulled/jsontyped](https://github.com/allnulled/jsontyped) (como JSON tipable)

Otras features más avanzadas:

 - puedes crear flujos de diálogo con `await` muy directo
 - puedes crear componentes html con `vue@2` muy directo
 - puedes visualizar código markdown, html o vue.js en un diálogo
 - puedes convertir código markdown, html o vue.js en formato PDF

Tienes muchas APIs. Ahora vamos con la app.

## Aplicación móvil

El editor tiene la capacidad de desplegarse como aplicación móvil también. Las features que se le otorgan son las mismas que las de la web, más:

  - [`cordova`](#) para soporte de APIs de Android y otros, y puente entre V8 y Android.
  - [`rhino`](#) para lo mismo, pero con puente entre V8 - JavaScript - Android.
  - [`@allnulled/cordova-plugin-rhinobridge`](#) es el plugin necesario para puentear con `rhino`.

El `cordova.js` es inyectado en la aplicación automáticamente silenciosamente, para no hacer ruido en la web, donde fallará.

El `cordova-payload.js` es el que sí es visible e inyectamos nosotros. En este fichero, inyectamos cosas exclusivas de la app móvil, como:

  - los eventos que nos permite `cordova`
     - como al salir o entrar en la aplicación
     - para que nos diga en un diálogo cuánto tiempo ha pasado
  - los permisos que queremos pedir nada más empezar
  - la inyección de la global `Vue.prototype.$android`, que solo estará disponible en móvil.
  - no hay soporte para iOS, obviamente. Solo Android.

Pero esto no se completaría en este proyecto, sino en este otro:

  - [https://github.com/allnulled/open-editor-mobile](https://github.com/allnulled/open-editor-mobile) (que ahora mismo puede que ni exista)

En lo que concierne al móvil, lo dejo en la carpeta `/build/mobile` del proyecto.

## Otras cosas guapas

El editor simula un entorno de Linux con [`this.$ufs`](https://github.com/allnulled/universal-file-system). Bueno, psé, se inspira en los nombres, más bien.

Entonces, al cargar y en algunos puntos de la aplicación, utiliza datos que siempre irá a buscar a las mismas rutas especiales del `this.$ufs`.

Esas rutas especiales, como desarrollador primero, me reservo el directorio `/kernel`. Yo las que haga, vamos, las empezaré por `/kernel/*` y siempre en inglés.

Entonces, sabiendo esto, lo he hecho para que:

 - al cargar, hace `this.$ufs.require` del `/kernel/source.js`. En este script te puedes dejar un diálogo de bienvenida fácilmente.
 - al clicar el botón de «Bin!» se listan los scripts que haya bajo `/kernel/commands`.
 - al clicar el botón de «Snippet» se listan los scripts que haya bajo `/kernel/snippets`.
 - la carpeta `/kernel/components/` no es usada nunca por defecto. Pero te la reservo para que puedas crear tus componentes rápidamente, y progresar rápido.

Luego, tienes que saber también que puedes usar `this.$windowPort.createWindow` para crear procesos, y luego puedes ir a ellos desde el botón de «Process». Esta feature, concretamente, no está terminada.

### Inyección de ficheros

Otra cosa importante que puedes hacer con el editor es **crear links que inyecten ficheros** en el sistema de ficheros. Esto es con el botón de «Link»,