import EthereumLogo from "../../assets/images/icons/ethereum.png";
import SolanaLogo from "../../assets/images/icons/solana.png";
import Image from "next/image";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { FC } from "react";
import { Button } from "components/FormComponents";
import { MdChevronLeft } from "react-icons/md";
import { startLoadingApp, stopLoadingApp } from "redux/slices/commonSlice";
import { apiCaller } from "utils/fetcher";
import { toast } from "react-toastify";
import { showErrorToast } from "utils";
import { undoSetupStep } from "redux/slices/profileSlice";

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

export const BackButton: FC<{ stepName: String }> = ({ stepName }) => {
  const dispatch = useDispatch();

  const onBack = async () => {
    dispatch(startLoadingApp());
    dispatch(
      undoSetupStep({
        stepName,
        onFinally: () => {
          dispatch(stopLoadingApp());
        },
      })
    );
  };

  return (
    <Button onClick={onBack} variant="info">
      <MdChevronLeft fontSize="24" />
      Back
    </Button>
  );
};
