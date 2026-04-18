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

export {
    getAllEvents,
    getEventById,
    createUser,
    findUserByCredentials
}