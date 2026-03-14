"use server";
import { createUser, findUserByCredentials } from "../query";

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  console.log("user", user, created);
  redirect("/login");
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}

export { registerUser, performLogin };
