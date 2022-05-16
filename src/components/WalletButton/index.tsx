import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import placeholder from "assets/images/placeholder/avatar.png";

import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { login } from "redux/slices/authSlice";
import WalletSelector from "components/WalletSelector";

const ButtonWallet = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profileData: state.profile.data,
  }));

  if (!logged) {
    return (
      <>
        <WalletSelector
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
        <button
          className="gap-3 font-normal normal-case btn rounded-3xl btn-secondary"
          onClick={() => setShow(true)}
        >
          <div>Login With Wallet</div>
        </button>
      </>
    );
  }

  return (
    <Link href={`/${profileData.username}`} passHref>
      <a className="gap-3 pr-1 font-normal normal-case btn rounded-3xl btn-secondary ">
        <span>{profileData.shortPublicAddress}</span>
        <div className="w-[1px]  h-2/3 bg-[#5153F0]" />
        <img
          height="34"
          width="34"
          className="rounded-full"
          style={{ outline: "2px solid white" }}
          src={profileData.profileImageLink || placeholder.src}
          alt="user avatar"
        />
      </a>
    </Link>
  );
};

export default ButtonWallet;
