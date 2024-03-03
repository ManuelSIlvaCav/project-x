export default function Skeleton() {
  return (
    <div className="py-4 rounded shadow-md  animate-pulse dark:bg-gray-200">
      <div className="flex p-4 space-x-4 sm:px-8">
        <div className="flex-1 py-2 space-y-4">
          <div className="w-full h-3 rounded dark:bg-gray-100"></div>
          <div className="w-5/6 h-3 rounded dark:bg-gray-100"></div>
        </div>
      </div>
      <div className="p-4 space-y-4 sm:px-8">
        <div className="w-full h-4 rounded dark:bg-gray-100"></div>
        <div className="w-full h-4 rounded dark:bg-gray-100"></div>
        <div className="w-3/4 h-4 rounded dark:bg-gray-100"></div>
      </div>
    </div>
  );
}
