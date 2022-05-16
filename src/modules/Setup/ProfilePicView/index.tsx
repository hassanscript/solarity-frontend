import { Button } from "components/FormComponents";
import { getNfts } from "hooks";
import { NftCard } from "modules/User/Art";
import { useState } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setProfilePic } from "redux/slices/profileSlice";

interface NftCardsProps {
  nfts: any[];
  loading: Boolean;
  error: Boolean;
  selected: string | undefined;
  onClick: (mintAddress: string) => void;
}

const NftCards: FC<NftCardsProps> = ({
  nfts,
  loading,
  error,
  onClick,
  selected,
}) => {
  if (loading) {
    return (
      <div className="alert alert-warning shadow-lg w-full">
        <span>Loading NFTs...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-error shadow-lg w-full">
        <span>Error While Loading NFTs</span>
      </div>
    );
  }
  if (nfts.length == 0) {
    return (
      <div className="alert alert-info shadow-lg w-full">
        <span>
          You don't own any NFTs so you will not be able to set your profile pic
        </span>
      </div>
    );
  }
  return (
    <div className="gap-4 border border-brandblack rounded-3xl grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {nfts.map(
        (
          { type, mintAddress: mint, name, uri, image, collectionName },
          index
        ) => (
          <NftCard
            collectionName={collectionName}
            image={image}
            type={type}
            name={name}
            key={index}
            selected={mint == selected}
            onClick={() => onClick(mint)}
          />
        )
      )}
    </div>
  );
};

const ProfilePicView = () => {
  const dispatch = useDispatch();
  const [nfts, nftLoading, nftError] = getNfts();
  const [selected, setSelected] = useState<string>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | Boolean>(false);
  try {
    return (
      <div className="bg-brandblack">
        <div className="flex flex-col h-screen w-screen container py-6 mx-auto">
          <div className="flex w-full pb-5">
            <h3 className="text-3xl font-semibold pb-4 w-full">
              Select a profile Pic
            </h3>
            <Button
              wrap={false}
              disabled={!Boolean(selected) || nftLoading}
              outline={!Boolean(selected) || nftLoading}
              disableOnLoading
              loading={loading}
              onClick={() => {
                setLoading(true);
                dispatch(
                  setProfilePic({
                    data: { mint: selected },
                    successFunction: () => {},
                    errorFunction: (error) => {
                      alert(error);
                      setError(error);
                    },
                    finalFunction: () => {
                      setLoading(false);
                    },
                  })
                );
              }}
            >
              Next
            </Button>
          </div>
          <div className="flex-1 w-full overflow-auto outline scrollbar-thin scrollbar-thumb-black border border-darkcharcoal rounded-3xl p-10">
            <NftCards
              nfts={nfts}
              loading={nftLoading}
              error={nftError}
              selected={selected}
              onClick={(mintAddress) => !loading && setSelected(mintAddress)}
            />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex flex-1 container justify-center pt-20">
        <div className="flex-1 max-w-lg ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the profile image selector</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePicView;
