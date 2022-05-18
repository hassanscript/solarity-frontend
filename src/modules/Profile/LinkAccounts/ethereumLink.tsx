import Image from "next/image";
import ethereumLogo from "assets/images/brand-logos/ethereum.png";
import { FC, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";

import { minifyAddress } from "utils";
import WalletSelector from "components/WalletSelector";
import Web3 from "web3";
import { signMessage } from "utils/walletHelpers";
import { LinkWrapper } from "./sharedComponents";

const EthereumLink: FC<{
  mini?: boolean;
  hideLinkedAddress?: boolean;
  disabled?: boolean;
}> = ({ mini, disabled, hideLinkedAddress }) => {
  const { ethereumAddress, _id: userId } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (hideLinkedAddress && ethereumAddress) return <></>;
  return (
    <>
      <WalletSelector
        title="Link Ethereum"
        type="ethereum"
        open={show}
        onClose={() => setShow(false)}
        onSelect={async (walletAddress, type, provider) => {
          const signature = await signMessage(
            "ethereum",
            userId,
            provider,
            walletAddress
          );
          dispatch(
            linkAccounts({
              data: {
                link: "ethereum",
                signature,
                walletAddress,
              },
              finalFunction: () => {
                setShow(false);
                setLoading(false);
              },
            })
          );
        }}
      />
      <LinkWrapper mini={mini}>
        {Boolean(ethereumAddress) && (
          <button
            className={`btn btn-primary flex space-x-2 bg-[#c99d66] ${
              loading ? "loading" : ""
            }`}
            onClick={() => {
              setLoading(true);
              dispatch(
                unlinkAccounts({
                  data: {
                    link: "ethereum",
                  },
                  finalFunction: () => {
                    setLoading(false);
                  },
                })
              );
            }}
          >
            <Image
              src={ethereumLogo}
              height="25"
              width="25"
              objectFit="contain"
            />
            <span>UNLINK ETHEREUM</span>
          </button>
        )}
        {!Boolean(ethereumAddress) && (
          <a
            className={`btn btn-primary flex space-x-2 bg-[#c99d66] ${
              loading ? "loading" : ""
            } ${disabled ? "btn-disabled" : ""}`}
            onClick={() => setShow(true)}
          >
            <Image
              src={ethereumLogo}
              height="25"
              width="25"
              objectFit="contain"
            />
            <span>LINK ETHEREUM</span>
          </a>
        )}
        {Boolean(ethereumAddress) ? (
          <p className="text-gray-950">
            You account is linked with ethereum address:{" "}
            <span className="font-bold text-green-500	">
              {minifyAddress(ethereumAddress, 5)}
            </span>
          </p>
        ) : (
          <p className="text-gray-950">Link your account with Ethereum</p>
        )}
      </LinkWrapper>
    </>
  );
};

export default EthereumLink;
