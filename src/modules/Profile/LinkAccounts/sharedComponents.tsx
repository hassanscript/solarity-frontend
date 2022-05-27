import { FC } from "react";

export const LinkWrapper: FC<{ mini?: boolean }> = ({ children, mini }) => {
  return (
    <div
      className={`flex items-center space-x-4 rounded-3xl ${
        mini ? "" : "border border-brandblack"
      } ${!mini ? "p-5" : ""}`}
    >
      {children}
    </div>
  );
};
