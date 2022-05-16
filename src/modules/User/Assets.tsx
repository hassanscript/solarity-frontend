import React, { FC } from "react";
import OwnRooms from "../../components/OwnRooms";

const Home: FC<{ user: any }> = ({ user }) => {
  return (
    <div>
        <OwnRooms rooms={user.rooms || []}/>
    </div>
  );
};

export default Home;
