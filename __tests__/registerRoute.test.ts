import Fastify, { FastifyInstance } from "fastify";
import { registerRoute } from "../src/routes/registerRoute";
import connectToDB from "../src/database";
import isAlreadyRegistered from "../src/utils/isAlreadyRegistered";
import saveUserToDB from "../src/utils/saveUserToDB";
import encryptPasswd from "../src/utils/encryptPasswd";
import RegisterValidationService from "../src/services/RegisterValidationService";

jest.mock("../src/utils/isAlreadyRegistered");
jest.mock("../src/utils/saveUserToDB");
jest.mock("../src/utils/encryptPasswd");
jest.mock("../src/services/RegisterValidationService");

describe("Test Fastify registerRoute", () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify({ logger: true });
    fastify.register(registerRoute);
    await connectToDB();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("POST /register should create a new user", async () => {
    (isAlreadyRegistered as jest.Mock).mockResolvedValue(false);
    (encryptPasswd as jest.Mock).mockResolvedValue("hashedPassword");
    (saveUserToDB as jest.Mock).mockResolvedValue(undefined);
    (RegisterValidationService.prototype.validateUser as jest.Mock).mockReturnValue({ error: null });

    const response = await fastify.inject({
      method: "POST",
      url: "/register",
      payload: {
        name: "John Doe",
        email: "john@example.com",
        password: "securePassword",
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({ message: "User created successfully" });
  });

  it("POST /register should return 409 if user already exists", async () => {
    (isAlreadyRegistered as jest.Mock).mockResolvedValue(true);

    const response = await fastify.inject({
      method: "POST",
      url: "/register",
      payload: {
        name: "John Doe",
        email: "john@example.com",
        password: "securePassword",
      },
    });

    expect(response.statusCode).toBe(409);
    expect(response.json()).toEqual({ error: "User already exists" });
  });

  it("POST /register should return 400 if validation fails", async () => {
    (RegisterValidationService.prototype.validateUser as jest.Mock).mockReturnValue({
      error: { details: [{ message: "Invalid data" }] },
    });

    const response = await fastify.inject({
      method: "POST",
      url: "/register",
      payload: {
        name: "",
        email: "invalidEmail",
        password: "123",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({ error: "Invalid data" });
  });

  it("POST /register should return 500 on internal server error", async () => {
    (isAlreadyRegistered as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await fastify.inject({
      method: "POST",
      url: "/register",
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Internal server error" });
  });
});
