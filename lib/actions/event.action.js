"use server";


import { revalidatePath } from "next/cache";
import { updateGoing, updateInterest } from "../query";
import { Resend } from "resend";
import { PaymentEmailTemplate } from "@/components/payments/PaymentEmailTemplate";

export async function toggleInterest(eventId, userId) {
  try {
    await updateInterest(eventId, userId);
    revalidatePath(`/`);
  } catch (error) {
    throw error;
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function processPayment(eventId, prevState, formData) { // 👈 eventId first param
    const name = formData.get("name");
    const userId = formData.get("userId");
    const email = formData.get("email");
    const card = formData.get("card");
    const expiry = formData.get("expiry");
    const cvv = formData.get("cvv");
       console.log("eventId:", eventId); // 👈 দেখো কী আসছে
    console.log("userId:", email);

    if (!name || !email || !card || !expiry || !cvv) {
        return { error: "All fields are required" };
    }

    try {
        await updateGoing(eventId, userId);

        await resend.emails.send({
            from: "Eventry Platform <onboarding@resend.dev>",
            to: email,
            subject: "Your Payment is Confirmed - Eventry Platform",
            react: PaymentEmailTemplate({ name, email, amount: formData.get("amount") }),
        });

        return { success: true, message: "Payment successful! Email sent." };
    } catch (error) {
        return { error: error.message };
    }
}