/**
 * Objetivo: Crear un sistema que permita enviar notificaciones por email o SMS sin que el cliente sepa qué clase concreta está usando.
    Requisitos:
    Una interfaz Notifier con un método send(message: string).
    Dos clases concretas: EmailNotifier y SMSNotifier.
    Un NotifierFactory que decida cuál retornar según un tipo (email o sms).
    Un archivo principal que use el factory para enviar una notificación.
 * 
 */

interface Notifier {
    send(message: string): void;
}

class EmailNotifier implements Notifier {
    send(message: string): void {
        console.log('Enviando desde correo electrónico: ', message);
    }
}

class SMSNotifier implements Notifier {
    send(message: string): void {
        console.log('Enviando desde SMS: ', message);
    }
}


type NotifierType = 'email' | 'sms';
class NotifierFactory {
    createNotifier(type: NotifierType): Notifier {
        switch (type) {
            case 'email':
                return new EmailNotifier();
            case 'sms':
                return new SMSNotifier();
            default:
                throw new Error('Tipo de notificación no compatible');
        }
    }
}

const main = () => {
    const factory = new NotifierFactory();

    const notifierEmail = factory.createNotifier('email');
    notifierEmail.send('Notificación por correo');

    const notifierSms = factory.createNotifier('sms');
    notifierSms.send('Notificación por SMS'); 
}

main();

