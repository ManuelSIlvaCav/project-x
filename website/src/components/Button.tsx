"use client";

import clsx from "clsx";
import Link from "next/link";
import { useFormStatus } from "react-dom";

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

type ButtonProps = (
  | {
      variant?: "solid";
      color?: keyof typeof variantStyles.solid;
    }
  | {
      variant: "outline";
      color?: keyof typeof variantStyles.outline;
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
    | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
        href?: undefined;
      })
  );

export function Button({ className, children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  props.variant ??= "solid";
  props.color ??= "gray";

  className = clsx(
    baseStyles[props.variant],
    props.variant === "outline"
      ? variantStyles.outline[props.color]
      : props.variant === "solid"
      ? variantStyles.solid[props.color]
      : undefined,
    className
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} disabled={pending}>
      {pending ? (
        <svg
          className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  ) : (
    <Link className={className} {...props}>
      {children}
    </Link>
  );
}
