"use server";


import { revalidatePath } from "next/cache";
import { updateInterest } from "../query";

export async function toggleInterest(eventId, userId) {
  try {
    await updateInterest(eventId, userId);
    revalidatePath(`/`);
  } catch (error) {
    throw error;
  }
}