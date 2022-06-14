import { Button, Stack } from "components/FormComponents";
import { getNfts } from "hooks";
import React, { FC, useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { minifyAddress } from "utils";
import placeholder from "../../../assets/images/placeholder/avatar.png";
import ProfilePicSelector from "./ProfilePicSelector";

const ProfilePicInfo: FC<{ info: any }> = ({ info }) => {
  try {
    if (Object.keys(info).length == 0) throw false;
    const { network, mintAddress, contractId, tokenId } = info;

    const infoList: { label: string; value: string }[] = [
      {
        label: "Network",
        value: network,
      },
    ];
    if (network == "Solana") {
      infoList.push({
        label: "Mint Address",
        value: minifyAddress(mintAddress, 8),
      });
    } else {
      infoList.push({
        label: "Contract Id",
        value: minifyAddress(contractId, 8),
      });
      infoList.push({ label: "Token Id", value: minifyAddress(tokenId, 8) });
    }
    return (
      <div className="space-y-2 rounded-3xl border border-brandblack p-5">
        {infoList.map(({ label, value }) => {
          return (
            <div>
              <span className="badge badge-outline text-xs">{label}</span>
              <p>{value}</p>
            </div>
          );
        })}
      </div>
    );
  } catch {
    return <></>;
  }
};

const UpdateProfilePicView = () => {
  const profileData = useSelector(
    (state: RootStateOrAny) => state.profile.data || {}
  );
  const { profileImageLink, profileImageInfo } = profileData;
  const [updateMode, setUpdateMode] = useState(false);
  return (
    <>
      <ProfilePicSelector
        show={updateMode}
        onHide={() => setUpdateMode(false)}
      />
      <div className="flex space-x-6">
        <img
          src={profileImageLink || placeholder.src}
          alt=""
          className="rounded-3xl"
          width={300}
        />
        <Stack spacing={5} className="flex-1">
          <h3 className="text-2xl font-bold">
            {profileImageLink ? "Current" : "No"} Profile Pic In Use
          </h3>
          <ProfilePicInfo info={profileImageInfo} />
          <Button onClick={() => setUpdateMode(true)}>
            {profileImageLink ? "Update" : "Set"} Profile Pic
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default UpdateProfilePicView;
