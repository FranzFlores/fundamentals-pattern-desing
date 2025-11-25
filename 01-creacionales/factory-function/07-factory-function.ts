/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../../helpers/colors.ts";

type Language = 'es' | 'en' | 'fr';
const createGreeter = (lang: Language) => {
    return (name: string) => {
        const messages = {
            es: `Hola, %c${name}!`,
            en: `Hello, %c${name}!`,
            fr: `Bonjour, %c${name}`
        }

        return console.log(messages[lang], COLORS.red);
    }
}

const main = () => {
    const spanishGreeter = createGreeter('es');
    spanishGreeter('Franz');

    const englishGreeter = createGreeter('en');
    englishGreeter('Alice');

    const frenchGreeter = createGreeter('fr');
    frenchGreeter('Emilio');
}

main();