import React, { useState } from "react";
import RemoveTaskUser from "components/Dropdowns/UserDropdown/RemoveTaskUser";

//firebase
import { database } from "components/firebase";
import { ref, update, remove } from "firebase/database";

export default function RemoveUsersSubtask({ wid, tid, sid, assignedusers }) {
    const [showModal, setShowModal] = React.useState(false);

    const [taskUsers, setTaskUsers] = useState(null);

    async function removeUsers() {
        if (taskUsers != null) {
            let temp = [];
            await assignedusers.forEach((user) => {
                if (!taskUsers.includes(user)) {
                    temp.push(user);
                }
            });
            await console.log(temp);
            await update(ref(database, `workspaces/${wid}/tasks/${tid}/subtasks/${sid}`), {
                assignees: temp,
            });
        }

    }

    function handleworkspaceuserChange(users) {
        console.log(users);
        setTaskUsers(users);
    }

    return (
        <>
            <button
                className="bg-white text-black font-bold uppercase text-sm px-6 py-3 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Remove User
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-75 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold px-8">Add Users</h3>
                                </div>
                                {/*body*/}
                                <div className="w-full px-4 max-w">
                                    <form
                                        className="bg-white rounded px-8 pt-4 pb-4"
                                    >
                                        <div className="flex">
                                            <div className="mb-6 flex-1">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="status"
                                                >
                                                    Task Users
                                                </label>
                                                {assignedusers && <RemoveTaskUser assignedusers={assignedusers} userChange={handleworkspaceuserChange} />}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center pt-4 px-6 border-t border-solid border-slate-200 rounded-b">
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
                                                onClick={() => {
                                                    removeUsers()
                                                        .then(() => {
                                                            setShowModal(false)
                                                        })
                                                        .then(() => {
                                                            alert("Removed users from workspace successfully");
                                                        })
                                                        .then(() => {
                                                            window.location.reload();
                                                        })
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
