import isAlreadyRegistered from "../utils/isAlreadyRegistered";
import RegisterValidationService from "../services/RegisterValidationService";
import RegisterRequestBody from "../types/RegisterRequestBody";
import { FastifyReply, FastifyRequest } from "fastify";
import saveUserToDB from "../utils/saveUserToDB";
import encryptPasswd from "../utils/encryptPasswd";

export default class RegisterController {
  private validationService = new RegisterValidationService();

  public async registerUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = request.body as RegisterRequestBody;
      const hashedPassword = await encryptPasswd(password);

      const { error } = this.validationService.validateUser({ name, email, password });
      if (error) return reply.code(400).send({ error: error.details[0].message });

      if (await isAlreadyRegistered(email)) {
        return reply.code(409).send({ error: "User already exists" });
      }

      await saveUserToDB(name, email, hashedPassword);
      reply.code(201).send({ message: "User created successfully" });
    } catch (error) {
      console.error("Error in registerUser:", error);
      reply.code(500).send({ error: "Internal server error" });
    }
  }
}
