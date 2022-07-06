import { RootStateOrAny, useSelector } from "react-redux";
import ViewHolder from "../viewHolder";
import { AccountView } from "./accountsView";
import { ErrorView } from "./errorView";
import { InfoAddView } from "./infoAddView";
import { ProfilePicView } from "./profilePicView";

const SetupView = () => {
  const steps = useSelector((state: RootStateOrAny) => {
    try {
      return state.profile.data.stepsCompleted;
    } catch {
      return false;
    }
  });

  if (!steps) return <ErrorView />;

  const { accountsLinked, infoAdded, profilePicUpdated } = steps;
  if (!infoAdded) return <InfoAddView />;
  if (!accountsLinked) return <AccountView />;
  if (!profilePicUpdated) return <ProfilePicView />;

  return <ViewHolder>I am the setup view!!!!</ViewHolder>;
};

export default SetupView;
