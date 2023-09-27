import { PropsWithChildren } from "react";

import menu from "../assets/menu.svg";
import checklist from "../assets/checklist.svg";
import home from "../assets/home.svg";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex w-full h-screens ">
      <div
        style={{
          boxShadow: "0px 4px 23px 0px rgba(0, 0, 0, 0.05)",
        }}
        className="w-[80px] h-screen py-[50px] flex flex-col gap-11 items-center bg-white sticky top-0 left-0"
      >
        <img src={menu} className="mb-10" />
        <img src={home} className="" />
        <img src={checklist} className="" />

        <div className="rounded-full bg-[#1D4ED8] h-12 w-12 font-bold text-white flex justify-center items-center mt-auto">
          AT
        </div>
      </div>

      <div className="flex-1 w-full h-screen overflow-y-auto">
        <div
          style={{
            boxShadow: "0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
          }}
          className="my-[120px] bg-white flex justify-between"
        >
          <div className="flex items-center justify-center w-full py-14">
            <p>Program Details</p>
          </div>
          <div className="flex relative bg-[#00635B] text-white items-center justify-center w-full py-14">
            <p>Application Form</p>

            <div className="triangle"></div>
          </div>

          <div className="flex w-full">
            <div className="flex items-center justify-center w-full py-14">
              <p className="mx-auto">Workflow</p>
            </div>
            <div className=" ml-auto my-auto  h-[78px] bg-[#C4C4C4] w-[1px]"></div>
          </div>

          <div className="flex items-center justify-center w-full py-14">
            <p>Program Details</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
