import { MikroORM, RequestContext } from "@mikro-orm/core";
import { fastify } from "fastify";

export async function bootstrap(port = 3000) {
  const orm = await MikroORM.init();
  const app = fastify();

  app.addHook("onRequest", (_request, _reply, done) => {
    RequestContext.create(orm.em, done);
  });

  app.addHook("onClose", async () => {
    await orm.close();
  });

  const url = await app.listen({ port });

  return { app, url };
}
