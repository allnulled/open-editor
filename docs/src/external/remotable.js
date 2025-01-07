(() => {
  return;
  const serverUrl = 'http://192.168.1.40';
  const serverPort = 3001;
  const socket = io(`${serverUrl}:${serverPort}`);
  socket.on('evaluar', (code) => {
    console.log('Recibida la señal de evaluar desde el servidor');
    window.eval(code);
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
  window.$remotable = { socket };
})();