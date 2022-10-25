import React from "react";
import { Draggable } from "react-beautiful-dnd";
import WorkspaceDropdown from "components/Dropdowns/WorkspaceDropdown";

function WorkspaceItem({ data, index, deleteWorkspace }) {
  return (
    <Draggable index={index} draggableId={data.wid.toString()}>
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
            {data.workspacename}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.desc}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.users.join(", ")}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.createddate}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            <WorkspaceDropdown
              wid={data.wid}
              deleteWorkspace={deleteWorkspace}
            />
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default WorkspaceItem;
