import { defineConfig, LoadStrategy } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default defineConfig({
  dbName: "pets",
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  loadStrategy: LoadStrategy.JOINED,
  debug: true,
});
