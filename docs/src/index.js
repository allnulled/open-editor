window.process = {
    env: {
        // In local/http "test", in github/https "production":
        NODE_ENV: (window.location.href.startsWith("https") ? "production" : "test")
    }
};
const main = async function () {
    try {
        Import_scripts: {
            window.startIntersitialCountdown();
            if (process.env.NODE_ENV === "test") {
                // importer.setTotal(64);
                importer.setTotal(60);
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
                        importer.importVueComponent("src/components/console-hooker/console-hooker"),
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
            const processInterface = new window.ProcessInterface();
            const processManager = new processInterface.ProcessManager();
            Vue.prototype.$consoleHooker = undefined;
            Vue.prototype.$process = {};
            Vue.prototype.$process.interface = processInterface;
            Vue.prototype.$process.manager = processManager;
            Vue.prototype.$vue = window.Vue;
            Vue.prototype.$markdown = window.marked;
            Vue.prototype.$pdf = { save: window.html2pdf };
            Vue.prototype.$peg = window.PEG;
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