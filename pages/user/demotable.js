import { React } from "react";

// layout for page
import WorkspaceSidebar from "components/Sidebar/WorkspaceSidebar";
import User from "layouts/User";
export default function DemoTable() {
  return (
    <>
      <WorkspaceSidebar>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">

          </div>
        </div>
      </WorkspaceSidebar>
    </>
  );
}

DemoTable.layout = User;
