import { React, useState, useEffect } from "react";
import router, {useRouter} from "next/router";

// components

import ViewEditWorkspace from "components/Modal/ViewEditWorkspace";

// layout for page

import User from "layouts/User";
export default function ViewWorkspace() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
            <ViewEditWorkspace />
        </div>
      </div>
    </>
  );
}

ViewWorkspace.layout = User;