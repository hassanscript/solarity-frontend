import React, { FC } from "react";
import Header from "components/Layout/Header";
import Sidebar from "components/Layout/Sidebar";
import Hot from "components/Widget/Hot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
  heroContent?: React.ReactNode;
  sol?: boolean;
}

const Index: FC<Props> = ({ children, rightSidebar, heroContent }) => {
  return (
    <div className="max-h-screen overflow-x-hidden">
      <div className="fixed top-0 z-[100000] w-full bg-base-100">
        <Header sol />
        <div className="flex h-[1px] bg-darkcharcoal" />
      </div>

      <main className="mx-auto mt-24 grid max-w-7xl grid-cols-6 grid-rows-1 gap-2 px-5">
        <Sidebar />
        <div className="mt-4 grid grid-cols-5 gap-1 sm:col-span-7 lg:col-span-5">
          {heroContent && <div className="col-span-5 mt-4">{heroContent}</div>}
          <div
            className={`${rightSidebar ? "col-span-3" : "col-span-5"} mt-4`}
            id="container"
          >
            {children}
          </div>
          {rightSidebar && (
            <div className="top-10 col-span-2 mt-4 ml-10 hidden scrollbar-thin scrollbar-thumb-black scrollbar-track-white md:block">
              {rightSidebar}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
