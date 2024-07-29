import { bootstrap } from "../app.js";
import { initORM } from "../db.js";
import { PetSeeder } from "../seeders/PetSeeder.js";

export async function initTestApp(port: number) {
  const { orm } = await initORM({
    debug: false,
    dbName: ":memory:",
  });

  await orm.schema.createSchema();
  await orm.seeder.seed(PetSeeder);

  const { app } = await bootstrap(port);

  return app;
}
