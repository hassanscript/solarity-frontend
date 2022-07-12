import { FC } from "react";
import ViewHolder from "./viewHolder";

const ModeSelectionView: FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <ViewHolder>
      <div className="space-y-1 w-[100%] text-center">
        <h4 className="text-xl block">Select Mode</h4>
        <div className="space-y-4 w-[100%] text-center pt-4">
          <div className="flex flex-col items-center">
            <button className="btn btn-sm btn-secondary w-[200px]">Edit</button>
            <span className="text-xs block text-gray-400 pt-1">
              Customize your room with your NFTs
            </span>
          </div>

          <div className="flex flex-col items-center">
            <button className="btn btn-sm btn-secondary w-[200px]">COPY</button>
            <span className="text-xs block text-gray-400 pt-1">
              View your room in single-player mode
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="btn btn-sm btn-secondary w-[200px]"
              onClick={onNext}
            >
              LIVE
            </button>
            <span className="text-xs block text-gray-400 pt-1">
              Go live and invite your friends
            </span>
          </div>
        </div>
      </div>
    </ViewHolder>
  );
};

export default ModeSelectionView;
