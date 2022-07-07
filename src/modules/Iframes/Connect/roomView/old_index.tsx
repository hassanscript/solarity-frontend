import { useEffect, useState } from "react";
import ViewHolder from "../viewHolder";
import RoomUpdateView from "./roomUpdateView";
import RoomCustomizeView from "./roomCustomizeView";
import { Loader } from "components";
import { RootStateOrAny, useSelector } from "react-redux";

const RoomView = () => {
  const [roomUpdateView, setRoomUpdateView] = useState(false);
  const [loading, setLoading] = useState(false);
  const rooms = useSelector(
    (state: RootStateOrAny) => state.profile.data.rooms
  );
  const noActiveRoom = rooms.filter((room: any) => room.active).length === 0;
  useEffect(() => {
    if (noActiveRoom) {
      setRoomUpdateView(true);
    }
  }, [noActiveRoom]);
  return (
    <ViewHolder>
      <div className="flex w-[100%] items-center pb-5">
        <h3 className="flex-1">
          {roomUpdateView ? "Select a room" : "Customize your room"}
        </h3>
        <button
          disabled={loading || noActiveRoom}
          className="btn btn-secondary btn-sm"
          onClick={() => setRoomUpdateView(!roomUpdateView)}
        >
          {roomUpdateView ? "Customize Room" : "Change Room"}
        </button>
      </div>
      <div className="relative w-[100%]">
        {loading && (
          <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[10000] flex justify-center items-center bg-black/50 rounded-md">
            <Loader size={6} />
          </div>
        )}
        {roomUpdateView || noActiveRoom ? (
          <RoomUpdateView setLoading={setLoading} />
        ) : (
          <RoomCustomizeView />
        )}
      </div>
    </ViewHolder>
  );
};

export default RoomView;
