/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
    title: string;
    private content: string;
    author: string;

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    clone(): Document {
        return new Document(this.title, this.content, this.author);
    }

    displayInfo() {
        console.log(`
            Título: ${this.title}
            Contenido: ${this.content}
            Autor: ${this.author}
        `);
    }
}

const main = () => {
    const document1 = new Document('Cotización', '500 dólares', 'Franz');
    document1.displayInfo();

    // No se pierde las referencias
    const document2 = document1.clone();
    document2.title = 'nueva cotizacion';
}

main();