import { useState } from "react";
import ViewHolder from "../viewHolder";
import RoomUpdateView from "./roomUpdateView";
import RoomCustomizeView from "./roomCustomizeView";
import { Loader } from "components";

const RoomView = () => {
  const [roomUpdateView, setRoomUpdateView] = useState(true);
  const [loading, setLoading] = useState(false);
  // check if no room active
  return (
    <ViewHolder>
      <div className="flex w-[100%] items-center pb-5">
        <h3 className="flex-1">Your Room</h3>
        <button
          disabled={loading}
          className="btn btn-secondary btn-sm"
          onClick={() => setRoomUpdateView(!roomUpdateView)}
        >
          {roomUpdateView ? "Customize Room" : "Change Room"}
        </button>
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[10000] flex justify-center items-center bg-black/50 rounded-md">
            <Loader size={6} />
          </div>
        )}
        {roomUpdateView ? (
          <RoomUpdateView setLoading={setLoading} />
        ) : (
          <RoomCustomizeView />
        )}
      </div>
    </ViewHolder>
  );
};

export default RoomView;
