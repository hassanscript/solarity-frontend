import { Button, Stack } from "components/FormComponents";
import { getNfts } from "hooks";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import placeholder from "../../../assets/images/placeholder/avatar.png";

const ProfilePicSelectorModal = () => {};

const UpdateProfilePicView = () => {
  const profileData = useSelector(
    (state: RootStateOrAny) => state.profile.data || {}
  );
  const { profileImageLink, profileImageAddress } = profileData;
  const [updateMode, setUpdateMode] = useState(false);

  return (
    <div className="flex space-x-6">
      <img
        src={profileImageLink || placeholder.src}
        alt=""
        className="rounded-3xl"
        width={300}
      />
      <Stack spacing={5} className="flex-1">
        <h3 className="font-bold text-2xl">
          {profileImageLink ? "Current" : "No"} Profile Pic In Use
        </h3>
        {profileImageLink && (
          <div>
            <span className="badge badge-outline">Mint Address</span>
            <p>{profileImageAddress || "-"}</p>
          </div>
        )}
        {/* <Button className="mt-5" onClick={() => setUpdateMode(true)}>
          {profileImageLink ? "Update" : "Set"} Profile Pic
        </Button> */}
      </Stack>
    </div>
  );
};

export default UpdateProfilePicView;
