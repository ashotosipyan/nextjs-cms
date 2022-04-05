import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import executeQuery from "./db";

export async function createUser({ email, password }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    id: uuidv4(),
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    email,
    hash,
    salt,
  };

  try {
    const result = await executeQuery({
      query: "INSERT INTO users (id, email, hash) VALUES(?, ?, ?)",
      values: [user.id, user.email, user.hash],
    });
    console.log({ result });
  } catch (error) {
    console.log(error);
  }

  return user;
}
