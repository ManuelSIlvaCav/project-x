"use client";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Fragment, useState } from "react";

export default function CustomSelect({
  label,
  name,
  className,
  errorMessage,
  options,
  placeholder = "Select an option",
  multiple = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"input">, "id"> & {
  errorMessage?: string | null;
  label: string;
  name: string;
  placeholder?: string;
  multiple?: boolean;
  options: { id: string; label: string }[];
}) {
  const [selected, setSelected] = useState<
    | {
        id: string;
        label: string;
      }
    | { id: string; label: string }[]
    | null
  >(multiple ? [] : null);

  function onChange(value: { id: string; label: string }) {
    console.log("onChange", value);
    setSelected(value);
  }

  function getLabel(
    selectedInput:
      | { id: string; label: string }
      | { id: string; label: string }[]
      | null
  ) {
    if (selectedInput === null) return placeholder;
    if (Array.isArray(selectedInput)) {
      return selectedInput
        .map((item) => {
          return options.find((option) => option.id === item.id)?.label;
        })
        .join(", ");
    }
    return options.find((option) => option.id === selectedInput.id)?.label;
  }

  return (
    <Listbox
      value={selected}
      onChange={onChange}
      by={"id"}
      name={name}
      multiple={multiple}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className="mt-2">
            <Listbox.Button className="w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <span className="block truncate">{getLabel(selected)}</span>
                </div>
                <div className="flex col-span-1 justify-end items-end">
                  <span className="pointer-events-none relative flex items-center ">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full max-w-xl max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block"
                          )}
                        >
                          {person.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
