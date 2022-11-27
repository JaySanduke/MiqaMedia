import React from "react";
import WorkspaceUser from "components/Dropdowns/UserDropdown/WorkspaceUserSelect";
import MutlipleEmails from "components/mutliple-emails";

export default function AddWorkspace({ uid, addWorkspace }) {
  const [showModal, setShowModal] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  // const [assignDate, setAssignDate] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [inviteusers, setInviteUsers] = React.useState([]);
  const [usersd, setUsersd] = React.useState([]);

  function setWorkspacedetails() {
    const workspacedetails = {
      title: title,
      desc: desc,
      assignDate: new Date().toString(),
      users: users,
    };

    addWorkspace(workspacedetails, usersd, inviteusers);
    console.log(workspacedetails);
  }

  const handleWorkspacetitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleWorkspacedescChange = (e) => {
    setDesc(e.target.value);
  };
  async function handleWorkspaceusersChange(users) {
    if (users != undefined) {
      // setUsers(users);

      let temp = [];

      for (let i in users) {
        // setUsers((prev) => [...prev, i.label]);
        console.log(users[i]);
        await temp.push(users[i].value);
      }

      console.log(temp);
      setUsers(temp);
      setUsersd(users);
    }
  }
  async function handleWorkspaceInviteuserChange(users) {
    if (users != undefined) {
    }
  }
  // function handleWorkspacecreateDateChange(createddate) {
  //   setAssignDate(createddate);
  // };

  return (
    <>
      <button
        className="bg-white text-black font-bold uppercase text-sm px-6 py-3 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Workspace
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-75 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold px-8">Add Workspace</h3>
                </div>
                {/*body*/}
                <div className="w-full max-w">
                  <form
                    id="addwform"
                    name="addwform"
                    className="bg-white rounded px-6 py-6 mx-4"
                  >
                    <div className="flex">
                      <div className="mr-4 mb-6">
                        <label
                          className="block text-gray-700 text-sm mb-2"
                          for="workspacetitle"
                        >
                          Workspace Title
                        </label>
                        <input
                          // maxLength={15}
                          className="shadow appearance-none border w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Workspace Title"
                          onChange={handleWorkspacetitleChange}
                          pattern="[A-Z a-z]{1,15}"
                          required
                        />
                      </div>
                      <div className="mb-6 mr-4">
                        <label
                          className="block text-gray-700 text-sm mb-2"
                          for="workspacedescription"
                        >
                          Workspace Description
                        </label>
                        <input
                          // maxLength={50}
                          className="shadow appearance-none border w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Workspace Description"
                          onChange={handleWorkspacedescChange}
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-4"
                        for="workspaceAssign-date"
                      >
                        Workspace Assign Date
                      </label>
                      <WorkspaceDatePicker />
                    </div> */}
                    <div className="flex">
                      <div className="mb-6 mr-4">
                        <label
                          className="block text-gray-700 text-sm mb-2"
                          for="status"
                        >
                          Workspace Users
                        </label>
                        <WorkspaceUser
                          uid={uid}
                          workspaceuser={handleWorkspaceusersChange}
                        />
                      </div>

                      <div className="mb-6 mr-4">
                        <label
                          className="block text-gray-700 text-sm mb-2"
                          for="workspacedescription"
                        >
                          Workspace User Email ID
                        </label>
                        <MutlipleEmails
                          uid={uid}
                          workspaceuseremails={handleWorkspaceInviteuserChange}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        form="addwform"
                        onClick={async () => {
                          setWorkspacedetails();
                          setShowModal(false);
                        }}
                      >
                        Save Workspace
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
