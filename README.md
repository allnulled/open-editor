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
- [socket.io-client.js@4.8.1](./docs/src/external/socket.io-client.js) para comunicaciones dúplex
- [sql-wasm.js](https://github.com/sql-js/sql.js) para tener soporte de SQL
- [sql-wasm.wasm](https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.1/dist/sql-wasm.wasm) para los bindings a bajo nivel
- [beautifier](https://github.com/beautifier/js-beautify) para embellecer el código js, css y html.
- [win7.css](https://khang-nd.github.io/7.css/) para no tener que pensar en los estilos
- [@allnulled/importer](https://github.com/allnulled/importer) como sistema de módulos
- [@allnulled/ensure](https://github.com/allnulled/ensure) para aserciones y errores de tipo
- [@allnulled/universal-file-system](https://github.com/allnulled/universal-file-system) como parche cross-env para el sistema de ficheros
- [@allnulled/basic-logger](https://github.com/allnulled/basic-logger/) para tracear cualquier API
- [@allnulled/browsie](https://github.com/allnulled/browsie) para persistencia fuerte con IndexedDB
- [@allnulled/conductometria-api](https://github.com/allnulled/conductometria-api) como API de agenda incorporada
- [@allnulled/process-interface](https://github.com/allnulled/process-interface/) para gestionar ventanas
- [@allnulled/sqlite-polyfill](https://github.com/allnulled/sqlite-polyfill) para parchear cross-env el SQL
- [@allnulled/sqlite-data-system](https://github.com/allnulled/sqlite-data-system/) para ampliar lo básico de los sistemas de datos
- [@allnulled/universal-store](https://github.com/allnulled/universal-store) para persistencia reactiva con localStorage (con `docs/src/external/store.unbundled.js`)
- refresher.js para refresco automático, personalizado y personalizable.

### APIs internas

Además de todas estas, se inyectan algunos componentes en `src/components`. Aquí están:
- La API del editor en `open-editor`
- La API de diálogos entre en `c-dialog` y `c-dialogs`
- La API de notificaciones instantáneas entre en `c-badge` y `c-badges`



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
const main = async function () {
    try {
        Import_scripts: {
            if (process.env.NODE_ENV === "test") {
                importer.setTotal(64);
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
                        importer.scriptSrc("src/external/conductometria.bundle.js"),
                    ]);
                }
                Second_wave: {
                    await Promise.all([
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
                    ]);
                }
                Third_synchronous_wave: {
                    ///////////////////////////////////////////////////////
                    await importer.linkStylesheet("src/components/home-page/wikipedia.css");
                    await importer.linkStylesheet("src/external/win7.css");
                    await importer.scriptSrc("src/external/refresher.js");
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
            const processInterface = new ProcessInterface();
            const processManager = new processInterface.ProcessManager();
            Vue.prototype.$process = {};
            Vue.prototype.$process.interface = processInterface;
            Vue.prototype.$process.manager = processManager;
            Vue.prototype.$vue = Vue;
            Vue.prototype.$dialogs = undefined;
            Vue.prototype.$ufs = undefined;
            Vue.prototype.$logger = BasicLogger.create("app", { trace: true });
            Vue.prototype.$window = window;
            Vue.prototype.$importer = importer;
            Vue.prototype.$socketio = io;
            Vue.prototype.$fetch = fetch;
            Vue.prototype.$ensure = ensure;
            Vue.prototype.$store = UniversalStore.create();
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

Los ficheros se cargan por olas, cada ola espera a que acabe la anterior, porque los de la siguiente tienen dependencias con los de la anterior.

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

Con esto podemos hacer includes de los ficheros que hay guardados por `Vue.prototype.$ufs`.

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

