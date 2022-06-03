import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import JoinRoomModal from "components/Modals/JoinRoomModal";
import Logo from "components/Logo";
import { getServerSideProps, InvitationPageProps } from "modules/Experience/Invitation";
import NoInvitationView from "modules/Experience/NoInvitationView";
import { WalletCard } from "components/WalletCard";
import { GuestCard } from "components/GuestCard";
import { Xicon, Revert, Accept } from "components/Icons";
import ACTIONS from "../../../config/actions"; 
import {
  setName,
  addPeer,
  addMsg,
  removePeer,
  setRooms,
  setMsg,
  setRoomIndex
} from "../../../redux/slices/chatSlice";

const ProfileIndex: FC<InvitationPageProps> = ({ roomInfo, success }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { rooms } = useAppSelector(state => state.chat);
  const  [joinModalOpen,setJoinModalOpen] = useState(false)
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(-1);
  const handleJoinModalToggle = () => {
    if(selectedRoomIndex != -1){
      setJoinModalOpen(!joinModalOpen)
    }
  }
  if (!success || !roomInfo ) return <NoInvitationView />;
  useEffect(() => {
    // When a user click f5 key, it helps to forget a user's name.
    if (localStorage.getItem("name")) {
      dispatch(setName(localStorage.getItem("name")));
    }

    // This part is main for socket.
    if (!(window as any).socket) {
      return;
    }
    if (!(window as any).listen) {
      (window as any).socket.on(ACTIONS.ADD_PEER, (data: any) => {
        dispatch(addPeer(data));
      });
      (window as any).socket.on(ACTIONS.SEND_MSG, (data: any) => {
        dispatch(addMsg(data));
      });
      (window as any).socket.on(ACTIONS.REMOVE_PEER, (data: any) => {
        dispatch(removePeer(data));
      });

      (window as any).socket.on(ACTIONS.ROOM_LIST, (data: any) => {
        dispatch(setRooms(data.rooms));
      });

      (window as any).socket.on(ACTIONS.CREATE_ROOM, (data: any) => {
        dispatch(setMsg(data.msgs));
      });

      (window as any).socket.on(ACTIONS.ROOM_READY, (data: any) => {
        router.push(`experience/room?rid=${data.roomId}`);
      });
      (window as any).listen = true;
    }

    (window as any).socket.emit(ACTIONS.ROOM_LIST, {});
  }, []);

  useEffect(() => {
    if(rooms && rooms.length != 0) {
      const roomIndex = rooms.findIndex((s: any) => s.roomId == roomInfo.roomId);
      if(roomIndex != -1) {
        setSelectedRoomIndex(roomIndex);
        dispatch(setRoomIndex(roomIndex));
      }
    }
  }, [rooms]);

  const deny = () => {
    // if (!!(window as any).socket) {
    //   (window as any).socket.emit(ACTIONS.ACEEPT_INVITATION, {
    //     roomId: roomInfo.roomId,
    //     username: roomInfo.name,
    //     guestname: '',
    //     type: false,
    //   });
    // }
    router.push("/");
  };

  const back = () => {
    router.push("/");
  };
  return (
    <div className="pt-[10vh]">
      <div className="flex justify-center mb-5"><Logo /></div>
      <div className="flex justify-center mb-10">
        <p>
          Please join a room which was created by 
          <span className="text-secondary uppercase"> @{(rooms && rooms.length != 0 && rooms[selectedRoomIndex] != undefined) ? rooms[selectedRoomIndex].name : ""}</span>
        </p>
      </div>
      <div className="md:flex md:justify-center w-full">
        <WalletCard handleJoinModalToggle={handleJoinModalToggle}/>
        <GuestCard handleJoinModalToggle={handleJoinModalToggle}/>
      </div>
      <JoinRoomModal 
        open={joinModalOpen} 
        onClose={handleJoinModalToggle} 
        roomName={roomInfo.roomName}
        type={roomInfo.type}
        roomNo={roomInfo.roomNo}
        creator={(rooms && rooms.length != 0 && rooms[selectedRoomIndex] != undefined) ? rooms[selectedRoomIndex].name : ""}
        person={roomInfo.name}
        speakers={(rooms && rooms.length != 0 && rooms[selectedRoomIndex] != undefined) ? rooms[selectedRoomIndex].speakers : []}
      />
    </div>
  );
};

export { getServerSideProps };

export default ProfileIndex;
