import React from "react";
import Layout from "components/Layout";
import MarketPlace from "modules/Marketplace";
import Hero from "components/Hero";

import RightSidebar from "modules/Marketplace/RightSidebar";
import SelectedAsset from "components/SelectedAsset";
import { HERO_DATA } from "data/marketplace";

const Index = () => {
  return (
    <Layout
      rightSidebar={<RightSidebar />}
      heroContent={<SelectedAsset />}
    >
      <MarketPlace />
    </Layout>
  );
};

export default Index;
