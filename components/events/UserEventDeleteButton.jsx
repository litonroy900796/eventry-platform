"use client";

import { deleteUserEvent } from "@/lib/actions/event.action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function UserEventDeleteButton({ eventId }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    startTransition(async () => {
      await deleteUserEvent(eventId);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}