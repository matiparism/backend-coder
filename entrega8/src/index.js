import server from './server.js'
import config from './config/env.config.js'
import './db.js'

const PORT = config.SERVER_PORT;
const HOST = config.SERVER_HOST;

server.listen(PORT, HOST, () => {
  console.log(`Servidor en ejecución en http://${HOST}:${PORT}`);
});