import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setOnIframe } from "redux/slices/commonSlice";
import LoginView from "./loginView";
import SetupView from "./setupView";
import ViewHolder from "./viewHolder";

const connect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOnIframe());
  }, []);

  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profileData: state.profile.data,
  }));

  if (!logged) return <LoginView />;

  const accountIsSet = (() => {
    try {
      return (
        Object.values(profileData.stepsCompleted).filter((x) => !x).length === 0
      );
    } catch {
      return false;
    }
  })();

  if (!accountIsSet) return <SetupView />;

  return <ViewHolder>I am setup and rocking!</ViewHolder>;
};

export default connect;
