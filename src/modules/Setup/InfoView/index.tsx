import { WalletAddressIndicator } from "../sharedComponents";
import { useSelector, RootStateOrAny } from "react-redux";
import { Form } from "./form";

const InfoView = () => {
  try {
    const { shortPublicAddress, _id, ...rest } = useSelector(
      (state: RootStateOrAny) => state.profile.data
    );
    return (
      <div className="container flex flex-1 justify-center pt-12">
        <div className="max-w-lg flex-1 ">
          <h3 className="pb-4 text-3xl font-semibold">Registration Info</h3>
          <WalletAddressIndicator />
          <Form />
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="container flex flex-1 justify-center pt-20">
        <div className="max-w-lg flex-1 ">
          <div className="alert alert-info shadow-lg">
            <span>Error loading the info page</span>
          </div>
        </div>
      </div>
    );
  }
};

export default InfoView;
