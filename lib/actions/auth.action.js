"use server";

import { createUser, findUserByCredentials } from "../query";
import { z } from "zod";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(11, "Phone must be at least 11 digits").regex(/^\d+$/, "Phone must contain only numbers"), // 👈
  bio: z.string().min(10, "Bio must be at least 10 characters"), // 👈
});

async function performLogin(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const user = await findUserByCredentials(result.data);
  return user;
}

async function registerUser(prevState, formData) {
  const user = Object.fromEntries(formData);

  const result = registerSchema.safeParse(user);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await createUser(result.data);
  redirect("/login");
}

export { performLogin, registerUser };