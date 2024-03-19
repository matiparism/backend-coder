// Importamos el módulo 'url' de Node.js que proporciona utilidades para la manipulación y resolución de URL.
import { fileURLToPath } from "url";
// Importamos el módulo 'path' de Node.js que proporciona utilidades para trabajar con rutas de archivos y directorios.
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname };