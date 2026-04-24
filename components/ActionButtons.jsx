"use client";

import { toggleInterest } from "@/lib/actions/event.action";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useTransition } from "react";

const ActionButtons = ({ fromDetails, eventId, event }) => {
  const { auth } = useAuth();
  console.log("auth", auth);
  
  const [isPending, startTransition] = useTransition();

  const isInterested = auth && event?.interested_ids?.includes(auth.id);

  const handleInterest = () => {
    if (!auth) return alert("Please login first");
    startTransition(async () => {
      await toggleInterest(eventId, auth.id);
    });
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={handleInterest}
        disabled={isPending}
        className={`w-full disabled:opacity-50 ${
          isInterested
            ? "bg-green-600! hover:bg-green-800!"
            : "bg-indigo-600 hover:bg-indigo-800"
        }`}
      >
        {isPending ? "Updating..." : isInterested ? "Interested ✓" : "Interested"}
      </button>

      {auth ? (
        <Link
          href={`/payment/${eventId}`}
          className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
        >
          Going
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
        >
          Login to Go
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;