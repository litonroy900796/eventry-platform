"use client";

import { signIn } from "next-auth/react"; // 👈 next-auth/react থেকে
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const res = await signIn("credentials", { // 👈 next-auth/react signIn
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setServerError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setServerError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
        {fieldErrors.email && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {fieldErrors.password && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-500 text-sm mt-2">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;