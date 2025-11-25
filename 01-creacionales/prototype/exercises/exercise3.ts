/**
 *  Ejercicio 3: Sistema de diseño gráfico
    Contexto: Estás simulando un sistema de diseño gráfico con diferentes tipos de formas: 
    Circle, Rectangle y Triangle. Todas las formas deben poder clonarse.

    Reto:
    Define una clase base abstracta Shape con un método clone(): Shape.
    Cada forma concreta (círculo, rectángulo, triángulo) debe tener propiedades distintas, 
    como radius, width, height, color, etc.
    Implementa una función que reciba un arreglo de formas y devuelva un nuevo arreglo con sus clones.

    Requisitos:
    Usa polimorfismo y el patrón Prototype.
    Verifica que las instancias originales y clonadas no sean iguales, pero tengan los mismos valores.
    Puedes usar instanceof para imprimir el tipo de cada forma clonada.
 * 
*/

interface Prototype<T> {
    clone(): T;
}

abstract class Shape implements Prototype<Shape> {
    constructor(
        public color: string,
        public x: number,
        public y: number
    ) { }

    abstract clone(): Shape;
}

class Circle extends Shape {
    constructor(
        color: string,
        x: number,
        y: number,
        public radius: number,
    ) {
        super(color, x, y);
    }

    override clone(): Shape {
        return new Circle(this.color, this.x, this.y, this.radius);
    }
}

class Rectangle extends Shape {
    constructor(
        color: string,
        x: number,
        y: number,
        public width: number,
        public height: number,
    ) {
        super(color, x, y);
    }

    override clone(): Shape {
        return new Rectangle(this.color, this.x, this.y, this.width, this.height);
    }
}

class Triangle extends Shape {
    constructor(
        color: string,
        x: number,
        y: number,
        public base: number,
        public height: number,
    ) {
        super(color, x, y);
    }

    override clone(): Shape {
        return new Triangle(this.color, this.x, this.y, this.base, this.height);
    }
}

const cloneShapes = (shapes: Shape[]): Shape[] => {
    return shapes.map(x => x.clone());
}

const main = () => {
    const shapes: Shape[] = [
        new Circle('blue', 0, 0, 10),
        new Rectangle('green', 10, 10, 20, 30),
        new Triangle('yellow', 20, 20, 10, 15)
    ];

    const clonedShapes = cloneShapes(shapes);
    console.log('=== RESULTADOS ===');
    clonedShapes.map((shape, index) => {
        console.log(`\nForma #${index + 1}:`);
        console.log('Original:', shapes[index]);
        console.log('Clonado :', shape);
        console.log('¿Son la misma instancia?', shapes[index] === shape); // false
        console.log('Tipo:', shape.constructor.name);
    });
}

main();


