import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import connectWallet from "./connectWallet";
import metamask from "assets/images/wallets/metamask.png";
import phantom from "assets/images/wallets/phantom.png";

const WALLETS = [
  {
    label: "Phantom",
    id: "phantom",
    type: "solana",
    image: phantom.src,
  },
  {
    label: "Metamask",
    id: "metamask",
    type: "ethereum",
    image: metamask.src,
  },
];

const EthWalletConnectionPopup: FC<{
  open: boolean;
  onClose: () => void;
  onProviderFetch: (web3: any, walletAddress: string) => void;
}> = ({ open, onClose, onProviderFetch }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        onClose={onClose}
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/[.7]" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 px-10 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-brandblack rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-center mb-3"
              >
                Ethereum Wallets
              </Dialog.Title>
              <p className="text-center text-sm mb-10">
                Please connect to a ethereum wallet from the list below
              </p>
              {WALLETS.map(({ label, id, image }) => {
                return (
                  <a
                    onClick={() => {
                      connectWallet(id, onProviderFetch);
                    }}
                    key={id}
                    className="flex mb-3 p-3 px-5 flex items-center hover:bg-secondary rounded-xl bg-gray-700 cursor-pointer"
                  >
                    <p className="flex-1 text-lg capitalize">{label}</p>
                    <div>
                      <img src={image} alt="" className="w-6" />
                    </div>
                  </a>
                );
              })}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EthWalletConnectionPopup;
