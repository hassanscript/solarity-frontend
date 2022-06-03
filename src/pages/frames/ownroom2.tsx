import OwnRoomThird from "components/OwnRooms/own2";

const Index = () => {
  return (
    <div className="h-[100vh]">
      <OwnRoomThird user={{ rooms: [] }} permitionFlag={true}/>
    </div>
  );
}
export default Index;