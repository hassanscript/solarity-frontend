import { ChevronLeftIcon } from "@heroicons/react/solid";
import LockedRoom from "components/Banner/LockedRoom";
import FirstEditRoom from "components/EditRoom/FirstEditRoom";
import SecondEditRoom from "components/EditRoom/SecondEditRoom";
import { FC } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

const SinglePlayerView: FC<{
  onLive: () => void;
  onEdit: () => void;
  onBack: () => void;
}> = ({ onLive, onEdit, onBack }) => {
  // get the active room
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));
  const activeRoomNo =
    profileData && profileData.rooms.find(({ active }: any) => active).roomNo;
  let editRoomData;
  if (activeRoomNo == 0) {
    editRoomData = (
      <FirstEditRoom
        chooseFlag={false}
        setChooseFlag={() => {}}
        picNo={0}
        setPicNo={() => {}}
        setRoom_id={() => {}}
        imageUrl={null}
      />
    );
  } else if (activeRoomNo == 1) {
    editRoomData = (
      <SecondEditRoom
        chooseFlag={false}
        setChooseFlag={() => {}}
        picNo={1}
        setPicNo={() => {}}
        setRoom_id={() => {}}
        imageUrl={null}
      />
    );
  } else {
    editRoomData = (
      <div
        className="w-full h-[240px] rounded-2xl relative"
        style={{ background: "rgba(255, 255, 255, 0.2)" }}
      >
        <LockedRoom />
      </div>
    );
  }

  return (
    <div>
      <div className="fixed bottom-5 right-5 w-[300px] z-[10000] bg-black/80 p-5 py-7 rounded-md">
        {/* <h3 className="text-xl font-bold">COPY MODE</h3>
        <span className="text-sm block text-gray-400 pt-1">
          You are viewing your room in single-player mode
        </span> */}
        <div className="space-y-3">
          <button
            onClick={onEdit}
            className="btn btn-secondary block btn-sm w-[100%]"
          >
            Edit
          </button>
          <button
            onClick={onLive}
            className="btn btn-success block btn-sm w-[100%]"
          >
            Go Live
          </button>
          {/* <button
            onClick={onBack}
            className="btn btn-outline block btn-sm flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-5 inline" />
            BACK
          </button> */}
        </div>
      </div>
      {editRoomData}
    </div>
  );
};

export default SinglePlayerView;
