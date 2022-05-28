import { FC } from "react";
import DiscordLink from "./discordLink";
import TwitterLink from "./twitterLink";
import EthereumLink from "./ethereumLink";
import SolanaLink from "./solanaLink";

const LinkAccounts: FC<{
  resetUrl: Function;
  mini?: boolean;
  hideLinkedAddress?: boolean;
  disabled?: boolean;
}> = ({ resetUrl, mini, hideLinkedAddress, disabled }) => {
  return (
    <div className="space-y-4">
      {!mini && <h3 className="pb-5 text-2xl font-bold">Link Accounts</h3>}
      <SolanaLink
        disabled={disabled}
        mini={Boolean(mini)}
        hideLinkedAddress={hideLinkedAddress}
      />
      <EthereumLink
        disabled={disabled}
        mini={Boolean(mini)}
        hideLinkedAddress={hideLinkedAddress}
      />
      <DiscordLink disabled={disabled} mini={mini} resetUrl={resetUrl} />
      <TwitterLink disabled={disabled} mini={mini} resetUrl={resetUrl} />
    </div>
  );
};

export default LinkAccounts;
