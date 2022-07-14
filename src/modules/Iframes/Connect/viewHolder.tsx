import { FC } from "react";

const ViewHolder: FC<{ center?: boolean }> = ({ children, center }) => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div
        className={`card bg-neutral p-10 py-7 w-[590px] h-[310px] ${
          center ? "flex justify-center align-center" : ""
        }`}
      >
        <div className="flex flex-col items-center space-y-3">{children}</div>
      </div>
    </div>
  );
};

export default ViewHolder;
