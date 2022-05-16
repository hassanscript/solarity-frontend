import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "Next/Link";
import placeholder from "assets/images/placeholder/avatar.png";
import { apiCaller } from "utils/fetcher";
import { Dialog, Transition } from "@headlessui/react";

const Follower: FC<{ username: string; profileImageLink: string }> = ({
  username,
  profileImageLink,
}) => {
  return (
    <a
      target={"__blank"}
      className="mb-2 p-2 flex items-center hover:bg-secondary rounded-xl border border-gray-700"
      href={`/${username}`}
    >
      <div className="avatar">
        <div className="rounded-full h-7 w-7 border border-white border-2">
          <img src={profileImageLink || placeholder.src} />
        </div>
      </div>
      <div className="ml-3">
        <span className="text-sm">{username}</span>
      </div>
    </a>
  );
};

export const FollowerList: FC<{
  username: string;
  onClose: () => void;
  open: boolean;
}> = ({ onClose, username, open }) => {
  const [followers, setFollowers] = useState([]);

  const getFollowers = async () => {
    try {
      const {
        data: { followers },
      } = await apiCaller.get(`/users/${username}/followers`);
      setFollowers(followers);
    } catch {
      console.log("errored");
    }
  };

  useEffect(() => {
    if (open) {
      getFollowers();
    }
  }, [open]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10000000 overflow-y-auto backdrop-brightness-0 backdrop-opacity-70"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xs p-6 px-10 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-brandblack rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-center mb-6"
              >
                Followers
              </Dialog.Title>
              {followers.map((follower) => (
                <Follower {...follower} />
              ))}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
