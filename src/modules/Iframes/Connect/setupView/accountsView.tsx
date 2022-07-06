import { FC } from "react";
import ViewHolder from "../viewHolder";

import LinkView from "modules/Setup/LinkView";

export const AccountView: FC<{}> = () => {
  return (
    <ViewHolder>
      <div className="space-y-5 w-[100%]">
        <h3>Please link accounts</h3>
        <LinkView minimal />
      </div>
    </ViewHolder>
  );
};
