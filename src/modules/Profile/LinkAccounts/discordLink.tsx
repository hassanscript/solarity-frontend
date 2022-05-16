import Image from "next/image";
import discordLogo from "assets/images/brand-logos/discord.png";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";

const discordLinkGenerator = (currentUrl: string) => {
  const baseUrl = "https://discord.com/api/oauth2/authorize";
  const params = {
    client_id: "963209278146117632",
    redirect_uri: currentUrl,
    response_type: "code",
    scope: "identify connections guilds guilds.members.read dm_channels.read",
  };

  const urlParams = new URLSearchParams(params);
  return baseUrl + "?" + urlParams.toString();
};

const DiscordLink: FC<{ resetUrl: Function }> = ({ resetUrl }) => {
  const { discordConnected, discordUsername } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    query: { link, code },
    asPath,
  } = router;
  console.log(code);
  const appUrl = (() => {
    let url = new URL(window.location.origin + asPath);
    let params = new URLSearchParams(url.search);
    params.delete("state");
    params.delete("code");
    params.set("link", "discord");
    return url.origin + url.pathname + "?" + params.toString();
  })();

  const discordConnectionLink = discordLinkGenerator(appUrl);

  useEffect(() => {
    if (link === "discord") {
      setLoading(true);
      dispatch(
        linkAccounts({
          data: {
            link: "discord",
            code,
            url: appUrl,
          },
          finalFunction: () => {
            setLoading(false);
            // resetUrl();
          },
        })
      );
    }
  }, [code, link]);
  return (
    <div className="border border-brandblack rounded-3xl p-5 flex items-center space-x-4">
      {discordConnected && (
        <button
          className={`btn btn-primary bg-[#6a0dad] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          onClick={() => {
            setLoading(true);
            dispatch(
              unlinkAccounts({
                data: {
                  link: "discord",
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
          <Image src={discordLogo} height="25" width="25" objectFit="contain" />
          <span>UNLINK DISCORD</span>
        </button>
      )}
      {!discordConnected && (
        <a
          className={`btn btn-primary bg-[#6a0dad] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          href={discordConnectionLink}
        >
          <Image src={discordLogo} height="25" width="25" objectFit="contain" />
          <span>LINK DISCORD</span>
        </a>
      )}
      {discordConnected ? (
        <p className="text-gray-950">
          You account is linked with discord username:{" "}
          <span className="font-bold text-green-500	">{discordUsername}</span>
        </p>
      ) : (
        <p className="text-gray-950">
          You account is not linked with any discord account
        </p>
      )}
    </div>
  );
};

export default DiscordLink;
