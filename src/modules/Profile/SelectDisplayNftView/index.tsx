import { Button, Stack } from "components/FormComponents";
import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import AframeEditRoom from "components/AframeEditRoom";
import { getNfts } from "hooks";
import { NftCardSelect } from "modules/User/NftCardSelect";
import { updateNftCard } from "redux/slices/profileSlice";
import { useRouter } from "next/router";

const SelectDisplayNftView = () => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));
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

  if (nftLoading) {
    return (
      <div className="alert alert-warning w-full shadow-lg">
        <span>Loading NFTs...</span>
      </div>
    );
  }
  if (nftError) {
    return (
      <div className="alert alert-error w-full shadow-lg">
        <span>Error While Loading NFTs</span>
      </div>
    );
  }
  if (nfts.length == 0) {
    return (
      <div className="alert alert-info w-full shadow-lg">
        <span>
          You don't own any NFTs so you will not be able to buy a room
        </span>
      </div>
    );
  }
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

  return (
    <div>
      <span className="text-2xl font-bold">
        Select NFTs to Display in Room.
      </span>
      <Stack spacing={3}>
        <div className="relative mt-4 h-[250px] w-full rounded-2xl">
          <AframeEditRoom
            chooseFlag={chooseFlag}
            setChooseFlag={setChooseFlag}
            picNo={picNo}
            setPicNo={setPicNo}
            setRoom_id={setRoom_id}
            imageUrl={imageUrl}
          />
        </div>
        <div className="p-2">
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
          <div className="mt-2">
            {picNo != "0" ? (
              <div className="float-left">
                <Button wrap className="choose-btn" onClick={chooseNft}>
                  Choose
                </Button>
              </div>
            ) : (
              <div></div>
            )}
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
        </div>
      </Stack>
    </div>
  );
};

export default SelectDisplayNftView;
