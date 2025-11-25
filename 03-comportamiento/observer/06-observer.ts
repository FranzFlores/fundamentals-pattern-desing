/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../../helpers/colors.ts";

interface Observer {
    notify(videoTitle: string): void;
}

class YoutubeChannel {
    private subscribers: Observer[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    subscribe(observer: Observer) {
        this.subscribers.push(observer);
        console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
    }

    unsuscribe(observer: Observer) {
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
        console.log(`Un suscriptor se ha dado de baja %c${this.name}`, COLORS.green);
    }

    uploadVideo(videoTitle: string) {
        console.log(`El canal %c${this.name} ha subido un nuevo video`, COLORS.green);

        for (const subscriber of this.subscribers) {
            subscriber.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    notify(videoTitle: string): void {
        console.log(`%c${this.name} ha sido notificado: Nuevo video ${videoTitle}`,COLORS.green);
    }
}

const main = () => {
    const channel = new YoutubeChannel('Cocinando con Franz');

    const andres = new Subscriber('Andrés');
    const valeria = new Subscriber('Valeria');
    const valentina = new Subscriber('Valentina');

    channel.subscribe(andres);
    channel.subscribe(valeria);

    channel.uploadVideo('Receta de tamales lojanos');
    console.log('\n\n');

    channel.subscribe(valentina);
    channel.uploadVideo('Receta de humitas');   

    channel.unsuscribe(valeria);
    channel.uploadVideo('Receta de quimbolitos');
}

main();