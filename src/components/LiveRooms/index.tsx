import React, { FC, useState } from "react";
import { useSelector, RootStateOrAny } from 'react-redux';
import { toast } from 'react-toastify';
import LiveRoomComp from "components/LiveRoom";
import CreateRoomModal from "components/Modals/CreateRoomModal";

interface IProps {
  rows: any[];
}

const LiveRooms: FC<IProps> = ({ rows: rooms }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));

  const handleCreateModalToggle = () => {
    if(!createModalOpen) {
      if(!profileData.rooms || profileData.rooms.length == 0) {
        toast.warning("You don't have an own room. you can buy rooms in marketplace", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
    setCreateModalOpen(!createModalOpen);
  };
  return (
    <div className="mx-3 -mt-5">
      <div className="justify-between bg-brandblack rounded-3xl">
        <div className="flex items-center justify-between border-b border-borderwidget">
          <div className="flex flex-col p-5">
            <div className="flexfont-[19px] font-bold">Rooms</div>
          </div>
          {/* <div className="pr-5 text-xs cursor-pointer text-secondary" onClick={handleCreateModalToggle}>Create a Room</div> */}
        </div>
        <div>
          <div className="divide-y divide-borderwidget max-h-[42vh] min-h-[42vh] overflow-y-auto scrollbar-thin scrollbar-thumb-black">
            {rooms.map((room, index) => (
              <LiveRoomComp key={index} data={room} index={index} />
            ))}
          </div>
        </div>
      </div>
      {/* <CreateRoomModal
        open={createModalOpen}
        onClose={handleCreateModalToggle}
      /> */}
    </div>
  );
};

export default LiveRooms;
