import Link from "next/link";

import { Logo } from "@/components/Logo";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-full overflow-hidden pt-4 sm:py-7">
      <div className="flex flex-col ali mx-auto  w-full max-w-2xl  px-4 sm:px-6">
        <Link href="/" aria-label="Home">
          <Logo className="mx-auto h-10 w-auto" />
        </Link>
        <div className="relative mt-6 sm:mt-8">
          <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-center text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
        <div className="-mx-4 flex-auto bg-white px-4 py-4 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:py-16 sm:px-28">
          {children}
        </div>
      </div>
    </main>
  );
}
