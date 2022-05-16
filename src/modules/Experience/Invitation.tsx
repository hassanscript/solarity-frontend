import { apiCaller } from "utils/fetcher";

export type InvitationPageProps = {
  invitation: InvitationType;
  success: Boolean;
};

export type InvitationType = {
  name: String;
  invitor: String;
  roomId?: String;
  type: Boolean;
  roomNo: Number;
  roomName?: String;
  link?: String;
  state?: Boolean;
};

export const getServerSideProps = async (context: any) => {
  const { link } = context.query;

  try {
    const {
      data: { invitation },
    } = await apiCaller.get(`/users/getLinkInfo/${link}`);

    return { props: { invitation, success: true } };
  } catch (err) {
    return { props: { success: false } };
  }
};
