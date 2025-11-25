/**
 * Objetivo: Simular un sistema que pueda conectarse a distintas bases de datos (MySQL, PostgreSQL, MongoDB) dependiendo de un parámetro de configuración.

    Requisitos:
    Una interfaz DatabaseConnection con un método connect().
    Tres clases: MySQLConnection, PostgresConnection, MongoConnection.
    Un DatabaseFactory con un método createConnection(type: string).
    Un archivo principal que cree la conexión según una variable de entorno o parámetro de entrada.
 * 
 */

interface DatabaseConnection {
    connect(): void;
}

class MySQLConnection implements DatabaseConnection {
    connect(): void {
        console.log('Conectando a MySQL');
    }
}

class PostgresConnection implements DatabaseConnection {
    connect(): void {
        console.log('Conectando a Postgres');
    }
}

class MongoConnection implements DatabaseConnection {
    connect(): void {
        console.log('Conectando a MongoDB');
    }
}

type DatabaseType = 'mysql' | 'postgres' | 'mongo';
class DatabaseFactory {
    private connectionMap = {
        mysql: () => new MySQLConnection(),
        postgres: () => new PostgresConnection(),
        mongo: () => new MongoConnection(),
    };

    createConnection(type: DatabaseType): DatabaseConnection {
        const creator = this.connectionMap[type];
        if (!creator) throw new Error('Conexión a BD no disponible');
        return creator();
    }
}

const main = () => {
    const factory = new DatabaseFactory();

    const mysqlConnection = factory.createConnection('mysql');
    mysqlConnection.connect();

    const postgresConnection = factory.createConnection('postgres');
    postgresConnection.connect();

    const mongoConnection = factory.createConnection('mongo');
    mongoConnection.connect();
}

main();


