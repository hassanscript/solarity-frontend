import React, { FC, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import RoomScene from 'components/BigRoom/RoomScene';
import LiveRooms from "components/LiveRooms";
import JoinRoomModal from "components/Modals/JoinRoomModal";
import { useAppSelector } from "../../redux/hooks";

import { BigRoomType } from "modal/experience";

import ACTIONS from '../../config/actions';

const BigRoom: FC<BigRoomType> = ({ scene, content }) => {
  const  [joinModalOpen,setJoinModalOpen] = useState(false)
  const { rooms, selectedIndex } = useAppSelector(state => state.chat);
  var selectedRoom: any = {};
  
  if(!!rooms && rooms.length !=0 && selectedIndex != -1) {
    selectedRoom = rooms[selectedIndex];
  }

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
        <div className="relative w-full h-[314px] min-h-[314px  ] rounded-3xl -mt-5">
          <RoomScene data={scene.bgImage} />
        </div>

        {content && selectedRoom ? (
          <div className="flex justify-between my-6">
            <div className="flex flex-col max-w-4xl ">
              <span className="text-[15px] text-secondary">{selectedRoom.roomName}</span>
              <span className="mt-3 text-sm text-gray-950">
                {selectedRoom.roomName}
              </span>
            </div>
            <div>
              <div>
                {!!selectedRoom.speakers && selectedRoom.speakers.map((speaker: string, index: any) => (
                  <img key={index} src="/images/icons/sol.png" alt={speaker} width="25" height="25" />
                ))}
              </div>
              { !!selectedRoom.roomName ? (
                  <button className="btn btn-secondary rounded-3xl" onClick={handleJoinModalToggle}>
                    {content.buttonText}
                  </button>
              ) : (<></>)}
            </div>
          </div>
        ): (<></>)}
      </div>
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
    </div>
  );
};

export default BigRoom;
