"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosBug } from "react-icons/io";

//hover transitions for links
//implement active link

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issues/list" },
  ];
  const active_link = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="border-b py-3 px-5 mb-5 border-t my-1">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button>
                    <Avatar
                      src={session.user!.image!}
                      fallback="?"
                      size="3"
                      radius="full"
                      className="cursor-pointer"
                    />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
