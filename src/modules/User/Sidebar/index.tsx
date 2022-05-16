import { FC } from "react";
import BalanceView from "./BalanceView";
import Home from "./Home";

const Sidebar: FC<{ user: any }> = ({ user }) => {
  return (
    <>
      <BalanceView {...user} />
      <br />
      <Home />
    </>
  );
};

export default Sidebar;
