"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function UploadFile({
  title,
  fieldName,
  className,
  file,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  title?: string;
  fieldName: string;
  file?: File | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string | null;
}) {
  console.log({ title, fieldName, className, props, x: 1 });

  //const [file, setFile] = useState<File | undefined>(undefined);

  async function handleFileChange(e: any) {
    console.log("calling file change");
    const file = e.target.files?.[0];
    console.log("setting file");
    //setFile(file);
    props.onChange?.(e);
  }

  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            {file ? (
              <>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <p className="pl-1">File {`${file.name}`}</p>
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor={fieldName}
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id={fieldName}
                      name={fieldName}
                      type="file"
                      className="sr-only"
                      //onChange={handleFileChange}
                      onChange={(e) => {
                        console.log("calling file change");
                        handleFileChange(e);
                      }}
                      {...props}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
