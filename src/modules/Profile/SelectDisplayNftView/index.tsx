import { Button, Stack } from "components/FormComponents";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FirstEditRoom from "components/EditRoom/FirstEditRoom";
import SecondEditRoom from "components/EditRoom/SecondEditRoom";
import { getNfts } from "hooks";
import { NftCardSelect } from "modules/User/NftCardSelect";
import { setActiveRoomNo, updateNftCard } from "redux/slices/profileSlice";
import { useRouter } from "next/router";
import LockedRoom from "components/Banner/LockedRoom";
import RoomItem from "components/RoomItem";

const SelectDisplayNftView = () => {
  const dispatch = useDispatch();
  const { profileData, activeRoomId, activeRoomNo } = useSelector(
    (state: RootStateOrAny) => ({
      profileData: state.profile.data,
      activeRoomId: state.profile.activeRoomId,
      activeRoomNo: state.profile.activeRoomNo,
    })
  );
  const [nfts, nftLoading, nftError] = getNfts(
    profileData.username,
    profileData.solanaAddress
  );
  const [selected, setSelected] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [picNo, setPicNo] = useState<string>("0");
  const [chooseFlag, setChooseFlag] = useState<string | Boolean>(false);
  const [room_id, setRoom_id] = useState("");
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if(!!profileData.rooms) {
      setRooms(profileData.rooms);
    }
  }, [profileData.rooms]);

  useEffect(() => {
    if(rooms.length > 0) {
      const roomIndex = rooms.findIndex(s => s.active == true);
      if(roomIndex > -1) {
          setActiveIndex(rooms[roomIndex].roomNo);
          setActiveId(rooms[roomIndex]._id);
          dispatch(setActiveRoomNo({activeRoomId: rooms[roomIndex]._id, activeRoomNo: rooms[roomIndex].roomNo}))
      }
      var tmpRooms = [...rooms];
      tmpRooms.sort((a: any, b: any) => {
          return a.roomNo - b.roomNo;
      })
      // setRooms(tmpRooms);
    }
  }, [rooms])
  
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

  const back = () => {
    router.push(`/${profileData.username}`);
  };

  const toAssets = () => {
    router.push(`/${profileData.username}/assets`);
  };
  let editRoomData;
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
  // } else if(activeRoomNo == 2){
  } else {
    editRoomData = (<div className="w-full h-[240px] rounded-2xl relative" style={{background: "rgba(255, 255, 255, 0.2)"}}>
      <LockedRoom />
    </div>);
  }

  var nftsContent=undefined;
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
        <span>
          You don't own any NFTs
        </span>
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
    <div>
      <span className="text-2xl font-bold">
        Select NFTs to Display in Room.
      </span>
      <Stack spacing={3}>
        <div className="relative mt-4 h-[250px] w-full rounded-2xl">
          {editRoomData}
        </div>
        {nftsContent}
        <div className="ml-5 w-full">
          <div className="py-5 pl-2 text-sm flex justify-between">
              <span>Rooms</span>
          </div>
          <div className="w-full rounded-xl border border-brandblack">
            <div className="flex grid-cols-3">
                {
                    rooms && rooms.map((room, index) => (
                        <RoomItem kind={"true"} room={room} activeIndex={activeIndex} setActiveIndex={setActiveIndex} activeId={activeId} setActiveId={setActiveId} key={index} />
                    ))
                }
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="float-right flex">
            <Button wrap onClick={toAssets}>
              Go to Assets
            </Button>{" "}
            &nbsp;&nbsp;
            <Button wrap onClick={back}>
              Back to Profile
            </Button>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default SelectDisplayNftView;
