import React from "react";
import { Draggable } from "react-beautiful-dnd";
import SubTaskDropdown from "components/Dropdowns/SubTaskDropdown.js";

function SubTaskItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.subtask_id.toString()}>
      {(provided) => (
        
          <tr 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
            <td
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold
                    "
            >
              {data.subtask_id}
            </td>
            <td
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold
                    "
            >
              {data.subtask_title}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {data.subtask_description}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {data.subtask_state}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {data.subtask_users}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {data.subtask_assigndate}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {data.subtask_completedate}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <SubTaskDropdown />
            </td>
          </tr>
      )}
    </Draggable>
  );
}

export default SubTaskItem;