"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    startTransition(() => {
      if (value) {
        router.push(`/?search=${value}`);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      {/* Title */}
      <div>
        <h1 className="font-bold text-3xl text-white">Discover Events</h1>
        <p className="text-[#9C9C9C] text-sm mt-1">Find and join amazing events near you</p>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-auto">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b8a]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name or location..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={handleSearch}
          className={`w-full sm:w-72 bg-[#27292F] border border-[#CCCCCC]/20 focus:border-indigo-500 focus:outline-none py-2.5 pl-9 pr-4 rounded-lg text-white placeholder-[#6b6b8a] text-sm transition-all ${
            isPending ? "opacity-50" : ""
          }`}
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </div>
  );
};

export default Header;