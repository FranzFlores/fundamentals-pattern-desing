/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 */

import { COLORS } from "../../helpers/colors.ts";

interface Command {
    execute(): void;
}

class Ligth {
    turnOn(): void {
        console.log('%cLa luz está encendida', COLORS.yellow);
    }

    turnOff(): void {
        console.log('%cLa luz está apagada', COLORS.yellow);
    }
}

class Fan {
    turnOn(): void {
        console.log('%cEl ventilador está encendido', COLORS.green);
    }

    turnOff(): void {
        console.log('%cEl ventilador está apagado', COLORS.green);
    }
}

class LigthOnCommand implements Command {
    constructor(private ligth: Ligth) { }

    execute(): void {
        this.ligth.turnOn();
    }
}

class LigthOffCommand implements Command {
    constructor(private ligth: Ligth) { }

    execute(): void {
        this.ligth.turnOff();
    }
}

class FanOnCommand implements Command {
    constructor(private fan: Fan) { }

    execute(): void {
        this.fan.turnOn();
    }
}

class FanOffCommand implements Command {
    constructor(private fan: Fan) { }

    execute(): void {
        this.fan.turnOff();
    }
}

class RemoteController {
    private commands: Record<string, Command> = {};

    setCommand(button: string, command: Command) {
        this.commands[button] = command;
    }

    pressButton(button: string) {
        if (this.commands[button]) {
            this.commands[button].execute();
            return;
        }

        console.log('%cNo se ha asignado un comando a este botón', COLORS.red);
    }
}

const main = () => {
    const remoteControl = new RemoteController();
    const light = new Ligth();
    const fan = new Fan();

    // Crear los comandos para los dispositivos
    const ligthOnCommand = new LigthOnCommand(light);
    const ligthOffCommand = new LigthOffCommand(light);

    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOffCommand(fan);

    // Asignar las acciones al control remoto
    remoteControl.setCommand('1', ligthOnCommand);
    remoteControl.setCommand('2', ligthOffCommand);
    remoteControl.setCommand('3', fanOnCommand);
    remoteControl.setCommand('4', fanOffCommand);

    let continueProgram = true;
    
    do {
    console.clear();
    const button = prompt(`
        Presiona un botón del control:
        1. Encender la luz,
        2. Apagar la luz,
        3. Encender ventilador
        4. Apagar ventilador

        Botón:
    `) ?? '';
    
    remoteControl.pressButton(button);

    const continueProgramResponse = prompt(`
        \n¿Deseas continuar? (y/n):
    `)?.toLowerCase();

    continueProgram = continueProgramResponse === 'n' ? false : true;
    } while (continueProgram);
}

main();