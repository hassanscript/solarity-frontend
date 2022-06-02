import HubChat from "./HubChat";
import GalleryChat from "./GalleryChat";

const ChatPublicModel = (roomType, modelURL) => {
    if(roomType == 0) {
      return (
          <HubChat modelURL={modelURL}/>
      );
    } else {
      return (
        <GalleryChat modelURL={modelURL}/>
      );
    }
}

export default ChatPublicModel;