import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { TickCircle } from "components/Icons";
import { Button } from "components/FormComponents";
import { toast } from "react-toastify";

import Base from "components/Modals/Base";
import { GalleryItem } from "modal/Gallery";
import { placeBid } from "redux/slices/profileSlice";
import ErrorMessage from "components/ErrorMessage";
import { web3 } from "@project-serum/anchor";

const LoadingMessage = () => {
  return (
    <div className="alert alert-warning shadow-lg w-full">
      <span>Loading Process...</span>
    </div>
  );
};

const PlaceBidModal: FC<any> = ({
  open,
  onClose,
  selectedVerse,
}: {
  open: boolean;
  onClose: () => void;
  selectedVerse: GalleryItem;
}) => {
  const dispatch = useDispatch();
  const connection = new Connection(clusterApiUrl("testnet"));
  const { publicKey, sendTransaction, connect } = useWallet();

  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingButton, setLoadingButton] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [error, setError] = useState<Boolean>(false);
  const placeBidAction = async () => {
    if (!publicKey) {
      toast.error("connect wallet please", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey("6BnAzdBGmUdgcRaTaFGBvMAiAgC2cELiU5q12hBYb8YN"),
        lamports: LAMPORTS_PER_SOL / 100,
      })
    );
    try {
      setLoadingButton(true);
      const signature = await sendTransaction(transaction, connection);
      const result = await connection.confirmTransaction(
        signature,
        "processed"
      );
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    dispatch(
      placeBid({
        data: selectedVerse,
        successFunction: () => {
          onClose();
          toast.success(
            "You got a room successfully. You can create a room and also decorate a room with own nfts in the profile",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          setError(false);
        },
        errorFunction: (err) => {
          setError(true);
          if (!!err) {
            setErrorMessage(err);
          }
        },
        finalFunction: () => {
          setLoading(false);
        },
      })
    );
  };
  return (
    <Base open={open} onClose={onClose} title="Raising Verse">
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="col-span-1">
          <div className="relative h-[200px] w-full flex justify-center items-center ">
            <Image
              src={selectedVerse.imageUrl}
              alt="nft item"
              layout="fill"
              priority={true}
              className="rounded-3xl"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div>{selectedVerse.title}</div>
          <div className="flex">
            <div className="mt-[7px]">
              <TickCircle />
            </div>
            <span className="text-[12px] text-secondary mt-1">
              &nbsp;{selectedVerse.collection}
            </span>
          </div>
          <div className="flex mt-1">
            <span className="text-xs text-gray-950 mt-1">
              Current bid:&nbsp;&nbsp;&nbsp;
            </span>
            <div className="flex">
              <div className="h-[16px] w-[16px]">
                <Image
                  src="/images/icons/sol.png"
                  alt="sol-icon"
                  height={16}
                  width={16}
                />
              </div>

              <span className="text-xs text-white mt-[3px]">
                {selectedVerse.currentBid} SOL
              </span>
            </div>
          </div>
          <div className="flex mt-2">
            <span className="text-xs text-gray-950">
              Ending in:&nbsp;&nbsp;
            </span>
            <span className="text-xs text-white">{selectedVerse.endingIn}</span>
          </div>
          <div className="mt-10 text-[15px] text-secondary">
            Do you really buy a {selectedVerse.title}?
          </div>
          {error && <ErrorMessage errorMessage={errorMessage} />}
        </div>
      </div>
      <div className="mt-7">
        <button
          className="rounded-full btn btn-sm float-right ml-3"
          onClick={onClose}
        >
          Cancel
        </button>
        <Button
          className="rounded-full btn btn-sm btn-secondary float-right"
          disableOnLoading
          loading={loadingButton}
          onClick={placeBidAction}
        >
          Yes
        </Button>
      </div>
    </Base>
  );
};

export default PlaceBidModal;
