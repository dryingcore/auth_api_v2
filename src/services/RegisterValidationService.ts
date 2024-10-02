import Joi, { ObjectSchema, ValidationResult } from "joi";
import RegisterRequestBody from "@/types/RegisterRequestBody";

export default class RegisterValidationService {
  private schema: ObjectSchema;

  constructor() {
    this.schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(4).max(1024).required(),
    });
  }

  public validateUser(data: RegisterRequestBody): ValidationResult {
    return this.schema.validate(data);
  }
}
