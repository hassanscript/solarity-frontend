import OwnRoomSecond from "components/OwnRooms/own1";

const Index = () => {
  return (
    <div className="h-[100vh]">
      <OwnRoomSecond user={{ rooms: [] }} permitionFlag={true}/>
    </div>
  );
}
export default Index;