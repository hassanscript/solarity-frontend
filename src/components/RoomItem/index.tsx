import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setActiveRoomNo } from "../../redux/slices/profileSlice";
import { apiCaller } from "utils/fetcher";
import { useRouter } from "next/router";
import NestedToolTip from "components/NestedToolTip";
import { CopySmall } from "components/Icons";

const RoomItem = ({
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
        <div className="m-2 col-span-1 w-1/3">
            <div className="w-full">
                <div 
                    className={"cursor-pointer border border-transparent hover:border-gray-400  rounded-2xl " + (room.roomNo == activeIndex ? "border-gray-200 ": " ") + (activeIndex == -1 && room.active == true ? "border-gray-200 ": " ")}
                    onClick={setActive}
                >
                    <Image 
                        src={"/assets/images/roomItems/item" + room.roomNo + ".png"}
                        width="100%" 
                        height="100%" 
                        layout="responsive" 
                        objectFit="contain"
                    />
                </div>
                <div className="flex justify-center font-secondary ">
                    <NestedToolTip 
                        content={
                            <span 
                                className="flex hover:text-secondary text-sm cursor-pointer mt-2"
                            >
                                {room.title} &nbsp;
                                <span className="pt-1"><CopySmall /></span>
                            </span>
                        }
                        link={
                            process.env.NODE_ENV === "development" ? 
                            process.env.NEXT_PUBLIC_LOCAL_FRONTEND_URL + `/${username}/room${room.roomNo}/${room._id}` : 
                            process.env.NEXT_PUBLIC_FRONTEND_URL + `/${username}/room${room.roomNo}/${room._id}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomItem;