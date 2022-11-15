import React, { useState } from "react";
import StatusDropdown from "components/Dropdowns/StatusDropdown";
import AssignDatePicker from "components/DatePicker/AssignDatePicker";
import CompletionDatePicker from "components/DatePicker/CompletionDatePicker";
import TaskUser from "components/Dropdowns/UserDropdown/TaskUser";

export default function AddTask({ wuser, addTask }) {
  const [showModal, setShowModal] = React.useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [assignDate, setAssignDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  async function setTaskdetails() {
    const taskdetails = await {
      title: title,
      desc: desc,
      status: status,
      assignee: assignee,
      assignDate: assignDate,
      completionDate: completionDate,
    };

    await addTask(taskdetails);
    console.log(taskdetails);

    await setShowModal(false);

    await setTitle("");
    await setDesc("");
    await setStatus("");
    await setAssignee([]);
    await setAssignDate("");
    await setCompletionDate("");
    
  }

  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handledescChange = (e) => {
    setDesc(e.target.value);
  };
  function handlestatusChange(status) {
    setStatus(status);
  }
  function handleassigneeChange(assignees) {
    setAssignee(assignees);
  }
  function handleassignDateChange(createddate) {
    setAssignDate(createddate);
  }
  function handlecompletionDateChange(completiondate) {
    setCompletionDate(completiondate);
  }

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
                </div>
                {/*body*/}
                <div className="w-full px-4 max-w">
                  <form
                    onSubmit={() => setTaskdetails()}
                    className="bg-white rounded px-8 pt-4 pb-4"
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                      >
                        Task Title
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Task Title"
                        onChange={handletitleChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                      >
                        Task Description
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Task Description"
                        onChange={handledescChange}
                        required
                      />
                    </div>
                    <div className="flex">
                      <div className="mb-6 mr-4 flex-1">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="status"
                        >
                          Task Status
                        </label>
                        <StatusDropdown statusChange={handlestatusChange} />
                      </div>
                      <div className="mb-6 flex-1">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="status"
                        >
                          Task Users
                        </label>
                        <TaskUser wuser={wuser} taskuser={handleassigneeChange} />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mb-6 mr-4 flex-1">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-4"
                          htmlFor="assign-date"
                        >
                          Task Assign Date
                        </label>
                        <AssignDatePicker assigndate={handleassignDateChange} />
                      </div>
                      <div className="mb-6 flex-1">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-4"
                          htmlFor="completion-date"
                        >
                          Task Completion Date
                        </label>
                        <CompletionDatePicker
                          completiondate={handlecompletionDateChange}
                        />
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
                        Add Task
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
