import { useEffect } from "react";
import Layout from "components/Layout";
import Setup from "modules/Setup";
import { useRouter } from "next/router";
import { RootStateOrAny, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const SetupPage = () => {
  const router = useRouter();
  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
    logged: state.auth.logged,
  }));
  useEffect(() => {
    if (!logged || (logged && profileData.visible)) {
      router.push("/");
    }
  }, [logged, profileData.visible]);

  if (!logged) return <div></div>;

  return <Setup stepsCompleted={profileData.stepsCompleted} />;
};

export default SetupPage;
