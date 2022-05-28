import EthereumLogo from "../../assets/images/icons/ethereum.png";
import SolanaLogo from "../../assets/images/icons/solana.png";
import Image from "next/image";
import { useSelector, RootStateOrAny } from "react-redux";
import { FC } from "react";

export const WalletAddressIndicator: FC<{}> = () => {
  const { shortPublicAddress, solanaAddress, ethereumAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const solanaConnected = Boolean(solanaAddress);
  return (
    <div className="flex flex-row items-center pb-4">
      <p className="pr-4">Profile for</p>
      <p className="">
        <div className="flex w-full flex-row items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-3 text-[15px] text-white">
          {shortPublicAddress}
          <div className="h-2/3  w-[1px] bg-[#5153F0]" />
          <Image
            height="35px"
            width="35px"
            objectFit="contain"
            src={solanaConnected ? SolanaLogo : EthereumLogo}
            alt={`${solanaConnected ? "solana" : "ethereum"} logo`}
          />
        </div>
      </p>
    </div>
  );
};
