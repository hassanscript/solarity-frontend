import React, { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import GalleryRowHeader from "components/Gallery/GalleryRowHeader";
import GalleryItemE from "components/Gallery/GalleryItemE";
import HubItem from "components/HubItem";

const GalleryERow = () => {
  const { rooms } = useAppSelector(state => state.profile.data);

  return (
    <div className="flex flex-col">
      <GalleryRowHeader title={"Rooms"} />
      <div className="grid grid-cols-4 gap-3 mt-4">
        <GalleryItemE 
          key={0} 
          type={false}
          roomNo={0} 
          title={"Hub"}
          imageUrl={"/assets/images/rooms/room1.png"}
          currentBid={"0"}
        />
        <GalleryItemE 
          key={1} 
          type={false}
          roomNo={1} 
          title={"Gallery"}
          imageUrl={"/assets/images/rooms/gallery.png"}
          currentBid={"0"}
        />
        {
          rooms && rooms.length != 0 && rooms.map((room: any, index: number) => (
            <GalleryItemE key={index + 2} type={true} {...room} />
          ))
        }
      </div>
    </div>
  );
};

export default GalleryERow;
