"use client";

import { createEvent } from "@/lib/actions/event.action";
import { useActionState } from "react";
import { z } from "zod";
import { useState } from "react";

const eventSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  details: z.string().min(10, "Details must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  imageUrl: z.string().url("Invalid image URL"),
});

export default function CreateEventForm() {
  const [fieldErrors, setFieldErrors] = useState({});
  const [state, formAction] = useActionState(createEvent, null);

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      details: formData.get("details"),
      location: formData.get("location"),
      imageUrl: formData.get("imageUrl"),
    };

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
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5">

      {/* Name */}
      <div className="space-y-2">
        <label className="text-[#9C9C9C] text-sm">Event Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter event name"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-2 px-3 rounded-md text-white"
        />
        {fieldErrors.name && (
          <p className="text-red-500 text-sm">{fieldErrors.name}</p>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2">
        <label className="text-[#9C9C9C] text-sm">Details</label>
        <textarea
          name="details"
          rows={4}
          placeholder="Enter event details"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-2 px-3 rounded-md text-white resize-none"
        />
        {fieldErrors.details && (
          <p className="text-red-500 text-sm">{fieldErrors.details}</p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-[#9C9C9C] text-sm">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter event location"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-2 px-3 rounded-md text-white"
        />
        {fieldErrors.location && (
          <p className="text-red-500 text-sm">{fieldErrors.location}</p>
        )}
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <label className="text-[#9C9C9C] text-sm">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="Enter image URL"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-2 px-3 rounded-md text-white"
        />
        {fieldErrors.imageUrl && (
          <p className="text-red-500 text-sm">{fieldErrors.imageUrl}</p>
        )}
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500 text-sm">{state.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-md transition-colors"
      >
        Create Event
      </button>
    </form>
  );
}