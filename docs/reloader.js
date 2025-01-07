const PORT = process.env.PORT || 3000;
const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const chokidar = require('chokidar');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado a servidor de reloader');
  socket.on('refrescar', () => {
    console.log('El servidor de reloader ha recibido la señal de refrescar');
    io.emit('refrescar');
  });
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado del servidor de reloader');
  });
});

const directorioActual = __dirname;
const patrones = ['**/*.js', '**/*.css', '**/*.xml', '**/*.html'];
const patronesEscuchados = patrones.map(pat => path.join(directorioActual, pat));

console.log("[*] Escuchando:", patronesEscuchados);

const watcher = chokidar.watch(".", {
  persistent: true,
  ignoreInitial: false,
  depth: Infinity,
  cwd: directorioActual,
  recursive: true
});
watcher.on('change', (ruta) => {
  Ignores_manuales: {
    if(ruta.includes("/dist/")) {
      return;
    }
    if(ruta.endsWith("remoter.console.js")) {
      return;
    }
  }
  console.log(`Cambios han habido en el archivo: ${ruta}`);
  io.emit("refrescar");
});
watcher.on('error', error => {
  console.error('Error en el observador:', error);
});

server.listen(PORT, () => {
  console.log(`Servidor de reloader escuchando en el puerto ${PORT}`);
});