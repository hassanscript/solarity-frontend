import React, { FC } from "react";
import GalleryRow from "./GalleryRow";
import { Gallery } from "modal/Gallery";

const GalleryComponent: FC<Gallery> = ({ rows }) => {
  return (
    <div className="flex flex-col gap-6 my-9">
      {rows.map((row, index) => (
        <GalleryRow key={index} galleryRow={row} tagIndex={index}/>
      ))}
    </div>
  );
};

export default GalleryComponent;
