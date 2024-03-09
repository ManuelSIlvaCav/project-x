"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import Image from "next/image";

function ProfileDropDown() {
  const userNavigation = [
    { name: "Your Profile", href: "/profile", onClick: () => {} },
    { name: "Your Invitations", href: "/invitations", onClick: () => {} },
    {
      name: "Sign out",
      onClick: async () => {
        await signOut({ callbackUrl: "/" });
      },
    },
  ];
  return (
    <Menu as="div" className="relative ml-5 flex-shrink-0">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={
              "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt="Profile of user"
            width={32}
            height={32}
          />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <Link
                href={item.href ?? ""}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
                onClick={item.onClick}
              >
                {item.name}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export function Header() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <ProfileDropDown />
          </div>
        </Container>
      </nav>
    </header>
  );
}
