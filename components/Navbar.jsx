"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/./public/logo.png";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth(null);
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

          {auth ? (
            <>
              <li className="text-white font-medium">{auth.name}</li>
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