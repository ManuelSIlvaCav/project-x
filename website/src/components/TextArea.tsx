import classNames from "classnames";

export default function TextArea({
  label,
  description,
  name,
  placeholder,
  errorMessage,

  ...props
}: Omit<React.ComponentPropsWithoutRef<"textarea">, "id"> & {
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
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
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6",
            "focus:ring-2 focus:ring-inset focus:ring-gray-600"
          )}
          defaultValue={""}
          {...props}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
    </div>
  );
}
