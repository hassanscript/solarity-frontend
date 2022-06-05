import React, { FC, useState, useEffect } from "react";
import { useAppSelector } from "redux/hooks";
import Image from "next/image";
import AframeComp2 from "components/AframeComp2";
import AframeComp6 from "components/AframeComp6";
import Link from "next/link";
import { User } from "modules/User/Hero";
import LockedRoom from "components/Banner/LockedRoom";
import BaseUrl from "config";
export interface BannerProps {
  vrprofile: {
    featured: boolean;
    imageUrl: string;
    price: string;
  };
  user: any;
  vrdao?: {
    featured: boolean;
    imageUrl: string;
    price: string;
  };
  smallImage: string;
}

const Banner: FC<BannerProps> = ({ vrprofile, user, vrdao, smallImage }) => {
  const { activeRoomId } = useAppSelector((state) => state.profile);
  const [permition, setPermition] = useState(false);
  const [room, setRoom] = useState<any>({});

  useEffect(() => {
    if (!!user && !!user.rooms) {
      var roomIndex = -1;
      if (activeRoomId != "") {
        roomIndex = user.rooms.findIndex((s: any) => s._id == activeRoomId);
      } else {
        roomIndex = user.rooms.findIndex((s: any) => s.active == true);
      }
      if (roomIndex == -1) {
        setPermition(true);
      } else {
        setRoom(user.rooms[roomIndex]);
      }
    }
  }, [activeRoomId]);

  return (
    <div>
      {vrprofile && (
        <div className="relative -mt-5 h-[400px] w-full rounded-2xl">
          {/* <AframeComp2 user={user} permitionFlag={false}/> */}
          {user.rooms && user.rooms.length != 0 && permition == false ? (
            
            <iframe
              className="mb-2 w-full"
              title="banner"
              height={400}
              src={BaseUrl + "super/room" + room.roomNo + "/" + room._id}
            />

          ) : (
            <div className="w-full h-[400px] rounded-2xl relative" style={{background: "rgba(255, 255, 255, 0.2)"}}>
              <LockedRoom />
            </div>
          )}
          {/* {vrprofile.price && (
            <Link
              href={
                "https://solarityvr.github.io/money-boy-hub/room/room.html?controls=mouse"
              }
            >
              <button className="btn absolute top-2 right-2 rounded-full bg-white text-sm font-bold text-secondary">
                Play
              </button>
            </Link>
          )} */}
        </div>
      )}
      {vrdao && (
        <div className="relative -mt-5 h-[400px] w-full rounded-2xl">
          <AframeComp6 />
          {/* </iframe> */}
          {vrdao.price && (
            <Link
              href={
                "https://solarityvr.github.io/money-boy-hub/hub/hub.html?controls=mouse"
              }
            >
              <button className="btn absolute top-2 right-2 rounded-full bg-white text-sm font-bold text-secondary">
                Play
              </button>
            </Link>
          )}
        </div>
      )}
      <div className="flex justify-center ">
        <div className="relative -mt-28 h-[201px] w-[201px] rounded-full">
          <img
            className="rounded-full"
            style={{ border: "5px solid white" }}
            src={smallImage}
            alt={"Profile Image"}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
