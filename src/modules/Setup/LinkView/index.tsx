import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Button, Stack } from "components/FormComponents";
import LinkAccounts from "../../../modules/Profile/LinkAccounts";
import { setup } from "../../../redux/slices/profileSlice";
import { useState } from "react";
import { BackButton } from "../sharedComponents";

const LinkView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  try {
    const { shortPublicAddress, _id, ...rest } = useSelector(
      (state: RootStateOrAny) => state.profile.data
    );
    return (
      <div className="container flex flex-1 justify-center pt-12">
        <div className="max-w-lg flex-1 ">
          <h3 className="pb-4 text-3xl font-semibold">Link your account</h3>
          <LinkAccounts mini resetUrl={() => {}} disabled={loading} />
          <Stack direction="col" className="items-end pt-5">
            <Stack direction="row">
              <BackButton stepName="info" />
              <Button
                type="submit"
                loading={loading}
                variant="secondary"
                disableOnLoading
                onClick={() => {
                  setLoading(true);
                  dispatch(
                    setup({
                      data: { action: "link" },
                      successFunction: () => {},
                      errorFunction: (errorMessage: string) => {},
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

            <span className="mt-3 text-sm">You can link later as well</span>
          </Stack>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="container flex flex-1 justify-center pt-20">
        <div className="max-w-lg flex-1 ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the link page</span>
          </div>
        </div>
      </div>
    );
  }
};

export default LinkView;
