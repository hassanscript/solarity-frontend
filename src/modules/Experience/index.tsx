import React from "react";
import GalleryE from "components/GalleryE";
import BigRoom from "components/BigRoom";
import { GALLERYE } from "data/marketplace";
import { BIG_ROOM } from "data/experience";

const Experience = () => {
  return (
    <div className="flex flex-col pb-14">
      <BigRoom {...BIG_ROOM}/>
      <GalleryE />
    </div>
  );
};

export default Experience;
