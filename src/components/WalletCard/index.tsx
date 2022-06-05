import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"; 
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Image from 'next/image';
import { Accept, Login } from "components/Icons";
import WalletSelector from "components/WalletSelector";
import { login } from "redux/slices/authSlice";

type Props = {
    handleJoinModalToggle: () => void;
};

export const WalletCard: FC<Props> = ({
    handleJoinModalToggle,
}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const { setVisible } = useWalletModal();
    const { wallet, connect, connecting, publicKey, signMessage } = useWallet();
    const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
        logged: state.auth.logged,
        profileData: state.profile.data,
      }));

    return (
        <div className="mx-7 md:max-w-[370px] sm:w-[calc(100%-72px)] xs:w-[calc(100%-72px)] bg-brandblack rounded-3xl p-[50px] mb-4">
            <WalletSelector
                darkBackground
                type="all"
                title="Login with Wallet"
                subtitle="Select a wallet from the list below"
                open={show}
                onClose={() => setShow(false)}
                onSelect={(address, type, provider) => {
                    dispatch(
                        login({
                            publicKey: address,
                            walletType: type,
                            provider,
                        })
                    );
                }}
            />
            <h2 className="text-center tracking-widest mb-10 p-2">Playing after you login.</h2>
            <div className="flex justify-center">
                <Image src="/images/wallets.png" width={318} height={218}/>
            </div>
            <p className="text-sm font-thin p-2 text-center mb-2">Connect your account to fully enjoy in a room!</p>
            <div className="w-full flex justify-center">
                {logged ? (
                    <button
                        className="gap-2 text-md normal-case rounded-full btn btn-secondary px-6 w-full"
                        onClick={handleJoinModalToggle}
                    >
                        <Login />
                        {<div>Join a Room</div>}
                    </button>
                ): (
                    <button
                        className="gap-2 text-md normal-case rounded-full btn btn-secondary px-6 w-full"
                        onClick={() => setShow(true)}
                        disabled={connecting}
                    >
                        <Login />
                        {publicKey ? <div>Login With Wallet</div> : <div>Connect Wallet</div>}
                    </button>
                )}
            </div>
        </div>
    );
}