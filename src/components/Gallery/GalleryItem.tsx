import React from "react";
import { FC } from "react";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import { toast } from "react-toastify";
import { TickCircle, Bid } from "components/Icons";
import { GalleryItem } from "modal/Gallery";
import { setAsset } from "redux/slices/marketplaceSlice";

export type GalleryItemProps = {
  galleryItem: GalleryItem;
  tagIndex?: Number;
};

const GalleryItemComponent: FC<GalleryItemProps> = ({  
  galleryItem: {
    roomNo,
    title,
    collection,
    imageUrl,
    currentBid,
    endingIn,
    subtitle,
    type = "bid",
    applicationNumber,
  },
  tagIndex,
}) => {
  const dispatch = useDispatch();
  const handlePlaceBidToggle = () => {
    if(roomNo != undefined && roomNo <= 2 && tagIndex != undefined && tagIndex == 0) {
      dispatch(setAsset({tagIndex, roomNo}));
    } else {
      toast.error(title + " isn't ready now.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="flex flex-col group ">
      <div className="flex flex-col justify-center gap-2 p-2 transition-all ease-in rounded-t-3xl rounded-b-3xl bg-brandblack">
        <div className="relative h-[133px] w-full flex justify-center items-center ">
          <Image
            src={imageUrl}
            alt="nft item"
            layout="fill"
            priority={true}
            className="rounded-3xl"
          />
          <button className="z-10 gap-1 normal-case bg-white rounded-full opacity-0 btn btn-sm btn-accent group-hover:opacity-100 hover:bg-accent text-secondary">
            {type === "connect" ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4163 16.25H12.083"
                    stroke="#6163FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.75 17.9167V14.5833"
                    stroke="#6163FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    stroke-Linejoin="round"
                  />
                  <path
                    d="M10.1332 9.05834C10.0498 9.05 9.94984 9.05 9.85817 9.05834C7.87484 8.99167 6.29984 7.36667 6.29984 5.36667C6.2915 3.32501 7.94984 1.66667 9.9915 1.66667C12.0332 1.66667 13.6915 3.32501 13.6915 5.36667C13.6915 7.36667 12.1082 8.99167 10.1332 9.05834Z"
                    stroke="#6163FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99121 18.175C8.47454 18.175 6.96621 17.7917 5.81621 17.025C3.79954 15.675 3.79954 13.475 5.81621 12.1333C8.10788 10.6 11.8662 10.6 14.1579 12.1333"
                    stroke="#6163FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Connect
              </>
            ) : (
              <div 
                className="flex" 
                onClick={handlePlaceBidToggle}
              >
                <Bid /> See in detail
              </div>
            )}
          </button>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="px-2 text-xs">{title}</span>
            <div className="flex items-center gap-1 px-2">
              <div className="mb-1 pt-1">
                <TickCircle />
              </div>
              <span className="text-[10px] text-secondary ">{collection}</span>
            </div>
          </div>
          <div className="flex flex-col">
              <span className="text-xs text-gray-950 pt-1"></span>
              <div className="flex items-center gap-2 pt-3 pr-2">
                <div className="h-[16px] w-[16px]">
                  <Image
                    src="/images/icons/verse-token.png"
                    alt="sol-icon"
                    height={32}
                    width={32}
                  />
                </div>

                <span className="mt-2 text-xs text-white">
                  {currentBid} Verse
                </span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItemComponent;
