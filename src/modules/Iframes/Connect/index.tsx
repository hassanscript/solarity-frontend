import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setOnIframe } from "redux/slices/commonSlice";
import LoginView from "./loginView";
import NoRoomView from "./noRoomView";
import SetupView from "./setupView";
import ViewHolder from "./viewHolder";
import RoomView from "./roomView";
import RoomCreationView from "./roomCreationView";
import ModeSelectionView from "./modeSelectionView";
import SinglePlayerView from "./singlePlayerView";

const connect = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<"edit" | "copy" | "live">("copy");
  const [roomViewStep, setRoomViewStep] = useState(0);

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

  const roomCount = profileData.rooms.length;

  if (roomCount == 0) return <NoRoomView />;
  if (roomViewStep == 0) return <RoomView onNext={() => setRoomViewStep(1)} />;
  if (roomViewStep == 1 && mode == "live")
    return (
      <RoomCreationView
        onBack={() => {
          setRoomViewStep(0);
          setMode("edit");
        }}
      />
    );
  if (roomViewStep == 1 && mode == "edit")
    return (
      <RoomView
        editMode={true}
        onNext={() => setRoomViewStep(1)}
        onBack={() => setRoomViewStep(0)}
        onCopy={() => setMode("copy")}
        onLive={() => setMode("live")}
      />
    );
  if (roomViewStep == 1 && mode == "copy")
    return (
      <SinglePlayerView
        onBack={() => {
          () => {
            setRoomViewStep(0);
            setMode("edit");
          };
        }}
        onLive={() => setMode("live")}
        onEdit={() => setMode("edit")}
      />
    );
};

export default connect;
