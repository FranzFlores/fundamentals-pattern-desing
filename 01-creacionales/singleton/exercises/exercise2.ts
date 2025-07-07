/**
 *  Ejercicio 2 – Intermedio: Gestor de logs
    Objetivo: Implementar una clase LogManager que almacene un historial de logs y 
    siempre mantenga el mismo historial, sin importar desde qué parte de la app se acceda.

    Requisitos:
    - La clase debe ser un Singleton.
    - Debe tener un método addLog(message: string) y getLogs() para mostrar todos los logs registrados.
    - Simula el uso desde distintas partes (como si se usara en distintos módulos).
 * 
 */

class LogManager {
    private static instance: LogManager;
    private logs: string[];

    private constructor() {
        this.logs = [];
    }

    public static getInstance(): LogManager {
        if (!LogManager.instance) {
            LogManager.instance = new LogManager();
        }

        return LogManager.instance;
    }

    public addLog(log: string): void {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${log}`);
    }

    public getLogs(): string[] {
        return this.logs;
    }

    public clearLogs(): void {
        this.logs = [];
    }
}

const main = () => {
    const logger1 = LogManager.getInstance();
    logger1.addLog("App started");

    const logger2 = LogManager.getInstance();
    logger2.addLog("User logged in");

    console.log(logger1.getLogs());
}

main();