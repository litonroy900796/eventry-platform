"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/./public/logo.png";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-[#242526]">
      <div className="container flex justify-between items-center py-4">
        
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} alt="Eventry" width={120} height={80} />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-[#9C9C9C]">
          <li>About</li>
          <li>Contact</li>

          {session?.user?.role === "admin" ? (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          ) : session?.user ? (
            <li>
              <Link href="/my-events">My Events</Link>
            </li>
          ) : null}

          {session?.user ? (
            <>
              <li className="text-white">{session.user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-800 px-4 py-2 text-white rounded"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#242526] px-4 pb-4">
          <ul className="flex flex-col gap-3 text-[#9C9C9C]">
            <li>About</li>
            <li>Contact</li>

            {session?.user?.role === "admin" ? (
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            ) : session?.user ? (
              <li>
                <Link href="/my-events">My Events</Link>
              </li>
            ) : null}

            {session?.user ? (
              <>
                <li className="text-white">{session.user.name}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block text-center bg-indigo-600 hover:bg-indigo-800 px-4 py-2 text-white rounded"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;