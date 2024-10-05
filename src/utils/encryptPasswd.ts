import bcrypt from "bcryptjs";

export default async function encryptPasswd(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
