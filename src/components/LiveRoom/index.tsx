import React from "react";
import Image from "next/image";
import { useAppDispatch } from "../../redux/hooks";
import { setRoomIndex } from "redux/slices/chatSlice";
const index = ({
  data: { roomName, name, speakers },
  index,
}: {
  data: { roomName: string, name: string, speakers: string[] };
  index: number;
}) => {
  const dispatch = useAppDispatch();
  const handleModalToggle = () => {
    dispatch(setRoomIndex(index))
  }
  return (
    <div className="grid items-center px-5 py-4 cursor-pointer" onClick={handleModalToggle}>
      <div className="font-bold text-[15px] font-white">{roomName}</div>
      <div className="grid grid-cols-9">
        <div className="col-span-3 mt-4 text-xs text-gray-950">Creator: {name}</div>
        <div className="col-span-5 flex items-center gap-12">
          <span className="flex mt-2 ml-4 text-xs font-semibold text-white">
            {!!speakers && speakers.map((speaker, index) => {
              if(index < 15) {
                return (
                  <div
                    className="-ml-4"
                    key={index}
                  >
                    <Image
                      src="/images/icons/sol.png"
                      alt={speaker}
                      height={32}
                      width={32}
                    />
                  </div>
                )
              }
            })}
          </span>
        </div>
        <span className="col-span-1 mt-4 text-xs text-[#3BA946]">{speakers.length}</span>
      </div>
    </div>
  );
};

export default index;