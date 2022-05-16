import React, { FC } from "react";
import Layout from "components/Layout";
import { ProfileView } from "../../modules/Profile";

const ProfilePage = () => {
  return (
    <Layout>
      <ProfileView />
    </Layout>
  );
};

export default ProfilePage;
