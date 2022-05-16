import React, { FC, useEffect, useState } from "react";
import Banner from "components/Banner";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import placeholder from "../../assets/images/placeholder/avatar.png";
import { RootStateOrAny, useSelector } from "react-redux";
import Link from "next/link";
import { apiCaller } from "utils/fetcher";
import { Button } from "../../components/FormComponents";

const FollowButton: FC<{
  symbol: string;
  updateFollowingCount: (change: number) => void;
}> = ({ symbol, updateFollowingCount }) => {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIfFollowing = async () => {
    try {
      const {
        data: { following },
      } = await apiCaller(`/daos/${symbol}/follow`);
      setFollowing(following);
    } catch {}
    setLoading(false);
  };

  const toggleFollow = async () => {
    setLoading(true);
    try {
      await apiCaller.post(
        `/daos/${symbol}/${following ? "unfollow" : "follow"}`
      );
      setFollowing(!following);
      updateFollowingCount(following ? -1 : 1);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    checkIfFollowing();
  }, []);

  return (
    <Button disableOnLoading loading={loading} onClick={toggleFollow}>
      {following ? "Following" : "Follow"}
    </Button>
  );
};

const Hero: FC<{ dao: any }> = ({ dao: initialDao }) => {
  const logged = useSelector((state: RootStateOrAny) => state.auth.logged);
  const [dao, setDao] = useState(initialDao);
  return (
    <div className="mb-10">
      <Banner
        vrdao={{
          featured: true,
          imageUrl: "/images/placeholder/post/post_one.png",
          price: "5",
        }}
        smallImage={dao.profileImageLink || placeholder.src}
      />
      {logged && (
        <div className="flex justify-end">
          <FollowButton
            symbol={dao.symbol}
            updateFollowingCount={(number) => {
              setDao({ ...dao, followerCount: dao.followerCount + number });
            }}
          />
        </div>
      )}
      <div className="pt-2 flex flex-col justify-center items-center">
        <span className="text-lg font-bold ">{dao.name}</span>
        <span className="text-sm text-gray-500">@{dao.symbol}</span>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button className="gap-2 text-sm normal-case rounded-full btn btn-primary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
              fill="#6163FF"
            />
          </svg>
          {dao.followerCount} Followers
        </button>
        {dao.githubUsername && (
          <a
            className="bg-white btn btn-circle"
            target="__blank"
            href={`https://github.com/${dao.githubUsername}`}
          >
            <AiFillGithub size={22} color="#000" />
          </a>
        )}
        {dao.twitterUsername && (
          <a
            className="bg-white btn btn-circle"
            target="__blank"
            href={`https://twitter.com/${dao.twitterUsername}`}
          >
            <AiOutlineTwitter size={22} color="#55ACEE" />
          </a>
        )}
        {dao.discordHandle && (
          <a
            className="bg-white btn btn-circle"
            target="__blank"
            href={`https://discord.com/${dao.discordHandle}`}
          >
            <FaDiscord size={22} color="#7289d9" />
          </a>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <span className="max-w-[750px] text-sm text-center text-gray-950">
          {dao.description}
        </span>
      </div>
    </div>
  );
};

export default Hero;
