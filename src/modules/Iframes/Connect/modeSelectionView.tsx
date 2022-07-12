import { ChevronLeftIcon } from "@heroicons/react/solid";
import { FC } from "react";
import ViewHolder from "./viewHolder";

const ModeSelectionView: FC<{
  onNext: () => void;
  onBack: () => void;
  setMode: (val: "live" | "edit" | "copy") => void;
}> = ({ onNext, setMode, onBack }) => {
  return (
    <ViewHolder>
      <div className="space-y-1 w-[100%] text-center">
        <h4 className="text-xl block">Select Mode</h4>
        <div className="space-y-4 w-[100%] text-center pt-4">
          <div className="flex flex-col items-center">
            <button
              className="btn btn-sm btn-secondary w-[200px]"
              onClick={() => {
                setMode("edit");
                onNext();
              }}
            >
              Edit
            </button>
            <span className="text-xs block text-gray-400 pt-1">
              Customize your room with your NFTs
            </span>
          </div>

          <div className="flex flex-col items-center">
            <button
              className="btn btn-sm btn-secondary w-[200px]"
              onClick={() => {
                setMode("copy");
                onNext();
              }}
            >
              COPY
            </button>
            <span className="text-xs block text-gray-400 pt-1">
              View your room in single-player mode
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="btn btn-sm btn-secondary w-[200px]"
              onClick={() => {
                setMode("live");
                onNext();
              }}
            >
              LIVE
            </button>
            <span className="text-xs block text-gray-400 pt-1">
              Go live and invite your friends
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="btn btn-sm btn-outline w-[200px] flex items-center justify-center"
              onClick={onBack}
            >
              <ChevronLeftIcon className="w-5 inline" />
              BACK
            </button>
          </div>
        </div>
      </div>
    </ViewHolder>
  );
};

export default ModeSelectionView;
