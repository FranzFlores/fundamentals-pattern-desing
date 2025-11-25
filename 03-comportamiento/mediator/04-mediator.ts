/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../../helpers/colors.ts";

// Chatroom
class Chatroom {
    private users: User[] = [];
    private title: string;

    constructor(title: string) {
        this.title = title;
    }

    addUser(user: User) {
        this.users.push(user);
    }

    sendMessage(sender: User, message: string): void {
        const usersToSend = this.users.filter((user) => user !== sender);
        for (const user of usersToSend) {
            user.receiveMessage(sender, message);
        }
    }
}

class User {
    private username: string;
    private chatroom: Chatroom;

    constructor(username: string, chatroom: Chatroom) {
        this.username = username;
        this.chatroom = chatroom;

        chatroom.addUser(this);
    }

    sendMessage(message: string) {
        console.log(
            `%c${this.username} envía: %c${message}`,
            COLORS.blue,
            COLORS.white
        );
        this.chatroom.sendMessage(this, message);
    }

    receiveMessage(sender: User, message: string) {
        console.log(
            `%c${this.username} recibe de ${sender.username}:  %c${message}`,
            COLORS.blue,
            COLORS.white
        );
    }
}

const main = () => {
    const chatroom = new Chatroom('Grupo de Trabajo');
    
    const user1 = new User('Franz', chatroom);
    const user2 = new User('Juan', chatroom);
    const user3 = new User('Stalin', chatroom);

    user1.sendMessage('Hola a todos');
    user2.sendMessage('Hola Franz, ¿Cómo estás?');
    user3.sendMessage('Hola, que gusto saludarlos');
    console.log('\n\n');
}

main();