/**
 *  Ejercicio 2: Generador de productos
    Objetivo: Crear una función fábrica que devuelva productos con precio calculado y validación.

    Requisitos:
    - Define una función createProduct que reciba:
        - name: string
        - basePrice: number
        - taxRate: number (opcional, default 0.12)

    Devuelve un objeto con:
    - name
    - basePrice
    - taxRate
    - finalPrice: basePrice + (basePrice * taxRate)

    Extra: Valida que basePrice sea mayor que cero.
 */

type Product = {
    name: string;
    basePrice: number;
    taxRate: number;
    finalPrice: number;
};

export const createProduct = (name: string, basePrice: number, taxRate: number = 0.12) => {
    if (basePrice <= 0) {
        throw new Error('El precio base debe ser mayor a cero');
    }

    const finalPrice = basePrice + (basePrice * taxRate);

    return {
        name,
        basePrice,
        taxRate,
        finalPrice
    }
}

const main = () => {
    const product = createProduct('TV', 550);
    console.log('La información del producto 1 es', product);

    const product1 = createProduct('CPU', 780, 0.15);
    console.log('La información del producto 1 es', product1);
}

main();