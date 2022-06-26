import HubChat from "./HubChat";
import GalleryChat from "./GalleryChat";
import PlazaChat from "./PlazaChat";

const ChatPublicModel = ({roomType, modelURL, name}) => {
  return (
    <div>
      {roomType == 0 && (
        <HubChat modelURL={modelURL} name={name} />
      )}
      {roomType == 1 && (
        <GalleryChat modelURL={modelURL} name={name} />
      )}
      {roomType == 2 && (
        <PlazaChat modelURL={modelURL} name={name} />
      )}
    </div>
  );
}

export default ChatPublicModel;