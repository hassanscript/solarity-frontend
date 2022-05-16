import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { CaretDown } from "components/Icons";
import placeholder from "assets/images/placeholder/avatar.png";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "redux/slices/authSlice";

const DisclosureButton = () => {
  const dispatch = useDispatch();

  const { profileData, logged } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
    logged: state.auth.logged,
  }));

  if (!logged) return <div></div>;
  return (
    <div className="flex flex-col">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-center gap-4 bg-[#151719] border-none btn normal-case">
              <img
                style={{ height: 40, outline: "3px solid white" }}
                className="rounded-full"
                src={profileData.profileImageLink || placeholder.src}
                alt="user avatar"
              />
              <div className="flex flex-col items-start">
                <span className="font-bold text-md">
                  {profileData.username}
                </span>
                <span className="text-[#8899A6]">@{profileData.username}</span>
              </div>
              <CaretDown className={`${open ? "transform rotate-180" : ""}`} />
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="mx-4 mt-4">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default DisclosureButton;
