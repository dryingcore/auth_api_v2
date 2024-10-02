import Fastify, { FastifyInstance } from "fastify";
import dummyRoute from "../src/routes/dummyRoute";
import connectToDB from "../src/database";

describe("Test Fastify dummyRoute", () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify({ logger: true });
    fastify.register(dummyRoute);
    await connectToDB();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("GET / should return a message", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      message: "Requested!",
    });
  });
});
