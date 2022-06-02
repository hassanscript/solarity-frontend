import OwnThirdChatModule from "modules/ChatModule/own_third";
import OwnSecondChatModule from "modules/ChatModule/own_second";
import OwnFirstChatModule from "modules/ChatModule/own_first";
import { useRouter } from "next/router";

const OwnRoom = () => {
  const router = useRouter();
  const { no } = router.query;

  if(no == "1") {
    return (
      <OwnFirstChatModule />
    );
  } else if (no == "2") {
    return (
      <OwnSecondChatModule />
    )
  }
  return (
    <OwnThirdChatModule />
  )
};

export default OwnRoom;
