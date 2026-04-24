"use client";

import { useAuth } from "@/hooks/useAuth";
import { processPayment } from "@/lib/actions/event.action";
import { useActionState } from "react";
import { z } from "zod";
import { useState } from "react";

const paymentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  card: z.string().length(16, "Card number must be 16 digits").regex(/^\d+$/, "Card must contain only numbers"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY format"),
  cvv: z.string().length(3, "CVV must be 3 digits").regex(/^\d+$/, "CVV must contain only numbers"),
});

const PaymentForm = ({ eventId }) => {
  const { auth } = useAuth();
  const [clientErrors, setClientErrors] = useState({});

  const processPaymentWithId = processPayment.bind(null, eventId);
  const [state, formAction] = useActionState(processPaymentWithId, null);

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget); // 👈 e.target এর বদলে e.currentTarget
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      card: formData.get("card"),
      expiry: formData.get("expiry"),
      cvv: formData.get("cvv"),
    };

    const result = paymentSchema.safeParse(data);

    if (!result.success) {
      e.preventDefault();
      const errors = {};
      result.error.issues.forEach((err) => { // 👈 errors এর বদলে issues
        errors[err.path[0]] = err.message;
      });
      setClientErrors(errors);
    } else {
      setClientErrors({});
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input type="hidden" name="userId" value={auth?.id || ""} />

      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
        {clientErrors.name && <p className="text-red-500 text-sm">{clientErrors.name}</p>}
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
        {clientErrors.email && <p className="text-red-500 text-sm">{clientErrors.email}</p>}
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">Card Number</label>
        <input
          type="text"
          id="card"
          name="card"
          maxLength={16}
          placeholder="1234567812345678"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
        {clientErrors.card && <p className="text-red-500 text-sm">{clientErrors.card}</p>}
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">Expiry Date</label>
        <input
          type="text"
          id="expiry"
          name="expiry"
          placeholder="MM/YY"
          maxLength={5}
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
        {clientErrors.expiry && <p className="text-red-500 text-sm">{clientErrors.expiry}</p>}
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          maxLength={3}
          placeholder="123"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
        {clientErrors.cvv && <p className="text-red-500 text-sm">{clientErrors.cvv}</p>}
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.message}</p>}

      <button
        type="submit"
        className="w-full my-8 bg-indigo-600 hover:bg-indigo-800 py-2 rounded-md"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;