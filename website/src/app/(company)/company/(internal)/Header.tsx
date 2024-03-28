"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Bars3Icon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { signOut } from "next-auth/react";

function Hamburguer() {
  return (
    <div className="h-10 w-10">
      <Bars3Icon />
    </div>
  );
}

function ProfileDropDown() {
  const userNavigation = [
    { name: "Home", href: "/company", onClick: () => {} },
    { name: "New Job Posting", href: "/company/newjob", onClick: () => {} },
    { name: "Jobs", href: "/company/jobs", onClick: () => {} },
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
        <Menu.Button className="relative flex ">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>

          <Hamburguer />
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
