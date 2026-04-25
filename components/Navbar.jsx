"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/./public/logo.png";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on route change (link click)
  const closeMenu = () => setIsOpen(false);

  const navLinks = (
    <>
      <li>
        <Link href="/about" onClick={closeMenu}
          className="text-[#9C9C9C] hover:text-white transition-colors text-sm">
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" onClick={closeMenu}
          className="text-[#9C9C9C] hover:text-white transition-colors text-sm">
          Contact
        </Link>
      </li>
      {session?.user?.role === "admin" ? (
        <li>
          <Link href="/dashboard" onClick={closeMenu}
            className="text-[#9C9C9C] hover:text-white transition-colors text-sm">
            Dashboard
          </Link>
        </li>
      ) : session?.user ? (
        <li>
          <Link href="/my-events" onClick={closeMenu}
            className="text-[#9C9C9C] hover:text-white transition-colors text-sm">
            My Events
          </Link>
        </li>
      ) : null}
    </>
  );

  return (
    <nav className="bg-[#242526] border-b border-white/[0.06] sticky top-0 z-50" ref={mobileMenuRef}>
      <div className="container flex justify-between items-center py-3.5">

        {/* Logo */}
        <Link href="/" onClick={closeMenu}>
          <Image src={Logo} alt="Eventry" width={110} height={36} className="h-9 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks}
          {session?.user ? (
            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-semibold">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white text-sm font-medium">{session.user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <li className="ml-2">
              <Link href="/login"
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-[.98] text-white text-sm font-medium px-4 py-2 rounded-md transition-all">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile: right side */}
        <div className="flex md:hidden items-center gap-3">
          {session?.user && (
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-semibold">
                {session.user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-white/5 transition-colors"
          >
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-white/[0.06] px-4 py-4">

          {session?.user && (
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-semibold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">{session.user.name}</p>
                <p className="text-[#9C9C9C] text-xs mt-0.5">{session.user.email}</p>
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/about" onClick={closeMenu}
                className="flex items-center text-[#9C9C9C] hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-md transition-colors text-sm">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeMenu}
                className="flex items-center text-[#9C9C9C] hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-md transition-colors text-sm">
                Contact
              </Link>
            </li>
            {session?.user?.role === "admin" ? (
              <li>
                <Link href="/dashboard" onClick={closeMenu}
                  className="flex items-center text-[#9C9C9C] hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-md transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            ) : session?.user ? (
              <li>
                <Link href="/my-events" onClick={closeMenu}
                  className="flex items-center text-[#9C9C9C] hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-md transition-colors text-sm">
                  My Events
                </Link>
              </li>
            ) : null}
          </ul>

          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            {session?.user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium py-2.5 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={closeMenu}
                className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-md transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;