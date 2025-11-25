/**
 * Ejercicio 2: Integración de lector de libros
Contexto:
Tu aplicación de lectura espera trabajar con la siguiente interfaz
Pero tienes una clase PDFReader con esta interfaz incompatible
Crea un adaptador que permita usar PDFReader como un EBookReader.
 */

// Target
interface EBookReader {
    openBook(filename: string): void;
    turnPage(): void;
}

// Adaptee
class PDFReader {
    loadPDF(file: string): void {
        console.log(`Cargando archivo PDF desde: ${file}`);
    }

    nextPDFPage(): void {
        console.log('Pasar a la siguiente página');
    }
}

// Adapter
class PDFReaderAdapter implements EBookReader {
    private pdfReader: PDFReader;

    constructor() {
        this.pdfReader = new PDFReader();
    }

    openBook(filename: string): void {
        this.pdfReader.loadPDF(filename);
    }

    turnPage(): void {
        this.pdfReader.nextPDFPage();
    }
}

const main = () => {
    const eBookReader = new PDFReaderAdapter();

    eBookReader.openBook('./home/docker/project/');
    eBookReader.turnPage();
}

main();
