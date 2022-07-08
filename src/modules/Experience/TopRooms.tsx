import React from "react";
import GalleryE from "components/GalleryE";
import GalleryRowHeader from "components/Gallery/GalleryRowHeader";
import GalleryItemEr from 'components/Gallery/GalleryItemEr';
import BaseUrl from "config";
const TopRooms = () => {
  return (
    <div className="flex flex-col pb-14 mt-4">
      <div className="flex flex-col gap-6 my-4 ml-2">
        <div className="flex flex-col">
          <GalleryRowHeader title={"Top Rooms"} />
          <div className="grid grid-cols-4 gap-3 mt-4">
            <GalleryItemEr 
              title="SolGods Room owned by SUPER" 
              imageUrl="/images/placeholder/marketplace/rooms/1.png"
              roomUrl={BaseUrl + "/super/room1/626ec9f8406e8d1c4083103e"}
            />
            <GalleryItemEr 
              title="Money Room owned by TMETA" 
              imageUrl="/images/placeholder/marketplace/rooms/0.jpg"
              roomUrl={BaseUrl + "/tmeta/room1/62aff473f09100fd752dbfc7"}
            />
            <GalleryItemEr 
              title="SolGods Room owned by TMETA" 
              imageUrl="/images/placeholder/marketplace/rooms/1.png"
              roomUrl={BaseUrl + "/tmeta/room1/62aff459f09100fd752dbfc0"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRooms;
