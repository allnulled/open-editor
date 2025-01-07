Eventos_para_cordova_app: {
  if (typeof cordova === "undefined") {
    break Eventos_para_cordova_app;
  }
  const memoria_cordova = {};
  Eventos_de_entrada_y_salida: {
    document.addEventListener("pause", async function () {
      console.log("La app se ha puesto en segundo plano.");
      memoria_cordova.ultima_salida = new Date();
    }, false);
    document.addEventListener("resume", async function () {
      console.log("La app está de vuelta en primer plano.");
      await Vue.prototype.$dialogs.notificar({
        titulo: "Bienvenido",
        pregunta: `Has estado ausente ${Math.floor((new Date() - memoria_cordova.ultima_salida) / 1000)} segundos.`
      });
    }, false);
  }
  Eventos_de_permisos: {
    document.addEventListener('deviceready', function () {
      console.log("deviceready 2");
      var permissions = cordova.plugins.permissions;
      // Obtener la lista de permisos disponibles en el plugin
      var allPermissions = [
        permissions.VIBRATE,
        permissions.INTERNET,
        /*
        permissions.ACCESS_NETWORK_STATE,
        permissions.ACCESS_WIFI_STATE,
        permissions.FOREGROUND_SERVICE,
        permissions.WAKE_LOCK,
        permissions.ACCESS_FINE_LOCATION,
        permissions.ACCESS_COARSE_LOCATION,
        permissions.ACCESS_BACKGROUND_LOCATION,
        permissions.READ_EXTERNAL_STORAGE,
        permissions.WRITE_EXTERNAL_STORAGE,
        permissions.CAMERA,
        permissions.RECORD_AUDIO,
        permissions.READ_PHONE_STATE,
        permissions.CALL_PHONE,
        permissions.READ_CALL_LOG,
        permissions.WRITE_CALL_LOG,
        permissions.READ_CONTACTS,
        permissions.WRITE_CONTACTS,
        permissions.GET_ACCOUNTS,
        permissions.SEND_SMS,
        permissions.RECEIVE_SMS,
        permissions.READ_SMS,
        permissions.BODY_SENSORS,
        permissions.ACTIVITY_RECOGNITION,
        permissions.USE_BIOMETRIC,
        //*/
      ];
      // Iterar sobre los permisos y verificar su estado
      allPermissions.forEach(function (permission) {
        permissions.checkPermission(permission, function (status) {
          if (status.hasPermission) {
            console.log(`Permiso concedido: ${permission}`);
          } else {
            console.log(`Permiso NO concedido: ${permission}`);
            // Solicitar el permiso
            permissions.requestPermission(permission, function (status) {
              if (status.hasPermission) {
                console.log(`Permiso concedido tras solicitud: ${permission}`);
              } else {
                console.error(`Permiso denegado tras solicitud: ${permission}`);
              }
            }, function (error) {
              console.error(`Error al solicitar permiso ${permission}:`, error);
            });
          }
        }, function (error) {
          console.error(`Error al verificar permiso ${permission}:`, error);
        });
      });
    });
  }
  Evento_de_exposicion_de_apis_de_android: {
    const wrapFunctionToFact = function (code) {
      return "(" + code + ")();\n";
    };
    document.addEventListener('deviceready', function () {
      console.log("deviceready 2");
      Vue.prototype.$android = {
        eval: function (callback) {
          const jscode = typeof callback === "function" ? wrapFunctionToFact(callback.toString()) : callback;
          return new Promise((resolve, reject) => {
            console.log("Evaluating in Rhino:\n" + jscode);
            cordova.exec((out) => resolve(out), (err) => reject(err), "Rhinobridge", "evaluate", [jscode]);
          });
        },
        node: {
          eval: function (callback) {

          }
        }
      }
    });
  }
}