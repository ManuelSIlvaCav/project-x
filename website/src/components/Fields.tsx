import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import clsx from "clsx";
import { useId } from "react";

const formClasses =
  "block w-full appearance-none rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] sm:text-sm";

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  );
}

export function TextField({
  label,
  type = "text",
  className,
  errorMessage,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"input">, "id"> & {
  label?: string;
  errorMessage?: string | null;
}) {
  let id = useId();

  const errorCss = errorMessage?.length
    ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
    : "text-gray-900 border-gray-200 bg-whiteplaceholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500";

  return (
    <div className={classNames(className, "relative")}>
      {label && <Label id={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        {...props}
        className={classNames(formClasses, errorCss)}
      />
      {errorMessage?.length ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pt-6">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"select">, "id"> & { label?: string }) {
  let id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, "pr-8")} />
    </div>
  );
}
