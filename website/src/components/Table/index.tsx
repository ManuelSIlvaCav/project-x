interface Column {
  title: string;
  key: string;
  children?: React.ReactNode; //In case the column is a complex component
}

type Props = {
  title: string;
  description: string;
  topRightButton: React.ReactNode;
  columns: Column[]; // ['Name', 'Title', 'Email', 'Role', <Button />]
  query: () => Promise<any>;
};

function getItemName(item: Record<string, any>, key: string) {
  if (key.includes(".")) {
    const keys = key.split(".");
    //Call recursively getItemName until we get the final value
    return getItemName(item[keys[0]], keys.slice(1).join("."));
  }
  return item[key];
}

//For single tables use this component to avoid repeating code
export default async function Table<T extends Record<string, any>>(
  props: Props
) {
  const response = await props?.query?.();

  console.log("in table", { response });
  const { topRightButton, columns, title, description } = props;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {topRightButton}
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {
                //We need to map the columns to the data
                columns.map((column, index: number) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      {column.title}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {response?.data?.map((item: T, index: number) => {
              return (
                <tr key={index}>
                  {columns.map((column, index: number) => {
                    return (
                      <td
                        key={index}
                        className="px-3 py-4 text-sm text-gray-900"
                      >
                        {getItemName(item, column.key)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            >
              Next
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
