"use client";

import { deleteEvent } from "@/lib/actions/event.action";
import { useTransition } from "react";

export default function DeleteEventButton({ eventId }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    startTransition(async () => {
      await deleteEvent(eventId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-500 hover:bg-red-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded-md transition-colors"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}