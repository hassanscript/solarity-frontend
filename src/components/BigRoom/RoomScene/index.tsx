import Image from "next/image";

const RoomScene = ({
    data: bgImage,
}: {
    data: string;
}) => {
  return (
    <div className="relative w-full h-full">
        <Image
          src={bgImage}
          alt={"VR Image"}
          layout="fill"
          priority={true}
          objectFit="cover"
          className="rounded-2xl"
        />
    </div>
  );
};

export default RoomScene;
