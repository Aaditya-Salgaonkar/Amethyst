import React from "react";
import { RiArrowUpDoubleLine, RiTeamLine, RiTimerLine } from "@remixicon/react";

const FeaturesSection = () => {
  return (
    <div className="relative border-b-2 border-gray-700 min-h-[600px] py-32">
      <div className="text-center mt-20">
        <span className="bg-neutral-800 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-10 tracking-wide">
          Simplify Your
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            {" "}
            Workflow
          </span>
        </h2>
      </div>

      <div className="flex justify-center items-center mt-10 lg:mt-20 gap-6">
        {/* Feature 1 - Track Projects Effectively */}
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="flex">
            <div className="flex h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
              <RiArrowUpDoubleLine />
            </div>
            <div>
              <h1 className="mt-1 mb-6 text-xl px-4">
                Track Projects Effectively
              </h1>
              <p className="text-md p-2 mb-20 text-neutral-500">
                Stay on top of your projects with intuitive tracking tools,
                progress monitoring, and seamless updates.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2 - Payment tracking */}
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="flex">
            <div className="flex h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
              <RiTeamLine />
            </div>
            <div>
              <h1 className="mt-1 mb-6 text-xl px-4">Track Payments</h1>
              <p className="text-md p-2 mb-20 text-neutral-500">
                Effortlessly track received and outstanding payments using our
                platform for simplified payments management."
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2 - Seamless Collaboration */}
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="flex">
            <div className="flex h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
              <RiTeamLine />
            </div>
            <div>
              <h1 className="mt-1 mb-6 text-xl px-4">Track Your Time</h1>
              <p className="text-md p-2 mb-20 text-neutral-500">
                With our inbuilt timers and task logging mechanisms you always
                know how you spent your time on a project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
