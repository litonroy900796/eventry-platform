"use client";

import { processPayment } from "@/lib/actions/event.action";
import { useSession } from "next-auth/react";
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

const InputField = ({ label, id, error, children }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-[#9C9C9C]">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PaymentForm = ({ eventId }) => {
  const { data: session } = useSession();
  const [clientErrors, setClientErrors] = useState({});

  const processPaymentWithId = processPayment.bind(null, eventId);
  const [state, formAction] = useActionState(processPaymentWithId, null);

  // Auto format card number with spaces
  const handleCardInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    e.target.value = value;
  };

  // Auto format expiry MM/YY
  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2);
    e.target.value = value;
  };

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
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
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setClientErrors(errors);
    } else {
      setClientErrors({});
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="userId" value={session?.user?.id || ""} />

      {/* Personal Info */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-widest">
          Personal Information
        </p>

        <InputField label="Full Name" id="name" error={clientErrors.name}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-4 rounded-lg text-white placeholder-[#6b6b8a] transition-colors"
          />
        </InputField>

        <InputField label="Email Address" id="email" error={clientErrors.email}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-4 rounded-lg text-white placeholder-[#6b6b8a] transition-colors"
          />
        </InputField>
      </div>

      <hr className="border-[#CCCCCC]/10" />

      {/* Card Info */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-widest">
          Card Details
        </p>

        <InputField label="Card Number" id="card" error={clientErrors.card}>
          <div className="relative">
            <input
              type="text"
              id="card"
              name="card"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              onInput={handleCardInput}
              className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 pl-4 pr-14 rounded-lg text-white placeholder-[#6b6b8a] tracking-widest transition-colors"
            />
            {/* Card Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
              <div className="w-6 h-4 bg-yellow-400 rounded-sm opacity-80" />
              <div className="w-6 h-4 bg-red-500 rounded-sm opacity-80 -ml-3" />
            </div>
          </div>
        </InputField>

        <div className="grid grid-cols-2 gap-4">
          <InputField label="Expiry Date" id="expiry" error={clientErrors.expiry}>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              maxLength={5}
              onInput={handleExpiryInput}
              className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-4 rounded-lg text-white placeholder-[#6b6b8a] tracking-widest transition-colors"
            />
          </InputField>

          <InputField label="CVV" id="cvv" error={clientErrors.cvv}>
            <div className="relative">
              <input
                type="password"
                id="cvv"
                name="cvv"
                placeholder="•••"
                maxLength={3}
                className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-4 rounded-lg text-white placeholder-[#6b6b8a] tracking-widest transition-colors"
              />
            </div>
          </InputField>
        </div>
      </div>

      {/* Secure Badge */}
      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5">
        <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-green-400 text-xs">Your payment is secured with SSL encryption</p>
      </div>

      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
          <p className="text-red-400 text-sm">{state.error}</p>
        </div>
      )}
      {state?.success && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5">
          <p className="text-green-400 text-sm">{state.message}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-800 active:scale-95 text-white font-semibold py-3 rounded-lg transition-all"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;