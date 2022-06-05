import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setActiveRoomNo } from "../../redux/slices/profileSlice";
import { apiCaller } from "utils/fetcher";
import { useRouter } from "next/router";
import NestedToolTip from "components/NestedToolTip";
import { CopySmall } from "components/Icons";

const RealRoomItem = ({
  room,
  activeIndex,
  setActiveIndex,
  activeId,
  setActiveId,
}: {
  room: any;
  activeIndex: number;
  setActiveIndex: any;
  activeId: string;
  setActiveId: any;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { username } = router.query;
    const setActive = async () => {
        setActiveIndex(room.roomNo)
        setActiveId(room._id);
        dispatch(setActiveRoomNo({activeRoomId: room._id, activeRoomNo: room.roomNo}));
        await apiCaller.post(`/profile/setActiveRoom`, {
            roomNo: room.roomNo,
        });
    }
    return (
        <div className="m-2 col-span-1 w-1/5">
            <div className="w-full">
                <div 
                    className={"cursor-pointer border border-transparent hover:border-gray-400  rounded-2xl " + (room.roomNo == activeIndex ? "border-gray-200 ": " ") + (activeIndex == -1 && room.active == true ? "border-gray-200 ": " ")}
                    onClick={setActive}
                >
                    <img 
                        src={room.imageUrl}
                        className="rounded-2xl"
                        width="100%" 
                    />
                </div>
                <div className="flex justify-center font-secondary text-sm ">
                    {room.title}
                </div>
            </div>
        </div>
    );
};

export default RealRoomItem;