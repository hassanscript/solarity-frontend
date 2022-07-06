import { FC } from "react";
import ViewHolder from "../viewHolder";
import { Form } from "../../../Setup/InfoView/form";

export const InfoAddView: FC<{}> = () => {
  return (
    <ViewHolder>
      <div className="space-y-5 w-[100%]">
        <h3>Provide the Account Info</h3>
        <Form />
      </div>
    </ViewHolder>
  );
};
