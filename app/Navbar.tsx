"use client";
import Link from "next/link";
import React from "react";
import { IoIosBug } from "react-icons/io";
import { usePathname } from "next/navigation";
import classnames from "classnames";

//hover transitions for links
//implement active link

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issues/list" },
  ];
  const active_link = usePathname();

  return (
    <nav className="flex space-x-6 border-b h-14 px-5 items-center mb-5 border-t my-1">
      <Link href="/">
        <IoIosBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                "text-zinc-900": link.href === active_link,
                "text-zinc-500": link.href != active_link,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
