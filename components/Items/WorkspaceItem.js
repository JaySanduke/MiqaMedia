import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import WorkspaceDropdown from "components/Dropdowns/WorkspaceDropdown";
import { get, ref } from "firebase/database";
import { database } from "components/firebase";


function WorkspaceItem({ data, index, archieveWorkspace }) {

  const [owner, setOwner] = React.useState("");

  useEffect(() => {
    get(ref(database, `users/${data.owner}`)).then((snapshot) => {
      console.log(snapshot.val());
      setOwner({
        name: snapshot.val().name,
        email: snapshot.val().email,
      });
    });
  }, [data])

  return (
    <Draggable index={index} draggableId={data.wid.toString()}>
      {(provided) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold">
            {index + 1}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold">
            {data.workspacename}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.desc}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {/* {data.users !== undefined ?data.users.length: "0"} */}
            {owner.name}
          </td>
          {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <div className="flex">
              <img
                src="/img/team-1-800x800.jpg"
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
              ></img>
            </div>
          </td> */}
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.createddate}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            <WorkspaceDropdown
              wid={data.wid}
              archieveWorkspace={archieveWorkspace}
            />
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default WorkspaceItem;
