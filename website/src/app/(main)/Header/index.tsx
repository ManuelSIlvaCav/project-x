"use client";

import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import { signIn } from "next-auth/react";

import { Menu } from "@headlessui/react";

import classNames from "classnames";
import React, { forwardRef } from "react";

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    "as" | "className"
  >
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    />
  );
}

function LoginDropDown() {
  let ButtonWithRef = forwardRef<HTMLButtonElement, {}>(
    function MyButtonWithRef(props, ref) {
      return (
        <Button
          forwardref={ref}
          variant="outline"
          className="lg:block"
          {...props}
        >
          Log in
        </Button>
      );
    }
  );

  const userNavigation = [
    {
      name: "Employees",
      onClick: () => {
        signIn();
      },
    },
    { name: "Employers", href: "/company/login", onClick: () => {} },
  ];

  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div>
        <Menu.Button as={ButtonWithRef} />
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

function SignupDropDown() {
  let ButtonWithRef = forwardRef<HTMLButtonElement, {}>(
    function MyButtonWithRef(props, ref) {
      return (
        <Button forwardref={ref} className="lg:block" {...props}>
          Sign up
        </Button>
      );
    }
  );

  const navigation = [
    { name: "Employees", href: "/register", onClick: () => {} },
    { name: "Employers", href: "/company/signup", onClick: () => {} },
  ];

  return (
    <Menu as="div" className="relative  flex-shrink-0">
      <div>
        <Menu.Button as={ButtonWithRef} />
      </div>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {navigation.map((item) => (
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

export default function Header() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="/#reviews">
                              Reviews
                            </MobileNavLink>
                            <MobileNavLink href="/#pricing">
                              Pricing
                            </MobileNavLink>
                            <MobileNavLink href="/#faqs">FAQs</MobileNavLink>
                          </div>
                          {/* <div className="mt-8 flex flex-col gap-4">
                            
                            <Button
                              onClick={() => {
                                signIn();
                              }}
                              variant="outline"
                            >
                              Log in
                            </Button>
                            <Button href="/register">Sign up</Button>
                          </div> */}
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>

            <LoginDropDown />
            <SignupDropDown />
          </div>
        </Container>
      </nav>
    </header>
  );
}
