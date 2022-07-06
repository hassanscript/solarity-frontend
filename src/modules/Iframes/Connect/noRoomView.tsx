import ViewHolder from "./viewHolder";

const NoRoomView = () => {
  return (
    <ViewHolder>
      <div className="space-y-4 w-[100%] text-center">
        <h4 className="text-xl block">You don't own a room</h4>
        <span className="text-sm block">
          You can easily purchase a room on Solarity
        </span>
        <a
          className="btn btn-secondary"
          href="https://solarity-stage.vercel.app/marketplace"
          target="__blank"
        >
          Buy Room Now
        </a>
      </div>
    </ViewHolder>
  );
};

export default NoRoomView;
