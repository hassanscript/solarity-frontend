import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RoomItem from "components/RoomItem";

const OwnRooms = ({ rooms }: { rooms: any[] }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeId, setActiveId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const roomIndex = rooms.findIndex(s => s.active == true);
        if(roomIndex > -1) {
            setActiveIndex(rooms[roomIndex].roomNo);
            setActiveId(rooms[roomIndex]._id);
        }
    }, [rooms])

    const editRoom = () => {
        router.push("/profile?view=nft_selection");
    }

    return (
        <div className="bg-brandblack rounded-3xl m-5 w-full p-10">
            <div className="flex grid-cols-10 w-full">
                <div className="col-span-6 mr-5 w-3/5">
                    <h2 className="py-5 pl-2 m-0">Rooms</h2>
                    <Image 
                        src={"/assets/images/rooms/room" + (activeIndex != -1 ? activeIndex : 0) + ".png"}
                        alt={"room no-" + (activeIndex != -1 ? activeIndex : 0)}
                        width="100%" 
                        height="50%" 
                        layout="responsive" 
                        objectFit="contain"
                    />
                </div>
                <div className="col-span-4 ml-5 w-2/5">
                    <div className="py-5 pl-2 text-sm flex justify-between">
                        <span>Add ons</span>
                        <span className="text-secondary cursor-pointer" onClick={editRoom}>Edit Active Room</span>
                    </div>
                    <div className="flex grid-cols-3">
                        {
                            rooms && rooms.map((room, index) => (
                                <RoomItem room={room} activeIndex={activeIndex} setActiveIndex={setActiveIndex} activeId={activeId} setActiveId={setActiveId} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnRooms;
