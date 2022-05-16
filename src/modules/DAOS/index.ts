import { apiCaller } from "utils/fetcher";

export const getServerSideProps = async (context: any) => {
  const { symbol } = context.query;
  try {
    const {
      data: { dao },
    } = await apiCaller.get(`/daos/${symbol}`);
    return { props: { dao, success: true } };
  } catch (err) {
    return { props: { success: false } };
  }
};
