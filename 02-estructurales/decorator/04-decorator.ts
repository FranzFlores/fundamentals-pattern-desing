/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../../helpers/colors.ts";

interface Notification {
    send(message: string): void;
}

class BasicNotification implements Notification {
    send(message: string): void {
        console.log(`%cEnviando notificación básica: %c${message}`, COLORS.blue, COLORS.white);
    }
}

// Clase decoradora
abstract class NotificationDecorator implements Notification {
    protected notification: Notification;

    constructor(notification: Notification) {
        this.notification = notification;
    }

    send(message: string): void {
        this.notification.send(message);
    }
}

// Crear decoradores
class EmailDecorator extends NotificationDecorator {
    private sendEmail(message: string) {
        console.log(`%cEnviando notificación por correo: %c${message}`, COLORS.green, COLORS.white);
    }

    override send(message: string): void {
        super.send(message);
        this.sendEmail(message);
    }
}

class SMSDecorator extends NotificationDecorator {
    private sendEmail(message: string) {
        console.log(`Enviando notificación por SMS: ${message}`);
    }

    override send(message: string): void {
        super.send(message);
        this.sendEmail(message);
    }
}

const main = () => {
    let notification: Notification = new BasicNotification();
    notification = new EmailDecorator(notification);
    notification = new SMSDecorator(notification);

    notification.send('Alerta del Sistema');
}

main();