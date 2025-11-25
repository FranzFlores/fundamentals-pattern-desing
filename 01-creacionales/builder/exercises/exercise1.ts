/**
 * Crea un UserBuilder que permita construir objetos de tipo User con propiedades opcionales 
 * 
 * Requisitos:
 * Implementar un método build() que retorne el objeto User.
 * Permitir encadenamiento de métodos (withName(), withEmail(), etc.).
 * Mostrar el resultado con un método tipo showInfo().
 * 
 */

class User {
    name: string = '';
    email: string = '';
    age?: number;
    role?: string;

    showInfo() {
        console.log(`Información del usuario:
            - nombre: ${this.name}
            - correo electrónico: ${this.email}
            - edad: ${this.age ?? 'Indefinida'}
            - rol: ${this.role ?? 'Indefinido'}
        `);
    }
}

class UserBuilder {
    private user: User;

    constructor() {
        this.user = new User();
    }

    withName(name: string) {
        this.user.name = name;
        return this;
    }

    withEmail(email: string) {
        this.user.email = email;
        return this;
    }

    withAge(age: number) {
        this.user.age = age;
        return this;
    }

    withRole(role: string) {
        this.user.role = role;
        return this;
    }

    build() {
        if (!this.user.name || !this.user.email) {
            throw new Error('El nombre y correo electrónico son requeridos');
        }

        return this.user;
    }
}

const main = () => {
    const user = new UserBuilder()
        .withName('Franz Andrés Flores')
        .withEmail('andresflores@gmail.com')
        .withAge(26)
        .withRole('Administrador')
        .build();

    user.showInfo();
}

main();
