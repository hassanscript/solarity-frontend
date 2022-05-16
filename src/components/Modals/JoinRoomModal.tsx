import React, { FC, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Base from "components/Modals/Base";
import AvatarPanel from "components/AvatarPanel";
import { useRouter } from 'next/router'
import { setModel } from "redux/slices/chatSlice";
import { Join } from "components/Icons";
import ErrorMessage from "components/ErrorMessage";
import { models } from "data/experience";
import { setName, setRoom } from "redux/slices/chatSlice";
import ACTIONS from "config/actions";

const JoinRoomModal: FC<any> = ({
  open,
  onClose,
  roomName,
  type,
  roomNo,
  person,
  creator,
  speakers,
}: {
  open: boolean;
  onClose: () => void;
  roomName: string;
  type: boolean;
  roomNo: number;
  person: string;
  creator: string;
  speakers: string[];
}) => {
  const [modelIndex, setModelIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [addOnsIndex, setAddOnsIndex] = useState(0);
  const [errorFlag, setErrorFlag] = useState<Boolean>(false);
  const [errorMsg, setErrorMessage] = useState("");
  const { profileData, selectedIndex, rooms } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
    selectedIndex: state.chat.selectedIndex,
    rooms: state.chat.rooms,
  }));
  const dispatch = useDispatch();
  const router = useRouter();

  const joinRoom = () => {
    var type1 = false;
    if(!profileData || !profileData.username) {
      if(!username) {
        setErrorMessage('The name is required.');
        setErrorFlag(true);
        return;
      }
      dispatch(setRoom({
        modelIndex,
        roomName,
        userName: username,
      }));
      type1 = true;
      setErrorFlag(false);
    } else {
      dispatch(setRoom({
        modelIndex,
        roomName,
        userName: profileData.username,
      }));
    }
    if(!!window.socket){
      if(person != "") {
        if(!!rooms) {
          const roomIndex = rooms.findIndex((s: any) => s.roomName == roomName);
          if(roomIndex != -1) {
            window.socket.emit(ACTIONS.ACEEPT_INVITATION, {
              roomId: rooms[roomIndex].roomId,
              username: person,
              guestname: type1 ? username: '',
              type1: type1,
            });
          }
        }
      }

      if(type == false && roomNo == 0) {
        router.push(`/experience/hubRoom?rid=${rooms[selectedIndex].roomId}`);
      } else if(type == false && roomNo == 1) {
        router.push(`/experience/galleryRoom?rid=${rooms[selectedIndex].roomId}`);
      } else if(type == true) {
        router.push(`/experience/ownRoom?rid=${rooms[selectedIndex].roomId}`);
      }
    }
  }

  return (
    <Base open={open} onClose={onClose} title={roomName}>
      <div className="grid grid-cols-2 gap-8 mt-8 min-h-[250px]">
        <div className="col-span-1 flex justify-between py-4 px-7 bg-primary min-h-[200px] rounded-xl">
          <AvatarPanel modelPath={models[modelIndex].modelUrl} position={models[modelIndex].position} rotation={models[modelIndex].rotation} scale={models[modelIndex].scale} />
        </div>
        <div className="py-4 px-7 rounded-xl">
        {
          !!profileData && !!profileData.username ? (
            <div className="gap-2">
              <h2 className="text-lg font-light">Plaza</h2>
              <span className="text-md text-gray-950">Created by {creator}</span><br/>
              <span className="text-md text-gray-950">Members {!!speakers ? speakers.length: 0}</span><br />
              <div className="text-xs text-gray-950 mt-6">your name.</div>
              <div className="mt-2">
                <div className="relative w-full text-gray-100 focus-within:text-gray-400">
                  <h3>{profileData.username}</h3>
                </div>
              </div>
            </div>
          ) : (
            <div className="gap-2">
              <span className="text-md text-gray-950">Created by <span className="text-white">{creator}</span></span><br/>
              <span className="text-md text-gray-950">Number of member: <span className="text-white">{!!speakers ? speakers.length: 0}</span></span><br />
              <div className="text-xs text-gray-950 mt-6">Type your name please.</div>
              <div className="mt-2">
                <div className="relative w-full text-gray-600 focus-within:text-gray-400">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full py-2 pl-6 text-[15px] font-light text-white border-transparent border rounded-md bg-primary focus:outline-none focus:border-gray-500 focus:border focus:text-white placeholder:text-gray-950Í"
                    placeholder="Your Name"
                    autoComplete="off"
                    />
                </div>
              </div>
            </div>
          )
        }
        <div className="mt-4">
          {errorFlag && (<ErrorMessage errorMessage={errorMsg}/>)}
        </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="avatarlist">
          <div className="flex gap-1 avatar-2d-list">
            {!!models && models.length !=0 && models.map((model, index) => (
              <div className={`avatar-2d-item hover:border border border-transparent hover:border-gray-400 `+ (modelIndex == index ? `border-gray-100`: ``)} onClick={() => setModelIndex(index)} key={index}>
                <img src={model.imageUrl} width={50} height={50} alt={model.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="addOnslist">
          <div className="flex gap-1 addOns-2d-list">
            {[0,1,2,3,4,5].map((num, index) =>(
              <div className={`addOns-2d-item hover:border border border-transparent hover:border-gray-400 `+ (addOnsIndex == num ? `border-gray-100`: ``)} onClick={() => setAddOnsIndex(num)} key={index}>
                <img src="/images/addOns/addOn.jpg" width={40} height={40} alt="AddOns" />
              </div> 
            ))}
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

export default JoinRoomModal;
