import React, { FC, Fragment, useEffect, useState } from "react";
import Banner from "components/Banner";
import Link from "components/Link";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { MENU_LINKS } from "data/profile";
import { RootStateOrAny, useSelector } from "react-redux";
import { useRouter } from "next/router";
import placeholder from "assets/images/placeholder/avatar.png";
import { Button } from "components/FormComponents";
import { apiCaller } from "utils/fetcher";
import { FollowerList } from "./FollowerList";

type HeroProps = {
  user: Object;
};

export type User = {
  profileImageLink?: string;
  username: string;
  followerCount: number;
  bio?: string;
  githubUsername?: string;
  twitterUsername?: string;
  discordUsername?: string;
};

const FollowButton: FC<{
  username: string;
  updateFollowingCount: (change: number) => void;
}> = ({ username, updateFollowingCount }) => {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIfFollowing = async () => {
    try {
      const {
        data: { following },
      } = await apiCaller(`/users/${username}/follow`);
      setFollowing(following);
    } catch {}
    setLoading(false);
  };

  const toggleFollow = async () => {
    setLoading(true);
    try {
      await apiCaller.post(
        `/users/${username}/${following ? "unfollow" : "follow"}`
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

const Hero: FC<HeroProps> = ({ user }) => {
  const [profile, setProfile] = useState<User>(user as User);
  const [showFollowers, setShowFollowers] = useState(false);
  const router = useRouter();
  const { profileData, logged } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
    logged: state.auth.logged,
  }));
  let self = false;
  if (logged && profileData) {
    self = profile.username === profileData.username;
  }

  useEffect(() => {
    if (!showFollowers) return;
  }, [showFollowers]);
  //hide follow if not logged
  return (
    <div>
      <FollowerList
        username={profile.username}
        open={showFollowers}
        onClose={() => setShowFollowers(false)}
      />
      <Banner
        vrprofile={{
          featured: true,
          imageUrl: "/images/placeholder/post/post_one.png",
          price: "5",
        }}
        user={user}
        smallImage={profile.profileImageLink || placeholder.src}
      />
      <div className="flex justify-end">
        {logged &&
          (self ? (
            <Link className="" href="/profile">
              <Button>Update Profile</Button>
            </Link>
          ) : (
            <FollowButton
              username={profile.username}
              updateFollowingCount={(number) => {
                setProfile({
                  ...profile,
                  followerCount: profile.followerCount + number,
                });
              }}
            />
          ))}
      </div>
      <div className="flex justify-center">
        <span className="text-lg font-bold ">{profile.username}</span>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="gap-2 text-sm normal-case rounded-full btn btn-primary"
          onClick={() => setShowFollowers(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
              fill="#6163FF
"
            />
          </svg>
          {profile.followerCount} Followers
        </button>
        {profile.githubUsername && (
          <a
            className="bg-white btn btn-circle"
            target={"__blank"}
            href={`https://github.com/${profile.githubUsername}`}
          >
            <AiFillGithub size={22} color="#000" />
          </a>
        )}
        {profile.twitterUsername && (
          <a
            className="bg-white btn btn-circle"
            target={"__blank"}
            href={`https://twitter.com/${profile.twitterUsername}`}
          >
            <AiOutlineTwitter size={22} color="#55ACEE" />
          </a>
        )}
        {profile.discordUsername && (
          <a
            className="bg-white btn btn-circle"
            target={"__blank"}
            href={`https://discord.com/users/${profile.discordUsername}`}
          >
            <FaDiscord size={22} color="#7289D9" />
          </a>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <span className="max-w-[750px] text-sm text-center text-gray-950">
          {self ? (
            profile.bio ? (
              profile.bio
            ) : (
              <div className="badge badge-xl">Your profile is missing bio</div>
            )
          ) : (
            profile.bio
          )}
        </span>
      </div>
      <div className="flex justify-center gap-8 mt-8">
        {MENU_LINKS(profile.username).map(({ link, exact, title }, index) => (
          <Link
            href={link}
            key={link}
            exact={exact}
            className="text-lg "
            activeClassName="font-bold border-b-2 pb-3  border-secondary"
            defaultClassName=""
          >
            {title}
          </Link>
        ))}
      </div>
      <div className="border-b border-brandblack" />
    </div>
  );
};

export default Hero;
