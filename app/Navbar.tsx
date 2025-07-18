import Link from "next/link";
import React from "react";
import { IoIosBug } from "react-icons/io";

//hover transitions for links

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issue" },
  ];
  return (
    <nav className="flex space-x-6 border-b h-14 px-5 items-center mb-5 border-t my-1">
      <Link href="/">
        <IoIosBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500  hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
