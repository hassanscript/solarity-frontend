import { FC, useEffect } from "react";
import SearchInput from "components/SearchInput";
import { Button, Stack } from "components/FormComponents";
import { useDispatch } from "react-redux";
import { claimDaos } from "redux/slices/profileSlice";
import { useState } from "react";
import { BackButton } from "../sharedComponents";
import { apiCaller } from "utils/fetcher";
import AppLoader from "components/AppLoader";

const claimDao = () => {};

type DAOCardProps = {
  name: string;
  imageLink: string;
};

const DAOCard: FC<DAOCardProps> = ({ name, imageLink }) => {
  return (
    <div className="btn h-16 w-full rounded-xl">
      <div className="flex w-full items-center">
        <img src={imageLink} height="40" width="40" className="rounded-full" />
        <div className="w-full pl-5">
          <p className="text-left text-sm font-semibold capitalize text-secondary">
            {name}
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-sm h-10 rounded-3xl px-6 capitalize"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

const FindDAO = () => {
  return (
    <div className="pt-4">
      <p className="text-sm">Can't find your DAO? Search here</p>
      <div className="pt-4">
        <SearchInput />
      </div>
    </div>
  );
};

const NoDaoMessage = () => {
  return (
    <div className="alert alert-warning w-full shadow-lg">
      <span>You are not part of any DAOs</span>
    </div>
  );
};

const LoadingMessage = () => {
  return (
    <div className="alert alert-warning w-full shadow-lg">
      <span>Loading DAOs...</span>
    </div>
  );
};

const ErrorMessage = () => {
  return (
    <div className="alert alert-error w-full shadow-lg">
      <span>An error occurred while claiming the DAOs</span>
    </div>
  );
};

const DAOClaimView = () => {
  // show this only if the user added a solana address

  const dispatch = useDispatch();
  const [daos, setDaos] = useState([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const getDaos = async () => {
    setError(false);
    setLoading(true);
    try {
      const {
        data: { data },
      } = await apiCaller.get("/daos?member=true");
      setDaos(data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDaos();
  }, []);

  try {
    return (
      <div className="container flex flex-1 justify-center pt-12">
        <div className="max-w-lg flex-1 ">
          <h3 className="pb-4 text-3xl font-semibold">
            DAOs you are already in:
          </h3>
          {loading && <LoadingMessage />}
          {!loading && !error && daos.length == 0 && <NoDaoMessage />}
          {!loading && error && <ErrorMessage />}
          {!loading && !error && daos.length > 0 && (
            <div className="flex flex-col items-start space-y-5 pb-4 ">
              {daos.map(({ name, profileImageLink }) => (
                <DAOCard
                  key={`DaosClaim-${name}`}
                  name={name}
                  imageLink={profileImageLink}
                />
              ))}
            </div>
          )}
          <FindDAO />
          <div className="flex justify-end py-5">
            <Stack direction="row">
              <BackButton stepName="profilePic" />
              <Button
                disableOnLoading
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  dispatch(
                    claimDaos({
                      data: {},
                      successFunction: () => {
                        setError(false);
                      },
                      errorFunction: () => {
                        setError(true);
                      },
                      finalFunction: () => {
                        setLoading(false);
                      },
                    })
                  );
                }}
              >
                Continue
              </Button>
            </Stack>
          </div>
          {error && <ErrorMessage />}
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="container flex flex-1 justify-center pt-20">
        <div className="max-w-lg flex-1 ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the setup page</span>
          </div>
        </div>
      </div>
    );
  }
};

export default DAOClaimView;
