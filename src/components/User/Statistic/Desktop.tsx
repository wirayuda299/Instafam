import { memo } from "react";

type Props = {
  data: {
    id: number;
    title: string;
    value: number | undefined;
  }[];
};
function DesktopStatistic({ data }: Props) {
  
  return (
    <ul
      title="Statistic"
      className={`mt-2 hidden items-center justify-start space-x-3 sm:flex`}
    >
      {data.map((item) => (
        <li
          title={item.title}
          className="mt-1 text-center text-sm font-medium"
          key={item.id}
        >
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <span className="font-semibold">{item.value}</span>
            <span>{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default memo(DesktopStatistic)
