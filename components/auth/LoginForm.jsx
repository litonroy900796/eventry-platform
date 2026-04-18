"use client";
import { useAuth } from "@/hooks/useAuth";
import { performLogin } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginForm() {
  const { setAuth } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const result = await performLogin(formData);
      console.log("Login successful:", result, formData);
      if (result) {
        setAuth(result);
        router.push("/");
      } else {
        setError("Please provide a valid login credential");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" required />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
