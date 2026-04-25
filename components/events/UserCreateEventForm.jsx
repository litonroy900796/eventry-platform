"use client";

import { createEvent } from "@/lib/actions/event.action";
import { useActionState } from "react";
import { useState } from "react";
import { z } from "zod";

const eventSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  details: z.string().min(10, "Details must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  imageUrl: z.string().url("Invalid image URL"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  organizer: z.string().min(2, "Organizer name is required"),
  category: z.string().min(1, "Category is required"),
  ticketPrice: z.string(),
  capacity: z.string().optional(),
  website: z.string().optional(),
});

const categories = ["Technology", "Business", "Music", "Sports", "Arts", "Education", "Other"];

export default function UserCreateEventForm() {
  const [fieldErrors, setFieldErrors] = useState({});
  const [state, formAction] = useActionState(createEvent, null);

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const result = eventSchema.safeParse(data);
    if (!result.success) {
      e.preventDefault();
      const errors = {};
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
    } else {
      setFieldErrors({});
    }
  };

  return (
       <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Event Name</label>
        <input type="text" name="name" placeholder="Enter event name"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
        {fieldErrors.name && <p className="text-red-500 text-xs">{fieldErrors.name}</p>}
      </div>
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Organizer</label>
        <input type="text" name="organizer" placeholder="Organizer name"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
        {fieldErrors.organizer && <p className="text-red-500 text-xs">{fieldErrors.organizer}</p>}
      </div>
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Category</label>
        <select name="category"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {fieldErrors.category && <p className="text-red-500 text-xs">{fieldErrors.category}</p>}
      </div>
 
      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[#9C9C9C] text-sm">Date</label>
          <input type="date" name="date"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm" />
          {fieldErrors.date && <p className="text-red-500 text-xs">{fieldErrors.date}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-[#9C9C9C] text-sm">Time</label>
          <input type="time" name="time"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm" />
          {fieldErrors.time && <p className="text-red-500 text-xs">{fieldErrors.time}</p>}
        </div>
      </div>
 
      {/* Ticket Price & Capacity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[#9C9C9C] text-sm">Ticket Price ($)</label>
          <input type="number" name="ticketPrice" placeholder="0 = Free" min="0" defaultValue={0}
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[#9C9C9C] text-sm">Capacity <span className="text-[#555]">(optional)</span></label>
          <input type="number" name="capacity" placeholder="Unlimited" min="1"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
        </div>
      </div>
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Location</label>
        <input type="text" name="location" placeholder="Enter event location"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
        {fieldErrors.location && <p className="text-red-500 text-xs">{fieldErrors.location}</p>}
      </div>
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Website <span className="text-[#555]">(optional)</span></label>
        <input type="url" name="website" placeholder="https://yourevent.com"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
      </div>
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Image URL</label>
        <input type="text" name="imageUrl" placeholder="Enter image URL"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555]" />
        {fieldErrors.imageUrl && <p className="text-red-500 text-xs">{fieldErrors.imageUrl}</p>}
      </div>
 
      <div className="space-y-1.5">
        <label className="text-[#9C9C9C] text-sm">Details</label>
        <textarea name="details" rows={4} placeholder="Describe your event in detail"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 px-3 rounded-md text-white text-sm placeholder:text-[#555] resize-none" />
        {fieldErrors.details && <p className="text-red-500 text-xs">{fieldErrors.details}</p>}
      </div>
 
      <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-md px-3 py-2.5">
        <p className="text-indigo-400 text-sm">
          Your event will be reviewed and published within 24 hours after approval.
        </p>
      </div>
 
      {state?.error && (
        <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
          {state.error}
        </p>
      )}
 
      <button type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[.99] text-white text-sm font-medium py-2.5 rounded-md transition-all mt-1">
        Submit for Review
      </button>
 
    </form>
  );
}