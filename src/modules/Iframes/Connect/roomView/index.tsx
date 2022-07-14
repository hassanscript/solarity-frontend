import { FC, useEffect, useState } from "react";
import ViewHolder from "../viewHolder";
import RoomUpdateView from "./roomUpdateView";
import RoomCustomizeView from "./roomCustomizeView";
import { Loader } from "components";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Sidebar from "./sidebar";
import FirstEditRoom from "components/EditRoom/FirstEditRoom";
import SecondEditRoom from "components/EditRoom/SecondEditRoom";
import LockedRoom from "components/Banner/LockedRoom";
import { getNfts } from "hooks";
import { NftCardSelect } from "modules/User/NftCardSelect";
import { updateNftCard } from "redux/slices/profileSlice";
import { ChevronLeftIcon } from "@heroicons/react/solid";

const RoomView: FC<{
  onNext: () => void;
  editMode?: boolean;
  onBack?: () => void;
  onCopy?: () => void;
  onLive?: () => void;
}> = ({ onNext, editMode, onBack, onCopy, onLive }) => {
  const dispatch = useDispatch();
  const [roomUpdateView, setRoomUpdateView] = useState(false);
  const [loading, setLoading] = useState(false);
  const { rooms, username, solanaAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const activeRoom = rooms.find((room: any) => room.active);
  useEffect(() => {
    if (!activeRoom) {
      setRoomUpdateView(true);
    }
  }, [activeRoom]);

  const [selected, setSelected] = useState<string>();
  const [chooseFlag, setChooseFlag] = useState<string | Boolean>(false);
  const [picNo, setPicNo] = useState<string>("0");
  const [room_id, setRoom_id] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();

  const { roomNo: activeRoomNo } = rooms.find(({ active }: any) => active);
  const [nfts, nftLoading, nftError] = getNfts(username, solanaAddress);
  let editRoomData;
  let roomView;

  var chooseNft = () => {
    dispatch(
      updateNftCard({
        data: {
          roomId: room_id,
          picNo: picNo,
          mintAddress: selected,
          link: imageUrl,
        },
        successFunction: () => {},
        errorFunction: () => {},
        finalFunction: () => {},
      })
    );
    setChooseFlag(true);
  };

  if (activeRoom && activeRoom.roomNo == 0) {
    roomView = (
      <FirstEditRoom
        chooseFlag={chooseFlag}
        setChooseFlag={setChooseFlag}
        picNo={picNo}
        setPicNo={setPicNo}
        setRoom_id={setRoom_id}
        imageUrl={imageUrl}
      />
    );
  } else if (activeRoom && activeRoom.roomNo == 1) {
    roomView = (
      <SecondEditRoom
        chooseFlag={chooseFlag}
        setChooseFlag={setChooseFlag}
        picNo={picNo}
        setPicNo={setPicNo}
        setRoom_id={setRoom_id}
        imageUrl={imageUrl}
      />
    );
  } else {
    roomView = (
      <div
        className="w-full h-[240px] rounded-2xl relative"
        style={{ background: "rgba(255, 255, 255, 0.2)" }}
      >
        <LockedRoom />
      </div>
    );
  }

  return (
    <div className="flex h-[100vh] w-[100vw]">
      <div className="flex-1 relative">{roomView}</div>
      <div className="w-[25%] min-w-[200px] max-w-[400px] h-[100%]">
        <Sidebar
          setLoading={setLoading}
          loading={loading}
          setNFTdisabled={picNo == "0"}
          onNFTSet={chooseNft}
          onNext={onNext}
          editMode={editMode}
          onCopy={onCopy}
          onLive={onLive}
        >
          <div className="flex flex-wrap">
            {nfts.map(({ mintAddress: mint, name, uri }, index) => (
              <NftCardSelect
                uri={uri}
                name={name}
                mint={mint}
                key={index}
                selected={mint == selected}
                onClick={(mint: any, uri: any) => {
                  setSelected(mint);
                  setImageUrl(uri);
                }}
              />
            ))}
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default RoomView;
