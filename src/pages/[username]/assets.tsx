import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/User/Hero";
import Assets from "modules/User/Assets";

import { getServerSideProps, UserPageProps } from "modules/User";
import NoUserView from "modules/User/NoUserView";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) return <NoUserView />;

  return (
    <Layout heroContent={<Hero user={user || {}} />}>
      <Assets user={user || {}} />
    </Layout>
  );
};

export { getServerSideProps };

export default ProfileIndex;
