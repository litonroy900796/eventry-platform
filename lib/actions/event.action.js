import { eventModel } from "@/models/event-models";
import { formatDocument, formatDocuments } from "../utils/formatData";

export async function getAllEvents() {
  const events = await eventModel.find({}).lean(); // lean() দিলে plain object আসে
  return formatDocuments(events);
}

// Single Event Get করো
export async function getEventById(id) {
  const event = await eventModel.findById(id).lean();
  return formatDocument(event);
}
