import { useEffect } from "react";
import Setup from "modules/Setup";
import { useRouter } from "next/router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { startLoadingApp, stopLoadingApp } from "redux/slices/commonSlice";

const SetupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { logged, profileData, checkingSession } = useSelector(
    (state: RootStateOrAny) => ({
      profileData: state.profile.data,
      logged: state.auth.logged,
      checkingSession: state.auth.checkingSession,
    })
  );

  useEffect(() => {
    dispatch(stopLoadingApp());
  }, []);

  useEffect(() => {
    dispatch(startLoadingApp());
    if (checkingSession) return;
    if (!logged || (logged && profileData.visible)) {
      router.push("/");
    } else {
      dispatch(stopLoadingApp());
    }
  }, [logged, profileData.visible, checkingSession]);

  if (!logged) return <div></div>;

  return <Setup stepsCompleted={profileData.stepsCompleted} />;
};

export default SetupPage;
