import Layout from "components/Layout";
import Home from "modules/Home";
import { useRouter } from 'next/router'

import RightSidebar from "modules/Home/RightSidebar";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  router.push('experience/');

  return (
    <></>
    // <Layout
    //   rightSidebar={<RightSidebar />}
    // >
    //   <Home />
    // </Layout>
  );
};

export default Index;
