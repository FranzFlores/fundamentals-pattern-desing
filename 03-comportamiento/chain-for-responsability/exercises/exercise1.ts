
interface Handler<TReq, TRes> {
    setNext(handler: Handler<TReq, TRes>): Handler<TReq, TRes>;
    handle(req: TReq): TRes;
}

abstract class BaseHandler<TReq, TRes> implements Handler<TReq, TRes> {
    private next: Handler<TReq, TRes> | null = null;

    setNext(h: Handler<TReq, TRes>): Handler<TReq, TRes> {
        this.next = h;
        return h;
    }

    protected handleNext(req: TReq): TRes {
        return this.next ? this.next.handle(req) : ("OK" as unknown as TRes);
    }

    abstract handle(req: TReq): TRes;
}

type Message = { text: string };

class ForbiddenWordsHandler extends BaseHandler<Message, string> {
    override handle(req: Message): string {
        if (req.text.includes('spam') || req.text.includes('oferta') || req.text.includes('casino')) {
            return `Bloqueado por palabra prohibida: ${req.text}`;
        }

        return this.handleNext(req);
    }
}

class LinkCountHandler extends BaseHandler<Message, string> {
    handle(req: Message): string {
        const amount = req.text.match(/https?:\/\//gi)?.length ?? 0;
        if (amount > 1) {
            return `Bloqueado por exceso de enlaces (${amount})`;
        }

        return this.handleNext(req);
    }
}

class MinLengthHandler extends BaseHandler<Message, string> {
    constructor(private minLen: number) { super(); }
    handle(req: Message): string { 
        if (this.minLen > req.text.trim().length) {
            return `Bloqueado por longitud mínima`;
        }

        return this.handleNext(req);
    }
}

const main = () => {
    const forbiddenWordsHandler = new ForbiddenWordsHandler();
    const linkCountHandler = new LinkCountHandler();
    const minLengthHandler = new MinLengthHandler(5);

    forbiddenWordsHandler
        .setNext(linkCountHandler)
        .setNext(minLengthHandler);

    console.log(forbiddenWordsHandler.handle({ text: 'Hola, ¿me ayudas?' }));
    console.log(forbiddenWordsHandler.handle({ text: 'Gran OFERTA en casino' }));
    console.log(forbiddenWordsHandler.handle({ text: 'mira http://a.com y http://b.com' }));
    console.log(forbiddenWordsHandler.handle({ text: 'hola' }));
}

main();
