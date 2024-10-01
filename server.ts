import Fastify from "fastify";
import connectToDB from "./src/database";
import dummyRoute from "./src/routes/dummyRoute";
import { registerRoute } from "./src/routes/registerRoute";

const fastify = Fastify({ logger: true });

fastify.register(dummyRoute);
fastify.register(registerRoute);

const start = async () => {
	try {
		await connectToDB();
		await fastify.listen({ port: 3000 });
		console.log("Server is running at http://localhost:3000");
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
