import React from "react";
import { FC } from "react";
import UpdateInfoView from "./UpdateInfoView";
import UpdateProfilePicView from "./UpdateProfilePicView";
import SelectDisplayNftView from "./SelectDisplayNftView";
import LinkAccounts from "./LinkAccounts";
import { useQueryRouter } from "hooks";

const VIEWS = [
  {
    id: "info",
    label: "Update Info",
  },
  {
    id: "profile_pic",
    label: "Update Profile Pic",
  },
  {
    id: "nft_selection",
    label: "Select NFTs to Display in Room",
  },
  {
    id: "link_accounts",
    label: "Link Accounts",
  },
];

const Menu: FC<{ active: number; onClick: (index: number) => void }> = ({
  active,
  onClick,
}) => {
  return (
    <ul className="menu menu-compact menu-vertical lg:menu-horizontal bg-darkcharcoal rounded-box mb-5">
      {VIEWS.map((val, index) => (
        <li key={index}>
          <a
            onClick={() => onClick(index)}
            className={active === index ? "bg-secondary" : ""}
          >
            {val.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const ProfileView = () => {
  const { setView, view } = useQueryRouter(VIEWS);

  return (
    <>
      <Menu
        active={view}
        onClick={(index) => {
          setView(index);
        }}
      />
      <div className="flex flex-col gap-4 p-10 mb-10 border border-brandblack rounded-3xl">
        {view == 0 && <UpdateInfoView />}
        {view == 1 && <UpdateProfilePicView />}
        {view == 2 && <SelectDisplayNftView />}
        {view == 3 && <LinkAccounts resetUrl={() => setView(3)} />}
      </div>
    </>
  );
};
