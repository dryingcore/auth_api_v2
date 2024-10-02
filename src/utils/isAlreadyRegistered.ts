import UserModel from "../models/User.model";

export default async function isAlreadyRegistered(email: string) {
  const user = await UserModel.findOne({ email });
  return !!user;
}
