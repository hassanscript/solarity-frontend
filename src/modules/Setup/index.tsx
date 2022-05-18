import React, { FC } from "react";
import InfoView from "./InfoView";
import LinkView from "./LinkView";
import DAOClaimingView from "./DAOClaimView";
import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import bgImage from "../../assets/images/setup-page-bg.png";
import hoverImages from "../../assets/images/setup-page-images.png";
import ProfilePicView from "./ProfilePicView";
import DAOClaimView from "./DAOClaimView";

const Branding = () => {
  return (
    <div
      className={`ms-center container z-50 flex flex-1 justify-center bg-cover bg-center pt-20`}
      style={{
        backgroundImage:
          "url(" + hoverImages.src + "), url(" + bgImage.src + ")",
      }}
    >
      <div className="max-w-lg flex-1 ">
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
    accountsLinked: boolean;
  };
};

const BrandBox: FC<{}> = ({ children }) => {
  return (
    <div className="flex h-screen flex-row overflow-auto">
      <Branding />
      <div className="ms-center container z-50 flex flex-1 justify-center pt-20">
        {children}
      </div>
    </div>
  );
};

const Setup: FC<SetupProps> = ({
  stepsCompleted: { daoClaimed, infoAdded, profilePicUpdated, accountsLinked },
}) => {
  if (!infoAdded) {
    return (
      <BrandBox>
        <InfoView />
      </BrandBox>
    );
  }

  if (!accountsLinked) {
    return (
      <BrandBox>
        <LinkView />
      </BrandBox>
    );
  }

  if (!profilePicUpdated) {
    return (
      <div className="h-screen overflow-auto">
        <ProfilePicView />
      </div>
    );
  }

  if (!daoClaimed) {
    return (
      <BrandBox>
        <DAOClaimView />
      </BrandBox>
    );
  }

  return <></>;
};

export default Setup;
