import React from "react";
import { FC } from "react";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import { toast } from "react-toastify";
import { TickCircle, Bid, GridAdd } from "components/Icons";
import { GalleryItem } from "modal/Gallery";

const HubItemComponent = () => {
  const dispatch = useDispatch();
  const handlePlaceBidToggle = () => {
  }

  return (
    <div className="flex flex-col group ">
      <div className="flex flex-col justify-center gap-2 p-2 transition-all ease-in rounded-t-3xl rounded-b-3xl group-hover:rounded-b-none bg-brandblack">
        <div className="relative h-[133px] w-full flex justify-center items-center ">
          <Image
            src={"/assets/images/rooms/room1.png"}
            alt="nft item"
            layout="fill"
            priority={true}
            className="rounded-3xl"
          />
          <button className="z-10 gap-1 normal-case bg-white rounded-full opacity-0 btn btn-sm btn-accent group-hover:opacity-100 hover:bg-accent text-secondary">
            <div 
            className="flex" 
            onClick={handlePlaceBidToggle}
            >
            <GridAdd /> Create a Room
            </div>
          </button>
        </div>

        <span className="px-2 text-xs text-center">{"Hub"}</span>
      </div>
    </div>
  );
};

export default HubItemComponent;
