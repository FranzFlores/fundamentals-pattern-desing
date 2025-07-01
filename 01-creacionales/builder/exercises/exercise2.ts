/**
 * Ejercicio 2: Constructor de Emails
    Crear un EmailBuilder para construir correos electrónicos con estructura flexible:
    from, to, subject, body, cc, attachments, etc.

    Requisitos:
    Usa el patrón builder para agregar paso a paso campos opcionales.
    Agrega validaciones mínimas (por ejemplo, to y subject no deben estar vacíos).
    Usa un Director con métodos como buildWelcomeEmail() o buildPasswordResetEmail() que creen emails predefinidos.
    Imprime el email final en formato JSON o string.
 * 
 */

type EmailFormat = 'string' | 'json';

class Email {
    from: string = '';
    to: string = '';
    subject?: string;
    body?: string;
    cc?: string[];
    attachments?: string[];

    printEmail(format: EmailFormat) {
        if (format == 'json') {
            console.log({
                from: this.from,
                to: this.to,
                subject: this.subject,
                body: this.body,
                cc: this.cc,
                attachments: this.attachments
            });

            return;
        }

        console.log(`Información de correo electrónico:
            De: ${this.from} 
            Para: ${this.to}
            Asunto: ${this.subject}
            Cuerpo: ${this.body}
            CC: ${this.cc?.toString() ?? 'Sin copias'}
            Archivos Adjuntos: ${this.attachments?.toString() ?? 'Sin archivos adjuntos'}
        `);
    }
}

class EmailBuilder {
    private email: Email;

    constructor() {
        this.email = new Email();
    }

    reset(): void {
        this.email = new Email();
    }

    addFrom(from: string) {
        this.email.from = from;
        return this;
    }

    addTo(to: string) {
        this.email.to = to;
        return this;
    }

    addSubject(subject: string) {
        this.email.subject = subject;
        return this;
    }

    addBody(body: string) {
        this.email.body = body;
        return this;
    }

    addCC(cc: string[]) {
        this.email.cc = cc;
        return this;
    }

    addAttachments(attachaments: string[]) {
        this.email.attachments = attachaments;
        return this;
    }

    build() {
        if (!this.email.from || !this.email.to) {
            throw new Error('El correo electrónico debe tener un emisor y receptor');
        }

        return this.email;
    }
}

class EmailDirector {
    constructor(
        private builder: EmailBuilder
    ) { }

    buildWelcomeEmail(to: string) {
        this.builder.reset();
        this.builder.addTo(to);
        this.builder.addFrom('Sistema de Correos Electrónicos');
        this.builder.addSubject('Correo de Bienvenida');
        this.builder.addBody('Bienviendo al Sistema de Correos Electrónicos');
        this.builder.addAttachments(['bienvenida.jpg']);
    }

    buildPasswordResetEmail(to: string) {
        this.builder.reset();
        this.builder.addTo(to);
        this.builder.addFrom('Sistema de Correos Electrónicos');
        this.builder.addSubject('Correo de recuperación de contraseña');
        this.builder.addBody('La contraseña a utilizar dentro del sistema es: ******');
    }
}

const main = () => {
    const email = new EmailBuilder()
        .addTo('Nicolas')
        .addFrom('Franz')
        .addSubject('Correo de Prueba')
        .addAttachments(['prueba.jpg'])
        .addCC(['Valeria'])
        .build();

    email.printEmail('json');

    const emailBuilder = new EmailBuilder();
    const director = new EmailDirector(emailBuilder);

    director.buildWelcomeEmail('Ricardo');
    const welcomeEmail = emailBuilder.build();
    welcomeEmail.printEmail('string');

    director.buildPasswordResetEmail('Francisco');
    const passwordEmail = emailBuilder.build();
    passwordEmail.printEmail('string');
}

main();
