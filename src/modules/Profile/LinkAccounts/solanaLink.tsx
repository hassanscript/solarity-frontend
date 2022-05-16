import Image from "next/image";
import solanaLogo from "assets/images/brand-logos/solana.png";
import { FC, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";
import { minifyAddress } from "utils";
import WalletSelector from "components/WalletSelector";
import { signMessage } from "utils/walletHelpers";

const SolanaLink: FC = () => {
  const { solanaAddress, _id: userId } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <WalletSelector
        title="Link Solana"
        type="solana"
        open={show}
        onClose={() => setShow(false)}
        onSelect={async (walletAddress, type, provider) => {
          const signature = await signMessage(
            "solana",
            userId,
            provider,
            walletAddress
          );
          dispatch(
            linkAccounts({
              data: {
                link: "solana",
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
      <div className="border border-brandblack rounded-3xl p-5 flex items-center space-x-4">
        {Boolean(solanaAddress) && (
          <button
            className={`btn btn-primary bg-[#14F195] flex space-x-2 ${
              loading ? "loading" : ""
            }`}
            onClick={() => {
              setLoading(true);
              dispatch(
                unlinkAccounts({
                  data: {
                    link: "solana",
                  },
                  finalFunction: () => {
                    setLoading(false);
                  },
                })
              );
            }}
          >
            <Image
              src={solanaLogo}
              height="25"
              width="25"
              objectFit="contain"
            />
            <span>UNLINK SOLANA</span>
          </button>
        )}
        {!Boolean(solanaAddress) && (
          <a
            className={`btn btn-primary bg-[#14F195] flex space-x-2 ${
              loading ? "loading" : ""
            }`}
            onClick={() => setShow(true)}
          >
            <Image
              src={solanaLogo}
              height="25"
              width="25"
              objectFit="contain"
            />
            <span>LINK SOLANA</span>
          </a>
        )}
        {Boolean(solanaAddress) ? (
          <p className="text-gray-950">
            You account is linked with solana address:{" "}
            <span className="font-bold text-green-500	">
              {minifyAddress(solanaAddress, 5)}
            </span>
          </p>
        ) : (
          <p className="text-gray-950">
            You account is not linked with any solana address
          </p>
        )}
      </div>
    </>
  );
};

export default SolanaLink;
