import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { toast } from 'react-toastify';
import RoomScene from 'components/BigRoom/RoomScene';
import LiveRooms from "components/LiveRooms";
import JoinRoomModal from "components/Modals/JoinRoomModal";
import { useAppSelector } from "../../redux/hooks";

import { BigRoomType } from "modal/experience";

import ACTIONS from '../../config/actions';

const BigRoom: FC<BigRoomType> = ({ scene, content }) => {
  const { rooms, selectedIndex } = useAppSelector(state => state.chat);

  const  [ joinModalOpen,setJoinModalOpen ] = useState(false)
  const [ selectedImageUrl, setSelectedImageUrl ] = useState(scene.bgImage);
  const [ selectedRoom, setSelectedRoom ] = useState<any>({});
  const publicUrls = ["/assets/images/rooms/hub.jpg", "/assets/images/rooms/gallery.png"]
  useEffect(() => {
    if(!!rooms && rooms.length !=0 && selectedIndex != -1) {
      setSelectedRoom(rooms[selectedIndex]);
    }
  }, [rooms, selectedIndex]);

  useEffect(() => {
    if(!!selectedRoom) {
      if(selectedRoom.type != undefined) {
        if(selectedRoom.type == false) {
          setSelectedImageUrl(publicUrls[selectedRoom.roomNo]);
        } else {
          setSelectedImageUrl(selectedRoom.imageUrl);
        }
      }
    }
  }, [selectedRoom]);

  const handleJoinModalToggle = () => {
    if(selectedIndex != -1){
      setJoinModalOpen(!joinModalOpen)
    } else {
      toast.error('Select a room please', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  useEffect(() => {
    setTimeout(() => {
      if(!!window.socket)
        window.socket.emit(ACTIONS.ROOM_LIST, {});
    }, 100);
  }, []);
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <LiveRooms rows={rooms} />
      </div>
      <div className="col-span-2" >
        {selectedImageUrl && (
          <div className="relative w-full h-[314px] min-h-[314px  ] rounded-3xl -mt-5">
            <RoomScene data={selectedImageUrl} />
          </div>
        )}

        {selectedRoom && content && selectedRoom.roomName ? (
          <div className="flex justify-between my-6">
            <div className="flex flex-col max-w-4xl ">
              <span className="text-[15px] text-secondary">{selectedRoom.roomName}</span>
              <span className="mt-3 text-sm text-gray-950">
                creator: {selectedRoom.name}
              </span>
            </div>
            <div>
              <div className="flex ml-4">
                {!!selectedRoom.speakers && selectedRoom.speakers.map((speaker: string, index: any) => (
                  <div
                    className="-ml-4"
                    key={index}
                  >
                    <img
                      src={selectedRoom.avatars[index] ? selectedRoom.avatars[index]: "/images/placeholder/avatars/avatar.png"}
                      alt={speaker}
                      className="rounded-full border border-gray-400"
                      height={32}
                      width={32}
                    />
                  </div>
                ))}
              </div>
              { !!selectedRoom.roomName ? (
                  <button className="btn btn-secondary rounded-3xl mt-1" onClick={handleJoinModalToggle}>
                    {content.buttonText}
                  </button>
              ) : (<></>)}
            </div>
          </div>
        ): (<></>)}
      </div>
      {selectedRoom && (
        <JoinRoomModal 
          open={joinModalOpen} 
          onClose={handleJoinModalToggle} 
          roomName={selectedRoom.roomName}
          type={selectedRoom.type}
          roomNo={selectedRoom.roomNo}
          person={""}
          creator={selectedRoom.name}
          speakers={selectedRoom.speakers}
        />
      )}
    </div>
  );
};

export default BigRoom;
