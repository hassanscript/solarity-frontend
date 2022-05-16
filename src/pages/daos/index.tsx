import React, { FC } from "react";
import Layout from "components/Layout";
import Yours from "modules/DAOS/Yours";
import { apiCaller } from "utils/fetcher";

const Index: FC<{ daos: [any] }> = ({ daos }) => {
  return (
    <Layout sol>
      <Yours daos={daos} />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const {
      data: { daos },
    } = await apiCaller.get(`/daos`);
    return { props: { daos, success: true } };
  } catch (err) {
    return { props: { success: false } };
  }
};

export default Index;
