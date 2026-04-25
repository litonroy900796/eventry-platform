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
    <div className="flex justify-between">
      <h1 className="font-bold text-3xl">
        Discover Events
      </h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={handleSearch}
          className={`bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md ${isPending ? "opacity-50" : ""}`}
        />
      </div>
    </div>
  );
};

export default Header;