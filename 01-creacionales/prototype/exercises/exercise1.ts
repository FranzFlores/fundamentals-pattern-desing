/**
 *  Ejercicio 1: Clonación de Libros (Nivel sencillo)
    Contexto:Tienes una clase Book que representa un libro. Cada libro tiene title, author y pages.

    Reto:Implementa el patrón Prototype para que puedas clonar un libro.

    Requisitos:
    Define una interfaz Prototype<T> con el método clone(): T.
    Implementa esta interfaz en la clase Book.
    Crea una instancia de Book y clona la misma. 
    Muestra en consola los valores de ambos objetos y verifica que no son el mismo objeto en memoria.
 */
interface Prototype<T> {
    clone(): T;
}

class Book implements Prototype<Book> {
    constructor(
        public title: string,
        public author: string,
        public pages: number
    ) { }

    clone(): Book {
        return new Book(this.title, this.author, this.pages);
    }

    printBook() {
        console.log(`
            Nombre: ${this.title}
            Autor: ${this.author}
            Número de página: ${this.pages}
        `);
    }
}

const main = () => {
    const book = new Book(
        'Amor en tiempos del cólera',
        'Gabriel García Márquez',
        250
    );
    book.printBook();

    const bookClone = book.clone();
    bookClone.title = 'Cien años de soledad';
    bookClone.printBook();
}

main();