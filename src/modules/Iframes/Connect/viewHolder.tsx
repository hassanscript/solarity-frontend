import { FC } from "react";

const ViewHolder: FC<{}> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="card bg-neutral p-10 py-7 w-[600px]">
        <div className="flex flex-col items-center space-y-3">{children}</div>
      </div>
    </div>
  );
};

export default ViewHolder;
