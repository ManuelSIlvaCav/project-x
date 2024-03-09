import Link from "next/link";

interface Options {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  description: string;
  href?: string;
}

type Props = React.ComponentPropsWithoutRef<"a"> & {
  trailingComponent?: React.ReactNode;
  options: Options[];
};

//TODO edit to make it more generic
export default function StackedList(props: Props) {
  const options = props.options;
  return (
    <div className={props.className}>
      <ul role="list" className="divide-y divide-gray-100">
        {options?.map((option) => (
          <Link
            key={option.id}
            href={props.href + `${option.id}` + `${option.href}` ?? ""}
          >
            <li className="flex items-center justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-100 px-4 sm:px-6 transition-colors duration-200 ease-in-out">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-base font-semibold leading-6 text-gray-900">
                    {option.title}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                    {option.subtitle}
                  </p>
                  <div>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {props.trailingComponent ? props.trailingComponent : null}
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <a
        href="#"
        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        View all
      </a>
    </div>
  );
}
