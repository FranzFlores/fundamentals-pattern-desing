/**
 *  Ejercicio 2 – Intermedio
    Escenario: Un reproductor multimedia puede reproducir archivos de diferentes formatos (MP3, MP4) 
    y usar diferentes plataformas (Windows, Linux).
    
    Crea un sistema donde se pueda reproducir cualquier archivo en cualquier plataforma.
    Objetivo: Aplicar el patrón Bridge con lógica más concreta y nombres de clases personalizados.
 */

interface Player {
    play(file: string): void;
}

class MP3Player implements Player {
    play(file: string): void {
        console.log(`Reproduciendo archivo MP3: ${file}`);
    }
}

class MP4Player implements Player {
    play(file: string): void {
        console.log(`Reproduciendo archivo MP4: ${file}`);
    }
}

abstract class OperatingSystem {
    protected player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    abstract playMultimedia(file: string): void;
}

class WindowsOperatingSystem extends OperatingSystem {
    override playMultimedia(file: string): void {
        console.log('\nReproduciendo desde Windows');
        this.player.play(file);
    }
}

class LinuxOperatingSystem extends OperatingSystem {
    override playMultimedia(file: string): void {
        console.log('\nReproduciendo desde Linux');
        this.player.play(file);
    }
}

const main  = () => {
    const mp3Player = new WindowsOperatingSystem(new MP3Player());
    mp3Player.playMultimedia('song.mp3');

    const mp4Player = new LinuxOperatingSystem(new MP4Player());
    mp4Player.playMultimedia('video.mp4');
}

main();
