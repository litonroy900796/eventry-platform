import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "../utils/data-util";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

async function getAllEvents(search = "") {
  const filter = {
    status: "approved", // 👈 শুধু approved events
    ...(search && {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    }),
  };
  const allEvents = await eventModel.find(filter).lean();
  return replaceMongoIdInArray(allEvents);
}

async function getPendingEvents() {
  const events = await eventModel.find({ status: "pending" }).lean();
  return replaceMongoIdInArray(events);
}
async function getUserEvents(userId) {
  const events = await eventModel.find({ createdBy: userId }).lean();
  return replaceMongoIdInArray(events);
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
  console.log("DB user:", user);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  return replaceMongoIdInObject(user);
}

async function updateInterest(eventId, userId) {
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

async function updateGoing(eventId, authId) {
    const event = await eventModel.findById(eventId);
    console.log("event:", event);
    if (!event) throw new Error("Event not found");
    
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
    await event.save(); // await missing ছিল
    
    return replaceMongoIdInObject(event.toObject());
}

async function getGoingUsersByEvent(eventId) {
  const event = await eventModel
    .findById(eventId)
    .populate("going_ids", "name email phone") // 👈 populate with user fields
    .lean();

  if (!event || !event.going_ids) return [];

  return event.going_ids.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
  }));
}
export {
    getAllEvents,
    getEventById,
    createUser,
    findUserByCredentials,
    updateInterest,
    updateGoing,
    getPendingEvents,
    getUserEvents,
    getGoingUsersByEvent
}