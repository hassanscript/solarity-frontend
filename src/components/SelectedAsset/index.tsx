import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import {
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

import {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { Button } from "components/FormComponents";
import { TickCircle, VR } from "components/Icons";
import AframeComp1 from "components/AframeComp1";
import AframeComp2 from "components/AframeComp2";
import { GalleryItem } from "modal/Gallery";
import ErrorMessage from "components/ErrorMessage";
import { placeBid } from "redux/slices/profileSlice";
import { RootStateOrAny, useSelector } from "react-redux";
import WalletSelector from "components/WalletSelector";
import BaseUrl from "config";
import { getOrCreateAssociatedTokenAccount } from 'utils/getOrCreateAssociatedTokenAccount'
import { createTransferInstruction } from 'utils/createTransferInstruction';

export interface HeroProps {}

const SelectedAsset: FC<HeroProps> = ({}) => {
  const [selectedAsset, setSelectedAsset] = useState<GalleryItem>();
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [error, setError] = useState<Boolean>(false);
  const [loadingButton, setLoadingButton] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [showWallets, setShowWallets] = useState(false);
  const profile = useSelector((state: RootStateOrAny) => state.profile.data);

  const { selectedTagIndex, selectedIndex, assets } = useAppSelector(
    (state) => state.marketplace
  );
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedIndex != -1) {
      setSelectedAsset(assets.rows[selectedTagIndex].items[selectedIndex]);
    }
    setError(false);
  }, [selectedIndex]);

  const placeBidAction = async (provider: any) => {
    await provider.connect();
    const { publicKey, signTransaction } = provider;
    // spl-token payment for buying room.
    try {
      console.log(process.env.NEXT_PUBLIC_WEBSITE_SOLANA_WALLET_ADDRESS, process.env.NEXT_PUBLIC_SOLARITY_TOKEN_ADDRESS);
      if(!process.env.NEXT_PUBLIC_WEBSITE_SOLANA_WALLET_ADDRESS || !process.env.NEXT_PUBLIC_SOLARITY_TOKEN_ADDRESS) {
        return console.error('website solana wallet address or solarity_token_address is not set in environment.');
      }
      const toPublicKey = new PublicKey(process.env.NEXT_PUBLIC_WEBSITE_SOLANA_WALLET_ADDRESS)
      const mint = new PublicKey(process.env.NEXT_PUBLIC_SOLARITY_TOKEN_ADDRESS)
      // const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   publicKey,
      //   mint,
      //   publicKey,
      //   signTransaction
      // );
      // const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   publicKey,
      //   mint,
      //   toPublicKey,
      //   signTransaction
      // );
      if(!selectedAsset) {
        console.error('selectedAsset is not defined.');
        return;
      }
      // const transaction1 = new Transaction().add(
      //     createTransferInstruction(
      //         fromTokenAccount.address, // source
      //         toTokenAccount.address, // dest
      //         publicKey,
      //         selectedAsset.currentBid * LAMPORTS_PER_SOL,
      //         [],
      //         TOKEN_PROGRAM_ID
      //     )
      // )
      // const blockHash = await connection.getRecentBlockhash()
      // transaction1.feePayer = await publicKey
      // transaction1.recentBlockhash = await blockHash.blockhash
      // const signed = await signTransaction(transaction1);
      setLoadingButton(true);
      dispatch(
        placeBid({
          data: {
            selectedAsset,
            selectedIndex,
            // signed,
            // connection,
          },
          successFunction: () => {
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
            setLoadingButton(false);
          },
          errorFunction: (err) => {
            setError(true);
            if (!!err) {
              setErrorMessage(err);
            }
            setLoadingButton(false);
          },
          finalFunction: () => {
            setLoading(false);
            setLoadingButton(false);
          },
        })
      );
    } catch (error: any) {
        console.error(error.message);
    }

    // return;
    // let transaction;
    // try {
    //   transaction = new Transaction().add(
    //     SystemProgram.transfer({
    //       fromPubkey: publicKey,
    //       toPubkey: new PublicKey(
    //         "6BnAzdBGmUdgcRaTaFGBvMAiAgC2cELiU5q12hBYb8YN"
    //       ),
    //       lamports: selectedAsset.currentBid * LAMPORTS_PER_SOL, //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
    //     })
    //   );
    // } catch (error: any) {
    //   return toast.error(error.msg, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    // setLoadingButton(true);
    // dispatch(
    //   placeBid({
    //     data: {
    //       selectedAsset,
    //       selectedIndex,
    //       transaction,
    //       connection,
    //       provider,
    //     },
    //     successFunction: () => {
    //       toast.success(
    //         "You got a room successfully. You can create a room and also decorate a room with own nfts in the profile",
    //         {
    //           position: "top-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //         }
    //       );
    //       setError(false);
    //       setLoadingButton(false);
    //     },
    //     errorFunction: (err) => {
    //       setError(true);
    //       if (!!err) {
    //         setErrorMessage(err);
    //       }
    //       setLoadingButton(false);
    //     },
    //     finalFunction: () => {
    //       setLoading(false);
    //       setLoadingButton(false);
    //     },
    //   })
    // );
  };

  return (
    <div>
      <WalletSelector
        type="solana"
        title="Pay using Solana"
        subtitle="Select a wallet from the list to pay with"
        open={showWallets}
        onClose={() => setShowWallets(false)}
        onSelect={(address, type, provider) => {
          placeBidAction(provider);
        }}
      />
      <div className="relative w-full h-[314px] rounded-2xl -mt-5">
        {selectedIndex == 0 ? (
          <iframe 
            src={BaseUrl + "frames/ownroom0"}
            width={1032}
            height={314}
          ></iframe>
        // <AframeComp2 user={{ rooms: [] }} permitionFlag={true} />
        ) : selectedIndex == 1 ? (
          <iframe 
            src={BaseUrl + "frames/ownroom1"}
            width={1032}
            height={314}
          ></iframe>
          ): (
            <iframe 
              src={BaseUrl + "frames/ownroom2"}
              width={1032}
              height={314}
            ></iframe>
          )
        }
      </div>
      {selectedAsset && (
        <div className="flex justify-between my-6">
          <div className="flex flex-col max-w-4xl ">
            <span className="text-[15px] text-secondary">
              {selectedAsset.title}
            </span>
            <span className="mt-3 text-sm text-gray-950">
              {selectedAsset.description}
            </span>
            <span>
              <div className="flex">
                <div className="mt-[7px]">
                  <TickCircle />
                </div>
                <span className="text-[12px] text-secondary mt-1">
                  &nbsp;{selectedAsset.collection}
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
                    &nbsp;&nbsp;{selectedAsset.currentBid} Verse
                  </span>
                </div>
              </div>
              <div className="flex mt-2">
                <span className="text-xs text-gray-950">
                  Ending in:&nbsp;&nbsp;
                </span>
                <span className="text-xs text-white">
                  {selectedAsset.endingIn}
                </span>
              </div>
              {error && <ErrorMessage errorMessage={errorMessage} />}
            </span>
          </div>
          <div className="flex flex-col justify-between min-w-[150px]">
            <div></div>
            <Button
              className="rounded-full btn btn-xl btn-secondary float-right"
              disableOnLoading
              loading={loadingButton}
              onClick={() => setShowWallets(true)}
            >
              Buy Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedAsset;
