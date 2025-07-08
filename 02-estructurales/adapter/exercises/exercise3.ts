/**
 *  Ejercicio 3: Adaptador bidireccional (reto)
    Contexto:
    En un sistema de reproducción de audio tienes
    Pero ahora quieres integrar una clase de video:

    Objetivo:
    Crea un adaptador VideoToMediaPlayerAdapter que haga 
    que VideoPlayer se pueda usar como MediaPlayer.
    
    (Opcional) Crea un adaptador MediaToVideoPlayerAdapter 
    que permita usar un MediaPlayer como si fuera un 
    VideoPlayer (esto es útil para pensar de forma inversa).
 */

// Target
interface MediaPlayer {
    play(filename: string): void;
}

interface VideoPlayer {
    playVideo(filename: string): void;
}

// Adaptee
class AudioPlayer implements MediaPlayer {
    play(filename: string): void {
        console.log(`Reproduciendo audio: ${filename}`);
    }
}

class VideoPlayer implements VideoPlayer {
    playVideo(file: string): void {
        console.log(`Reproduciendo video: ${file}`);
    }
}

// Adapters
class VideoToMediaPlayerAdapter implements MediaPlayer {
    private videoPlayer: VideoPlayer;
    constructor() {
        this.videoPlayer = new VideoPlayer();
    }

    play(filename: string): void {
        this.videoPlayer.playVideo(filename);
    }
}

class MediaToVideoPlayerAdapter implements VideoPlayer {
    private audioPlayer: AudioPlayer;
    constructor() {
        this.audioPlayer = new AudioPlayer();
    }

    playVideo(filename: string): void {
        this.audioPlayer.play(filename);
    }
}

// Cliente
const main = () => {
    const videoMediaPlayer: MediaPlayer = new VideoToMediaPlayerAdapter();
    videoMediaPlayer.play('video.mp4');

    const audioVideoPlayer: VideoPlayer = new MediaToVideoPlayerAdapter();
    audioVideoPlayer.playVideo('song.mp3');
}

main();