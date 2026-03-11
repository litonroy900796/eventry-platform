"use server";
import { createUser } from "../query";

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  console.log("user", user, created);

  redirect("/login");
}

export { registerUser };
