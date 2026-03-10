import { eventModel } from "@/models/event-models";
import { formatDocuments } from "../utils/formatData";

export async function getAllEvents() {
  const events = await eventModel.find({}).lean(); // lean() দিলে plain object আসে
  return formatDocuments(events);
}
