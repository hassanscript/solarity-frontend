import React, { FC, useState } from "react";
import Image from "next/image";
import classnames from "classnames";
import Tags from "components/Post/Tags";
import { AccountType, Post } from "modal/post";
import Footer from "components/Post/Footer";
import { VR } from "components/Icons";
import { getNftDetails, minifyAddress, minifyNumber } from "utils";
import avatarPlaceholder from "assets/images/placeholder/avatar.png";

import AframeComp from "components/AframeComp";
import AframeComp1 from "components/AframeComp1";
import AframeComp2 from "components/AframeComp2";
import AframeComp3 from "components/AframeComp3";
import AframeComp4 from "components/AframeComp4";
import AframeComp5 from "components/AframeComp5";
import AframeComp6 from "components/AframeComp6";
import AframeComp7 from "components/AframeComp7";
import AframeComp8 from "components/AframeComp8";
import AframeComp9 from "components/AframeComp9";

const AvatarDisplay: FC<{ url?: string }> = ({ url }) => {
  return (
    <div className="flex">
      <div className="relative mt-3 w-14 h-14 bg-black rounded-full overflow-hidden">
        <img src={url || avatarPlaceholder.src} className="rounded-full" />
      </div>
    </div>
  );
};

const TopBarInfo: FC<{
  title: string;
  tags?: any[];
  user: any;
  type: string;
  likes?: number;
  time?: string;
}> = ({ title, user, tags = [], type, likes = 0, time }) => {
  return (
    <>
      <span className="font-bold text-secondary">{user.name}</span>
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col">
          <div className="flex">
            <span
              className={classnames(
                type === "featured" ? "text-base" : "text-xl",
                "font-bold"
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
          {tags && <Tags tags={tags} />}
        </div>

        {type !== "announcement" ? (
          <div className="flex flex-col items-end">
            {likes > 0 && (
              <span className="text-sm font-bold">{minifyNumber(likes)}</span>
            )}
            {type !== "featured" && (
              <span className="text-xs text-gray-950">{time}</span>
            )}
          </div>
        ) : (
          <button className="rounded-full btn btn-primary">ACTIVE</button>
        )}
      </div>
    </>
  );
};

const Subtitle: FC<{
  subtitle?: string | Function;
  type: string;
  data?: any;
  user?: any;
}> = ({ subtitle, type, data, user }) => {
  const [nftImage, setNftImage] = useState("");
  if (type == "blockchainActivity") {
    const { action, tokenMint, price, collection } = data;
    let collectionName = "nft";
    if (collection) {
      collectionName = collection.replace("_", " ");
    }
    let prefix = "a";
    if (["a", "e", "i", "o", "u"].includes(collectionName[0])) {
      prefix = "an";
    }
    getNftDetails(tokenMint)
      .then(({ Preview_URL }) => setNftImage(Preview_URL))
      .catch(() => {});
    return (
      <div>
        <p>{`${action} ${prefix} ${collectionName} for ${price} SOL`}</p>
        <img className="pt-2 rounded-3xl h-[300px]" src={nftImage} />
      </div>
    );
  }

  if (!subtitle) return <></>;
  if (typeof subtitle === "string") {
    return (
      <span
        className="mt-2 text-sm leading-5"
        dangerouslySetInnerHTML={{
          __html: subtitle,
        }}
      />
    );
  }
  if (typeof subtitle === "function") {
    return subtitle();
  }
};

const index = ({
  accountType,
  data,
  data: {
    title,
    subtitle,
    likes,
    retweets,
    time,
    vr,
    vr1,
    vr2,
    vr3,
    vr4,
    vr5,
    vr6,
    vr7,
    vr8,
    vr9,
    type,
    tags,
    progress,
    user,
  },
}: {
  data: Post;
  accountType: AccountType;
}) => {
  let profileImage = user && user.avatar;
  return (
    <div>
      <div className="flex gap-4  bg-[#1F2125] px-5 py-3 border-l border-darkcharcoal border-r ">
        <AvatarDisplay url={profileImage} />
        <div className="flex flex-col w-full">
          <TopBarInfo
            title={title}
            type={type}
            user={user}
            tags={tags}
            time={time}
            likes={likes}
          />
          <Subtitle subtitle={subtitle} type={type} data={data} user={user} />
          {progress && (
            <div className="flex items-center justify-end w-full gap-6">
              <span className="text-xs text-gray-950">
                {progress}% Completed
              </span>
              <progress
                className="w-40 h-1 progress progress-success h"
                value={progress}
                max="100"
              ></progress>
            </div>
          )}
          {vr && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp />
              {/* </iframe> */}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr1 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp1 />
              {/* </iframe> */}
              {vr1.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr1.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr2 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp2 />
              {/* </iframe> */}
              {vr2.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr2.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr3 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp3 />
              {/* </iframe> */}
              {vr3.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr3.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr4 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp4 />
              {/* </iframe> */}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr5 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp5 />
              {/* </iframe> */}
              {vr5.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr5.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr7 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp7 />
              {/* </iframe> */}
              {vr7.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr7.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr8 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp8 />
              {/* </iframe> */}
              {vr8.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr8.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
          {vr9 && (
            <div className="relative w-full h-[229px] rounded-2xl mt-4">
              {/* <Image
              src={vr.imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
              {/* <iframe 
            > */}
              <AframeComp9 />
              {/* </iframe> */}
              {vr9.price && (
                <button className="absolute text-sm font-bold bg-white rounded-full btn top-2 right-2 text-secondary">
                  {vr9.price} $VRS
                </button>
              )}
              {/*{vr && (
              <button className="absolute gap-3 text-lg font-bold btn rounded-3xl bottom-2 right-2 bg-transparentwhite">
                <VR />
                VR
              </button>
            )}*/}
            </div>
          )}
        </div>
      </div>
      <Footer
        user={user}
        accountType={accountType}
        type={type}
        likes={likes}
        retweets={retweets}
      />
    </div>
  );
};

export default index;
