import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
export interface DaoCardProps {
  name: string;
  symbol: string;
  profileImageLink: string;
  pageURL: string;
}
const Dao: FC<DaoCardProps> = ({ name, symbol, profileImageLink, pageURL }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-6 p-8 transition-all ease-in border cursor-pointer b bg-brandblack rounded-3xl hover:bg-base-100 border-brandblack">
      <Link href={`/daos/${symbol}`} passHref>
        <a className="flex flex-col items-center">
          <img
            src={profileImageLink}
            className="w-[120px] rounded-full"
            alt={name}
          />
          <p className="pt-2 text-md font-bold text-center leading-tight">
            {name}
          </p>
          <p className="pt-2 text-sm text-center text-gray-950 italic ">
            @{symbol}
          </p>
        </a>
      </Link>
    </div>
  );
};
export default Dao;
