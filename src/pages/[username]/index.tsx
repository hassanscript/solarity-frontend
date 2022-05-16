import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/User/Hero";
import Home from "modules/User/Home";
import Sidebar from "modules/User/Sidebar";
import { getServerSideProps, UserPageProps } from "modules/User";
import NoUserView from "modules/User/NoUserView";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) return <NoUserView />;
  return (
    <Layout
      rightSidebar={<Sidebar user={user || {}} />}
      heroContent={<Hero user={user || {}} />}
    >
      <Home user={user} />
    </Layout>
  );
};

export { getServerSideProps };

export default ProfileIndex;
