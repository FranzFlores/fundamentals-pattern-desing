/**
 *  Ejercicio 1: Tipos de notificaciones
    Enunciado:
    Crea una fábrica abstracta que produzca notificaciones por Email y SMS. 
    Ambas deben tener un método send(message: string): void.
    Define la interfaz abstracta de notificación.
    Implementa dos versiones concretas (Email y SMS).
    Crea una NotificationFactory abstracta y fábricas concretas para Email y SMS.
    Simula el envío de un mensaje usando ambas.
    Pista: Usa console.log para simular el envío.
 * 
 */

// Producto Abstracto
interface Notification {
    send(message: string): void;
}

// Productos Concretos
class Email implements Notification {
    send(message: string): void {
        console.log('Envío desde correo electrónico:', message);
    }
}

class SMS implements Notification {
    send(message: string): void {
        console.log('Envío desde SMS:', message);
    }
}

// Fábrica Abstracta
interface NotificationFactory {
    createNotification(): Notification;
}

// Fábricas Concretas
class EmailFactory implements NotificationFactory {
    createNotification(): Notification {
        return new Email();
    }
}

class SMSFactory implements NotificationFactory {
    createNotification(): Notification {
        return new SMS();
    }
}

// Cliente
const main = (factory: NotificationFactory) => {
    const notification = factory.createNotification();
    notification.send('Mensaje de Notificación');
}

// Uso
main(new EmailFactory());
main(new SMSFactory());


