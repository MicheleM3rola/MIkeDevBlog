import React from "react";

import { withUser } from "@clerk/clerk-react";

const User = (props) => {
  const imgProfile = props?.user?.data?.profile_image_url;
  return (
    <div className="flex flex-row items-center flex-1 mb-5">
      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
        <img src={imgProfile} alt="" />
      </div>
      <div className="flex flex-col leading-snug">
        <h3 className="inline-block font-semibold text-brand-grey-800 dark:text-brand-grey-100">
          {props?.user?.fullName}
        </h3>
      </div>
    </div>
  );
};

export const UserHOC = withUser(User);
