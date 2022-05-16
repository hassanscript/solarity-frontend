import React, { FC } from "react";
import Base from "modules/DAOS/Base";
import TokenBalance from "components/TokenBalances";
import Transfer from "components/Tables/Transfer1";

const Payout: FC<{ user: any }> = ({ user }) => {
  const { solanaAddress, ethereumAddress } = user;
  return (
    <div className="flex flex-col gap-10">
      <TokenBalance
        solanaAddress={solanaAddress}
        ethereumAddress={ethereumAddress}
      />
      <Transfer solanaAddress={solanaAddress} />
    </div>
  );
};

export default Payout;
