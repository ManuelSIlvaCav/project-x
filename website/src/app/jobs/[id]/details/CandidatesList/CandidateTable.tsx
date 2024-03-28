import getCandidateRecommendation from "@/app/lib/actions/company/getCandidateRecommendations";
import CandidateRow from "./CandidateRow";
import PaginationFooter from "./PaginationFooter";

type Props = {
  cursor?: string;
};

//For single tables use this component to avoid repeating code
export default async function CandidateTable<T extends Record<string, any>>(
  props: Props
) {
  const companyId = "65fc06367a0b7b8617734d26";
  const limit = 10;

  const { cursor } = props;

  const response = await getCandidateRecommendation(companyId, limit, cursor);

  const title = null;
  const description = null;
  const columns: string[] = ["Applicant", "Company", "Date"];
  const topRightButton = undefined;

  console.log("in table", { response });

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
                      {column}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {response?.data?.map((item: T, index: number) => {
              return (
                <CandidateRow
                  key={index}
                  index={index}
                  columns={columns}
                  item={item}
                />
              );
            })}
          </tbody>
        </table>
        <PaginationFooter cursor={response?.nextCursor} />
      </div>
    </div>
  );
}
