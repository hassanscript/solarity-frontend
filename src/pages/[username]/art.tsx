import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/User/Hero";
import Art from "modules/User/Art";

import { getServerSideProps, UserPageProps } from "modules/User";
import NoUserView from "modules/User/NoUserView";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) return <NoUserView />;

  return (
    <Layout heroContent={<Hero user={user || {}} />}>
      <Art
        solanaAddress={(user && user.solanaAddress) || ""}
        username={(user && user.username) || ""}
      />
    </Layout>
  );
};

export { getServerSideProps };

export default ProfileIndex;
