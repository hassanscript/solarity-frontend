import React, { FC } from "react";
import Base from "modules/DAOS/Base";
import Posts from "modules/Home/Posts";

const Home: FC<{ dao: any }> = ({ dao }) => {
  return (
    <Base>
      <Posts accountType="dao" dao={dao} />
    </Base>
  );
};

export default Home;
