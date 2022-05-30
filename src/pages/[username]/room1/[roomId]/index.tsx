import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/User/Hero";
import Home from "modules/User/Home";
import OwnRoomFullViewSecond from "modules/User/RoomFullView/ownRoomFullViewSecond";
import { getServerSideProps, UserPageProps } from "modules/User";
import NoUserView from "modules/User/NoUserView";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) return <NoUserView />;
  return (
      <OwnRoomFullViewSecond user={user} />
  );
};

export { getServerSideProps };

export default ProfileIndex;
