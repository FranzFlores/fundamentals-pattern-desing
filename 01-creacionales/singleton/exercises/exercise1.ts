/**
 *  Ejercicio 1 – Básico: Configuración global
    Objetivo: Crear una clase AppConfig que almacene una configuración global 
    (como el nombre de la app y la versión) usando el patrón Singleton.

    Requisitos:
    - La clase debe tener propiedades: appName y version.
    - Debes usar el patrón Singleton para asegurar que solo existe una instancia de AppConfig.
    - Simula el uso desde distintos archivos creando múltiples referencias (aunque estés en un solo archivo).
 *
 */

class AppConfig {
    private static instance: AppConfig;
    public appName: string = '';
    public version: string = '';

    private constructor(appName: string, version: string) {
        this.appName = appName;
        this.version = version;
    }

    public static getInstance(appName = '', version = ''): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = Object.freeze(new AppConfig(appName, version));
        }

        return AppConfig.instance;
    }
}

const main = () => {
    const config1 = AppConfig.getInstance('Fitness App', '1.0.0');

    const config2 = AppConfig.getInstance();
    console.log(config2.appName);
    console.log(config1 === config2);
}

main();