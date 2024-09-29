import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const dummyRoute = async (fastify: FastifyInstance) => {
	fastify.get("/", async (req: FastifyRequest, res: FastifyReply) => {
		return { message: "Requested!" };
	});
};

export default dummyRoute;
