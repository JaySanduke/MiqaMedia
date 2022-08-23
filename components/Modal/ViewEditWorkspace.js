import React from "react";
import { useEffect, useState } from "react";
import WorkspaceUserDropdown from "components/Dropdowns/WorkspaceUserDropdown";
import WorkspaceDatePicker from "components/DatePicker/WorkspaceDatePicker";

export default function ViewEditWorkspace({ wid, workspacedata, updateWorkspace }) {

  // const [workspacetitle, setWorkspaceTitle] = useState('');
  // const [workspacedesc, setWorkspaceDesc] = useState('');
  // const [status, setStatus] = useState('');
  // const [workspaceuser, setWorkspaceUser] = useState('');
  // const [workspaceAssignDate, setWorkspaceAssignDate] = useState([]);
  // const [completionDate, setCompletionDate] = useState('');

  // useEffect(() => {
  //   setWorkspaceTitle(workspacedata.workspacetitle);
  //   setWorkspaceDesc(workspacedata.workspacedesc);
  //   setStatus(workspacedata.status);
  //   setWorkspaceUser(workspacedata.workspaceusers);
  //   setWorkspaceAssignDate(workspacedata.created_at);
  //   setCompletionDate(workspacedata.completion_date);
  // }, [workspacedata]);

  // function setWorkspacedetails() {
  //   const workspacedetails = {
  //     workspacetitle: workspacetitle,
  //     workspacedesc: workspacedesc,
  //     status: status,
  //     workspaceuser: workspaceuser,
  //     workspaceAssignDate: workspaceAssignDate,
  //     completionDate: completionDate
  //   }

  //   updateWorkspace(workspacedetails, wid);

  //   console.log(workspacedetails);
  // }

  // const handleworkspacetitleChange = (e) => {
  //   setWorkspaceTitle(e.target.value);
  // };
  // const handleworkspacedescChange = (e) => {
  //   setWorkspaceDesc(e.target.value);
  // };
  // function handlestatusChange(status) {
  //   setStatus(status);
  // };
  // function handleworkspaceuserChange(workspaceusers) {
  //   setWorkspaceUser(workspaceusers);
  // };
  // function handleworkspaceAssignDateChange(createddate) {
  //   setWorkspaceAssignDate(createddate);
  // };
  // function handlecompletionDateChange(completiondate) {
  //   setCompletionDate(completiondate);
  // };

  return (
    <>
      <div
        className={
          "relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        }
      >
        <div className="rounded-t bg-white mb-0 px-4 py-3 border-0">
          <div className="flex z-50 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold px-8">View & Edit Workspace</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div class="w-full px-4 max-w-xs">
            <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
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
                  // onChange={handleworkspacetitleChange}
                  // value={workspacetitle}
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
                  // onChange={handleworkspacedescChange}
                  // value={workspacedesc}
                />
              </div>
              <div className="flex">
                <div class="mb-6 mr-4 flex-1">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-4"
                    for="workspaceAssign-date"
                  >
                    Workspace Assign Date
                  </label>
                  <WorkspaceDatePicker/>
                  {/* {workspaceAssignDate &&
                    <WorkspaceDatePicker wvalue={workspaceAssignDate} workspaceAssigndate={handleworkspaceAssignDateChange} />
                  } */}
                </div>
                <div class="mb-6 flex-1">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-4"
                    for="status"
                  >
                    Workspace Users
                  </label>
                  <WorkspaceUserDropdown/>
                  {/* {workspaceuser &&
                    <UserDropdown value={workspaceuser} workspaceuser={handleworkspaceuserChange} />
                  } */}
                </div>
              </div>
            </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            
            <button
              className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                // setWorkspacedetails()
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
