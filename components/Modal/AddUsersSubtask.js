import React, { useEffect, useState } from "react";
import EditSubTaskUser from "components/Dropdowns/UserDropdown/EditSubTaskUser";

//firebase
import { database } from "components/firebase";
import { get, ref, update } from "firebase/database";

export default function AddUsersSubtask({ wid, tid, sid, assignedusers }) {
    const [showModal, setShowModal] = React.useState(false);

    const [taskUsers, setTaskUsers] = useState(null);
    const [subtaskUsers, setSubtaskUsers] = useState(null);

    const [newsubtaskusers, setNewSubtaskUsers] = useState(null);

    useEffect(() => {
        get(ref(database, `workspaces/${wid}/tasks/${tid}/assignees`)).then((snapshot) => {
            if (snapshot.exists()) {
                setTaskUsers(snapshot.val());
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [assignedusers]);

    useEffect(() => {
        if (taskUsers != null) {
            console.log(taskUsers);
            let temp = [];
            for (let i of taskUsers) {
                if (assignedusers != undefined) {
                    if (!assignedusers.includes(i)) {
                        temp.push(i);
                    }
                }
                else if (assignedusers == undefined) {
                    temp.push(i);
                }
            }
            console.log(temp);
            setSubtaskUsers(temp);
        }
    }, [taskUsers]);


    async function setAddUsers() {
        if (newsubtaskusers != null) {
            let temp = [];
            for (let i of newsubtaskusers) {
                temp.push(i);
            }
            console.log(temp);
            if (assignedusers == undefined) {
                let newusers = [...temp];
                console.log(newusers);
                await update(ref(database, `workspaces/${wid}/tasks/${tid}/subtasks/${sid}`), {
                    assignees: newusers,
                });
            }
            else {
                let newusers = [...assignedusers, ...temp];
                console.log(newusers);
            }
        }
        else {
            console.log("No users selected");
        }
    }

    function handleworkspaceuserChange(users) {
        console.log(users);
        setNewSubtaskUsers(users);
    }


    return (
        <>
            <button
                className="bg-white text-black font-bold uppercase text-sm px-6 py-3 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add User
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
                                                <EditSubTaskUser subtaskUsers={subtaskUsers} userChange={handleworkspaceuserChange} />
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
                                                onClick={async () => {
                                                    if (newsubtaskusers != null) {
                                                        setAddUsers()
                                                            .then(() => {
                                                                setShowModal(false)
                                                            })
                                                            .then(() => {
                                                                alert("Added users to subtask successfully")
                                                            })
                                                            .then(() => {
                                                                window.location.reload();
                                                            })
                                                    }
                                                    else {
                                                        setShowModal(false)
                                                    }
                                                }
                                                }
                                            >
                                                Add user
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
