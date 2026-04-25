"use client";

import { approveEvent, rejectEvent } from "@/lib/actions/event.action";
import { useTransition, useState } from "react";

export default function ApproveRejectButtons({ eventId }) {
  const [isPending, startTransition] = useTransition();
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [reason, setReason] = useState("");

  const handleApprove = () => {
    startTransition(async () => {
      await approveEvent(eventId);
    });
  };

  const handleReject = () => {
    if (!reason.trim()) return alert("Please provide a reason");
    startTransition(async () => {
      await rejectEvent(eventId, reason);
      setShowRejectInput(false);
    });
  };

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex gap-2">
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="bg-green-600 hover:bg-green-800 disabled:opacity-50 text-white text-xs px-3 py-1 rounded-md transition-colors"
        >
          Approve
        </button>
        <button
          onClick={() => setShowRejectInput(!showRejectInput)}
          disabled={isPending}
          className="bg-red-500 hover:bg-red-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded-md transition-colors"
        >
          Reject
        </button>
      </div>

      {showRejectInput && (
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Rejection reason..."
            className="bg-[#1a1a2e] border border-[#CCCCCC]/20 text-white text-xs py-1 px-2 rounded-md w-48"
          />
          <button
            onClick={handleReject}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}