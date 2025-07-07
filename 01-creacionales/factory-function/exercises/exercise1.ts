/**
 *  Ejercicio 1: Usuario simple
    Objetivo: Crear una función fábrica para generar usuarios básicos con propiedades por defecto.

    Requisitos:
    - Define una función createUser que reciba un name y un role (opcional).
    - El role puede ser 'admin' o 'user' (por defecto debe ser 'user').
    Devuelve un objeto con:
    - name
    - role
    - isActive: true

    Extra: Añade una validación para que el nombre no esté vacío.
 * 
 */

type Role = 'admin' | 'user';
const createUser = (name: string, role: Role = 'user') => {
    if (!name) {
        throw new Error('El nombre es requerido');
    }

    return {
        name,
        role,
        isActive: true
    }
}

const main = () => {
    const user1 = createUser('Franz');
    console.log('El usuario 1 es:', user1);
    
    const user2 = createUser('Jonathan', 'admin');
    console.log('El usuario 2 es:', user2);
}

main();