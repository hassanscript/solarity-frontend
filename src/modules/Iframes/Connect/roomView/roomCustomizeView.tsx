import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getNfts } from "hooks";
import FirstEditRoom from "components/EditRoom/FirstEditRoom";
import SecondEditRoom from "components/EditRoom/SecondEditRoom";
import LockedRoom from "components/Banner/LockedRoom";
import { useState } from "react";
import { Button, Stack } from "components/FormComponents";
import { NftCardSelect } from "modules/User/NftCardSelect";
import { updateNftCard } from "redux/slices/profileSlice";

const RoomCustomizeView = () => {
  const dispatch = useDispatch();
  const { rooms, username, solanaAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const [selected, setSelected] = useState<string>();
  const [chooseFlag, setChooseFlag] = useState<string | Boolean>(false);
  const [picNo, setPicNo] = useState<string>("0");
  const [room_id, setRoom_id] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();

  const { roomNo: activeRoomNo } = rooms.find(({ active }: any) => active);
  const [nfts, nftLoading, nftError] = getNfts(username, solanaAddress);
  let editRoomData;

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

  if (activeRoomNo == 0) {
    editRoomData = (
      <FirstEditRoom
        chooseFlag={chooseFlag}
        setChooseFlag={setChooseFlag}
        picNo={picNo}
        setPicNo={setPicNo}
        setRoom_id={setRoom_id}
        imageUrl={imageUrl}
      />
    );
  } else if (activeRoomNo == 1) {
    editRoomData = (
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
    editRoomData = (
      <div
        className="w-full h-[240px] rounded-2xl relative"
        style={{ background: "rgba(255, 255, 255, 0.2)" }}
      >
        <LockedRoom />
      </div>
    );
  }

  var nftsContent = undefined;
  if (nftLoading) {
    nftsContent = (
      <div className="alert alert-warning w-full shadow-lg">
        <span>Loading NFTs...</span>
      </div>
    );
  } else if (nftError) {
    nftsContent = (
      <div className="alert alert-error w-full shadow-lg">
        <span>Error While Loading NFTs</span>
      </div>
    );
  } else if (nfts.length == 0) {
    nftsContent = (
      <div className="alert alert-info w-full shadow-lg">
        <span>You don't own any NFTs</span>
      </div>
    );
  } else {
    nftsContent = (
      <div className="py-2">
        <div className="flex h-[110px] flex-wrap items-center overflow-x-auto rounded-xl border border-brandblack scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
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
        {picNo != "0" ? (
          <div className="float-right mt-2">
            <Button wrap className="choose-btn" onClick={chooseNft}>
              Choose
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative h-[250px] w-[100%] rounded-xl overflow-hidden">
        {editRoomData}
      </div>
      {nftsContent}
    </div>
  );
};

export default RoomCustomizeView;
