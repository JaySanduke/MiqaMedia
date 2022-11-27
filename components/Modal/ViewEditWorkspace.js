import React from "react";
import { useEffect, useState } from "react";
import EditWorkspaceUser from "components/Dropdowns/UserDropdown/EditWorkspaceUser";
import RemoveWorkspaceUser from "components/Dropdowns/UserDropdown/RemoveWorkspaceUser";

export default function ViewEditWorkspace({ uid, owner, workspacedata, updateWorkspace, wid }) {
  const [workspacename, setWorkspaceName] = useState('');
  const [workspacedesc, setWorkspaceDesc] = useState('');
  const [workspaceuser, setWorkspaceUser] = useState([]);

  const [userrm, setUserRm] = useState([]);

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
      userrm: userrm,
    }

    console.log(workspacedetails);
    updateWorkspace(workspacedetails, wid);
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
  function handleworkspaceRmuserChange(workspaceusers) {
    setUserRm(workspaceusers);
  }

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
          <div className="w-full text-center items-center max-w-sm">
            <form className="bg-white text-center items-center rounded px-8 py-3">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="workspacetitle"
                >
                  Workspace Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Workspace Title"
                  onChange={handleworkspacenameChange}
                  value={workspacename}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="workspacedescription"
                >
                  Workspace Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Workspace Description"
                  onChange={handleworkspacedescChange}
                  value={workspacedesc}
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workspace Add Users
                </label>
                {uid && workspacedata && <EditWorkspaceUser uid={uid} owner={owner} uvalue={workspaceuser} userChange={handleworkspaceuserChange} />}
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workspace Remove Users
                </label>
                {uid && workspacedata && <RemoveWorkspaceUser uid={uid} owner={owner} uvalue={workspaceuser} userChange={handleworkspaceRmuserChange} />}
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
