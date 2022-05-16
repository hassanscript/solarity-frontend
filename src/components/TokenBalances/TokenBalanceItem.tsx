import React, { FC } from "react";

export interface TokenBalanceItemProps {
  balance: number;
  image: string;
  symbol: string;
  title: string;
  usdValue: number;
}

const TokenBalanceItem: FC<TokenBalanceItemProps> = ({
  balance,
  image,
  symbol,
  title,
  usdValue,
}) => {
  const balanceString = String(balance);
  return (
    <div className="flex flex-col items-center px-8 py-4 border select-none border-base-100 rounded-3xl min-w-[170px]">
      <div>
        <img
          src={image}
          alt={`${symbol} logo`}
          className="rounded-full w-[42px] h-[42px]"
        />
      </div>
      <span className="mt-1 text-sm">{title}</span>
      <span className="mt-3 text-xl font-bold">
        {balanceString.split(".")[0]}
        {balanceString.split(".")[1] && (
          <span className="text-lg ">.{balanceString.split(".")[1]}</span>
        )}
      </span>
      <span className="text-xs text-gray-950">
        {usdValue ? `$${usdValue}` : "-"}
      </span>
    </div>
  );
};

export default TokenBalanceItem;
