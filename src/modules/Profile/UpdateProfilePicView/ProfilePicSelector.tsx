import { Button, Stack } from "components/FormComponents";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getNfts } from "../../../hooks";
import { Transition } from "@headlessui/react";
import { NftCard } from "modules/User/Art";
import { startLoadingApp, stopLoadingApp } from "redux/slices/commonSlice";
import { setProfilePic } from "redux/slices/profileSlice";
import { showErrorToast, showSuccessToast } from "utils";

const NFTCardsHolder: FC<{
  selected: any;
  show: boolean;
  onSelect: (val: any) => void;
}> = ({ show, onSelect, selected }) => {
  const { username, solanaAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const [nfts, nftLoading, nftError, fetchNFTs] = getNfts(
    username,
    solanaAddress,
    true
  );
  useEffect(() => {
    if (show) {
      fetchNFTs();
    }
  }, [show]);

  if (!show) return <></>;

  if (nftLoading) {
    return (
      <div className="alert alert-warning w-full shadow-lg">
        <span>Loading NFTs...</span>
      </div>
    );
  }
  if (nftError) {
    return (
      <div className="alert alert-error w-full shadow-lg">
        <span>Error While Loading NFTs</span>
      </div>
    );
  }
  if (nfts.length == 0) {
    return (
      <div className="alert alert-info w-full shadow-lg">
        <span>
          You don't own any NFTs so you will not be able to set your profile pic
        </span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 overflow-auto rounded-3xl border border-brandblack sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {nfts.map(
        (
          {
            type,
            mintAddress,
            contractAddress,
            tokenId,
            name,
            image,
            collectionName,
          },
          index
        ) => (
          <NftCard
            collectionName={collectionName}
            image={image}
            type={type}
            name={name}
            key={index}
            selected={(() => {
              if (!selected || !selected.imageNetwork) return false;
              if (selected.imageNetwork === "Ethereum") {
                return (
                  selected.tokenId == tokenId &&
                  selected.contractAddress == contractAddress
                );
              }
              return selected.mintAddress == mintAddress;
            })()}
            onClick={() => {
              onSelect({
                imageNetwork: type,
                mintAddress,
                contractAddress,
                tokenId,
              });
            }}
          />
        )
      )}
    </div>
  );
};

const ProfilePicSeletor: FC<{ show: boolean; onHide: () => void }> = ({
  show,
  onHide,
}) => {
  const dispatch = useDispatch();
  const [madeVisible, setMadeVisible] = useState(false);
  const [selectedPic, setSelectedPic] = useState({});
  useEffect(() => {
    if (show) {
      setMadeVisible(show);
    }
  }, [show]);

  const updateProfilePic = async () => {
    dispatch(startLoadingApp());
    dispatch(
      setProfilePic({
        data: selectedPic,
        successFunction: () => {
          showSuccessToast("You profile pic has been updated");
          onHide();
        },
        errorFunction: () => {
          showErrorToast("Unable to update the profile pic");
        },
        finalFunction: () => {
          dispatch(stopLoadingApp());
        },
      })
    );
  };

  return (
    <Transition
      show={show}
      unmount={false}
      as={"div"}
      className={
        "fixed top-0 left-0 z-[1000000] h-[100vh] w-[100vw] bg-brandblack"
      }
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
    >
      <div className="container mx-auto flex h-screen w-[100vw] flex-col py-6">
        <div className="flex w-full justify-between pb-5">
          <h3 className="pb-4 text-3xl font-semibold">Set Profile Pic</h3>
          <Stack direction="row">
            <Button
              variant="info"
              wrap={false}
              disableOnLoading
              // loading={loading}
              onClick={() => {
                onHide();
                setSelectedPic({});
              }}
            >
              CANCEL
            </Button>
            <Button
              wrap={false}
              disableOnLoading
              disabled={Object.keys(selectedPic).length === 0}
              // loading={loading}
              onClick={updateProfilePic}
            >
              SET PROFILE PIC
            </Button>
          </Stack>
        </div>
        <NFTCardsHolder
          selected={selectedPic}
          show={madeVisible}
          onSelect={(val) => setSelectedPic(val)}
        />
      </div>
    </Transition>
  );
};

export default ProfilePicSeletor;
