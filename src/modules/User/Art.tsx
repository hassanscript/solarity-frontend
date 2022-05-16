import React, { FC, useEffect, useState } from "react";
import Select from "../../components/SelectInput";
import { getNfts } from "../../hooks";
import { Loader } from "../../components/Loader";
import placeholder from "../../assets/images/placeholder/avatar.png";
import solanaIcon from "../../assets/images/icons/solana.png";
import ethereumIcon from "../../assets/images/icons/ethereum.png";

type ArtProps = {
  solanaAddress: string;
  username: string;
};

export type NftCardProps = {
  name: string;
  collectionName: string;
  type: string;
  image: string;
  onClick?: () => void;
  selected?: boolean;
};

export const NftCard: FC<NftCardProps> = ({
  name,
  collectionName,
  type,
  image,
  onClick,
  selected,
}) => {
  const clickable = Boolean(onClick);
  const isSol = type === "Solana";
  const icon = isSol ? solanaIcon.src : ethereumIcon.src;
  return (
    <a
      className={`relative flex flex-col gap-2 p-4 ${
        selected ? "bg-secondary" : "bg-brandblack"
      } rounded-3xl ${!selected && "hover:bg-black"} ${
        clickable && "cursor-pointer"
      } `}
      onClick={() => onClick && onClick()}
    >
      <img src={icon} className="w-10 object-contain absolute top-5 left-5" />
      <div className="flex justify-center rounded-xl overflow-hidden">
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = placeholder.src;
          }}
          className="bg-base-100"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            border: "none",
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{name}</span>
          <span
            className={`flex items-center gap-2 text-${
              selected ? "white" : "secondary"
            }`}
          >
            {collectionName}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99935 18.3334C14.5827 18.3334 18.3327 14.5834 18.3327 10C18.3327 5.41669 14.5827 1.66669 9.99935 1.66669C5.41602 1.66669 1.66602 5.41669 1.66602 10C1.66602 14.5834 5.41602 18.3334 9.99935 18.3334Z"
                stroke={selected ? "white" : "#6163FF"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.45898 10L8.81732 12.3583L13.5423 7.64166"
                stroke={selected ? "white" : "#6163FF"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

const Art: FC<ArtProps> = ({ solanaAddress, username }) => {
  const [nfts, loading, error] = getNfts(username, solanaAddress);
  if (error) {
    return (
      <div className="alert alert-error shadow-lg w-full mb-5">
        <span>Error Loading NFTs...</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pb-5">
        <Loader text="fetching the NFTs" />
      </div>
    );
  }

  if (nfts.length == 0) {
    return (
      <div className="alert alert-info shadow-lg w-full mb-5">
        <span>This user doesn't own any NFTs...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Select title="All Collections" className="rounded-full font-[19px]" />
      </div>
      <div className="grid grid-cols-3 gap-3 my-4 ">
        {nfts.map((data, index) => (
          <NftCard key={"nftCard-" + index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Art;
