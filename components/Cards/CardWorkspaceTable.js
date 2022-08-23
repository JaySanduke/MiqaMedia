import React from "react";
import PropTypes from "prop-types";

// components
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import WorkspaceItem from "components/Items/WorkspaceItem";
import AddWorkspace from "components/Modal/AddWorkspace";


import { app, database } from "../../components/firebase";

import { onValue, ref, child, push, update, remove } from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";

export default function CardWorkspaceTable({ color, uid }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);

  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid));
  const [data, setDate] = useState([]);

  const workspacedata = [];

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val().workspace);
      setDate(snapshot.val().workspace);
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, loading]);

  useEffect(() => {

    for (let i in data) {
      workspacedata.push(data[i]);
    }

    const obj = [{ workspaces: workspacedata }];
    setBoardData(obj);
    console.log(obj);

  }, [data]);

  function addWorkspace(data) {
    const postk = push(ref(database, 'users/' + uid + '/workspace')).key

    const workspacedetails = {
      "createddate": data.assignDate,
      "wid": postk,
      "workspacename": data.title,
      "desc": data.desc,
      "users": [data.users],
    };

    if (uid) {
      push(ref(database, 'users/' + uid + '/workspace/'), workspacedetails);
    }
  }

  function deleteWorkspace(wid) {
    if (wid && wid != "") {
      remove(ref(database, 'users/' + uid + '/workspace/' + wid))
        .then(console.log('Workspace with id ' + wid + ' deleted successfully'))
        .catch((error) => {
          console.log('error deleting task with error:' + error)
        });
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
                Total Workspaces
              </h3>
            </div>
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              <AddWorkspace addWorkspace={addWorkspace} />
            </h3>
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
                      Workspace Title
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
                      Workspace Users
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Date
                    </th>

                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    ></th>
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
                                <WorkspaceItem
                                  key={item.wid}
                                  data={item}
                                  index={iIndex}
                                  deleteWorkspace={deleteWorkspace}
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

CardWorkspaceTable.defaultProps = {
  color: "light",
};

CardWorkspaceTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};