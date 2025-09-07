/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../../helpers/colors.ts";

class Projector {
    turnOn() {
        console.log('Proyector encendido');
    }

    turnOff() {
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on() {
        console.log('Sistema de sonido encendido');
    }

    off() {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {
    on() {
        console.log('Video player encendido');
    }

    play(movie: string) {
        console.log(`Reproduciendo %c${movie}`, COLORS.blue);
    }

    stop() {
        console.log('Película detenida');
    }

    off() {
        console.log('Video player apagado');
    }
}

class PopCornMaker {
    poppingPopCorn() {
        console.log('Haciendo palomitas');
    }

    turnOffPoppingPopCorn() {
        console.log('Deteniendo las palomitas');
    }
}

interface HomeTheatherFacadOptions {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popCornMaker: PopCornMaker;
}

class HomeTheatherFacade {
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popCornMaker: PopCornMaker;

    constructor({
        projector,
        soundSystem,
        videoPlayer,
        popCornMaker
    } : HomeTheatherFacadOptions) {
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popCornMaker = popCornMaker;
    }

    watchMovie(movie: string): void {
        console.log(`%cPreparando para la película ${movie}`, COLORS.blue);
        this.projector.turnOn();
        this.soundSystem.on();
        this.popCornMaker.poppingPopCorn();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);

        console.log('%cDisfrute la película', COLORS.blue);
    }

    endWatchingMovie(): void {
        console.log(`%c\n\nPreparando para detener la película`, COLORS.blue);
        this.projector.turnOff();
        this.soundSystem.off();
        this.popCornMaker.turnOffPoppingPopCorn();
        this.videoPlayer.stop();
        this.videoPlayer.off();


        console.log('%cSistema apagado\n', COLORS.blue);
    }
}

const main = () => {
    const projector = new Projector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popCornMaker = new PopCornMaker();

    const homeTheather = new HomeTheatherFacade({
        projector,
        soundSystem,
        videoPlayer,
        popCornMaker
    });

    homeTheather.watchMovie('Los Vengadores');
    homeTheather.endWatchingMovie();
}

main();