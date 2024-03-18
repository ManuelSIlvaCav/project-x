"use client";

import classNames from "classnames";
import Link from "next/link";
import useHash from "./useHash";

const tabs = [
  { name: "Applicants", href: "#applicants", count: "52" },
  { name: "Recommended", href: "#recommended", count: "6" },
];

type Props = {};

export default function NavigationFragmentTabs(props: Props) {
  const hash = useHash();
  const isCurrent = (href: string) => hash === href.replace("#", "");
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>

        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={tabs.find((tab) => isCurrent(tab.href))?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const current = isCurrent(tab.href);

              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  scroll={false}
                  className={classNames(
                    current
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                    "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  aria-current={current ? "page" : undefined}
                >
                  {tab.name}
                  {tab.count ? (
                    <span
                      className={classNames(
                        current
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-900",
                        "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                      )}
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
