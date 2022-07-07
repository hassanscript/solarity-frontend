import React, { useState } from "react";
import { useRouter } from 'next/router'
import { FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import { toast } from "react-toastify";
import { TickCircle, Bid, GridAdd } from "components/Icons";
import CreateRoomModal from "components/Modals/CreateRoomModal";
import BaseUrl from "config";

export type GalleryItemErProps = {
  title: string;
  imageUrl: string;
  roomUrl: string;
};

const GalleryItemEr: FC<GalleryItemErProps> = ({
    title,
    imageUrl,
    roomUrl,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));

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
            <a href={roomUrl} target="blank">
              <div 
              className="flex"
              >
                  <GridAdd />&nbsp;<span className="pt-[3px]">Explore</span>
              </div>
            </a>
          </button>
        </div>

        <span className="px-2 text-xs text-center">{title}</span>
      </div>
    </div>
  );
};

export default GalleryItemEr;
