"use client";

import { updateSwags } from "@/lib/actions/event.action";
import { useActionState } from "react";

export default function SwagForm({ event }) {
  const updateSwagsWithId = updateSwags.bind(null, event.id);
  const [state, formAction] = useActionState(updateSwagsWithId, null);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div className="border-t border-[#CCCCCC]/20 pt-6">
        <h3 className="text-white font-semibold text-lg mb-4">Swags</h3>

        {/* Current Swags */}
        {event.swags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.swags.map((swag, i) => (
              <span
                key={i}
                className="bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 text-xs px-3 py-1 rounded-full"
              >
                {swag}
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="space-y-2">
          <label className="text-[#9C9C9C] text-sm">
            Add Swags{" "}
            <span className="text-[#6b6b8a] text-xs">
              (comma separated, e.g: Free T-Shirt, Networking, Free WIFI)
            </span>
          </label>
          <input
            type="text"
            name="swags"
            defaultValue={event.swags?.join(", ")}
            placeholder="Free T-Shirt, Networking, Free WIFI"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-2 px-3 rounded-md text-white"
          />
        </div>

        {state?.error && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-500 text-sm mt-2">{state.message}</p>
        )}

        <button
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-md transition-colors"
        >
          Update Swags
        </button>
      </div>
    </form>
  );
}