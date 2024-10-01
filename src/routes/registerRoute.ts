import RegisterController from "../controllers/RegisterController";
import { FastifyInstance } from "fastify";

export const registerRoute = async (fastify: FastifyInstance) => {
	const registerController = new RegisterController();

	fastify.post(
		"/register",
		registerController.registerUser.bind(registerController)
	);
};
