import SolanaLogo from "../../../assets/images/solana-logo.png";
import Image from "next/image";
import { useSelector, RootStateOrAny } from "react-redux";
import { Form } from "./form";

const WalletAddressIndicator = () => {
  const { shortPublicAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  return (
    <div className="flex flex-row pb-4 items-center">
      <p className="pr-4">Profile for</p>
      <p className="">
        <div className="w-full gap-3 py-2 pl-6 pr-3 text-[15px] text-white rounded-full bg-primary flex flex-row items-center">
          {shortPublicAddress}
          <div className="w-[1px]  h-2/3 bg-[#5153F0]" />
          <Image src={SolanaLogo} alt="solana logo" />
        </div>
      </p>
    </div>
  );
};

const InfoView = () => {
  try {
    const { shortPublicAddress, _id, ...rest } = useSelector(
      (state: RootStateOrAny) => state.profile.data
    );
    return (
      <div className="flex flex-1 container justify-center pt-12">
        <div className="flex-1 max-w-lg ">
          <h3 className="text-3xl font-semibold pb-4">Signup infos</h3>
          <WalletAddressIndicator />
          <Form />
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex flex-1 container justify-center pt-20">
        <div className="flex-1 max-w-lg ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the setup page</span>
          </div>
        </div>
      </div>
    );
  }
};

export default InfoView;
