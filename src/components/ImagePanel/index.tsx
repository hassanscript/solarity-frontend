import React, {useState} from "react";

import Image from "next/image";
import { CloseSm } from "components/Icons";

export interface AvatarPanelProps {
  imageSrc: any;
  title: string;
  onClick: Function;
  selected?: boolean;
}

const AvatarPanel = (props: AvatarPanelProps) => {
  return (
    <div className={`relative w-full h-[150px] rounded-[20px] border-[1.5px] border-white/10 hover:border-primary z-10 bg-transparent max-w-[250px] ${props.selected?"border-primary":""}`}>
        <div className="absolute top-1 left-1 right-1 rounded-[20px] avatar-panel h-[150px]">
            <img
                src={props.imageSrc}
                alt={props.title}
                className="rounded-2xl"
            />
        </div>
        <div 
          className="absolute flex items-center h-8 top-[15px] right-[10px] m-auto w-8 p-1 bg-[rgba(12,12,14,0.5)] rounded-[15px] cursor-pointer" 
          onClick={(param) => props.onClick(param)}
        >
            <span className="text-[12px] text-[#f3f3f3] w-full h-full bg-[rgba(50, 50, 50, 0.1)] rounded-full opacity-50 hover:opacity-100">
              <CloseSm />
            </span>
        </div>
    </div>
  );
};

export default AvatarPanel;
