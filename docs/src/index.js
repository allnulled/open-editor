window.process = {
    env: {
        // In local/http "test", in github/https "production":
        NODE_ENV: (window.location.href.startsWith("https") ? "production" : "test")
    }
};
// window.process.env.NODE_ENV = "test";
window.process.env.NODE_ENV = "production";
const main = async function () {
    try {
        Import_scripts: {
            window.startIntersitialCountdown();
            if (process.env.NODE_ENV === "test") {
                importer.setTotal(78);
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
                        importer.scriptSrc("src/external/anylang.js"),
                        importer.scriptSrc("src/external/jsontyped-reducer.bundled.js"),
                        importer.scriptSrc("src/external/global-utils.js"),
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
                        importer.scriptSrc("src/directives/v-focus.js"),
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
                        importer.importVueComponent("src/components/conductometria-viewer/conductometria-viewer"),
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
            Vue.prototype.$jsonTyped = {
                parser: JsonTyped,
                reducer: JsonTypedReducer,
            };
            Vue.prototype.$vue = window.Vue;
            Vue.prototype.$codeHighlighter = window.hljs;
            Vue.prototype.$codeBeautifier = window.beautifier;
            Vue.prototype.$markdown = window.marked;
            Vue.prototype.$pdf = { save: window.html2pdf };
            Vue.prototype.$peg = window.PEG;
            Vue.prototype.$anyParser = window.AnylangParser;
            Vue.prototype.$dialogs = undefined;
            Vue.prototype.$ufs = undefined;
            Vue.prototype.$utils = window.GlobalUtils;
            Vue.prototype.$logger = window.BasicLogger.create("app", { trace: true });
            Vue.prototype.$window = window;
            Vue.prototype.$windowsPort = undefined;
            Vue.prototype.$importer = window.importer;
            Vue.prototype.$socketio = window.io;
            Vue.prototype.$fetch = window.fetch;
            Vue.prototype.$ensure = window.ensure;
            Vue.prototype.$store = window.UniversalStore.create();
            Vue.prototype.$sessionStore = {};
            Vue.prototype.$conductometria = window.Conductometria.crear();
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
            Vue.prototype.$logger.trace("index.js » installing vue.js v2 app", []);
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

