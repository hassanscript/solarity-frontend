import { FC, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setActiveRoom } from "redux/slices/profileSlice";
import { logout } from "redux/slices/authSlice";
import { Loader } from "components";

const Rooms: FC<{ setLoading: (loading: boolean) => void }> = ({
  setLoading,
}) => {
  const rooms = useSelector(
    (state: RootStateOrAny) => state.profile.data.rooms
  );
  const dispatch = useDispatch();

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
    <div className="space-y-5">
      {rooms.map((room: any) => (
        <a
          key={`roomNo-${room.roomNo}`}
          onClick={() => updateActiveRoom(room)}
          className={`flex h-[120px] border rounded-md border-gray-800 overflow-hidden cursor-${
            room.active ? "default" : "pointer"
          }`}
        >
          <img src={room.imageUrl} className="w-[130px]" />
          <div className="relative flex items-center flex-1 p-4 space-y-2 z-[10]">
            <h6 className="text-md">{room.title}</h6>
            {room.active && (
              <div className="absolute top-0 left-4">
                <div className="rounded-xl bg-[#21ac80] px-3 py-1 text-sm inline">
                  ACTIVE
                </div>
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

const Sidebar: FC<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setNFTdisabled: boolean;
  onNFTSet: (data: any) => void;
}> = ({ loading, setLoading, children, setNFTdisabled, onNFTSet }) => {
  const [roomMode, setRoomMode] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="relative p-3 px-5 border-l h-[100%] border-gray-600 space-y-5 flex flex-col">
      {loading && (
        <div className="absolute top-0 left-0 bg-black/80 w-[100%] h-[100%] z-[100] flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div>
        <h1 className="text-2xl text-center">
          {roomMode ? "Your Rooms" : "Select NFTs"}
        </h1>
        <span className="block text-xs text-center text-gray-400">
          {roomMode
            ? "Select a room to set as active"
            : "to display in your room"}
        </span>
      </div>
      <div className="border p-5 px-4 rounded-md border-gray-700 flex-1 overflow-auto">
        {roomMode ? <Rooms setLoading={setLoading} /> : <>{children}</>}
      </div>
      <div className="space-y-2">
        {!roomMode && (
          <button
            className="btn btn-secondary w-full btn-sm"
            disabled={setNFTdisabled}
            onClick={onNFTSet}
          >
            SET NFT
          </button>
        )}
        <div className="flex space-x-2">
          <div
            className="btn btn-outline flex-1 btn-sm"
            onClick={() => setRoomMode(!roomMode)}
          >
            {roomMode ? "CUSTOMIZE ROOM" : "CHANGE ROOM"}
          </div>
          <button
            className="btn btn-error btn-sm"
            onClick={() => {
              dispatch(logout());
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
