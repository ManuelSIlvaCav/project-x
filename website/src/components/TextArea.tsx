export default function TextArea({
  label,
  description,
  name,
  className,
  errorMessage,
}: Omit<React.ComponentPropsWithoutRef<"input">, "id"> & {
  label?: string;
  name: string;
  description?: string;
  errorMessage?: string | null;
}) {
  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
    </div>
  );
}
