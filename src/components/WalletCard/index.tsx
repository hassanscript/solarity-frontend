import { FC, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"; 
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Image from 'next/image';
import { Accept, Login } from "components/Icons";
import { login } from "redux/slices/authSlice";

type Props = {
    handleJoinModalToggle: () => void;
};

export const WalletCard: FC<Props> = ({
    handleJoinModalToggle,
}) => {
    const { setVisible } = useWalletModal();
    const dispatch = useDispatch();
    const { wallet, connect, connecting, publicKey, signMessage } = useWallet();
    const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
        logged: state.auth.logged,
        profileData: state.profile.data,
      }));
    useEffect(() => {
        if (!publicKey && wallet) {
        try {
            connect();
        } catch (error) {
            console.log("Error connecting to the wallet: ", (error as any).message);
        }
        }
    }, [wallet]);

    const handleWalletClick = () => {
        try {
        if (!wallet) {
            setVisible(true);
        } else {
            connect();
        }
        dispatch(login({ publicKey, signMessage }));
        } catch (error) {
        console.log("Error connecting to the wallet: ", (error as any).message);
        }
    };

    return (
        <div className="mx-7 md:max-w-[370px] sm:w-[calc(100%-72px)] xs:w-[calc(100%-72px)] bg-brandblack rounded-3xl p-[50px] mb-4">
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
                        onClick={handleWalletClick}
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