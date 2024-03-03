import classNames from "classnames";

export default function Card({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={classNames(
        className,
        "bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 p-4"
      )}
    >
      {props.children}
    </div>
  );
}
