import React, { useState } from "react";
import StatusDropdown from "components/Dropdowns/StatusDropdown";
import UserDropdown from "components/Dropdowns/UserDropdown";
import AssignDatePicker from "components/DatePicker/AssignDatePicker";
import CompletionDatePicker from "components/DatePicker/CompletionDatePicker";

export default function AddTask({ addTask }) {
    const [showModal, setShowModal] = React.useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [assignee, setAssignee] = useState([]);
    const [assignDate, setAssignDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');


    function setTaskdetails() {
        const taskdetails = {
            "title": title,
            "desc": desc,
            "status": status,
            "assignee": assignee,
            "assignDate": assignDate,
            "completionDate": completionDate
        }

        addTask(taskdetails);

        console.log(taskdetails);
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
                Add Task
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-75 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold px-8">Add Task</h3>
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
                                    <form onSubmit={() => {
                                            setShowModal(false),
                                                setTaskdetails()
                                        }} class="bg-white rounded px-8 pt-6 pb-8 mb-4">
                                        <div class="mb-4">
                                            <label
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                for="title"
                                            >
                                                Task Title
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                placeholder="Task Title"
                                                onChange={handletitleChange}
                                                required
                                            />
                                        </div>
                                        <div class="mb-6">
                                            <label
                                                class="block text-gray-700 text-sm font-bold mb-2"
                                                for="description"
                                            >
                                                Task Description
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                placeholder="Task Description"
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
                                                    Task Status
                                                </label>
                                                <StatusDropdown statusChange={handlestatusChange} />
                                            </div>
                                            <div class="mb-6 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    for="status"
                                                >
                                                    Task Users
                                                </label>
                                                <UserDropdown assignee={handleassigneeChange} />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div class="mb-6 mr-4 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-4"
                                                    for="assign-date"
                                                >
                                                    Task Assign Date
                                                </label>
                                                <AssignDatePicker assigndate={handleassignDateChange}/>
                                            </div>
                                            <div class="mb-6 flex-1">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-4"
                                                    for="completion-date"
                                                >
                                                    Task Completion Date
                                                </label>
                                                <CompletionDatePicker completiondate={handlecompletionDateChange}/>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        // onClick={() => {
                                        //     setShowModal(false),
                                        //         setTaskdetails()
                                        // }}
                                    >
                                        Save Changes
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
