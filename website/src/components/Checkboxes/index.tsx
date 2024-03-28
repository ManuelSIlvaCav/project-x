export default function Checkboxes({
  label,
  errorMessage,
  options,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"input">, "id"> & {
  errorMessage?: string | null;
  label: string;
  options: { id: string; label: string; description?: string; name: string }[];
}) {
  return (
    <fieldset>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <legend className="sr-only">{label}</legend>
      <div className="space-y-5">
        {options.map((option, index) => {
          return (
            <div key={index} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={option.id}
                  aria-describedby="comments-description"
                  name={option.name}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  {option.label}
                </label>
                {option.description ? (
                  <p id="comments-description" className="text-gray-500">
                    Get notified when someones posts a comment on a posting.
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
