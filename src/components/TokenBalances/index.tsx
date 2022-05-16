import React, { FC, useState } from "react";
import CreateContract from "components/Modals/CreateContract";

import TokenBalanceItem, {
  TokenBalanceItemProps,
} from "components/TokenBalances/TokenBalanceItem";
import { getWalletBalances } from "hooks";
import { Loader } from "components/Loader";

export interface TokenBalancesProps {
  title: string;
  tokens: TokenBalanceItemProps[];
}

const TokenBalance: FC<{ solanaAddress: string; ethereumAddress: string }> = ({
  solanaAddress,
  ethereumAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex flex-col gap-8 py-8 bg-brandblack">
        <div className="flex items-center justify-between px-8">
          <span className="text-lg font-bold">Token Balances</span>
          <button
            className="rounded-full btn btn-secondary"
            onClick={toggleModal}
          >
            Create Contract
          </button>
        </div>
        <div className="pb-5 px-8 overflow-x-auto scrollbar-thin scrollbar-thumb-black track-white">
          <TokenBalanceDisplay
            solanaAddress={solanaAddress}
            ethereumAddress={ethereumAddress}
          />
        </div>
      </div>
      <CreateContract open={isOpen} onClose={toggleModal} />
    </>
  );
};

const TokenBalanceDisplay: FC<{
  solanaAddress: string;
  ethereumAddress: string;
}> = ({ solanaAddress, ethereumAddress }) => {
  const { tokens, coins, loading, error } = getWalletBalances({
    solanaAddress,
    ethereumAddress,
  });
  if (error) {
    return (
      <div className="alert alert-error">Error fetching token balances</div>
    );
  }
  if (loading) {
    return <Loader text="Loading balances" />;
  }
  return (
    <div className="flex flex-row gap-5">
      {[...coins, ...tokens.filter(({ balance }) => balance != 0)].map(
        (item, index) => (
          <TokenBalanceItem key={index} {...item} />
        )
      )}
    </div>
  );
};

export default TokenBalance;
