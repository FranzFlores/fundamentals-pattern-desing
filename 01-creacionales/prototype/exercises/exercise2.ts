/**
 *  Ejercicio 2: Clonación de Documentos con Datos Anidados (Nivel medio)
    Contexto: Estás modelando un sistema de documentos legales. Cada documento tiene:
        title
        content
        metadata: un objeto que contiene createdBy, createdAt, y tags (un array de strings).

    Reto: Implementa el patrón Prototype asegurando que el clon sea profundo (deep copy), 
    es decir, modificar el metadata del clon no debe afectar al original.

    Requisitos:
    Implementa una clase LegalDocument con los atributos mencionados.
    El método clone() debe copiar profundamente el objeto.
    Crea un documento, clónalo, modifica el clon, y muestra en consola que el original no se vio afectado.
 * 
 */

interface Prototype<T> {
    clone(): T;
}

interface Metadata {
    createdBy: string,
    createdAt: Date,
    tags: string[];
}

class LegalDocument implements Prototype<LegalDocument> {
    constructor(
        public title: string,
        public content: string,
        public metadata: Metadata
    ) { }

    clone(): LegalDocument {
        const metadata: Metadata = { ...this.metadata };

        return new LegalDocument(
            this.title,
            this.content,
            metadata
        );
    }

    printLegalDocument() {
        console.log(`
            \n Información del Documento Legal
            título: ${this.title}
            contenido: ${this.content}
            metadata: ${JSON.stringify(this.metadata)}
        `);
    }
}

const main = () => {
    const metadataVehicleDocument: Metadata = {
        createdBy: "Franz Flores",
        createdAt: new Date(),
        tags: ['Venta', 'Vehículo']
    }

    const vehicleDocument = new LegalDocument(
        'Compra de Vehículo',
        'Documento de traspaso de vehículo',
        metadataVehicleDocument
    );
    vehicleDocument.printLegalDocument();

    const motorBikeDocument = vehicleDocument.clone();
    motorBikeDocument.title = 'Venta de Moto';
    motorBikeDocument.metadata = {
        createdBy: "María José",
        createdAt: new Date(),
        tags: ['Venta', 'Moto']
    }
    motorBikeDocument.printLegalDocument();
}

main();