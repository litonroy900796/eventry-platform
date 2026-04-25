import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container py-4 md:py-6 lg:py-8">

      {/* Mobile top bar — visible below md */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <span className="text-white font-bold text-base">Admin Dashboard</span>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 text-xs bg-indigo-600/15 px-2 py-0.5 rounded-full">
            {session.user.role}
          </span>
        </div>
      </div>

      {/* Mobile nav strip — visible below md */}
      <div className="flex gap-2 mb-4 md:hidden">
        <Link
          href="/dashboard"
          className="flex-1 text-center text-[#9C9C9C] hover:text-white bg-[#242526] hover:bg-[#27292F] text-sm px-3 py-2 rounded-md transition-colors"
        >
          All Events
        </Link>
        <Link
          href="/dashboard/create"
          className="flex-1 text-center text-[#9C9C9C] hover:text-white bg-[#242526] hover:bg-[#27292F] text-sm px-3 py-2 rounded-md transition-colors"
        >
          Create Event
        </Link>
      </div>

      {/* Desktop layout — sidebar + main */}
      <div className="flex gap-6 lg:gap-8 items-start">

        {/* Sidebar — hidden on mobile */}
        <aside className="hidden md:flex md:flex-col w-56 lg:w-64 shrink-0 gap-4">
          <div className="bg-[#242526] rounded-lg p-4">
            <h2 className="text-white font-bold text-base mb-5 pb-3 border-b border-[#CCCCCC]/20">
              Admin Dashboard
            </h2>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 text-[#9C9C9C] hover:text-white hover:bg-[#27292F] px-3 py-2 rounded-md transition-colors text-sm"
              >
                All Events
              </Link>
              <Link
                href="/dashboard/create"
                className="flex items-center gap-3 text-[#9C9C9C] hover:text-white hover:bg-[#27292F] px-3 py-2 rounded-md transition-colors text-sm"
              >
                Create Event
              </Link>
            </nav>
          </div>

          <div className="bg-[#242526] rounded-lg p-4">
            <p className="text-[#9C9C9C] text-xs mb-1">Logged in as</p>
            <p className="text-white font-medium text-sm truncate">{session.user.name}</p>
            <p className="text-indigo-400 text-xs mt-0.5">{session.user.role}</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 bg-[#242526] rounded-lg p-4 sm:p-5 lg:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}