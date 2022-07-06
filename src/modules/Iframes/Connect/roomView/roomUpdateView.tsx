import { FC, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setActiveRoom } from "redux/slices/profileSlice";

const RoomUpdateView: FC<{
  setLoading: (val: boolean) => void;
}> = ({ setLoading }) => {
  const rooms = useSelector(
    (state: RootStateOrAny) => state.profile.data.rooms
  );
  const dispatch = useDispatch();
  const selectedClasses = "bg-[#21ac80] border-[#21ac80] cursor-default	";

  const updateActiveRoom = (room: any) => {
    const { active, roomNo } = room;
    if (active) return;
    setLoading(true);
    dispatch(
      setActiveRoom({
        data: { roomNo },
        finalFunction: () => {
          setLoading(false);
        },
      })
    );
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {rooms.map((room: any, index: number) => (
        <a
          key={`room+${index}`}
          onClick={() => updateActiveRoom(room)}
          className={`relative cursor-pointer border border-gray-600 rounded-md border ${
            room.active ? selectedClasses : ""
          }`}
        >
          {room.active && (
            <div className="absolute text-center w-[100%] rounded-md left-0 top-0 bg-[#21ac80]">
              ACTIVE
            </div>
          )}
          <img
            src={room.imageUrl}
            className="h-[120px] object-cover rounded-md rounded-b-none"
          />
          <div className="py-2 px-1 text-center">
            <span className="text-sm">{room.title}</span>
          </div>
        </a>
      ))}
    </div>
  );

  return <>I will update the room</>;
};

export default RoomUpdateView;
