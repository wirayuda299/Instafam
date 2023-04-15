export default function Recommendation() {
  return (
    <section className="hidden min-w-[400px] lg:block">
      <div className="h-full w-full max-w-sm animate-pulse p-5">
        <div className="mb-2 flex items-center justify-around space-x-2 md:justify-between">
          <div className="mb-2 flex items-center space-x-3">
            <div className="h-9   w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-5   w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="h-4 w-9 rounded-md bg-gray-200  text-xs font-semibold text-blue-600 dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="h-5 w-16 rounded-lg bg-gray-200  text-sm font-semibold text-gray-500 dark:bg-gray-700"></div>
          <div className="h-4 w-9 rounded-md  bg-gray-200 text-xs dark:bg-gray-700 dark:text-blue-600"></div>
        </div>
        <div>
          <div className="mb-2 mt-5 flex w-full items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 pb-3">
              <div className="h-9  w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-col items-start justify-center">
                <div className="h-5  w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-1  h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="ml-auto">
              <div className="h-6  w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="mb-2 mt-5 flex w-full items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 pb-3">
              <div className="h-9  w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-col items-start justify-center">
                <div className="h-5  w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-1  h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="ml-auto">
              <div className="h-6  w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="mb-2 mt-5 flex w-full items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 pb-3">
              <div className="h-9  w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-col items-start justify-center">
                <div className="h-5  w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-1  h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="ml-auto">
              <div className="h-6  w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
