import React, { FC } from "react";
import GalleryERow from "../Gallery/GalleryERow";
import { Gallery } from "modal/Gallery";
import { apiCaller } from "utils/fetcher";

const GalleryE = () => {
  return (
    <div className="flex flex-col gap-6 my-4">
      <GalleryERow />
    </div>
  );
};

export default GalleryE;
