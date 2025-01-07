(() => {
  const serverUrl = '127.0.0.1';
  const serverPort = 3000;
  const socket = io(`${serverUrl}:${serverPort}`, {
    reconnect: false
  });
  socket.on('refrescar', () => {
    console.log('Recibida la señal de refrescar desde el servidor');
    location.reload();
  });
  socket.on('error', (error) => {
    console.log("error conexión:", error);
  });
  socket.on('connect_error', (error) => {
    console.log("error preconexión:", error);
  });
  socket.on('disconnect', (reason) => {
    console.log("desconexión:", reason);
  });
  window.$refresher = { socket };
})();