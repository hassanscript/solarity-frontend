import WalletSelector from "components/WalletSelector";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "redux/slices/authSlice";
import logo from "../../../assets/images/logo.png";
import ViewHolder from "./viewHolder";

const LoginView = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
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
      <ViewHolder>
        <div>
          <Image src={logo} className="w-10 h-10" />
        </div>
        <h1>WELCOME TO SOLARITY</h1>
        <button
          onClick={() => setShow(true)}
          className="btn btn-secondary btn-sm w-[100px]"
        >
          LOGIN
        </button>
      </ViewHolder>
    </>
  );
};

export default LoginView;
