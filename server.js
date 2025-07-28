
const WebSocket = require('ws');

const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
  console.log('🔌 Cliente conectado');

  clients.push(ws);

  ws.on('message', (message) => {
    console.log('📨 Mensaje recibido:', message.toString());

    // Relay a todos los demás
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }
  });

  ws.on('close', () => {
    console.log('❌ Cliente desconectado');
    clients = clients.filter((c) => c !== ws);
  });
});

console.log(`🚀 Servidor WebSocket escuchando en puerto ${PORT}`);
