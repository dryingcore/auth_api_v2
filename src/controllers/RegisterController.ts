import RegisterValidationService from "../services/RegisterValidationService";
import RegisterRequestBody from "../types/RegisterRequestBody";
import { FastifyReply, FastifyRequest } from "fastify";

export default class RegisterController {
	private validationService: RegisterValidationService;

	constructor() {
		this.validationService = new RegisterValidationService();
	}

	public async registerUser(request: FastifyRequest, reply: FastifyReply) {
		const { name, email, password } = request.body as RegisterRequestBody;

		const { error } = this.validationService.validateUser({
			name,
			email,
			password,
		});

		if (error) {
			return reply.code(400).send({ error: error.details[0].message });
		}

		return reply.code(201).send({ message: "User created successfully" });
	}
}
