import React from "react";
import Link from "next/link";
import avatarPlaceholder from "assets/images/placeholder/avatar.png";
import Image from "next/image";
import { Download, Love, Calendar, Share } from "components/Icons";

import { AccountType, PostType } from "modal/post";
import { minifyNumber } from "utils";

const Footer = ({
  type,
  accountType,
  user,
  likes,
  retweets,
}: {
  type: PostType;
  accountType: AccountType;
  likes?: number;
  retweets?: number;
  user: {
    name: string;
    avatar: string;
  };
}) => {
  if (type == "blockchainActivity") return <></>;
  return (
    <div className="border-t justify-between  border-[hsl(210,9%,9%)] flex px-10 py-5 bg-[#1F2125] border-l border-r border-l-darkcharcoal border-r-darkcharcoal w-full">
      <div className="flex gap-6">
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-gray-950">Posted by</span>
          <div className="flex items-center">
            <Link
              href={`${accountType === "dao" ? "/dao" : ""}/${user.name}`}
              passHref
            >
              <a className="flex flex-row">
                <img
                  src={user.avatar || avatarPlaceholder.src}
                  alt="user avatar"
                  className="rounded-full h-[35px] w-[35px]"
                />
              </a>
            </Link>
            <div className="ml-1 text-sm text-secondary">{user.name}</div>
          </div>
        </div>
        {type === "tweet" && (
          <>
            <div className="flex items-center justify-center gap-3">
              <Share />
              <span className="text-xs text-gray-950">
                {minifyNumber(retweets || 0)} Retweets
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Love />
              <span className="text-xs text-gray-950">
                {minifyNumber(likes || 0)} Favorites
              </span>
            </div>
          </>
        )}

        {!["announcement", "tweet"].includes(type) && (
          <>
            <div className="flex items-center justify-center gap-3">
              <Download />
              <span className="text-xs text-gray-950">808 Downloads</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Love />
              <span className="text-xs text-gray-950">2.5k Likes</span>
            </div>
          </>
        )}

        {type === "announcement" && (
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-gray-950">9 hours ago</span>
          </div>
        )}

        {type === "featured" && (
          <Link href="/#" passHref>
            <a className="ml-1 text-sm text-secondary">Try in your Room</a>
          </Link>
        )}
        {type === "normal" && (
          <div className="flex items-center justify-center gap-3">
            <Share />
            <span className="text-xs text-gray-950">101 Shares</span>
          </div>
        )}
      </div>
      {type === "announcement" && (
        <button className="gap-3 text-xs font-bold btn btn-sm rounded-3xl bg-[#1d3040] ">
          <Calendar />
          <div>
            <span className="font-normal text-white normal-case">
              End of vote:
            </span>{" "}
            08-13-00
          </div>
        </button>
      )}
    </div>
  );
};

export default Footer;
