import React, { FC, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Base from "components/Modals/Base";
import AvatarPanel from "components/AvatarPanel";
import { Join } from "components/Icons";
import ErrorMessage from "components/ErrorMessage";
import { models } from "data/experience";
import { apiCaller } from "utils/fetcher";
import { 
  setName,
  addPeer,
  addMsg,
  removePeer,
  setRooms,
  setMsg,
  setRoom
 } from "redux/slices/chatSlice";
import ACTIONS from "config/actions";

const JoinServerRoomModal: FC<any> = ({
  type,
}: {
  type: string;
}) => {
  const [modelIndex, setModelIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [addOnsIndex, setAddOnsIndex] = useState(0);
  const [errorFlag, setErrorFlag] = useState<Boolean>(false);
  const [errorMsg, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const publicUrls = ["/assets/images/rooms/hub.jpg", "/assets/images/rooms/gallery.png", "/assets/images/rooms/plaza.jpg"]
  const joinRoom = () => {
      if(!username) {
        setErrorMessage('The name is required.');
        setErrorFlag(true);
        return;
      }
      dispatch(setRoom({
        modelIndex,
        roomName: type,
        userName: username,
      }));
      setErrorFlag(false);
      localStorage.setItem("roomBgImg", publicUrls[2]);
      router.push(`/experience/Room?rid=${0}&roomType=2&no=0`, '/experience/Room');
  }

  useEffect(() => {
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
  }, [])

  return (
    <Base open={true} onClose={() => {}} title={'Plaza Community'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 min-h-[250px]">
      <div className="col-span-1">
          <div className="flex justify-between py-4 px-4 bg-primary rounded-xl h-[200px]">
            <AvatarPanel modelPath={models[modelIndex].modelUrl} position={models[modelIndex].position} rotation={models[modelIndex].rotation} scale={models[modelIndex].scale} />
          </div>
          <div className="avatarlist mt-2">
            <div className="flex gap-1 avatar-2d-list">
              {!!models && models.length !=0 && models.map((model, index) => (
                <div className={`avatar-2d-item hover:border border border-transparent hover:border-gray-400 `+ (modelIndex == index ? `border-gray-100`: ``)} onClick={() => setModelIndex(index)} key={index}>
                  <img src={model.imageUrl} width={50} height={50} alt={model.name} />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="addOnslist mt-2">
            <div className="flex gap-1 addOns-2d-list">
              {[0,1,2,3,4,5].map((num, index) =>(
                <div className={`addOns-2d-item hover:border border border-transparent hover:border-gray-400 `+ (addOnsIndex == num ? `border-gray-100`: ``)} onClick={() => setAddOnsIndex(num)} key={index}>
                  <img src="/images/addOns/addOn.jpg" width={40} height={40} alt="AddOns" />
                </div> 
              ))}
            </div>
          </div> */}
        </div>
        <div className="col-span-1 py-4 px-0 sm:px-7 rounded-xl">
          <div className="gap-2">
            <div className="text-xs text-gray-950 mt-6">Type your name please.</div>
            <div className="mt-2">
              <div className="relative w-full text-gray-600 focus-within:text-gray-400">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-[15px] font-light text-white border-transparent border rounded-md bg-primary focus:outline-none focus:border-gray-500 focus:border focus:text-white placeholder:text-gray-950Í"
                  style={{padding: "8px 0px 8px 24px"}}
                  placeholder="Your Name"
                  autoComplete="off"
                  />
              </div>
            </div>
          </div>
          <div className="mt-4">
            {errorFlag && (<ErrorMessage errorMessage={errorMsg}/>)}
          </div>
        </div>
      </div>
      <div className="flex float-right mt-8">
        <button className="rounded-full btn btn-sm btn-secondary px-8" onClick={joinRoom}>
          <Join />&nbsp;<span>Join</span>
        </button>
      </div>
    </Base>
  );
};

export default JoinServerRoomModal;
