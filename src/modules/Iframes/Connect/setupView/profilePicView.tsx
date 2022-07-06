import { Button, Stack } from "components/FormComponents";
import { getNfts } from "hooks";
import { NftCards } from "modules/Setup/ProfilePicView";
import { BackButton } from "modules/Setup/sharedComponents";
import { FC, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setup } from "redux/slices/profileSlice";
import { showErrorToast } from "utils";
import ViewHolder from "../viewHolder";

export const ProfilePicView: FC<{}> = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>({});
  const { username, solanaAddress } = useSelector((state: RootStateOrAny) => {
    try {
      return state.profile.data;
    } catch {
      return false;
    }
  });

  const [nfts, nftLoading, nftError] = getNfts(username, solanaAddress);
  const [loading, setLoading] = useState(false);

  return (
    <ViewHolder>
      <div className="space-y-5 w-[100%]">
        <h3>Please select a profile image</h3>
        <div className="max-h-[400px] overflow-auto">
          <NftCards
            mini
            nfts={nfts}
            loading={nftLoading}
            error={nftError}
            selected={selected}
            onClick={(nft) => setSelected(nft)}
          />
        </div>
        <Stack direction="row" className="justify-end">
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
    </ViewHolder>
  );
};
