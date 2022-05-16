import React, { FC } from "react";
import { getWalletBalances } from "hooks";
import { Loader } from "components/Loader";

const CoinBalances: FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="bg-brandblack rounded-3xl divide-y divide-gray-800 space-y-2">
      {data.map(({ image, balance, title, symbol, usdValue }) => (
        <div className="px-3 flex justify-center items-start pt-3 first:pt-0">
          <img
            src={image}
            height="40px"
            width="40px"
            className="rounded-full"
          />
          <div className="flex-1 pl-3">
            <p className="text-xs text-gray-950">{title} Balance</p>
            <div>
              <span className="text-2xl font-bold">{balance}</span>
              <span className="text-sm font-bold"> {symbol}</span>
            </div>
            <p className="text-sm text-success">~ {usdValue} USD</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const BalanceViewWrapper: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <div className="p-4 bg-brandblack rounded-3xl">
      <>{children}</>
    </div>
  );
};

const BalanceView: FC<{
  solanaAddress?: string;
  ethereumAddress?: string;
}> = ({ solanaAddress, ethereumAddress }) => {
  const { coins, tokens, loading, error } = getWalletBalances({
    solanaAddress,
    ethereumAddress,
  });

  if (error) {
    return (
      <BalanceViewWrapper>
        <div className="alert alert-error shadow-lg">
          <span>An error occurred while fetching the user's balances</span>
        </div>
      </BalanceViewWrapper>
    );
  }

  if (loading) {
    return (
      <BalanceViewWrapper>
        <Loader text="Fetching balances..." />
      </BalanceViewWrapper>
    );
  }

  const ownedTokens = tokens.filter(({ balance }) => balance > 0);

  return (
    <BalanceViewWrapper>
      <CoinBalances data={[...coins, ...ownedTokens]} />
    </BalanceViewWrapper>
  );
};

export default BalanceView;
