import React, { useState } from "react";
import StatusDropdown from "components/Dropdowns/StatusDropdown";
import AssignDatePicker from "components/DatePicker/AssignDatePicker";
import CompletionDatePicker from "components/DatePicker/CompletionDatePicker";
import SubTaskUser from "components/Dropdowns/SubTaskUser";

export default function AddSubTask({ addSubtask }) {
    const [showModal, setShowModal] = React.useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [assignee, setAssignee] = useState([]);
    const [assignDate, setAssignDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');


    function setSubTaskdetails() {
        const subtaskdetails = {
            "title": title,
            "desc": desc,
            "status": status,
            "assignee": assignee,
            "assignDate": assignDate,
            "completionDate": completionDate
        }

        addSubtask(subtaskdetails);

        console.log(subtaskdetails);
    }

    const handletitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handledescChange = (e) => {
        setDesc(e.target.value);
    };
    function handlestatusChange(status) {
        setStatus(status);
    };
    function handleassigneeChange (assignees) {
        setAssignee(assignees);
    };
    function handleassignDateChange (createddate) {
        setAssignDate(createddate);
    };
    function handlecompletionDateChange (completiondate) {
        setCompletionDate(completiondate);
    };


    return (
        <>
            <button
                className="bg-white text-black font-bold uppercase text-sm px-6 py-3 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add Sub Task
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-75 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold px-8">Add Sub Task</h3>
                                </div>
                                {/*body*/}
                                <div class="w-full px-4 max-w">
                                    <form onSubmit={() => {
                                            setShowModal(false);
                                                setSubTaskdetails();
                                        }} class="bg-white rounded px-8 pt-4 pb-4">
                                        <div class="mb-4">
                                            <label
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                for="title"
                                            >
                                                Sub Task Title
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                placeholder="Sub Task Title"
                                                onChange={handletitleChange}
                                                required
                                            />
                                        </div>
                                        <div class="mb-6">
                                            <label
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                for="description"
                                            >
                                                Sub Task Description
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                placeholder="Sub Task Description"
                                                onChange={handledescChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex">
                                            <div class="mb-6 mr-4 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    for="status"
                                                >
                                                    Sub Task Status
                                                </label>
                                                <StatusDropdown statusChange={handlestatusChange} />
                                            </div>
                                            <div class="mb-6 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    for="status"
                                                >
                                                    Sub Task Users
                                                </label>
                                                <SubTaskUser subtaskuser={handleassigneeChange} />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div class="mb-6 mr-4 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-4"
                                                    for="assign-date"
                                                >
                                                    Sub Task Assign Date
                                                </label>
                                                <AssignDatePicker assigndate={handleassignDateChange}/>
                                            </div>
                                            <div class="mb-6 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-4"
                                                    for="completion-date"
                                                >
                                                    Sub Task Completion Date
                                                </label>
                                                <CompletionDatePicker completiondate={handlecompletionDateChange}/>
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
                                        type="submit"
                                    >
                                        Add Sub Task
                                    </button>
                                </div>
                                    </form>
                                </div>
                                {/*footer*/}
                                
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
