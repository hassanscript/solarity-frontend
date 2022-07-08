import AvatarPanel from "components/AvatarPanel";
import { Button, Input } from "components/FormComponents";
import { FC, useEffect, useState } from "react";
import ViewHolder from "./viewHolder";
import { models } from "data/experience";
import { toast } from "react-toastify";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createRoom } from "redux/slices/chatSlice";
import { useRouter } from "next/router";

const RoomCreationView: FC<{ onBack: () => void }> = ({ onBack }) => {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [addon, setAddon] = useState(0);
  const dispatch = useDispatch();
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));
  const activeRoom = profileData.rooms.find(({ active }: any) => active);
  let roomNo = activeRoom ? activeRoom.roomNo : undefined;
  let title = activeRoom ? activeRoom.title : undefined;
  useEffect(() => {
    if (!activeRoom) {
      onBack();
    }
  }, [activeRoom]);

  const onCreateRoom = async () => {
    dispatch(
      createRoom({
        title,
        type: true,
        roomNo,
        roomName,
        userName: profileData.username,
        modelIndex: avatar,
        avatarUrl: profileData.profileImageLink || "",
      })
    );

    router.push(
      `/experience/Room?rid=${activeRoom._id}&roomType=3&no=${roomNo + 1}`,
      "/experience/Room"
    );
  };

  return (
    <ViewHolder>
      <div className="space-y-4 w-[100%] text-center">
        <h4 className="text-xl block">Room Creation Setup</h4>
        <div>
          <Input
            hideLabel
            name="Room Name"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) =>
              e.target.value !== "" && setRoomName(e.target.value)
            }
          />
        </div>
        <div className="flex justify-between py-4 px-4 bg-primary rounded-xl h-[200px]">
          <AvatarPanel
            modelPath={models[avatar].modelUrl}
            position={models[avatar].position}
            rotation={models[avatar].rotation}
            scale={models[avatar].scale}
          />
        </div>
        <div className="avatarlist mt-2">
          <div className="flex gap-1 avatar-2d-list">
            {!!models &&
              models.length != 0 &&
              models.map((model, index) => (
                <div
                  className={
                    `avatar-2d-item hover:border border border-transparent hover:border-gray-400 rounded-md overflow-hidden ` +
                    (avatar == index ? `border-gray-100` : ``)
                  }
                  onClick={() => setAvatar(index)}
                  key={index}
                >
                  <img
                    src={model.imageUrl}
                    width={50}
                    height={50}
                    alt={model.name}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-1 addOns-2d-list">
          {[0, 1, 2, 3, 4, 5].map((num, index) => (
            <div
              className={
                ` rounded-md overflow-hidden addOns-2d-item hover:border border border-transparent hover:border-gray-400 ` +
                (addon == num ? `border-gray-100` : ``)
              }
              onClick={() => setAddon(num)}
              key={index}
            >
              <img
                src="/images/addOns/addOn.jpg"
                width={40}
                height={40}
                alt="AddOns"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 w-[100%]">
        <button className="btn btn-primary" onClick={onBack}>
          BACK
        </button>
        <button
          className="btn btn-secondary flex-1"
          onClick={onCreateRoom}
          disabled={Boolean(roomName == "")}
        >
          CREATE ROOM
        </button>
      </div>
    </ViewHolder>
  );
};

export default RoomCreationView;
