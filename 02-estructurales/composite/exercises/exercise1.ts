/* 

Objetivo: Modelar un menú de aplicación donde items y submenús se traten de forma uniforme.

Requisitos:
Define una interfaz común MenuComponent
label: string
render(indent?: string): string
enable(): void, disable(): void
isEnabled(): boolean

Hoja: MenuItem (no puede contener hijos).
Compuesto: MenuGroup (contiene MenuComponent[]).
render() debe:

Incluir el label y un indicador [ON] / [OFF].
Indentar hijos con dos espacios por nivel.
MenuGroup debe permitir add() y remove().

Criterios de aceptación:
Crear un menú raíz con al menos 2 grupos y 3 items repartidos.
Deshabilitar un grupo y verificar que todos sus descendientes reporten [OFF] en render().
render() devuelve un string multi-línea exacto (útil para tests). 
*/

interface MenuComponent {
    label: string;

    render(indent?: string): string;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
}

class MenuItem implements MenuComponent {
    private status: boolean = true;
    constructor(public label: string) { }

    render(indent: string = ""): string {
        return `${indent} - ${this.label} ${this.status ? "[ON]" : "[OFF]"}`;
    }

    enable(): void { this.status = true; }

    disable(): void { this.status = false; }

    isEnabled(): boolean { return this.status; }
}

class MenuGroup implements MenuComponent {
    private status: boolean = true;
    private items: MenuComponent[] = [];

    constructor(public label: string) { }

    add(item: MenuComponent) {
        this.items.push(item);
    }

    remove(item: MenuComponent) {
        this.items = this.items.filter(x => x !== item);
    }

    enable(): void {
        this.status = true;
        this.items.map(x => x.enable());
    }


    disable(): void {
        this.status = false;
        this.items.map(x => x.disable());
    }

    isEnabled(): boolean {
        return this.status;
    }

    render(indent: string = ""): string {
        const state = this.status ? "[ON]" : "[OFF]";
        const lines = [`${indent}+ ${this.label}${state}`];

        const next = indent + " ";
        this.items.map(x => lines.push(x.render(next)));

        return lines.join("\n");
    }
}

const main = () => {
    const root = new MenuGroup('root');
    const group1 = new MenuGroup('grupo 1');
    const group2 = new MenuGroup('grupo 2');
    
    group1.add(new MenuItem('Item 1'));
    group1.add(new MenuItem('Item 2'));
    group1.add(new MenuItem('Item 3'));
    
    group2.add(new MenuItem('Item 4'));
    group2.add(new MenuItem('Item 5'));
    group2.add(new MenuItem('Item 6'));
    
    root.add(group1);
    root.add(group2);
    
    group1.disable();
    console.log(root.render());
}

main();
