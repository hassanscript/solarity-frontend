import React, { useState, useRef } from "react";

import Image from "next/image";
import { CloseSm } from "components/Icons";
import { useDrag, useDrop } from 'react-dnd'

export interface AvatarPanelProps {
  imageSrc: any;
  title: string;
  onClick: Function;
  selected?: boolean;
  index: number;
  moveListItem: any;
}


const AvatarPanel = (props: AvatarPanelProps) => {
    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
      type: 'item',
      item: { index: props.index },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    })


    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
      accept: 'item',
      hover: (item: any, monitor: any) => {
        const dragIndex = item.index
        const hoverIndex = props.index
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

        // if dragging down, continue only when hover is smaller than middle Y
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        // if dragging up, continue only when hover is bigger than middle Y
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

        props.moveListItem(dragIndex, hoverIndex)
        item.index = hoverIndex
      },
    })

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1
  return (
    <div ref={dragDropRef} style={{ opacity }} className={`relative w-full h-[150px] rounded-[20px] border-[1.5px] border-white/10 hover:border-primary z-10 bg-transparent max-w-[250px] ${props.selected?"border-primary":""}`}>
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
