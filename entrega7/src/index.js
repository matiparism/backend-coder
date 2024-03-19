import server from './server.js'
import config from './config/env.config.js'
import './db.js'

const PORT = config.SERVER_PORT;

server.listen(PORT);
console.log('Server listen on port', PORT)