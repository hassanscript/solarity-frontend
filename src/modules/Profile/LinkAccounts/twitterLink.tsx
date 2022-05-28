import Image from "next/image";
import twitterLogo from "assets/images/brand-logos/twitter.png";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";
import { LinkWrapper } from "./sharedComponents";

const twitterLinkGenerator = (currentUrl: string) => {
  const baseUrl = "https://twitter.com/i/oauth2/authorize";
  const params = {
    response_type: "code",
    client_id: "MENrR095Mkl6WFdKWGZEV0VLTkg6MTpjaQ",
    redirect_uri: currentUrl,
    scope: "tweet.read users.read offline.access",
    state: "state",
    code_challenge: "challenge",
    code_challenge_method: "plain",
  };
  const urlParams = new URLSearchParams(params);
  return baseUrl + "?" + urlParams.toString();
};

const twitterLink: FC<{
  resetUrl: Function;
  mini?: boolean;
  disabled?: boolean;
}> = ({ resetUrl, disabled, mini }) => {
  const { twitterConnected, twitterUsername } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    query: { link, code },
    asPath,
  } = router;
  const appUrl = (() => {
    let url = new URL(window.location.origin + asPath);
    let params = new URLSearchParams(url.search);
    params.delete("state");
    params.delete("code");
    params.set("link", "twitter");
    return url.origin + url.pathname + "?" + params.toString();
  })();
  const twitterConnectionLink = twitterLinkGenerator(appUrl);
  useEffect(() => {
    if (link === "twitter") {
      setLoading(true);
      dispatch(
        linkAccounts({
          data: {
            link: "twitter",
            code,
            url: appUrl,
          },
          finalFunction: () => {
            setLoading(false);
            resetUrl();
          },
        })
      );
    }
  }, [code, link]);

  return (
    <LinkWrapper mini={mini}>
      {twitterConnected && (
        <button
          className={`btn btn-primary flex space-x-2 bg-[#1DA1F2] ${
            loading ? "loading" : ""
          }`}
          onClick={() => {
            setLoading(true);
            dispatch(
              unlinkAccounts({
                data: {
                  link: "twitter",
                  code,
                },
                finalFunction: () => {
                  setLoading(false);
                  resetUrl();
                },
              })
            );
          }}
        >
          <Image src={twitterLogo} height="25" width="25" objectFit="contain" />
          <span>UNLINK TWITTER</span>
        </button>
      )}
      {!twitterConnected && (
        <a
          className={`btn btn-primary flex space-x-2 bg-[#1DA1F2] ${
            loading ? "loading" : ""
          } ${disabled ? "btn-disabled" : ""}`}
          href={twitterConnectionLink}
        >
          <Image src={twitterLogo} height="25" width="25" objectFit="contain" />
          <span>LINK TWITTER</span>
        </a>
      )}
      {twitterConnected ? (
        <p className="text-gray-950">
          You account is linked with twitter username:{" "}
          <span className="font-bold text-green-500	">{twitterUsername}</span>
        </p>
      ) : (
        <p className="text-gray-950">Link your account with twitter</p>
      )}
    </LinkWrapper>
  );
};

export default twitterLink;
