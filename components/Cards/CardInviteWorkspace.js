import React from "react";
import PropTypes from "prop-types";

// components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import WorkspaceItem from "components/Items/WorkspaceItem";
import AddWorkspace from "components/Modal/AddWorkspace";

import { database } from "../../components/firebase";

import { ref, push, update, remove, onValue, get } from "firebase/database";
import WorkspaceInvite from "components/Items/WorkspaceInvite";

export default function CardInviteWorkspace({ color, uid, wdata }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);

  const workspacedata = [];

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    console.log(wdata);
    for (let i in wdata) {
      workspacedata.push(wdata[i]);
    }

    const obj = [{ workspaces: workspacedata }];
    setBoardData(obj);
    // console.log(obj);
  }, [uid, wdata]);

  async function invitemail() {
    fetch("/api/invitemail/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    );
  }

  async function adduser(userlist) {
    console.log(userlist);

    // for (let i of userlist) {
    //   console.log(i);
    // }

    invitemail();
  }

  function addWorkspace(data) {
    if (uid) {
      // const postk = push(ref(database, 'users/' + uid + '/workspace')).key

      let a = data.title;
      a = a.trim().split(" ").join("").toLowerCase();

      const postk = a;

      const workspacedetails = {
        createddate: data.assignDate,
        desc: data.desc,
        owner: uid,
        users: data.users,
        wid: postk,
        workspacename: data.title,
      };

      adduser(data.users);

      // update(ref(database, 'users/' + uid + '/workspace'), {
      //   [postk]: data.title,
      // })
      //   .then(adduser(data.users))
      //   .then(() => {
      //     update(ref(database, 'workspaces/' + postk), workspacedetails)
      //   })
      //   .then(console.log("Worksapce Added Successfully!"))
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }

  function archieveWorkspace(wid) {
    // eslint-disable-next-line eqeqeq
    if (wid && wid != "") {
      console.log(wid);

      const wpref = ref(database, "users/" + uid + "/workspace/" + wid);

      onValue(
        wpref,
        (snapshot) => {
          console.log(snapshot.val());
          let val = snapshot.val();
          update(ref(database, "users/" + uid + "/archieveworkspace/"), {
            [wid]: val,
          })
            .then(() => {
              update(ref(database, "workspaces/" + wid), {
                archieved: true,
              });
            })
            .then(
              remove(wpref)
                .then(
                  console.log(
                    "Workspace with id " +
                      wid +
                      " archieved successfully and added to archieve."
                  )
                )
                .catch((error) => {
                  console.log(
                    "Error in archieving workspace with error:" + error + "."
                  );
                })
            );
        },
        { onlyOnce: true }
      );
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(result.source.droppableId)].workspaces[
        result.source.index
      ];
    newBoardData[parseInt(result.source.droppableId)].workspaces.splice(
      result.source.index,
      1
    );
    newBoardData[parseInt(result.destination.droppableId)].workspaces.splice(
      result.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Workspaces Invite
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            {ready && (
              <DragDropContext onDragEnd={onDragEnd}>
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      ID
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Workspace Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Workspace Description
                    </th>

                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Owner
                    </th>
                    <th
                      className={
                        "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Accept
                    </th>
                    <th
                      className={
                        "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Decline
                    </th>
                  </tr>
                </thead>
                {boardData.map((board, bIndex) => {
                  return (
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <tbody
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {board.workspaces.length > 0 &&
                            board.workspaces.map((item, iIndex) => {
                              return (
                                <WorkspaceInvite
                                  key={item.wid}
                                  data={item}
                                  index={iIndex}
                                  archieveWorkspace={archieveWorkspace}
                                />
                              );
                            })}
                          {provided.placeholder}
                        </tbody>
                      )}
                    </Droppable>
                  );
                })}
              </DragDropContext>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

CardInviteWorkspace.defaultProps = {
  color: "light",
};

CardInviteWorkspace.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
