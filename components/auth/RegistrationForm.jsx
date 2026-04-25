"use client";

import { registerUser } from "@/lib/actions/auth.action";
import { useActionState } from "react";
import { z } from "zod";
import { useState } from "react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 digits").regex(/^\d+$/, "Phone must contain only numbers"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

const RegistrationForm = () => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [state, formAction] = useActionState(registerUser, null);

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
    };

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      e.preventDefault();
      const errors = {};
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
    } else {
      setFieldErrors({});
    }
  };

  return (
    <form className="login-form" action={formAction} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Full Name</label>
        <input type="text" name="name" id="name" />
        {fieldErrors.name && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
        )}
      </div>

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

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" name="phone" id="phone" />
        {fieldErrors.phone && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <input className="min-h-16" type="text" name="bio" id="bio" />
        {fieldErrors.bio && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.bio}</p>
        )}
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}

      <button
        type="submit"
        className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;