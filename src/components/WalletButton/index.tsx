import React, { useEffect, useState } from "react";
import Link from "next/link";
import placeholder from "../../assets/images/placeholder/avatar.png";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { login } from "redux/slices/authSlice";
import { startLoadingApp, stopLoadingApp } from "redux/slices/commonSlice";
import WalletSelector from "components/WalletSelector";

const WalletButton = () => {
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
        <button
          className="btn btn-secondary gap-3 rounded-3xl font-normal normal-case"
          onClick={() => setShow(true)}
        >
          <div>Login With Wallet</div>
        </button>
      </>
    );
  }

  return (
    <Link href={`/${profileData.username}`} passHref>
      <a className="btn btn-secondary gap-3 rounded-3xl pr-1 font-normal normal-case ">
        <span>{profileData.shortPublicAddress}</span>
        <div className="h-2/3  w-[1px] bg-[#5153F0]" />
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

export default WalletButton;
