// Importamos las funciones necesarias de los módulos
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definimos las constantes __filename y __dirname que nos permiten obtener la ruta del archivo y del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Exportamos __dirname para que pueda ser utilizado en otros módulos
export default __dirname;
