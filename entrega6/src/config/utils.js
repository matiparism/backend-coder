// Importamos las funciones necesarias de los módulos
import bcrypt from 'bcrypt';

// Funciones de cifrado
export const createHash = password => 
    // Esta función toma una contraseña y la cifra utilizando bcrypt. 
    // El '10' que se pasa a bcrypt.genSaltSync es el número de rondas que se utilizarán para generar la sal.
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    // Esta función compara una contraseña con la contraseña cifrada de un usuario. 
    // Si las contraseñas coinciden, devuelve true. De lo contrario, devuelve false.
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}