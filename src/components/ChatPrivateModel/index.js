import OwnFirst from "./OwnFirst";
import OwnSecond from "./OwnSecond";
import OwnThird from "./OwnThird";

const ChatPrivateModel = (modelURL, modelNo) => {
  if(modelNo == 0) {
    return (
      <OwnFirst modelURL={modelURL} />
    );
  } else if(modelNo == 1) {
    return (
      <OwnSecond modelURL={modelURL} />
    );
  }
  return (
    <OwnThird modelURL={modelURL} />
  );
}

export default ChatPrivateModel;