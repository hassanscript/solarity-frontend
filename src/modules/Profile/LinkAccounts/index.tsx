import { FC } from "react";
import DiscordLink from "./discordLink";
import TwitterLink from "./twitterLink";
import EthereumLink from "./ethereumLink";
import SolanaLink from "./solanaLink";

const LinkAccounts: FC<{ resetUrl: Function }> = ({ resetUrl }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-2xl pb-5">Link Accounts</h3>
      <SolanaLink />
      <EthereumLink />
      <DiscordLink resetUrl={resetUrl} />
      <TwitterLink resetUrl={resetUrl} />
    </div>
  );
};

export default LinkAccounts;
