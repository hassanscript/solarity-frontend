import React, { FC, useEffect, useState } from "react";
import PostComp from "components/Post";
import { useRouter } from "next/router";
import { apiCaller } from "utils/fetcher";
import { Post, AccountType } from "modal/post";
import { POSTS } from "data/home";
import ago from "s-ago";
import axios from "axios";
import { getNftDetails } from "utils";
import { Promise } from "bluebird";

interface IProps {
  user?: any;
  accountType: AccountType;
  dao?: any;
}

const Posts: FC<IProps> = ({ accountType, user, dao }) => {
  const [tweets, setTweets] = useState<any>([]);
  const [blockchainActivities, setBlockchainActivities] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const router = useRouter();
  let id = "";
  let image = "";
  const { query } = router;
  if (query) {
    if (accountType == "user" && query.username) {
      id = String(query.username);
      image = user.profileImageLink;
    }
    if (accountType == "dao" && query.symbol) {
      id = String(query.symbol);
      image = dao.profileImageLink;
    }
  }

  const fetchTweets = async (queryString: string) => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await apiCaller("/tweets?" + queryString);
      const tweets = (data as any[]).map(
        ({
          full_text,
          favorite_count,
          created_at,
          retweet_count,
          retweeted_status,
          entities: { media },
        }) => ({
          title: retweeted_status ? "#Retweet" : "#Tweet",
          subtitle: () => (
            <div>
              {(retweeted_status ? retweeted_status.full_text : full_text)
                .split("\n")
                .map((t: string) => (
                  <p>{t}</p>
                ))}
              {media && media.length > 0 && (
                <img className="pt-2 rounded-3xl" src={media[0].media_url} />
              )}
            </div>
          ),
          likes: favorite_count,
          retweets: retweet_count,
          type: "tweet",
          id,
          created_at: new Date(created_at),
          time: ago(new Date(created_at)),
          accountType,
          user: {
            name: id,
            avatar: image,
          },
        })
      );
      setTweets(tweets);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  const fetchBlockchainActivities = async () => {
    if (!user) return null;
    try {
      const { solanaAddress } = user;
      const { data } = await axios.get(
        `https://api-mainnet.magiceden.dev/v2/wallets/${solanaAddress}/activities?offset=0&limit=100`
      );
      const formattedData: any[] = [];
      Promise.each(data, async (entry: any) => {
        const {
          blockTime,
          buyer,
          type,
          seller,
          price,
          source,
          collection,
          tokenMint,
        } = entry;
        let action;
        switch (type) {
          case "delist":
            action = "delisted";
            break;
          case "list":
            action = "listed";
            break;
          case "buyNow":
            action = buyer == publicAddress ? "bought" : "sold";
            break;
          default:
            break;
        }
        formattedData.push({
          accountType: "user",
          created_at: new Date(blockTime * 1000),
          time: ago(new Date(blockTime * 1000)),
          id: user.username,
          type: "blockchainActivity",
          title: "Blockchain Activities",
          action,
          seller,
          buyer,
          tokenMint,
          source,
          price,
          user,
          collection,
        });
      });
      setBlockchainActivities(formattedData);
    } catch (err) {
      console.log("Unable to fetch the blockchain activities", err);
    }
  };
  useEffect(() => {
    if (blockchainActivities.length == 0) {
      fetchBlockchainActivities();
    }
    fetchBlockchainActivities();
    let queryString = "";
    if (id && !loading && accountType !== "none") {
      queryString = `${accountType === "user" ? "username" : "symbol"}=${id}`;
      if (tweets.length == 0) {
        fetchTweets(queryString);
      }
    }
  }, [id]);

  if (loading) {
    return <div className="alert alert-info">Loading Posts...</div>;
  }

  if (error) {
    return <div className="alert alert-error">Error loading posts</div>;
  }

  if (accountType !== "none" && tweets.length == 0) {
    return (
      <div className="alert alert-warning">
        {accountType == "user" ? "User" : "DAO"} has not posts to show
      </div>
    );
  }
  try {
    let posts = POSTS;
    if (accountType !== "none") {
      posts = [...blockchainActivities, ...tweets];
      posts = posts.sort((x, y) => {
        if (x.created_at && y.created_at) {
          return (y.created_at || 0) - (x.created_at || 0);
        }
        return 1;
      });
    }
    return (
      <div className="flex flex-col gap-1 pb-5">
        {posts.map((post, index) => (
          <PostComp key={index} data={post} accountType={accountType} />
        ))}
      </div>
    );
  } catch (err) {
    setError(true);
    return <div></div>;
  }
};

export default Posts;
