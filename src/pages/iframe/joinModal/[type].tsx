import React, { FC } from "react";
import { useRouter } from 'next/router'
import JoinServerRoomModal from 'components/Modals/JoinServerRoomModal';
const ProfileIndex: FC = () => {
  const router = useRouter()
  const { type } = router.query
  return (
    <JoinServerRoomModal type={type} />
  );
};

export default ProfileIndex;
