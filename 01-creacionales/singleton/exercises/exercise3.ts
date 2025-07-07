/**
 *  Ejercicio 3 – Avanzado: Singleton con Lazy Initialization y restricciones
    Objetivo: Crear una clase DatabaseConnection que solo permita una única instancia
    y simule una conexión activa.

    Requisitos:
    - Debe tener un estado interno como connected: boolean.
    - Método connect() simula la conexión (pone connected = true y muestra un mensaje).    
    - Si se llama a connect() desde una segunda instancia, no debe volver a conectar.
    - Solo se debe instanciar si realmente se llama a getInstance() (lazy).
 * 
 */

class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connected: boolean;

    private constructor() {
        this.connected = false;
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }

        return DatabaseConnection.instance;
    }

    public connect(): void {
        if (!this.connected) {
            this.connected = true;
            console.log('Se ha conectado correctamente a la BD');
            return;
        }

        console.log('Ya existe una conexión previa a la BD');
    }

    public disconnect(): void {
        if (this.connected) {
            this.connected = false;
            console.log('Se ha eliminado la conexión a la BD');
            return;
        }

        console.log('No existe una conexión a la BD a desconectar');
    }
}

const main = () => {
    const db1 = DatabaseConnection.getInstance();
    db1.connect(); // Conectado

    const db2 = DatabaseConnection.getInstance();
    db2.connect(); // Ya conectado

    db1.disconnect();
    db2.connect();

    console.log(db1 === db2);
}

main();