import React, { FC, useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

export type NftCardProps = {
  name: string;
  mint: string;
  uri: string;
  onClick?: (mintAddress: string, imageUrl?: string) => void;
  selected?: boolean;
};
export const NftCardSelect: FC<NftCardProps> = ({
  name,
  mint,
  uri,
  onClick,
  selected,
}) => {
  const [details, setDetails] = useState<{
    collection?: { name: string };
    image?: string;
  }>({});
  const getDetails = () => {
    fetch(uri, {
      mode: "cors",
      credentials: "omit",
    })
    .then(res => {
      if(!res)
        return;
      res.json().then(result => {setDetails(result)});
    })
    .catch(error => console.error('Error: ', error));
  };
  useEffect(() => {
    getDetails();
  }, []);
  const clickable = Boolean(onClick);

  return (
    <div className="w-[100px] h-[100px] rounded-xs p-2">
      {details.image && (
        <div 
          className={`border-2 ${selected ? `border-red`: `border-transparent`} cursor-pointer hover:border-2 hover:border-white`}
          onClick={() => onClick && onClick(mint, details.image)}
        >
            <img
              src={details.image}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                border: "none",
              }}
              alt={name}
            />
        </div>
        )}
    </div>
  );
}