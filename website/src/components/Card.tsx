export default function Card({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="bg-gray-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 p-4">
      {props.children}
    </div>
  );
}
