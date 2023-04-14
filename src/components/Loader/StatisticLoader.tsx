export default function StatisticLoader() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse py-5">
      <div className="container border-b pb-14 text-black dark:text-white">
        <div className="flex w-full items-center space-x-3 md:justify-center md:space-x-10">
          <div className="h-24 w-24 rounded-full bg-gray-200"></div>
          <div className="flex flex-col">
            <div className="h-10 w-44 rounded bg-gray-200"></div>
            <div className="mt-1 h-6 w-36 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 items-center justify-center gap-5 p-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="col-span-3 mx-auto h-full w-full">
          <div className="h-28 w-full rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
