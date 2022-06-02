import HubChat from "./HubChat";
import GalleryChat from "./GalleryChat";

const ChatPublicModel = ({roomType, modelURL, name}) => {
    if(roomType == 0) {
      return (
          <HubChat modelURL={modelURL} name={name} />
      );
    } else {
      return (
        <GalleryChat modelURL={modelURL} name={name} />
      );
    }
}

export default ChatPublicModel;