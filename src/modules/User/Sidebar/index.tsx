import { FC, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import BalanceView from "./BalanceView";
import Home from "./Home";

const Sidebar: FC<{ user: any }> = ({ user }) => {
  const { logged, profile } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profile: state.profile.data,
  }));
  return (
    <>
      {logged && profile._id === user._id && (
        <>
          <BalanceView {...user} />
          <br />
        </>
      )}

      {/* <Home /> */}
    </>
  );
};

export default Sidebar;
