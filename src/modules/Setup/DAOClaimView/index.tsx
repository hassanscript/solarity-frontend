import { FC } from "react";
import SearchInput from "components/SearchInput";
import { Button } from "components/FormComponents";
import { useDispatch } from "react-redux";
import { claimDaos } from "redux/slices/profileSlice";
import { useState } from "react";

const claimDao = () => {};

type DAOCardProps = {
  name: string;
  imageLink: string;
};

const DAOCard: FC<DAOCardProps> = ({ name, imageLink }) => {
  return (
    <div className="btn rounded-xl h-16 w-full">
      <div className="flex items-center w-full">
        <img src={imageLink} height="40" width="40" className="rounded-full" />
        <div className="w-full pl-5">
          <p className="font-semibold text-sm text-left text-secondary capitalize">
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
    <div className="alert alert-warning shadow-lg w-full">
      <span>You are not part of any DAOs</span>
    </div>
  );
};

const LoadingMessage = () => {
  return (
    <div className="alert alert-warning shadow-lg w-full">
      <span>Loading DAOs...</span>
    </div>
  );
};

const ErrorMessage = () => {
  return (
    <div className="alert alert-error shadow-lg w-full">
      <span>An error occurred while claiming the DAOs</span>
    </div>
  );
};

const DAOClaimView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  try {
    return (
      <div className="flex flex-1 container justify-center pt-12">
        <div className="flex-1 max-w-lg ">
          <h3 className="text-3xl font-semibold pb-4">
            DAOs you are already in:
          </h3>
          <NoDaoMessage />
          <FindDAO />
          <div className="flex justify-end py-5">
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
          </div>
          {error && <ErrorMessage />}
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex flex-1 container justify-center pt-20">
        <div className="flex-1 max-w-lg ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the setup page</span>
          </div>
        </div>
      </div>
    );
  }
  // <div className="flex flex-col pb-4 items-start space-y-5 ">
  //   {!loaded && <LoadingMessage />}
  //   {daos.length == 0 && loaded &&}
  //   {daos.map(({ image, name }) => (
  //     <DAOCard name={name} imageLink={image} />
  //   ))}
  // </div>
};

export default DAOClaimView;
