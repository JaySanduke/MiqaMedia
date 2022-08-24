import React from "react";
import { useEffect, useState } from "react";
import WorkspaceUserDropdown from "components/Dropdowns/WorkspaceUserDropdown";
import WorkspaceDatePicker from "components/DatePicker/WorkspaceDatePicker";

export default function ViewEditWorkspace({
  workspacedata,
  updateWorkspace,
  wid
}) {
  const [workspacename, setWorkspaceName] = useState('');
  const [workspacedesc, setWorkspaceDesc] = useState('');
  const [workspaceuser, setWorkspaceUser] = useState('');

  useEffect(() => {
    setWorkspaceName(workspacedata.workspacename);
    setWorkspaceDesc(workspacedata.desc);
    setWorkspaceUser(workspacedata.users); 
  }, [workspacedata]);

  function setWorkspacedetails() {
    const workspacedetails = {
      name: workspacename,
      desc: workspacedesc,
      users: workspaceuser,
    }

    updateWorkspace(workspacedetails, wid);

    console.log(workspacedetails);
  }

  const handleworkspacenameChange = (e) => {
    setWorkspaceName(e.target.value);
  };
  const handleworkspacedescChange = (e) => {
    setWorkspaceDesc(e.target.value);
  };
  function handleworkspaceuserChange(workspaceusers) {
    setWorkspaceUser(workspaceusers);
  };

  return (
    <>
      <div
        className={
          "relative bg-white items-center flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        }
      >
        <div className="rounded-t bg-white mb-0 border-0">
          <div className="flex z-50 items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              View & Edit Workspace
            </h3>
          </div>
          {/*body*/}
          <div class="w-full text-center items-center max-w-sm">
            <form class="bg-white text-center items-center rounded px-8 py-3">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="workspacetitle"
                >
                  Workspace Title
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Workspace Title"
                  onChange={handleworkspacenameChange}
                  value={workspacename}
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="workspacedescription"
                >
                  Workspace Description
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Workspace Description"
                  onChange={handleworkspacedescChange}
                  value={workspacedesc}
                />
              </div>
              <div class="mb-2">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workspace Users
                </label>
                <WorkspaceUserDropdown uvalue={workspaceuser} userChange={handleworkspaceuserChange} />
              </div>
            </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-center p-4 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setWorkspacedetails()
              }}
            >
              Save Workspace
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
