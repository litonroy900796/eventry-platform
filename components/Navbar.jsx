import Image from "next/image";
import Link from "next/link";
import Logo from "@/./public/logo.png";
const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image src={Logo} alt="Eventry" width={140} height={100} />
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
