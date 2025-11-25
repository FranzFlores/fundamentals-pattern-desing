/**
 *  Ejercicio 1 – Básico
    Escenario: Tienes dos tipos de mensajes (SMS, Email) que 
    pueden enviarse en diferentes modos (Normal, Urgente).
    Crea un sistema donde puedas combinar cualquier tipo de mensaje 
    con cualquier modo de envío.
    Objetivo: Separar el tipo de mensaje de la forma en que se envía.
 */

interface DeliveryMethod {
    send(message: string): void;
}

class NormalDelivery implements DeliveryMethod {
    send(message: string) {
        console.log(`Enviando mensaje en modo normal: ${message}`);
    }
}

class UrgentDelivery implements DeliveryMethod {
    send(message: string) {
        console.log(`Enviando mensaje en modo urgente: ${message}`);
    }
}

abstract class Message {
    protected messageMode: DeliveryMethod;

    constructor(messageMode: DeliveryMethod) {
        this.messageMode = messageMode;
    }

    abstract notify(message: string): void;
}

class SMSMessage extends Message {
    override notify(message: string): void {
        console.log('\nMensaje desde SMS');
        this.messageMode.send(message);
    }
}

class EmailMessage extends Message {
    override notify(message: string): void {
        console.log('\nMensaje desde correo eletrónico');
        this.messageMode.send(message);
    }
}

const main = () => {
    const message1 = new SMSMessage(new NormalDelivery());
    message1.notify('Mensaje 1');

    const message2 = new EmailMessage(new UrgentDelivery());
    message2.notify('Ayuda!!!!');
}

main();

