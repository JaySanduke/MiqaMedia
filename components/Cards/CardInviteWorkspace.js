import React from "react";
import PropTypes from "prop-types";

// components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import WorkspaceInvite from "components/Items/WorkspaceInvite";

import { database } from "../../components/firebase";

import { ref, push, update, remove, onValue, get } from "firebase/database";

export default function CardInviteWorkspace({ color, uid }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      onValue(ref(database, "users/" + uid + "/invites"), async (invites) => {
        if (invites.exists()) {
          console.log(invites.val());
          var invitedata = [];
          for (let i in invites.val()) {
            console.log(invites.val()[i].workspaceid);
            await get(ref(database, "workspaces/" + invites.val()[i].workspaceid)).then(async (snapshot) => {
              if (snapshot.exists()) {
                console.log(snapshot.val());
                await invitedata.push({
                  owner: invites.val()[i].ownerdetails,
                  createddate: invites.val()[i].createddate,
                  status: invites.val()[i].status,
                  workspaceid: invites.val()[i].workspaceid,
                  workspacename: snapshot.val().workspacename,
                  workspacedesc: snapshot.val().desc,
                })
              }
            });
          }

          await console.log(invitedata);
          const obj = await [{ invites: invitedata }];
          // // console.log(obj);
          await setBoardData(obj);
        }
        else {
          setBoardData([]);
          console.log("No Invites data available");
        }
      });
    }
  }, [uid]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(result.source.droppableId)].invites[
      result.source.index
      ];
    newBoardData[parseInt(result.source.droppableId)].invites.splice(
      result.source.index,
      1
    );
    newBoardData[parseInt(result.destination.droppableId)].invites.splice(
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
                invites Invite
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
                          {board.invites.length > 0 &&
                            board.invites.map((item, iIndex) => {
                              return (
                                <WorkspaceInvite
                                  key={item.wid}
                                  data={item}
                                  index={iIndex}
                                  uid={uid}
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
