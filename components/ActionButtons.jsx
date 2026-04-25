"use client";

import { toggleInterest } from "@/lib/actions/event.action";
import Link from "next/link";
import { useTransition } from "react";
import { useSession } from "next-auth/react";

const ActionButtons = ({ fromDetails, eventId, event }) => {
  const { data: session } = useSession();
  const auth = session?.user;

  const [isPending, startTransition] = useTransition();

  const isInterested = auth && event?.interested_ids?.includes(auth.id);
  const isGoing = auth && event?.going_ids?.includes(auth.id);

  const handleInterest = () => {
    if (!auth) return alert("Please login first");
    startTransition(async () => {
      await toggleInterest(eventId, auth.id);
    });
  };

  return (
    <div className={`w-full flex gap-3 mt-4 ${fromDetails ? "flex-1 max-w-sm" : ""}`}>
      
      {/* Interested Button */}
      <button
        onClick={handleInterest}
        disabled={isPending}
        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
          ${isInterested
            ? "bg-indigo-600/20 border border-indigo-500 text-indigo-400 hover:bg-indigo-600/30"
            : "bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent"
          }`}
      >
        {isPending ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-4 h-4" fill={isInterested ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )}
        {isPending ? "Updating..." : isInterested ? "Interested" : "Interested"}
      </button>

      {/* Going Button */}
      {auth ? (
        isGoing ? (
          <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm bg-green-600/20 border border-green-500 text-green-400 cursor-default">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Going
          </div>
        ) : (
          <Link
            href={`/payment/${eventId}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm bg-[#464849] hover:bg-[#3C3D3D] text-white border border-[#5F5F5F]/50 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Going
          </Link>
        )
      ) : (
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm bg-[#464849] hover:bg-[#3C3D3D] text-white border border-[#5F5F5F]/50 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Login to Go
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;