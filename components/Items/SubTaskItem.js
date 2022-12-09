import React from "react";
import { Draggable } from "react-beautiful-dnd";
import SubTaskDropdown from "components/Dropdowns/SubTaskDropdown.js";

function SubTaskItem({ wid, tid, data, index, deleteSubtask }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold"
          >
            {index + 1}
          </td>
          <td
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold"
          >
            {data.title}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.desc}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.status}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.assignees!=undefined?data.assignees.length:0}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.created_at}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.completion_date}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            <SubTaskDropdown
              data={data}
              wid={wid}
              tid={tid}
              sid={data.id}
              deleteSubtask={deleteSubtask}
            />
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default SubTaskItem;
