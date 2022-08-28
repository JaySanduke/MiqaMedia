import React from "react";
import { useEffect, useState } from "react";
import StatusDropdown from "components/Dropdowns/StatusDropdown";
import AssignDatePicker from "components/DatePicker/AssignDatePicker";
import CompletionDatePicker from "components/DatePicker/CompletionDatePicker";
import EditTaskUser from "components/Dropdowns/UserDropdown/EditTaskUser";

export default function VieworEditTask({ tid, taskdata, updateTask }) {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [assignee, setAssignee] = useState([]);
  const [assignDate, setAssignDate] = useState([]);
  const [completionDate, setCompletionDate] = useState('');

  useEffect(() => {
    setTitle(taskdata.title);
    setDesc(taskdata.desc);
    setStatus(taskdata.status);
    setAssignee(taskdata.assignees);
    setAssignDate(taskdata.created_at);
    setCompletionDate(taskdata.completion_date);
  }, [taskdata]);

  function setTaskdetails() {
    const taskdetails = {
      title: title,
      desc: desc,
      status: status,
      assignee: assignee,
      assignDate: assignDate,
      completionDate: completionDate
    }

    updateTask(taskdetails, tid);

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
  function handleassigneeChange(assignees) {
    setAssignee(assignees);
  };
  function handleassignDateChange(createddate) {
    setAssignDate(createddate);
  };
  function handlecompletionDateChange(completiondate) {
    setCompletionDate(completiondate);
  };

  return (
    <>
      <div
        className={
          "relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        }
      >
        <div className="rounded-t bg-white mb-0 px-4 py-3 border-0">
          <div className="flex z-50 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold px-8">View & Edit Task</h3>
          </div>
          {/*body*/}
          <div class="w-full px-4 max-w">
            <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
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
                  value={title}
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
                  value={desc}
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
                  {status &&
                    <StatusDropdown value={status} statusChange={handlestatusChange} />
                  }
                </div>
                <div class="mb-6 flex-1">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="status"
                  >
                    Task Users
                  </label>
                  {assignee &&
                    <EditTaskUser value={assignee} edittaskuser={handleassigneeChange} />
                  }
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
                  {assignDate &&
                    <AssignDatePicker avalue={assignDate} assigndate={handleassignDateChange} />
                  }
                </div>
                <div class="mb-6 flex-1">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-4"
                    for="completion-date"
                  >
                    Task Completion Date
                  </label>
                  {completionDate &&
                    <CompletionDatePicker cvalue={completionDate} completiondate={handlecompletionDateChange} />
                  }
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
                setTaskdetails()
              }}
            >
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
