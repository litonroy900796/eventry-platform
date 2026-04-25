import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container flex gap-8 py-8">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="bg-[#242526] rounded-lg p-4">
          <h2 className="text-white font-bold text-lg mb-6 pb-3 border-b border-[#CCCCCC]/20">
            Admin Dashboard
          </h2>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 text-[#9C9C9C] hover:text-white hover:bg-[#27292F] px-3 py-2 rounded-md transition-colors"
            >
              All Events
            </Link>

            <Link
              href="/dashboard/create"
              className="flex items-center gap-3 text-[#9C9C9C] hover:text-white hover:bg-[#27292F] px-3 py-2 rounded-md transition-colors"
            >
              Create Event
            </Link>
          </nav>
        </div>

        {/* Admin Info */}
        <div className="bg-[#242526] rounded-lg p-4 mt-4">
          <p className="text-[#9C9C9C] text-sm">Logged in as</p>
          <p className="text-white font-medium truncate">{session.user.name}</p>
          <p className="text-indigo-400 text-xs">{session.user.role}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#242526] rounded-lg p-6">
        {children}
      </main>
    </div>
  );
}