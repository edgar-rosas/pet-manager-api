import { RequestContext} from "@mikro-orm/core";
import {fastify} from "fastify";
import {initORM} from "./db.js";

export async function bootstrap(port = 3000) {
    const db = await  initORM();
    const app = fastify();

    app.addHook("onRequest", (_request, _reply, done) => {
        RequestContext.create(db.em, done);
    });

    app.addHook("onClose", async () => {
        await db.orm.close();
    });

    app.get("/", (_request, reply) => {
        reply.send("Hello!");
    })

    app.get('/pets', async () => {
        const [pets, total] = await db.pet.findAndCount({});

        return { pets, total };
    });

    const url = await app.listen({port, host: '0.0.0.0'});

    return {app, url};
}
