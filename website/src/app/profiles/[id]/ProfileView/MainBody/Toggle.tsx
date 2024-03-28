"use client";

import classNames from "classnames";
import { useState } from "react";

const tabs = [
  { name: "Profile", id: 1 },
  { name: "Resume", id: 2 },
];

export default function Toggle() {
  const [currentTab, setCurrentTab] = useState(1);

  function isCurrent(id: number) {
    const index = tabs.find((tab) => tab.id === id)?.id;
    if (index === currentTab) {
      return true;
    }
    return false;
  }

  function getCurrentTab(id: number) {
    return tabs.find((tab) => tab.id === id);
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={getCurrentTab(currentTab)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <div
              key={tabIdx}
              className={classNames(
                isCurrent(tab.id)
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                "cursor-pointer",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              onClick={() => setCurrentTab(tab.id)}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  isCurrent(tab.id) ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
