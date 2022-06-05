import React, { FC } from "react";

import Posts from "modules/Home/Posts";
const Home: FC<{ user: any }> = ({ user }) => {
  return (
    <div>
      <Posts user={user} accountType={"user"} />
    </div>
  );
};

export default Home;
