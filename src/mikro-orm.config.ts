import { defineConfig, LoadStrategy } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SeedManager } from "@mikro-orm/seeder";

export default defineConfig({
  dbName: process.env.POSTGRES_DB ?? "pet_manager",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  user: process.env.POSTGRES_USER ?? "postgres",
  password: process.env.POSTGRES_PASSWORD ?? "password",
  extensions: [SeedManager],
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  loadStrategy: LoadStrategy.JOINED,
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
  dynamicImportProvider: (id) => import(id),
  debug: true,
});
