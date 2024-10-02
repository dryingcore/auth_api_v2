import { FastifyInstance } from "fastify";

const dummyRoute = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    return { message: "Requested!" };
  });
};

export default dummyRoute;
