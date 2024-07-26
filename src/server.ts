import { bootstrap } from "./app.js";

try {
  const { url } = await bootstrap(Number(process.env.PORT));
  console.log(`Server is now running at ${url}`);
} catch (e) {
  console.error(e);
}
