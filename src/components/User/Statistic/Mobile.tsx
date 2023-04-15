type Props = {
  data: {
    id: number;
    title: string;
    value: number | undefined;
  }[];
};
export default function StatisticMobile({ data }: Props) {
  return (
    <ul
      title="Statistic"
      className={`mt-2 flex w-full items-center justify-center border-t space-x-3 sm:hidden py-3 border-gray-500 border-opacity-50`}
    >
      {data.map((item) => (
        <li
          title={item.title}
          className="mt-1 text-center text-sm "
          key={item.id}
        >
          <div className="flex items-center space-x-3 text-base font-semibold">
            <span className="font-semibold">{item.value}</span>
            <span>{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
