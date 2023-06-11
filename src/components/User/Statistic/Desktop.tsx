import { type FC, memo } from "react";

type DesktopStatisticProps = {
  data: {
    id: number;
    title: string;
    value: number | undefined;
  }[];
};
const DesktopStatistic: FC<DesktopStatisticProps> = ({ data }) => {
  return (
    <ul
      title="Statistic"
      className={`hidden items-center justify-start space-x-3 sm:mt-0 sm:flex md:mt-2`}
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
};
export default memo(DesktopStatistic);
