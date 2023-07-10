import { RiNotificationOffLine } from "react-icons/ri";

const Empty = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-black dark:text-white">
      <RiNotificationOffLine size={50} />
      <h1 className="mt-3 text-xl font-semibold text-gray-500">
        No notifications
      </h1>
    </div>
  );
};
export default Empty;
