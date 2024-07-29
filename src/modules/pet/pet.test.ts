import { afterAll, beforeAll, expect, test } from "vitest";
import { FastifyInstance } from "fastify";
import { initTestApp } from "../../test/utils.js";

let app: FastifyInstance;

beforeAll(async () => {
  app = await initTestApp(30001);
});

afterAll(async () => {
  await app.close();
});

test("list all pets", async () => {
  const res = await app.inject({
    method: "get",
    url: "/pets",
  });

  expect(res.statusCode).toBe(200);

  expect(res.json()).toMatchObject({
    pets: expect.arrayContaining(
      expect.objectContaining({
        name: "Pet-1",
      })
    ),
    total: 1,
  });
});
