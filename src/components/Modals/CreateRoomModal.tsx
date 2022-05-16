import React, { FC, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toast } from 'react-toastify';

import Base from "components/Modals/Base";
import AvatarPanel from "components/AvatarPanel";
import { PlusFill } from "components/Icons";

import { createRoom } from '../../redux/slices/chatSlice';
import { models } from "data/experience";

const CreateRoomModal: FC<any> = ({
  open,
  title,
  type,
  roomNo,
  onClose
}: {
  open: boolean;
  title: string;
  type: boolean;
  roomNo: number;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));

  const [roomName, setRoomName] = useState('');
  const [modelIndex, setModelIndex] = useState(0);
  const [addOnsIndex, setAddOnsIndex] = useState(0);

  const createRoomFunc = () => {
    if(!roomName) {
      toast.error('The name of room is required.', {
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
    dispatch(createRoom({title, type, roomNo, roomName, userName: profileData.username, modelIndex}));
    onClose();
  };

  return (
    <Base open={open} onClose={onClose} title={title}>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="col-span-1 flex justify-between py-4 px-4 bg-primary rounded-xl">
          <AvatarPanel modelPath={models[modelIndex].modelUrl} position={models[modelIndex].position} rotation={models[modelIndex].rotation} scale={models[modelIndex].scale} />
        </div>
        <div className="flex justify-between py-4 px-7 rounded-xl">
          <div className="gap-2">
            <h2 className="text-lg font-light">Create a public room.</h2>
            <div className="text-xs text-gray-950 mt-6">Please type a room name.</div>
            <div className="mt-2">
              <div className="relative w-full text-gray-600 focus-within:text-gray-400">
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full py-2 pl-6 text-[15px] font-light text-white border-transparent border rounded-md bg-primary focus:outline-none focus:border-gray-500 focus:border focus:text-white placeholder:text-gray-950Í"
                  placeholder="Room Name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="text-xs text-gray-950 mt-6">your name</div>
            <div className="mt-2">
              <div className="relative w-full text-gray-100 focus-within:text-gray-400">
                <h3>{profileData.username}</h3>
              </div>
            </div>
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
                <img src="images/addOns/addOn.jpg" width={40} height={40} alt="AddOns" />
              </div> 
            ))}
          </div>
        </div>
      </div>
      <div className="mt-7">
        <button className="rounded-full btn btn-sm btn-secondary float-right px-8" onClick={createRoomFunc}>
          <PlusFill />&nbsp;<span>Create</span>
        </button>
      </div>
    </Base>
  );
};

export default CreateRoomModal;