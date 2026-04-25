"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/./public/logo.png";

const Navbar = () => {
  const { data: session } = useSession();

  console.log("Session in Navbar:", session); // Session data দেখাও
  

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image src={Logo} alt="Eventry" width={140} height={100} />
          </Link>
        </div>

        <ul className="flex gap-4 items-center text-[#9C9C9C]">
          <li>About</li>
          <li>Contact Us</li>

          {session?.user ? (
            <>
              <li className="text-white font-medium">{session.user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn-primary bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="btn-primary bg-indigo-600 hover:bg-indigo-800 px-4 py-2 text-white rounded"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;