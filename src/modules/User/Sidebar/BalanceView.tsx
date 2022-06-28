import React, { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getWalletBalances } from "hooks";
import { Loader } from "components/Loader";
import { DoubleIcon } from "components/Icons";
import {
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import WalletSelector from "components/WalletSelector";
import { getOrCreateAssociatedTokenAccount } from "utils/getOrCreateAssociatedTokenAccount";
import { createTransferInstruction } from "utils/createTransferInstruction";

import { toast } from "react-toastify";
import { getRewardAction } from "redux/slices/profileSlice";

const CoinBalances: FC<{ data: any[] }> = ({ data }) => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const [showWallets, setShowWallets] = useState(false);
  const dispatch = useAppDispatch();

  const getReward = async (provider: any) => {
    await provider.connect();
    const { publicKey, signTransaction } = provider;
    try {
      if (
        !process.env.NEXT_PUBLIC_WEBSITE_SOLANA_WALLET_ADDRESS ||
        !process.env.NEXT_PUBLIC_SOLARITY_TOKEN_ADDRESS
      ) {
        return console.error(
          "website solana wallet address or solarity_token_address is not set in environment."
        );
      }
      const toPublicKey = new PublicKey(
        process.env.NEXT_PUBLIC_WEBSITE_SOLANA_WALLET_ADDRESS
      );
      const mint = new PublicKey(
        process.env.NEXT_PUBLIC_SOLARITY_TOKEN_ADDRESS
      );
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mint,
        publicKey,
        signTransaction
      );
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mint,
        toPublicKey,
        signTransaction
      );
      const transaction1 = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount.address, // source
          toTokenAccount.address, // dest
          publicKey,
          100 * LAMPORTS_PER_SOL,
          [],
          TOKEN_PROGRAM_ID
        )
      );
      const blockHash = await connection.getRecentBlockhash();
      transaction1.feePayer = await publicKey;
      transaction1.recentBlockhash = await blockHash.blockhash;
      const signed = await signTransaction(transaction1);
      dispatch(
        getRewardAction({
          data: {
            signed,
            connection,
            setShowWallets,
          },
          successFunction: () => {
            toast.success("You got 100 Verse tokens.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
          errorFunction: (err: any) => {
            alert(false);
            setShowWallets(false);
          },
          finalFunction: () => {},
        })
      );
    } catch (error: any) {
      console.error(error.message);
      setShowWallets(false);
    }
  };

  return (
    <>
      <WalletSelector
        type="solana"
        title="Pay using Solana"
        subtitle="Select a wallet from the list to pay with"
        open={showWallets}
        onClose={() => setShowWallets(false)}
        onSelect={(address, type, provider) => {
          getReward(provider);
        }}
      />
      <div className="flex justify-between">
        <div className="space-y-2 divide-y divide-gray-800 rounded-3xl bg-brandblack">
          {data.map(({ image, balance, title, symbol, usdValue }, index) => (
            <div className="flex items-start justify-center px-3 pt-3 first:pt-0" key={index}>
              <img
                src={image}
                className="rounded-full"
                height="40px"
                width="40px"
              />
              <div className="flex-1 pl-3">
                <p className="text-xs text-gray-950">{title} Balance</p>
                <div>
                  <span className="text-2xl font-bold">{balance}</span>
                  <span className="text-sm font-bold"> {symbol}</span>
                </div>
                <p className="text-sm text-success">~ {usdValue} USD</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex-2 pl-3 pr-5">
        <div className="relative">
          <div className="pt-2">
            <DoubleIcon />
          </div>
          <span className="animate-ping absolute -bottom-7 inline-flex z-0 h-5 w-5 rounded-full bg-white opacity-75"></span>
          <img 
            src="/assets/images/reward.png" 
            className="z-10 absolute cursor-pointer"
            onClick={() => setShowWallets(true)} 
            alt="reward"
            title="reward: 100 Verse tokens" 
          />
        </div>
      </div> */}
      </div>
    </>
  );
};

//test

const BalanceViewWrapper: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <div className="rounded-3xl bg-brandblack p-4">
      <>{children}</>
    </div>
  );
};

const BalanceView: FC<{
  solanaAddress?: string;
  ethereumAddress?: string;
}> = ({ solanaAddress, ethereumAddress }) => {
  const { coins, tokens, loading, error } = getWalletBalances({
    solanaAddress,
    ethereumAddress,
  });

  if (error) {
    return (
      <BalanceViewWrapper>
        <div className="alert alert-error shadow-lg">
          <span>An error occurred while fetching the user's balances</span>
        </div>
      </BalanceViewWrapper>
    );
  }

  if (loading) {
    return (
      <BalanceViewWrapper>
        <Loader text="Fetching balances..." />
      </BalanceViewWrapper>
    );
  }

  const ownedTokens = tokens.filter(
    ({ balance, showOnZero }) => balance > 0 || showOnZero
  );

  return (
    <BalanceViewWrapper>
      <CoinBalances data={[...coins, ...ownedTokens]} />
    </BalanceViewWrapper>
  );
};

export default BalanceView;
