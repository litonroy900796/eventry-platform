"use server";


import { revalidatePath } from "next/cache";
import { updateGoing, updateInterest } from "../query";
import { Resend } from "resend";
import { eventModel } from "@/models/event-models";
import connectDB from "@/lib/mongodb";
import { PaymentEmailTemplate } from "@/components/payments/PaymentEmailTemplate";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
    console.log("userId:", userId);

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


// dashboard
export async function createEvent(prevState, formData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const data = {
    name: formData.get("name"),
    details: formData.get("details"),
    location: formData.get("location"),
    imageUrl: formData.get("imageUrl"),
  };

  try {
    await connectDB();
    await eventModel.create({
      ...data,
      interested_ids: [],
      going_ids: [],
      swags: [],
      status: session.user.role === "admin" ? "approved" : "pending", // 👈 admin হলে directly approved
      createdBy: session.user.id,
    });

    revalidatePath("/dashboard");
    revalidatePath("/");
  } catch (error) {
    return { error: error.message };
  }

  redirect(
    session.user.role === "admin" ? "/dashboard" : "/my-events" // 👈
  );
}
// approve
export async function approveEvent(eventId) {
  try {
    await connectDB();
    await eventModel.findByIdAndUpdate(eventId, {
      $set: { status: "approved", rejectionReason: "" },
    });

    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
// reject
export async function rejectEvent(eventId, reason) {
  try {
    await connectDB();
    await eventModel.findByIdAndUpdate(eventId, {
      $set: { status: "rejected", rejectionReason: reason },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
// update
export async function updateEvent(eventId, prevState, formData) {
  const data = {
    name: formData.get("name"),
    details: formData.get("details"),
    location: formData.get("location"),
    imageUrl: formData.get("imageUrl"),
  };

  try {
    await connectDB();
    await eventModel.findByIdAndUpdate(eventId, { $set: data });

    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true, message: "Event updated successfully!" };
  } catch (error) {
    return { error: error.message };
  }
}
// delete
export async function deleteEvent(eventId) {
  try {
    await connectDB();
    await eventModel.findByIdAndDelete(eventId);

    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

// swag claim
export async function updateSwags(eventId, prevState, formData) {
  const swags = formData.get("swags");
  const swagsArray = swags.split(",").map((s) => s.trim()).filter(Boolean);

  try {
    await connectDB();
    await eventModel.findByIdAndUpdate(eventId, { $set: { swags: swagsArray } });

    revalidatePath("/dashboard");
    revalidatePath(`/events/${eventId}`);

    return { success: true, message: "Swags updated successfully!" };
  } catch (error) {
    return { error: error.message };
  }
}