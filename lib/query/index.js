import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "../utils/data-util";
import bcrypt from "bcryptjs";

async function getAllEvents() {
    const allEvents = await eventModel.find().lean();
    return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
    const event = await eventModel.findById(eventId).lean();
    return replaceMongoIdInObject(event);
}

async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await userModel.create({ ...user, password: hashedPassword });
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne({ email: credentials.email }).lean();
  
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  return replaceMongoIdInObject(user);
}

export async function updateInterest(eventId, userId) {
  const event = await eventModel.findById(eventId).lean();

  if (!event) throw new Error("Event not found");

  const alreadyInterested = event.interested_ids.includes(userId);

  const updatedEvent = await eventModel.findByIdAndUpdate(
    eventId,
    alreadyInterested
      ? { $pull: { interested_ids: userId } }
      : { $addToSet: { interested_ids: userId } },
    { new: true }
  );

  return replaceMongoIdInObject(updatedEvent.toObject());
}
export {
    getAllEvents,
    getEventById,
    createUser,
    findUserByCredentials,
    updateInterest
}