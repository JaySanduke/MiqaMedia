import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { database } from "../../components/firebase";

import { ref, push, update, remove, onValue, get } from "firebase/database";


function WorkspaceInvite({ data, index, uid }) {

  async function invite(response, invitedata) {
    if (response === 'accept') {
      // accept invite
      console.log(response, invitedata);

      get(ref(database, "workspaces/" + invitedata.workspaceid)).then(async (snapshot) => {
        console.log(snapshot.val());
        const workspacedata = await snapshot.val();


        let newau = await workspacedata.assignedusers.filter((item) => item !== uid);

        if (workspacedata.users) {
          let workspaceusers = await workspacedata.users;
          if (workspaceusers.includes(uid) == false) {
            workspaceusers.push(uid);
            update(ref(database, "workspaces/" + invitedata.workspaceid), {
              users: workspaceusers,
              assignedusers: newau,
            })
              .then(() => {
                console.log("Workspace Users Updated");
                console.log("Workspace Assigned Users Updated");
              });
          }
          else {
            console.log("User already in workspace");
            update(ref(database, "workspaces/" + invitedata.workspaceid), {
              assignedusers: newau,
            })
              .then(() => {
                console.log("Workspace Assigned Users Updated");
              });
          }
        }
        else {
          let workspaceusers = [];
          workspaceusers.push(uid);
          update(ref(database, "workspaces/" + invitedata.workspaceid), {
            users: workspaceusers,
            assignedusers: newau,
          })
            .then(() => {
              console.log("Workspace Users Updated");
              console.log("Workspace Assigned Users Updated");
            });
        }


      }).then(() => {
        update(ref(database, "users/" + uid + "/workspace/"), {
          [invitedata.workspaceid]: invitedata.workspacename
        })
          .then(() => console.log("Workspace Added"))
          .then(() => {
            remove(ref(database, "users/" + uid + "/invites/" + invitedata.workspaceid))
          })
          .then(() => console.log("Invite Accepted"))
          .catch((error) => {
            console.error(error);
          });
      });
    }
    else if (response === 'reject') {
      // reject invite
      console.log(response, invitedata);

      get(ref(database, "workspaces/" + invitedata.workspaceid)).then(async (snapshot) => {
        console.log(snapshot.val());
        const workspacedata = await snapshot.val();

        let newau = await workspacedata.assignedusers.filter((item) => item !== uid);

        if (workspacedata.users) {
          if (workspacedata.users.includes(uid) == false) {

            let newu = await workspacedata.users.filter((item) => item !== uid);
            update(ref(database, "workspaces/" + invitedata.workspaceid), {
              assignedusers: newau,
              users: newu,
            })
              .then(() => {
                console.log("Workspace Assigned Users Updated");
              })
          }
        }
        else {
          update(ref(database, "workspaces/" + invitedata.workspaceid), {
            assignedusers: newau,
          })
            .then(() => {
              console.log("Workspace Assigned Users Updated");
            })
        }
      }).then(() => {
        remove(ref(database, "users/" + uid + "/invites/" + invitedata.workspaceid))
          .then(() => console.log("Invite Rejected"))
          .catch((error) => {
            console.error(error);
          })
      });
    }
  }

  return (
    <Draggable index={index} draggableId={data.workspaceid.toString()}>
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
            {data.workspacedesc}
          </td>
          {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.users.join(", ")}
          </td> */}
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <div className="flex">
              <img
                src="/img/team-1-800x800.jpg"
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
              ></img>
            </div>
          </td>
          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
            <button
              className="bg-white text-black font-bold uppercase text-sm px-4 py-3 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => invite('accept', data)}
            >
              Accept
            </button>
          </td>
          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
            <button
              className="bg-white text-black font-bold uppercase text-sm px-4 py-3 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => invite('reject', data)}
            >
              Reject
            </button>
          </td>
        </tr>
      )
      }
    </Draggable >
  );
}

export default WorkspaceInvite;
