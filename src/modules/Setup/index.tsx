import React, { FC } from "react";
import InfoView from "./InfoView";
import DAOClaimingView from "./DAOClaimView";
import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import bgImage from "../../assets/images/setup-page-bg.png";
import hoverImages from "../../assets/images/setup-page-images.png";
import ProfilePicView from "./ProfilePicView";

const Branding = () => {
  return (
    <div
      className={`flex flex-1 container ms-center justify-center pt-20 z-50 bg-cover bg-center`}
      style={{
        backgroundImage:
          "url(" + hoverImages.src + "), url(" + bgImage.src + ")",
      }}
    >
      <div className="flex-1 max-w-lg ">
        <div className="flex flex-row items-center">
          <div>
            <Image src={Logo} alt="Logo" />
          </div>
          <div className="ml-3">
            <h4 className="text-3xl font-bold">Solarity</h4>
            <p className="text-sm">It is DAO Space for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

type SetupProps = {
  stepsCompleted: {
    daoClaimed: boolean;
    infoAdded: boolean;
    profilePicUpdated: boolean;
  };
};

const Setup: FC<SetupProps> = ({
  stepsCompleted: { daoClaimed, infoAdded, profilePicUpdated },
}) => {
  const showInfoView = !infoAdded;
  const showDaoView = !daoClaimed && infoAdded;
  const showProfilePicView = !profilePicUpdated && infoAdded && daoClaimed;
  if (showProfilePicView) {
    return (
      <div className="h-screen overflow-auto">
        <ProfilePicView />
      </div>
    );
  }
  return (
    <div className="flex flex-row h-screen overflow-auto">
      <Branding />
      <div className="flex flex-1 container ms-center justify-center pt-20 z-50">
        {showInfoView && <InfoView />}
        {showDaoView && <DAOClaimingView />}
      </div>
    </div>
  );
};

export default Setup;
