import React, { useState } from "react";
import { FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import { toast } from "react-toastify";
import { TickCircle, Bid, GridAdd } from "components/Icons";
import { GalleryItem } from "modal/Gallery";
import CreateRoomModal from "components/Modals/CreateRoomModal";

export type GalleryItemEProps = {
  type: Boolean;
  roomNo: number;
  title: string;
  imageUrl: string;
  currentBid: string;
};

const GalleryItemComponent: FC<GalleryItemEProps> = ({
    type,
    roomNo,
    title,
    imageUrl,
    currentBid,
}) => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));

  const handleCreateModalToggle = () => {
    setCreateModalOpen(!createModalOpen);
  };

  return (
    <div className="flex flex-col group ">
      <div className="flex flex-col justify-center gap-2 p-2 transition-all ease-in rounded-t-3xl rounded-b-3xl group-hover:rounded-b-none bg-brandblack">
        <div className="relative h-[133px] w-full flex justify-center items-center ">
          <Image
            src={imageUrl}
            alt="nft item"
            layout="fill"
            priority={true}
            className="rounded-3xl"
          />
          <button className="z-10 gap-1 normal-case bg-white rounded-full opacity-0 btn btn-sm btn-accent group-hover:opacity-100 hover:bg-accent text-secondary">
            <div 
            className="flex" 
            onClick={handleCreateModalToggle}
            >
            <GridAdd />&nbsp;<span className="pt-[3px]">Create</span>
            </div>
          </button>
        </div>

        <span className="px-2 text-xs text-center">{title}</span>
      </div>
      <CreateRoomModal
        open={createModalOpen}
        title={title}
        type={type}
        roomNo={roomNo}
        onClose={handleCreateModalToggle}
      />
    </div>
  );
};

export default GalleryItemComponent;
