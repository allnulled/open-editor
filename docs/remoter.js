const PORT = process.env.PORT || 3001;
const fs = require("fs");
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
  console.log('Un cliente se ha conectado a servidor de remoter');
  socket.on('evaluar', () => {
    console.log('El servidor de remoter ha recibido la señal de evaluar');
    io.emit('evaluar');
  });
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado del servidor de remoter');
  });
});

const directorioActual = __dirname;

const watcher = chokidar.watch(__dirname + "/remoter.console.js", {
  persistent: true,
  ignoreInitial: false,
  depth: Infinity,
  cwd: directorioActual,
  recursive: true
});
watcher.on('change', (ruta) => {
  if(ruta.includes("/dist/")) {
    return;
  }
  console.log(`Cambios han habido en el archivo: ${ruta}`);
  const contenidoDeFichero = fs.readFileSync(__dirname + "/remoter.console.js").toString();
  io.emit("evaluar", contenidoDeFichero);
});
watcher.on('error', error => {
  console.error('Error en el observador:', error);
});

server.listen(PORT, () => {
  console.log(`Servidor de remoter escuchando en el puerto ${PORT}`);
});
