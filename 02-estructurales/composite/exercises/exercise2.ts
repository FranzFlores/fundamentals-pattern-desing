/**
 * Objetivo: Vender productos individuales y paquetes que contienen productos/paquetes, aplicando descuentos a nivel paquete.
 * 
 * Requisitos: 
 * Interfaz Sellable:
    name: string
    getPrice(): number
    getItemsCount(): number (cuenta hojas)
    find(predicate: (s: Sellable) => boolean): Sellable[]

*  Hoja: Product con basePrice.
*  Compuesto: Bundle con:
    hijos Sellable[]
    discountPercent (0–100) aplicado solo al subtotal de sus hijos.

* getPrice() en Bundle = sum(hijos) * (1 - discount/100).
* find() debe recorrer todo el árbol (incluyendo bundles) y devolver coincidencias. 
*/

interface Sellable {
    name: string;

    getPrice(): number;
    getItemsCount(): number;
    find(predicate: (s: Sellable) => boolean): Sellable[];
}

class Product implements Sellable {
    constructor(
        public name: string,
        public basePrice: number
    ) {
        if (basePrice < 0) throw new Error("El precio base no puede ser negativo");
    }

    getPrice(): number { return this.basePrice }
    
    getItemsCount(): number { return 1; }

    find(predicate: (s: Sellable) => boolean): Sellable[] {
        return predicate(this) ? [this] : [];
    }

}

class Bundle implements Sellable {
    private items: Sellable[];
    private discountPercent: number;

    constructor(
        public name: string,
        items: Sellable[],
        discountPercent: number
    ) {
        this.items = [...items];
        if (discountPercent < 0 || discountPercent > 100) {
            throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
        }

        this.discountPercent = discountPercent;
    }

    add(item: Sellable): void {
        this.items.push(item);
    }

    removeByName(name: string): number {
        const before = this.items.length;

        this.items = this.items.filter(x => x.name !== name);
        return before - this.items.length;
    }

    getPrice(): number {
        const subtotal = this.items.reduce((acc, s) => acc + s.getPrice(), 0);
        const total = subtotal * (1 - this.discountPercent / 100);

        return Math.round(total * 100) / 100;
    }

    getItemsCount() {
        return this.items.reduce((acc, s) => acc + s.getItemsCount(), 0);
    }

    find(predicate: (s: Sellable) => boolean): Sellable[] {
        const matchesSelf = predicate(this) ? [this] : [];
        const matchesItems = this.items.flatMap(c => c.find(predicate));
        return [...matchesSelf, ...matchesItems];
    }

    setDiscount(percent: number): void {
        if (percent < 0 || percent > 100) {
            throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
        }
        this.discountPercent = percent;
    }

    getItems(): Sellable[] {
        return [...this.items];
    }
}

const main = () => {
    const p1 = new Product("Teclado", 30);
    const p2 = new Product("Mouse", 20);
    const p3 = new Product("Pad", 10);
    
    const peris = new Bundle("Periféricos", [p1, p2, p3], 10);
    const pc = new Bundle("PC Gamer", [peris, new Product("GPU", 300)], 5);
    
    console.log("Precio Periféricos:", peris.getPrice());
    console.log("Items Periféricos:", peris.getItemsCount()); 
    console.log("Precio PC:", pc.getPrice());   
    console.log("Items PC:", pc.getItemsCount());
    
    const found = pc.find(s => s.name.toLowerCase().includes("perif"));
    console.log("find('perif'):", found.map(x => x.name));
    
    
    const removed = pc.removeByName("Periféricos");
    console.log("removeByName ->", removed);                 // 1
    console.log("Items PC después:", pc.getItemsCount());   
}

main();
