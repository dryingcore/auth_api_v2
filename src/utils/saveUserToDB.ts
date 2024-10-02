import UserModel from "../models/User.model";

export default async function saveUserToDB(name: string, email: string, password: string) {
  try {
    const user = new UserModel({ name, email, password });
    await user.save();
  } catch (error) {
    console.error("Error in saveUserToDB:", error);
    throw new Error("Failed to save user to database");
  }
}
