/**
 *  Ejercicio 1: Adaptador de pagos simples
    Contexto: Tu sistema de facturación usa una interfaz PaymentProcessor 
    que espera un método pay(amount: number): void.

    Pero una biblioteca externa que quieres usar implementa la clase ThirdPartyPayService 
    con un método makePayment(total: number): void.
 */

// Target
interface PaymentProcessor {
    pay(amount: number): void;
}

// Adaptee
class ThirdPartyPayService {
    makePayment(total: number): void {
        console.log(`Pagar $${total} usando servicio externo`);
    }
}

// Adapter
class ThirdPartyPayAdapter implements PaymentProcessor {
    private thirdPartyService: ThirdPartyPayService;

    constructor() {
        this.thirdPartyService = new ThirdPartyPayService();
    }

    pay(amount: number): void {
        this.thirdPartyService.makePayment(amount);
    }
}

const main = () => {
    const paymentAmount = 300;

    const thirdPartyProcessor: PaymentProcessor = new ThirdPartyPayAdapter();
    console.log('Usando librería externa');
    thirdPartyProcessor.pay(paymentAmount);
}

main();