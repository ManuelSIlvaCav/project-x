import { PlusIcon } from "@heroicons/react/20/solid";

export default function CircularPlusButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      className="rounded-full bg-gray-300 p-2 text-black shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
      {...props}
    >
      <PlusIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
