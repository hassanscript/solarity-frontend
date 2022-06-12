import { Button, Stack } from "../../../components/FormComponents";
import { getNfts } from "../../../hooks";
import { NftCard } from "modules/User/Art";
import { useState } from "react";
import { FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setup } from "../../../redux/slices/profileSlice";
import { showErrorToast } from "utils";
import { BackButton } from "../sharedComponents";

interface NftSelectionProps {
  type?: string;
  contractAddress?: string;
  tokenId?: string;
  mintAddress?: string;
}

interface NftCardsProps {
  nfts: any[];
  loading: Boolean;
  error: Boolean;
  selected: NftSelectionProps | undefined;
  onClick: (data: NftSelectionProps) => void;
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
      <div className="alert alert-warning w-full shadow-lg">
        <span>Loading NFTs...</span>
      </div>
    );
  }
  if (error) {
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
    <div className="grid grid-cols-1 gap-4 rounded-3xl border border-brandblack  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              if (!selected || !selected.type) return false;
              if (selected.type === "Ethereum") {
                return (
                  selected.tokenId == tokenId &&
                  selected.contractAddress == contractAddress
                );
              }
              return selected.mintAddress == mintAddress;
            })()}
            onClick={() => {
              onClick({
                type,
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

const ProfilePicView = () => {
  const dispatch = useDispatch();

  const { username, solanaAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );

  const [nfts, nftLoading, nftError] = getNfts(username, solanaAddress);
  const [selected, setSelected] = useState<NftSelectionProps>({});
  const [loading, setLoading] = useState<Boolean>(false);

  try {
    return (
      <div className="bg-brandblack">
        <div className="container mx-auto flex h-screen w-screen flex-col py-6">
          <div className="flex w-full justify-between pb-5">
            <h3 className="pb-4 text-3xl font-semibold">
              Select a profile Pic
            </h3>
            <Stack direction="row">
              <BackButton stepName="link" />
              <Button
                variant="info"
                wrap={false}
                disabled={!Boolean(selected) || nftLoading}
                outline={!Boolean(selected) || nftLoading}
                disableOnLoading
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  dispatch(
                    setup({
                      data: {
                        action: "profilePic",
                        skipImage: true,
                      },
                      successFunction: () => {},
                      errorFunction: (error) => {
                        showErrorToast(error);
                      },
                      finalFunction: () => {
                        setLoading(false);
                      },
                    })
                  );
                }}
              >
                SKIP
              </Button>
              <Button
                wrap={false}
                disabled={!Boolean(Object.keys(selected).length) || nftLoading}
                outline={!Boolean(selected) || nftLoading}
                disableOnLoading
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  dispatch(
                    setup({
                      data: {
                        action: "profilePic",
                        ...selected,
                        imageNetwork: selected.type,
                      },
                      successFunction: () => {},
                      errorFunction: (error) => {
                        showErrorToast(error);
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
            </Stack>
          </div>
          <div className="outline w-full flex-1 overflow-auto rounded-3xl border border-darkcharcoal p-10 scrollbar-thin scrollbar-thumb-black">
            <NftCards
              nfts={nfts}
              loading={nftLoading}
              error={nftError}
              selected={selected}
              onClick={(nft) => setSelected(nft)}
            />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="container flex flex-1 justify-center pt-20">
        <div className="max-w-lg flex-1 ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the profile image selector</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePicView;
